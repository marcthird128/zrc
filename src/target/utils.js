// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (target) utils.js
// this contains target utilities
// for use in other modules

// import deendencies
const crypto = require('crypto');
const { spawn } = require('child_process');
const app = require('./app.js');

// fatal error
function fatal(msg) {
    // format msg
    msg = '\x1b[31m[FATAL] ' + msg + '\x1b[0m\n';

    // log to stderr
    process.stderr.write(msg);

    // restart target
    if (app.autoRestart) startTarget();

    // exit
    console.log('Exiting');
    process.exit(1);
}

// normal error
function error(msg) {
    // format msg
    msg = '\x1b[31m[ERROR] ' + msg + '\n\x1b[0m';

    // log to stderr
    process.stderr.write(msg);
}

// warning
function warn(msg) {
    // format msg
    msg = '\x1b[33m[WARN] ' + msg + '\n\x1b[0m';

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

// start a new target instance
function startTarget() {
    log('Starting new target instance');
    
    // get restart script
    let restartScript = process.platform === 'win32' ? 'target.bat' : 'target.sh';
    
    // run it in new process
    spawn(restartScript, { shell: true, detached: true });
}

// sha256 hash
function hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

// create error message to send to host
function reqError(message) {
    error(message);
    return `{"status":"error","message":"${btoa(message)}"}`;
}

module.exports = { fatal, error, warn, log, startTarget, hash, reqError };