var map=require('../controller/MapCtrl.js');
express = require('express');
var token=require('../controller/TokenCtrl.js');

var router = express.Router();

router.route('/getLatLng')
.post(token.checkAccessToken,map.getLatLong)

router.route('/getArrayLocation')
.post(token.checkAccessToken,map.getArrayLocation)

module.exports = router;