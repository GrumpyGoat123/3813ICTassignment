var express = require('express');
var app = express();
const bodyParser = require('body-parser');

//Mongo Client
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = '3813ICT';
const colName = 'data';
const client = new MongoClient(url);
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.json());

//Conect to db server
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, client) {
    if (err) {return console.log(err)}
        console.log("Connected to mongo server");
        // Database Name
        const db = client.db(dbName);
  
        require('./router/user/createUser')(db, app);
        
});

//Cors
var cors = require('cors')
const http = require('http').Server(app);

//SOCKET 
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

app.use(cors());

//Cors enable all http methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, post, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());

app.use(express.static(__dirname+'/../dist/app'));
const sockets = require('./socket');
const server = require('./listen');
//LISTEN SERVER


const PORT = 3000;

sockets.connect(io, PORT);

server.listen(http, PORT);
//POST METHODS
//Login 
app.post('/login', require('./router/login/postLogin'));

//Groups
app.post('/crtGrp', require('./router/group/createGroup'));
app.post('/dltGrp', require('./router/group/deleteGroup'));

//Rooms
app.post('/crtRoom', require('./router/room/createRoom'));
app.post('/dltRoom', require('./router/room/deleteRoom'));

//Users
app.post('/addUserGroup', require('./router/user/addUserGroup'));
app.post('/dltUserGroup', require('./router/user/dltUserGroup'));
app.post('/addUserRoom', require('./router/user/addUserRoom'));
app.post('/dltUserRoom', require('./router/user/dltUserRoom'));


