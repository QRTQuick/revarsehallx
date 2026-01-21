# 📱 RevarseHallX - Outbound Message Tracker

A sleek mobile app for tracking outbound communications with automatic follow-up reminders. Built with React and converted to Android APK with persistent local storage.

## 🎨 Features

- **Black & Red Theme** with orange accents
- **HX Logo** with animated navigation
- **Local Data Storage** - all data cached on your phone
- **Offline Functionality** - works without internet
- **AI-Powered** follow-up suggestions
- **Cross-Platform** - works on web and mobile

## 📱 Get the APK

### Automatic Builds from GitHub:
1. Every push to this repo automatically builds an APK
2. Go to **[Releases](../../releases)** to download the latest APK
3. Or check **[Actions](../../actions)** tab for build artifacts

### Manual Build:
```bash
# Setup mobile build environment
npm run mobile:setup

# Open Android Studio to build APK
npm run mobile:open
```

## 🚀 Quick Start

### For Users:
1. Download APK from [Releases](../../releases)
2. Enable "Install from unknown sources" on Android
3. Install and enjoy!

### For Developers:
```bash
# Clone and install
git clone <repo-url>
cd revarsehallx
npm install

# Run web version
npm run dev

# Build mobile version
npm run mobile:setup
```

## 💾 Data Storage

✅ **Your data stays on your phone**
- Uses Capacitor Storage for mobile
- Falls back to localStorage for web  
- Data persists across app restarts
- No cloud storage - complete privacy

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Mobile**: Capacitor (React → Android APK)
- **Storage**: Local storage (Capacitor Storage + localStorage)
- **AI**: Google Gemini for follow-up suggestions
- **Build**: Vite, GitHub Actions

## 📋 Available Scripts

```bash
# Web development
npm run dev          # Start development server
npm run build        # Build for production

# Mobile development  
npm run mobile:setup # Setup mobile environment
npm run mobile:dev   # Development mobile sync
npm run mobile:sync  # Sync changes to mobile
npm run mobile:run   # Run on Android device
npm run mobile:open  # Open Android Studio
```

## 🔄 Development Workflow

1. Make changes to React code
2. Push to GitHub
3. GitHub Actions automatically builds APK
4. Download from Releases tab
5. Install on Android device

## 📱 Installation

### From GitHub Releases:
1. Go to [Releases](../../releases)
2. Download the latest APK
3. Install on Android device

### Build Requirements:
- Node.js 16+
- Android Studio (for manual builds)
- Java JDK 11+

## 🎯 App Structure

```
├── components/          # React components
│   ├── ui/             # UI components (HX Logo)
│   ├── Dashboard.tsx   # Main dashboard
│   ├── MessageForm.tsx # Message creation
│   └── ...
├── modules/            # Modular architecture
│   ├── types/          # TypeScript definitions
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── .github/workflows/  # GitHub Actions
└── android/           # Capacitor Android files
```

## 🔐 Privacy & Security

- **Local Storage Only**: No data sent to servers
- **Offline First**: Works without internet connection
- **Device Encryption**: Data encrypted by Android system
- **No Tracking**: No analytics or user tracking

## 🚨 Troubleshooting

### APK Won't Install:
- Enable "Install from unknown sources"
- Check Android version (6.0+)
- Clear download cache

### App Crashes:
- Ensure Android 6.0 or higher
- Check available storage space
- Restart device if needed

### Build Issues:
- Check [Actions](../../actions) tab for build logs
- Ensure all dependencies are installed
- Verify Node.js version (16+)

## 📄 License

MIT License - feel free to use and modify!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Push and create pull request
5. APK will be automatically built for testing

---

**🎉 Your outbound messages, tracked beautifully on mobile!**