@echo off
echo 🚀 Starting mobile build process...
echo.

REM Step 1: Check if Capacitor is installed
echo 📦 Checking Capacitor installation...
npx cap --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Capacitor...
    npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/status-bar @capacitor/splash-screen @capacitor/keyboard @capacitor/storage
    echo ✅ Capacitor installed
) else (
    echo ✅ Capacitor is installed
)
echo.

REM Step 2: Initialize Capacitor if not done
if not exist "capacitor.config.ts" (
    echo 🔧 Initializing Capacitor...
    npx cap init RevarseHallX com.revarsehallx.app
    echo ✅ Capacitor initialized
    echo.
)

REM Step 3: Build React app
echo 🏗️ Building React app...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✅ React app built
echo.

REM Step 4: Add Android platform if not exists
if not exist "android" (
    echo 📱 Adding Android platform...
    npx cap add android
    echo ✅ Android platform added
    echo.
)

REM Step 5: Sync changes
echo 🔄 Syncing changes to mobile...
npx cap sync android
echo ✅ Changes synced
echo.

REM Final instructions
echo 🎉 Mobile build preparation complete!
echo.
echo 📋 Next steps:
echo 1. Run: npx cap open android
echo 2. In Android Studio:
echo    - Build → Generate Signed Bundle/APK
echo    - Choose APK
echo    - Sign with your keystore
echo    - Build release APK
echo.
echo 🔧 For development testing:
echo    npx cap run android
echo.
echo ✨ Your app is ready for mobile deployment!
pause