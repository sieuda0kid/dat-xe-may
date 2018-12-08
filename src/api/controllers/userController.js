var express = require('express');
var userRepo = require('../repo/userRepo');
var tokenRepo = require('../repo/tokenRepo.js');
var tokenController=require('../controllers/tokenController.js')
var md5 = require('crypto-js/md5');
var jwt = require('jsonwebtoken');
var router = express.Router();


exports.showAll =function(req,res){
    userRepo.loadAll()
    .then(rows=> {
        res.statusCode = 201;
        res.json({
            returnCode:1,
            message:"get staff success",
            object:rows
        });
    })
    .catch(err =>{
        console.log(err);
        res.statusCode = 500;
        res.json({
            returnCode:0,
            message:"get staff error",
            error=err
            
        });
    })
};

exports.getUser = function(req,res){
    var id_user=req.body.id;
	userRepo.loadOne(id_user)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get user success",
				user:rows[0]
			});
		}
	})
	.catch(err=>{
		res.json({
				returnCode:0,
				message:"get user error",
				error:err	
			});
	});
};


exports.getUserByToken= function(req,res){
	var reToken=req.body.access_token;
	var new_token= req.new_token;
	jwt.verify(reToken, process.env.JWT_SECRET, function(err, user) {
		if(err){
			if(err.message ==='jwt expired')
			{
				jwt.verify(new_token, process.env.JWT_SECRET, function(err, users) {
					if(users){
						res.json({
							returnCode:1,
							message:"lay danh user theo refresh token thanh cong !! ",
							user:users.user
						});
					}
				})
			}else {
				res.json({
					returnCode:0,
					message:"lay danh user theo refresh token that bai!!",
					error:err	
				});
			}
		}else{
			res.json({
				returnCode:1,
				message:"lay danh user theo refresh token thanh cong !! ",
				user:user.user
			});
		}
	})
}

exports.getUserForType = function(req,res) {
	var dif=req.body.dif;
	userRepo.loadForType(dif)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get success",
				object:rows
			});
		}
	})
	.catch(err=>{
		res.json({
				returnCode:0,
				message:"get error",
				error:err	
			});
	});
	//res.json(req.user_token);
};
router.post('/login', (req, res) => {
    console.log(req);
    var u = {
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
    }
    userRepo.login(u)
        .then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json({
                returnCode: 1,
                message: 'success',
                user: value,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;

exports.login = function(req,res) {
	var c=req.body;

	userRepo.login(c)
	.then(rows => {
		if(rows.length>0)
		{
			tokenRepo.getRefreshToken(rows)
			.then(data=>{
				if(data.length>0){
					console.log(data);
					var acToken=tokenCtrl.generateToken(rows[0]);
                    
                    var user={
                    	userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:data[0].refresh_token
                    }
					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login success",
						user:user
					});
				}
				else
				{
					var acToken=tokenCtrl.generateToken(rows[0]);
					var rfToken=tokenCtrl.createRefreshToken(rows[0].username);
					var nd5_rfToken=md5(rfToken);
                    
                    var user1={
                    	userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:nd5_rfToken.toString()
                    }
					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login susscess",
						user:user1
					});

					tokenRepo.addRefreshToken({
						id_user:rows[0].id,
						refresh_token:nd5_rfToken,
						isFrist:1
					})
					.then(result=>{
						console.log("add refresh token success")
					})
					.catch(err=>console.log(err))
				}
			})
			.catch(err=>console.log(err))
		}else{
			res.statusCode = 201;
			res.json({
				returnCode:0,
			    message:"username or password INVALID"
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json({
				returnCode:0,
			    message:"login error",
			    error:err
			});
	})
};