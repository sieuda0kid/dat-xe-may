express = require('express');
var userCtrl = require('../controllers/userController')

var router = express.Router();
router.post("/login",userCtrl.login);

// router.route('/register') 
// .post(userCtrl.register);

// router.route('/getUser')
//     .post(token.checkAccessToken, userCtrl.getUser);

// router.route('/getUserByToken')
//     .post(token.checkAccessToken, userCtrl.getUserByToken);

// router.route('/getUserForType')
//     .post(token.checkAccessToken, userCtrl.getUserForType);

module.exports = router;