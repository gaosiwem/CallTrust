@echo off
setlocal
set ADB="C:\Users\5907\AppData\Local\Android\Sdk\platform-tools\adb.exe"

echo ===================================================
echo   CallTrust Android Build ^& Run Script
echo ===================================================

echo [1/2] Preparing build environment...
:: Create a short build directory to bypass Windows 250 character limit
if not exist "C:\B\CT" mkdir "C:\B\CT"
%ADB% reverse tcp:3000 tcp:3000

echo [2/2] Running Expo Android...
echo Running from absolute C: path and using C:\B\CT for build objects.
cd /d "%~dp0\mobile"

call npx react-native run-android
