# 🔧 Fix Login Issue - Step by Step

## Issue: Demo account login failing

The mock authentication system is properly configured, but you may be experiencing caching issues or branch problems.

---

## ✅ SOLUTION 1: Verify Branch & Hard Refresh

### On Your MacBook Terminal:

```bash
# 1. Check what branch you're on
git branch --show-current

# Expected output: claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T
```

**If you're NOT on that branch:**

```bash
# Switch to the correct branch
git checkout claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T

# Pull latest
git pull origin claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T

# Stop any running servers
# Press Ctrl+C if npm start is running

# Clear cache
rm -rf node_modules/.cache

# Restart
npm start
```

### In Your Browser:

After `npm start` completes:

1. **Open DevTools**:
   - Press `Cmd + Option + I` (Chrome/Edge)
   - Press `Cmd + Option + C` (Safari)

2. **Clear Application Cache**:
   - **Chrome/Edge**: DevTools → Application tab → Storage → Clear site data
   - **Safari**: Develop menu → Empty Caches

3. **Hard Refresh**:
   - Press `Cmd + Shift + R`

4. **Try Login Again**:
   ```
   Username: demo_user
   Password: demo123
   ```

---

## ✅ SOLUTION 2: Clear LocalStorage Manually

Sometimes old authentication tokens cause issues.

### In Browser DevTools Console:

```javascript
// Clear all localStorage
localStorage.clear();

// Verify it's empty
console.log(localStorage);

// Refresh page
location.reload();
```

Then try logging in again.

---

## ✅ SOLUTION 3: Verify Mock Auth Files Exist

### In Terminal:

```bash
# Check if mock auth file exists
ls -la src/api/mockAuth.js

# Check if auth.js is using mock
grep -n "isDevelopmentMode" src/api/auth.js

# Verify you have the gamification files
ls -la src/context/GamificationContext.js
ls -la src/pages/Leaderboard.js
```

**Expected output:**
- All files should exist and show file sizes
- If any file is missing, you're on the wrong branch

---

## ✅ SOLUTION 4: Nuclear Option - Fresh Start

If nothing else works:

```bash
# Stop server (Ctrl+C)

# Delete everything and start fresh
rm -rf node_modules
rm -rf node_modules/.cache
rm -rf build
rm -rf .cache

# Reinstall
npm install

# Start fresh
npm start
```

---

## 🔍 Debug: Check What's Happening

### In Browser DevTools Console (while on login page):

```javascript
// Check if mock auth is being used
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API URL:', process.env.REACT_APP_API_URL);

// Try manual login
const username = 'demo_user';
const password = 'demo123';

// Check if user exists in mock database
const users = JSON.parse(localStorage.getItem('gsaps_mock_users') || '[]');
console.log('Mock users:', users);
console.log('demo_user exists:', users.find(u => u.username === 'demo_user'));
```

**Expected output:**
```
NODE_ENV: development
API URL: undefined
Mock users: Array[3] (should show 3 users)
demo_user exists: {id: 1, username: 'demo_user', ...}
```

---

## 📋 Demo Account Credentials (Reminder)

### Account 1: Regular User
```
Username: demo_user
Password: demo123
```

### Account 2: Admin
```
Username: admin
Password: admin_secure_123
```

### Account 3: Researcher
```
Username: researcher_jane
Password: research123
```

---

## 🐛 Common Error Messages & Fixes

### Error: "Invalid username or password"

**Cause**: Either wrong credentials OR localStorage has corrupted user data

**Fix**:
```javascript
// In browser console
localStorage.removeItem('gsaps_mock_users');
location.reload();
// Try login again
```

### Error: "Network Error" or "Failed to fetch"

**Cause**: App is trying to reach real API instead of using mock auth

**Fix**:
1. Verify you're on the correct branch
2. Clear cache and restart server
3. Check that `src/api/mockAuth.js` exists

### Error: Console shows "Cannot find module..."

**Cause**: Missing dependencies or wrong branch

**Fix**:
```bash
npm install
```

---

## ✅ Verification Checklist

Before trying to login, verify:

- [ ] You're on branch: `claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T`
- [ ] File exists: `src/api/mockAuth.js`
- [ ] File exists: `src/context/GamificationContext.js`
- [ ] Server shows: "Compiled successfully!"
- [ ] Browser console shows: `NODE_ENV: development`
- [ ] No red errors in browser console
- [ ] LocalStorage is clear (or has `gsaps_mock_users`)

---

## 🎯 Expected Successful Login Flow

1. **Enter credentials**: demo_user / demo123
2. **Click "Login"** button
3. **Loading spinner** appears briefly
4. **Redirect** to Feed page
5. **Welcome back!** - You're logged in
6. **See navbar** with Leaderboard link
7. **Avatar** appears in top-right

---

## 📞 Still Not Working?

Tell me:
1. **What branch are you on?**
   ```bash
   git branch --show-current
   ```

2. **What error message do you see?** (screenshot if possible)

3. **What does browser console show?** (F12 → Console tab)

4. **Do these files exist?**
   ```bash
   ls src/api/mockAuth.js
   ls src/context/GamificationContext.js
   ```

5. **What does this show?**
   ```bash
   git log --oneline -5
   ```

---

## 🚀 Quick Fix Script (Copy-Paste)

```bash
# Run this entire block in terminal:

# Go to project directory
cd ~/gsaps-social-media-app

# Ensure on correct branch
git checkout claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T

# Pull latest
git pull origin claude/merge-phase-3-to-main-011CUTHbuZi58dvDqR694A5T

# Kill any node processes
pkill -9 node

# Clean everything
rm -rf node_modules/.cache
rm -rf build

# Install
npm install

# Start fresh
npm start
```

Then in browser:
1. Clear cache (`Cmd + Shift + Delete`)
2. Hard refresh (`Cmd + Shift + R`)
3. Open DevTools Console (`Cmd + Option + I`)
4. Run: `localStorage.clear()`
5. Refresh again
6. Try login: demo_user / demo123

---

**This should fix the login issue!** Let me know what happens.
