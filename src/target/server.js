// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (target) server.js
// runs a HTTP server on the target for requests
// from the host

// import dependencies
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('./app.js');
const { log, reqError, hash } = require('./utils.js');

// init & create server
function init() {
    app.targetServer = http.createServer(handleRequest);
    const data = app.config.listenOn.split(':');
    app.targetServer.listen(+data[1], data[0]);
    log('Target server listening on ' + app.config.listenOn);
}

// handle server request
function handleRequest(req, res) {    
    // convert to request object
    let obj = null;
    try {
        obj = JSON.parse(atob(req.url.substring(1)));
    } catch (err) {
        return res.end(reqError('Bad request: ' +err.message));
    }

    // check for password and username
    if (obj.password == undefined || obj.username == undefined) {
        return res.end(reqError("Expected username and password in request"));
    }

    // check password
    for (let i=0; i<app.config.auth.length; i++) {
        let auth = app.config.auth[i];

        // did we find a matching account?
        let authorized = false;

        // if this one matches then OK
        if (auth.username == obj.username && auth.password.toLowerCase() == hash(obj.password).toLowerCase()) {
            authorized = true;
            break;
        }

        // if not authorized...
        if (!authorized) {
            return res.end(reqError('Invalid username or password'));
        }
    }

    // make sure type property exists
    if (obj.type === undefined) {
        return res.end(reqError('Expected "type" property in request'));
    }

    // log that request was verified
    log('Request authenticated as "' + obj.username + '"');

    // handle request
    if (obj.type == 'fsget') {
        // read a file or dir from root

        // make sure path property exists
        if (obj.path === undefined) {
            return res.end(reqError('Expected "path" property in fsget request'));
        }

        // get filesystem root
        let root = process.platform == 'win32' ? 'C:/' : '/';

        // get url
        let url = path.join(root, obj.path);

        // is it a file or dir?
        let isDir;
        try {
            isDir = fs.lstatSync(url).isDirectory();
        } catch (e) {
            return res.end(`Error checking if "${url}" is a directory: ${e.message}`);
        }

        // handle request
        if (!isDir) {
            // read file
            fs.readFile(url, (err, data) => {
                if (err) {
                    res.end(reqError('Error reading file "' + url + '": ' + err.message));
                } else {
                    res.end(`{"status":"ok","type":"file","data":"${btoa(data)}"}`);
                }
            });
        } else {
            // read dir
            fs.readdir(url, (err, data) => {
                if (err) {
                    res.end(reqError('Error reading dir "' + url + '": ' + err.message));
                } else {
                    res.end(`{"status":"ok","type":"dir","data":"${btoa(JSON.stringify(data))}"}`);
                }
            });
        }
    }
}

module.exports = { init };