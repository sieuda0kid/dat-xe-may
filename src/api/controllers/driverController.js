var userRepos = require('../repo/userRepo.js');
var tripRepos = require('../repo/tripRepo.js');
var app = require('../app.js');
var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
    var R = 6378137; //Haversine Earth’s mean radius in meter
    var p1lat = parseFloat(p1.lat);
    var p1lng = parseFloat(p1.lng);
    var p2lat = parseFloat(p2.lat);
    var p2lng = parseFloat(p2.lng);

    var dLat = rad(p2lat - p1lat);
    var dLong = rad(p2lng - p1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

var getListDistance = function (arrDriver, requestLocation) {
    var list = [];
    arrDriver.map(driver => {
        if (driver.driver_status != 2) {
            var location = {
                lat: requestLocation.tripLatitude,
                lng: requestLocation.tripLongitude
            }
            driver.dist = getDistance(driver.location, location);
            list.push(driver);
        }
    })

    arrDriver.map(d => {
        console.log("dist: " + d.dist);
        console.log("driver name: " + d.user.username)
        console.log("lat: " + d.location.lat);
        console.log("lng: " + d.location.lng);
    })
    return list.sort(function (a, b) {
        return a.dist - b.dist
    });
}

exports.sendRequestForDriver = function (requestLocation, arrDriver, numberN) {
    arrDriver.map(skt => {
        console.log("arrDriver: "+ skt.id);
    })
    var arrDistance = [];
    var arrDistance = getListDistance(arrDriver, requestLocation);
    console.log("distance: "+ arrDistance[0].id);
    var N = numberN;
    var length = arrDistance.length;
    tripRepos.updateTripStatus(requestLocation.id, 3).then(data => { }).catch(err => { console.log(err) });
    if (length > 0) {
        if (length > N) {
            length = N;
        }
        console.log(length);
        for (var i = 0; i < length; i++) {
            console.log("arr distance dirver offline: "+arrDistance[i].driver_status)
            if(arrDistance[i].driver_status !== 3)
                arrDistance[i].emit("server_send_request",requestLocation);
        }
    }
}
exports.endTrip = function (socket, data, arrDriver) {
    console.log("end trip");
    console.log("trip id: "+data.id)
    var trip ={
        id: data.id,
        status: 5,
    }
    tripRepos.updateTripStatus(trip).then(res => {
        app.sendUpdate(data.id, "update_status_trip");
    }).catch(err => { console.log(err) });
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { e.driver_status = 1; }
    })
    userRepos.updateStatusDriver(socket.user.id, 1).then(data => { 
        app.guidataForType(data,"update_status_driver");
    }).catch(err => { console.log(err) });
}
exports.beginTrip = function (socket, data,arrDriver) {
    console.log("begin trip");
    console.log("trip id: "+data.id)
    var trip = {
        id: data.id,
        status: 4,
    }
    tripRepos.updateTripStatus(trip).then(res => {
        app.sendUpdate(data.id, "update_status_trip");
    }).catch(err => { console.log(err) });
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { e.driver_status = 2; }
    })
    userRepos.updateStatusDriver(socket.user.id, 1).then(data => { 
        app.guidataForType(data,"update_status_driver");
    }).catch(err => { console.log(err) });
}

exports.updateStatusRequestWithDriver = function (data, requestLocation, arrDriver) {
    var arrDistance = [];
    var arrDistance = getListDistance(arrDriver, requestLocation);
    tripRepos.updateStatusRequestWithDriver(data).then(data => { }).catch(err => { console.log(err) });
}

exports.driverOnline = function (socket, data, arrDriver) {
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { e.driver_status = 1; }
    })
    userRepos.updateStatusDriver(socket.user.id, 1).then(data => { 
        app.guidataForType(data,"update_status_driver");
    }).catch(err => { console.log(err) });
}

exports.driverOffline = function (socket, data, arrDriver) {
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { 
            e.driver_status = 3; 
            console.log("socket driver offline: "+e.user.username);
        }
    })
    userRepos.updateStatusDriver(socket.user.id, 3).then(data => { 
        app.guidataForType(data,"update_status_driver");
    }).catch(err => { console.log(err) });
}

exports.updateDoneLocation = function (data, socket) {
    tripRepos.updateTripStatus(data, 2).then(res => {
        app.sendUpdate(data, "update_status_trip");
    }).catch(err => { console.log(err) });
}