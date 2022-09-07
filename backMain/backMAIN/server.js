var express = require('express');
var app = express();


var cors = require('cors')
app.use(cors());

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, post, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

app.use(express.json());

app.use(express.static(__dirname+'/../dist/app'));

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("My First Nodejs Server!");
    console.log("Server listening on: " + host + "port: " + port);
});

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter'));
app.post('/crtGrp', require('./router/createGroup'));