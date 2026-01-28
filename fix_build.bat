@echo off
echo Cleaning up previous subst if exists...
subst T: /d >nul 2>&1

echo Mapping current directory to T:...
subst T: "%~dp0"
if errorlevel 1 (
    echo Failed to map drive T:. It might be in use.
    pause
    exit /b 1
)

echo Drive T: mapped successfully.
echo Changing directory to T:\mobile\android...
cd /d T:\mobile\android

echo Running Gradle Build (AssembleDebug)...
call gradlew.bat app:assembleDebug

if errorlevel 1 (
    echo Build Failed!
) else (
    echo Build Successful!
)

pause
