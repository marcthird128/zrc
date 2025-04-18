@echo off
type build/client.js > test/client.js
type build/server.js > test/server.js
cd test
start "Client" client.bat
start "Server" server.bat
exit