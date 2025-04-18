// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (host) config.js
// handles reading and writing
// to host config

// import dependencies
const fs = require('fs');
const { fatal, error } = require('./utils.js');

// config path
const configPath = './config.json';

// default config
const defaultConfig =
`{
    "username": "user",
    "password": "password",
    "target": "127.0.0.1:65535"
}`

// load config
function loadConfig() {
    // read file
    let data;
    try {
        data = fs.readFileSync(configPath, 'utf8');
    } catch (e) {
        error('Error reading config file: ' + e.message);

        // write default config
        console.log('Writing default config');
        try {
            fs.writeFileSync(configPath, defaultConfig, 'utf8');
        } catch (e) {
            fatal('Error writing default config: ' + e.message);
        }

        // return default config
        return JSON.parse(defaultConfig);
    }

    // parse config
    try {
        return JSON.parse(data);
    } catch (e) {
        fatal('Error parsing config: ' + e.message);
    }
}

// save config
function saveConfig(config) {
    try {
        const data = JSON.stringify(config, null, 4);
        fs.writeFileSync(configPath, data, 'utf8');
    } catch (e) {
        error('Error writing config file: ' + e.message);
    }
}

module.exports = { loadConfig, saveConfig };