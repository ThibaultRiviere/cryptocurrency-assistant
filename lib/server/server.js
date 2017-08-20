const fs = require('fs');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


class Server {
    constructor(config) {
        this.options = {
            key: fs.readFileSync(config.https.key),
            cert: fs.readFileSync(config.https.cert),
            requestCert: false,
            rejectUnauthorized: false
        };
        this.server = express();
        this.server.use(bodyParser.json());
    }
    
    listen(port) {
        https.createServer(this.options, this.server).listen(port);
    }
        
    post(uri, callback) { this.server.post(uri, callback) }
    get(uri, callback) { this.server.get(uri, callback) }
    delete(uri, callback) { this.server.delete(uri, callback) }
}


module.exports = Server;
