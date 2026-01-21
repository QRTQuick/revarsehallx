#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting mobile build process...\n');

// Step 1: Install Capacitor if not already installed
console.log('📦 Checking Capacitor installation...');
try {
  execSync('npx cap --version', { stdio: 'ignore' });
  console.log('✅ Capacitor is installed\n');
} catch (error) {
  console.log('📦 Installing Capacitor...');
  execSync('npm install @capacitor/core @capacitor/cli @capacitor/android', { stdio: 'inherit' });
  console.log('✅ Capacitor installed\n');
}

// Step 2: Initialize Capacitor if not already done
if (!fs.existsSync('capacitor.config.ts')) {
  console.log('🔧 Initializing Capacitor...');
  execSync('npx cap init RevarseHallX com.revarsehallx.app', { stdio: 'inherit' });
  console.log('✅ Capacitor initialized\n');
}

// Step 3: Build React app
console.log('🏗️  Building React app...');
execSync('npm run build', { stdio: 'inherit' });
console.log('✅ React app built\n');

// Step 4: Add Android platform if not exists
if (!fs.existsSync('android')) {
  console.log('📱 Adding Android platform...');
  execSync('npx cap add android', { stdio: 'inherit' });
  console.log('✅ Android platform added\n');
}

// Step 5: Sync changes
console.log('🔄 Syncing changes to mobile...');
execSync('npx cap sync android', { stdio: 'inherit' });
console.log('✅ Changes synced\n');

// Step 6: Instructions for final steps
console.log('🎉 Mobile build preparation complete!\n');
console.log('📋 Next steps:');
console.log('1. Run: npx cap open android');
console.log('2. In Android Studio:');
console.log('   - Build → Generate Signed Bundle/APK');
console.log('   - Choose APK');
console.log('   - Sign with your keystore');
console.log('   - Build release APK\n');

console.log('🔧 For development testing:');
console.log('   npx cap run android\n');

console.log('✨ Your app is ready for mobile deployment!');