var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var userRepos = require('./repo/userRepo.js');
var driver = require('./controllers/driverController.js');
var tripRepos = require('./repo/tripRepo.js');


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// thiet lap cho router
// app.use('/user', require('./router/userRouter.js'));
// app.use('/refreshToken', require('./router/tokenRouter.js'));
// app.use('/map', require('./router/mapRouter.js'));
app.use('/user', require('./router/userRouter.js'));
app.use('/refreshToken', require('./router/tokenRouter.js'));
app.use('/map', require('./router/mapRouter.js'));
app.use('/trip', require('./router/tripRouter.js'));

app.get('/', (req, res) => {

})


// run server
var port = process.env.port || 8888;
var server = app.listen(port, () => {
    console.log('WELCOME TO SERVICE OF TESLA !!!');
    console.log(`api running on port ${port}`);
})


// socket
var arr = [];
var arrDriver = [];
var arrRequest = [];
var sk;
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    socket.user = { id: 0 };
    socket.location = {};
    arr.push(socket);
    socket.driver_status = 1;
    socket.premission = true;
    console.log("arr: " + arr.length);
    console.log("arrDriver: " + arrDriver.length);
    socket.on('disconnect', function () {
        // if (socket.user.username !== undefined)
        //     console.log("user : [ " + socket.user.username + "(" + socket.id + ")" + " ] OFFLINE");
        // if (socket.user.userType === 4) {
        //     if (socket.driver_status != 2) {
        //         userRepos.updateStatusDriver(socket.user.id, 3).then(data => { }).catch(err => { console.log(err) });
        //     }
        // }
        // if (socket.user.id != 0) {
        //     arr.splice(arr.indexOf(socket.id), 1);
        //     arrDriver.splice(arrDriver.indexOf(socket.id), 1);
        // }
    });

    socket.on("guidata", (data) => {
        guidata(data, data.id, data.title)
    })

    socket.on("log_out", (data) => {
        console.log("log out: " + socket.id);
        if (socket.user.userType === 4) {
            if (socket.driver_status != 2) {
                userRepos.updateStatusDriver(socket.user.id, 3).then(data => { }).catch(err => { console.log(err) });
            }
        }
        if (socket.user.id != 0) {
            arr.splice(arr.indexOf(socket.id), 1);
            arrDriver.splice(arrDriver.indexOf(socket.id), 1);
        }
        console.log("arrdriver: " + arrDriver.length);
        console.log("arr: " + arr.length);

        arrDriver.map(s => {
            console.log("socet: " + s.id);
        })
    })

    socket.on("update socket", data => {
        console.log("update socket");
        console.log("socket driver: " + socket.id);
        if (data.userType === 4) {
            var sk = getSocket(data);
            var user = arr[sk].user;
            var ds = arr[sk].driver_status;
            var pre = arr[sk].premission;
            var key = getSocketDriver(arr[sk]);
            arr[sk] = socket;
            arr[sk].user = user;
            arr[sk].driver_status = ds;
            arr[sk].premission = pre;
            arrDriver[key] = arr[sk];
            console.log('arrDriver Key:' + arrDriver[key].id);
        }
        arrDriver.map(s => {
            console.log("abc: " + s.id);
        })
    })
    socket.on("location_driver", function (data) {
        console.log("location driver");
        if (data.userType === 4) {
            var sk = getSocket(data);
            arr[sk].location = data.location;
        }
    });
    socket.on("driver_online", function (data) {
        console.log("driver change status online");
        if (data.userType === 4) {
            var sk = getSocket(data);
            if (sk !== -1)
                driver.driverOnline(arr[sk], data, arrDriver);
        }
    });
    socket.on("driver_offline", function (data) {
        console.log("driver change status offline");
        if (data.userType === 4) {
            var sk = getSocket(data);
            if (sk !== -1)
                driver.driverOffline(arr[sk], data, arrDriver);
        }
    });
    socket.on("begin_trip", function (data) {
        if (socket.user.userType === 4) {
            driver.beginTrip(socket, data);
        }
    });
    socket.on("end_trip", function (data) {
        if (socket.user.userType === 4) {
            driver.endTrip(socket, data, arrDriver);
        }
    });
    socket.on("done_locationer", function (data) {
        driver.updateDoneLocation(data, socket);
    });
    socket.on("request-client", function (data) {
        console.log("request-location");
        arrRequest.push(data);
        if (data.status != 5) {
            console.log("rc driver: " + arrDriver[0].id);
            if (arrDriver.length > 0)
                driver.sendRequestForDriver(socket, data, arrDriver);
            else
                console.log("chua co driver nao online");
        } else {
            console.log("Chuyen di nay da hoan tat !!");
        }
    });
    //g
    socket.on("receive-request", function (data) {
        arrRequest.push(data);
        driver.sendRequestForDriver10s(socket, data, arrDriver, arrRequest);
    });
    socket.on("refuse-request", function (data) {
        arrRequest.push(data);
        driver.driverRefuseRequest(socket, data, arrDriver, arrRequest);
    });
    socket.on("send_refresh_token", function (data) {
        console.log("nhan duoc send_refresh_token " + data);
        if (data === null || data.length === 0) {
            console.log("Khong nhan dc send_refresh_token tu client");
        } else {
            userRepos.getUserByRefreshToken(data)
                .then(rows => {
                    if (rows.length > 0) {
                        if (socket.user.username !== undefined)
                            console.log(" user : [ " + socket.user.username + "(" + socket.id + ")" + " ] ONLINE");
                        socket.user = rows[0];
                        if (socket.user.userType === 4) {
                            var push = true;
                            arrDriver.map(s =>{
                                if(s.user.id === socket.user.id)
                                    push = false;
                            })
                            if(push)
                                arrDriver.push(socket);
                            userRepos.getDriverByRefreshToken(data)
                                .then(result => {
                                    if (result[0].status === 2) {
                                        socket.driver_status = 2;
                                    } else {
                                        socket.driver_status = 1;
                                        userRepos.updateStatusDriver(rows[0].id, 1).then(data => { }).catch(err => { console.log(err) });
                                    }
                                })
                                .catch(err => console.log(err))
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });

})
app.get("/haha", (req, res) => {
    var user = [];
    if (arrDriver.length > 0) {
        arrDriver.map(e => {
            user.push({
                user: e.user,
                location: e.location
            });
        })
    }
    res.json({
        arrDriver: arrDriver.length,
        socket: user
    });

})
var guidata = (data, id, title) => {
    arr.map(socket => {
        if (socket.user !== undefined)
            if (socket.user.id === id) {
                socket.emit(title, data);
            }
    });
}
var guidataForType = (data, title) => {
    console.log("data tyep: " + data.tripLatitude);
    io.sockets.emit(title, data[0]);
}

var guidataForType2 = (data, title) => {
    console.log("data tyep: " + data.tripLatitude);
    io.sockets.emit(title, data);
}

var sendUpdate = (data, title) => {
    console.log("sendUpdate data: " + data);
    tripRepos.getTripByTripId(data)
        .then(rows => {
            console.log("rows: " + rows[0]);
            io.sockets.emit(title, rows[0]);
        })
        .catch(err => {
            console.log(err);
        })
}
var getSocket = (data) => {
    var kq = -1;
    arr.map((socket, key) => {
        if (socket.user.username !== undefined)
            if (socket.user.id === data.id)
                kq = key;

    });
    return kq;
}

var getSocketDriver = (data) => {
    var kq = -1;
    arrDriver.map((socket, key) => {
        if (socket.id === data.id)
            kq = key;
    });
    return kq;
}

module.exports.arrDriver = arrDriver;
module.exports.sendUpdate = sendUpdate;
module.exports.guidata = guidata;
module.exports.guidataForType = guidataForType;
module.exports.guidataForType2 = guidataForType2;
module.exports.arrRequest = arrRequest
