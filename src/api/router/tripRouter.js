var tripCtrl=require('../controller/tripController.js');
express = require('express');
var token=require('../controller/tokenController.js');

var router = express.Router();

router.route('/getAllTrip')
.post(token.checkAccessToken,tripCtrl.getAllTrip);

router.route('/addCustomerAndTrip')
.post(token.checkAccessToken,tripCtrl.addCustomerAndTrip);
module.exports = router;


router.route('/getTripByDriverId')
.post(token.checkAccessToken,tripCtrl.getTripByDriverId);

router.route('/updateTripStatus')
.post(token.checkAccessToken,tripCtrl.updateTripStatus);