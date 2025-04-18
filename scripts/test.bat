rem @echo off
copy "build/client.js" "test/client.js"
copy "scripts/client.bat" "test/client.bat"
cd test
start "Client" client.bat
cd ..