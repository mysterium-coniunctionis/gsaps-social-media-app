# GSAPS Social Media App - Development Continuation Notes

## Session Summary
**Date:** January 2026
**Branch:** `claude/decouple-wordpress-add-database-cLSAe`
**Status:** In Progress - Expanding Demo Data

---

## COMPLETED WORK

### 1. Database Decoupling (DONE)
- Converted Prisma schema from PostgreSQL to SQLite for Replit compatibility
- Added models: Comment, CommentReaction, Group, GroupMember, Event, EventAttendee, Lesson, PaperReview, Notification
- Enhanced User model with xp, level, streak fields
- Changed array fields to JSON strings for SQLite

### 2. Backend API (DONE)
- Full Express.js API in `server/src/index.js` (~1800 lines)
- 50+ endpoints covering all features:
  - Auth: register, login, logout, refresh, me
  - Users: list, profile, update
  - Posts: CRUD, reactions
  - Comments: nested threads, reactions
  - Messages: conversations, threads
  - Groups: CRUD, join/leave
  - Events: CRUD, RSVP
  - Courses: list, enroll, progress, lessons
  - Research Assets: CRUD, reviews
  - Gamification: XP, achievements, leaderboard
  - Notifications: list, mark read

### 3. Configuration (DONE)
- `.env.example` updated for both frontend and backend
- `server/.env` created with SQLite config
- `.gitignore` updated to exclude .db files and server/.env
- Root `package.json` updated with unified scripts:
  - `npm run dev` - concurrent frontend + backend
  - `npm run db:setup` - generate, push, seed
  - `npm run db:reset` - reset database

### 4. Seed Script - Partial (IN PROGRESS)
**File:** `server/src/seed.js`

**Completed data arrays:**
- `USERS_DATA` - 15 users (lines 13-29)
- `COURSES_DATA` - 10 courses with 8-11 lessons each (lines 35-255)
- `GROUPS_DATA` - 10 groups (lines 261-272)
- `EVENTS_DATA` - 10 events (lines 291-302)

**Still needed:**
- `RESEARCH_ARTICLES_DATA` - 100 peer-reviewed articles
- Main `seed()` execution function

---

## REMAINING WORK

### 1. Complete seed.js with 100 Research Articles

Add after line 306 in `server/src/seed.js`:

```javascript
// ============================================
// DATA: 100 RESEARCH ARTICLES
// ============================================

const RESEARCH_ARTICLES_DATA = [
  // Psilocybin Studies (25)
  { title: '...', type: 'paper', journal: 'Journal of Psychopharmacology', ... },
  // MDMA Studies (20)
  // Ketamine Studies (15)
  // LSD Studies (10)
  // Ayahuasca Studies (10)
  // DMT Studies (5)
  // Ibogaine Studies (5)
  // Reviews/Meta-analyses (10)
];

// ============================================
// MAIN SEED FUNCTION
// ============================================

const seed = async () => {
  console.log('🌱 Seeding database...');

  // Clear existing data (in correct order for foreign keys)
  await prisma.notification.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.paperReview.deleteMany();
  await prisma.researchAsset.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.eventAttendee.deleteMany();
  await prisma.event.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.message.deleteMany();
  await prisma.commentReaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.reaction.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const password = await bcrypt.hash('password123', 10);
  const users = [];
  for (const userData of USERS_DATA) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash: password,
        role: userData.email === 'admin@example.com' ? 'administrator' : 'member',
        avatarUrl: `https://i.pravatar.cc/150?img=${users.length + 1}`,
        streak: Math.floor(Math.random() * 30)
      }
    });
    users.push(user);
  }

  // Create courses with lessons
  for (const courseData of COURSES_DATA) {
    const { lessons, ...course } = courseData;
    const createdCourse = await prisma.course.create({ data: course });
    for (let i = 0; i < lessons.length; i++) {
      await prisma.lesson.create({
        data: { ...lessons[i], courseId: createdCourse.id, orderIndex: i + 1 }
      });
    }
  }

  // Create groups with members
  // Create events with attendees
  // Create research articles with reviews
  // Create enrollments
  // Create posts, comments, reactions
  // Create achievements and notifications

  console.log('✅ Database seeded!');
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 2. Research Article Template

Each article needs:
```javascript
{
  title: 'Psilocybin produces substantial and sustained decreases in depression and anxiety',
  description: 'Randomized controlled trial of psilocybin-assisted therapy for treatment-resistant depression.',
  url: 'https://doi.org/10.1177/0269881116675513',
  type: 'paper',
  authors: JSON.stringify(['Griffiths, R.R.', 'Johnson, M.W.', 'Carducci, M.A.']),
  journal: 'Journal of Psychopharmacology',
  doi: '10.1177/0269881116675513',
  abstract: 'High-dose psilocybin produced large decreases in clinician and self-rated measures of depressed mood and anxiety...',
  keywords: JSON.stringify(['psilocybin', 'depression', 'anxiety', 'cancer', 'clinical trial']),
  citationCount: 892,
  downloadCount: 4521,
  publishedDate: new Date('2016-12-01')
}
```

### 3. Testing Commands
```bash
cd server
npm run setup          # Generate Prisma, push schema, seed data
npm run dev            # Start backend on port 4000

# In another terminal:
cd ..
npm run dev:frontend   # Start frontend on port 3000
```

---

## FILE LOCATIONS

| File | Purpose |
|------|---------|
| `server/prisma/schema.prisma` | SQLite database schema |
| `server/src/index.js` | Express API server |
| `server/src/seed.js` | Database seeding (IN PROGRESS) |
| `server/.env` | Backend environment config |
| `src/api/backend.js` | Frontend API client |
| `.env` | Frontend environment config |

---

## DEMO ACCOUNTS (after seeding)

| Email | Password | Role |
|-------|----------|------|
| alice@example.com | password123 | Researcher |
| bob@example.com | password123 | Clinician |
| carol@example.com | password123 | Therapist |
| admin@example.com | password123 | Administrator |

---

## TO CONTINUE IN NEW SESSION

Prompt to use:
```
Continue development on the GSAPS social media app. The database has been decoupled from WordPress and integrated with SQLite.

Current task: Complete the seed script with 100 research articles and the main seed() execution function.

See server/SEED_CONTINUATION_NOTES.md for detailed progress notes.

The seed.js file has data arrays for users, courses, groups, and events.
Need to add:
1. RESEARCH_ARTICLES_DATA array with 100 peer-reviewed psychedelic research articles
2. The main seed() function that creates all database records

After completing, run `npm run db:setup` in the server directory to test.
```

---

## GIT STATUS

Last commit: `feat: Decouple from WordPress/BuddyBoss and add Replit-compatible SQLite database`

Uncommitted changes:
- `server/src/seed.js` - partial (has data arrays, needs execution function)
- `server/SEED_CONTINUATION_NOTES.md` - this file
