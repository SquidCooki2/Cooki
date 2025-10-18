@echo off
setlocal

REM === Load config ===
for /f "tokens=1,2 delims== " %%A in (config.env) do (
    set %%A=%%B
)

REM === Environment settings ===
set CONDA_DIR=C:\Users\%USERNAME%\anaconda3
set ENV_NAME=raydemo
set PY_VERSION=3.10
set ENV_PYTHON=%CONDA_DIR%\envs\%ENV_NAME%\python.exe

REM === Create environment if missing ===
if not exist "%CONDA_DIR%\envs\%ENV_NAME%" (
    "%CONDA_DIR%\Scripts\conda.exe" create -n %ENV_NAME% python=%PY_VERSION% -y
)

REM === Install packages inside the environment using explicit python ===
"%ENV_PYTHON%" -m pip install --upgrade pip
"%ENV_PYTHON%" -m pip install "ray[default]" torch torchvision

REM === Start the Ray head node using environment python -m ray ===
echo.
echo Starting Ray head node...
"%CONDA_DIR%\envs\%ENV_NAME%\Scripts\ray.exe" start --head --port=6379 --dashboard-port=%DASHBOARD_PORT%
echo.
echo ✅ Ray head node started. Keep this window open.
