express = require('express');
var userCtrl = require('../controllers/userController')

var router = express.Router();
router.post("/login",userCtrl.login);

 

module.exports = router;