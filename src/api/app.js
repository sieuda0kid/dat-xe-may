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