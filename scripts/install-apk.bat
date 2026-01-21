@echo off
echo 📱 RevarseHallX APK Installer
echo.

REM Check if ADB is available
adb version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ADB not found!
    echo.
    echo 💡 To install ADB:
    echo 1. Download Android SDK Platform Tools
    echo 2. Add to PATH environment variable
    echo 3. Or install Android Studio
    echo.
    echo 🔄 Alternative: Install manually on phone
    echo 1. Enable "Install unknown apps" in Settings
    echo 2. Use file manager to install APK
    pause
    exit /b 1
)

REM Check if APK file exists
if not exist "app-debug.apk" (
    echo ❌ APK file not found!
    echo.
    echo 📥 Please download APK first:
    echo 1. Go to: https://github.com/QRTQuick/revarsehallx/actions
    echo 2. Download latest artifact
    echo 3. Extract app-debug.apk to this folder
    echo.
    pause
    exit /b 1
)

echo 🔍 Checking connected devices...
adb devices

echo.
echo 📱 Installing RevarseHallX APK...
adb install -r app-debug.apk

if %errorlevel% equ 0 (
    echo.
    echo 🎉 APK installed successfully!
    echo 📱 Look for "RevarseHallX" app on your phone
    echo.
    echo ✅ Features:
    echo - Black & red theme with orange accents
    echo - Local data storage on your device
    echo - Offline message tracking
    echo - Follow-up reminders
    echo.
) else (
    echo.
    echo ❌ Installation failed!
    echo.
    echo 💡 Troubleshooting:
    echo 1. Enable USB Debugging on your phone
    echo 2. Enable Developer Options (tap Build Number 7 times)
    echo 3. Allow USB debugging when prompted
    echo 4. Try: adb install -r -d app-debug.apk
    echo.
    echo 🔄 Alternative methods:
    echo 1. Transfer APK to phone and install manually
    echo 2. Enable "Install unknown apps" for file manager
    echo 3. Use APK installer app from Play Store
)

echo.
pause