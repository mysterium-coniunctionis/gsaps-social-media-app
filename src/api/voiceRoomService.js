// Voice Room Service - Mock API for Voice Rooms feature
// Simulates backend operations for voice room functionality

import {
  mockVoiceRooms,
  mockTranscript,
  mockChatMessages
} from '../data/voiceRoomsData';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state for demo purposes
let rooms = [...mockVoiceRooms];
let currentUserStatus = {
  roomId: null,
  role: 'listener',
  isMuted: true,
  handRaised: false
};

/**
 * Get all active and scheduled voice rooms
 * @param {Object} filters - Optional filters (category, status)
 * @returns {Promise<Array>} Array of voice rooms
 */
export const getVoiceRooms = async (filters = {}) => {
  await delay(300);

  let filteredRooms = [...rooms];

  if (filters.category && filters.category !== 'all') {
    filteredRooms = filteredRooms.filter(
      room => room.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.status) {
    filteredRooms = filteredRooms.filter(room => room.status === filters.status);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredRooms = filteredRooms.filter(
      room =>
        room.title.toLowerCase().includes(searchTerm) ||
        room.description.toLowerCase().includes(searchTerm) ||
        room.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  return filteredRooms.sort((a, b) => {
    // Live rooms first, then scheduled by date
    if (a.status === 'live' && b.status !== 'live') return -1;
    if (a.status !== 'live' && b.status === 'live') return 1;

    if (a.status === 'scheduled' && b.status === 'scheduled') {
      return new Date(a.scheduledFor) - new Date(b.scheduledFor);
    }

    return b.listenerCount - a.listenerCount;
  });
};

/**
 * Get details for a specific voice room
 * @param {string} roomId - Room identifier
 * @returns {Promise<Object>} Room details with speakers, listeners, transcript
 */
export const getVoiceRoom = async (roomId) => {
  await delay(400);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  return {
    ...room,
    speakers: room.speakers,
    listeners: room.listeners,
    transcript: room.status === 'live' ? mockTranscript : [],
    chatMessages: room.status === 'live' ? mockChatMessages : []
  };
};

/**
 * Create a new voice room
 * @param {Object} roomData - Room configuration
 * @returns {Promise<Object>} Created room
 */
export const createVoiceRoom = async (roomData) => {
  await delay(600);

  const newRoom = {
    id: `room-${Date.now()}`,
    title: roomData.title,
    description: roomData.description,
    category: roomData.category || 'General',
    status: roomData.startNow ? 'live' : 'scheduled',
    startedAt: roomData.startNow ? new Date() : null,
    scheduledFor: roomData.startNow ? null : new Date(roomData.scheduledFor),
    duration: roomData.duration || 3600,
    speakers: [roomData.host],
    listeners: [],
    listenerCount: 0,
    maxListeners: roomData.maxListeners || 500,
    isRecording: roomData.isRecording !== false,
    allowHandRaise: roomData.allowHandRaise !== false,
    isPrivate: roomData.isPrivate || false,
    tags: roomData.tags || [],
    host: roomData.host,
    language: roomData.language || 'en'
  };

  rooms.push(newRoom);
  return newRoom;
};

/**
 * Join a voice room as listener
 * @param {string} roomId - Room to join
 * @param {Object} user - Current user info
 * @returns {Promise<Object>} Updated room state
 */
export const joinVoiceRoom = async (roomId, user) => {
  await delay(400);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  if (room.status !== 'live') {
    throw new Error('Room is not active');
  }

  if (room.listenerCount >= room.maxListeners) {
    throw new Error('Room is full');
  }

  const listener = {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar,
    handRaised: false,
    joinedAt: new Date()
  };

  room.listeners = [...room.listeners, listener];
  room.listenerCount += 1;

  currentUserStatus = {
    roomId: room.id,
    role: 'listener',
    isMuted: true,
    handRaised: false
  };

  return {
    room,
    userStatus: currentUserStatus
  };
};

/**
 * Leave a voice room
 * @param {string} roomId - Room to leave
 * @param {string} userId - User leaving
 * @returns {Promise<void>}
 */
export const leaveVoiceRoom = async (roomId, userId) => {
  await delay(300);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  room.listeners = room.listeners.filter(l => l.id !== userId);
  room.listenerCount = Math.max(0, room.listenerCount - 1);

  currentUserStatus = {
    roomId: null,
    role: 'listener',
    isMuted: true,
    handRaised: false
  };

  return { success: true };
};

/**
 * Raise or lower hand in a room
 * @param {string} roomId - Room ID
 * @param {string} userId - User ID
 * @param {boolean} raised - Hand raised state
 * @returns {Promise<Object>} Updated user status
 */
export const toggleHandRaise = async (roomId, userId, raised) => {
  await delay(200);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  const listener = room.listeners.find(l => l.id === userId);

  if (listener) {
    listener.handRaised = raised;
  }

  currentUserStatus.handRaised = raised;

  return {
    success: true,
    handRaised: raised
  };
};

/**
 * Toggle mute status
 * @param {string} roomId - Room ID
 * @param {string} userId - User ID
 * @param {boolean} muted - Mute state
 * @returns {Promise<Object>} Updated mute status
 */
export const toggleMute = async (roomId, userId, muted) => {
  await delay(150);

  currentUserStatus.isMuted = muted;

  return {
    success: true,
    isMuted: muted
  };
};

/**
 * Send a reaction in the room
 * @param {string} roomId - Room ID
 * @param {string} reactionType - Type of reaction
 * @returns {Promise<Object>} Reaction sent confirmation
 */
export const sendReaction = async (roomId, reactionType) => {
  await delay(100);

  return {
    success: true,
    reaction: reactionType,
    timestamp: new Date()
  };
};

/**
 * Send a chat message
 * @param {string} roomId - Room ID
 * @param {Object} message - Message data
 * @returns {Promise<Object>} Sent message
 */
export const sendChatMessage = async (roomId, message) => {
  await delay(200);

  const newMessage = {
    id: `chat-${Date.now()}`,
    userId: message.userId,
    username: message.username,
    message: message.text,
    timestamp: new Date(),
    reactions: []
  };

  return newMessage;
};

/**
 * Invite a speaker to stage
 * @param {string} roomId - Room ID
 * @param {string} userId - User to invite
 * @returns {Promise<Object>} Invitation result
 */
export const inviteToStage = async (roomId, userId) => {
  await delay(300);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  const listener = room.listeners.find(l => l.id === userId);

  if (!listener) {
    throw new Error('User not in room');
  }

  // Move from listeners to speakers
  room.listeners = room.listeners.filter(l => l.id !== userId);
  room.speakers.push({
    id: listener.id,
    username: listener.username,
    displayName: listener.displayName,
    avatar: listener.avatar,
    role: 'speaker',
    isMuted: true,
    isSpeaking: false
  });

  return {
    success: true,
    message: 'User invited to stage'
  };
};

/**
 * Remove a speaker from stage (back to listener)
 * @param {string} roomId - Room ID
 * @param {string} userId - User to remove
 * @returns {Promise<Object>} Removal result
 */
export const removeFromStage = async (roomId, userId) => {
  await delay(300);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  const speaker = room.speakers.find(s => s.id === userId);

  if (!speaker) {
    throw new Error('User not on stage');
  }

  // Move from speakers to listeners
  room.speakers = room.speakers.filter(s => s.id !== userId);
  room.listeners.push({
    id: speaker.id,
    username: speaker.username,
    displayName: speaker.displayName,
    avatar: speaker.avatar,
    handRaised: false,
    joinedAt: new Date()
  });

  return {
    success: true,
    message: 'User removed from stage'
  };
};

/**
 * Get room analytics
 * @param {string} roomId - Room ID
 * @returns {Promise<Object>} Room analytics
 */
export const getRoomAnalytics = async (roomId) => {
  await delay(400);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  return {
    roomId: room.id,
    totalListeners: room.listenerCount,
    peakListeners: Math.floor(room.listenerCount * 1.3),
    avgListenDuration: 1847, // seconds
    totalReactions: 342,
    totalChatMessages: 89,
    handRaises: 12,
    engagement: {
      reactionRate: 0.78,
      chatParticipation: 0.34,
      avgHandRaiseTime: 245 // seconds
    }
  };
};

/**
 * End a voice room (host only)
 * @param {string} roomId - Room to end
 * @returns {Promise<Object>} Room summary
 */
export const endVoiceRoom = async (roomId) => {
  await delay(500);

  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  room.status = 'ended';
  room.endedAt = new Date();

  const analytics = await getRoomAnalytics(roomId);

  return {
    success: true,
    room,
    analytics
  };
};

/**
 * Get current user's room status
 * @returns {Object} Current user status
 */
export const getCurrentUserStatus = () => {
  return { ...currentUserStatus };
};

/**
 * Search transcript
 * @param {string} roomId - Room ID
 * @param {string} query - Search query
 * @returns {Promise<Array>} Matching transcript entries
 */
export const searchTranscript = async (roomId, query) => {
  await delay(300);

  if (!query) return mockTranscript;

  const lowerQuery = query.toLowerCase();
  return mockTranscript.filter(entry =>
    entry.text.toLowerCase().includes(lowerQuery) ||
    entry.speakerName.toLowerCase().includes(lowerQuery)
  );
};

const voiceRoomService = {
  getVoiceRooms,
  getVoiceRoom,
  createVoiceRoom,
  joinVoiceRoom,
  leaveVoiceRoom,
  toggleHandRaise,
  toggleMute,
  sendReaction,
  sendChatMessage,
  inviteToStage,
  removeFromStage,
  getRoomAnalytics,
  endVoiceRoom,
  getCurrentUserStatus,
  searchTranscript
};

export default voiceRoomService;
