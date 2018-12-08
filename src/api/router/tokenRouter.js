var token= require('../controllers/token.js');
express = require('express');


var router = express.Router();

router.route('/delete')
.get(token.deleteToken)

module.exports = router;