var express = require('express');
var userRepo = require('../repo/userRepo.js');
var tokenRepo = require('../repo/tokenRepo.js');
var tokenCtrl=require("../controllers/tokenController.js");
var md5 = require('crypto-js/md5');
var jwt = require('jsonwebtoken');

exports.showAll =function(req,res){
    userRepo.loadAll()
	.then(rows => {
		res.statusCode = 201;
		res.json({
			returnCode:1,
			message:"get staff susscess",
			object:rows
		});
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json({
			returnCode:0,
			message:"get staff error",
			error:err
		});
	})
};

exports.getUsers = function(req,res){
    var id_user=req.body.id;
	userRepo.loadOne(id_user)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get user susscess",
				user:rows[0]
			});
		}else{
			res.json({
				returnCode:0,
				message:"not user to get",
				user:rows	
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


exports.getUsersByToken= function(req,res){
    var reToken=req.body.access_token;
	var new_token= req.new_token;
	jwt.verify(reToken, "token", function(err, user) {
		if(err){
			console.log("check token: "+err.message);
			if(err.message ==='jwt expired')
			{
				jwt.verify(new_token, "token", function(err, users) {
					if(users){
						res.json({
							returnCode:1,
							message:"lấy danh user theo refresh token thành công !! ",
							user:users.user
						});
					}
				})
			}else {
				res.json({
					returnCode:0,
					message:"lấy danh user theo refresh token thất bại !!",
					error:err	
				});
			}
		}else{
			res.json({
				returnCode:1,
				message:"lấy danh user theo refresh token thành công !! ",
				user:user.user
			});
		}
	})
}

exports.getUsersForType = function(req,res) {
    var dif=req.body.dif;
	userRepo.loadForType(dif)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get susscess",
				object:rows
			});
		}else{
			res.json({
				returnCode:0,
				message:"not user to get",
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
};


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
			            message:"login susscess",
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