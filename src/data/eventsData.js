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
- Women's leadership in psychedelic research
- Gender considerations in therapy and clinical trials
- Indigenous women's wisdom traditions
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
  },

  // MAY 2025
  {
    id: 14,
    title: 'Workshop: Navigating Challenging Psychedelic Experiences',
    slug: 'challenging-experiences-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Full-day intensive on safely guiding clients through difficult psychedelic content, including anxiety, paranoia, and spiritual emergence.',
    fullDescription: `This workshop addresses one of the most critical skills for psychedelic practitioners: working with challenging experiences during and after psychedelic sessions.

Workshop Modules:
- Understanding the spectrum of challenging experiences
- Distinguishing between therapeutic difficulty and genuine crisis
- Non-interventionist vs. active support approaches
- Somatic grounding techniques during acute distress
- Working with paranoia, fear, and resistance
- Spiritual emergency vs. spiritual emergence
- Crisis de-escalation and when to seek medical support
- Post-session integration of difficult material
- Practitioner self-care and vicarious trauma

Led by experts with decades of experience in psychedelic harm reduction and crisis intervention.

Interactive format with case studies, role-playing, and group discussion.

8 CE credits available (APA, LCSW, LMFT).`,
    date: createDate(2025, 5, 3, 9, 0),
    endDate: createDate(2025, 5, 3, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/challenging-workshop',
    attendees: 142,
    maxCapacity: 200,
    price: 150,
    ceCredits: 8,
    ceCategories: ['APA', 'Social Work', 'LMFT'],
    instructors: [
      { name: 'Dr. Katherine White', credentials: 'MD, Psychiatrist, Integration Specialist' },
      { name: 'James Anderson', credentials: 'MA, Zendo Project Director' }
    ],
    tags: ['workshop', 'harm-reduction', 'crisis-intervention', 'clinical'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
  },

  {
    id: 15,
    title: 'Guest Lecture: Dr. Alison Gopnik - Psychedelics and the Developing Mind',
    slug: 'gopnik-developmental-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Renowned developmental psychologist Dr. Alison Gopnik explores the parallels between psychedelic states and childhood consciousness.',
    fullDescription: `Dr. Alison Gopnik, professor of psychology at UC Berkeley and expert in cognitive development, presents her groundbreaking research on the similarities between psychedelic experiences and children's consciousness.

Lecture Topics:
- The "lantern consciousness" of childhood vs. "spotlight consciousness" of adulthood
- How psychedelics temporarily restore childlike cognitive flexibility
- Neural plasticity, learning, and psychedelic states
- Implications for creativity and innovation
- The role of dopamine and exploration
- What adults can learn from children's minds
- Therapeutic applications for rigid thinking patterns

Dr. Gopnik's work bridges developmental psychology, neuroscience, and psychedelic research in fascinating ways. This lecture offers fresh perspectives on consciousness and mental flexibility.

Q&A session included. Suitable for researchers, clinicians, and anyone interested in consciousness studies.`,
    date: createDate(2025, 5, 17, 18, 0),
    endDate: createDate(2025, 5, 17, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/gopnik-lecture',
    attendees: 356,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    speaker: {
      name: 'Dr. Alison Gopnik',
      credentials: 'PhD, Professor of Psychology, UC Berkeley',
      avatar: 'https://i.pravatar.cc/150?img=16',
      bio: 'Leading developmental psychologist and author exploring consciousness, learning, and cognitive development.'
    },
    tags: ['neuroscience', 'development', 'consciousness', 'research'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
  },

  {
    id: 16,
    title: 'Networking: NYC Psychedelic Professionals Mixer',
    slug: 'nyc-networking-may',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Connect with psychedelic researchers, therapists, and advocates in the New York City area.',
    fullDescription: `Join fellow psychedelic professionals for an evening of networking in Manhattan's vibrant psychedelic community.

Perfect for:
- Meeting collaborators and colleagues
- Discovering local resources and opportunities
- Sharing knowledge and best practices
- Building professional relationships
- Learning about NYC-area research and clinical programs

This informal gathering brings together diverse professionals including researchers, clinicians, integration therapists, advocates, legal experts, and entrepreneurs working in the psychedelic space.

Light refreshments and appetizers provided.

Location: The Assemblage NoMad - a beautiful community and event space in Midtown.`,
    date: createDate(2025, 5, 22, 18, 0),
    endDate: createDate(2025, 5, 22, 21, 0),
    location: 'The Assemblage NoMad, New York, NY',
    isVirtual: false,
    venue: {
      name: 'The Assemblage NoMad',
      address: '114 E 25th St, New York, NY 10010',
      mapLink: 'https://maps.google.com'
    },
    attendees: 87,
    maxCapacity: 150,
    price: 0,
    tags: ['networking', 'nyc', 'in-person', 'community'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800'
  },

  // JUNE 2025
  {
    id: 17,
    title: 'Horizons: Perspectives on Psychedelics Conference',
    slug: 'horizons-2025',
    type: 'conference',
    category: 'external-conference',
    description: 'NYC\'s premier psychedelic conference featuring cutting-edge research, cultural exploration, and community building.',
    fullDescription: `Horizons: Perspectives on Psychedelics returns for its 16th year as one of the longest-running psychedelic conferences in the world.

Conference Highlights:
- 50+ speakers including leading researchers, clinicians, and cultural figures
- Keynote addresses from field pioneers
- Academic research presentations
- Clinical case studies and therapy techniques
- Cultural and artistic perspectives
- Indigenous wisdom and reciprocity panels
- Policy and legal reform discussions
- Documentary screenings
- Art exhibitions and performances
- Evening social events and after-parties

Tracks Include:
- Science & Medicine
- Therapy & Clinical Practice
- Culture & Society
- Law & Policy
- Indigenous Perspectives
- Art & Creativity

Previous speakers have included Dennis McKenna, Rick Doblin, Amanda Feilding, Bia Labate, and many other luminaries.

Student discounts and scholarships available. GSAPS members receive 20% off registration.`,
    date: createDate(2025, 6, 6, 9, 0),
    endDate: createDate(2025, 6, 8, 18, 0),
    location: 'Cooper Union, New York, NY',
    isVirtual: false,
    venue: {
      name: 'The Cooper Union',
      address: '7 E 7th St, New York, NY 10003',
      mapLink: 'https://maps.google.com'
    },
    attendees: 1200,
    maxCapacity: 1500,
    price: 295,
    website: 'https://horizonsnyc.org',
    tags: ['conference', 'research', 'culture', 'nyc'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800'
  },

  {
    id: 18,
    title: 'Webinar Series: Psychedelic Medicine 101 (4-Week Course)',
    slug: 'psychedelic-medicine-101',
    type: 'course-launch',
    category: 'course-launch',
    description: 'Comprehensive 4-week introduction to psychedelic medicine for healthcare professionals, covering history, science, clinical applications, and ethics.',
    fullDescription: `Launch of our popular introductory course designed for healthcare professionals new to psychedelic medicine.

Course Curriculum:

Week 1: History & Context
- Indigenous use and traditional medicines
- Modern rediscovery and research renaissance
- Legal status and regulatory landscape
- Overview of major compounds

Week 2: Neuroscience & Pharmacology
- Mechanisms of action
- Receptor pharmacology
- Neuroplasticity and therapeutic effects
- Safety profile and contraindications

Week 3: Clinical Applications
- Depression, PTSD, addiction, end-of-life anxiety
- Clinical trial results and evidence base
- Therapy protocols and best practices
- The role of set and setting

Week 4: Ethics & Integration
- Informed consent and patient selection
- Cultural appropriation and reciprocity
- Professional boundaries
- Integration support strategies

Format: Weekly 2-hour live webinars + recorded lectures + readings + discussion forums

12 CE credits (APA, CME, CNE, Social Work)
Certificate upon completion
Access to course materials for 6 months`,
    date: createDate(2025, 6, 16, 18, 0),
    endDate: createDate(2025, 7, 7, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/psych-med-101',
    attendees: 234,
    maxCapacity: 300,
    price: 395,
    ceCredits: 12,
    ceCategories: ['APA', 'CME', 'CNE', 'Social Work'],
    instructors: [
      { name: 'Dr. Jennifer Kim', credentials: 'MD, Psychiatrist' },
      { name: 'Dr. Robert Martinez', credentials: 'PhD, Clinical Psychologist' }
    ],
    tags: ['course', 'education', 'clinical', 'professional-development'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
  },

  {
    id: 19,
    title: 'Book Club: "How to Change Your Mind" by Michael Pollan',
    slug: 'change-your-mind-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Discussing Michael Pollan\'s bestselling exploration of psychedelic science and his personal journey.',
    fullDescription: `Michael Pollan's "How to Change Your Mind" introduced millions to the psychedelic renaissance. Join us for an in-depth discussion of this landmark book.

Discussion Topics:
- Pollan's personal journey and transformation
- Historical context: from 1960s to today
- The neuroscience chapters: strengths and limitations
- Clinical trials for depression, addiction, end-of-life anxiety
- The role of mystical experiences in healing
- Criticisms and controversies
- Impact on public perception and policy
- What has changed since the book's publication?

Facilitator: Dr. Emily Thornton, Science Writer and Psychedelic Researcher

Optional: Watch the Netflix series "How to Change Your Mind" (2022) as supplemental material.

Reading: Full book recommended, Chapters 1-3 minimum.`,
    date: createDate(2025, 6, 25, 19, 0),
    endDate: createDate(2025, 6, 25, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-june',
    attendees: 94,
    maxCapacity: 150,
    price: 0,
    facilitator: {
      name: 'Dr. Emily Thornton',
      credentials: 'PhD, Science Communication',
      avatar: 'https://i.pravatar.cc/150?img=17'
    },
    tags: ['book-club', 'science', 'popular-culture', 'history'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
  },

  // JULY 2025
  {
    id: 20,
    title: 'Guest Lecture: Dr. Matthew Johnson - Psychedelics and Addiction',
    slug: 'johnson-addiction-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Johns Hopkins researcher Dr. Matthew Johnson presents breakthrough findings on psilocybin for smoking cessation and other addictions.',
    fullDescription: `Dr. Matthew Johnson, Professor of Psychiatry at Johns Hopkins, presents his groundbreaking research on psychedelic-assisted treatment for addiction.

Lecture Overview:
- Johns Hopkins psilocybin smoking cessation trials
- 80% success rate at 6-month follow-up
- Mechanisms: disrupting habitual patterns
- Mystical experience as predictor of success
- Expanding to other addictions: alcohol, cocaine, opioids
- Comparison with existing addiction treatments
- The role of preparation and integration
- Future directions and ongoing trials

Dr. Johnson has published over 100 peer-reviewed papers and is one of the most cited researchers in psychedelic science. His work has been featured in major media including 60 Minutes, The New York Times, and Nature.

Extended Q&A included. Perfect for addiction specialists, therapists, and researchers.`,
    date: createDate(2025, 7, 12, 18, 0),
    endDate: createDate(2025, 7, 12, 20, 30),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/johnson-lecture',
    attendees: 423,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME', 'Social Work'],
    speaker: {
      name: 'Dr. Matthew Johnson',
      credentials: 'PhD, Professor of Psychiatry, Johns Hopkins University',
      avatar: 'https://i.pravatar.cc/150?img=18',
      bio: 'Leading addiction researcher and psychedelic scientist with over 100 publications.'
    },
    tags: ['addiction', 'research', 'psilocybin', 'clinical'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'
  },

  {
    id: 21,
    title: 'Summer Psychedelic Research Symposium',
    slug: 'summer-symposium-2025',
    type: 'symposium',
    category: 'research-symposium',
    description: 'Two-day research symposium featuring emerging findings from psychedelic science laboratories worldwide.',
    fullDescription: `GSAPS presents our mid-year research symposium showcasing the latest discoveries in psychedelic science.

Day 1: Basic Science
- Novel compounds and pharmacology
- Neuroimaging and brain connectivity
- Molecular mechanisms and epigenetics
- Animal models of psychedelic effects
- Computational psychiatry approaches
- Biomarkers and predictors of response

Day 2: Clinical Applications
- Phase 2/3 trial updates
- Long-term follow-up data
- Combination therapies
- Special populations (elderly, youth, chronic illness)
- Implementation science and training programs
- Health economics and access

Format:
- 20 oral presentations (20 min each)
- 40 poster presentations
- 2 keynote addresses
- Panel discussions
- Networking breaks and meals included

Abstracts published in special GSAPS Journal supplement.
12 CE credits available.`,
    date: createDate(2025, 7, 25, 9, 0),
    endDate: createDate(2025, 7, 26, 17, 0),
    location: 'Hybrid: University of California, Berkeley + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/summer-symposium',
    venue: {
      name: 'UC Berkeley Campus',
      address: 'Berkeley, CA 94720',
      mapLink: 'https://maps.google.com'
    },
    attendees: 312,
    maxCapacity: 500,
    price: 75,
    ceCredits: 12,
    ceCategories: ['APA', 'CME', 'CNE'],
    tags: ['symposium', 'research', 'science', 'clinical'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },

  // AUGUST 2025
  {
    id: 22,
    title: 'Workshop: Psychedelic-Assisted Couples Therapy',
    slug: 'couples-therapy-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Specialized training in using psychedelic therapy approaches with couples to deepen intimacy and resolve relationship conflicts.',
    fullDescription: `This innovative workshop explores the emerging field of psychedelic-assisted couples therapy.

Workshop Content:

Theoretical Foundations:
- Attachment theory and psychedelics
- MDMA's prosocial and empathogenic effects
- Psilocybin for perspective-taking and ego dissolution
- Relationship patterns and transformation

Clinical Applications:
- Assessment and couple selection criteria
- Preparation: building safety and intentions
- Session protocols and co-therapist models
- Working with conflict and defensiveness
- Integration: sustaining relational growth
- Contraindications and ethical considerations

Practical Skills:
- Creating safe containers for vulnerable sharing
- Facilitating deep emotional processing
- Managing challenging dynamics during sessions
- Somatic and experiential techniques
- Post-session couples integration practices

Case studies, demonstrations, and supervised practice included.

16 CE credits (LMFT, LCSW, APA)
Materials packet with protocols and resources.`,
    date: createDate(2025, 8, 9, 9, 0),
    endDate: createDate(2025, 8, 10, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/couples-workshop',
    attendees: 89,
    maxCapacity: 120,
    price: 375,
    ceCredits: 16,
    ceCategories: ['LMFT', 'Social Work', 'APA'],
    instructors: [
      { name: 'Dr. Anne Wagener', credentials: 'PhD, LMFT, Couples Therapist' },
      { name: 'Dr. Saj Razvi', credentials: 'MD, Psychiatrist' }
    ],
    tags: ['workshop', 'couples-therapy', 'MDMA', 'relationships'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800'
  },

  {
    id: 23,
    title: 'Meet & Greet: Indigenous Medicine Keepers in Dialogue',
    slug: 'indigenous-dialogue-aug',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Respectful dialogue with indigenous medicine keepers sharing wisdom about traditional plant medicine practices, reciprocity, and cultural preservation.',
    fullDescription: `This special event brings together indigenous medicine keepers and GSAPS community members for cross-cultural dialogue and learning.

Format:
- Welcome and land acknowledgment
- Panel of indigenous speakers sharing their traditions
- Discussion of reciprocity, respect, and cultural appropriation
- Guidelines for ethical engagement with plant medicines
- Supporting indigenous communities and sovereignty
- Q&A with respectful protocols

Featured Speakers:
- Amazonian ayahuasca tradition representative
- Huichol peyote ceremony elder
- Mazatec mushroom tradition keeper
- Native American Church representative

All proceeds support indigenous-led initiatives for cultural preservation and environmental protection.

This is a listening and learning session. Attendees are expected to approach with humility, respect, and openness.`,
    date: createDate(2025, 8, 16, 15, 0),
    endDate: createDate(2025, 8, 16, 18, 0),
    location: 'Hybrid: Santa Fe, NM + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/indigenous-dialogue',
    venue: {
      name: 'Santa Fe Community Convention Center',
      address: 'Santa Fe, NM 87501',
      mapLink: 'https://maps.google.com'
    },
    attendees: 156,
    maxCapacity: 250,
    price: 25,
    tags: ['indigenous', 'reciprocity', 'cultural-awareness', 'ethics'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800'
  },

  {
    id: 24,
    title: 'Book Club: "Sacred Medicine" by Liana Werner-Gray',
    slug: 'sacred-medicine-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Exploring indigenous healing wisdom and plant medicine in the modern context.',
    date: createDate(2025, 8, 27, 19, 0),
    endDate: createDate(2025, 8, 27, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-aug',
    attendees: 58,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Maria Gonzalez',
      credentials: 'MA, Cultural Anthropology',
      avatar: 'https://i.pravatar.cc/150?img=19'
    },
    tags: ['book-club', 'indigenous', 'healing', 'cultural-wisdom'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'
  },

  // SEPTEMBER 2025
  {
    id: 25,
    title: 'Guest Lecture: Dr. Rachel Yehuda - Psychedelics and Trauma',
    slug: 'yehuda-trauma-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Leading trauma researcher Dr. Rachel Yehuda discusses how psychedelics may help heal PTSD and intergenerational trauma.',
    fullDescription: `Dr. Rachel Yehuda, Director of the Center for Psychedelic Psychotherapy and Trauma Research at Mount Sinai, presents her cutting-edge work on psychedelics and trauma.

Lecture Topics:
- Neurobiology of PTSD and trauma
- MDMA-assisted therapy for PTSD: clinical trial results
- Psilocybin for trauma-related depression
- Intergenerational trauma and epigenetic healing
- Working with complex trauma and dissociation
- The window of tolerance and psychedelic experiences
- Safety considerations with trauma survivors
- Future research directions

Dr. Yehuda's groundbreaking research on trauma, stress, and resilience has transformed our understanding of PTSD. Her work bridges neuroscience, psychology, and clinical treatment.

This lecture is essential for clinicians working with trauma survivors and researchers interested in psychedelic trauma therapy.

Q&A session included. 2 CE credits available.`,
    date: createDate(2025, 9, 13, 18, 0),
    endDate: createDate(2025, 9, 13, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/yehuda-lecture',
    attendees: 478,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME', 'Social Work'],
    speaker: {
      name: 'Dr. Rachel Yehuda',
      credentials: 'PhD, Professor of Psychiatry, Mount Sinai',
      avatar: 'https://i.pravatar.cc/150?img=20',
      bio: 'World-renowned trauma researcher specializing in PTSD, stress biology, and psychedelic therapy.'
    },
    tags: ['trauma', 'PTSD', 'MDMA', 'neuroscience'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
  },

  {
    id: 26,
    title: 'Psychedelic Liberty Summit - Policy & Advocacy Conference',
    slug: 'liberty-summit-2025',
    type: 'conference',
    category: 'external-conference',
    description: 'Three-day conference focused on drug policy reform, decriminalization efforts, and psychedelic advocacy strategies.',
    fullDescription: `The Psychedelic Liberty Summit brings together advocates, legal experts, policymakers, and activists working on psychedelic policy reform.

Conference Themes:
- State-level decriminalization initiatives
- Medical access and FDA approval pathways
- Veterans' access to psychedelic therapy
- Right to cognitive liberty and religious freedom
- Harm reduction and safe supply
- Regulating psychedelic therapy: lessons from Oregon, Colorado
- International policy perspectives
- Equity and access in emerging markets

Featured Speakers:
- State legislators and policy makers
- Drug Policy Alliance leadership
- MAPS Public Benefit Corporation
- Veterans advocacy organizations
- Legal experts and constitutional scholars
- Community organizers and activists

Programming:
- Keynotes and panel discussions
- Legal strategy workshops
- Advocacy skills training
- Legislative drafting sessions
- Coalition building and networking
- Media training for advocates

This conference empowers attendees with knowledge and tools to effectively advocate for psychedelic policy reform.`,
    date: createDate(2025, 9, 19, 9, 0),
    endDate: createDate(2025, 9, 21, 18, 0),
    location: 'Washington, DC',
    isVirtual: false,
    venue: {
      name: 'Washington Hilton',
      address: '1919 Connecticut Ave NW, Washington, DC 20009',
      mapLink: 'https://maps.google.com'
    },
    attendees: 650,
    maxCapacity: 800,
    price: 225,
    website: 'https://psychedeliclibertysummit.org',
    tags: ['conference', 'policy', 'advocacy', 'legal', 'reform'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800'
  },

  {
    id: 27,
    title: 'Workshop: Music and Sound in Psychedelic Therapy',
    slug: 'music-therapy-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Full-day workshop on the therapeutic use of music and sound in psychedelic sessions, led by expert music therapists.',
    fullDescription: `Explore the crucial role of music and sound in psychedelic therapy. This experiential workshop combines theory, practice, and hands-on learning.

Workshop Content:

The Science of Music in Psychedelic Therapy:
- Neuroscience of music and emotion
- Music's role in guiding journey arcs
- Research on playlists and therapeutic outcomes
- Cultural considerations in music selection

Practical Skills:
- Curating therapeutic playlists
- Classical vs. contemporary approaches
- Using live music vs. recorded playlists
- Volume, timing, and transitions
- Reading the client and adjusting music
- Silence and stillness
- Sound healing modalities: singing bowls, gongs, voice

Experiential Components:
- Guided listening sessions
- Practice creating journey playlists
- Live sound healing demonstration
- Group sharing and integration

Led by certified music therapists with extensive psychedelic therapy experience.

Materials include sample playlists, music library access, and sound healing resources.

8 CE credits available.`,
    date: createDate(2025, 9, 27, 9, 0),
    endDate: createDate(2025, 9, 27, 17, 0),
    location: 'Los Angeles, CA',
    isVirtual: false,
    venue: {
      name: 'The Broad Stage',
      address: '1310 11th St, Santa Monica, CA 90401',
      mapLink: 'https://maps.google.com'
    },
    attendees: 65,
    maxCapacity: 80,
    price: 275,
    ceCredits: 8,
    ceCategories: ['APA', 'Music Therapy', 'Social Work'],
    instructors: [
      { name: 'Dr. Mendel Kaelen', credentials: 'PhD, Neuroscientist, Music Therapist' },
      { name: 'Sarah Minnick', credentials: 'MM, MT-BC, Sound Healer' }
    ],
    tags: ['workshop', 'music-therapy', 'sound-healing', 'experiential'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
  },

  // OCTOBER 2025
  {
    id: 28,
    title: 'Breaking Convention 2025 - UK Psychedelic Conference',
    slug: 'breaking-convention-2025',
    type: 'conference',
    category: 'external-conference',
    description: 'Europe\'s largest multidisciplinary psychedelic conference, featuring research, culture, art, and activism.',
    fullDescription: `Breaking Convention returns to London for its 8th edition, bringing together the global psychedelic community for three days of talks, workshops, performances, and networking.

Conference Streams:
- Science & Medicine
- Culture & Society
- Art & Creativity
- Shamanism & Ethnobotany
- Philosophy & Consciousness
- Politics & Activism
- Harm Reduction

Special Features:
- 100+ speakers from 30+ countries
- Keynote lectures from field leaders
- Academic paper presentations
- Documentary screenings
- Art exhibitions and installations
- Live music and performances
- Vendor marketplace
- Workshops and experiential sessions
- Late-night socials and parties

Previous speakers include Dennis McKenna, Amanda Feilding, David Luke, Ben Sessa, Bia Labate, and many others.

Breaking Convention is known for its diversity, inclusivity, and celebration of all aspects of psychedelic culture and science.

Student discounts available. GSAPS members receive discount code.`,
    date: createDate(2025, 10, 28, 9, 0),
    endDate: createDate(2025, 10, 31, 18, 0),
    location: 'Greenwich Maritime, London, UK',
    isVirtual: false,
    venue: {
      name: 'Old Royal Naval College',
      address: 'Park Row, Greenwich, London SE10 9LW, UK',
      mapLink: 'https://maps.google.com'
    },
    attendees: 1800,
    maxCapacity: 2000,
    price: 185,
    website: 'https://breakingconvention.org',
    tags: ['conference', 'international', 'culture', 'research', 'art'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },

  // NOVEMBER 2025
  {
    id: 29,
    title: 'Course Launch: Psychedelic Pharmacology for Clinicians',
    slug: 'pharmacology-course-launch',
    type: 'course-launch',
    category: 'course-launch',
    description: 'Launch of comprehensive 8-week course on psychedelic pharmacology, covering mechanisms, safety, drug interactions, and clinical applications.',
    fullDescription: `GSAPS announces the launch of our advanced pharmacology course designed for prescribers and clinical researchers.

Course Overview:

Week 1-2: Fundamentals
- Receptor pharmacology and binding profiles
- Serotonergic, dopaminergic, and other systems
- Pharmacokinetics and pharmacodynamics
- Dose-response relationships

Week 3-4: Compound-Specific Deep Dives
- Psilocybin/psilocin
- LSD
- MDMA
- DMT/Ayahuasca
- Mescaline
- Ketamine
- Novel compounds (2C-B, 5-MeO-DMT, etc.)

Week 5-6: Safety & Drug Interactions
- Medical contraindications
- Psychiatric contraindications
- Drug-drug interactions
- Managing adverse reactions
- When to use pharmacological interventions

Week 7-8: Clinical Applications
- Optimal dosing strategies
- Microdosing pharmacology
- Combination therapies
- Special populations
- Future directions

Format: Weekly 2-hour live lectures + pre-recorded modules + case studies + journal club discussions

16 CE credits (CME, Pharmacy CE)
Certificate upon completion
Includes comprehensive pharmacology reference guide`,
    date: createDate(2025, 11, 7, 18, 0),
    endDate: createDate(2025, 12, 26, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/pharmacology-course',
    attendees: 187,
    maxCapacity: 250,
    price: 495,
    ceCredits: 16,
    ceCategories: ['CME', 'Pharmacy CE'],
    instructors: [
      { name: 'Dr. David Nichols', credentials: 'PhD, Medicinal Chemistry & Pharmacology' },
      { name: 'Dr. Charles Grob', credentials: 'MD, Psychiatrist' }
    ],
    tags: ['course', 'pharmacology', 'clinical', 'medical'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800'
  },

  {
    id: 30,
    title: 'Guest Lecture: Dr. Rosalind Watts - Psychedelic Therapy Training',
    slug: 'watts-therapy-training',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Leading psychedelic therapist Dr. Rosalind Watts shares insights on therapist training, therapeutic relationships, and the ACE model.',
    fullDescription: `Dr. Rosalind Watts, Clinical Lead of Imperial College's psilocybin trials and founder of ACER Integration, presents on psychedelic therapy training and practice.

Lecture Topics:
- The ACE (Accept, Connect, Embody) therapeutic model
- Essential competencies for psychedelic therapists
- The therapeutic relationship in psychedelic therapy
- Training pathways and certification programs
- Common mistakes and how to avoid them
- Self-work and therapist preparation
- Integrating psychedelic insights into ongoing therapy
- The future of psychedelic therapy training

Dr. Watts has trained hundreds of therapists and brings both research rigor and clinical warmth to her work. Her ACE model offers a practical, evidence-informed framework for therapeutic practice.

This lecture is invaluable for therapists seeking to work with psychedelics or support clients' integration.

Extended Q&A. 2 CE credits available.`,
    date: createDate(2025, 11, 14, 18, 0),
    endDate: createDate(2025, 11, 14, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/watts-lecture',
    attendees: 391,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'Social Work', 'LMFT'],
    speaker: {
      name: 'Dr. Rosalind Watts',
      credentials: 'DClinPsy, Clinical Psychologist, ACER Founder',
      avatar: 'https://i.pravatar.cc/150?img=21',
      bio: 'Leading psychedelic therapist, researcher, and trainer of psychedelic therapy practitioners worldwide.'
    },
    tags: ['therapy', 'training', 'clinical', 'ACE-model'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'
  },

  {
    id: 31,
    title: 'Book Club: "The Psychedelic Explorer\'s Guide" by James Fadiman',
    slug: 'explorers-guide-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Discussing James Fadiman\'s comprehensive guide to safe, sacred psychedelic experiences.',
    fullDescription: `James Fadiman's "The Psychedelic Explorer's Guide" has become a modern classic. Join us for discussion of this practical and philosophical text.

Discussion Topics:
- Preparation, session, and integration framework
- The role of guides and sitters
- Set and setting principles
- Microdosing protocols and research
- Problem-solving and creativity enhancement
- Spiritual and personal growth
- Safety guidelines and harm reduction
- Evolution of psychedelic practices

Facilitator: Dr. Thomas Lee, Clinical Psychologist

We'll also discuss Dr. Fadiman's ongoing microdosing research and citizen science project.

Reading: Chapters 1-6 (minimum), full book recommended.`,
    date: createDate(2025, 11, 19, 19, 0),
    endDate: createDate(2025, 11, 19, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-nov',
    attendees: 76,
    maxCapacity: 120,
    price: 0,
    facilitator: {
      name: 'Dr. Thomas Lee',
      credentials: 'PhD, Clinical Psychology',
      avatar: 'https://i.pravatar.cc/150?img=22'
    },
    tags: ['book-club', 'microdosing', 'practice', 'harm-reduction'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800'
  },

  {
    id: 32,
    title: 'Thanksgiving Community Gathering & Gratitude Circle',
    slug: 'thanksgiving-gathering-2025',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Community celebration bringing together GSAPS members for sharing, gratitude, and connection.',
    fullDescription: `Join fellow GSAPS members for our annual Thanksgiving community gathering - a time for reflection, gratitude, and connection.

Event Activities:
- Opening gratitude circle
- Community sharing: What are you grateful for this year?
- Small group discussions
- Potluck meal (bring a dish to share!)
- Live music and performances
- Closing ceremony and intentions for the year ahead

This informal gathering celebrates our community and the transformative work we do together. All are welcome, whether you're a longtime member or new to GSAPS.

Family-friendly event. Vegetarian/vegan options available.

No registration fee, donations welcome to support GSAPS programs.`,
    date: createDate(2025, 11, 26, 15, 0),
    endDate: createDate(2025, 11, 26, 19, 0),
    location: 'Community Hall, Berkeley, CA',
    isVirtual: false,
    venue: {
      name: 'Berkeley Fellowship Hall',
      address: '1924 Cedar St, Berkeley, CA 94709',
      mapLink: 'https://maps.google.com'
    },
    attendees: 125,
    maxCapacity: 200,
    price: 0,
    tags: ['community', 'networking', 'gratitude', 'celebration'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
  },

  // DECEMBER 2025
  {
    id: 33,
    title: 'Year-End Research Symposium: Psychedelic Science 2025 Review',
    slug: 'year-end-symposium-2025',
    type: 'symposium',
    category: 'research-symposium',
    description: 'Comprehensive review of the year\'s most significant psychedelic research findings, clinical trials, and scientific breakthroughs.',
    fullDescription: `GSAPS annual year-end symposium reviewing the most important developments in psychedelic science from 2025.

Symposium Themes:

Clinical Trials & FDA Updates:
- MDMA PTSD approval status
- Psilocybin depression Phase 3 results
- Other compounds in late-stage development
- Post-approval access and implementation

Basic Science Breakthroughs:
- Neuroplasticity mechanisms
- Biomarker discoveries
- Novel compounds and analogs
- Computational modeling advances

Real-World Evidence:
- Observational studies
- Safety surveillance
- Integration outcomes research
- Implementation in healthcare systems

Policy & Access:
- State-level initiatives
- International developments
- Training and certification programs
- Equity and access challenges

Format:
- Morning: Keynote and research presentations
- Afternoon: Panel discussions and Q&A
- Poster session
- Networking reception

6 CE credits available. Abstracts published in GSAPS Journal.`,
    date: createDate(2025, 12, 6, 9, 0),
    endDate: createDate(2025, 12, 6, 17, 0),
    location: 'Hybrid: Stanford University + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/year-end-symposium',
    venue: {
      name: 'Stanford University Medical Center',
      address: 'Stanford, CA 94305',
      mapLink: 'https://maps.google.com'
    },
    attendees: 267,
    maxCapacity: 400,
    price: 60,
    ceCredits: 6,
    ceCategories: ['APA', 'CME', 'CNE'],
    tags: ['symposium', 'research', 'review', 'clinical'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
  },

  {
    id: 34,
    title: 'Workshop: Psychedelic Harm Reduction for Festival & Event Staff',
    slug: 'harm-reduction-festival-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Training for volunteers and staff providing psychedelic harm reduction services at festivals, concerts, and events.',
    fullDescription: `Learn to provide compassionate, effective harm reduction support at festivals and events through this comprehensive training.

Workshop Content:

Foundations:
- Principles of psychedelic harm reduction
- The Zendo Project model
- Creating safe, supportive spaces
- Non-judgmental peer support
- Consent and boundaries

Practical Skills:
- Assessing situations and triage
- De-escalation techniques
- Grounding and calming methods
- Recognizing medical emergencies
- When and how to involve medical staff
- Supporting different psychedelic experiences
- Working with challenging states

Special Topics:
- Drug checking and adulterants
- Polysubstance use considerations
- Supporting diverse populations
- Self-care for harm reduction workers
- Legal and ethical considerations
- Working with security and medical teams

Experiential Training:
- Role-playing scenarios
- Case discussions
- Practice sessions with feedback

Led by experienced Zendo Project and DanceSafe trainers.

Certificate of completion provided. Suitable for both experienced and new harm reduction volunteers.`,
    date: createDate(2025, 12, 13, 9, 0),
    endDate: createDate(2025, 12, 13, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/harm-reduction-workshop',
    attendees: 148,
    maxCapacity: 200,
    price: 75,
    tags: ['workshop', 'harm-reduction', 'festival', 'zendo', 'peer-support'],
    instructrationRequired: true,
    instructors: [
      { name: 'Sara Gael', credentials: 'Zendo Project Director' },
      { name: 'Mitchell Gomez', credentials: 'DanceSafe Executive Director' }
    ],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
  },

  // JANUARY 2026
  {
    id: 35,
    title: 'New Year Research Symposium: Future of Psychedelic Medicine',
    slug: 'new-year-symposium-2026',
    type: 'symposium',
    category: 'research-symposium',
    description: 'Annual symposium looking ahead to emerging trends, novel research directions, and the future landscape of psychedelic medicine.',
    fullDescription: `Begin 2026 with GSAPS' forward-looking research symposium exploring the future of psychedelic medicine.

Symposium Tracks:

Next-Generation Therapeutics:
- Novel compounds and synthetic psychedelics
- Non-hallucinogenic analogs
- Targeted delivery systems
- Combination therapies
- Personalized medicine approaches

Expanding Applications:
- Chronic pain and inflammatory conditions
- Neurodegenerative diseases (Alzheimer's, Parkinson's)
- Eating disorders
- OCD and anxiety disorders
- Creativity and cognitive enhancement

Technology & Innovation:
- Virtual reality and psychedelic therapy
- AI-assisted integration
- Wearable biosensors
- Telemedicine and remote therapy
- Digital therapeutics

Implementation Science:
- Scaling access post-approval
- Training healthcare workforce
- Integration into healthcare systems
- Cost-effectiveness and reimbursement
- Global health applications

Format:
- 15 research presentations
- 3 keynote addresses
- Panel: "The Field in 2030"
- Poster session with 30+ posters
- Networking lunch and reception

10 CE credits. Published proceedings.`,
    date: createDate(2026, 1, 10, 9, 0),
    endDate: createDate(2026, 1, 10, 18, 0),
    location: 'Hybrid: UCSF Mission Bay + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/new-year-2026',
    venue: {
      name: 'UCSF Mission Bay Conference Center',
      address: 'San Francisco, CA 94158',
      mapLink: 'https://maps.google.com'
    },
    attendees: 298,
    maxCapacity: 450,
    price: 65,
    ceCredits: 10,
    ceCategories: ['APA', 'CME', 'CNE'],
    tags: ['symposium', 'research', 'future', 'innovation'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
  },

  {
    id: 36,
    title: 'Guest Lecture: Dr. Gabor Maté - Trauma, Addiction, and Ayahuasca',
    slug: 'mate-ayahuasca-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Renowned physician and author Dr. Gabor Maté discusses trauma, addiction, and his experiences with ayahuasca ceremonies.',
    fullDescription: `Dr. Gabor Maté, bestselling author and compassionate healer, shares insights from decades of work with trauma, addiction, and plant medicine.

Lecture Topics:
- The roots of addiction in childhood trauma
- "The Realm of Hungry Ghosts" - understanding addiction
- Ayahuasca's role in healing addiction and trauma
- Indigenous wisdom and Western medicine
- Compassion and non-judgment in healing
- The therapeutic relationship
- Personal experiences facilitating ayahuasca ceremonies
- Integration of insights into daily life
- Criticisms and controversies
- The future of trauma-informed, psychedelic-assisted therapy

Dr. Maté brings a unique combination of medical expertise, compassionate presence, and cross-cultural sensitivity to his work. His books including "In the Realm of Hungry Ghosts," "When the Body Says No," and "The Myth of Normal" have influenced millions.

This will be a moving, thought-provoking exploration of healing, trauma, and transformation.

Extended Q&A. 2 CE credits available.`,
    date: createDate(2026, 1, 24, 18, 0),
    endDate: createDate(2026, 1, 24, 20, 30),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/mate-lecture',
    attendees: 487,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME', 'Social Work'],
    speaker: {
      name: 'Dr. Gabor Maté',
      credentials: 'MD, Physician, Author',
      avatar: 'https://i.pravatar.cc/150?img=23',
      bio: 'Renowned physician, addiction expert, and author exploring trauma, healing, and plant medicine.'
    },
    tags: ['trauma', 'addiction', 'ayahuasca', 'healing'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800'
  },

  // FEBRUARY 2026
  {
    id: 37,
    title: 'Workshop: Ketamine-Assisted Psychotherapy (3-Day Intensive)',
    slug: 'ketamine-therapy-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Comprehensive 3-day training in ketamine-assisted psychotherapy for depression, PTSD, and other conditions.',
    fullDescription: `Intensive training in the clinical practice of ketamine-assisted psychotherapy (KAP).

Day 1: Foundations
- Ketamine pharmacology and mechanisms
- Dissociative states vs. classic psychedelics
- Evidence base: depression, PTSD, suicidality, chronic pain
- IV vs. IM vs. oral vs. nasal administration
- Medical screening and contraindications
- Legal and regulatory landscape

Day 2: Clinical Practice
- Patient selection and assessment
- Preparation sessions: building alliance and intentions
- Dosing protocols and titration
- Managing ketamine sessions
- The therapeutic relationship in KAP
- Integration psychotherapy
- Managing side effects and adverse reactions
- Combining with other modalities (somatic, EMDR, IFS)

Day 3: Advanced Topics & Practice
- Treatment-resistant depression protocols
- Suicidality and emergency applications
- Chronic pain and psychedelic therapy
- Addiction and KAP
- Group ketamine therapy
- Business and practice development
- Supervised practice with demonstrations
- Case consultations

24 CE credits (APA, CME, Social Work, Nursing)
Includes clinical protocols, patient education materials, and resource library.

Led by experienced KAP providers and medical directors.`,
    date: createDate(2026, 2, 6, 9, 0),
    endDate: createDate(2026, 2, 8, 17, 0),
    location: 'Denver, CO',
    isVirtual: false,
    venue: {
      name: 'Denver Wellness Center',
      address: '1580 Logan St, Denver, CO 80203',
      mapLink: 'https://maps.google.com'
    },
    attendees: 42,
    maxCapacity: 50,
    price: 1295,
    ceCredits: 24,
    ceCategories: ['APA', 'CME', 'Social Work', 'CNE'],
    instructors: [
      { name: 'Dr. Raquel Bennett', credentials: 'MD, Psychiatrist, KAP Medical Director' },
      { name: 'Dr. Phil Wolfson', credentials: 'MD, Psychiatrist' }
    ],
    tags: ['workshop', 'ketamine', 'KAP', 'clinical', 'intensive'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
  },

  {
    id: 38,
    title: 'Book Club: "Conscious Medicine" by Françoise Bourzat',
    slug: 'conscious-medicine-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Exploring Françoise Bourzat\'s integrative approach combining indigenous wisdom with Western psychology.',
    fullDescription: `This month we explore "Conscious Medicine: Expanded States of Consciousness and the Journey of Personal Transformation" by Françoise Bourzat.

Discussion Topics:
- The consciousness medicine framework
- Integrating indigenous and Western approaches
- The three-phase model: preparation, journey, integration
- Somatic awareness in psychedelic work
- Cultural humility and appropriation
- Working with expanded states
- The role of the guide/facilitator
- Long-term transformation and integration
- Shadow work and personal growth

Françoise Bourzat brings 35+ years of experience with Mazatec healers and psychedelic therapy. Her work bridges cultures with respect and integrity.

Facilitator: Dr. Maya Patel, Transpersonal Psychologist

Reading: Full book recommended, Part 1 minimum.`,
    date: createDate(2026, 2, 18, 19, 0),
    endDate: createDate(2026, 2, 18, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-feb-26',
    attendees: 71,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Dr. Maya Patel',
      credentials: 'PhD, Transpersonal Psychology',
      avatar: 'https://i.pravatar.cc/150?img=24'
    },
    tags: ['book-club', 'indigenous-wisdom', 'integration', 'somatic'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
  },

  {
    id: 39,
    title: 'Webinar: Microdosing - Science, Practice, and Controversies',
    slug: 'microdosing-webinar',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Comprehensive webinar examining the science, anecdotal reports, and ongoing debates around psychedelic microdosing.',
    fullDescription: `This webinar examines the phenomenon of psychedelic microdosing from multiple angles.

Webinar Content:

The Science:
- What is microdosing? Definitions and protocols
- Current research: placebo-controlled trials
- Observational and survey studies
- Neurobiological mechanisms
- Expectancy effects and placebo responses
- What we know vs. what we don't know

Reported Benefits:
- Mood and emotional regulation
- Creativity and problem-solving
- Focus and productivity
- Social connection and empathy
- Anxiety and depression symptoms
- Energy and motivation

Risks and Concerns:
- Cardiac valvulopathy concerns
- Tolerance and receptor downregulation
- Psychological risks
- Legal status
- Quality control and dosing accuracy
- Interaction with medications

Clinical Perspectives:
- Microdosing in therapeutic contexts
- Patient experiences and outcomes
- Ethical considerations for clinicians
- Future research directions

Panel includes researchers conducting microdosing trials, clinicians working with microdosing patients, and experts in psychedelic pharmacology.

Q&A session included. 2 CE credits.`,
    date: createDate(2026, 2, 28, 18, 0),
    endDate: createDate(2026, 2, 28, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/microdosing-webinar',
    attendees: 312,
    maxCapacity: 500,
    price: 25,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    tags: ['microdosing', 'research', 'webinar', 'science'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800'
  },

  // MARCH 2026
  {
    id: 40,
    title: 'Psychedelic Science 2026 - MAPS Biennial Conference',
    slug: 'psychedelic-science-2026',
    type: 'conference',
    category: 'external-conference',
    description: 'The world\'s largest psychedelic research conference returns with expanded programming covering the latest advances in science, therapy, and policy.',
    fullDescription: `MAPS Psychedelic Science 2026 - the premier global gathering of the psychedelic research and clinical community.

Conference Scope:
With MDMA therapy likely approved by FDA, this year's conference focuses on post-approval implementation while continuing to advance research across all psychedelic medicines.

Programming Highlights:
- 250+ oral presentations
- 150+ poster presentations
- 50+ workshops and training sessions
- Keynote addresses from field leaders
- Pre-conference intensive courses
- Specialized tracks for different audiences
- Networking events and socials
- Exhibition hall with 150+ vendors
- Art, music, and cultural programming

Conference Tracks:
- Clinical Research & Evidence
- Therapy Training & Practice
- Neuroscience & Pharmacology
- Implementation & Access
- Policy, Legal, & Regulatory
- Indigenous Wisdom & Reciprocity
- Culture, Art, & Society
- Business & Innovation
- Harm Reduction & Community Care

Special Programming:
- MDMA therapy provider training pathway
- Psilocybin facilitator workshops
- Integration practitioner intensives
- Legal and regulatory updates
- Advocacy and organizing skills
- Equity and access initiatives

Early bird pricing ends January 15. Student and scholarship rates available. GSAPS members receive 15% discount.`,
    date: createDate(2026, 3, 12, 9, 0),
    endDate: createDate(2026, 3, 15, 18, 0),
    location: 'Austin Convention Center, Austin, TX',
    isVirtual: false,
    venue: {
      name: 'Austin Convention Center',
      address: '500 E Cesar Chavez St, Austin, TX 78701',
      mapLink: 'https://maps.google.com'
    },
    attendees: 4200,
    maxCapacity: 6000,
    price: 695,
    website: 'https://psychedelicscience.org',
    tags: ['conference', 'MAPS', 'research', 'clinical', 'major'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },

  {
    id: 41,
    title: 'Guest Lecture: Dr. Julie Holland - Women, Hormones, and Psychedelics',
    slug: 'holland-women-hormones-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Psychiatrist and author Dr. Julie Holland explores the intersection of women\'s mental health, hormones, and psychedelic medicine.',
    fullDescription: `Dr. Julie Holland, psychiatrist and expert in women's mental health, presents on the unique considerations for women in psychedelic therapy.

Lecture Topics:
- Hormonal influences on psychedelic experiences
- Menstrual cycle and psychedelic sensitivity
- PMDD, perimenopause, and psychedelic therapy
- Pregnancy, postpartum, and breastfeeding considerations
- Gender differences in mental health and treatment response
- MDMA for sexual trauma in women
- Birth trauma and psychedelic healing
- Women's safety in psychedelic spaces
- Feminist perspectives on psychedelic medicine
- The future of women's psychedelic healthcare

Dr. Holland is author of "Good Chemistry," "Moody Bitches," and editor of "Ecstasy: The Complete Guide" and "The Pot Book." She brings decades of clinical experience and a feminist lens to psychedelic medicine.

This lecture addresses critical but often overlooked topics in psychedelic research and practice.

Q&A session. 2 CE credits available.`,
    date: createDate(2026, 3, 28, 18, 0),
    endDate: createDate(2026, 3, 28, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/holland-lecture',
    attendees: 364,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME', 'Social Work'],
    speaker: {
      name: 'Dr. Julie Holland',
      credentials: 'MD, Psychiatrist, Author',
      avatar: 'https://i.pravatar.cc/150?img=25',
      bio: 'Psychiatrist specializing in women\'s mental health, cannabis medicine, and psychedelic therapy.'
    },
    tags: ['women', 'hormones', 'gender', 'health'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'
  },

  // APRIL 2026
  {
    id: 42,
    title: 'Spring Integration Retreat: Psychedelic Aftercare in the Mountains',
    slug: 'spring-retreat-2026',
    type: 'retreat',
    category: 'retreat',
    description: '5-day immersive retreat in the Colorado Rockies for integration, community, and deepening psychedelic insights.',
    fullDescription: `Escape to the majestic Rocky Mountains for a transformative 5-day integration retreat.

Retreat Structure:

Daily Schedule:
- Morning meditation and yoga
- Integration circles and group processes
- Nature immersion and hiking
- Workshops on integration practices
- Creative expression (art, writing, movement)
- One-on-one integration sessions (optional)
- Evening gatherings and ceremonies
- Free time for reflection and rest

Integration Modalities:
- Somatic Experiencing
- Internal Family Systems (IFS)
- Expressive arts therapy
- Nature-based therapy
- Mindfulness and meditation
- Journaling and creative writing
- Movement and dance
- Breathwork
- Group sharing and peer support

Workshop Topics:
- Embodying psychedelic insights
- Working with resistance and shadow
- Spiritual integration
- Relational healing
- Sustaining transformation
- Building daily practices

Setting:
Beautiful mountain retreat center with comfortable accommodations, nutritious meals, hot tub, and access to hiking trails.

All experience levels welcome. This retreat supports integration of all transformative experiences, psychedelic or otherwise.

Private and shared room options. Scholarships available.`,
    date: createDate(2026, 4, 17, 14, 0),
    endDate: createDate(2026, 4, 22, 11, 0),
    location: 'Shambhala Mountain Center, Red Feather Lakes, CO',
    isVirtual: false,
    venue: {
      name: 'Shambhala Mountain Center',
      address: '4921 County Rd 68C, Red Feather Lakes, CO 80545',
      mapLink: 'https://maps.google.com'
    },
    attendees: 38,
    maxCapacity: 50,
    price: 1250,
    tags: ['retreat', 'integration', 'mountains', 'immersive'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },

  {
    id: 43,
    title: 'Book Club: "Being Ram Dass" Documentary Discussion',
    slug: 'ram-dass-doc-discussion',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Watch and discuss the documentary "Becoming Nobody" and explore Ram Dass\'s influence on psychedelic spirituality.',
    fullDescription: `This special book club session explores the life and teachings of Ram Dass (Richard Alpert) through the documentary "Becoming Nobody" and his writings.

Pre-Session Viewing:
- Documentary: "Becoming Nobody" (2019)
- Optional reading: "Be Here Now"
- Optional reading: "Polishing the Mirror"

Discussion Topics:
- Ram Dass's journey from Harvard psychology to spiritual teacher
- Collaboration with Timothy Leary and early LSD research
- Eastern spirituality and psychedelic experiences
- "Be Here Now" and its cultural impact
- Service, compassion, and conscious aging
- Integration of psychedelic insights into spiritual practice
- Legacy and continuing influence
- Controversies and criticisms

We'll also discuss how Ram Dass's teachings remain relevant for contemporary psychedelic practitioners and seekers.

Facilitator: Dr. William Chang, Religious Studies

This will be a reflective, contemplative session honoring a beloved teacher and pioneer.`,
    date: createDate(2026, 4, 23, 19, 0),
    endDate: createDate(2026, 4, 23, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/ram-dass-discussion',
    attendees: 112,
    maxCapacity: 150,
    price: 0,
    facilitator: {
      name: 'Dr. William Chang',
      credentials: 'PhD, Religious Studies',
      avatar: 'https://i.pravatar.cc/150?img=26'
    },
    tags: ['book-club', 'spirituality', 'ram-dass', 'history'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800'
  },

  // MAY 2026
  {
    id: 44,
    title: 'Workshop: Internal Family Systems (IFS) and Psychedelic Therapy',
    slug: 'ifs-psychedelic-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: '2-day workshop integrating Internal Family Systems therapy with psychedelic preparation and integration.',
    fullDescription: `Learn to integrate the powerful Internal Family Systems (IFS) model with psychedelic therapy.

Workshop Overview:

Day 1: IFS Foundations
- The IFS model: parts, Self, and healing
- Identifying protectors, managers, and exiles
- The 8 C's of Self-leadership
- Unburdening and healing trauma
- IFS and psychedelic experiences
- How psychedelics can facilitate access to parts and Self
- Research on IFS and psychedelic therapy

Day 2: Clinical Application
- IFS in psychedelic preparation
- Exploring parts and their concerns before sessions
- IFS during psychedelic experiences
- Supporting parts-work during sessions
- IFS in integration therapy
- Healing exiles and unburdening post-session
- Case presentations and demonstrations
- Practice exercises with peer feedback

This workshop bridges two powerful modalities for transformational healing. IFS provides a framework for understanding and working with the multiplicity revealed in psychedelic experiences.

Led by IFS-certified therapists with extensive psychedelic therapy experience.

16 CE credits (APA, Social Work, LMFT)
Includes IFS psychedelic therapy protocol and resources.`,
    date: createDate(2026, 5, 2, 9, 0),
    endDate: createDate(2026, 5, 3, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/ifs-workshop',
    attendees: 124,
    maxCapacity: 150,
    price: 425,
    ceCredits: 16,
    ceCategories: ['APA', 'Social Work', 'LMFT'],
    instructors: [
      { name: 'Dr. Elizabeth Nielson', credentials: 'PhD, IFS Therapist' },
      { name: 'Dr. Richard Schwartz', credentials: 'PhD, IFS Founder' }
    ],
    tags: ['workshop', 'IFS', 'parts-work', 'therapy-model'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
  },

  {
    id: 45,
    title: 'Guest Lecture: Dennis McKenna - Ethnobotany and Amazonian Plant Medicine',
    slug: 'mckenna-ethnobotany-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Renowned ethnopharmacologist Dennis McKenna shares decades of research on ayahuasca and Amazonian plant medicines.',
    fullDescription: `Dennis McKenna, PhD, ethnopharmacologist and brother of the late Terence McKenna, presents his life's work studying Amazonian plant medicines.

Lecture Topics:
- Ethnobotany of the Amazon basin
- DMT and ayahuasca: chemistry and pharmacology
- Traditional indigenous use and ceremonies
- The McKenna brothers' pioneering research
- Modern ayahuasca research and clinical applications
- Sustainability and conservation challenges
- Biopiracy and intellectual property issues
- Reciprocity and supporting indigenous communities
- The future of ethnobotanical research
- Reflections on Terence's legacy

Dr. McKenna has spent over 40 years studying psychoactive plants, conducting fieldwork with indigenous groups, and researching in laboratories. He brings scientific rigor and deep respect for traditional knowledge.

This lecture offers a rare opportunity to learn from one of the most experienced ethnobotanists in the field.

Extended Q&A. 2 CE credits available.`,
    date: createDate(2026, 5, 16, 18, 0),
    endDate: createDate(2026, 5, 16, 20, 30),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/mckenna-lecture',
    attendees: 441,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    speaker: {
      name: 'Dennis McKenna, PhD',
      credentials: 'Ethnopharmacologist, Research Professor',
      avatar: 'https://i.pravatar.cc/150?img=27',
      bio: 'Leading ethnobotanist with 40+ years studying Amazonian plant medicines and ayahuasca.'
    },
    tags: ['ethnobotany', 'ayahuasca', 'DMT', 'indigenous'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1542601098-3adb3bdb0019?w=800'
  },

  {
    id: 46,
    title: 'Networking: Seattle Psychedelic Community Gathering',
    slug: 'seattle-networking-may-26',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Connect with psychedelic professionals and enthusiasts in the Seattle area for networking and community building.',
    fullDescription: `Join the vibrant Seattle psychedelic community for an evening of connection and conversation.

Event Format:
- Welcome and introductions
- Lightning talks: community members sharing projects
- Small group discussions
- Open networking
- Resource sharing
- Light refreshments

Perfect for:
- Researchers and clinicians
- Integration practitioners
- Advocates and activists
- Students and early-career professionals
- Anyone interested in psychedelic science and medicine

Learn about local resources, research programs, training opportunities, and community initiatives.

Location: The Riveter Capitol Hill - beautiful co-working and event space.

Free for GSAPS members. All welcome!`,
    date: createDate(2026, 5, 21, 18, 0),
    endDate: createDate(2026, 5, 21, 21, 0),
    location: 'The Riveter Capitol Hill, Seattle, WA',
    isVirtual: false,
    venue: {
      name: 'The Riveter',
      address: '1501 E Madison St, Seattle, WA 98122',
      mapLink: 'https://maps.google.com'
    },
    attendees: 72,
    maxCapacity: 120,
    price: 0,
    tags: ['networking', 'seattle', 'community', 'in-person'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'
  },

  // JUNE 2026
  {
    id: 47,
    title: 'Course Launch: Psychedelic Facilitation Certificate Program',
    slug: 'facilitation-certificate-launch',
    type: 'course-launch',
    category: 'course-launch',
    description: 'Launch of comprehensive 6-month certificate program for psychedelic facilitators and integration specialists.',
    fullDescription: `GSAPS announces our most comprehensive training program: the Psychedelic Facilitation Certificate Program.

Program Structure:
6 months, 120 hours of instruction + 80 hours supervised practice

Curriculum Modules:

Module 1: Foundations (20 hours)
- History and cultural context
- Pharmacology and neuroscience
- Legal and ethical frameworks
- Scope of practice and professional boundaries

Module 2: Preparation (20 hours)
- Assessment and screening
- Building therapeutic alliance
- Intention-setting
- Managing expectations
- Harm reduction

Module 3: Facilitation (30 hours)
- Session protocols and best practices
- Therapeutic presence and holding space
- Music and set/setting
- Supporting different types of experiences
- Crisis management
- Different modalities: psilocybin, MDMA, ketamine

Module 4: Integration (25 hours)
- Integration theory and frameworks
- Therapeutic modalities (IFS, Somatic, ACE, etc.)
- Long-term integration support
- Group integration circles
- Measuring outcomes

Module 5: Special Topics (25 hours)
- Trauma-informed practice
- Spiritual emergencies
- Cultural humility and appropriation
- Business and ethical practice
- Continuing education and professional development

Supervised Practice:
- 10 observed preparation sessions
- 10 observed integration sessions
- Group supervision
- Individual mentorship
- Case presentations

Format: Monthly intensive weekends (in-person) + weekly online seminars + self-paced learning + supervision

60 CE credits available
Certificate upon successful completion
Access to ongoing professional community

Limited enrollment. Application required.`,
    date: createDate(2026, 6, 6, 10, 0),
    endDate: createDate(2026, 6, 6, 16, 0),
    location: 'Hybrid: Omega Institute, Rhinebeck, NY + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/certificate-launch',
    venue: {
      name: 'Omega Institute',
      address: '150 Lake Dr, Rhinebeck, NY 12572',
      mapLink: 'https://maps.google.com'
    },
    attendees: 246,
    maxCapacity: 300,
    price: 4500,
    ceCredits: 60,
    ceCategories: ['APA', 'CME', 'Social Work', 'LMFT', 'CNE'],
    tags: ['course', 'certificate', 'training', 'facilitation', 'comprehensive'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800'
  },

  {
    id: 48,
    title: 'Book Club: "LSD: My Problem Child" by Albert Hofmann',
    slug: 'problem-child-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Reading the classic autobiography of LSD\'s discoverer, Dr. Albert Hofmann, and discussing the history of psychedelic research.',
    fullDescription: `Explore the fascinating story of LSD's discovery through Albert Hofmann's own words in "LSD: My Problem Child."

Discussion Topics:
- Hofmann's accidental discovery of LSD in 1943
- The first intentional LSD trip (Bicycle Day)
- Early medical and psychiatric research
- The 1960s cultural revolution and backlash
- Hofmann's perspective on LSD's potential and problems
- Scientific curiosity and ethical responsibility
- The "problem child" metaphor
- LSD's renaissance in the 21st century
- Hofmann's later reflections and legacy

This autobiography is essential reading for anyone interested in psychedelic history. Hofmann writes with scientific precision, personal warmth, and philosophical depth.

Facilitator: Dr. Alexander Belser, Clinical Psychologist and Psychedelic Researcher

Reading: Full book (it's short and very readable!)`,
    date: createDate(2026, 6, 17, 19, 0),
    endDate: createDate(2026, 6, 17, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-june-26',
    attendees: 88,
    maxCapacity: 120,
    price: 0,
    facilitator: {
      name: 'Dr. Alexander Belser',
      credentials: 'PhD, Clinical Psychology',
      avatar: 'https://i.pravatar.cc/150?img=28'
    },
    tags: ['book-club', 'history', 'LSD', 'classic'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=800'
  },

  // JULY 2026 - Summer Events
  {
    id: 49,
    title: 'Summer Webinar Series: Psychedelics and Neurodiversity',
    slug: 'neurodiversity-webinar-series',
    type: 'lecture',
    category: 'guest-lecture',
    description: '4-week webinar series exploring psychedelic therapy considerations for neurodivergent individuals (autism, ADHD, etc.).',
    fullDescription: `This 4-week webinar series examines the intersection of psychedelic therapy and neurodiversity.

Week 1: Understanding Neurodiversity
- Neurodiversity paradigm overview
- Autism spectrum
- ADHD
- Sensory processing differences
- Different cognitive styles and strengths

Week 2: Psychedelics and Autistic Individuals
- Anecdotal reports and emerging research
- Potential benefits and risks
- Sensory considerations
- Communication and social aspects
- Consent and autonomy

Week 3: ADHD and Psychedelic Therapy
- Executive function and psychedelics
- Therapeutic potential
- Safety considerations
- Medication interactions (stimulants, etc.)

Week 4: Best Practices & Future Directions
- Adapting protocols for neurodivergent clients
- Sensory accommodations
- Communication strategies
- Inclusive research design
- Community perspectives
- Future research needs

Expert panel includes neurodivergent psychedelic researchers and therapists, bringing lived experience and clinical expertise.

8 CE credits (total for series)
Recordings available to registrants`,
    date: createDate(2026, 7, 8, 18, 0),
    endDate: createDate(2026, 7, 29, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/neurodiversity-series',
    attendees: 198,
    maxCapacity: 300,
    price: 125,
    ceCredits: 8,
    ceCategories: ['APA', 'Social Work'],
    tags: ['webinar', 'neurodiversity', 'autism', 'ADHD', 'inclusion'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800'
  },

  {
    id: 50,
    title: 'Psychedelic Research in Action Conference (PRAC)',
    slug: 'prac-2026',
    type: 'conference',
    category: 'external-conference',
    description: 'Conference focused on translating psychedelic research into clinical practice, policy, and real-world applications.',
    fullDescription: `Psychedelic Research in Action Conference (PRAC) focuses on the practical implementation of psychedelic research.

Conference Focus:
With several psychedelic therapies approaching or receiving approval, this conference bridges research and real-world implementation.

Key Themes:
- Training healthcare providers at scale
- Building psychedelic therapy clinics
- Insurance and reimbursement
- Quality assurance and outcomes tracking
- Regulatory compliance
- Equity and access
- Community-based models
- Integration into healthcare systems

Programming:
- Implementation science presentations
- Clinical case studies
- Business and operations panels
- Policy and regulatory updates
- Provider training workshops
- Patient perspective panels
- Site visits to psychedelic therapy clinics

Attendees:
Healthcare administrators, clinic directors, therapists, physicians, policy makers, investors, researchers

This conference is essential for anyone involved in implementing psychedelic therapy programs.

CME and CE credits available.`,
    date: createDate(2026, 7, 17, 9, 0),
    endDate: createDate(2026, 7, 19, 17, 0),
    location: 'Chicago, IL',
    isVirtual: false,
    venue: {
      name: 'Hyatt Regency Chicago',
      address: '151 E Wacker Dr, Chicago, IL 60601',
      mapLink: 'https://maps.google.com'
    },
    attendees: 850,
    maxCapacity: 1000,
    price: 395,
    website: 'https://psychedelicresearchinaction.org',
    tags: ['conference', 'implementation', 'clinical', 'business'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },

  // AUGUST 2026
  {
    id: 51,
    title: 'Workshop: Somatic Experiencing and Psychedelic Integration',
    slug: 'somatic-integration-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Full-day workshop on using Somatic Experiencing principles and techniques in psychedelic preparation and integration.',
    fullDescription: `Learn to integrate Somatic Experiencing (SE) with psychedelic preparation and integration therapy.

Workshop Content:

Somatic Experiencing Foundations:
- The body's role in trauma and healing
- Nervous system regulation
- Tracking sensations and impulses
- Titration and pendulation
- Discharge and completion
- Building resilience and capacity

Psychedelics and the Body:
- Somatic aspects of psychedelic experiences
- Body-based preparation practices
- Tracking soma during sessions
- Physical releases and movements
- Breathing and regulation

Integration Applications:
- Somatic integration following psychedelic sessions
- Working with incomplete gestures and impulses
- Trauma release and renegotiation
- Grounding and centering practices
- Building embodied awareness
- Resources for self-regulation

Practical Skills:
- SE techniques for psychedelic preparation
- Supporting somatic experiences during sessions
- Somatic integration session protocols
- Demonstrations and practice
- Case studies

Led by SE practitioners with extensive psychedelic therapy experience.

8 CE credits (APA, Social Work, LMFT, Somatic Experiencing)`,
    date: createDate(2026, 8, 8, 9, 0),
    endDate: createDate(2026, 8, 8, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/somatic-workshop',
    attendees: 134,
    maxCapacity: 175,
    price: 225,
    ceCredits: 8,
    ceCategories: ['APA', 'Social Work', 'LMFT', 'SE'],
    instructors: [
      { name: 'Dr. Peter Levine', credentials: 'PhD, Somatic Experiencing Founder' },
      { name: 'Arielle Schwartz', credentials: 'PhD, Clinical Psychologist' }
    ],
    tags: ['workshop', 'somatic', 'trauma', 'embodiment'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
  },

  {
    id: 52,
    title: 'Book Club: "The Psychedelic Renaissance" by Ben Sessa',
    slug: 'renaissance-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Comprehensive review of modern psychedelic research through Dr. Ben Sessa\'s authoritative text.',
    fullDescription: `Explore the modern psychedelic research renaissance through Dr. Ben Sessa's comprehensive overview.

Discussion Topics:
- History of psychedelic research: rise, fall, and renaissance
- Current state of clinical research
- MDMA for PTSD
- Psilocybin for depression
- LSD microdosing
- Ayahuasca and addiction
- Mechanisms of therapeutic action
- Clinical trial design and methodology
- Regulatory challenges and pathways
- The future of psychedelic medicine
- Criticisms and controversies

Dr. Sessa is a UK psychiatrist and researcher actively involved in psychedelic clinical trials. His book provides an authoritative, scientific overview of the field.

Facilitator: Dr. Rebecca Chen, Psychiatrist

Reading: Full book (comprehensive) or Chapters 1-3, 8-10 (condensed)`,
    date: createDate(2026, 8, 20, 19, 0),
    endDate: createDate(2026, 8, 20, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-aug-26',
    attendees: 64,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Dr. Rebecca Chen',
      credentials: 'MD, Psychiatrist',
      avatar: 'https://i.pravatar.cc/150?img=29'
    },
    tags: ['book-club', 'research', 'clinical', 'overview'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
  },

  // SEPTEMBER 2026
  {
    id: 53,
    title: 'Insight Conference - Psychedelic Neuroscience Symposium',
    slug: 'insight-2026',
    type: 'conference',
    category: 'external-conference',
    description: 'Specialized conference on the neuroscience of psychedelics, featuring cutting-edge neuroimaging and molecular research.',
    fullDescription: `Insight Conference brings together neuroscientists studying the brain mechanisms of psychedelic drugs.

Conference Focus:
Deep dive into neuroscience: neuroimaging, electrophysiology, molecular mechanisms, computational modeling, and systems neuroscience.

Research Areas:
- fMRI and brain connectivity
- EEG and MEG studies
- Receptor pharmacology and signaling
- Neuroplasticity mechanisms
- Network neuroscience
- Computational psychiatry
- Brain-wide effects
- Biomarkers and predictors
- Comparative neuroscience (humans and animals)

Programming:
- 40+ research presentations
- 2 keynote addresses
- Poster session (50+ posters)
- Methodology workshops
- Collaborative discussions
- Early career researcher sessions
- Funding opportunities panel

Audience:
Neuroscientists, pharmacologists, computational researchers, neuroimaging specialists, graduate students

Highly technical and specialized conference for researchers in neuroscience and related fields.

Published abstracts and proceedings.`,
    date: createDate(2026, 9, 10, 9, 0),
    endDate: createDate(2026, 9, 12, 17, 0),
    location: 'Johns Hopkins University, Baltimore, MD',
    isVirtual: false,
    venue: {
      name: 'Johns Hopkins University',
      address: '3400 N Charles St, Baltimore, MD 21218',
      mapLink: 'https://maps.google.com'
    },
    attendees: 320,
    maxCapacity: 400,
    price: 175,
    website: 'https://insightconference.org',
    tags: ['conference', 'neuroscience', 'research', 'academic'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800'
  },

  {
    id: 54,
    title: 'Guest Lecture: Dr. Janis Phelps - Psychedelic Chaplaincy and Spiritual Care',
    slug: 'phelps-chaplaincy-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Director of CIIS psychedelic therapy training discusses the role of spiritual care and chaplaincy in psychedelic medicine.',
    fullDescription: `Dr. Janis Phelps, Director of the Center for Psychedelic Therapies and Research at CIIS, presents on spiritual care in psychedelic medicine.

Lecture Topics:
- The spiritual dimensions of psychedelic experiences
- Mystical experiences and therapeutic outcomes
- Training psychedelic chaplains and spiritual caregivers
- Interfaith perspectives on psychedelics
- Working with diverse spiritual and religious backgrounds
- Spiritual emergency and spiritual emergence
- Ethical considerations in spiritual care
- Integration of spiritual insights
- The role of chaplains in healthcare teams
- Psychedelic medicine and transpersonal psychology

Dr. Phelps has decades of experience in psychedelic research, therapy training, and spiritual care. CIIS offers one of the few accredited psychedelic therapy training programs.

This lecture bridges psychology, spirituality, and psychedelic medicine in thoughtful and nuanced ways.

Q&A session. 2 CE credits available.`,
    date: createDate(2026, 9, 26, 18, 0),
    endDate: createDate(2026, 9, 26, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/phelps-lecture',
    attendees: 276,
    maxCapacity: 400,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'Chaplaincy', 'Social Work'],
    speaker: {
      name: 'Dr. Janis Phelps',
      credentials: 'PhD, RN, Director CIIS Center for Psychedelic Therapies',
      avatar: 'https://i.pravatar.cc/150?img=30',
      bio: 'Leader in psychedelic therapy education and spiritual care, training next generation of practitioners.'
    },
    tags: ['spirituality', 'chaplaincy', 'mystical-experience', 'training'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  },

  // OCTOBER 2026
  {
    id: 55,
    title: 'Workshop: Group Psychedelic Therapy - Models and Methods',
    slug: 'group-therapy-workshop',
    type: 'workshop',
    category: 'training-workshop',
    description: '2-day training in facilitating group psychedelic therapy sessions, including preparation, dosing, and integration circles.',
    fullDescription: `Comprehensive training in group psychedelic therapy facilitation.

Workshop Overview:

Day 1: Foundations and Models
- Evidence for group vs. individual psychedelic therapy
- Group dynamics and psychedelics
- Different group models (open, closed, size)
- Co-facilitation best practices
- Screening and group composition
- Group preparation processes
- Setting intentions in groups
- Managing group energy and attention

Day 2: Practice and Integration
- Facilitating group dosing sessions
- Music and environment for groups
- Supporting individual needs within groups
- Managing challenging experiences in groups
- Group integration circles
- Sharing practices and confidentiality
- Building community and ongoing support
- Supervision and quality assurance

Special Topics:
- Couples groups
- Trauma survivor groups
- Retreat models
- Online group integration
- Cost-effectiveness of group models

Experiential Components:
- Demonstrations
- Role-playing
- Case discussions
- Practice facilitation with feedback

16 CE credits (APA, Social Work, LMFT)
Includes group therapy protocols and resources.`,
    date: createDate(2026, 10, 3, 9, 0),
    endDate: createDate(2026, 10, 4, 17, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/group-workshop',
    attendees: 97,
    maxCapacity: 125,
    price: 395,
    ceCredits: 16,
    ceCategories: ['APA', 'Social Work', 'LMFT'],
    instructors: [
      { name: 'Dr. William Richards', credentials: 'PhD, Psychologist, Johns Hopkins' },
      { name: 'Dr. Ingmar Gorman', credentials: 'PhD, Clinical Psychologist' }
    ],
    tags: ['workshop', 'group-therapy', 'facilitation', 'clinical'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800'
  },

  {
    id: 56,
    title: 'Networking: International Psychedelic Research Association Meetup',
    slug: 'ipra-meetup-oct',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Global virtual networking event bringing together international psychedelic researchers and clinicians.',
    fullDescription: `Join psychedelic professionals from around the world for this special international networking event.

Event Format:
- Welcome from GSAPS and partner organizations
- Regional updates: North America, Europe, Latin America, Asia-Pacific
- Breakout rooms by topic area
- Cross-cultural dialogue on best practices
- International collaboration opportunities
- Resource sharing
- Q&A with global leaders

Topics for Discussion:
- Research collaborations across borders
- International clinical trial coordination
- Global policy trends
- Cultural considerations in psychedelic therapy
- Traditional medicine and modern research
- Access and equity worldwide

Perfect for:
- Researchers seeking international collaborators
- Clinicians interested in global perspectives
- Students exploring international opportunities
- Anyone interested in the global psychedelic movement

Multiple time zones accommodated with repeated sessions.

Free event. Registration required.`,
    date: createDate(2026, 10, 15, 12, 0),
    endDate: createDate(2026, 10, 15, 15, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/international-networking',
    attendees: 342,
    maxCapacity: 500,
    price: 0,
    tags: ['networking', 'international', 'global', 'collaboration'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
  },

  {
    id: 57,
    title: 'Book Club: "Psychedelics and Psychotherapy" - Passie & Sessa',
    slug: 'psychedelics-psychotherapy-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Academic exploration of psychedelic therapy models, mechanisms, and clinical applications.',
    date: createDate(2026, 10, 22, 19, 0),
    endDate: createDate(2026, 10, 22, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-oct-26',
    attendees: 54,
    maxCapacity: 100,
    price: 0,
    facilitator: {
      name: 'Dr. Michael Stevens',
      credentials: 'PhD, Clinical Psychology',
      avatar: 'https://i.pravatar.cc/150?img=31'
    },
    tags: ['book-club', 'psychotherapy', 'clinical', 'theory'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
  },

  // NOVEMBER 2026
  {
    id: 58,
    title: 'Guest Lecture: Dr. Frederick Barrett - Psychedelics and Creativity',
    slug: 'barrett-creativity-lecture',
    type: 'lecture',
    category: 'guest-lecture',
    description: 'Johns Hopkins researcher Dr. Frederick Barrett presents his work on psychedelics, creativity, and divergent thinking.',
    fullDescription: `Dr. Frederick Barrett, Assistant Professor at Johns Hopkins, presents groundbreaking research on psychedelics and creativity.

Lecture Topics:
- Measuring creativity in psychedelic research
- Divergent vs. convergent thinking
- Neuroplasticity and creative cognition
- Psilocybin and creative problem-solving
- Microdosing and creativity claims
- Music perception and psychedelics
- The role of emotion in creative thinking
- Long-term creative effects
- Applications in innovation and arts
- Future research directions

Dr. Barrett is a neuroscientist and jazz musician who brings unique perspectives to studying creativity and psychedelics. His research uses sophisticated cognitive testing and neuroimaging.

This lecture explores one of the most intriguing but understudied aspects of psychedelic effects.

Q&A session. 2 CE credits available.`,
    date: createDate(2026, 11, 7, 18, 0),
    endDate: createDate(2026, 11, 7, 20, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/barrett-lecture',
    attendees: 318,
    maxCapacity: 500,
    price: 0,
    ceCredits: 2,
    ceCategories: ['APA', 'CME'],
    speaker: {
      name: 'Dr. Frederick Barrett',
      credentials: 'PhD, Assistant Professor, Johns Hopkins',
      avatar: 'https://i.pravatar.cc/150?img=32',
      bio: 'Neuroscientist researching psychedelics, creativity, music perception, and cognitive enhancement.'
    },
    tags: ['creativity', 'neuroscience', 'cognition', 'innovation'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
  },

  {
    id: 59,
    title: 'Fall Psychedelic Therapy Intensive - 5-Day Training',
    slug: 'fall-therapy-intensive',
    type: 'workshop',
    category: 'training-workshop',
    description: 'Immersive 5-day intensive training covering all aspects of psychedelic therapy from preparation through integration.',
    fullDescription: `Comprehensive 5-day intensive training for psychedelic therapists and facilitators.

Day 1: Foundations
- History and current landscape
- Pharmacology essentials
- Legal and ethical frameworks
- Evidence base and clinical trials
- Scope of practice

Day 2: Preparation
- Therapeutic relationship building
- Assessment and screening
- Medical and psychiatric considerations
- Intention-setting and expectations
- Harm reduction principles

Day 3: Facilitation
- Set and setting optimization
- Music and therapeutic space
- Therapeutic presence
- Supporting different experience types
- Crisis management
- Documentation

Day 4: Integration
- Integration theory and models
- Therapeutic modalities
- Somatic, artistic, and spiritual approaches
- Long-term support
- Measuring outcomes
- Building integration practices

Day 5: Advanced Topics & Practice
- Trauma-informed care
- Cultural humility
- Spiritual emergencies
- Couples and group therapy
- Supervised practice sessions
- Q&A and case consultations

40 CE credits (APA, CME, Social Work, LMFT)
Comprehensive training manual and resources
Certificate of completion
Access to ongoing mentorship community

Limited to 30 participants for personalized attention.`,
    date: createDate(2026, 11, 16, 9, 0),
    endDate: createDate(2026, 11, 20, 17, 0),
    location: 'Esalen Institute, Big Sur, CA',
    isVirtual: false,
    venue: {
      name: 'Esalen Institute',
      address: '55000 Highway 1, Big Sur, CA 93920',
      mapLink: 'https://maps.google.com'
    },
    attendees: 30,
    maxCapacity: 30,
    price: 2950,
    ceCredits: 40,
    ceCategories: ['APA', 'CME', 'Social Work', 'LMFT'],
    instructors: [
      { name: 'Dr. Bill Richards', credentials: 'PhD, Psychologist' },
      { name: 'Dr. Rosalind Watts', credentials: 'DClinPsy, Clinical Psychologist' },
      { name: 'Dr. Ingmar Gorman', credentials: 'PhD, Clinical Psychologist' }
    ],
    tags: ['workshop', 'intensive', 'training', 'comprehensive', 'in-person'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  },

  {
    id: 60,
    title: 'Thanksgiving Gratitude Gathering & Integration Circle',
    slug: 'thanksgiving-2026',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Annual Thanksgiving community celebration with gratitude practices, sharing circles, and festive gathering.',
    date: createDate(2026, 11, 25, 15, 0),
    endDate: createDate(2026, 11, 25, 19, 0),
    location: 'Multiple Regional Locations (check GSAPS website)',
    isVirtual: false,
    attendees: 280,
    maxCapacity: 400,
    price: 0,
    tags: ['community', 'gratitude', 'networking', 'celebration'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
  },

  // DECEMBER 2026
  {
    id: 61,
    title: 'Year-End Symposium: Psychedelic Medicine 2026 - Year in Review',
    slug: 'year-end-symposium-2026',
    type: 'symposium',
    category: 'research-symposium',
    description: 'Comprehensive review of 2026\'s major developments in psychedelic research, clinical practice, and policy.',
    fullDescription: `GSAPS annual year-end symposium reviewing the transformative year of 2026 in psychedelic medicine.

Symposium Highlights:

Major Developments of 2026:
- FDA approvals and regulatory milestones
- Groundbreaking research publications
- Clinical trial results
- Policy changes and state initiatives
- Market developments and access expansion
- Training and workforce development
- Controversies and challenges

Research Presentations:
- Top 10 research papers of the year
- Novel findings in neuroscience
- Clinical innovations
- Implementation successes and lessons learned
- International developments

Looking Ahead to 2027:
- Anticipated research results
- Regulatory predictions
- Access and equity priorities
- Research frontiers
- Field-wide goals and vision

Format:
- Morning: Review presentations
- Afternoon: Forward-looking panels
- Poster session: 2026 research highlights
- Evening: Community celebration and awards

8 CE credits available
Published proceedings and year-in-review report`,
    date: createDate(2026, 12, 5, 9, 0),
    endDate: createDate(2026, 12, 5, 18, 0),
    location: 'Hybrid: Stanford University + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/year-end-2026',
    venue: {
      name: 'Stanford University',
      address: 'Stanford, CA 94305',
      mapLink: 'https://maps.google.com'
    },
    attendees: 342,
    maxCapacity: 500,
    price: 65,
    ceCredits: 8,
    ceCategories: ['APA', 'CME', 'CNE'],
    tags: ['symposium', 'year-review', 'research', 'community'],
    registrationRequired: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
  },

  {
    id: 62,
    title: 'Book Club: "Listening to Ayahuasca" by Rachel Harris',
    slug: 'listening-ayahuasca-book-club',
    type: 'book-club',
    category: 'academic-book-club',
    description: 'Exploring Rachel Harris\'s research on North American ayahuasca users and the therapeutic potential of ceremony.',
    fullDescription: `Dr. Rachel Harris's "Listening to Ayahuasca" explores ayahuasca use in North America through interviews with hundreds of users.

Discussion Topics:
- Ayahuasca tourism and ceremonies
- Therapeutic benefits reported by users
- Spiritual and personal transformation
- The role of ceremony and ritual
- Integration challenges
- Ethical considerations
- Indigenous reciprocity
- Safety and risks
- The "call" to ayahuasca
- Gender differences in experiences
- Long-term effects and integration

Dr. Harris brings both research rigor and personal experience to this exploration of ayahuasca's healing potential.

Facilitator: Dr. Jessica Nielson, Anthropologist

Reading: Full book or selected chapters (facilitator will provide reading guide)`,
    date: createDate(2026, 12, 10, 19, 0),
    endDate: createDate(2026, 12, 10, 21, 0),
    location: 'Virtual (Zoom)',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/book-club-dec-26',
    attendees: 79,
    maxCapacity: 120,
    price: 0,
    facilitator: {
      name: 'Dr. Jessica Nielson',
      credentials: 'PhD, Anthropology',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
    tags: ['book-club', 'ayahuasca', 'ceremony', 'research'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800'
  },

  {
    id: 63,
    title: 'Winter Solstice Celebration & Community Integration Circle',
    slug: 'winter-solstice-2026',
    type: 'networking',
    category: 'meet-and-greet',
    description: 'Seasonal celebration honoring the year\'s transformations with integration practices, community connection, and renewal intentions.',
    fullDescription: `Join GSAPS community for our annual Winter Solstice celebration - a time of reflection, integration, and renewal.

Event Activities:
- Opening circle and solstice ceremony
- Year-in-review: personal reflections
- Community integration practice
- Small group sharing circles
- Creative expression: art, music, movement
- Vision-setting for 2027
- Candlelight ceremony
- Community potluck and celebration
- Closing gratitude circle

This gathering honors the darkest night of the year as a time for deep reflection and planting seeds for new growth.

Both in-person (multiple locations) and virtual options available.

All community members welcome. Suggested donation to support GSAPS programs.`,
    date: createDate(2026, 12, 21, 17, 0),
    endDate: createDate(2026, 12, 21, 21, 0),
    location: 'Hybrid: Multiple Locations + Virtual',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/winter-solstice',
    attendees: 195,
    maxCapacity: 300,
    price: 0,
    tags: ['community', 'celebration', 'integration', 'ritual'],
    registrationRequired: true,
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800'
  }
];

export default COMPREHENSIVE_EVENTS;
