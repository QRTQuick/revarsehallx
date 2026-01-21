# 🚀 GitHub Actions APK Build Guide

## How It Works

When you push code to GitHub, it will **automatically build an APK** for you! Here's how:

## 📋 Setup Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Initial commit with mobile build"
git push origin main
```

### 2. GitHub Actions Will Automatically:
- ✅ Install Node.js and Android SDK
- ✅ Install all dependencies
- ✅ Build your React app
- ✅ Set up Capacitor for mobile
- ✅ Build the Android APK
- ✅ Create a release with downloadable APK

## 📱 Getting Your APK

### Method 1: From Actions Tab
1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Click on the latest workflow run
4. Scroll down to **"Artifacts"**
5. Download **"revarsehallx-debug-apk"**

### Method 2: From Releases (Automatic)
1. Go to your GitHub repository
2. Click **"Releases"** on the right side
3. Download the APK from the latest release

## 🔄 Workflow Triggers

### Automatic Builds:
- ✅ Every push to `main` or `master` branch
- ✅ Every pull request
- ✅ Creates automatic releases with APK downloads

### Manual Builds:
- ✅ Go to Actions tab → "Build Android APK" → "Run workflow"

## 📦 What You Get

### Debug APK (Development):
- **File**: `app-debug.apk`
- **Use**: Testing and development
- **Installation**: Enable "Unknown sources" on Android

### Release APK (Production):
- **File**: `app-release.apk` 
- **Use**: Distribution to users
- **Signing**: Can be configured with your keystore

## 🔐 Setting Up Signed APKs (Optional)

For production releases, you can add signing:

### 1. Create Keystore Locally:
```bash
keytool -genkey -v -keystore release.keystore -alias revarsehallx -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Add Secrets to GitHub:
Go to your repo → Settings → Secrets and variables → Actions

Add these secrets:
- `KEYSTORE_BASE64`: Base64 encoded keystore file
- `KEYSTORE_PASSWORD`: Your keystore password
- `KEY_ALIAS`: Your key alias (e.g., "revarsehallx")
- `KEY_PASSWORD`: Your key password

### 3. Convert Keystore to Base64:
```bash
# On Windows
certutil -encode release.keystore keystore.txt

# On Mac/Linux  
base64 release.keystore > keystore.txt
```

Copy the content of `keystore.txt` to the `KEYSTORE_BASE64` secret.

## 🎯 Quick Workflow

```bash
# 1. Make changes to your code
# 2. Commit and push
git add .
git commit -m "Updated app features"
git push origin main

# 3. Wait 5-10 minutes
# 4. Go to GitHub → Releases
# 5. Download the latest APK
# 6. Install on your Android device
```

## 📱 Installing the APK

### On Android Device:
1. Download APK from GitHub releases
2. Go to Settings → Security → Enable "Unknown sources"
3. Open the APK file
4. Tap "Install"
5. Open RevarseHallX app

## 🔍 Monitoring Builds

### Check Build Status:
- Green ✅ = Build successful, APK ready
- Red ❌ = Build failed, check logs
- Yellow 🟡 = Build in progress

### View Build Logs:
1. Go to Actions tab
2. Click on workflow run
3. Click on "build" job
4. Expand steps to see detailed logs

## 🚨 Troubleshooting

### Build Fails:
- Check the Actions logs for errors
- Ensure all dependencies are in package.json
- Verify capacitor.config.ts is correct

### APK Won't Install:
- Enable "Install from unknown sources"
- Check Android version compatibility
- Try clearing download cache

### App Crashes:
- Check if all required permissions are in AndroidManifest.xml
- Verify Capacitor plugins are properly installed

## ✨ Benefits

- 🚀 **Automatic**: No manual building required
- 🔄 **Continuous**: Every code change gets built
- 📦 **Downloadable**: APK available immediately
- 🆓 **Free**: GitHub Actions is free for public repos
- 📱 **Ready to Install**: APK works on any Android device

Now when you push to GitHub, you'll get an APK automatically! 🎉