var express = require('express');
var userRepo = require('../repo/userRepo');
var tokenCtrl=require("../controllers/tokenController.js");
var router = express.Router();

router.post('/login', (req, res) => {
    var u = req.body;
    userRepo.login(u)
        .then(value => {
            res.statusCode = 201;
            var user = {
                username : u.username,
                password : u.password,
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
})

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

exports.showAll =function(req,res){
    
};

exports.getUsers = function(req,res){
    
};


exports.getUsersByToken= function(req,res){
	 
}

exports.getUsersForType = function(req,res) {
	 
};