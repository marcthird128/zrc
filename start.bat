@echo off
timeout /t 1 /nobreak
echo Starting ZRC client
node client.js > log.txt 2> error.txt