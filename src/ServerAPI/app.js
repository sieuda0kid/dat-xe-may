
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var userRepos=require('./repos/UserRepos.js');
var driver=require('./controller/DriverCtrl.js');
var tripRepos=require('./repos/TripRepos.js');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// thiet lap router
app.use('/user', require('./router/UserRouter.js'));
app.use('/refreshToken', require('./router/TokenRouter.js'));
app.use('/map', require('./router/MapRouter.js'));
app.use('/trip', require('./router/TripRouter.js'));


// chay server 
var num_port = 8888;
var port = process.env.port || num_port;
var server=app.listen(port, () =>{
    console.log("Link server: "+require("ip").address()+":" + port);
    console.log("Running server!!!");
})
app.get("/",(req,res)=>{
    res.end("WELCOME TO SERVICE BOOK CAR OF TESLA !!");
})


//SOCKET

var arr=[];
var arrDriver=[];
var arrRequest=[];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    socket.user={id:0};
    socket.location={};
    arr.push(socket);
    socket.driver_status=1;
    socket.premission=true;
        console.log('------------------');

    socket.on('disconnect', function(){
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log("         USER :         [ "+socket.user.username+" ]           OFFLINE       ");
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        if(socket.user.userType===4)
        {
            userRepos.updateStausDriver(socket.user.id,3).then(data=>{}).catch(err=>{console.log(err)});
        }
        arr.splice(arr.indexOf(socket.id),1);
        arrDriver.splice(arrDriver.indexOf(socket.id),1);

    });
    socket.on("location_driver",function(data){
        if(socket.user.userType===4){
            socket.location=data;
        }
    });
    socket.on("driver_online",function(data){
        if(socket.user.userType===4){
            driver.driverOnline(socket,data,arrDriver);
        }
    });
    socket.on("driver_offline",function(data){
        if(socket.user.userType===4){
            driver.driverOffline(socket,data,arrDriver);
        }
    });
    socket.on("begin_trip",function(data){
        if(socket.user.userType===4){
            driver.beginTrip(socket,data);
        }
    });
    socket.on("end_trip",function(data){
        if(socket.user.userType===4){
            driver.endTrip(socket,data,arrDriver);
        }
    });
    socket.on("done_locationer",function(data){
            driver.updateDoneLocation(data);
    });
    socket.on("request-client",function(data){
        arrRequest.push(data);
        console.log(data);
        if(data.status===2){
            driver.sendRequestForDriver(socket,data,arrDriver,io);
        }else {
            console.log("chuyến đi này đã hoàn thành !!");
        }  
    });
    //g
    socket.on("receive-request",function(data){
        arrRequest.push(data);
        driver.sendRequestForDriver10s(socket,data,arrDriver,arrRequest);
    });
    socket.on("refuse-request",function(data){
        arrRequest.push(data);
        driver.driverRefuseRequest(socket,data,arrDriver,arrRequest);
    });
    // socket.on("accept_request",function(data){
    //     arrRequest.splice(arrRequest.indexOf(data),1);
    // });
    socket.on("send_refresh_token",function(data){
        console.log("nhận được send_refresh_token "+data);
        if(data===null || data.length===0)
        {
               console.log("không nhận được send_refresh_token từ client");
        }else {
            userRepos.getUserByRefreshToken(data)
            .then(rows=>{
                if(rows.length>0)
                {
                    socket.user=rows[0];
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log("    USER :            [ "+socket.user.username+" ]        ONLINE   ");
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    if(socket.user.userType===4)
                    {
                        
                        arrDriver.push(socket);
                        userRepos.updateStausDriver(rows[0].id,1).then(data=>{}).catch(err=>{console.log(err)});
                        
                    }
                    //console.log(rows[0]);
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }   
    });

})
app.get("/haha",(req,res)=>{
     var user=[];
    if(arr.length>0)
    {
        arr.map(e=>{
           user.push({
            socket:e.id,
            userid:e.user.id,
            username:e.user.username,
            Type:e.user.userType
           }); 
        })
    }
    res.json({
        socket:user
    });
 
})
var guidata=(data,id,title)=>{
  console.log(data);
	 
	arr.map(socket=>{
		if(socket.user.id === id)
		{
            socket.emit(title,data);
        }
    });
}
var guidataForType=(data,title)=>{
   io.sockets.emit(title,data[0]);
}

var sendUpdate=(data,title)=>{
  console.log(data);
  tripRepos.getTripByTripId(data)
  .then(rows=>{
     console.log(rows[0]);
    io.sockets.emit(title,rows[0]);
  })
  .catch(err=>{
    console.log(err);
  })
}
module.exports.arrDriver=arrDriver;
module.exports.sendUpdate=sendUpdate;
module.exports.io=io;
module.exports.guidata=guidata;
module.exports.guidataForType=guidataForType;
module.exports.arrRequest=arrRequest

