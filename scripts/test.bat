@echo off
echo ZRC Test Script
rmdir /s /q test > NUL 2> NUL
md test > NUL 2> NUL
md test\target > NUL 2> NUL
md test\host > NUL 2> NUL
copy "build\target.js" "test\target\target.js" > NUL 2> NUL
copy "build\host.js" "test\host\host.js" > NUL 2> NUL
copy "scripts\target.bat" "test\target\target.bat" > NUL 2> NUL
copy "scripts\host.bat" "test\host\host.bat" > NUL 2> NUL
cd test\target
start "Target" target.bat
cd ..\host
start "Host" host.bat
cd ..