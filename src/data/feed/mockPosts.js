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
      verified: true
    },
    content:
      'Excited to share our latest findings on psilocybin and neuroplasticity! The results from our 6-month study show remarkable improvements in neural connectivity. Full paper coming soon. 🧠✨',
    images: [],
    offsetMs: 2 * 60 * 60 * 1000,
    reactions: generateMockReactions(156, false),
    currentUserReaction: null,
    comments: 23,
    shares: 12,
    isBookmarked: false,
    tags: ['research', 'psilocybin', 'neuroscience']
  },
  {
    id: 2,
    author: {
      id: 9,
      name: 'Dr. Priya Sharma',
      username: 'priya_psychiatrist',
      avatar: 'https://i.pravatar.cc/150?img=20',
      credentials: 'MD, Psychiatry',
      verified: true
    },
    content:
      'Just wrapped up an incredible session with a patient showing complete remission from depression after psilocybin therapy. These moments remind me why this work matters. 💜',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'],
    offsetMs: 3 * 60 * 60 * 1000,
    reactions: generateMockReactions(289, false),
    currentUserReaction: null,
    comments: 48,
    shares: 34,
    isBookmarked: true,
    tags: ['clinical', 'psilocybin', 'success']
  },
  {
    id: 3,
    author: {
      id: 2,
      name: 'Prof. Robert Williams',
      username: 'bob_neuroscience',
      avatar: 'https://i.pravatar.cc/150?img=12',
      credentials: 'Professor, MIT'
    },
    content:
      'Anyone attending the Psychedelic Science Symposium next month? Would love to connect and discuss collaboration opportunities!',
    images: [],
    offsetMs: 5 * 60 * 60 * 1000,
    reactions: generateMockReactions(89, true, 'celebrate'),
    currentUserReaction: 'celebrate',
    comments: 34,
    shares: 5,
    isBookmarked: false,
    tags: ['conference', 'networking']
  },
  {
    id: 4,
    author: {
      id: 17,
      name: 'Dr. Jessica Turner',
      username: 'jessica_clinical',
      avatar: 'https://i.pravatar.cc/150?img=47',
      credentials: 'PsyD',
      verified: true
    },
    content:
      '🎉 Just completed the MAPS MDMA Therapy Training Program! Feeling grateful to join this incredible community of therapists. Looking forward to bringing this work to more people who need it.',
    images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop'],
    offsetMs: 8 * 60 * 60 * 1000,
    reactions: generateMockReactions(412, false),
    currentUserReaction: null,
    comments: 76,
    shares: 89,
    isBookmarked: false,
    tags: ['training', 'mdma', 'maps', 'milestone']
  },
  {
    id: 5,
    author: {
      id: 12,
      name: 'Dr. Miguel Alvarez',
      username: 'miguel_neuro',
      avatar: 'https://i.pravatar.cc/150?img=33',
      credentials: 'PhD, Neuropharmacology'
    },
    content:
      'Our lab just published a new paper on the role of serotonin receptors in psychedelic experiences. Sharing the preprint link for anyone interested in the molecular mechanisms!',
    images: [],
    offsetMs: 24 * 60 * 60 * 1000,
    reactions: generateMockReactions(134, false),
    currentUserReaction: null,
    comments: 19,
    shares: 27,
    isBookmarked: true,
    tags: ['research', 'serotonin', 'paper']
  },
  {
    id: 6,
    author: {
      id: 21,
      name: 'GSAPS Community',
      username: 'gsaps_official',
      avatar: 'https://i.pravatar.cc/150?img=9',
      credentials: 'Official Account',
      verified: true
    },
    content:
      "📢 Reminder: Applications for the 2024 Clinical Research Fellowship close this Friday! Don't miss the chance to work with leading psychedelic researchers across the globe.",
    images: [],
    offsetMs: 26 * 60 * 60 * 1000,
    reactions: generateMockReactions(245, false),
    currentUserReaction: null,
    comments: 54,
    shares: 71,
    isBookmarked: false,
    tags: ['announcement', 'fellowship', 'opportunity']
  },
  {
    id: 7,
    author: {
      id: 8,
      name: 'Dr. Amina Hassan',
      username: 'amina_psych',
      avatar: 'https://i.pravatar.cc/150?img=31',
      credentials: 'MD, Psychotherapy'
    },
    content:
      'Sharing a case study on integrating psilocybin therapy with cognitive behavioral approaches. The combined outcomes are fascinating and promising for treatment-resistant cases.',
    images: ['https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=800&h=600&fit=crop'],
    offsetMs: 32 * 60 * 60 * 1000,
    reactions: generateMockReactions(178, false),
    currentUserReaction: null,
    comments: 41,
    shares: 22,
    isBookmarked: false,
    tags: ['case-study', 'therapy', 'integration']
  },
  {
    id: 8,
    author: {
      id: 14,
      name: 'Dr. Omar Singh',
      username: 'omar_research',
      avatar: 'https://i.pravatar.cc/150?img=18',
      credentials: 'PhD, Pharmacology'
    },
    content:
      'New funding opportunity alert! The Psychedelic Research Fund just announced grants for community-based research projects. Sharing the application details inside.',
    images: [],
    offsetMs: 40 * 60 * 60 * 1000,
    reactions: generateMockReactions(92, false),
    currentUserReaction: null,
    comments: 11,
    shares: 18,
    isBookmarked: false,
    tags: ['funding', 'community', 'grant']
  },
  {
    id: 9,
    author: {
      id: 15,
      name: 'Dr. Emma Laurent',
      username: 'emma_psychedelics',
      avatar: 'https://i.pravatar.cc/150?img=24',
      credentials: 'PhD, Clinical Psychology'
    },
    content:
      "Hosting a webinar next week on ethical considerations in psychedelic therapy practice. Drop your questions below—we'll address them live!",
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop'],
    offsetMs: 48 * 60 * 60 * 1000,
    reactions: generateMockReactions(310, false),
    currentUserReaction: null,
    comments: 112,
    shares: 64,
    isBookmarked: true,
    tags: ['webinar', 'ethics', 'therapy']
  },
  {
    id: 10,
    author: {
      id: 4,
      name: 'Research Lab Alpha',
      username: 'lab_alpha',
      avatar: 'https://i.pravatar.cc/150?img=15',
      credentials: 'Academic Lab'
    },
    content:
      "We're hiring! Looking for a post-doc with experience in psychedelic pharmacology and neuroimaging. Remote collaboration possible. DM for details or apply via our careers page.",
    images: [],
    offsetMs: 72 * 60 * 60 * 1000,
    reactions: generateMockReactions(67, false),
    currentUserReaction: null,
    comments: 15,
    shares: 9,
    isBookmarked: false,
    tags: ['hiring', 'research', 'careers']
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
