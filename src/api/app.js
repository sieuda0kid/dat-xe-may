var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
var userCtrl = require('./controllers/userController');

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
app.use('/user', require('./router/userRouter.js'));
app.use('/refreshToken', require('./router/tokenRouter.js'));
app.use('/map', require('./router/mapRouter.js'));

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs api'
    });
})

app.use('/user', userCtrl);

var port = process.env.port || 8888;
app.listen(port, () => {
    console.log(`api running on port ${port}`);
})


// socket
var arr=[];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    socket.user={id:0};
    arr.push(socket);
    socket.re_status=[{key:0}];
    console.log('a user connected id= '+socket.id);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        arr.splice(arr.indexOf(socket.id),1);

    });
    socket.on("gui_data",function(data){
        console.log(data);
    });
    socket.on("send_refresh_token",function(data){
        console.log(data);
        if(data===null || data.length===0)
        {
               console.log("không nhan dc send_refresh_token tu client");
        }else {
            token.getUserByRefreshToken(data)
            .then(rows=>{
                if(rows.length>0)
                {
                    socket.user=rows[0];
                    //console.log(rows[0]);
                    socket.re_status.dang_ky_nhan_token=1;
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }   
    });

})
exports.guidata=(data,id)=>{
	 console.log(data);
	// console.log("id="+id);
	// console.log("arr length ="+arr.length);

	arr.map(socket=>{
		if(socket.user.id === id && socket.re_status["dang_ky_nhan_token"] === 1)
		{
       	    socket.emit("token",data);
		}
	});
    }
