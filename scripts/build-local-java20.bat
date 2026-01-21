@echo off
echo 🚀 Building APK with Java 20 (Local)...
echo.

REM Step 1: Build React app
echo 🏗️ Building React app...
npm run build
if %errorlevel% neq 0 (
    echo ❌ React build failed!
    pause
    exit /b 1
)
echo ✅ React app built
echo.

REM Step 2: Remove existing Android platform
if exist "android" (
    echo 🗑️ Removing existing Android platform...
    rmdir /s /q android
)

REM Step 3: Add fresh Android platform
echo 📱 Adding fresh Android platform...
npx cap add android
if %errorlevel% neq 0 (
    echo ❌ Failed to add Android platform!
    pause
    exit /b 1
)
echo ✅ Android platform added
echo.

REM Step 4: Update Android build files for Java 20
echo 🔧 Configuring for Java 20...

REM Update gradle.properties
echo # Java 20 compatibility >> android\gradle.properties
echo org.gradle.java.home=%JAVA_HOME% >> android\gradle.properties

REM Update app build.gradle for Java 20
powershell -Command "(Get-Content android\app\build.gradle) -replace 'compileSdk = rootProject.ext.compileSdkVersion', 'compileSdk = rootProject.ext.compileSdkVersion`n    compileOptions {`n        sourceCompatibility JavaVersion.VERSION_20`n        targetCompatibility JavaVersion.VERSION_20`n    }' | Set-Content android\app\build.gradle"

REM Update variables.gradle for compatible SDK
powershell -Command "(Get-Content android\variables.gradle) -replace 'compileSdkVersion = 36', 'compileSdkVersion = 34' | Set-Content android\variables.gradle"
powershell -Command "(Get-Content android\variables.gradle) -replace 'targetSdkVersion = 36', 'targetSdkVersion = 34' | Set-Content android\variables.gradle"

echo ✅ Configured for Java 20
echo.

REM Step 5: Sync changes
echo 🔄 Syncing changes...
npx cap sync android
echo ✅ Changes synced
echo.

REM Step 6: Build APK
echo 🏗️ Building APK...
cd android
gradlew assembleDebug
if %errorlevel% neq 0 (
    echo ❌ APK build failed!
    echo.
    echo 💡 Try these solutions:
    echo 1. Make sure JAVA_HOME points to Java 20
    echo 2. Run: set JAVA_HOME=C:\Program Files\Java\jdk-20.0.2
    echo 3. Or install Java 21 for better compatibility
    pause
    exit /b 1
)

echo.
echo 🎉 APK built successfully!
echo 📱 APK location: android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 📋 To install on Android device:
echo 1. Copy APK to your phone
echo 2. Enable "Install from unknown sources"
echo 3. Install the APK
echo.
pause