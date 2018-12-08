var tripRepo = require('../repo/TripRepos.js');
var mapRepo = require('../repo/MapRepos.js');
require('dotenv').config();

exports.updateTripLocation = function(req,res) {
   // var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.tripLat},${req.body.tripLong}&key=${process.env.key}`;
  //  var url = encodeURI(stringUrl);
    mapRepo.getMapAPI(url)
    .then(body => {
        var trip = {
            id: req.body.tripId,
            tripLocation: body.results[0].formatted_address,
            tripLat: body.results[0].geometry.location.lat,
            tripLong: body.results[0].geometry.location.lng
        };

        tripRepo.updateTripLocation(trip)
        .then(body => {
            var c = {
                // address:body.results[0].formatted_address,
                // lat:body.results[0].geometry.location.lat,
                // lng:body.results[0].geometry.location.lng
            }
            res.json({
                returnCode: 1,
                message: "update trip location success!",
                object: c
            });
        })
        .catch(err=>{
                res.json({
                returnCode: 0,
                message: "update trip location fail!",
                error: err
            });
        })
    })
    .catch(err=>{
            res.json({
                returnCode:0,
                message:"get Lat Lng error!",
                error:err
            });
    })
}

exports.updateTripStatus = function(req,res) {
    var trip = {
        id: req.body.tripId,
        status: req.body.tripStatus
    }
    tripRepo.updateTripStatus(trip)
    .then(body => {
        var c = {
            // address:body.results[0].formatted_address,
            // lat:body.results[0].geometry.location.lat,
            // lng:body.results[0].geometry.location.lng
        }
        res.json({
            returnCode: 1,
            message: "update trip status success!",
            object: c
        });
    })
    .catch(err=>{
            res.json({
            returnCode: 0,
            message: "update trip status fail!",
            error: err
        });
    })
 }