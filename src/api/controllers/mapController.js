var mapRepo = require('../repo/mapRepo.js');
require('dotenv').config();

exports.getLatLong = function(req,res) {
    var address=req.body.address;
    var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${"AIzaSyCHY7K0nxdBJ2MVMMVe46mJP8PvoezIUvc"}`;
    var url = encodeURI(stringUrl); 
    mapRepo.getMapAPI(url)
    .then(body=>{
        var c={
            address:body.results[0].formatted_address,
            lat:body.results[0].geometry.location.lat,
            lng:body.results[0].geometry.location.lng
        }
    //	res.json(body);
        res.json({
             returnCode:1,
             message:"get Lat Lng success!",
             object:c
         });
    })
    .catch(err=>{
            res.json({
             returnCode:0,
             message:"get Lat Lng error!",
             error:err
         });
    })
}


/// mang vi tri
exports.getArrayLocation = function(req,res) {
    var address=req.body;
    var stringUrl=`https://maps.googleapis.com/maps/api/directions/json?origin=${address.start_lat},${address.start_lng}&destination=${address.end_lat},${address.end_lng}&transit_mode=bus&key=${"AIzaSyCHY7K0nxdBJ2MVMMVe46mJP8PvoezIUvc"}`
    var url = encodeURI(stringUrl); 
    mapRepo.getMapAPI(url)
    .then(body=>{
       res.json({
          returnCode:1,
          message:"get Array Location success!",
          object:body.routes[0].legs[0]
       });
    })
    .catch(err=>{
          res.json({
          returnCode:0,
          message:"get Array Location error!",
          error:err
       });
    })
 }

 exports.getAddressFromLatLng = function(req,res) {
    var latlng=req.body.latlng;
    var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${"AIzaSyCHY7K0nxdBJ2MVMMVe46mJP8PvoezIUvc"}`;
    var url = encodeURI(stringUrl); 
    mapRepo.getMapAPI(url)
    .then(body=>{
        var c={
            address:body.results[0].formatted_address
        }
    //	res.json(body);
        res.json({
             returnCode:1,
             message:"get address success!",
             object:c
         });
    })
    .catch(err=>{
            res.json({
             returnCode:0,
             message:"get address error!",
             error:err
         });
    })
 }