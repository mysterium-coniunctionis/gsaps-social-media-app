# 🚀 Quick Start Guide for MacBook Pro

**Time to demo: ~5 minutes** ⏱️

This guide will get the GSAPS Social Media App running on your MacBook Pro in just a few steps.

---

## Prerequisites Check

Before starting, verify you have the required tools installed:

```bash
# Check Node.js version (should be v14 or higher)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

**Don't have Node.js?** Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)

---

## 🎯 5-Minute Setup

### Step 1: Clone the Repository

```bash
# Navigate to your preferred directory
cd ~/Projects  # or wherever you keep your code

# Clone the repository
git clone https://github.com/mysterium-coniunctionis/gsaps-social-media-app.git

# Enter the project directory
cd gsaps-social-media-app
```

### Step 2: Install Dependencies

```bash
# Install all required packages (this takes ~2 minutes)
npm install
```

You should see output like:
```
added 1432 packages in 1m 47s
```

### Step 3: Start the Development Server

```bash
# Start the app
npm start
```

The app will automatically:
1. Compile the React application
2. Open your default browser
3. Navigate to http://localhost:3000

**First launch may take 15-30 seconds to compile.**

---

## ✅ Verification

Once the app starts, you should see:

1. **Terminal output:**
   ```
   Compiled successfully!

   You can now view gsaps-social-media-app in the browser.

     Local:            http://localhost:3000
     On Your Network:  http://192.168.x.x:3000
   ```

2. **Browser:** GSAPS home page with navigation bar

---

## 🔐 Test Login

Use these test credentials to explore authenticated features:

```
Username: demo_user
Password: demo123
```

### What to Try:

1. **Feed** (`/feed`)
   - Create a post with text, images, or tags
   - React to posts with 8 emoji reactions
   - Add comments with @mentions
   - Check the notification center (bell icon)

2. **Research Library** (`/library`)
   - Browse papers with advanced filters
   - Click any paper to see full details
   - Try the rating & review system
   - Export citations in BibTeX, APA, or MLA
   - Join discussions on papers

3. **Members** (`/members`)
   - Search for members
   - Filter by role or status
   - View member profiles

4. **Theme Toggle**
   - Click the moon/sun icon in navbar
   - Watch animations as theme changes

---

## 📱 Mobile Testing

Want to test on your iPhone or iPad?

```bash
# Get your local IP address
ipconfig getifaddr en0

# Open this URL on your mobile device:
# http://[YOUR_IP]:3000
# Example: http://192.168.1.100:3000
```

**Note:** Make sure your mobile device is on the same WiFi network as your MacBook.

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

To restart:
```bash
npm start
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Dependencies Not Installing

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear React cache
rm -rf node_modules/.cache
npm start
```

### Browser Doesn't Open

Manually navigate to: http://localhost:3000

---

## 📖 Next Steps

Once you've verified the app works:

1. **Full Feature Demo**: See [DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md) for comprehensive walkthrough
2. **Component Documentation**: Check [UI_COMPONENTS_GUIDE.md](../development-guides/UI_COMPONENTS_GUIDE.md)
3. **Technical Details**: Read [PHASE_1_COMPLETION_REPORT.md](../../reports/phase/PHASE_1_COMPLETION_REPORT.md)

---

## 🎨 Feature Highlights

### What You're Seeing:

✅ **Modern UI** - Glassmorphism design with 25+ animations
✅ **Activity Feed** - Rich post composer with reactions and comments
✅ **Research Library** - Academic paper repository (unique feature!)
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Dark Mode** - Toggle between light and dark themes
✅ **Real-time Notifications** - Animated notification center

### Mock Data vs Real Data:

Currently the app uses **mock data** for demonstration. All features are fully functional:
- Posts, comments, reactions work locally
- Data persists in browser during session
- Perfect for testing UI/UX before API integration

---

## 💡 Pro Tips

1. **Multiple Accounts**: You can login/logout to test different user perspectives
2. **Clear Browser**: Use Cmd+Shift+R for hard refresh if styles look weird
3. **DevTools**: Open Chrome DevTools (Cmd+Option+I) to inspect React components
4. **Hot Reload**: File changes auto-reload the browser (no restart needed)
5. **Network Tab**: Watch mock API calls in browser DevTools Network tab

---

## 🚀 Production Build

Want to create a production build?

```bash
# Create optimized build
npm run build

# Serve the production build
npx serve -s build

# Open http://localhost:3000
```

Production build is:
- Minified and optimized
- ~217 kB gzipped
- Ready for deployment

---

## 📞 Need Help?

- **Documentation**: Check [README.md](../../README.md) for full details
- **Issues**: Report bugs on [GitHub Issues](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/issues)
- **Questions**: Ask in [GitHub Discussions](https://github.com/mysterium-coniunctionis/gsaps-social-media-app/discussions)

---

## ⚡ Quick Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm test` | Run test suite |
| `npm run build` | Create production build |
| `Ctrl+C` | Stop development server |

---

<div align="center">

**Ready to explore?** 🎉

[⬆ Back to README](../../README.md) • [📖 Full Demo Guide](DEMO_INSTRUCTIONS.md)

</div>
