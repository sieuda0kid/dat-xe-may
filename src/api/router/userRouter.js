var token=require('../controller/tokenController.js');
express = require('express');
var userCtrl= require('../controller/userController')

var router = express.Router();

router.route('/')
.get(userCtrl.showAll)

router.route('/login')
.post(userCtrl.login)

// router.route('/register') 
// .post(userCtrl.register);

router.route('/getUser') 
.post(token.checkAccessToken,userCtrl.getUser);

router.route('/getUserByToken') 
.post(token.checkAccessToken,userCtrl.getUserByToken);

router.route('/getUserForType') 
.post(token.checkAccessToken,userCtrl.getUserForType);

module.exports = router;