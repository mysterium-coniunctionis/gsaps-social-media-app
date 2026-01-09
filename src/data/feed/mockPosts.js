const REACTION_TYPES = ['like', 'love', 'laugh', 'wow', 'celebrate', 'think'];

const MOCK_USERS = [
  { id: 101, name: 'Sarah Chen', username: 'sarah_chen', avatar_url: 'https://i.pravatar.cc/150?img=1' },
  { id: 102, name: 'Marcus Johnson', username: 'marcus_j', avatar_url: 'https://i.pravatar.cc/150?img=2' },
  { id: 103, name: 'Emily Rodriguez', username: 'emily_r', avatar_url: 'https://i.pravatar.cc/150?img=3' },
  { id: 104, name: 'David Park', username: 'david_park', avatar_url: 'https://i.pravatar.cc/150?img=4' },
  { id: 105, name: 'Lisa Wang', username: 'lisa_wang', avatar_url: 'https://i.pravatar.cc/150?img=5' },
  { id: 106, name: 'James Kim', username: 'james_kim', avatar_url: 'https://i.pravatar.cc/150?img=6' }
];

const getCrypto = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto;
  }

  return null;
};

const createRandomId = (cryptoImpl) =>
  Array.from(cryptoImpl.getRandomValues(new Uint8Array(16)))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');

const createFallbackId = () =>
  Array.from({ length: 32 })
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

const createTokenSafeId = () => {
  const cryptoImpl = getCrypto();
  if (cryptoImpl) {
    return createRandomId(cryptoImpl);
  }
  return createFallbackId();
};

const generateMockReactions = (count, includeCurrentUser = false, currentUserType = null) => {
  const reactions = [];

  if (includeCurrentUser && currentUserType) {
    reactions.push({
      id: createTokenSafeId(),
      type: currentUserType,
      user: { id: 'current-user', name: 'You', username: 'you', avatar_url: '' }
    });
  }

  for (let i = 0; i < count - (includeCurrentUser ? 1 : 0); i += 1) {
    reactions.push({
      id: createTokenSafeId(),
      type: REACTION_TYPES[Math.floor(Math.random() * REACTION_TYPES.length)],
      user: MOCK_USERS[i % MOCK_USERS.length]
    });
  }

  return reactions;
};

const createBasePosts = () => [
  {
    id: 1,
    author: {
      id: 1,
      name: 'Dr. Alice Johnson',
      username: 'alice_researcher',
      avatar: 'https://i.pravatar.cc/150?img=1',
      credentials: 'PhD, Neuroscience',
      verified: true,
      reputation: 95
    },
    content:
      'Excited to share our latest findings on psilocybin and neuroplasticity! The results from our 6-month study show remarkable improvements in neural connectivity. Full paper coming soon. 🧠✨',
    images: [],
    offsetMs: 2 * 60 * 60 * 1000,
    reactions: generateMockReactions(156, false),
    currentUserReaction: null,
    comments: 23,
    shares: 12,
    saves: 45,
    views: 1240,
    isBookmarked: false,
    tags: ['research', 'psilocybin', 'neuroscience'],
    contentType: 'post'
  },
  {
    id: 2,
    author: {
      id: 9,
      name: 'Dr. Priya Sharma',
      username: 'priya_psychiatrist',
      avatar: 'https://i.pravatar.cc/150?img=20',
      credentials: 'MD, Psychiatry',
      verified: true,
      reputation: 88
    },
    content:
      'Just wrapped up an incredible session with a patient showing complete remission from depression after psilocybin therapy. These moments remind me why this work matters. 💜',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'],
    offsetMs: 3 * 60 * 60 * 1000,
    reactions: generateMockReactions(289, false),
    currentUserReaction: null,
    comments: 48,
    shares: 34,
    saves: 78,
    views: 2100,
    isBookmarked: true,
    tags: ['clinical', 'psilocybin', 'success'],
    contentType: 'post'
  },
  {
    id: 3,
    author: {
      id: 2,
      name: 'Prof. Robert Williams',
      username: 'bob_neuroscience',
      avatar: 'https://i.pravatar.cc/150?img=12',
      credentials: 'Professor, MIT',
      reputation: 92
    },
    content:
      'Anyone attending the Psychedelic Science Symposium next month? Would love to connect and discuss collaboration opportunities!',
    images: [],
    offsetMs: 5 * 60 * 60 * 1000,
    reactions: generateMockReactions(89, true, 'celebrate'),
    currentUserReaction: 'celebrate',
    comments: 34,
    shares: 5,
    saves: 12,
    views: 650,
    isBookmarked: false,
    tags: ['conference', 'networking'],
    contentType: 'event'
  },
  {
    id: 4,
    author: {
      id: 17,
      name: 'Dr. Jessica Turner',
      username: 'jessica_clinical',
      avatar: 'https://i.pravatar.cc/150?img=47',
      credentials: 'PsyD',
      verified: true,
      reputation: 85
    },
    content:
      '🎉 Just completed the MAPS MDMA Therapy Training Program! Feeling grateful to join this incredible community of therapists. Looking forward to bringing this work to more people who need it.',
    images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop'],
    offsetMs: 8 * 60 * 60 * 1000,
    reactions: generateMockReactions(412, false),
    currentUserReaction: null,
    comments: 76,
    shares: 89,
    saves: 124,
    views: 3200,
    isBookmarked: false,
    tags: ['training', 'mdma', 'maps', 'milestone'],
    contentType: 'post'
  },
  {
    id: 5,
    author: {
      id: 12,
      name: 'Dr. Miguel Alvarez',
      username: 'miguel_neuro',
      avatar: 'https://i.pravatar.cc/150?img=33',
      credentials: 'PhD, Neuropharmacology',
      reputation: 90
    },
    content:
      'Our lab just published a new paper on the role of serotonin receptors in psychedelic experiences. Sharing the preprint link for anyone interested in the molecular mechanisms!',
    images: [],
    offsetMs: 24 * 60 * 60 * 1000,
    reactions: generateMockReactions(134, false),
    currentUserReaction: null,
    comments: 19,
    shares: 27,
    saves: 56,
    views: 980,
    isBookmarked: true,
    tags: ['research', 'serotonin', 'paper'],
    contentType: 'paper'
  },
  {
    id: 6,
    author: {
      id: 21,
      name: 'GSAPS Community',
      username: 'gsaps_official',
      avatar: 'https://i.pravatar.cc/150?img=9',
      credentials: 'Official Account',
      verified: true,
      reputation: 100
    },
    content:
      "📢 Reminder: Applications for the 2024 Clinical Research Fellowship close this Friday! Don't miss the chance to work with leading psychedelic researchers across the globe.",
    images: [],
    offsetMs: 26 * 60 * 60 * 1000,
    reactions: generateMockReactions(245, false),
    currentUserReaction: null,
    comments: 54,
    shares: 71,
    saves: 89,
    views: 1850,
    isBookmarked: false,
    tags: ['announcement', 'fellowship', 'opportunity'],
    contentType: 'post'
  },
  {
    id: 7,
    author: {
      id: 8,
      name: 'Dr. Amina Hassan',
      username: 'amina_psych',
      avatar: 'https://i.pravatar.cc/150?img=31',
      credentials: 'MD, Psychotherapy',
      reputation: 87
    },
    content:
      'Sharing a case study on integrating psilocybin therapy with cognitive behavioral approaches. The combined outcomes are fascinating and promising for treatment-resistant cases.',
    images: ['https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=800&h=600&fit=crop'],
    offsetMs: 32 * 60 * 60 * 1000,
    reactions: generateMockReactions(178, false),
    currentUserReaction: null,
    comments: 41,
    shares: 22,
    saves: 67,
    views: 1320,
    isBookmarked: false,
    tags: ['case-study', 'therapy', 'integration'],
    contentType: 'post'
  },
  {
    id: 8,
    author: {
      id: 14,
      name: 'Dr. Omar Singh',
      username: 'omar_research',
      avatar: 'https://i.pravatar.cc/150?img=18',
      credentials: 'PhD, Pharmacology',
      reputation: 82
    },
    content:
      'New funding opportunity alert! The Psychedelic Research Fund just announced grants for community-based research projects. Sharing the application details inside.',
    images: [],
    offsetMs: 40 * 60 * 60 * 1000,
    reactions: generateMockReactions(92, false),
    currentUserReaction: null,
    comments: 11,
    shares: 18,
    saves: 34,
    views: 780,
    isBookmarked: false,
    tags: ['funding', 'community', 'grant'],
    contentType: 'post'
  },
  {
    id: 9,
    author: {
      id: 15,
      name: 'Dr. Emma Laurent',
      username: 'emma_psychedelics',
      avatar: 'https://i.pravatar.cc/150?img=24',
      credentials: 'PhD, Clinical Psychology',
      reputation: 91
    },
    content:
      "Hosting a webinar next week on ethical considerations in psychedelic therapy practice. Drop your questions below—we'll address them live!",
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop'],
    offsetMs: 48 * 60 * 60 * 1000,
    reactions: generateMockReactions(310, false),
    currentUserReaction: null,
    comments: 112,
    shares: 64,
    saves: 156,
    views: 2850,
    isBookmarked: true,
    tags: ['webinar', 'ethics', 'therapy'],
    contentType: 'event'
  },
  {
    id: 10,
    author: {
      id: 4,
      name: 'Research Lab Alpha',
      username: 'lab_alpha',
      avatar: 'https://i.pravatar.cc/150?img=15',
      credentials: 'Academic Lab',
      reputation: 78
    },
    content:
      "We're hiring! Looking for a post-doc with experience in psychedelic pharmacology and neuroimaging. Remote collaboration possible. DM for details or apply via our careers page.",
    images: [],
    offsetMs: 72 * 60 * 60 * 1000,
    reactions: generateMockReactions(67, false),
    currentUserReaction: null,
    comments: 15,
    shares: 9,
    saves: 23,
    views: 520,
    isBookmarked: false,
    tags: ['hiring', 'research', 'careers'],
    contentType: 'post'
  },
  {
    id: 11,
    author: {
      id: 25,
      name: 'Dr. Kenji Tanaka',
      username: 'kenji_neuroimaging',
      avatar: 'https://i.pravatar.cc/150?img=25',
      credentials: 'PhD, Neuroimaging',
      verified: true,
      reputation: 93
    },
    content:
      'Breakthrough in fMRI research! Our team identified specific neural signatures during DMT experiences that correlate with ego dissolution. This could revolutionize how we understand consciousness. Paper link in comments.',
    images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'],
    offsetMs: 1 * 60 * 60 * 1000,
    reactions: generateMockReactions(523, false),
    currentUserReaction: null,
    comments: 134,
    shares: 156,
    saves: 234,
    views: 5600,
    isBookmarked: false,
    tags: ['research', 'dmt', 'neuroscience', 'consciousness'],
    contentType: 'paper'
  },
  {
    id: 12,
    author: {
      id: 28,
      name: 'Dr. Sofia Martinez',
      username: 'sofia_indigenous',
      avatar: 'https://i.pravatar.cc/150?img=28',
      credentials: 'Anthropologist',
      verified: true,
      reputation: 89
    },
    content:
      'Important discussion on reciprocity and respect in psychedelic research. We must honor indigenous knowledge keepers who have safeguarded these medicines for millennia. Thread on ethical engagement with traditional communities 🧵',
    images: [],
    offsetMs: 4 * 60 * 60 * 1000,
    reactions: generateMockReactions(267, false),
    currentUserReaction: null,
    comments: 89,
    shares: 112,
    saves: 98,
    views: 2340,
    isBookmarked: false,
    tags: ['ethics', 'indigenous', 'reciprocity', 'culture'],
    contentType: 'post'
  },
  {
    id: 13,
    author: {
      id: 30,
      name: 'Clinical Trials Network',
      username: 'ctn_psychedelics',
      avatar: 'https://i.pravatar.cc/150?img=30',
      credentials: 'Research Organization',
      verified: true,
      reputation: 96
    },
    content:
      '📊 Phase 3 trial results just released: Psilocybin shows 67% response rate for treatment-resistant depression vs 32% placebo. Effect sustained at 12-month follow-up. This is the data we\'ve been waiting for!',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop'],
    offsetMs: 6 * 60 * 60 * 1000,
    reactions: generateMockReactions(789, false),
    currentUserReaction: null,
    comments: 201,
    shares: 298,
    saves: 412,
    views: 8900,
    isBookmarked: true,
    tags: ['research', 'clinical-trial', 'psilocybin', 'depression'],
    contentType: 'paper'
  },
  {
    id: 14,
    author: {
      id: 32,
      name: 'Dr. Layla Osman',
      username: 'layla_integration',
      avatar: 'https://i.pravatar.cc/150?img=32',
      credentials: 'Integration Therapist',
      reputation: 84
    },
    content:
      'The journey doesn\'t end when the session does. Integration is where the real transformation happens. Sharing my top 5 integration practices that help clients embody their insights and create lasting change.',
    images: [],
    offsetMs: 12 * 60 * 60 * 1000,
    reactions: generateMockReactions(198, false),
    currentUserReaction: null,
    comments: 56,
    shares: 67,
    saves: 145,
    views: 1560,
    isBookmarked: false,
    tags: ['integration', 'therapy', 'practice'],
    contentType: 'post'
  },
  {
    id: 15,
    author: {
      id: 35,
      name: 'Prof. Dimitri Volkov',
      username: 'dimitri_philosophy',
      avatar: 'https://i.pravatar.cc/150?img=35',
      credentials: 'Professor, Philosophy of Mind',
      verified: true,
      reputation: 91
    },
    content:
      'New course launching next month: "Consciousness, Psychedelics, and the Hard Problem" - exploring philosophical implications of psychedelic phenomenology. Open to researchers and practitioners. Early bird discount ends Friday!',
    images: ['https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop'],
    offsetMs: 18 * 60 * 60 * 1000,
    reactions: generateMockReactions(156, false),
    currentUserReaction: null,
    comments: 43,
    shares: 52,
    saves: 89,
    views: 1240,
    isBookmarked: false,
    tags: ['course', 'philosophy', 'consciousness', 'education'],
    contentType: 'course'
  },
  {
    id: 16,
    author: {
      id: 38,
      name: 'Dr. Aisha Patel',
      username: 'aisha_safety',
      avatar: 'https://i.pravatar.cc/150?img=38',
      credentials: 'MD, Risk Management',
      verified: true,
      reputation: 94
    },
    content:
      '⚠️ Critical safety update: New contraindication guidelines for psychedelic therapy with certain SSRIs. Please review if you\'re a practitioner. Patient safety must always come first. Full medical advisory attached.',
    images: [],
    offsetMs: 20 * 60 * 60 * 1000,
    reactions: generateMockReactions(334, false),
    currentUserReaction: null,
    comments: 78,
    shares: 189,
    saves: 267,
    views: 3450,
    isBookmarked: true,
    tags: ['safety', 'clinical', 'guidelines', 'medical'],
    contentType: 'post'
  },
  {
    id: 17,
    author: {
      id: 40,
      name: 'Mycology Society',
      username: 'mushroom_science',
      avatar: 'https://i.pravatar.cc/150?img=40',
      credentials: 'Research Community',
      verified: true,
      reputation: 86
    },
    content:
      '🍄 Fascinating microscopy images showing psilocybin crystal formation in cubensis fruiting bodies. The beauty of nature and chemistry combined! High-resolution images available for research purposes.',
    images: ['https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&h=600&fit=crop'],
    offsetMs: 28 * 60 * 60 * 1000,
    reactions: generateMockReactions(445, false),
    currentUserReaction: null,
    comments: 92,
    shares: 78,
    saves: 156,
    views: 4200,
    isBookmarked: false,
    tags: ['mycology', 'science', 'psilocybin', 'research'],
    contentType: 'post'
  },
  {
    id: 18,
    author: {
      id: 42,
      name: 'Dr. Marcus Chen',
      username: 'marcus_ptsd',
      avatar: 'https://i.pravatar.cc/150?img=42',
      credentials: 'PTSD Specialist',
      verified: true,
      reputation: 88
    },
    content:
      'Veteran PTSD treatment results are incredibly promising. Seeing combat veterans find peace after decades of suffering. MDMA-assisted therapy is providing hope where conventional treatments fell short. We need FDA approval now.',
    images: [],
    offsetMs: 36 * 60 * 60 * 1000,
    reactions: generateMockReactions(512, false),
    currentUserReaction: null,
    comments: 145,
    shares: 201,
    saves: 178,
    views: 5100,
    isBookmarked: false,
    tags: ['ptsd', 'mdma', 'veterans', 'clinical'],
    contentType: 'post'
  },
  {
    id: 19,
    author: {
      id: 45,
      name: 'Dr. Yuki Nakamura',
      username: 'yuki_music',
      avatar: 'https://i.pravatar.cc/150?img=45',
      credentials: 'Music Therapist',
      reputation: 82
    },
    content:
      '🎵 New research on music selection in psychedelic therapy. We analyzed 200+ sessions and found specific musical elements that enhance therapeutic outcomes. Sharing our curated playlist protocol - journal article in comments.',
    images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop'],
    offsetMs: 44 * 60 * 60 * 1000,
    reactions: generateMockReactions(223, false),
    currentUserReaction: null,
    comments: 67,
    shares: 89,
    saves: 234,
    views: 2100,
    isBookmarked: false,
    tags: ['music', 'therapy', 'research', 'protocol'],
    contentType: 'paper'
  },
  {
    id: 20,
    author: {
      id: 48,
      name: 'Policy Reform Alliance',
      username: 'pra_advocacy',
      avatar: 'https://i.pravatar.cc/150?img=48',
      credentials: 'Advocacy Group',
      verified: true,
      reputation: 87
    },
    content:
      '🗳️ Oregon\'s Measure 109 implementation update: First licensed service centers opening next month! This is history in the making. Sign up for our webinar on navigating the new legal landscape for practitioners.',
    images: [],
    offsetMs: 50 * 60 * 60 * 1000,
    reactions: generateMockReactions(389, false),
    currentUserReaction: null,
    comments: 156,
    shares: 234,
    saves: 198,
    views: 4560,
    isBookmarked: false,
    tags: ['policy', 'oregon', 'legalization', 'advocacy'],
    contentType: 'event'
  },
  {
    id: 21,
    author: {
      id: 50,
      name: 'Dr. Elena Rossi',
      username: 'elena_neuropharm',
      avatar: 'https://i.pravatar.cc/150?img=50',
      credentials: 'PhD, Neuropharmacology',
      verified: true,
      reputation: 90
    },
    content:
      'Comparative pharmacokinetics of different psilocybin formulations. Our lab tested absorption rates, bioavailability, and subjective effects. Surprising findings on optimal dosing strategies. Pre-print available now!',
    images: [],
    offsetMs: 60 * 60 * 60 * 1000,
    reactions: generateMockReactions(167, false),
    currentUserReaction: null,
    comments: 45,
    shares: 56,
    saves: 112,
    views: 1340,
    isBookmarked: false,
    tags: ['pharmacology', 'psilocybin', 'research', 'dosing'],
    contentType: 'paper'
  }
];

const withTimestamps = (posts) => {
  const now = Date.now();
  return posts.map(({ offsetMs, ...post }) => ({
    ...post,
    timestamp: new Date(now - offsetMs)
  }));
};

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateMockFeedPosts = () => withTimestamps(createBasePosts());

export const fetchMockPosts = async (filter = 'all') => {
  await delay();
  const posts = generateMockFeedPosts();

  if (filter === 'trending') {
    return [...posts].sort(
      (a, b) => b.reactions.length + b.comments + b.shares - (a.reactions.length + a.comments + a.shares)
    );
  }

  if (filter === 'following') {
    const followedUsernames = new Set(['alice_researcher', 'priya_psychiatrist', 'gsaps_official']);
    return posts.filter((post) => followedUsernames.has(post.author.username));
  }

  return posts;
};

export default fetchMockPosts;
