const express = require('express'),
    app = express();

fs = require('fs'),

    http = require('http'),
    PORT = 3001,
    PORT2 = 8888;




// Cross origin resource sharing to cater for port 4200 to port 3000

const cors = require('cors');

app.use(cors());

//Enable CORS for all HTTP methods
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, post, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
// support parsing of application/json type post data

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data


/* Point static path to dist if you want use your own server
to serve Angular webpage to serve Angular webpage. Need run ng buld */
// app.use(express.static(__dirname + '/../dist/my-app'));
// console.log(__dirname);

const httpServer = http.Server(app);


const https = require('https'),
    options = {

        //generate a SSL certificate in the elf terminal.
        //openssl genrsa -out key.pem
        //openssl req -new -key key.pem -out csr.pem
        //openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
        //rm csr.pem
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')

    },
    httpsServer = https.createServer(options, app);




httpServer.listen(PORT2, function() {
    console.log(`http Server listening on port: ${PORT2}`);
});

httpsServer.listen(PORT, () => {
    console.log(`Starting htttps server at: ${PORT}`);
});

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter'));