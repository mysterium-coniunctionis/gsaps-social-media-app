// Mock data for Voice Rooms feature
// Provides sample rooms, speakers, and schedules for development

export const mockSpeakers = [
  {
    id: 'speaker-1',
    username: 'dr_psyche',
    displayName: 'Dr. Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'host',
    isMuted: false,
    isSpeaking: false,
    bio: 'Clinical psychologist specializing in psychedelic-assisted therapy'
  },
  {
    id: 'speaker-2',
    username: 'neuroscience_mike',
    displayName: 'Michael Torres',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'moderator',
    isMuted: false,
    isSpeaking: false,
    bio: 'Neuroscience researcher exploring consciousness'
  },
  {
    id: 'speaker-3',
    username: 'integration_coach',
    displayName: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'speaker',
    isMuted: false,
    isSpeaking: false,
    bio: 'Integration coach and facilitator'
  },
  {
    id: 'speaker-4',
    username: 'mindful_researcher',
    displayName: 'Dr. James Lee',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'speaker',
    isMuted: false,
    isSpeaking: false,
    bio: 'MAPS researcher studying MDMA therapy'
  },
  {
    id: 'speaker-5',
    username: 'plant_medicine_guide',
    displayName: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'speaker',
    isMuted: true,
    isSpeaking: false,
    bio: 'Traditional plant medicine practitioner'
  }
];

export const mockListeners = [
  {
    id: 'listener-1',
    username: 'curious_explorer',
    displayName: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    handRaised: true,
    joinedAt: new Date(Date.now() - 300000)
  },
  {
    id: 'listener-2',
    username: 'seeker_jane',
    displayName: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=10',
    handRaised: false,
    joinedAt: new Date(Date.now() - 600000)
  },
  {
    id: 'listener-3',
    username: 'wisdom_seeker',
    displayName: 'Robert Chen',
    avatar: 'https://i.pravatar.cc/150?img=14',
    handRaised: true,
    joinedAt: new Date(Date.now() - 120000)
  },
  {
    id: 'listener-4',
    username: 'healing_heart',
    displayName: 'Sophie Martin',
    avatar: 'https://i.pravatar.cc/150?img=16',
    handRaised: false,
    joinedAt: new Date(Date.now() - 900000)
  }
];

export const mockTranscript = [
  {
    id: 'transcript-1',
    speakerId: 'speaker-1',
    speakerName: 'Dr. Sarah Chen',
    text: 'Welcome everyone to our discussion on integration practices. Today we\'ll be exploring how to maintain insights from psychedelic experiences in daily life.',
    timestamp: new Date(Date.now() - 600000),
    isHighlight: true
  },
  {
    id: 'transcript-2',
    speakerId: 'speaker-2',
    speakerName: 'Michael Torres',
    text: 'From a neuroscience perspective, the neuroplasticity window that opens during these experiences is fascinating. It typically lasts about 2-4 weeks post-experience.',
    timestamp: new Date(Date.now() - 480000),
    isHighlight: false
  },
  {
    id: 'transcript-3',
    speakerId: 'speaker-3',
    speakerName: 'Emma Wilson',
    text: 'That\'s exactly why consistent integration practices are so crucial. Journaling, meditation, and therapy can help solidify those neural pathways.',
    timestamp: new Date(Date.now() - 360000),
    isHighlight: true
  },
  {
    id: 'transcript-4',
    speakerId: 'speaker-1',
    speakerName: 'Dr. Sarah Chen',
    text: 'I always recommend my clients establish a daily practice, even if it\'s just 10 minutes. Consistency is key.',
    timestamp: new Date(Date.now() - 240000),
    isHighlight: false
  },
  {
    id: 'transcript-5',
    speakerId: 'speaker-4',
    speakerName: 'Dr. James Lee',
    text: 'In our clinical trials, we\'ve seen that participants who engage in structured integration sessions show significantly better long-term outcomes.',
    timestamp: new Date(Date.now() - 120000),
    isHighlight: true
  }
];

export const mockChatMessages = [
  {
    id: 'chat-1',
    userId: 'listener-1',
    username: 'curious_explorer',
    message: 'Thank you for this discussion! Very insightful',
    timestamp: new Date(Date.now() - 300000),
    reactions: [{ type: 'heart', count: 3 }]
  },
  {
    id: 'chat-2',
    userId: 'listener-2',
    username: 'seeker_jane',
    message: 'Can you share resources on journaling techniques?',
    timestamp: new Date(Date.now() - 180000),
    reactions: [{ type: 'thumbs_up', count: 5 }]
  },
  {
    id: 'chat-3',
    userId: 'speaker-3',
    username: 'integration_coach',
    message: '@seeker_jane I\'ll drop a link in the chat after this session',
    timestamp: new Date(Date.now() - 120000),
    reactions: [{ type: 'fire', count: 2 }]
  },
  {
    id: 'chat-4',
    userId: 'listener-3',
    username: 'wisdom_seeker',
    message: 'This is exactly what I needed to hear today',
    timestamp: new Date(Date.now() - 60000),
    reactions: [{ type: 'heart', count: 1 }]
  }
];

export const mockVoiceRooms = [
  {
    id: 'room-1',
    title: 'Integration Practices: Making It Last',
    description: 'Exploring effective integration techniques for maintaining insights from psychedelic experiences. Join clinical experts and practitioners for a deep dive.',
    category: 'Integration',
    status: 'live',
    startedAt: new Date(Date.now() - 3600000),
    scheduledFor: null,
    duration: 3600,
    speakers: [mockSpeakers[0], mockSpeakers[1], mockSpeakers[2]],
    listeners: mockListeners,
    listenerCount: 247,
    maxListeners: 500,
    isRecording: true,
    allowHandRaise: true,
    isPrivate: false,
    tags: ['integration', 'therapy', 'clinical'],
    host: mockSpeakers[0],
    language: 'en'
  },
  {
    id: 'room-2',
    title: 'Neuroscience of Mystical Experiences',
    description: 'What happens in the brain during mystical or transcendent experiences? A conversation with leading neuroscientists.',
    category: 'Science',
    status: 'live',
    startedAt: new Date(Date.now() - 1800000),
    scheduledFor: null,
    duration: 5400,
    speakers: [mockSpeakers[3], mockSpeakers[1]],
    listeners: mockListeners.slice(0, 2),
    listenerCount: 189,
    maxListeners: 300,
    isRecording: true,
    allowHandRaise: true,
    isPrivate: false,
    tags: ['neuroscience', 'research', 'consciousness'],
    host: mockSpeakers[3],
    language: 'en'
  },
  {
    id: 'room-3',
    title: 'Beginner Q&A: Safe Use & Harm Reduction',
    description: 'New to psychedelics? Ask your questions in a judgment-free space. Experienced guides and educators here to help.',
    category: 'Education',
    status: 'live',
    startedAt: new Date(Date.now() - 900000),
    scheduledFor: null,
    duration: 3600,
    speakers: [mockSpeakers[2], mockSpeakers[4]],
    listeners: mockListeners.slice(1, 3),
    listenerCount: 312,
    maxListeners: 500,
    isRecording: false,
    allowHandRaise: true,
    isPrivate: false,
    tags: ['beginners', 'harm-reduction', 'safety'],
    host: mockSpeakers[2],
    language: 'en'
  },
  {
    id: 'room-4',
    title: 'Indigenous Wisdom & Plant Medicine',
    description: 'Learning from traditional practices and indigenous perspectives on plant medicine. A respectful dialogue on cultural context.',
    category: 'Culture',
    status: 'scheduled',
    startedAt: null,
    scheduledFor: new Date(Date.now() + 7200000),
    duration: 5400,
    speakers: [mockSpeakers[4]],
    listeners: [],
    listenerCount: 0,
    maxListeners: 200,
    isRecording: true,
    allowHandRaise: false,
    isPrivate: false,
    tags: ['indigenous', 'culture', 'plant-medicine'],
    host: mockSpeakers[4],
    language: 'en'
  },
  {
    id: 'room-5',
    title: 'MDMA Therapy Clinical Trial Results',
    description: 'MAPS researchers share latest findings from Phase 3 clinical trials. Q&A session following presentation.',
    category: 'Research',
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 86400000),
    startedAt: null,
    duration: 7200,
    speakers: [mockSpeakers[3], mockSpeakers[0]],
    listeners: [],
    listenerCount: 0,
    maxListeners: 1000,
    isRecording: true,
    allowHandRaise: true,
    isPrivate: false,
    tags: ['MDMA', 'research', 'clinical-trials', 'MAPS'],
    host: mockSpeakers[3],
    language: 'en'
  },
  {
    id: 'room-6',
    title: 'Meditation & Microdosing: A Synergistic Approach',
    description: 'Exploring how meditation practices can enhance and complement microdosing protocols.',
    category: 'Practice',
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 172800000),
    startedAt: null,
    duration: 3600,
    speakers: [mockSpeakers[2], mockSpeakers[1]],
    listeners: [],
    listenerCount: 0,
    maxListeners: 300,
    isRecording: true,
    allowHandRaise: true,
    isPrivate: false,
    tags: ['microdosing', 'meditation', 'mindfulness'],
    host: mockSpeakers[2],
    language: 'en'
  }
];

export const roomCategories = [
  { id: 'all', label: 'All Rooms', icon: 'grid_view' },
  { id: 'integration', label: 'Integration', icon: 'psychology' },
  { id: 'science', label: 'Science', icon: 'science' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'culture', label: 'Culture', icon: 'public' },
  { id: 'research', label: 'Research', icon: 'biotech' },
  { id: 'practice', label: 'Practice', icon: 'self_improvement' }
];

export const reactionTypes = [
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'clap', emoji: '👏', label: 'Applause' },
  { type: 'hundred', emoji: '💯', label: '100' },
  { type: 'heart', emoji: '❤️', label: 'Love' },
  { type: 'mindblown', emoji: '🤯', label: 'Mind Blown' },
  { type: 'raised_hands', emoji: '🙌', label: 'Raised Hands' }
];

const voiceRoomsData = {
  mockSpeakers,
  mockListeners,
  mockTranscript,
  mockChatMessages,
  mockVoiceRooms,
  roomCategories,
  reactionTypes
};

export default voiceRoomsData;
