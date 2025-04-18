@echo off
timeout /t 1 /nobreak > NUL
echo ZRC client launch script
echo.
node client.js 2> error.txt
exit