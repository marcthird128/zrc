// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (target) autorestart.js
// this code makes sure the target will
// restart when smth fails

// import dependencies
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