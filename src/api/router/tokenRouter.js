var token = require('../controllers/tokenController.js');
express = require('express');


var router = express.Router();

router.route('/delete')
    .get(token.deleteToken)

module.exports = router;