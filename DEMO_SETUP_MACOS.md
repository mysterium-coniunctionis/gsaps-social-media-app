# 🚀 GSAPS Demo App - macOS Setup Guide

Complete step-by-step instructions to run the full demo app on your Mac.

---

## Prerequisites

Before starting, make sure you have:

1. **Node.js** (v16 or higher) - Check with: `node --version`
   - If not installed: Download from https://nodejs.org/ or use `brew install node`

2. **PostgreSQL** - Check with: `postgres --version`
   - If not installed: `brew install postgresql@15`

---

## Part 1: Database Setup (One-Time Only)

### Step 1: Start PostgreSQL

```bash
# Start PostgreSQL service
brew services start postgresql@15

# Verify it's running
brew services list | grep postgresql
```

### Step 2: Create the Database

```bash
# Connect to PostgreSQL
psql postgres

# In the PostgreSQL prompt, create the database:
CREATE DATABASE gsaps_app;

# Create a user (optional, or use your default user)
# CREATE USER gsaps WITH PASSWORD 'your_password';
# GRANT ALL PRIVILEGES ON DATABASE gsaps_app TO gsaps;

# Exit PostgreSQL prompt
\q
```

---

## Part 2: Backend Server Setup

### Step 1: Navigate to Server Directory

```bash
cd ~/path/to/gsaps-social-media-app/server
```
*(Replace `~/path/to/` with your actual project location)*

### Step 2: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit the .env file
nano .env
```

**Update .env with your database info:**
```env
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/gsaps_app"
JWT_SECRET="super-secret-key-change-this-in-production"
PORT=4000
```

*Replace `YOUR_USERNAME` with your macOS username or PostgreSQL user*

Press `CTRL+X`, then `Y`, then `ENTER` to save and exit.

### Step 3: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with demo data
npm run seed
```

You should see messages about demo users, posts, courses, etc. being created.

### Step 4: Start Backend Server

```bash
npm start
```

✅ **Backend is now running on http://localhost:4000**

Leave this terminal window open! The server needs to keep running.

---

## Part 3: Frontend Setup

### Step 1: Open a NEW Terminal Window

Press `CMD+T` to open a new terminal tab, or open a completely new Terminal window.

### Step 2: Navigate to Project Root

```bash
cd ~/path/to/gsaps-social-media-app
```

### Step 3: Configure Frontend Environment (Optional)

```bash
# Copy the example env file
cp .env.example .env

# Edit if you want to customize
nano .env
```

**For local backend, set:**
```env
REACT_APP_API_URL=http://localhost:4000
```

Press `CTRL+X`, then `Y`, then `ENTER` to save.

### Step 4: Start Frontend Server

```bash
npm start
```

The React app will automatically compile and open in your default browser at **http://localhost:3000**

✅ **Frontend is now running!**

---

## Part 4: Demo the App

### Demo Credentials

The seeded database includes these test accounts:

- **Username:** `alice` | **Password:** `password123`
- **Username:** `bob` | **Password:** `password123`
- **Username:** `charlie` | **Password:** `password123`

Or create a new account using the Register page.

### What to Explore

1. **Feed** - View and create posts
2. **Members** - Browse community members
3. **Groups** - Join and participate in groups
4. **Events** - View and RSVP to events
5. **Courses** - Browse and enroll in courses
6. **Research Library** - Upload and read research papers
7. **Messages** - Real-time chat with other members
8. **Leaderboard** - See gamification rankings

---

## Stopping the Servers

When you're done:

1. In the **Frontend terminal**: Press `CTRL+C`
2. In the **Backend terminal**: Press `CTRL+C`
3. Optionally stop PostgreSQL: `brew services stop postgresql@15`

---

## Troubleshooting

### "Connection refused" or "ECONNREFUSED"
- Make sure PostgreSQL is running: `brew services list`
- Check the DATABASE_URL in `server/.env` matches your setup

### "Port already in use"
- Frontend (3000): `lsof -ti:3000 | xargs kill -9`
- Backend (4000): `lsof -ti:4000 | xargs kill -9`

### "Module not found" errors
- Run `npm install` in both the root directory and `server/` directory

### Database connection errors
- Verify database exists: `psql -l | grep gsaps_app`
- Recreate if needed: `dropdb gsaps_app && createdb gsaps_app`

---

## Quick Restart Commands

Save these for future use:

**Terminal 1 (Backend):**
```bash
cd ~/path/to/gsaps-social-media-app/server && npm start
```

**Terminal 2 (Frontend):**
```bash
cd ~/path/to/gsaps-social-media-app && npm start
```

---

## Next Steps

- **Production Build**: The `build/` folder contains the optimized production version
- **Deploy**: Use the production build with services like Netlify, Vercel, or GitHub Pages
- **Customize**: Explore the codebase and add your own features!

---

**Need help?** Check the main README.md or documentation in the `docs/` folder.
