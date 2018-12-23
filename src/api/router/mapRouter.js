var map = require('../controllers/mapController.js');
express = require('express');
var token = require('../controllers/tokenController.js');

var router = express.Router();

router.route('/')
    .post(map.getLatLong)

module.exports = router;