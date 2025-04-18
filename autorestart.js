// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// autorestart.js
// this code makes sure the client will
// restart when smth fails

// import dependencies
const fs = require('fs');
const app = require('./app.js');
const { fatal } = require('./utils.js');

// init
function init() {
    process.on('uncaughtException', handleError);
    process.on('unhandledRejection', handleError);
}

// handle errors
function handleError(err) {
    // fatal error handling
    fatal('[!] Unhandled Error: ' + err.stack);    
}

init();