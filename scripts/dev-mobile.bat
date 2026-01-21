@echo off
echo 🔄 Development mobile sync...
echo.

echo 🏗️ Building React app...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo 🔄 Syncing to mobile...
npx cap sync android

echo 📱 Running on Android device/emulator...
npx cap run android

echo ✅ Development sync complete!
pause