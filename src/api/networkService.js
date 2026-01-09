/**
 * Network Service API
 * Handles all mentor matching and networking API calls
 */

import api from './api';
import {
  professionalProfiles,
  mockConnectionRequests,
  mockSuccessStories,
  networkAnalyticsData
} from '../data/networkData';
import { findTopMatches, getColdStartRecommendations } from '../utils/matchingAlgorithm';

// Simulate API delay for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get match recommendations for current user
 * @param {Object} currentUser - Current user profile
 * @param {Object} filters - Filter criteria
 * @returns {Promise<Array>} - Array of recommended matches
 */
export const getMatchRecommendations = async (currentUser, filters = {}) => {
  try {
    // In production, this would be:
    // const response = await api.get('/network/matches', { params: filters });
    // return response.data;

    await delay(500);

    const {
      type = null, // 'mentor', 'mentee', 'peer', 'collaborator'
      expertise = [],
      location = null,
      experienceLevel = null,
      limit = 10
    } = filters;

    // Get current user's full profile
    const userProfile = professionalProfiles.find(p => p.userId === currentUser?.id) ||
                       professionalProfiles[0]; // Fallback for demo

    // Get recommendations
    let matches = findTopMatches(userProfile, professionalProfiles, {
      limit: limit * 2, // Get more for filtering
      filterType: type
    });

    // Apply additional filters
    if (expertise.length > 0) {
      matches = matches.filter(m =>
        expertise.some(e =>
          m.profile.expertise?.some(pe => pe.toLowerCase().includes(e.toLowerCase()))
        )
      );
    }

    if (location) {
      matches = matches.filter(m =>
        m.profile.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (experienceLevel) {
      matches = matches.filter(m => m.profile.experienceLevel === experienceLevel);
    }

    return matches.slice(0, limit);
  } catch (error) {
    console.error('Error fetching match recommendations:', error);
    throw error;
  }
};

/**
 * Get connection requests (incoming and outgoing)
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Connection requests data
 */
export const getConnectionRequests = async (userId) => {
  try {
    // In production: await api.get('/network/requests');
    await delay(300);

    const incoming = mockConnectionRequests
      .filter(req => req.toUserId === userId || req.toUserId.includes('prof_001'))
      .map(req => ({
        ...req,
        fromUser: professionalProfiles.find(p => p.id === req.fromUserId)
      }));

    const outgoing = mockConnectionRequests
      .filter(req => req.fromUserId === userId || req.fromUserId.includes('prof_002'))
      .map(req => ({
        ...req,
        toUser: professionalProfiles.find(p => p.id === req.toUserId)
      }));

    return {
      incoming,
      outgoing,
      total: incoming.length + outgoing.length
    };
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    throw error;
  }
};

/**
 * Send a connection request
 * @param {Object} requestData - Connection request data
 * @returns {Promise<Object>} - Created request
 */
export const sendConnectionRequest = async (requestData) => {
  try {
    // In production:
    // const response = await api.post('/network/requests', requestData);
    // return response.data;

    await delay(400);

    const newRequest = {
      id: `req_${Date.now()}`,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Connection request sent:', newRequest);

    return {
      success: true,
      request: newRequest,
      message: 'Connection request sent successfully'
    };
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

/**
 * Accept a connection request
 * @param {string} requestId - Request ID
 * @param {string} message - Optional acceptance message
 * @returns {Promise<Object>} - Updated request
 */
export const acceptConnectionRequest = async (requestId, message = '') => {
  try {
    // In production:
    // const response = await api.post(`/network/requests/${requestId}/accept`, { message });
    // return response.data;

    await delay(300);

    return {
      success: true,
      requestId,
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
      message: 'Connection request accepted'
    };
  } catch (error) {
    console.error('Error accepting connection request:', error);
    throw error;
  }
};

/**
 * Decline a connection request
 * @param {string} requestId - Request ID
 * @param {string} message - Optional decline message
 * @returns {Promise<Object>} - Updated request
 */
export const declineConnectionRequest = async (requestId, message = '') => {
  try {
    // In production:
    // const response = await api.post(`/network/requests/${requestId}/decline`, { message });
    // return response.data;

    await delay(300);

    return {
      success: true,
      requestId,
      status: 'declined',
      declinedAt: new Date().toISOString(),
      message: 'Connection request declined'
    };
  } catch (error) {
    console.error('Error declining connection request:', error);
    throw error;
  }
};

/**
 * Get user's network connections
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - User's connections
 */
export const getUserConnections = async (userId) => {
  try {
    // In production: await api.get(`/network/users/${userId}/connections`);
    await delay(400);

    // Mock: return subset of profiles
    const connections = professionalProfiles
      .filter(p => p.connectionCount > 20)
      .slice(0, 15)
      .map(profile => ({
        ...profile,
        connectedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        relationshipType: ['mentor', 'mentee', 'peer', 'collaborator'][Math.floor(Math.random() * 4)]
      }));

    return connections;
  } catch (error) {
    console.error('Error fetching user connections:', error);
    throw error;
  }
};

/**
 * Update user's professional profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} - Updated profile
 */
export const updateProfessionalProfile = async (userId, profileData) => {
  try {
    // In production:
    // const response = await api.put(`/network/users/${userId}/profile`, profileData);
    // return response.data;

    await delay(400);

    console.log('Profile updated:', profileData);

    return {
      success: true,
      profile: {
        ...profileData,
        updatedAt: new Date().toISOString()
      },
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating professional profile:', error);
    throw error;
  }
};

/**
 * Report match quality feedback
 * @param {string} matchId - Match ID
 * @param {Object} feedback - Feedback data
 * @returns {Promise<Object>} - Feedback confirmation
 */
export const reportMatchQuality = async (matchId, feedback) => {
  try {
    // In production:
    // const response = await api.post('/network/matches/feedback', { matchId, ...feedback });
    // return response.data;

    await delay(200);

    console.log('Match feedback submitted:', { matchId, feedback });

    return {
      success: true,
      message: 'Thank you for your feedback! This helps us improve our recommendations.'
    };
  } catch (error) {
    console.error('Error reporting match quality:', error);
    throw error;
  }
};

/**
 * Get network analytics for user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Network analytics data
 */
export const getNetworkAnalytics = async (userId) => {
  try {
    // In production: await api.get(`/network/users/${userId}/analytics`);
    await delay(300);

    return {
      ...networkAnalyticsData,
      userId,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching network analytics:', error);
    throw error;
  }
};

/**
 * Get success stories
 * @returns {Promise<Array>} - Success stories
 */
export const getSuccessStories = async () => {
  try {
    // In production: await api.get('/network/success-stories');
    await delay(300);

    return mockSuccessStories;
  } catch (error) {
    console.error('Error fetching success stories:', error);
    throw error;
  }
};

/**
 * Search professionals by criteria
 * @param {Object} searchParams - Search parameters
 * @returns {Promise<Array>} - Search results
 */
export const searchProfessionals = async (searchParams) => {
  try {
    // In production: await api.get('/network/search', { params: searchParams });
    await delay(400);

    const {
      query = '',
      expertise = [],
      location = '',
      experienceLevel = null,
      availability = null
    } = searchParams;

    let results = [...professionalProfiles];

    // Text search
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.expertise?.some(e => e.toLowerCase().includes(q)) ||
        p.researchInterests?.some(r => r.toLowerCase().includes(q))
      );
    }

    // Expertise filter
    if (expertise.length > 0) {
      results = results.filter(p =>
        expertise.some(e =>
          p.expertise?.some(pe => pe.toLowerCase().includes(e.toLowerCase()))
        )
      );
    }

    // Location filter
    if (location) {
      results = results.filter(p =>
        p.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Experience level filter
    if (experienceLevel) {
      results = results.filter(p => p.experienceLevel === experienceLevel);
    }

    // Availability filter
    if (availability) {
      results = results.filter(p => p.availability === availability);
    }

    return results;
  } catch (error) {
    console.error('Error searching professionals:', error);
    throw error;
  }
};

/**
 * Get AI-generated intro message suggestions
 * @param {Object} fromUser - Sender profile
 * @param {Object} toUser - Recipient profile
 * @param {string} connectionType - Type of connection
 * @returns {Promise<Array>} - Array of suggested messages
 */
export const getIntroMessageSuggestions = async (fromUser, toUser, connectionType) => {
  try {
    // In production: await api.post('/network/suggestions/intro-message', { fromUser, toUser, connectionType });
    await delay(400);

    const suggestions = [];

    if (connectionType === 'mentor') {
      suggestions.push(
        `Hi ${toUser.name.split(' ')[0]}, I'm ${fromUser.name} and I'm deeply interested in ${toUser.expertise?.[0] || 'your work'}. I would be honored to learn from your experience. Would you be open to a mentoring relationship?`,
        `Hello Dr. ${toUser.name.split(' ').pop()}, I came across your work on ${toUser.researchInterests?.[0] || 'psychedelic research'} and was impressed by your contributions. I'm ${fromUser.experienceLevel === 'student' ? 'a student' : 'an early-career professional'} hoping to learn from experienced leaders in the field. Would you have time to mentor me?`,
        `Hi ${toUser.name.split(' ')[0]}, Your background in ${toUser.expertise?.[0]} aligns perfectly with my career goals. I'm looking for guidance as I ${fromUser.experienceLevel === 'student' ? 'begin my career' : 'advance in the field'}. Would you be willing to share your insights?`
      );
    } else if (connectionType === 'collaboration') {
      suggestions.push(
        `Hi ${toUser.name.split(' ')[0]}, I noticed we share interests in ${toUser.researchInterests?.[0] || 'psychedelic research'}. I'm working on ${fromUser.researchInterests?.[0] || 'a research project'} and think there could be interesting collaboration opportunities. Would you be interested in discussing?`,
        `Hello ${toUser.name.split(' ')[0]}, Your expertise in ${toUser.expertise?.[0]} complements my work in ${fromUser.expertise?.[0]}. I'd love to explore potential collaboration. Are you open to a conversation?`,
        `Hi Dr. ${toUser.name.split(' ').pop()}, I'm impressed by your research on ${toUser.researchInterests?.[0]}. I believe our work could synergize well. Would you be interested in exploring a collaboration?`
      );
    } else {
      suggestions.push(
        `Hi ${toUser.name.split(' ')[0]}, I'd love to connect with you and learn more about your work in ${toUser.expertise?.[0] || 'the field'}. Looking forward to being part of the same professional network!`,
        `Hello ${toUser.name.split(' ')[0]}, Your profile really resonated with me. I'm also passionate about ${toUser.researchInterests?.[0] || 'psychedelic research'}. Would be great to connect!`,
        `Hi ${toUser.name.split(' ')[0]}, I think we have similar interests and could learn a lot from each other. Would you like to connect?`
      );
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating intro message suggestions:', error);
    throw error;
  }
};

/**
 * Get professional profile by ID
 * @param {string} profileId - Profile ID
 * @returns {Promise<Object>} - Professional profile
 */
export const getProfessionalProfile = async (profileId) => {
  try {
    // In production: await api.get(`/network/profiles/${profileId}`);
    await delay(200);

    const profile = professionalProfiles.find(p => p.id === profileId);

    if (!profile) {
      throw new Error('Profile not found');
    }

    return profile;
  } catch (error) {
    console.error('Error fetching professional profile:', error);
    throw error;
  }
};

export default {
  getMatchRecommendations,
  getConnectionRequests,
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  getUserConnections,
  updateProfessionalProfile,
  reportMatchQuality,
  getNetworkAnalytics,
  getSuccessStories,
  searchProfessionals,
  getIntroMessageSuggestions,
  getProfessionalProfile
};
