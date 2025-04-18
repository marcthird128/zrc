// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (host) utils.js
// this contains host utilities
// for use in other modules

// import depedencies
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// fatal error
function fatal(msg) {
    // format msg
    msg = '\x1b[31m[FATAL] ' + msg + '\x1b[0m\n';

    // log to stderr
    process.stderr.write(msg);

    // exit
    console.log('Exiting');
    process.exit(1);
}

// normal error
function error(msg) {
    // format msg
    msg = '\x1b[31m' + msg + '\n\x1b[0m';

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

// prompt user
function prompt(p) {
    return new Promise(r => readline.question(p, r));
}

module.exports = { fatal, error, warn, prompt };