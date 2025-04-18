@echo off
echo ZRC Test Script
copy "build\client.js" "test\client.js" > NUL
copy "scripts\client.bat" "test\client.bat" > NUL
cd test
start "Client" client.bat
cd ..