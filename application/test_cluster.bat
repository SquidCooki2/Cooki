@echo off
title Ray Cluster Launcher
setlocal

REM === CONFIG ===
for /f "tokens=1,2 delims== " %%A in (config.env) do (
    set %%A=%%B
)

REM === Stop any previous Ray processes ===
ray stop --force
set RAY_ENABLE_WINDOWS_OR_OSX_CLUSTER=1
set GRPC_VERBOSITY=NONE
set RAY_grpc_port_range=20000,21000

REM === Start head node in a new terminal ===
start "Ray Head" cmd /k "set WORKER_NAME=head && ray start --head --port=%PORT% --dashboard-port=%DASHBOARD_PORT% --block"

REM Wait a bit for head to start
timeout /t 3 /nobreak >nul

REM === Start worker 1 in its own terminal ===
start "Worker 1" cmd /k "set WORKER_NAME=worker1 && ray start --address=127.0.0.1:%PORT% --num-cpus=2 --block"

REM === Start worker 2 in its own terminal ===
start "Worker 2" cmd /k "set WORKER_NAME=worker2 && ray start --address=127.0.0.1:%PORT% --num-cpus=2 --block"

REM === Wait before running Python ===
timeout /t 5 /nobreak >nul

REM === Run your Ray script ===
python main.py

pause
