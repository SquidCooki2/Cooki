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

REM === Start Ray worker connecting to head node ===
echo.
echo Connecting to head node at %HEAD_ADDRESS%...
"%ENV_PYTHON%" -m ray start --address="%HEAD_ADDRESS%"
echo.
echo ✅ Ray worker started. Keep this window open.
pause
