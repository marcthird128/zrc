@echo off
echo ZRC Test Script
rmdir test > NUL 2> NUL
md test > NUL 2> NUL
md test\client > NUL 2> NUL
md test\server > NUL 2> NUL
copy "build\client.js" "test\client\client.js" > NUL 2> NUL
copy "build\server.js" "test\server\server.js" > NUL 2> NUL
copy "scripts\client.bat" "test\client\client.bat" > NUL 2> NUL
copy "scripts\server.bat" "test\server\server.bat" > NUL 2> NUL
cd test\client
start "Client" client.bat
cd ..\server
start "Server" server.bat
cd ..