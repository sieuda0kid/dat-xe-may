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
    return list.sort(function (a, b) {
        return a.dist - b.dist
    });
}
var send_request = function (soket_driver, request, check) {
    return new Promise((resolve, reject) => {
        var thoi_han = false;
        soket_driver.emit("server_send_request", request);

        var action = setTimeout(() => {
            soket_driver.premission = false;
            reject(thoi_han);
        }, 15000)

        soket_driver.on("accept_request", function (data) {
            if (soket_driver.premission === true) {
                console.log(`===========> Driver ${soket_driver.user.username} đã chấp nhận chuyến đi`);
                clearTimeout(action);
                thoi_han = true
                resolve(thoi_han);
            }
        });
        soket_driver.on("destroy_request", function (data) {
            soket_driver.premission = false;
            console.log(`===========> Driver ${soket_driver.user.username} đã chấp nhận chuyến đi`);
            clearTimeout(action);
            thoi_han = true
            reject(thoi_han);
        });
    })
}

exports.sendRequestForDriver = function (socket, requestLocation, arrDriver) {
    var arrDistance = [];
    var arrDistance = getListDistance(arrDriver, requestLocation);
    console.log("socket ban dau: "+ arrDriver[0].id);
    console.log("So driver se gui: "+arrDistance.length);
    console.log("socket cua driver: "+arrDistance[0].id);
    tripRepos.updateTripStatus(requestLocation.id, 3).then(data => { }).catch(err => { console.log(err) });
    if (arrDistance.length > 0) {
        console.log("arrDistance: "+arrDistance.length);
        var tt = 0;
        var t = 0;
        var N = 10;
        console.log("N: "+N);
        var length = arrDistance.length;
        if (arrDistance.length > N) {
            length = N;
        }
        console.log(length);
        for (var i = 0; i <= length; i++) {
            (function (ind) {
                console.log("driver: "+ arrDistance[t].driver_status);
                console.log("driver: "+ arrDistance[t].user.username);
                var action = setTimeout(function () {
                    if (t === length) {
                        tripRepos.updateTripStatus(requestLocation.id, 7).then(data => {
                            app.sendUpdate(requestLocation.id, "update_status_trip");
                        }).catch(err => { console.log(err) });
                        tt = 1;
                    }
                    if (tt === 0) {
                        if (arrDistance[t].driver_status === 1) {
                            send_request(arrDistance[t], requestLocation)
                                .then(result => {
                                    arrDistance[t].request = requestLocation;
                                    //console.log(`===========> Driver ${arrDistance[t].user.username} đã chấp nhận chuyến đy`);
                                    console.log("ket thuc");
                                    arrDistance.map(e => {
                                        if (e.user.id === arrDistance[t].user.id) { e.driver_status = 2; }
                                    })

                                    tripRepos.updateDriverId(requestLocation.id, arrDistance[t].user.id).then(data => {
                                        app.sendUpdate(requestLocation.id, "update_status_trip");
                                    }).catch(err => { console.log(err) });

                                    tripRepos.saveLocation(requestLocation, arrDistance[t].user.id).then(data => {
                                    }).catch(err => { console.log(err) });

                                    tripRepos.updateTripStatus(requestLocation.id, 6).then(data => {
                                        app.sendUpdate(requestLocation.id, "update_status_trip");
                                    }).catch(err => { console.log(err) });
                                    userRepos.updateStausDriver(arrDistance[t].user.id, 2).then(data => {
                                        app.sendDriverUpdate(arrDistance[t].user.id, "update_status_driver")
                                    }).catch(err => { console.log(err) });
                                    tt = 1;

                                    console.log("thoi han:"+ result);
                                })
                                .catch(err => {
                                    console.log(err);
                                    console.log("driver nay khong nhan");
                                    t++;
                                });
                        }
                    }
                }, ind * 15000);
            })(i);
        }
    }
}
exports.endTrip = function (socket, data, arrDriver) {
    tripRepos.updateTripStatus(data.id, 5).then(res => {
        app.sendUpdate(data.id, "update_status_trip");
    }).catch(err => { console.log(err) });
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { e.driver_status = 1; }
    })
    userRepos.updateStausDriver(socket.user.id, 1).then(data => { }).catch(err => { console.log(err) });
}
exports.beginTrip = function (socket, data) {
    tripRepos.updateTripStatus(data.id, 4).then(res => {
        app.sendUpdate(data.id, "update_status_trip");
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
    userRepos.updateStatusDriver(socket.user.id, 1).then(data => { }).catch(err => { console.log(err) });
}

exports.driverOffline = function (socket, data, arrDriver) {
    arrDriver.map(e => {
        if (e.user.id === socket.user.id) { e.driver_status = 3; }
    })
    userRepos.updateStatusDriver(socket.user.id, 3).then(data => { }).catch(err => { console.log(err) });
}

exports.updateDoneLocation = function (data, socket) {
    tripRepos.updateTripStatus(data, 2).then(res => {
        app.sendUpdate(data, "update_status_trip");
    }).catch(err => { console.log(err) });
}