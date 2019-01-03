var tripRepo = require('../repo/tripRepo.js');
var mapRepo = require('../repo/mapRepo.js');
require('dotenv').config();
var moment=require('moment');
var socket=require('../app.js');

exports.getTripByDriverId=function(req,res){
    var c=req.body;
    tripRepo.getTripByDriverId(c.driverID)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
                returnCode:1,
                message:" lấy danh sách trip thành công!",
                object:rows
            })
        }else {
           res.json({
                returnCode:0,
                message:"không có trip nào !",
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
    })
}

//update vị trí chuyen di
exports.updateTripLocation = function(req,res) {
    var c=req.body;
    tripRepo.updateTripLocation(c)
    .then(rows=>{
        res.json({
            returnCode:1,
            message:"update TripLocation thanh công!",
        })
    })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"update TripLocation không thành công!",
            error:err
        });
    });
}


// lay tat ca cac chuyen
exports.getAllTrip=function(req,res){
    tripRepo.loadTripFull2()
    .then(rows=>{
        rows.map(m=>{
            m.password="";
        })
        res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
    })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip thất bại!",
            error:err
        });
    });
}

// trang thai chuyen di
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


//them khach va chuyen di
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
        var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${c.customerAddress}&key=${"AIzaSyCHY7K0nxdBJ2MVMMVe46mJP8PvoezIUvc"}`;
        var url = encodeURI(stringUrl);
        mapRepo.getMapAPI(url)
        .then(body=>{
            let lat=body.results[0].geometry.location.lat;
            let lng=body.results[0].geometry.location.lng;
            let lo=lat+","+lng;
            var trip={
                customerId:rows.insertId,
                driverId:0,
                tripLocation:lo,
                tripLongitude:lng,
                tripLatitude:lat,
                status:1,
                note: req.body.note,
                requestTime:moment().format('x'),
                isDelete:0
            }
            tripRepo.addTrip(trip)
            .then(data=>{
                trip.id=data.insertId;
                tripRepo.getTripByTripId(trip.id)
                .then(values=>{
                    socket.guidataForType(values,"server_send_trip");
                    res.json({
                        returnCode:1,
                        message:"Thêm khách hàng & chuyến đi thành công!",
                        object:{
                            trip:trip,
                            customer:customer
                        }
                    });
                })
                .catch(er=>{
                   res.json({
                    returnCode:0,
                    message:"Thêm khách hàng & chuyến đi thất bại!",
                    error:er
                });
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
        message:"Thêm khách hàng & chuyến đi thất bại!",
        error:err
    });
 });
}

//Lay chuyen di theo trang thai
exports.getTripByStatus=function(req,res){
    var c=req.body;
    tripRepo.getTripByStatus(c)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
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
    })
}

exports.getTripNonLocation=function(req,res){
    var c=req.body;
    tripRepo.getTripNonLocation()
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
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
    })
}

exports.getTripByTripId=function(req,res){
    var c=req.body;
    tripRepo.getTripByTripId(c.id)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy danh sách trip theo trip id thành công!",
            object:rows[0],
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
            object:rows
        })
       }
   })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip theo trip id thất bại!",
            error:err
        });
    })
}