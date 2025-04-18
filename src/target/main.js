// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (target) main.js
// this is the main target code
// and should be called on startup

// setup error handling
require('./autorestart.js');

// import dependencies
const app = require('./app.js');
const { log } = require('./utils.js');
const config = require('./config.js');
const server = require('./server.js');

// main function
function main() {
    // message
    console.log('\x1b[1mZRC Target v1.0.0\x1b[0m');
    console.log();
    log('Loading...');
    
    // load confg
    app.config = config.load();
    app.autoRestart = app.config.autoRestart; // change auto restart
    log('Loaded config');

    // create http server
    log('Creating target HTTP server');
    server.init();
    log('Created target HTTP server');

    // initalize
    app.initialized = true;
    log('Initialized ZRC target');
}

// run main
main();