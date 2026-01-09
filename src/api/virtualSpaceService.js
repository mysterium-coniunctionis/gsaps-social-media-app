// Virtual Space Service API
// Handles all API calls for virtual 3D spaces

import { virtualSpaces, scheduledEvents } from '../data/virtualSpacesData';

// Simulated network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state for simulation
let spaceState = {
  activeUsers: {},
  avatarPositions: {},
  interactions: [],
  broadcasts: []
};

/**
 * Get all available virtual spaces
 */
export const getAllSpaces = async () => {
  await delay(300);
  return {
    success: true,
    data: virtualSpaces.map(space => ({
      ...space,
      currentOccupancy: Object.keys(spaceState.activeUsers[space.id] || {}).length
    }))
  };
};

/**
 * Get a specific virtual space by ID
 */
export const getSpaceById = async (spaceId) => {
  await delay(200);
  const space = virtualSpaces.find(s => s.id === spaceId);

  if (!space) {
    return {
      success: false,
      error: 'Space not found'
    };
  }

  return {
    success: true,
    data: {
      ...space,
      currentOccupancy: Object.keys(spaceState.activeUsers[spaceId] || {}).length,
      activeUsers: Object.values(spaceState.activeUsers[spaceId] || {})
    }
  };
};

/**
 * Get scheduled events for a space
 */
export const getSpaceEvents = async (spaceId) => {
  await delay(200);
  const events = scheduledEvents.filter(evt => evt.spaceId === spaceId);

  return {
    success: true,
    data: events.sort((a, b) => a.startTime - b.startTime)
  };
};

/**
 * Get upcoming events across all spaces
 */
export const getUpcomingEvents = async () => {
  await delay(250);
  const now = new Date();
  const upcoming = scheduledEvents.filter(evt => evt.startTime > now);

  return {
    success: true,
    data: upcoming.sort((a, b) => a.startTime - b.startTime)
  };
};

/**
 * Join a virtual space
 */
export const joinSpace = async (spaceId, userId, userData) => {
  await delay(400);

  const space = virtualSpaces.find(s => s.id === spaceId);
  if (!space) {
    return {
      success: false,
      error: 'Space not found'
    };
  }

  // Initialize space users if not exists
  if (!spaceState.activeUsers[spaceId]) {
    spaceState.activeUsers[spaceId] = {};
  }

  // Check capacity
  const currentOccupancy = Object.keys(spaceState.activeUsers[spaceId]).length;
  if (currentOccupancy >= space.capacity) {
    return {
      success: false,
      error: 'Space is at full capacity'
    };
  }

  // Add user to space
  const userInSpace = {
    userId,
    name: userData.name || 'Anonymous',
    avatar: userData.avatar || { style: 'default', color: '#2196F3' },
    position: space.spawnPoint,
    rotation: [0, 0, 0],
    presenceState: 'available',
    joinedAt: new Date(),
    isSpeaking: false
  };

  spaceState.activeUsers[spaceId][userId] = userInSpace;
  spaceState.avatarPositions[`${spaceId}-${userId}`] = {
    position: space.spawnPoint,
    rotation: [0, 0, 0]
  };

  return {
    success: true,
    data: {
      space: {
        ...space,
        currentOccupancy: Object.keys(spaceState.activeUsers[spaceId]).length
      },
      userSession: userInSpace,
      activeUsers: Object.values(spaceState.activeUsers[spaceId])
    }
  };
};

/**
 * Leave a virtual space
 */
export const leaveSpace = async (spaceId, userId) => {
  await delay(200);

  if (spaceState.activeUsers[spaceId]) {
    delete spaceState.activeUsers[spaceId][userId];
  }

  delete spaceState.avatarPositions[`${spaceId}-${userId}`];

  return {
    success: true,
    data: {
      message: 'Left space successfully'
    }
  };
};

/**
 * Get current state of a space (users, interactions)
 */
export const getSpaceState = async (spaceId) => {
  await delay(150);

  return {
    success: true,
    data: {
      activeUsers: Object.values(spaceState.activeUsers[spaceId] || {}),
      interactions: spaceState.interactions.filter(i => i.spaceId === spaceId),
      broadcasts: spaceState.broadcasts.filter(b => b.spaceId === spaceId)
    }
  };
};

/**
 * Update avatar position in space
 */
export const updateAvatarPosition = async (spaceId, userId, position, rotation) => {
  // No delay for real-time updates

  const key = `${spaceId}-${userId}`;
  spaceState.avatarPositions[key] = { position, rotation };

  if (spaceState.activeUsers[spaceId] && spaceState.activeUsers[spaceId][userId]) {
    spaceState.activeUsers[spaceId][userId].position = position;
    spaceState.activeUsers[spaceId][userId].rotation = rotation;
  }

  return {
    success: true,
    data: {
      position,
      rotation
    }
  };
};

/**
 * Get avatar positions for all users in space
 */
export const getAvatarPositions = async (spaceId) => {
  // No delay for real-time updates

  const positions = {};
  Object.keys(spaceState.activeUsers[spaceId] || {}).forEach(userId => {
    const key = `${spaceId}-${userId}`;
    if (spaceState.avatarPositions[key]) {
      positions[userId] = spaceState.avatarPositions[key];
    }
  });

  return {
    success: true,
    data: positions
  };
};

/**
 * Update user presence state (available, busy, away, presenting)
 */
export const updatePresenceState = async (spaceId, userId, presenceState) => {
  await delay(100);

  if (spaceState.activeUsers[spaceId] && spaceState.activeUsers[spaceId][userId]) {
    spaceState.activeUsers[spaceId][userId].presenceState = presenceState;
  }

  return {
    success: true,
    data: { presenceState }
  };
};

/**
 * Update speaking indicator
 */
export const updateSpeakingState = async (spaceId, userId, isSpeaking) => {
  // No delay for real-time updates

  if (spaceState.activeUsers[spaceId] && spaceState.activeUsers[spaceId][userId]) {
    spaceState.activeUsers[spaceId][userId].isSpeaking = isSpeaking;
  }

  return {
    success: true,
    data: { isSpeaking }
  };
};

/**
 * Broadcast an interaction (button press, object interaction, etc.)
 */
export const broadcastInteraction = async (spaceId, userId, interaction) => {
  // No delay for real-time updates

  const interactionData = {
    id: Date.now().toString(),
    spaceId,
    userId,
    type: interaction.type,
    target: interaction.target,
    data: interaction.data,
    timestamp: new Date()
  };

  spaceState.interactions.push(interactionData);

  // Keep only last 100 interactions
  if (spaceState.interactions.length > 100) {
    spaceState.interactions = spaceState.interactions.slice(-100);
  }

  return {
    success: true,
    data: interactionData
  };
};

/**
 * Send a broadcast message in space
 */
export const sendBroadcast = async (spaceId, userId, message) => {
  await delay(100);

  const broadcast = {
    id: Date.now().toString(),
    spaceId,
    userId,
    message,
    timestamp: new Date()
  };

  spaceState.broadcasts.push(broadcast);

  // Keep only last 50 broadcasts per space
  const spaceBroadcasts = spaceState.broadcasts.filter(b => b.spaceId === spaceId);
  if (spaceBroadcasts.length > 50) {
    spaceState.broadcasts = spaceState.broadcasts.filter(
      b => b.spaceId !== spaceId || spaceBroadcasts.indexOf(b) >= spaceBroadcasts.length - 50
    );
  }

  return {
    success: true,
    data: broadcast
  };
};

/**
 * Teleport to a navigation point
 */
export const teleportToPoint = async (spaceId, userId, pointName) => {
  await delay(200);

  const space = virtualSpaces.find(s => s.id === spaceId);
  if (!space) {
    return {
      success: false,
      error: 'Space not found'
    };
  }

  const navPoint = space.navigationPoints.find(p => p.name === pointName);
  if (!navPoint) {
    return {
      success: false,
      error: 'Navigation point not found'
    };
  }

  // Update position
  await updateAvatarPosition(spaceId, userId, navPoint.position, [0, 0, 0]);

  return {
    success: true,
    data: {
      position: navPoint.position,
      pointName
    }
  };
};

/**
 * Initialize WebRTC for voice chat (mock)
 */
export const initializeVoiceChat = async (spaceId, userId) => {
  await delay(500);

  // In a real implementation, this would:
  // 1. Create WebRTC peer connections
  // 2. Set up media streams
  // 3. Configure spatial audio
  // 4. Return connection info

  return {
    success: true,
    data: {
      voiceEnabled: true,
      spatialAudioEnabled: true,
      peerId: `peer-${userId}-${Date.now()}`
    }
  };
};

/**
 * Update screen content (for presentations, videos)
 */
export const updateScreenContent = async (spaceId, screenId, content) => {
  await delay(200);

  const screenUpdate = {
    spaceId,
    screenId,
    content,
    timestamp: new Date()
  };

  // Broadcast to all users in space
  await sendBroadcast(spaceId, 'system', {
    type: 'screen-update',
    data: screenUpdate
  });

  return {
    success: true,
    data: screenUpdate
  };
};

/**
 * Search spaces by criteria
 */
export const searchSpaces = async (query) => {
  await delay(300);

  const lowerQuery = query.toLowerCase();
  const results = virtualSpaces.filter(space =>
    space.name.toLowerCase().includes(lowerQuery) ||
    space.description.toLowerCase().includes(lowerQuery) ||
    space.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );

  return {
    success: true,
    data: results
  };
};

/**
 * Get space analytics (for administrators)
 */
export const getSpaceAnalytics = async (spaceId, timeRange = '7d') => {
  await delay(400);

  // Mock analytics data
  const analytics = {
    spaceId,
    timeRange,
    metrics: {
      totalVisits: Math.floor(Math.random() * 500) + 100,
      uniqueVisitors: Math.floor(Math.random() * 300) + 50,
      averageDuration: Math.floor(Math.random() * 30) + 15, // minutes
      peakOccupancy: Math.floor(Math.random() * 100) + 20,
      popularTimes: [
        { hour: 14, count: 45 },
        { hour: 15, count: 67 },
        { hour: 16, count: 52 },
        { hour: 17, count: 38 }
      ]
    },
    topEvents: scheduledEvents.filter(e => e.spaceId === spaceId).slice(0, 3)
  };

  return {
    success: true,
    data: analytics
  };
};

// Export all functions
export default {
  getAllSpaces,
  getSpaceById,
  getSpaceEvents,
  getUpcomingEvents,
  joinSpace,
  leaveSpace,
  getSpaceState,
  updateAvatarPosition,
  getAvatarPositions,
  updatePresenceState,
  updateSpeakingState,
  broadcastInteraction,
  sendBroadcast,
  teleportToPoint,
  initializeVoiceChat,
  updateScreenContent,
  searchSpaces,
  getSpaceAnalytics
};
