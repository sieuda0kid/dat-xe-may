
var jwt = require("jsonwebtoken");
var randomstring = require("randomstring");
var socket = require('../app.js');
var userRepo = require('../repo/userRepo.js');
var tokenRepo = require('../repo/tokenRepo.js');
require('dotenv').config();

exports.deleteToken=function(res,rep){
 
}

exports.generateToken = function(user){
    var user_token={
        user:user
    }
    return token = jwt.sign(user_token, "token", {
        expiresIn: 60*30 // 30 phút
    });
}
    // tao chuoi refeshToken
    exports.createRefreshToken=function(us){
        var str=randomstring.generate({
            length: 30,
            charset: 'alphabetic'
        });
          return str+us;
    }

var createNewToken=function(ref_token,req,res,next){
    tokenRepo.getRefreshTokenByToken(ref_token)
    .then(rows => {
      if(rows.length>0)
      {
        userRepo.loadOne(rows[0].id_user)
        .then(result=>{
            var acToken = generateTokens(result[0]);
            socket.guidata(acToken,rows[0].id_user,"token");
            var user_token={
              user:result[0]
            }
            console.log(result);
            req.user_token=user_token;
            req.new_token=acToken;
            next();
        })
        .catch(err=>{console.log("không lấy được loadOne staff by id "+err)});
      }else{
        res.json({
            returnCode:0,
            msg:'token expired & refresh token not found'
        });
      }
    })
    .catch(err => {
      console.log("không lấy được getRefreshTokenByToken "+err);
    })
}

// kiem tra token cua user co hop le khong
var arr=[];
exports.checkAccessToken = function(req,res,next){
    var token=req.body.access_token;
    var ref_token=req.body.refresh_token.toString();
    if(token){
        jwt.verify(token, "token", function(err, user) {
            if(err){
                if(err.message==='jwt expired')
                {
                  var check=arr.indexOf(token);
                  if(check>0)
                  {
                    console.log("jwt expired");
                    createNewToken(ref_token,req,res,next);
                  }else{
                    arr.push(token);
                    console.log("jwt expired");
                    createNewToken(ref_token,req,res,next);
                  }  
                }else{
                  res.statusCode=403;
                  res.json({
                    returnCode:0,
                    message:'INVALID TOKEN',
                    error:err
                  });
                }
            }else{
                console.log(user);
                req.user_token=user;
                next();
            }
        });
    }else
    {
        res.statusCode=403;
        res.json({
            returnCode:0,
            message:'NO TOKEN FOUND!'
        });
    }
}