# ZRC

ZRC is a simple remote control / file sharing service that allows connecting to computers remotely.

## Download

[Server download](https://raw.githubusercontent.com/marcthird128/zrc/refs/heads/main/release/server.js) [Client download](https://raw.githubusercontent.com/marcthird128/zrc/refs/heads/main/release/client.js)

## Usage

Navigate to the directory you downloaded the files in. Run the command `node server.js` to start the server, and `node client.js 2> error.txt` to start the client. You need to save stderr to `error.txt` becuase the client is designed to send errors to the server and it needs to read from `error.txt`