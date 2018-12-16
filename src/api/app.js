var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
var userCtrl = require('./controllers/userController');
var tokenCtrl = require("./controllers/tokenController.js");
const tokenList = {};
var app = express();
app.use(morgan('dev'));
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

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs api'
    });
})

app.use('/user', require("./router/userRouter.js"));

var port = process.env.port || 8888;
var server = app.listen(port, () => {
    console.log(`api running on port ${port}`);
})


// socket
var array_socket = [];
var arr = [];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    arr.push(socket);
    socket.on("cnt", (data) => {
        console.log("connect");
        if (data) {
            let info = {
                username: data.username,
                password: data.password,
                type: data.type,
                socket: socket,
            }
            array_socket.push(info);
        }
    })

    socket.on("sendUserProfile", (data) => {
        console.log("send User Profile");
        if (data.refresh_token && data.refresh_token in tokenList == false)
            tokenList[data.refresh_token] = data;
    });

    socket.on('CreateNewToken', (data) => {
        console.log('create new token');
        var user = {
            username: tokenList[data].username,
            password: tokenList[data].password,
        }
        if (data && data in tokenList) {
            var access_token = tokenCtrl.generateToken(user);
            tokenList[data].access_token = access_token;
            socket.emit("CreateLocalStorage", access_token);
        }
    });

    socket.on("DeleteToken", (data) => {
        console.log("DeleteToken");
        delete tokenList[data];
    })

    socket.on('disconnect', function () {
    });

})
