var map = require('../controllers/mapController.js');
express = require('express');
var token = require('../controllers/tokenController.js');

var router = express.Router();

router.route('/getLatLng')
.post(token.checkAccessToken,map.getLatLong)

router.route('/getArrayLocation')
.post(token.checkAccessToken,map.getArrayLocation)

module.exports = router;