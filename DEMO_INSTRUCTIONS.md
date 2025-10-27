# 🎬 GSAPS App - Local Demo Instructions

## Quick Start (2 minutes)

### 1. Start the App
```bash
npm start
```

### 2. Open Browser
Visit: **http://localhost:3000**

### 3. Login
Use any credentials (mock authentication):
- Username: `test`
- Password: `password`

---

## 🌟 Feature Tour (15 minutes)

### Activity Feed (`/feed`)

**Create a Post:**
1. Click the **+** button (bottom-right FAB)
2. Type your content
3. **Try @mentions**: Type `@` to see autocomplete
4. Select a user from the dropdown
5. Click "Post"

**React to Posts:**
1. Click the reaction button on any post
2. See 8 emoji reactions: 👍❤️😂😮😢😡🎉🤔
3. Hover over emojis for labels
4. Click an emoji to react
5. Click again to remove reaction
6. Click reaction count to see who reacted with what

**Comment:**
1. Click "Comment" button
2. Type your comment
3. **Reply to comments**: Click "Reply"
4. See nested comment threads

**Bookmark:**
- Click bookmark icon to save posts

---

### Research Library (`/library`) ⭐ KILLER FEATURE

**Browse Papers:**
1. Click "Library" in navigation
2. See research papers in grid view
3. Toggle to **list view** with the view button

**Search & Filter:**
1. **Search**: Type author, title, or keyword
2. **Filter by topic**: Select from dropdown (psilocybin, MDMA, etc.)
3. **Filter by year**: Select year range
4. **Sort**: Recent, popular, rating, citations, discussed
5. See active filters as removable chips
6. Results update in real-time

**Upload a Paper:**
1. Click "Upload Paper" button
2. **Drag & drop** a PDF file (or click to browse)
3. Must be PDF, max 25MB
4. Fill in metadata:
   - Title* (required)
   - Authors* (comma-separated)
   - Year* (dropdown)
   - Journal
   - DOI
   - Topics* (multi-select, required)
   - Abstract
   - Keywords
5. See upload progress bar
6. Click "Upload Paper"

**Interact with Papers:**
- **Bookmark**: Click bookmark icon
- **View stats**: See views, downloads, citations, discussions
- **Rate**: Star ratings visible
- **Discuss**: Discussion count shown (feature coming soon)

---

### Notifications (Bell Icon)

1. Click **bell icon** in navbar
2. See notification list with types:
   - 👍 Likes (red)
   - 💬 Comments (blue)
   - 👥 Follows (green)
   - 🔔 Group invites (orange)
   - 📅 Event reminders (purple)
3. Badge shows unread count with **pulse animation**
4. **Click notification** to navigate to content
5. **Mark as read** / **Delete** individual notifications
6. **Mark all as read** button

---

### User Profile

1. Click **avatar** in navbar → "Profile"
2. View your profile information
3. Click "Edit Profile"
4. Update:
   - Bio
   - Credentials
   - Research interests
5. Save changes

---

### Members Directory (`/members`)

1. Browse all community members
2. **Search** by name
3. **Filter** by role, research area
4. Click member to view profile

---

### Groups (`/groups`)

1. View study groups
2. **Filter** by topic
3. **Join** groups
4. View group details

---

### Events (`/events`)

1. Browse upcoming events
2. View event calendar
3. **RSVP** to events
4. See event details

---

### Messages (`/messages`)

1. View message inbox
2. See conversations
3. Click to open chat
4. Real-time interface (WebSocket ready)

---

## 🎨 Theme & Responsive Design

### Toggle Theme
1. Click **sun/moon icon** in navbar
2. Switch between light and dark modes
3. Notice smooth color transitions

### Responsive Breakpoints

**Desktop** (>960px):
- Full navigation in top navbar
- Wide layouts
- 3-column grid for papers

**Tablet** (600-960px):
- Medium layouts
- 2-column grid for papers

**Mobile** (<600px):
- **Bottom navigation** appears
- Single column layouts
- FAB buttons for primary actions

**Test it:**
- Resize browser window
- Try on mobile device
- Use browser DevTools responsive mode

---

## 🚀 Advanced Features

### Mentions System
1. Type `@` anywhere in post composer
2. See real-time autocomplete
3. **Search** by typing more characters
4. **Navigate** with arrow keys
5. **Select** with Enter or Tab key
6. Mentioned users tracked
7. Click away to dismiss

### Reaction System
1. **8 reaction types** with unique colors
2. **Animated picker** with hover effects
3. **Scale animation** on hover
4. **Heartbeat animation** on select
5. **Aggregate view** showing top reactions
6. **Detail popover** with full user list

### Animation Showcase
- **Fade in up** on page load
- **Pulse** on notification badge
- **Heartbeat** on reactions
- **Hover lift** on cards
- **Smooth transitions** everywhere

---

## 📊 Mock Data Details

The app runs with **realistic mock data**:

### Sample Users
- Dr. Alice Johnson (researcher)
- Bob Williams (neuroscience)
- Carol Davis (therapist)
- David Martinez (student)
- Emily Rodriguez
- Frank Chen

### Sample Papers
- Psilocybin for treatment-resistant depression
- MDMA-assisted therapy for PTSD
- Neural mechanisms of psychedelic neuroplasticity
- Ayahuasca pharmacology and therapeutics

### Sample Posts
- Research findings
- Conference announcements
- Reading recommendations
- Community discussions

---

## 🐛 Known Limitations (Mock Data)

1. **Authentication**: Any credentials work
2. **Data persistence**: Resets on refresh
3. **Real-time**: Not connected to WebSocket yet
4. **File uploads**: Files not actually uploaded to server
5. **API**: No backend calls yet

These will be resolved when connected to WordPress/BuddyBoss API.

---

## 💡 Pro Tips

1. **Create multiple posts** to see feed populated
2. **Try all 8 reactions** to see variety
3. **Upload a real PDF** to test file handling
4. **Use complex filters** to test search
5. **Resize window** frequently to test responsive design
6. **Toggle theme** to see design in both modes
7. **Open DevTools** to see no console errors
8. **Check bundle size** in Network tab (~208KB gzipped)

---

## 🎯 What to Look For

### Quality Indicators
✅ **Zero console errors**
✅ **Smooth animations**
✅ **Fast response times** (<100ms interactions)
✅ **Professional design**
✅ **Intuitive UX**
✅ **Mobile-friendly**
✅ **Accessible** (keyboard navigation works)

### Impressive Features
🌟 **Research Library** - Unique differentiator
🌟 **8 Emoji Reactions** - Facebook-style
🌟 **@Mentions with autocomplete** - Discord-style
🌟 **Glassmorphism UI** - Modern aesthetic
🌟 **Real-time search** - Instant results
🌟 **Nested comments** - Reddit-style threading

---

## 📱 Mobile Demo

### iOS Safari
1. Open on iPhone
2. Add to home screen
3. Launch as app

### Android Chrome
1. Open on Android
2. "Install app" prompt
3. Launch from home screen

---

## 🎥 Recording a Demo

### Suggested Flow (5-min video)
1. **Intro** (30s): Landing page, login
2. **Feed** (1min): Create post, mention, react, comment
3. **Library** (2min): Browse, search, filter, upload
4. **Notifications** (30s): View, navigate, manage
5. **Responsive** (30s): Resize, mobile view
6. **Theme** (30s): Toggle dark/light
7. **Outro** (30s): Summary, next steps

---

## 🔧 Troubleshooting

**App won't start:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Port 3000 in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
npm start
```

**Build fails:**
```bash
npm run build
# Check console for specific errors
```

---

## 📞 Get Help

- **GitHub Issues**: Report bugs
- **GitHub Discussions**: Ask questions
- **Documentation**: Check README.md, CONTRIBUTING.md

---

**Enjoy exploring the GSAPS app!** 🚀

If you discover anything impressive, share a screenshot! 📸
