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

exports.getAllTrip=function(req,res){
    tripRepo.loadTrip()
    .then(rows=>{
        if(rows.length>0)
        {
            res.json({
                returnCode:1,
                message:" lấy danh sách trip thành công!",
                object:rows
            })
        }
    })
    .catch(err=>{
        res.json({
                returnCode:0,
                message:"lấy danh sách trip thất bại!",
                error:err
            });
    });
}

exports.addCustomerAndTrip=function(req,res){
    var c=req.body;
    var users=req.user_token;
    tripRepo.addCustomer(c)
    .then(rows=>{
        console.log("them Customer thanh cong");
        console.log(rows.insertId);
        var customer={
            id:rows.insertId,
            customerName:c.customerName,
            customerPhone:c.customerPhone,
            customerAddress:c.customerAddress,
            isDelete:c.isDelete
        }
       // var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${c.customerAddress}&key=${process.env.key}`;
       // var url = encodeURI(stringUrl);
        mapRepo.getMapAPI(url)
        .then(body=>{
            let lat=body.results[0].geometry.location.lat;
            let lng=body.results[0].geometry.location.lng;
            let lo=lat+","+lng;
            //customerId,driverId,tripLocation,tripLongitude,tripLatitude,status,note,requestTime,isDelete
            var trip={
                customerId:rows.insertId,
                driverId:0,
                tripLocation:lo,
                tripLongitude:lng,
                tripLatitude:lat,
                status:0,
                note:"chưa có nội dung",
                requestTime:moment().format('x'),
                isDelete:0
            }
            console.log(trip);
            tripRepo.addTrip(trip)
            .then(data=>{
                trip.id=data.insertId;
                socket.guidata(trip,users.user.id,"server_send_trip");
                res.json({
                returnCode:1,
                message:"thêm customer & trip thành công!",
                object:{
                    trip:trip,
                    customer:customer
                }
            });
            })
            .catch(err=>{
                console.log(err);
            });
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch(err=>{
         res.json({
                returnCode:0,
                message:"thêm customer không thành công!",
                error:err
            });
    });
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