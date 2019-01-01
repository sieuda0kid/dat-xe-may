var tripCtrl=require('../controllers/tripController.js');
express = require('express');
var token=require('../controllers/tokenController.js');

var router = express.Router();

router.route('/updateTrip')
.post(token.checkAccessToken,tripCtrl.updateTripLocation);

router.route('/getTripByDriverId')
.post(token.checkAccessToken,tripCtrl.getTripByDriverId);

router.route('/updateTripStatus')
.post(token.checkAccessToken,tripCtrl.updateTripStatus);

router.route('/getAllTrip')
.post(token.checkAccessToken,tripCtrl.getAllTrip);

router.route('/getTripByStatus')
.post(token.checkAccessToken,tripCtrl.getTripByStatus);

//router.route('/getTripNonLocation')
//.post(token.checkAccessToken,tripCtrl.getTripNonLocation);

router.route('/addCustomerAndTrip')
.post(token.checkAccessToken,tripCtrl.addCustomerAndTrip);
module.exports = router;