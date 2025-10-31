# 🏃 SPRINT 1: INTEGRATION CIRCLE MATCHING
## Technical Implementation Roadmap (4 Weeks)

**Feature:** Integration Circle Matching & Facilitation
**Timeline:** 4 weeks (20 working days)
**Team:** 1-2 developers
**Priority:** TIER 1 - Build Now

---

## 📋 OVERVIEW

### What We're Building

A complete platform for peer-led integration circles that helps people:
1. Find or create integration circles matched to their needs
2. Join circles based on experience type, location, and values
3. Participate in structured, trauma-informed peer support
4. Access facilitator tools and safety resources
5. Connect to crisis support when needed

### Success Criteria

- [ ] Users can complete matching wizard in <3 minutes
- [ ] Users can find relevant circles or create new ones
- [ ] Users can join circles and participate in discussions
- [ ] Facilitators have access to guidelines and tools
- [ ] Crisis resources are always accessible
- [ ] 10-15 demo circles with realistic data

---

## 🏗️ TECHNICAL ARCHITECTURE

### New File Structure

```
/src
├── pages/
│   ├── IntegrationCircles.js          # Main circles page (list/search)
│   └── CircleDetail.js                # Individual circle page
│
├── components/circles/
│   ├── CircleMatchingWizard.js        # Onboarding wizard
│   ├── CircleCard.js                  # Circle preview card
│   ├── CircleDiscussion.js            # Circle discussion thread
│   ├── FacilitatorTools.js            # Facilitation resources
│   ├── CircleGuidelines.js            # Safety guidelines
│   ├── CreateCircleDialog.js          # Create new circle
│   └── CircleMembers.js               # Member list and management
│
├── data/
│   ├── circlesData.js                 # Demo circles
│   └── circleResources.js             # Facilitation resources
│
└── context/
    └── CirclesContext.js              # Circle state management (optional)
```

### Data Models

```javascript
// Circle Model
const Circle = {
  id: number,
  name: string,
  description: string,
  type: 'peer-led' | 'professional-facilitated',
  category: string,                      // 'psychedelic', 'plant-medicine', 'ketamine', etc.
  facilitator: User,
  coFacilitators: Array<User>,
  members: Array<User>,
  capacity: number,
  meetingSchedule: {
    frequency: 'weekly' | 'biweekly' | 'monthly',
    dayOfWeek: string,
    time: string,
    timezone: string,
    duration: number                     // minutes
  },
  location: {
    type: 'virtual' | 'in-person' | 'hybrid',
    city: string,
    state: string,
    country: string,
    virtualLink: string                  // Zoom, Whereby, etc.
  },
  topics: Array<string>,                 // integration, preparation, harm reduction
  experienceTypes: Array<string>,        // psilocybin, MDMA, ayahuasca, ketamine
  values: Array<string>,                 // trauma-informed, LGBTQ+ friendly, spiritual
  guidelines: string,                    // Circle-specific guidelines
  createdAt: Date,
  status: 'active' | 'full' | 'inactive',
  privacy: 'public' | 'private' | 'invite-only',
  stats: {
    totalMeetings: number,
    memberCount: number,
    avgAttendance: number
  }
}

// CircleMembership Model
const CircleMembership = {
  id: number,
  circleId: number,
  userId: number,
  role: 'facilitator' | 'co-facilitator' | 'member',
  joinedAt: Date,
  status: 'active' | 'inactive',
  preferences: {
    notifications: boolean,
    reminderTime: number                 // hours before meeting
  },
  stats: {
    meetingsAttended: number,
    lastAttended: Date
  }
}

// CircleDiscussion Model (extends existing Comment model)
const CircleMessage = {
  id: number,
  circleId: number,
  author: User,
  content: string,
  timestamp: Date,
  type: 'message' | 'check-in' | 'resource' | 'announcement',
  reactions: Array<Reaction>,
  replies: Array<CircleMessage>,
  isPinned: boolean,
  tags: Array<string>
}
```

### API Endpoints (Mock)

```javascript
// Circle endpoints
GET    /api/circles                    // List all circles (with filters)
GET    /api/circles/recommendations    // Personalized recommendations
GET    /api/circles/:id                // Get circle details
POST   /api/circles                    // Create new circle
PUT    /api/circles/:id                // Update circle
DELETE /api/circles/:id                // Delete circle

// Membership endpoints
POST   /api/circles/:id/join           // Join circle
DELETE /api/circles/:id/leave          // Leave circle
GET    /api/circles/:id/members        // Get circle members
PUT    /api/circles/:id/members/:uid   // Update member role

// Discussion endpoints
GET    /api/circles/:id/messages       // Get circle messages
POST   /api/circles/:id/messages       // Post message
PUT    /api/circles/:id/messages/:mid  // Edit message
DELETE /api/circles/:id/messages/:mid  // Delete message

// Matching endpoints
POST   /api/circles/match              // Get circle recommendations
POST   /api/circles/preferences        // Save user preferences
```

---

## 📅 WEEK-BY-WEEK IMPLEMENTATION

### WEEK 1: FOUNDATION & DATA MODELS
**Goal:** Set up data structures, matching logic, and wizard

#### Day 1-2: Data Models & Demo Data
**Tasks:**
- [ ] Create `/src/data/circlesData.js` with 15 demo circles
  - 5 virtual circles (various topics)
  - 5 in-person circles (major cities)
  - 5 hybrid circles
  - Diverse facilitators from existing members data
  - Realistic meeting schedules and capacities

- [ ] Define circle categories and types:
  ```javascript
  CIRCLE_CATEGORIES = [
    'psychedelic-integration',
    'preparation',
    'harm-reduction',
    'clinical-practitioners',
    'researchers',
    'spiritual-exploration'
  ]

  EXPERIENCE_TYPES = [
    'psilocybin', 'MDMA', 'LSD', 'ayahuasca',
    'ketamine', 'DMT', 'general'
  ]

  CIRCLE_VALUES = [
    'trauma-informed', 'LGBTQ+ friendly', 'BIPOC-centered',
    'women-only', 'men-only', 'spiritual', 'scientific',
    'recovery-focused', 'harm-reduction'
  ]
  ```

- [ ] Create `/src/data/circleResources.js`:
  ```javascript
  FACILITATION_RESOURCES = {
    guidelines: [...],        // Circle safety guidelines
    prompts: [...],          // Discussion prompts
    groundingExercises: [...],
    openingRituals: [...],
    closingRituals: [...]
  }
  ```

**Deliverables:**
- `circlesData.js` with 15 complete demo circles
- `circleResources.js` with facilitation resources

#### Day 3-4: Matching Algorithm
**Tasks:**
- [ ] Create matching wizard logic
  ```javascript
  // /src/utils/circleMatching.js

  function matchUserToCircles(userPreferences, availableCircles) {
    // Scoring algorithm:
    // 1. Experience type match (30%)
    // 2. Location/virtual preference (25%)
    // 3. Schedule compatibility (20%)
    // 4. Values alignment (15%)
    // 5. Capacity available (10%)

    return availableCircles
      .map(circle => ({
        circle,
        score: calculateMatchScore(userPreferences, circle)
      }))
      .filter(match => match.score > 0.4)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }
  ```

- [ ] Build CircleMatchingWizard component:
  - Step 1: Experience type (what substance/modality?)
  - Step 2: Circle purpose (integration, preparation, harm reduction?)
  - Step 3: Meeting preferences (virtual/in-person, schedule)
  - Step 4: Values and priorities
  - Step 5: Results (recommended circles)

**Deliverables:**
- Matching algorithm with scoring logic
- CircleMatchingWizard component with 5 steps

#### Day 5: User Preferences
**Tasks:**
- [ ] Add circle preferences to user profile model
- [ ] Create user preference storage (localStorage for demo)
- [ ] Add "Edit Preferences" flow
- [ ] Integrate with existing AuthContext

**Deliverables:**
- Circle preferences in user model
- Preference editing functionality

---

### WEEK 2: CORE CIRCLE FEATURES
**Goal:** Build main circle pages and browsing experience

#### Day 6-7: IntegrationCircles Page
**Tasks:**
- [ ] Create `/src/pages/IntegrationCircles.js`
  - Hero section with CTA to start matching wizard
  - Grid/list view of all circles
  - Filter sidebar:
    - Experience type
    - Location (virtual/in-person)
    - Schedule (day of week, time)
    - Capacity (spaces available)
    - Values
  - Sort options:
    - Best match (default)
    - Newest
    - Most popular
    - Starting soon

- [ ] Build CircleCard component:
  ```javascript
  <CircleCard
    name={circle.name}
    description={circle.description}
    facilitator={circle.facilitator}
    memberCount={circle.members.length}
    capacity={circle.capacity}
    schedule={circle.meetingSchedule}
    location={circle.location}
    experienceTypes={circle.experienceTypes}
    values={circle.values}
    matchScore={circle.matchScore}  // if from recommendations
    onJoin={handleJoin}
    onViewDetails={handleViewDetails}
  />
  ```

- [ ] Add loading skeletons for circle cards
- [ ] Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

**Deliverables:**
- IntegrationCircles page with filtering and sorting
- CircleCard component with rich preview

#### Day 8-9: CircleDetail Page
**Tasks:**
- [ ] Create `/src/pages/CircleDetail.js`
  - Header with circle name, facilitator, member count
  - Description and purpose
  - Meeting schedule with calendar view
  - Member avatars (with privacy settings)
  - Guidelines and values
  - Join/Leave button with confirmation
  - Discussion thread (tab 1)
  - Resources (tab 2)
  - Members (tab 3)

- [ ] Build CircleMembers component:
  - Grid of member avatars with names
  - Facilitator badge
  - Member join date
  - Attendance stats (for facilitators only)

- [ ] Add route to App.js:
  ```javascript
  <Route path="/circles" element={<IntegrationCircles />} />
  <Route path="/circles/:circleId" element={<CircleDetail />} />
  ```

**Deliverables:**
- CircleDetail page with full circle information
- CircleMembers component
- Navigation routing

#### Day 10: Create Circle Flow
**Tasks:**
- [ ] Build CreateCircleDialog component:
  - Circle name and description
  - Category and experience types
  - Meeting schedule (frequency, day, time, timezone)
  - Location (virtual link or in-person address)
  - Capacity limit
  - Values and guidelines
  - Preview before creating

- [ ] Add "Create Circle" button to IntegrationCircles page
- [ ] Implement circle creation with validation
- [ ] Award XP for creating circle (+30 XP)
- [ ] Show success message and redirect to new circle

**Deliverables:**
- CreateCircleDialog component
- Circle creation workflow
- XP integration

---

### WEEK 3: FACILITATION TOOLS & DISCUSSIONS
**Goal:** Build tools for facilitators and enable circle communication

#### Day 11-12: Circle Discussion
**Tasks:**
- [ ] Build CircleDiscussion component:
  - Reuse existing CommentSection architecture
  - Add circle-specific message types:
    - Regular message
    - Check-in (prompt-based)
    - Resource share
    - Announcement (facilitators only)
  - Add reactions to messages
  - Thread replies
  - Pin important messages (facilitators only)

- [ ] Implement discussion posting:
  ```javascript
  function handlePostMessage(content, type = 'message') {
    const message = {
      id: Date.now(),
      circleId: circle.id,
      author: currentUser,
      content,
      type,
      timestamp: new Date(),
      reactions: [],
      replies: [],
      isPinned: false
    }

    // Award XP for participation
    awardXP(5, 'Circle participation')

    // Save message (mock)
    saveCircleMessage(message)
  }
  ```

- [ ] Add discussion tab to CircleDetail page

**Deliverables:**
- CircleDiscussion component
- Message posting and threading
- XP rewards for participation

#### Day 13-14: Facilitator Tools
**Tasks:**
- [ ] Build FacilitatorTools component:
  - Section 1: Circle Guidelines
    - Trauma-informed practices
    - Consent and boundaries
    - Confidentiality
    - Crisis protocols

  - Section 2: Facilitation Prompts
    - Opening check-in prompts (20+ options)
    - Discussion prompts (30+ options)
    - Closing prompts (15+ options)
    - Grounding exercises (10+ options)

  - Section 3: Circle Management
    - Member management (add/remove)
    - Meeting scheduling
    - Attendance tracking
    - Circle analytics

  - Section 4: Resources
    - Facilitation best practices
    - Difficult situations guide
    - Cultural sensitivity
    - Link to Fireside Project

- [ ] Add "Facilitator Tools" tab (visible only to facilitators)
- [ ] Create demo content for prompts and exercises

**Deliverables:**
- FacilitatorTools component with 4 sections
- 50+ facilitation prompts and exercises
- Facilitator-only access controls

#### Day 15: Safety & Crisis Resources
**Tasks:**
- [ ] Build CircleGuidelines component:
  - Safety first principles
  - Consent practices
  - Confidentiality agreement
  - When to escalate (professional help, crisis line)
  - Reporting harmful behavior

- [ ] Add crisis button to CircleDetail page:
  - Always visible in footer
  - Links to Fireside Project
  - Emergency grounding exercises
  - Link to Messages for peer support

- [ ] Create guidelines content:
  - General GSAPS community guidelines
  - Integration circle-specific guidelines
  - Facilitator code of conduct

**Deliverables:**
- CircleGuidelines component
- Crisis resources integration
- Safety documentation

---

### WEEK 4: POLISH, TESTING & LAUNCH
**Goal:** Refine UX, add gamification, test thoroughly, launch

#### Day 16-17: Gamification Integration
**Tasks:**
- [ ] Add XP rewards for circle activities:
  ```javascript
  CIRCLE_XP_REWARDS = {
    createCircle: 30,
    joinCircle: 10,
    attendMeeting: 20,
    postMessage: 5,
    postCheckIn: 10,
    facilitateMeeting: 25,
    completeNewMemberWizard: 15
  }
  ```

- [ ] Create circle-specific achievements:
  ```javascript
  CIRCLE_ACHIEVEMENTS = [
    {
      id: 'circle_starter',
      name: 'Circle Starter',
      description: 'Create your first integration circle',
      icon: '🌱',
      xpReward: 50,
      criteria: { circlesCreated: 1 }
    },
    {
      id: 'integration_warrior',
      name: 'Integration Warrior',
      description: 'Attend 10 circle meetings',
      icon: '⚔️',
      xpReward: 200,
      criteria: { meetingsAttended: 10 }
    },
    {
      id: 'circle_facilitator',
      name: 'Circle Facilitator',
      description: 'Facilitate 5 circle meetings',
      icon: '🕊️',
      xpReward: 250,
      criteria: { meetingsFacilitated: 5 }
    },
    {
      id: 'community_builder',
      name: 'Community Builder',
      description: 'Your circle reaches 10 members',
      icon: '🏘️',
      xpReward: 100,
      criteria: { circleMembers: 10 }
    },
    {
      id: 'supportive_peer',
      name: 'Supportive Peer',
      description: 'Post 50 messages in circles',
      icon: '💬',
      xpReward: 150,
      criteria: { circleMessages: 50 }
    }
  ]
  ```

- [ ] Update GamificationContext with circle stats
- [ ] Add achievement notifications when unlocked
- [ ] Display circle stats in UserProfile page

**Deliverables:**
- Circle XP rewards integrated
- 5 new circle achievements
- Achievement notifications

#### Day 18: UI Polish & Animations
**Tasks:**
- [ ] Add animations:
  - Fade in circle cards
  - Scale on hover
  - Slide in wizard steps
  - Pulse on join button
  - Celebrate on circle creation

- [ ] Responsive design audit:
  - Test on mobile (320px - 600px)
  - Test on tablet (600px - 960px)
  - Test on desktop (960px+)
  - Fix any layout issues

- [ ] Accessibility audit:
  - Keyboard navigation for all interactive elements
  - ARIA labels on icon buttons
  - Focus indicators visible
  - Color contrast meets WCAG AA

- [ ] Visual polish:
  - Consistent spacing and alignment
  - Beautiful circle images (Unsplash)
  - Hover states and transitions
  - Loading states

**Deliverables:**
- Polished animations
- Fully responsive design
- Accessibility improvements

#### Day 19: Testing & Bug Fixes
**Tasks:**
- [ ] Comprehensive manual testing:
  - Complete matching wizard → find circles
  - Create new circle → verify data saves
  - Join circle → verify membership
  - Post discussion message → verify threading
  - Access facilitator tools → verify permissions
  - Leave circle → verify membership removed
  - Test all filters and sorts

- [ ] Edge case testing:
  - Empty states (no circles found)
  - Full circles (can't join)
  - Inactive circles
  - Circles you're already in
  - Invalid data inputs

- [ ] Performance testing:
  - Test with 50+ circles
  - Test with 100+ messages
  - Test filter performance
  - Check for React warnings

- [ ] Fix all identified bugs
- [ ] Optimize any performance issues

**Deliverables:**
- Bug-free experience
- All edge cases handled
- Performance optimized

#### Day 20: Launch Preparation & Documentation
**Tasks:**
- [ ] Create demo data:
  - 15 diverse circles (various types, locations, schedules)
  - 50+ circle members across circles
  - 100+ circle messages and check-ins
  - Realistic meeting schedules

- [ ] Update documentation:
  - Add circles section to README.md
  - Create CIRCLES_USER_GUIDE.md
  - Create FACILITATOR_HANDBOOK.md
  - Update DEMO_INSTRUCTIONS.md

- [ ] Create launch announcement:
  - Feature highlight post
  - Video walkthrough (optional)
  - Social media graphics
  - Email announcement

- [ ] Add to navigation:
  - Main nav: "Circles" menu item
  - Bottom nav (mobile): Circles icon
  - User profile: "My Circles" section
  - Onboarding: Prompt to join circle

- [ ] Final checklist:
  - [ ] All features working
  - [ ] No console errors
  - [ ] Responsive on all devices
  - [ ] Accessible (keyboard, screen readers)
  - [ ] Demo data populated
  - [ ] Documentation complete
  - [ ] XP rewards working
  - [ ] Achievements unlocking
  - [ ] Crisis resources accessible

**Deliverables:**
- Launch-ready feature
- Complete documentation
- Launch announcement materials
- Navigation integration

---

## 🎨 DESIGN SPECIFICATIONS

### Color Scheme (GSAPS Brand)
```javascript
CIRCLE_COLORS = {
  primary: '#6a52b3',           // Purple
  secondary: '#ff7043',         // Orange
  integration: '#4CAF50',       // Green (growth)
  preparation: '#2196F3',       // Blue (calm)
  harmReduction: '#FF9800',     // Amber (caution)
  clinical: '#9C27B0',          // Purple (professional)
  research: '#00BCD4'           // Cyan (scientific)
}
```

### Typography
- **Circle Names:** Typography variant="h5", fontWeight 600
- **Descriptions:** Typography variant="body1", lineHeight 1.6
- **Guidelines:** Typography variant="body2", color text.secondary
- **Prompts:** Typography variant="body1", fontStyle italic

### Spacing
- Card padding: 3 (24px)
- Section spacing: 4 (32px)
- Element spacing: 2 (16px)
- Compact spacing: 1 (8px)

### Components

**CircleCard:**
```javascript
<Card sx={{
  borderRadius: 4,
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 6
  }
}}>
  <CardMedia height={200} image={circle.image} />
  <CardContent>
    <Typography variant="h6">{circle.name}</Typography>
    <Chip label={circle.category} size="small" />
    <Typography variant="body2">{circle.description}</Typography>
    <Box display="flex" gap={1}>
      <Avatar src={circle.facilitator.avatar} size="small" />
      <Typography variant="caption">{circle.facilitator.name}</Typography>
    </Box>
    <Divider />
    <Box display="flex" justifyContent="space-between">
      <Typography>{circle.members.length}/{circle.capacity} members</Typography>
      <Button variant="contained">Join Circle</Button>
    </Box>
  </CardContent>
</Card>
```

---

## 🧪 TESTING CHECKLIST

### Functional Testing
- [ ] Matching wizard completes successfully
- [ ] Circles appear in search results
- [ ] Filters update results correctly
- [ ] Create circle saves all data
- [ ] Join circle adds user to members
- [ ] Leave circle removes user from members
- [ ] Discussion messages post successfully
- [ ] Replies thread correctly
- [ ] Reactions add and display
- [ ] Facilitator tools only visible to facilitators
- [ ] XP awarded for all circle actions
- [ ] Achievements unlock at correct thresholds

### UX Testing
- [ ] Wizard flow is intuitive (<3 min to complete)
- [ ] Circle cards are informative and scannable
- [ ] Discussion interface is easy to use
- [ ] Facilitator tools are well-organized
- [ ] Error messages are helpful
- [ ] Success messages are encouraging
- [ ] Loading states are smooth
- [ ] Empty states guide users

### Accessibility Testing
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus indicators visible
- [ ] All images have alt text
- [ ] All icon buttons have ARIA labels
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader friendly
- [ ] No keyboard traps

### Performance Testing
- [ ] Page loads in <2 seconds
- [ ] Filtering is instant (<100ms)
- [ ] No lag when scrolling
- [ ] No React warnings in console
- [ ] No memory leaks
- [ ] Works on slow 3G connection

---

## 📊 SUCCESS METRICS

### Usage Metrics (First Month)
- **Target:** 50+ circles created
- **Target:** 200+ users join circles
- **Target:** 400+ circle messages posted
- **Target:** 80%+ users who start wizard complete it
- **Target:** 60%+ users who join circle attend first meeting

### Engagement Metrics
- **Target:** 4+ circle meetings per circle (avg)
- **Target:** 70%+ attendance rate
- **Target:** 10+ messages per circle per week
- **Target:** 5+ facilitators create tools/prompts

### Quality Metrics
- **Target:** <5% circles report safety issues
- **Target:** 4+ stars average circle rating
- **Target:** <10% users leave circles in first month
- **Target:** 80%+ user satisfaction

---

## 🚀 LAUNCH CHECKLIST

### Pre-Launch (Day 19)
- [ ] All features complete and tested
- [ ] Demo data populated (15 circles, 50 members, 100 messages)
- [ ] Documentation written (user guide, facilitator handbook)
- [ ] Crisis resources integrated and tested
- [ ] XP and achievements working
- [ ] Accessibility audit passed
- [ ] Performance optimized
- [ ] No console errors or warnings

### Launch Day (Day 20)
- [ ] Merge to main branch
- [ ] Deploy to production
- [ ] Test in production environment
- [ ] Add "Circles" to main navigation
- [ ] Send announcement email to GSAPS members
- [ ] Post on social media
- [ ] Monitor for bugs and errors
- [ ] Respond to user feedback

### Post-Launch (Week 5+)
- [ ] Collect user feedback (surveys, interviews)
- [ ] Monitor usage metrics and analytics
- [ ] Fix any bugs reported
- [ ] Create user testimonials and case studies
- [ ] Iterate based on feedback
- [ ] Plan enhancements for Sprint 5+

---

## 🎯 NEXT STEPS AFTER SPRINT 1

### Sprint 2: Crisis Support Integration (Weeks 5-9)
- Build on circles foundation
- Add crisis button to all circle pages
- Integrate with Fireside Project
- Create crisis chat functionality

### Sprint 3: Patient Preparation Academy (Weeks 10-14)
- Leverage existing course platform
- Create 8-module preparation curriculum
- Build intention-setting tools
- Create therapist directory

### Future Enhancements (Sprints 5-8)
- Video integration for virtual circles (Zoom, Whereby)
- Calendar integration (Google, iCal)
- SMS/email reminders for meetings
- Circle analytics dashboard for facilitators
- Advanced matching algorithm (ML-based)
- Circle recommendations in feed
- Circle leaderboards (most active, highest rated)
- Circle certification program

---

## 📞 SUPPORT & RESOURCES

### Development Resources
- **Material-UI Docs:** https://mui.com/material-ui/getting-started/
- **React Router:** https://reactrouter.com/en/main
- **Date/Time:** date-fns documentation

### Domain Resources
- **Fireside Project:** https://firesideproject.org
- **MAPS Integration Resources:** https://maps.org/resources/integration
- **Zendo Project:** https://zendoproject.org (harm reduction)

### Team Communication
- Daily standup: Sync on progress and blockers
- Sprint planning: Review tasks for upcoming week
- Sprint retro: Reflect on what worked and what didn't

---

**Document Version:** 1.0
**Last Updated:** October 31, 2025
**Status:** Ready for Development

🏃 Let's build Integration Circles! 🌱
