// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (target) config.js
// this loads the target config

// import dependencies
const fs = require('fs');
const { fatal, error, log } = require('./utils.js');

// config path
const configPath = './config.json';

// default config
const defaultConfig =
`{
    "autoRestart": false,
    "listenOn": "127.0.0.1:65535",
    "auth": [
        {
            "username": "user",
            "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
        }
    ]
}`

// load config
function load() {
    log('Loading config');
    let string;

    // try to load config
    try {
        string = fs.readFileSync(configPath, {encoding: 'utf8'});
    } catch (e) {
        // could not load config
        error('Could not load config file: ' + e.message);

        // create default config
        log('Creating default config');
        try {
            fs.writeFileSync(configPath, defaultConfig);
            
            // try again
            log('Trying to load config again');
            return load();
        } catch (e) {
            // could not create config
            fatal('Could not create config: ' + e.message);
        }
    }

    // parse config
    try {
        return JSON.parse(string);
    } catch (e) {
        // could not parse config
        fatal('Could not parse config: ' + e.message);
    }
}

module.exports = { load };