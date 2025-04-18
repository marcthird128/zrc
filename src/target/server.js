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
const { error, log } = require('./utils.js');

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
        error('Bad request body: ' + err.message);
        return res.end();
    }

    // make sure type property exists
    if (obj.type === undefined) {
        error('Expected "type" property in obj')
        return res.end();
    }

    log('Handling request for ' + req.url);

    // handle request
    if (obj.type == 'fsget') {
        // read a file or dir from root

        // make sure path property exists
        if (obj.path === undefined) {
            error('Expected "path" property in fsget request')
            return res.end();
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
            error(`Error checking if "${url}" is a directory: ${e.message}`);
            return res.end(`{"status":"error","message":"${btoa(e.message)}"}`);
        }

        // handle request
        if (!isDir) {
            // read file
            fs.readFile(url, (err, data) => {
                if (err) {
                    error('Error reading file "' + url + '": ' + err.message);
                    res.end(`{"status":"error","message":"${btoa(err.message)}"}`);
                } else {
                    res.end(`{"status":"ok","type":"file","data":"${btoa(data)}"}`);
                }
            });
        } else {
            // read dir
            fs.readdir(url, (err, data) => {
                if (err) {
                    error('Error reading dir "' + url + '": ' + err.message);
                    res.end(`{"status":"error","message":"${btoa(err.message)}"}`);
                } else {
                    res.end(`{"status":"ok","type":"dir","data":"${btoa(JSON.stringify(data))}"}`);
                }
            });
        }
    }
}

module.exports = { init };