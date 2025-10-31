// Integration Circles Demo Data
// 15 diverse integration circles for peer support and community

export const CIRCLE_CATEGORIES = [
  'psychedelic-integration',
  'preparation',
  'harm-reduction',
  'clinical-practitioners',
  'researchers',
  'spiritual-exploration'
];

export const EXPERIENCE_TYPES = [
  'psilocybin',
  'MDMA',
  'LSD',
  'ayahuasca',
  'ketamine',
  'DMT',
  '5-MeO-DMT',
  'mescaline',
  'general'
];

export const CIRCLE_VALUES = [
  'trauma-informed',
  'LGBTQ+ friendly',
  'BIPOC-centered',
  'women-only',
  'men-only',
  'spiritual',
  'scientific',
  'recovery-focused',
  'harm-reduction',
  'professional',
  'peer-led',
  'indigenous-honoring'
];

// Demo circles data
export const circles = [
  {
    id: 1,
    name: 'Psilocybin Integration Circle',
    description: 'A weekly peer-led circle for integrating psilocybin experiences. We create a safe, confidential space to share insights, challenges, and support each other in the integration process. All experience levels welcome.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 1,
      name: 'Dr. Sarah Chen',
      username: 'sarah_chen',
      avatar_url: 'https://i.pravatar.cc/150?img=5',
      credentials: 'PhD, Clinical Psychology',
      bio: 'Integration specialist with 8 years experience supporting psychedelic journeys.'
    },
    coFacilitators: [],
    members: [
      { id: 2, name: 'Michael Torres', avatar_url: 'https://i.pravatar.cc/150?img=12' },
      { id: 3, name: 'Emma Wilson', avatar_url: 'https://i.pravatar.cc/150?img=23' },
      { id: 4, name: 'James Park', avatar_url: 'https://i.pravatar.cc/150?img=33' },
      { id: 5, name: 'Lisa Kumar', avatar_url: 'https://i.pravatar.cc/150?img=44' },
      { id: 6, name: 'David Brown', avatar_url: 'https://i.pravatar.cc/150?img=14' },
      { id: 7, name: 'Sofia Rodriguez', avatar_url: 'https://i.pravatar.cc/150?img=27' }
    ],
    capacity: 12,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Thursday',
      time: '19:00',
      timezone: 'America/Los_Angeles',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/demo-psilocybin-circle'
    },
    topics: ['integration', 'psilocybin', 'personal-growth', 'spirituality'],
    experienceTypes: ['psilocybin'],
    values: ['trauma-informed', 'LGBTQ+ friendly', 'spiritual', 'peer-led'],
    guidelines: 'We honor confidentiality, consent, and trauma-informed practices. All sharing is voluntary. We maintain a non-judgmental space where all experiences are valid.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    createdAt: new Date('2025-09-15'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 28,
      memberCount: 7,
      avgAttendance: 6.2
    }
  },
  {
    id: 2,
    name: 'MDMA Therapy Integration',
    description: 'Support circle for individuals working with MDMA-assisted therapy. Whether you\'re in clinical trials or preparation, this circle provides peer support and integration tools. Professional facilitation with trauma-informed approach.',
    type: 'professional-facilitated',
    category: 'psychedelic-integration',
    facilitator: {
      id: 8,
      name: 'Dr. Rachel Martinez',
      username: 'rachel_martinez',
      avatar_url: 'https://i.pravatar.cc/150?img=48',
      credentials: 'LMFT, MAPS Certified',
      bio: 'MDMA-assisted therapy specialist, trained facilitator with MAPS protocol experience.'
    },
    coFacilitators: [
      {
        id: 9,
        name: 'Tom Anderson',
        avatar_url: 'https://i.pravatar.cc/150?img=15',
        credentials: 'MSW, LICSW'
      }
    ],
    members: [
      { id: 10, name: 'Jennifer Lee', avatar_url: 'https://i.pravatar.cc/150?img=25' },
      { id: 11, name: 'Marcus Johnson', avatar_url: 'https://i.pravatar.cc/150?img=13' },
      { id: 12, name: 'Amy Zhang', avatar_url: 'https://i.pravatar.cc/150?img=32' },
      { id: 13, name: 'Carlos Mendez', avatar_url: 'https://i.pravatar.cc/150?img=17' }
    ],
    capacity: 10,
    meetingSchedule: {
      frequency: 'biweekly',
      dayOfWeek: 'Tuesday',
      time: '18:30',
      timezone: 'America/New_York',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://whereby.com/mdma-integration-circle'
    },
    topics: ['MDMA', 'PTSD', 'trauma', 'clinical-therapy', 'integration'],
    experienceTypes: ['MDMA'],
    values: ['trauma-informed', 'professional', 'recovery-focused', 'harm-reduction'],
    guidelines: 'This is a trauma-informed space led by licensed professionals. We maintain strict confidentiality and ethical boundaries. Participation requires consent and commitment to circle agreements.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    createdAt: new Date('2025-08-20'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 12,
      memberCount: 5,
      avgAttendance: 4.8
    }
  },
  {
    id: 3,
    name: 'Ayahuasca Integration & Ceremony Prep',
    description: 'For those who have sat with ayahuasca or are preparing for ceremony. We honor indigenous traditions and practice cultural humility. Both integration support and preparation guidance available.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 14,
      name: 'Maria Sanchez',
      username: 'maria_sanchez',
      avatar_url: 'https://i.pravatar.cc/150?img=40',
      credentials: 'Ceremonial Facilitator',
      bio: 'Apprenticed with Shipibo tradition for 7 years. Bridging indigenous wisdom with integration support.'
    },
    coFacilitators: [],
    members: [
      { id: 15, name: 'Alex Thompson', avatar_url: 'https://i.pravatar.cc/150?img=52' },
      { id: 16, name: 'Nina Patel', avatar_url: 'https://i.pravatar.cc/150?img=45' },
      { id: 17, name: 'Robert Kim', avatar_url: 'https://i.pravatar.cc/150?img=54' },
      { id: 18, name: 'Laura Hoffmann', avatar_url: 'https://i.pravatar.cc/150?img=26' },
      { id: 19, name: 'Sam Rivera', avatar_url: 'https://i.pravatar.cc/150?img=58' },
      { id: 20, name: 'Yuki Tanaka', avatar_url: 'https://i.pravatar.cc/150?img=69' },
      { id: 21, name: 'Omar Hassan', avatar_url: 'https://i.pravatar.cc/150?img=11' },
      { id: 22, name: 'Elena Popov', avatar_url: 'https://i.pravatar.cc/150?img=24' }
    ],
    capacity: 15,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Sunday',
      time: '10:00',
      timezone: 'America/Denver',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/ayahuasca-integration'
    },
    topics: ['ayahuasca', 'plant-medicine', 'indigenous-wisdom', 'spiritual', 'preparation'],
    experienceTypes: ['ayahuasca'],
    values: ['indigenous-honoring', 'spiritual', 'trauma-informed', 'peer-led'],
    guidelines: 'We approach this work with deep respect for indigenous traditions. Cultural humility and reciprocity are central. We support ethical engagement with plant medicines.',
    image: 'https://images.unsplash.com/photo-1551006917-3b35f8c31d52?w=800',
    createdAt: new Date('2025-07-10'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 35,
      memberCount: 9,
      avgAttendance: 7.5
    }
  },
  {
    id: 4,
    name: 'Ketamine Therapy Support Group',
    description: 'For individuals working with ketamine-assisted therapy (KAP). Share experiences, integration challenges, and support each other between sessions. Open to both clinical and at-home ketamine experiences.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 23,
      name: 'Dr. James Foster',
      username: 'james_foster',
      avatar_url: 'https://i.pravatar.cc/150?img=60',
      credentials: 'PhD, Neuroscience',
      bio: 'Ketamine researcher and patient advocate. Personal experience with KAP for depression.'
    },
    coFacilitators: [],
    members: [
      { id: 24, name: 'Kelly Wright', avatar_url: 'https://i.pravatar.cc/150?img=47' },
      { id: 25, name: 'Brian Mills', avatar_url: 'https://i.pravatar.cc/150?img=56' },
      { id: 26, name: 'Hannah Cohen', avatar_url: 'https://i.pravatar.cc/150?img=38' },
      { id: 27, name: 'Tyler Scott', avatar_url: 'https://i.pravatar.cc/150?img=61' }
    ],
    capacity: 12,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Wednesday',
      time: '20:00',
      timezone: 'America/Chicago',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://meet.google.com/ketamine-support'
    },
    topics: ['ketamine', 'depression', 'integration', 'clinical-therapy'],
    experienceTypes: ['ketamine'],
    values: ['trauma-informed', 'recovery-focused', 'harm-reduction', 'scientific'],
    guidelines: 'Safe space for discussing ketamine therapy experiences. We emphasize harm reduction and evidence-based practices. Medical advice should come from healthcare providers.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    createdAt: new Date('2025-08-05'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 16,
      memberCount: 5,
      avgAttendance: 4.2
    }
  },
  {
    id: 5,
    name: 'Women\'s Psychedelic Integration',
    description: 'A women-only space for integration support. We explore themes of embodiment, healing from patriarchal trauma, and empowerment. All women, trans women, and non-binary folks welcome.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 28,
      name: 'Jessica Lin',
      username: 'jessica_lin',
      avatar_url: 'https://i.pravatar.cc/150?img=49',
      credentials: 'MA, Somatic Psychology',
      bio: 'Somatic therapist specializing in women\'s healing and psychedelic integration.'
    },
    coFacilitators: [
      {
        id: 29,
        name: 'Aisha Williams',
        avatar_url: 'https://i.pravatar.cc/150?img=43',
        credentials: 'MSW, LCSW'
      }
    ],
    members: [
      { id: 30, name: 'Rachel Green', avatar_url: 'https://i.pravatar.cc/150?img=31' },
      { id: 31, name: 'Priya Sharma', avatar_url: 'https://i.pravatar.cc/150?img=36' },
      { id: 32, name: 'Olivia Martinez', avatar_url: 'https://i.pravatar.cc/150?img=42' },
      { id: 33, name: 'Maya Johnson', avatar_url: 'https://i.pravatar.cc/150?img=28' },
      { id: 34, name: 'Carmen Lopez', avatar_url: 'https://i.pravatar.cc/150?img=41' }
    ],
    capacity: 10,
    meetingSchedule: {
      frequency: 'biweekly',
      dayOfWeek: 'Saturday',
      time: '14:00',
      timezone: 'America/Los_Angeles',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/womens-integration'
    },
    topics: ['integration', 'embodiment', 'feminism', 'trauma', 'empowerment'],
    experienceTypes: ['general', 'psilocybin', 'MDMA', 'ayahuasca'],
    values: ['women-only', 'trauma-informed', 'LGBTQ+ friendly', 'peer-led'],
    guidelines: 'This is a women-only space honoring feminine wisdom and healing. We center consent, embodiment, and sisterhood. Patriarchal dynamics are actively addressed.',
    image: 'https://images.unsplash.com/photo-1573495627945-5380020964ce?w=800',
    createdAt: new Date('2025-06-20'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 18,
      memberCount: 6,
      avgAttendance: 5.5
    }
  },
  {
    id: 6,
    name: 'BIPOC Healing Circle',
    description: 'A BIPOC-centered space for psychedelic integration that honors cultural context and addresses racial trauma. We create safety for Black, Indigenous, and People of Color to process experiences.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 35,
      name: 'Marcus Washington',
      username: 'marcus_washington',
      avatar_url: 'https://i.pravatar.cc/150?img=59',
      credentials: 'MA, Counseling Psychology',
      bio: 'Therapist focused on racial trauma healing and culturally-responsive psychedelic integration.'
    },
    coFacilitators: [],
    members: [
      { id: 36, name: 'Keisha Brown', avatar_url: 'https://i.pravatar.cc/150?img=39' },
      { id: 37, name: 'Jose Ramirez', avatar_url: 'https://i.pravatar.cc/150?img=68' },
      { id: 38, name: 'Lakisha Jones', avatar_url: 'https://i.pravatar.cc/150?img=35' },
      { id: 39, name: 'Jamal Carter', avatar_url: 'https://i.pravatar.cc/150?img=63' }
    ],
    capacity: 12,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Monday',
      time: '19:00',
      timezone: 'America/New_York',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://whereby.com/bipoc-healing-circle'
    },
    topics: ['racial-trauma', 'cultural-healing', 'integration', 'liberation'],
    experienceTypes: ['general', 'psilocybin', 'MDMA', 'ayahuasca', 'LSD'],
    values: ['BIPOC-centered', 'trauma-informed', 'peer-led', 'indigenous-honoring'],
    guidelines: 'This space centers BIPOC experiences and healing. We address racial trauma with cultural humility. White folks are asked to seek other integration spaces.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
    createdAt: new Date('2025-07-25'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 22,
      memberCount: 5,
      avgAttendance: 4.3
    }
  },
  {
    id: 7,
    name: 'First-Time Psychedelic Users Prep',
    description: 'New to psychedelics? This prep circle helps you prepare for your first experience. Learn about set and setting, safety, integration, and connect with others on the same journey.',
    type: 'peer-led',
    category: 'preparation',
    facilitator: {
      id: 40,
      name: 'Emily Roberts',
      username: 'emily_roberts',
      avatar_url: 'https://i.pravatar.cc/150?img=46',
      credentials: 'Psychedelic Educator',
      bio: 'Harm reduction educator helping people prepare for safe, intentional psychedelic experiences.'
    },
    coFacilitators: [],
    members: [
      { id: 41, name: 'Chris Davis', avatar_url: 'https://i.pravatar.cc/150?img=51' },
      { id: 42, name: 'Megan Taylor', avatar_url: 'https://i.pravatar.cc/150?img=29' },
      { id: 43, name: 'Jordan Lee', avatar_url: 'https://i.pravatar.cc/150?img=64' },
      { id: 44, name: 'Ashley Moore', avatar_url: 'https://i.pravatar.cc/150?img=37' },
      { id: 45, name: 'Ryan Clark', avatar_url: 'https://i.pravatar.cc/150?img=57' },
      { id: 46, name: 'Nicole Adams', avatar_url: 'https://i.pravatar.cc/150?img=34' }
    ],
    capacity: 15,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Friday',
      time: '18:00',
      timezone: 'America/Denver',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/first-timer-prep'
    },
    topics: ['preparation', 'safety', 'set-and-setting', 'harm-reduction', 'basics'],
    experienceTypes: ['general'],
    values: ['harm-reduction', 'trauma-informed', 'peer-led', 'scientific'],
    guidelines: 'Beginners welcome! No question is too basic. We emphasize safety, legality, and harm reduction. This is educational, not a place to source substances.',
    image: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=800',
    createdAt: new Date('2025-09-01'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 8,
      memberCount: 7,
      avgAttendance: 6.1
    }
  },
  {
    id: 8,
    name: 'Clinical Practitioners Circle',
    description: 'For licensed therapists, psychiatrists, and clinical professionals working with psychedelic-assisted therapy. Peer consultation, supervision, and professional development.',
    type: 'professional-facilitated',
    category: 'clinical-practitioners',
    facilitator: {
      id: 47,
      name: 'Dr. Robert Chen',
      username: 'robert_chen_md',
      avatar_url: 'https://i.pravatar.cc/150?img=62',
      credentials: 'MD, Psychiatrist',
      bio: 'Board-certified psychiatrist specializing in psychedelic medicine. MAPS clinical investigator.'
    },
    coFacilitators: [
      {
        id: 48,
        name: 'Dr. Linda Garcia',
        avatar_url: 'https://i.pravatar.cc/150?img=50',
        credentials: 'PhD, Clinical Psychology'
      }
    ],
    members: [
      { id: 49, name: 'Dr. Kevin Wu', avatar_url: 'https://i.pravatar.cc/150?img=66' },
      { id: 50, name: 'Dr. Amanda Price', avatar_url: 'https://i.pravatar.cc/150?img=30' }
    ],
    capacity: 8,
    meetingSchedule: {
      frequency: 'monthly',
      dayOfWeek: 'Tuesday',
      time: '12:00',
      timezone: 'America/Los_Angeles',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://whereby.com/clinical-practitioners'
    },
    topics: ['clinical-practice', 'case-consultation', 'ethics', 'professional-development'],
    experienceTypes: ['general', 'psilocybin', 'MDMA', 'ketamine'],
    values: ['professional', 'trauma-informed', 'harm-reduction', 'scientific'],
    guidelines: 'For licensed professionals only. We maintain HIPAA compliance and ethical standards. Case discussions must be anonymized. Peer consultation, not supervision.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    createdAt: new Date('2025-06-01'),
    status: 'active',
    privacy: 'private',
    stats: {
      totalMeetings: 6,
      memberCount: 4,
      avgAttendance: 3.5
    }
  },
  {
    id: 9,
    name: 'Psychedelic Researchers Network',
    description: 'For researchers conducting psychedelic studies. Share findings, discuss methodology, collaborate on projects, and support each other through the research process.',
    type: 'peer-led',
    category: 'researchers',
    facilitator: {
      id: 51,
      name: 'Dr. Jennifer Park',
      username: 'jennifer_park_phd',
      avatar_url: 'https://i.pravatar.cc/150?img=55',
      credentials: 'PhD, Neuroscience',
      bio: 'Principal investigator studying psilocybin for depression. Published 15+ papers in psychedelic science.'
    },
    coFacilitators: [],
    members: [
      { id: 52, name: 'Dr. Thomas Wright', avatar_url: 'https://i.pravatar.cc/150?img=67' },
      { id: 53, name: 'Dr. Maria Gonzalez', avatar_url: 'https://i.pravatar.cc/150?img=53' },
      { id: 54, name: 'Dr. David Kim', avatar_url: 'https://i.pravatar.cc/150?img=65' }
    ],
    capacity: 10,
    meetingSchedule: {
      frequency: 'monthly',
      dayOfWeek: 'Wednesday',
      time: '15:00',
      timezone: 'America/New_York',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/researchers-network'
    },
    topics: ['research', 'methodology', 'collaboration', 'publishing', 'grants'],
    experienceTypes: ['general'],
    values: ['scientific', 'professional', 'peer-led'],
    guidelines: 'For active researchers only. We discuss methodology, data, and collaboration. Respect intellectual property and pre-publication work. Support each other\'s success.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    createdAt: new Date('2025-05-15'),
    status: 'active',
    privacy: 'private',
    stats: {
      totalMeetings: 7,
      memberCount: 4,
      avgAttendance: 3.7
    }
  },
  {
    id: 10,
    name: 'LSD Microdosing Community',
    description: 'Support circle for those exploring LSD microdosing. Share protocols, experiences, and troubleshooting. Evidence-based and harm reduction focused.',
    type: 'peer-led',
    category: 'harm-reduction',
    facilitator: {
      id: 55,
      name: 'Alex Rivera',
      username: 'alex_rivera',
      avatar_url: 'https://i.pravatar.cc/150?img=70',
      credentials: 'Psychedelic Educator',
      bio: 'Microdosing researcher and educator. Author of "The Microdosing Guidebook".'
    },
    coFacilitators: [],
    members: [
      { id: 56, name: 'Sarah Mitchell', avatar_url: 'https://i.pravatar.cc/150?img=33' },
      { id: 57, name: 'Mike Peterson', avatar_url: 'https://i.pravatar.cc/150?img=58' },
      { id: 58, name: 'Lisa Chen', avatar_url: 'https://i.pravatar.cc/150?img=22' },
      { id: 59, name: 'Tom Baker', avatar_url: 'https://i.pravatar.cc/150?img=69' },
      { id: 60, name: 'Kate Wilson', avatar_url: 'https://i.pravatar.cc/150?img=21' }
    ],
    capacity: 20,
    meetingSchedule: {
      frequency: 'biweekly',
      dayOfWeek: 'Sunday',
      time: '17:00',
      timezone: 'America/Chicago',
      duration: 60
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://meet.google.com/microdosing-lsd'
    },
    topics: ['microdosing', 'LSD', 'protocols', 'optimization', 'harm-reduction'],
    experienceTypes: ['LSD'],
    values: ['harm-reduction', 'scientific', 'peer-led'],
    guidelines: 'Focus on harm reduction and evidence. Share what works for you, not medical advice. Respect legal status varies by location. No sourcing discussions.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
    createdAt: new Date('2025-08-10'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 14,
      memberCount: 6,
      avgAttendance: 5.1
    }
  },
  {
    id: 11,
    name: 'Spiritual Psychedelic Explorers',
    description: 'For those approaching psychedelics as a spiritual practice. We explore mystical experiences, non-duality, and consciousness. All spiritual traditions welcome.',
    type: 'peer-led',
    category: 'spiritual-exploration',
    facilitator: {
      id: 61,
      name: 'Daniel Stone',
      username: 'daniel_stone',
      avatar_url: 'https://i.pravatar.cc/150?img=71',
      credentials: 'Meditation Teacher',
      bio: 'Buddhist practitioner and psychedelic explorer. Bridging contemplative and psychedelic paths.'
    },
    coFacilitators: [],
    members: [
      { id: 62, name: 'Sophia Turner', avatar_url: 'https://i.pravatar.cc/150?img=19' },
      { id: 63, name: 'William Hayes', avatar_url: 'https://i.pravatar.cc/150?img=72' },
      { id: 64, name: 'Grace Anderson', avatar_url: 'https://i.pravatar.cc/150?img=18' },
      { id: 65, name: 'Nathan Ross', avatar_url: 'https://i.pravatar.cc/150?img=73' },
      { id: 66, name: 'Isabella King', avatar_url: 'https://i.pravatar.cc/150?img=16' },
      { id: 67, name: 'Ethan Moore', avatar_url: 'https://i.pravatar.cc/150?img=74' }
    ],
    capacity: 15,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Saturday',
      time: '09:00',
      timezone: 'America/Los_Angeles',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/spiritual-explorers'
    },
    topics: ['spirituality', 'mysticism', 'consciousness', 'meditation', 'non-duality'],
    experienceTypes: ['general', 'psilocybin', 'LSD', 'DMT', '5-MeO-DMT', 'ayahuasca'],
    values: ['spiritual', 'indigenous-honoring', 'peer-led', 'trauma-informed'],
    guidelines: 'We honor all spiritual paths. Space for mystical experiences and transcendent insights. Integrate meditation, prayer, and contemplative practices.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    createdAt: new Date('2025-06-05'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 24,
      memberCount: 7,
      avgAttendance: 6.3
    }
  },
  {
    id: 12,
    name: 'Bay Area In-Person Integration',
    description: 'In-person integration circle in San Francisco Bay Area. Meet monthly for deeper connection and embodied practices. Rotating locations in SF, Oakland, Berkeley.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 68,
      name: 'Maya Patel',
      username: 'maya_patel',
      avatar_url: 'https://i.pravatar.cc/150?img=20',
      credentials: 'Somatic Therapist',
      bio: 'Bay Area somatic therapist offering embodied integration practices.'
    },
    coFacilitators: [],
    members: [
      { id: 69, name: 'Jake Sullivan', avatar_url: 'https://i.pravatar.cc/150?img=75' },
      { id: 70, name: 'Chloe Bennett', avatar_url: 'https://i.pravatar.cc/150?img=17' }
    ],
    capacity: 12,
    meetingSchedule: {
      frequency: 'monthly',
      dayOfWeek: 'Saturday',
      time: '14:00',
      timezone: 'America/Los_Angeles',
      duration: 180
    },
    location: {
      type: 'in-person',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      virtualLink: null
    },
    topics: ['integration', 'embodiment', 'community', 'somatic'],
    experienceTypes: ['general'],
    values: ['trauma-informed', 'peer-led', 'LGBTQ+ friendly'],
    guidelines: 'In-person gathering requires RSVP and commitment. Bring water, journal, and open heart. Location shared with confirmed attendees.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    createdAt: new Date('2025-07-01'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 5,
      memberCount: 3,
      avgAttendance: 8.2
    }
  },
  {
    id: 13,
    name: 'DMT & 5-MeO-DMT Explorers',
    description: 'For those working with short-acting tryptamines. Share breakthrough experiences, integration challenges, and insights from these powerful medicines.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 71,
      name: 'Andrew Black',
      username: 'andrew_black',
      avatar_url: 'https://i.pravatar.cc/150?img=76',
      credentials: 'Psychedelic Guide',
      bio: '15+ years exploring tryptamine space. Helping others integrate profound experiences.'
    },
    coFacilitators: [],
    members: [
      { id: 72, name: 'Victoria Gray', avatar_url: 'https://i.pravatar.cc/150?img=9' },
      { id: 73, name: 'Paul White', avatar_url: 'https://i.pravatar.cc/150?img=77' },
      { id: 74, name: 'Diana Foster', avatar_url: 'https://i.pravatar.cc/150?img=8' }
    ],
    capacity: 10,
    meetingSchedule: {
      frequency: 'biweekly',
      dayOfWeek: 'Thursday',
      time: '20:00',
      timezone: 'America/Denver',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://whereby.com/dmt-explorers'
    },
    topics: ['DMT', '5-MeO-DMT', 'breakthrough', 'integration', 'mysticism'],
    experienceTypes: ['DMT', '5-MeO-DMT'],
    values: ['spiritual', 'harm-reduction', 'peer-led', 'trauma-informed'],
    guidelines: 'Respect the power of these medicines. Share from experience, not theory. Integration focus, not glorification. Harm reduction always.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    createdAt: new Date('2025-08-15'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 10,
      memberCount: 4,
      avgAttendance: 3.6
    }
  },
  {
    id: 14,
    name: 'Men\'s Integration Circle',
    description: 'Men-only space for integration work. Explore masculinity, vulnerability, and emotional healing. All men, trans men, and non-binary folks welcome.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 75,
      name: 'Marcus Reid',
      username: 'marcus_reid',
      avatar_url: 'https://i.pravatar.cc/150?img=78',
      credentials: 'Men\'s Work Facilitator',
      bio: 'Men\'s work facilitator helping men integrate psychedelics and do emotional healing.'
    },
    coFacilitators: [],
    members: [
      { id: 76, name: 'James Cooper', avatar_url: 'https://i.pravatar.cc/150?img=79' },
      { id: 77, name: 'Tyler Morgan', avatar_url: 'https://i.pravatar.cc/150?img=80' },
      { id: 78, name: 'Brandon Hayes', avatar_url: 'https://i.pravatar.cc/150?img=81' },
      { id: 79, name: 'Kevin Ross', avatar_url: 'https://i.pravatar.cc/150?img=82' }
    ],
    capacity: 12,
    meetingSchedule: {
      frequency: 'weekly',
      dayOfWeek: 'Monday',
      time: '19:30',
      timezone: 'America/New_York',
      duration: 120
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://zoom.us/j/mens-integration'
    },
    topics: ['integration', 'masculinity', 'vulnerability', 'emotional-healing'],
    experienceTypes: ['general'],
    values: ['men-only', 'trauma-informed', 'LGBTQ+ friendly', 'peer-led'],
    guidelines: 'Men-only space for vulnerability and authentic connection. We challenge toxic masculinity and support emotional depth. All gender expressions of manhood welcome.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    createdAt: new Date('2025-07-20'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 20,
      memberCount: 5,
      avgAttendance: 4.4
    }
  },
  {
    id: 15,
    name: 'Parent & Caregiver Integration',
    description: 'For parents and caregivers integrating psychedelic experiences while navigating family responsibilities. Balance transformation with daily life.',
    type: 'peer-led',
    category: 'psychedelic-integration',
    facilitator: {
      id: 80,
      name: 'Jennifer Walsh',
      username: 'jennifer_walsh',
      avatar_url: 'https://i.pravatar.cc/150?img=10',
      credentials: 'Parent & Integration Coach',
      bio: 'Parent of 3 and psychedelic integration coach. Helping parents navigate transformation.'
    },
    coFacilitators: [],
    members: [
      { id: 81, name: 'Michelle Carter', avatar_url: 'https://i.pravatar.cc/150?img=7' },
      { id: 82, name: 'Robert Turner', avatar_url: 'https://i.pravatar.cc/150?img=83' },
      { id: 83, name: 'Angela Martin', avatar_url: 'https://i.pravatar.cc/150?img=6' }
    ],
    capacity: 15,
    meetingSchedule: {
      frequency: 'biweekly',
      dayOfWeek: 'Sunday',
      time: '20:00',
      timezone: 'America/Chicago',
      duration: 90
    },
    location: {
      type: 'virtual',
      city: null,
      state: null,
      country: 'Global',
      virtualLink: 'https://meet.google.com/parent-integration'
    },
    topics: ['integration', 'parenting', 'family', 'balance', 'transformation'],
    experienceTypes: ['general'],
    values: ['trauma-informed', 'peer-led', 'harm-reduction'],
    guidelines: 'Safe space for parents navigating psychedelic integration and family life. We discuss balancing transformation with parenting responsibilities. Non-judgmental support.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    createdAt: new Date('2025-08-25'),
    status: 'active',
    privacy: 'public',
    stats: {
      totalMeetings: 8,
      memberCount: 4,
      avgAttendance: 3.8
    }
  }
];

// Helper function to get circles by category
export const getCirclesByCategory = (category) => {
  return circles.filter(circle => circle.category === category);
};

// Helper function to get circles by experience type
export const getCirclesByExperience = (experienceType) => {
  return circles.filter(circle =>
    circle.experienceTypes.includes(experienceType) ||
    circle.experienceTypes.includes('general')
  );
};

// Helper function to get virtual circles
export const getVirtualCircles = () => {
  return circles.filter(circle =>
    circle.location.type === 'virtual' || circle.location.type === 'hybrid'
  );
};

// Helper function to get circles user can join
export const getJoinableCircles = (userId) => {
  return circles.filter(circle => {
    const isMember = circle.members.some(member => member.id === userId);
    const isFacilitator = circle.facilitator.id === userId;
    const hasSpace = circle.members.length < circle.capacity;
    const isActive = circle.status === 'active';
    const isPublic = circle.privacy === 'public';

    return !isMember && !isFacilitator && hasSpace && isActive && isPublic;
  });
};
