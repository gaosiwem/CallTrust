@echo off
echo Cleaning Android build caches...
rmdir /s /q .gradle
rmdir /s /q build
rmdir /s /q app\.cxx
rmdir /s /q app\build
rmdir /s /q .kotlin
echo Cleanup complete.
