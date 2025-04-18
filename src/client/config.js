// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// config.js
// this loads the client config

// import dependencies
const fs = require('fs');
const { fatal, error, log } = require('./utils.js');

// config path
const configPath = './config.json';

// default config
const defaultConfig =
`{
    "autoRestart": false,
    "client": "127.0.0.1:65535",
    "server": "10.0.0.65:65535"
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