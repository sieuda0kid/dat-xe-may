// var express = require('express');
var userRepo = require('../repo/userRepo');
var tokenCtrl=require("../controllers/tokenController.js");
// var router = express.Router();

// router.post('/login', (req, res) => {
//     var u = req.body;
//     userRepo.login(u)
//         .then(value => {
//             res.statusCode = 201;
//             var user = {
//                 username : u.username,
//                 password : u.password,
//                 access_token : tokenCtrl.generateToken(value),
//                 refresh_token : tokenCtrl.generateToken(value),
//             }
//             res.json({
//                 returnCode: 1,
//                 message: 'success',
//                 user: user,
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.statusCode = 500;
//             res.end('View error log on server console');
//         })
// })

// module.exports = router;

exports.login = function(req,res) {
	var u = req.body;
    userRepo.login(u)
        .then(value => {
            res.statusCode = 201;
            var user = {
                username : u.username,
                password : u.password,
                type: u.type,
                access_token : tokenCtrl.generateToken(value),
                refresh_token : tokenCtrl.generateToken(value),
            }
            res.json({
                returnCode: 1,
                message: 'success',
                user: user,
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
};

// exports.showAll =function(req,res){
//     userRepo.loadAll()
//     .then(rows=> {
//         res.statusCode = 201;
//         res.json({
//             returnCode:1,
//             message:"get staff success",
//             object:rows
//         });
//     })
//     .catch(err =>{
//         console.log(err);
//         res.statusCode = 500;
//         res.json({
//             returnCode:0,
//             message:"get staff error",
//             error: err,
//         });
//     })
// };

// exports.getUser = function(req,res){
//     var id_user=req.body.id;
// 	userRepo.loadOne(id_user)
// 	.then(rows=>{
// 		if(rows.length>0)
// 		{
// 			res.statusCode = 201;
// 			res.json({
// 				returnCode:1,
// 				message:"get user success",
// 				user:rows[0]
// 			});
// 		}
// 	})
// 	.catch(err=>{
// 		res.json({
// 				returnCode:0,
// 				message:"get user error",
// 				error:err.message,
// 			});
// 	});
// };


// exports.getUserByToken= function(req,res){
// 	var reToken=req.body.access_token;
// 	var new_token= req.new_token;
// 	jwt.verify(reToken, process.env.JWT_SECRET, function(err, user) {
// 		if(err){
// 			if(err.message ==='jwt expired')
// 			{
// 				jwt.verify(new_token, process.env.JWT_SECRET, function(err, users) {
// 					if(users){
// 						res.json({
// 							returnCode:1,
// 							message:"lay danh user theo refresh token thanh cong !! ",
// 							user:users.user
// 						});
// 					}
// 				})
// 			}else {
// 				res.json({
// 					returnCode:0,
// 					message:"lay danh user theo refresh token that bai!!",
// 					error:err	
// 				});
// 			}
// 		}else{
// 			res.json({
// 				returnCode:1,
// 				message:"lay danh user theo refresh token thanh cong !! ",
// 				user:user.user
// 			});
// 		}
// 	})
// }

// exports.getUserForType = function(req,res) {
// 	var dif=req.body.dif;
// 	userRepo.loadForType(dif)
// 	.then(rows=>{
// 		if(rows.length>0)
// 		{
// 			res.statusCode = 201;
// 			res.json({
// 				returnCode:1,
// 				message:"get success",
// 				object:rows
// 			});
// 		}
// 	})
// 	.catch(err=>{
// 		res.json({
// 				returnCode:0,
// 				message:"get error",
// 				error:err	
// 			});
// 	});
// 	//res.json(req.user_token);
// };