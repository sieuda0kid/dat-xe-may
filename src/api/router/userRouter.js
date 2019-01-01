var token=require('../controllers/tokenController.js');
express = require('express');
var userCtrl= require('../controllers/userController')

var router = express.Router();

router.route('/')
.get(userCtrl.showAll)

router.route('/login')
.post(userCtrl.login)

// router.route('/register') 
// .post(userCtrl.register);

router.route('/getUser') 
.post(token.checkAccessToken,userCtrl.getUsers);

router.route('/getUserByToken') 
.post(token.checkAccessToken,userCtrl.getUsersByToken);

router.route('/getUserForType') 
.post(token.checkAccessToken,userCtrl.getUsersForType);

module.exports = router;