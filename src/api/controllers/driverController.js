var userRepos=require('../repo/userRepo.js');
var tripRepos=require('../repo/tripRepo.js');
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; //Haversine Earth’s mean radius in meter
  var p1lat=parseFloat(p1.lat);
  var p1lng=parseFloat(p1.lng);
  var p2lat=parseFloat(p2.lat);
  var p2lng=parseFloat(p2.lng);

  var dLat = rad(p2lat - p1lat);
  var dLong = rad(p2lng - p1lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

var getListDistance=function(arrDriver,requestLocation){
	var list=[];
    arrDriver.map(driver=>{
    	if(driver.driver_status!=2)
    	{
    		var location={
    			lat:requestLocation.tripLatitude,
    			lng:requestLocation.tripLongitude
    		}
    		driver.dist=getDistance(driver.location, location);
    		list.push(driver);
    	}
    })
    return list.sort(function(a, b){
	    return a.dist-b.dist
    });
}
var send_request=function(soket_driver,request,check)
{
    return new Promise((resolve, reject) => {
    	var thoi_han=false;
    	soket_driver.emit("server_send_request",request);
    	
    	var action=setTimeout(()=>{
            reject(thoi_han);
    	}, 10000)

    	soket_driver.on("accept_request",function(data){
           console.log(`driver ${soket_driver.user.username} da chap nhan`);
           clearTimeout(action);
           thoi_han=true
           resolve(thoi_han);
        });
    })
}