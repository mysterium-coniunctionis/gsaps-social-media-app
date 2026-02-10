// Virtual Spaces Mock Data
// 3D immersive environments for symposia, networking, and learning

export const virtualSpaces = [
  {
    id: 'symposium-hall',
    name: 'Symposium Hall',
    type: 'symposium',
    description: 'Grand auditorium with stage, seating for 200, and giant presentation screen. Perfect for lectures and conferences.',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    capacity: 200,
    currentOccupancy: 0,
    features: [
      'Stage with podium',
      'Tiered seating',
      'Giant screen (15m)',
      'Spatial audio',
      'Q&A system',
      'Recording available'
    ],
    environment: {
      skybox: 'sunset',
      lighting: 'auditorium',
      ambientSound: 'ambient-hall',
      fogDensity: 0.01
    },
    objects: [
      { type: 'stage', position: [0, 0, -20], scale: [15, 1, 8] },
      { type: 'screen', position: [0, 5, -20], scale: [15, 8, 0.1] },
      { type: 'seating', rows: 10, seatsPerRow: 20, startPosition: [0, 0, 0] },
      { type: 'podium', position: [0, 1, -18], scale: [1, 1.5, 1] }
    ],
    spawnPoint: [0, 0, 15],
    navigationPoints: [
      { name: 'Front Row', position: [0, 0, 8] },
      { name: 'Middle Section', position: [0, 0, 15] },
      { name: 'Back Row', position: [0, 0, 22] },
      { name: 'Stage', position: [0, 0, -18] }
    ],
    tags: ['education', 'lectures', 'conferences', 'large-group']
  },
  {
    id: 'networking-lounge',
    name: 'Networking Lounge',
    type: 'networking',
    description: 'Casual open space with conversation pods, ambient music, and comfortable seating. Great for socializing and informal discussions.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    capacity: 50,
    currentOccupancy: 0,
    features: [
      'Conversation pods',
      'Ambient lighting',
      'Background music',
      'Private zones',
      'Refreshment area',
      'Business card exchange'
    ],
    environment: {
      skybox: 'evening',
      lighting: 'warm-ambient',
      ambientSound: 'lounge-jazz',
      fogDensity: 0.005
    },
    objects: [
      { type: 'pod', position: [-10, 0, -5], scale: [4, 3, 4], seats: 6 },
      { type: 'pod', position: [10, 0, -5], scale: [4, 3, 4], seats: 6 },
      { type: 'pod', position: [-10, 0, 10], scale: [4, 3, 4], seats: 6 },
      { type: 'pod', position: [10, 0, 10], scale: [4, 3, 4], seats: 6 },
      { type: 'bar', position: [0, 0, -15], scale: [8, 2.5, 2] },
      { type: 'plant', position: [-15, 0, 0], scale: [1, 3, 1] },
      { type: 'plant', position: [15, 0, 0], scale: [1, 3, 1] }
    ],
    spawnPoint: [0, 0, 20],
    navigationPoints: [
      { name: 'Pod 1 (NW)', position: [-10, 0, -5] },
      { name: 'Pod 2 (NE)', position: [10, 0, -5] },
      { name: 'Pod 3 (SW)', position: [-10, 0, 10] },
      { name: 'Pod 4 (SE)', position: [10, 0, 10] },
      { name: 'Refreshment Bar', position: [0, 0, -15] }
    ],
    tags: ['networking', 'casual', 'small-groups', 'social']
  },
  {
    id: 'study-pod',
    name: 'Study Pod',
    type: 'study',
    description: 'Intimate private room with shared screen, whiteboard, and cozy seating. Ideal for small group study and collaboration.',
    thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    capacity: 8,
    currentOccupancy: 0,
    features: [
      'Shared screen',
      'Interactive whiteboard',
      'Document sharing',
      'Voice chat',
      'Screen recording',
      'Private access control'
    ],
    environment: {
      skybox: 'indoor',
      lighting: 'study-bright',
      ambientSound: 'white-noise',
      fogDensity: 0
    },
    objects: [
      { type: 'table', position: [0, 0, 0], scale: [6, 0.8, 3] },
      { type: 'chair', position: [-2, 0, 2], rotation: [0, 0, 0] },
      { type: 'chair', position: [2, 0, 2], rotation: [0, 0, 0] },
      { type: 'chair', position: [-2, 0, -2], rotation: [0, Math.PI, 0] },
      { type: 'chair', position: [2, 0, -2], rotation: [0, Math.PI, 0] },
      { type: 'screen', position: [0, 2, -4], scale: [5, 3, 0.1] },
      { type: 'whiteboard', position: [-4.5, 2, 0], scale: [0.1, 2, 3], rotation: [0, Math.PI / 2, 0] },
      { type: 'bookshelf', position: [4.5, 1, 0], scale: [0.5, 2.5, 3] }
    ],
    spawnPoint: [0, 0, 5],
    navigationPoints: [
      { name: 'Table', position: [0, 0, 0] },
      { name: 'Screen', position: [0, 0, -3] },
      { name: 'Whiteboard', position: [-3.5, 0, 0] }
    ],
    tags: ['study', 'collaboration', 'private', 'small-group']
  },
  {
    id: 'art-gallery',
    name: 'Art Gallery',
    type: 'gallery',
    description: 'Modern exhibition space for research posters, presentations, and visual displays. Walk-through experience with interactive exhibits.',
    thumbnail: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    capacity: 100,
    currentOccupancy: 0,
    features: [
      'Exhibition walls',
      'Research posters',
      'Interactive displays',
      'Spotlight lighting',
      'Audio descriptions',
      'Creator credits'
    ],
    environment: {
      skybox: 'gallery',
      lighting: 'gallery-spots',
      ambientSound: 'ambient-soft',
      fogDensity: 0.002
    },
    objects: [
      // North wall - Research posters
      { type: 'poster', position: [0, 2, -15], scale: [2, 3, 0.1], content: 'poster-1' },
      { type: 'poster', position: [-5, 2, -15], scale: [2, 3, 0.1], content: 'poster-2' },
      { type: 'poster', position: [5, 2, -15], scale: [2, 3, 0.1], content: 'poster-3' },
      // East wall
      { type: 'poster', position: [15, 2, -5], scale: [2, 3, 0.1], content: 'poster-4', rotation: [0, -Math.PI / 2, 0] },
      { type: 'poster', position: [15, 2, 0], scale: [2, 3, 0.1], content: 'poster-5', rotation: [0, -Math.PI / 2, 0] },
      { type: 'poster', position: [15, 2, 5], scale: [2, 3, 0.1], content: 'poster-6', rotation: [0, -Math.PI / 2, 0] },
      // West wall
      { type: 'poster', position: [-15, 2, -5], scale: [2, 3, 0.1], content: 'poster-7', rotation: [0, Math.PI / 2, 0] },
      { type: 'poster', position: [-15, 2, 0], scale: [2, 3, 0.1], content: 'poster-8', rotation: [0, Math.PI / 2, 0] },
      { type: 'poster', position: [-15, 2, 5], scale: [2, 3, 0.1], content: 'poster-9', rotation: [0, Math.PI / 2, 0] },
      // Center displays
      { type: 'pedestal', position: [0, 0, 0], scale: [2, 1.5, 2] },
      { type: 'screen', position: [0, 3, 0], scale: [3, 2, 0.1] }
    ],
    spawnPoint: [0, 0, 18],
    navigationPoints: [
      { name: 'Entrance', position: [0, 0, 18] },
      { name: 'North Wall', position: [0, 0, -12] },
      { name: 'East Wall', position: [12, 0, 0] },
      { name: 'West Wall', position: [-12, 0, 0] },
      { name: 'Center Display', position: [0, 0, 0] }
    ],
    tags: ['exhibition', 'research', 'posters', 'visual']
  }
];

// Scheduled events in virtual spaces
export const scheduledEvents = [
  {
    id: 'evt-001',
    spaceId: 'symposium-hall',
    title: 'Psychedelic Neuroscience Symposium',
    presenter: 'Dr. Rachel Thompson',
    startTime: new Date('2026-01-15T14:00:00'),
    endTime: new Date('2026-01-15T16:00:00'),
    description: 'Latest research on neural mechanisms of psychedelic compounds.',
    attendees: 45,
    capacity: 200,
    recordingAvailable: true,
    tags: ['neuroscience', 'research', 'lecture'],
    materials: [
      { type: 'slides', url: '/materials/neuro-symp-slides.pdf' },
      { type: 'paper', url: '/papers/neuro-mechanisms-2026.pdf' }
    ]
  },
  {
    id: 'evt-002',
    spaceId: 'networking-lounge',
    title: 'New Member Mixer',
    host: 'GSAPS Community Team',
    startTime: new Date('2026-01-12T18:00:00'),
    endTime: new Date('2026-01-12T20:00:00'),
    description: 'Meet fellow members, discuss interests, and build connections.',
    attendees: 28,
    capacity: 50,
    tags: ['networking', 'social', 'community'],
    icebreakers: [
      'What drew you to psychedelic science?',
      'What research topic excites you most?',
      'What are you currently studying?'
    ]
  },
  {
    id: 'evt-003',
    spaceId: 'study-pod',
    title: 'MDMA Therapy Study Group',
    organizer: 'Sarah Martinez',
    startTime: new Date('2026-01-14T10:00:00'),
    endTime: new Date('2026-01-14T12:00:00'),
    description: 'Group study session on recent MDMA-assisted therapy trials.',
    attendees: 6,
    capacity: 8,
    tags: ['study', 'MDMA', 'therapy', 'small-group'],
    requiredReading: [
      'Mitchell et al. (2025) - MDMA for PTSD',
      'Jerome et al. (2024) - Phase 3 Results'
    ]
  },
  {
    id: 'evt-004',
    spaceId: 'art-gallery',
    title: 'Graduate Research Poster Session',
    organizer: 'GSAPS Academic Committee',
    startTime: new Date('2026-01-20T13:00:00'),
    endTime: new Date('2026-01-20T17:00:00'),
    description: 'Virtual poster session featuring graduate student research.',
    attendees: 67,
    capacity: 100,
    tags: ['posters', 'research', 'graduate', 'exhibition'],
    posters: [
      { id: 'poster-1', title: 'Psilocybin and Depression', author: 'Emma Wilson' },
      { id: 'poster-2', title: 'DMT and Consciousness', author: 'James Lee' },
      { id: 'poster-3', title: 'LSD Microdosing Study', author: 'Maria Garcia' }
    ]
  }
];

// Space configuration presets
export const spacePresets = {
  symposium: {
    lighting: {
      ambient: 0.4,
      directional: 0.8,
      spotlights: true
    },
    effects: {
      bloom: true,
      ambientOcclusion: true,
      shadows: true
    },
    audio: {
      spatialAudio: true,
      maxDistance: 50,
      rolloffFactor: 1.5,
      echoCancellation: true
    }
  },
  networking: {
    lighting: {
      ambient: 0.6,
      directional: 0.5,
      spotlights: false
    },
    effects: {
      bloom: true,
      ambientOcclusion: false,
      shadows: true
    },
    audio: {
      spatialAudio: true,
      maxDistance: 15,
      rolloffFactor: 2,
      echoCancellation: true
    }
  },
  study: {
    lighting: {
      ambient: 0.7,
      directional: 0.6,
      spotlights: false
    },
    effects: {
      bloom: false,
      ambientOcclusion: true,
      shadows: false
    },
    audio: {
      spatialAudio: true,
      maxDistance: 10,
      rolloffFactor: 3,
      echoCancellation: true
    }
  },
  gallery: {
    lighting: {
      ambient: 0.3,
      directional: 0.4,
      spotlights: true
    },
    effects: {
      bloom: true,
      ambientOcclusion: true,
      shadows: true
    },
    audio: {
      spatialAudio: true,
      maxDistance: 25,
      rolloffFactor: 1.2,
      echoCancellation: true
    }
  }
};

// Avatar customization options
export const avatarCustomization = {
  bodyStyles: [
    { id: 'default', name: 'Standard', geometry: 'capsule' },
    { id: 'stylized', name: 'Stylized', geometry: 'humanoid' },
    { id: 'abstract', name: 'Abstract', geometry: 'sphere' }
  ],
  colors: [
    { id: 'blue', name: 'Ocean Blue', hex: '#2196F3' },
    { id: 'purple', name: 'Royal Purple', hex: '#9C27B0' },
    { id: 'green', name: 'Forest Green', hex: '#4CAF50' },
    { id: 'orange', name: 'Sunset Orange', hex: '#FF9800' },
    { id: 'pink', name: 'Rose Pink', hex: '#E91E63' },
    { id: 'teal', name: 'Teal', hex: '#009688' }
  ],
  presenceStates: [
    { id: 'available', name: 'Available', color: '#4CAF50' },
    { id: 'busy', name: 'Busy', color: '#F44336' },
    { id: 'away', name: 'Away', color: '#FFC107' },
    { id: 'presenting', name: 'Presenting', color: '#2196F3' }
  ]
};

// Performance settings
export const performanceProfiles = {
  high: {
    maxAvatars: 100,
    shadowQuality: 'high',
    particleEffects: true,
    postProcessing: true,
    textureResolution: 2048,
    antialiasing: true,
    lodDistance: [10, 30, 60]
  },
  medium: {
    maxAvatars: 50,
    shadowQuality: 'medium',
    particleEffects: true,
    postProcessing: true,
    textureResolution: 1024,
    antialiasing: true,
    lodDistance: [8, 20, 40]
  },
  low: {
    maxAvatars: 25,
    shadowQuality: 'low',
    particleEffects: false,
    postProcessing: false,
    textureResolution: 512,
    antialiasing: false,
    lodDistance: [5, 15, 30]
  }
};

const virtualSpacesData = {
  virtualSpaces,
  scheduledEvents,
  spacePresets,
  avatarCustomization,
  performanceProfiles
};

export default virtualSpacesData;
