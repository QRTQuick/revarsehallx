# 📱 RevarseHallX Mobile App

Convert your React web app to Android APK with persistent local storage.

## 🚀 Quick Start

### Windows Users:
```bash
# Run the automated setup
npm run mobile:setup
```

### Manual Setup:
```bash
# Install dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/status-bar @capacitor/splash-screen @capacitor/keyboard @capacitor/storage

# Initialize and build
npx cap init RevarseHallX com.revarsehallx.app
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

## 📱 Available Commands

```bash
# Setup mobile environment (Windows)
npm run mobile:setup

# Development workflow
npm run mobile:dev

# Sync changes to mobile
npm run mobile:sync

# Run on device/emulator
npm run mobile:run

# Open Android Studio
npm run mobile:open

# Full build and open
npm run mobile:build
```

## 💾 Data Storage

✅ **User data is cached locally on the phone**
- Uses Capacitor Storage for mobile
- Falls back to localStorage for web
- Data persists across app restarts
- No internet required for core functionality

## 🏗️ Build APK

1. Run setup: `npm run mobile:setup`
2. Open Android Studio: `npm run mobile:open`
3. In Android Studio:
   - Build → Generate Signed Bundle/APK
   - Choose APK
   - Sign with keystore
   - Build release APK

## 📋 Requirements

- Node.js 16+
- Android Studio
- Java JDK 11+
- Android SDK

## 🎨 Features

- Black & red theme with orange accents
- HX logo with animated navigation
- Persistent local storage
- Responsive mobile design
- Offline functionality

Your app data is safely stored on the user's device! 🔒