var token = require('../controllers/tokenController.js');
var express = require('express');


var router = express.Router();

router.route('/delete')
.get(token.deleteToken)

module.exports = router;