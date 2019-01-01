var token=require('../controller/TokenCtrl.js');
express = require('express');


var router = express.Router();

router.route('/delete')
.get(token.deleteToken)

module.exports = router;