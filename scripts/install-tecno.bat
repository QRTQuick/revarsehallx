@echo off
echo 📱 Tecno Pop 8 APK Installer
echo.

echo 🔧 Tecno Installation Instructions:
echo.
echo 📋 Method 1 - Tecno File Manager (Recommended):
echo 1. Download APK to your Tecno Pop 8
echo 2. Open Tecno File Manager (not third-party apps)
echo 3. Navigate to Downloads folder
echo 4. Tap on app-debug.apk
echo 5. Allow installation when prompted
echo.

echo 📋 Method 2 - Enable Unknown Sources:
echo 1. Settings → Security → Unknown sources → ON
echo 2. OR Settings → Privacy → Install unknown apps
echo 3. Select your file manager → Allow from this source
echo.

echo 📋 Method 3 - Disable HiOS Security (Temporarily):
echo 1. Settings → Security → HiOS Security
echo 2. Temporarily disable security scanning
echo 3. Install APK
echo 4. Re-enable security after installation
echo.

echo 📋 Method 4 - ADB Install (Most Reliable):
echo 1. Enable Developer Options:
echo    Settings → About phone → Build number (tap 7 times)
echo 2. Enable USB Debugging:
echo    Settings → Developer options → USB debugging (ON)
echo 3. Connect phone to PC
echo 4. Run: adb install app-debug.apk
echo.

REM Check if ADB is available for Method 4
adb version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ ADB is available on this PC
    echo.
    echo 🔍 Checking for connected Tecno device...
    adb devices
    echo.
    
    if exist "app-debug.apk" (
        echo 📱 APK file found!
        echo.
        set /p choice="Install APK via ADB now? (y/n): "
        if /i "%choice%"=="y" (
            echo 📱 Installing on Tecno Pop 8...
            adb install -r app-debug.apk
            if %errorlevel% equ 0 (
                echo.
                echo 🎉 APK installed successfully on Tecno Pop 8!
                echo 📱 Look for "RevarseHallX" app on your phone
            ) else (
                echo.
                echo ❌ Installation failed. Try manual installation methods above.
            )
        )
    ) else (
        echo ❌ APK file not found in current directory
        echo 📥 Download APK from: https://github.com/QRTQuick/revarsehallx/actions
    )
) else (
    echo ❌ ADB not available. Use manual installation methods above.
)

echo.
echo 💡 Tecno Pop 8 Tips:
echo - Use Tecno's own File Manager for best compatibility
echo - HiOS security may block installation - disable temporarily
echo - Android Go Edition optimized APK works better
echo - ADB method bypasses HiOS security restrictions
echo.
pause