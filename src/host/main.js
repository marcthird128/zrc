// ZRC remote control program
// by Maza
//
// this program is free and u can
// use it without restrictions
//
// (host) main.js
// this is the main host code

// import dependencies
const { error, prompt } = require('./utils.js');
const { loadConfig, saveConfig, rl } = require('./config.js');

// main function
async function main() {
    // message
    console.log('\x1b[1mZRC Host v1.0.0\x1b[0m');
    console.log();
    console.log('Loading...');

    // load config
    const config = loadConfig();

    // loaded
    console.log('Loaded ZRC Host\n');

    // CLI
    console.log('ZRC Host CLI');
    console.log('Type "help" for help\n');
    while (1) {
        // prompt
        let input = await prompt('> ');

        // handle prompts
        if (input === 'exit') {
            console.log('Exiting');
            process.exit(0);
        } else if (input === 'help') {
            console.log('ZRC Host v1.0.0');
            console.log('Commands:');
            console.log();
            console.log('help: dipslay this help menu');
            console.log('exit: exit the program');
            console.log('config: edit or view config file, run "config help" for more info')
        } else if (input == 'config') {
            input = input.substring(6);
            args = input.split(/[ ]+/);
            if (args[0] === 'help') {
                console.log('Config commands:');
                console.log();
                console.log('view (path): view a config entry');
            } else {
                error('Unknown command: ' + input);
            }
        } else {
            error('Unknown command: ' + input);
        }

        // trailing newline
        console.log();
    }

}

// call main
main();