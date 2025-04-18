// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// utils.js
// this contains client utilities
// for use in other modules

// import deendencies
const { spawn } = require('child_process');
const app = require('./app.js');

// fatal error
function fatal(msg) {
    // format msg
    msg = '\x1b[31m[FATAL] ' + msg + '\x1b[0m\n';

    // log to stderr
    process.stderr.write(msg);

    // restart client
    if (app.autoRestart) startClient();

    // exit
    console.log('Exiting');
    process.exit(1);
}

// normal error
function error(msg) {
    // format msg
    msg = '\x1b[1;31m[ERROR] ' + msg + '\n\x1b[0m';

    // log to stderr
    process.stderr.write(msg);
}

// warning
function warn(msg) {
    // format msg
    msg = '\x1b[1;33m[WARN] ' + msg + '\n\x1b[0m';

    // log to stdout
    process.stdout.write(msg);
}

// log
function log(msg) {
    // format msg
    msg = '\x1b[1m[LOG]\x1b[0m ' + msg + '\n';

    // write to stdut
    process.stdout.write(msg);
}

// start a new client instance
function startClient() {
    console.log('Starting new client');
    
    // get restart script
    let restartScript = process.platform === 'win32' ? 'client.bat' : 'client.sh';
    
    // run it in new process
    spawn(restartScript, { shell: true, detached: true });
}

module.exports = { fatal, error, warn, log, startClient };