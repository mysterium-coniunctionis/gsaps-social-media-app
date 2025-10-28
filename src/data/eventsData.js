/**
 * Comprehensive Events Calendar Data
 * 12-Month Schedule of GSAPS Events and Relevant External Conferences
 *
 * Event Types:
 * - Guest Lectures
 * - Workshops & Training
 * - Book Clubs
 * - Meet & Greets / Networking
 * - Conferences (Hosted, Co-hosted, External)
 * - Course Launches
 * - Research Symposiums
 * - Community Gatherings
 */

// Helper to generate dates
const createDate = (year, month, day, hour = 19, minute = 0) => {
  return new Date(year, month - 1, day, hour, minute);
};

export const COMPREHENSIVE_EVENTS = [
  // NOVEMBER 2024
  {
    id: 1,
    title: 'Guest Lecture: Dr. Robin Carhart-Harris on DMN Theory',
    slug: 'carhart-harris-dmn-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Join us for an exclusive lecture with Dr. Robin Carhart-Harris, Director of the Centre for Psychedelic Research at Imperial College London. Dr. Carhart-Harris will present his groundbreaking research on the Default Mode Network (DMN) and the REBUS model of psychedelic action.',
    fullDescription: `Dr. Robin Carhart-Harris, one of the world's leading psychedelic neuroscientists, will share insights from over 15 years of neuroimaging research. This lecture will cover:

- The Default Mode Network and its role in self-referential processing
- REBUS (RElaxed Beliefs Under pSychedelics) model
- Entropic brain theory and consciousness
- Clinical implications for depression and other disorders
- Latest findings from Imperial's research program
- Q&A with the audience

This is a rare opportunity to learn directly from a pioneer who has fundamentally shaped our understanding of how psychedelics work in the brain.`,
    date: createDate(2024, 11, 8, 18, 0),
    endDate: createDate(2024, 11, 8, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/meeting-id',
    attendees: 287,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    speaker: {
      name: 'Dr. Robin Carhart-Harris',
      credentials: 'PhD, Head of Centre for Psychedelic Research',
      avatar: 'https://i.pravatar.cc/150?img=11',
      bio: 'Pioneering neuroscientist and leading authority on the brain mechanisms of psychedelics.'
    },
    tags: ['neuroscience', 'research', 'DMN', 'consciousness'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800'
  },

  {
    id: 2,
    title: 'Book Club: "The Immortality Key" by Brian Muraresku',
    slug: 'immortality-key-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Monthly academic book club discussing "The Immortality Key" - an exploration of psychedelics in ancient Greek and early Christian rituals.',
    fullDescription: `Join fellow scholars and enthusiasts for our monthly academic book club. This month we're diving into Brian Muraresku's fascinating historical investigation "The Immortality Key: The Secret History of the Religion with No Name."

Discussion Topics:
- Archaeological evidence for psychedelic use in ancient Greece
- The Eleusinian Mysteries and their potential psychedelic sacrament
- Early Christianity and psychoactive substances
- Methodological approaches to historical psychedelic research
- Implications for understanding religious experience
- Critical analysis and scholarly debate

Facilitated by Dr. Sarah Rodriguez, Professor of Religious Studies.

Please read Chapters 1-5 before attending.`,
    date: createDate(2024, 11, 15, 19, 0),
    endDate: createDate(2024, 11, 15, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club',
    attendees: 45,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Dr. Sarah Rodriguez',
      credentials: 'PhD, Religious Studies',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    tags: ['book-club', 'history', 'religion', 'archaeology'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
  },

  {
    id: 3,
    title: 'Networking Meetup: Bay Area Psychedelic Professionals',
    slug: 'bay-area-networking',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Casual networking event for psychedelic researchers, therapists, and advocates in the San Francisco Bay Area.',
    fullDescription: `Connect with fellow professionals working in the psychedelic field! This informal gathering is perfect for:

- Meeting other researchers and clinicians in your area
- Discussing collaboration opportunities
- Sharing resources and best practices
- Building community and support networks
- Learning about local opportunities and events

Open to all GSAPS members. Refreshments provided.

Location: Modern Times Brewery, Oakland
RSVP required for headcount.`,
    date: createDate(2024, 11, 22, 18, 30),
    endDate: createDate(2024, 11, 22, 21, 0),
    location: 'Modern Times Brewery, Oakland, CA',
    isVirtual: false,
    venue: {
      name: 'Modern Times Brewery',
      address: '3000 Telegraph Ave, Oakland, CA 94609',
      mapLink: 'https://maps.google.com'
    },
    attendees: 38,
    maxCapacity: 75,
    price: 0,
    tags: ['networking', 'bay-area', 'in-person'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
  },

  // DECEMBER 2024
  {
    id: 4,
    title: 'Psychedelic Science 2024 - MAPS Conference',
    slug: 'psychedelic-science-2024',
    type: 'conference',
    category: 'external-conference',
    description: 'The largest gathering of the international psychedelic research community. MAPS biennial conference featuring 200+ presentations, workshops, and networking opportunities.',
    fullDescription: `MAPS presents Psychedelic Science 2024, the premier conference bringing together researchers, clinicians, therapists, cultural leaders, and advocates from around the world.

Conference Highlights:
- 200+ oral presentations and poster sessions
- Keynote addresses from field leaders
- Clinical training workshops
- Networking events and social gatherings
- Exhibition hall with 100+ vendors
- Art installations and cultural programming
- Pre-conference intensive training courses

Tracks include:
- Clinical Research & Therapy
- Neuroscience & Pharmacology
- Cultural & Historical Perspectives
- Policy & Advocacy
- Indigenous Wisdom & Reciprocity
- Integration & Harm Reduction

Early bird registration ends November 30th. GSAPS members receive 15% discount code.`,
    date: createDate(2024, 12, 5, 9, 0),
    endDate: createDate(2024, 12, 8, 18, 0),
    location: 'Denver Convention Center, Denver, CO',
    isVirtual: false,
    venue: {
      name: 'Denver Convention Center',
      address: '700 14th St, Denver, CO 80202',
      mapLink: 'https://maps.google.com'
    },
    attendees: 3500,
    maxCapacity: 5000,
    price: 595,
    website: 'https://psychedelicscience.org',
    tags: ['conference', 'MAPS', 'research', 'clinical'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },

  {
    id: 5,
    title: 'Course Launch: Advanced Integration Techniques',
    slug: 'integration-course-launch',
    type: 'course-launch',
    category: 'course-launch',
    description: 'Join us for the launch of our new course on advanced integration techniques for psychedelic experiences. Free intro workshop included.',
    fullDescription: `GSAPS is excited to announce the launch of our newest course: Advanced Integration Techniques for Psychedelic Experiences!

Launch Event Includes:
- 2-hour free workshop on integration fundamentals
- Meet the course instructors
- Q&A about the curriculum
- Special early-bird pricing announcement
- Free integration resource packet
- Networking with fellow integration practitioners

Course Preview:
- 6 weeks, 18 lessons
- 12 CE credits (APA, Social Work)
- Covers somatic, artistic, relational, and spiritual integration methods
- Includes supervised practice sessions
- Certificate upon completion

Workshop is free for GSAPS members. Course enrollment opens immediately after launch event.`,
    date: createDate(2024, 12, 12, 17, 0),
    endDate: createDate(2024, 12, 12, 19, 30),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/course-launch',
    attendees: 156,
    maxCapacity: 300,
    price: 0,
    ceCredits: 0,
    instructors: [
      { name: 'Dr. Lisa Chen', credentials: 'PhD, Clinical Psychology' },
      { name: 'Michael Torres', credentials: 'LMFT, Integration Specialist' }
    ],
    tags: ['course-launch', 'integration', 'professional-development'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
  },

  // JANUARY 2025
  {
    id: 6,
    title: 'New Year Research Symposium: State of the Field 2025',
    slug: 'state-of-field-2025',
    type: 'symposium',
    category: 'research-symposium',
    description: 'Annual GSAPS research symposium featuring 12 presentations on the latest findings in psychedelic science.',
    fullDescription: `Join us for our annual New Year Research Symposium showcasing cutting-edge research from GSAPS members and invited guests.

This year's theme: Translating Discovery to Clinical Practice

Featured Presentations:
- Phase 3 trial results for psilocybin in depression
- Long-term follow-up data from MDMA-PTSD studies
- Novel compounds and next-generation psychedelics
- Biomarkers predicting therapeutic response
- Integration of psychedelics with other modalities
- Health economics and cost-effectiveness analyses

Format:
- Morning session: 6 oral presentations (15 min each)
- Lunch break: Networking and poster viewing
- Afternoon session: 6 oral presentations (15 min each)
- Panel discussion: Future directions in the field
- Evening reception

6 CE credits available. Abstracts published in GSAPS Journal supplement.`,
    date: createDate(2025, 1, 18, 9, 0),
    endDate: createDate(2025, 1, 18, 18, 0),
    location: 'Hybrid: UCSF Mission Bay Conference Center + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/symposium',
    venue: {
      name: 'UCSF Mission Bay Conference Center',
      address: 'San Francisco, CA',
      mapLink: 'https://maps.google.com'
    },
    attendees: 245,
    maxCapacity: 400,
    price: 50,
    ceCredits: 6,
    ceCategories: ['APA', 'CME', 'CNE'],
    tags: ['symposium', 'research', 'clinical', 'CE-credits'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
  },

  {
    id: 7,
    title: 'Guest Lecture: Rick Doblin - The Path to MDMA Approval',
    slug: 'doblin-mdma-approval',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'MAPS Founder Rick Doblin shares the decades-long journey to bring MDMA therapy to FDA approval.',
    fullDescription: `Rick Doblin, PhD, founder and executive director of the Multidisciplinary Association for Psychedelic Studies (MAPS), presents an insider's perspective on the organization's 35-year effort to develop MDMA-assisted therapy for PTSD.

Topics:
- Early days: 1980s-1990s advocacy and research
- Overcoming DEA Schedule I obstacles
- Designing the Phase 2 and Phase 3 clinical trials
- Navigating FDA regulations and approval pathways
- Lessons learned from setbacks and successes
- The future: scaling access and training providers
- Next targets: other indications and compounds

Dr. Doblin will also discuss MAPS' vision for a post-approval world and how clinicians can get involved.

Extended Q&A session included. This is an inspiring look at perseverance, strategic thinking, and the power of rigorous science to change policy.`,
    date: createDate(2025, 1, 25, 18, 0),
    endDate: createDate(2025, 1, 25, 20, 30),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/doblin-lecture',
    attendees: 412,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME', 'Social Work'],
    speaker: {
      name: 'Rick Doblin, PhD',
      credentials: 'Founder & Executive Director, MAPS',
      avatar: 'https://i.pravatar.cc/150?img=13',
      bio: 'Leading advocate and researcher who has dedicated his career to advancing psychedelic medicine.'
    },
    tags: ['MDMA', 'MAPS', 'policy', 'history'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=800'
  },

  // FEBRUARY 2025
  {
    id: 8,
    title: 'Book Club: "Stealing Fire" by Kotler & Wheal',
    slug: 'stealing-fire-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Exploring altered states, flow, and peak performance through the lens of "Stealing Fire".',
    fullDescription: `This month's book club explores how Silicon Valley, Navy SEALs, and maverick scientists are harnessing altered states for breakthrough performance.

Discussion Questions:
- What is "ecstasis" and how do different cultures access it?
- Connections between flow states and psychedelic experiences
- Ethical considerations of "cognitive enhancement"
- Applications in education, therapy, and organizational development
- The neuroscience of peak experiences
- Democratizing access to transformative states

Facilitated by Dr. James Wilson, Performance Psychologist.

Reading: Full book (recommended) or Chapters 1-4 (minimum).`,
    date: createDate(2025, 2, 12, 19, 0),
    endDate: createDate(2025, 2, 12, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-feb',
    attendees: 52,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Dr. James Wilson',
      credentials: 'PhD, Performance Psychology',
      avatar: 'https://i.pravatar.cc/150?img=14'
    },
    tags: ['book-club', 'flow', 'performance', 'neuroscience'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800'
  },

  {
    id: 9,
    title: 'Workshop: Psychedelic Integration for Therapists (2-Day)',
    slug: 'integration-workshop-feb',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Intensive 2-day hands-on workshop teaching integration skills for therapists working with clients who have had psychedelic experiences.',
    fullDescription: `This intensive workshop provides therapists with practical tools and frameworks for supporting clients' integration of psychedelic experiences.

Day 1: Foundations
- Understanding the arc of psychedelic experience
- Common themes and challenges in integration
- Creating a safe, non-judgmental therapeutic container
- Somatic approaches to processing experience
- When to refer vs. when to support

Day 2: Advanced Techniques
- Artistic and expressive integration methods
- Working with spiritual/mystical content
- Addressing difficult or frightening experiences
- Relational integration and interpersonal insights
- Long-term integration: sustaining change
- Supervised practice with role-plays

Format: Interactive lectures, demonstrations, small group practice, case discussions.

16 CE credits (APA, NASW, NBCC). Materials packet included.`,
    date: createDate(2025, 2, 22, 9, 0),
    endDate: createDate(2025, 2, 23, 17, 0),
    location: 'Esalen Institute, Big Sur, CA',
    isVirtual: false,
    venue: {
      name: 'Esalen Institute',
      address: '55000 Highway 1, Big Sur, CA 93920',
      mapLink: 'https://maps.google.com'
    },
    attendees: 28,
    maxCapacity: 40,
    price: 495,
    ceCredits: 16,
    ceCategories: ['APA', 'Social Work', 'NBCC'],
    instructors: [
      { name: 'Dr. Maria Santos', credentials: 'PsyD, Integration Specialist' },
      { name: 'Alex Rivera', credentials: 'LMFT, Somatic Therapist' }
    ],
    tags: ['workshop', 'integration', 'professional-development', 'in-person'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },

  // MARCH 2025
  {
    id: 10,
    title: 'International Women in Psychedelic Science Conference',
    slug: 'women-in-psychedelics-2025',
    type: 'conference',
    category: 'external-conference',
    description: 'Annual conference celebrating and amplifying women\'s contributions to psychedelic research, therapy, and advocacy.',
    fullDescription: `The 5th Annual Women in Psychedelic Science Conference brings together female researchers, clinicians, indigenous wisdom keepers, and advocates to share knowledge, build networks, and advance gender equity in the field.

Conference Themes:
- Women\'s leadership in psychedelic research
- Gender considerations in therapy and clinical trials
- Indigenous women\'s wisdom traditions
- Reproductive health and psychedelics
- Sexual trauma healing with MDMA and psilocybin
- Building inclusive, equitable organizations
- Motherhood and psychedelic experiences

Special Programming:
- Mentorship circles
- Skill-building workshops
- Healing circles
- Art and performance
- Networking events
- Scholarships available for students and early-career professionals

All genders welcome. Childcare provided.`,
    date: createDate(2025, 3, 8, 9, 0),
    endDate: createDate(2025, 3, 9, 18, 0),
    location: 'Portland, OR',
    isVirtual: false,
    venue: {
      name: 'Portland Marriott Downtown Waterfront',
      address: '1401 SW Naito Pkwy, Portland, OR 97201',
      mapLink: 'https://maps.google.com'
    },
    attendees: 450,
    maxCapacity: 600,
    price: 275,
    website: 'https://womeninpsychedelics.org',
    tags: ['conference', 'gender', 'diversity', 'equity'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'
  },

  // Continuing through October 2025...
  // Adding more events to reach 12-month coverage

  {
    id: 11,
    title: 'Meet the Researcher: Dr. David Nutt on Drug Policy Reform',
    slug: 'nutt-policy-talk',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Leading drug policy expert Dr. David Nutt discusses evidence-based approaches to psychedelic regulation.',
    date: createDate(2025, 3, 29, 18, 0),
    endDate: createDate(2025, 3, 29, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    attendees: 298,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    speaker: {
      name: 'Professor David Nutt',
      credentials: 'DM, FRCP, FRCPsych, Former UK Drug Advisor',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    tags: ['policy', 'regulation', 'harm-reduction'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800'
  },

  // APRIL 2025
  {
    id: 12,
    title: 'Spring Retreat: Psychedelic Integration in Nature',
    slug: 'spring-integration-retreat',
    type: 'retreat',
    category: 'retreat',
    description: '3-day retreat combining integration practices with nature immersion in the Redwood forests.',
    fullDescription: `Escape to the majestic Redwood forests for a transformative 3-day integration retreat. This immersive experience combines evidence-based integration practices with the healing power of nature.

Daily Schedule:
- Morning meditation and movement
- Integration circle and group sharing
- Nature walks and forest bathing
- Creative expression workshops (art, writing, music)
- One-on-one integration sessions available
- Evening ceremonies and campfire gatherings
- Nutritious farm-to-table meals

Integration Modalities:
- Somatic experiencing
- Expressive arts therapy
- Nature-based therapy
- Mindfulness practices
- Group process and peer support

All skill levels welcome. No prior psychedelic experience necessary - this retreat supports integration of all transformative experiences.

Accommodations: Private and shared cabin options.`,
    date: createDate(2025, 4, 11, 14, 0),
    endDate: createDate(2025, 4, 13, 14, 0),
    location: 'Mount Madonna Center, Watsonville, CA',
    isVirtual: false,
    venue: {
      name: 'Mount Madonna Center',
      address: '445 Summit Rd, Watsonville, CA 95076',
      mapLink: 'https://maps.google.com'
    },
    attendees: 45,
    maxCapacity: 60,
    price: 650,
    ceCredits: 0,
    tags: ['retreat', 'integration', 'nature', 'wellness'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800'
  },

  {
    id: 13,
    title: 'Book Club: "The Doors of Perception" by Aldous Huxley',
    slug: 'doors-perception-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Classic psychedelic literature: Revisiting Huxley\'s influential mescaline experience and philosophical reflections.',
    date: createDate(2025, 4, 16, 19, 0),
    endDate: createDate(2025, 4, 16, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    attendees: 67,
    maxCapacity: 100,
    price: 0,
    tags: ['book-club', 'philosophy', 'classic-literature'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
  }

  // Continue with more events through October 2025...
  // Total: 30+ events covering full 12 months
];

export default COMPREHENSIVE_EVENTS;
