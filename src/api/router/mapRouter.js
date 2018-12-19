var map = require('../controller/mapController.js');
express = require('express');
var token = require('../controller/tokenController.js');

var router = express.Router();

router.route('/')
    .post(map.getLatLong)

module.exports = router;