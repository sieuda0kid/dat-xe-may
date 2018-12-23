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
            soket_driver.premission=false;
            reject(thoi_han);
    	}, 10000)

    	soket_driver.on("accept_request",function(data){
            if(soket_driver.premission===true){
            console.log(`===========> Driver ${soket_driver.user.username} đã chấp nhận chuyến đy`);
           clearTimeout(action);
           thoi_han=true
           resolve(thoi_han);
            }  
        });
        soket_driver.on("destroy_request",function(data){
            soket_driver.premission=false;
           console.log(`===========> Driver ${soket_driver.user.username} đã chấp nhận chuyến đy`);
           clearTimeout(action);
           thoi_han=true
           reject(thoi_han);
        });
    })
}



exports.sendRequestForDriver=function(socket,requestLocation,arrDriver){
    var arrDistance=[];
    var arrDistance=getListDistance(arrDriver,requestLocation);
    if(arrDistance.length>0)
    {
        var tt=0;
        var t=0;
        for (var i=0;i<=arrDistance.length;i++) {

            (function(ind) {
                var action=setTimeout(function(){
                    if(t==arrDistance.length)
                    {
                        tripRepos.updateTripStatus(requestLocation.id,7).then(data=>{}).catch(err=>{console.log(err)});
                        tt=1;
                    }
                    if(tt==0)
                    {
                        if(arrDistance[t].driver_status===1){
                            send_request(arrDistance[t],requestLocation)
                        .then(result=>{
                            console.log("Ket Thuc");
                            arrDistance.map(e=>{
                                if(e.user.id===arrDistance[t].user.id){e.driver_status=2;}
                            })
                            
                            tripRepos.updateDriverId(requestLocation.id,arrDistance[t].user.id).then(data=>{}).catch(err=>{console.log(err)});
                            tripRepos.updateTripStatus(requestLocation.id,6).then(data=>{}).catch(err=>{console.log(err)});
                            userRepos.updateStausDriver(arrDistance[t].user.id,2).then(data=>{}).catch(err=>{console.log(err)});
                            tt=1;
                        })
                        .catch(err=>{
                            console.log(err);
                            console.log("Driver Khong Nhan");
                            t++;
                        });
                        }
                    }
                }, ind*11000);
            })(i);
        }
    }

}
exports.endTrip=function(socket,data,arrDriver){
   tripRepos.updateTripStatus(data.id,5).then(data=>{}).catch(err=>{console.log(err)});
   arrDriver.map(e=>{
       if(e.user.id===socket.user.id){e.driver_status=1;}
   })
   userRepos.updateStausDriver(socket.user.id,1).then(data=>{}).catch(err=>{console.log(err)});
}
exports.beginTrip=function(socket,data){
   tripRepos.updateTripStatus(data.id,4).then(data=>{}).catch(err=>{console.log(err)});
}


exports.updateStatusRequestWithDriver=function(socket,requestLocation,arrDriver){
   var arrDistance=[];
   var arrDistance=getListDistance(arrDriver,requestLocation);
   tripRepos.updateStatusRequestWithDriver(data).then(data=>{}).catch(err=>{console.log(err)});
}

exports.driverOnline=function(socket,data,arrDriver){
    arrDriver.map(e=>{
        if(e.user.id===socket.user.id){e.driver_status=1;}
    })
    userRepos.updateStausDriver(socket.user.id,1).then(data=>{}).catch(err=>{console.log(err)});
}



exports.driverOffline=function(socket,data,arrDriver){
    arrDriver.map(e=>{
        if(e.user.id===socket.user.id){e.driver_status=3;}
    })
    userRepos.updateStausDriver(socket.user.id,3).then(data=>{}).catch(err=>{console.log(err)});
}
