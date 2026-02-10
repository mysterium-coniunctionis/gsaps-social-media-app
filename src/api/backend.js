import api, { setAuthToken } from './api';

// ============================================
// AUTHENTICATION
// ============================================

export const login = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

// ============================================
// USERS / MEMBERS
// ============================================

export const fetchUsers = async (params = {}) => {
  const { data } = await api.get('/users', { params });
  return data;
};

export const fetchUser = async (userId) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const updateUser = async (userId, payload) => {
  const { data } = await api.patch(`/users/${userId}`, payload);
  return data;
};

// ============================================
// POSTS
// ============================================

export const fetchPosts = async (params = {}) => {
  const { data } = await api.get('/posts', { params });
  return data;
};

export const createPost = async (payload) => {
  const { data } = await api.post('/posts', payload);
  return data;
};

export const reactToPost = async ({ postId, type }) => {
  const { data } = await api.post(`/posts/${postId}/reactions`, { type });
  return data;
};

export const deletePost = async (postId) => {
  await api.delete(`/posts/${postId}`);
  return postId;
};

// ============================================
// COMMENTS
// ============================================

export const fetchComments = async (postId) => {
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
};

export const createComment = async ({ postId, content, parentId }) => {
  const { data } = await api.post(`/posts/${postId}/comments`, { content, parentId });
  return data;
};

export const deleteComment = async (commentId) => {
  await api.delete(`/comments/${commentId}`);
  return commentId;
};

// ============================================
// MESSAGES
// ============================================

export const fetchMessages = async () => {
  const { data } = await api.get('/messages');
  return data;
};

export const fetchConversation = async (userId) => {
  const { data } = await api.get(`/messages/${userId}`);
  return data;
};

export const sendMessage = async (payload) => {
  const { data } = await api.post('/messages', payload);
  return data;
};

// ============================================
// GROUPS
// ============================================

export const fetchGroups = async (params = {}) => {
  const { data } = await api.get('/groups', { params });
  return data;
};

export const fetchGroup = async (groupId) => {
  const { data } = await api.get(`/groups/${groupId}`);
  return data;
};

export const createGroup = async (payload) => {
  const { data } = await api.post('/groups', payload);
  return data;
};

export const joinGroup = async (groupId) => {
  const { data } = await api.post(`/groups/${groupId}/join`);
  return data;
};

export const leaveGroup = async (groupId) => {
  const { data } = await api.post(`/groups/${groupId}/leave`);
  return data;
};

// ============================================
// EVENTS
// ============================================

export const fetchEvents = async (params = {}) => {
  const { data } = await api.get('/events', { params });
  return data;
};

export const fetchEvent = async (eventId) => {
  const { data } = await api.get(`/events/${eventId}`);
  return data;
};

export const createEvent = async (payload) => {
  const { data } = await api.post('/events', payload);
  return data;
};

export const rsvpEvent = async (eventId, status) => {
  const { data } = await api.post(`/events/${eventId}/rsvp`, { status });
  return data;
};

// ============================================
// COURSES
// ============================================

export const fetchCourses = async (params = {}) => {
  const { data } = await api.get('/courses', { params });
  return data;
};

export const fetchCourse = async (courseId) => {
  const { data } = await api.get(`/courses/${courseId}`);
  return data;
};

export const enrollInCourse = async (courseId) => {
  const { data } = await api.post(`/courses/${courseId}/enroll`);
  return data;
};

export const updateCourseProgress = async ({ courseId, progress }) => {
  const { data } = await api.post(`/courses/${courseId}/progress`, { progress });
  return data;
};

// ============================================
// LESSON PROGRESS
// ============================================

export const fetchLesson = async (courseId, lessonId) => {
  const { data } = await api.get(`/courses/${courseId}/lessons/${lessonId}`);
  return data;
};

export const completeLesson = async (courseId, lessonId, watchTime = 0) => {
  const { data } = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete`, { watchTime });
  return data;
};

export const updateLessonWatchTime = async (courseId, lessonId, watchTime) => {
  const { data } = await api.post(`/courses/${courseId}/lessons/${lessonId}/watchtime`, { watchTime });
  return data;
};

// ============================================
// QUIZ
// ============================================

export const fetchQuizStatus = async (courseId, lessonId) => {
  const { data } = await api.get(`/courses/${courseId}/lessons/${lessonId}/quiz/status`);
  return data;
};

export const submitQuizResult = async (courseId, lessonId, score, answers) => {
  const { data } = await api.post(`/courses/${courseId}/lessons/${lessonId}/quiz/submit`, { score, answers });
  return data;
};

// ============================================
// COURSE COMPLETION & CREDENTIALS
// ============================================

export const completeCourse = async (courseId) => {
  const { data } = await api.post(`/courses/${courseId}/complete`);
  return data;
};

export const verifyCredential = async (certificateId) => {
  const { data } = await api.get(`/verify/${certificateId}`);
  return data;
};

export const fetchUserCredentials = async (userId) => {
  const { data } = await api.get(`/users/${userId}/credentials`);
  return data;
};

export const fetchCourseEnrollment = async (courseId) => {
  const { data } = await api.get(`/courses/${courseId}/enrollment`);
  return data;
};

// ============================================
// RESEARCH ASSETS
// ============================================

export const fetchResearchAssets = async (params = {}) => {
  const { data } = await api.get('/assets', { params });
  return data;
};

export const fetchResearchAsset = async (assetId) => {
  const { data } = await api.get(`/assets/${assetId}`);
  return data;
};

export const createResearchAsset = async (payload) => {
  const { data } = await api.post('/assets', payload);
  return data;
};

export const reviewResearchAsset = async (assetId, payload) => {
  const { data } = await api.post(`/assets/${assetId}/reviews`, payload);
  return data;
};

// ============================================
// ADVANCED RESEARCH SEARCH
// ============================================

export const searchResearchAssets = async (params = {}) => {
  const { data } = await api.get('/assets/search', { params });
  return data;
};

// ============================================
// PAPER COLLECTIONS
// ============================================

export const fetchMyCollections = async () => {
  const { data } = await api.get('/collections');
  return data;
};

export const fetchPublicCollections = async (params = {}) => {
  const { data } = await api.get('/collections/public', { params });
  return data;
};

export const fetchCollection = async (collectionId) => {
  const { data } = await api.get(`/collections/${collectionId}`);
  return data;
};

export const createCollection = async (payload) => {
  const { data } = await api.post('/collections', payload);
  return data;
};

export const updateCollection = async (collectionId, payload) => {
  const { data } = await api.patch(`/collections/${collectionId}`, payload);
  return data;
};

export const deleteCollection = async (collectionId) => {
  await api.delete(`/collections/${collectionId}`);
  return collectionId;
};

export const addPaperToCollection = async (collectionId, assetId, notes = null) => {
  const { data } = await api.post(`/collections/${collectionId}/papers`, { assetId, notes });
  return data;
};

export const updatePaperInCollection = async (collectionId, assetId, notes) => {
  const { data } = await api.patch(`/collections/${collectionId}/papers/${assetId}`, { notes });
  return data;
};

export const removePaperFromCollection = async (collectionId, assetId) => {
  await api.delete(`/collections/${collectionId}/papers/${assetId}`);
  return { collectionId, assetId };
};

export const followCollection = async (collectionId) => {
  const { data } = await api.post(`/collections/${collectionId}/follow`);
  return data;
};

export const unfollowCollection = async (collectionId) => {
  await api.delete(`/collections/${collectionId}/follow`);
  return collectionId;
};

// ============================================
// PAPER DISCUSSIONS (Comments on Research)
// ============================================

export const fetchPaperComments = async (assetId) => {
  const { data } = await api.get(`/assets/${assetId}/comments`);
  return data;
};

export const createPaperComment = async (assetId, content, parentId = null) => {
  const { data } = await api.post(`/assets/${assetId}/comments`, { content, parentId });
  return data;
};

export const updatePaperComment = async (commentId, content) => {
  const { data } = await api.patch(`/assets/comments/${commentId}`, { content });
  return data;
};

export const deletePaperComment = async (commentId) => {
  await api.delete(`/assets/comments/${commentId}`);
  return commentId;
};

export const togglePaperCommentLike = async (commentId) => {
  const { data } = await api.post(`/assets/comments/${commentId}/like`);
  return data;
};

// ============================================
// PAPER REVIEWS
// ============================================

export const fetchPaperReviews = async (assetId) => {
  const { data } = await api.get(`/assets/${assetId}/reviews`);
  return data;
};

export const createPaperReview = async (assetId, { rating, text }) => {
  const { data } = await api.post(`/assets/${assetId}/reviews`, { rating, text });
  return data;
};

// ============================================
// GAMIFICATION
// ============================================

export const fetchGamification = async () => {
  const { data } = await api.get('/gamification');
  return data;
};

export const awardGamification = async (payload) => {
  const { data } = await api.post('/gamification/award', payload);
  return data;
};

export const fetchLeaderboard = async (params = {}) => {
  const { data } = await api.get('/leaderboard', { params });
  return data;
};

// ============================================
// NOTIFICATIONS
// ============================================

export const fetchNotifications = async (params = {}) => {
  const { data } = await api.get('/notifications', { params });
  return data;
};

export const markNotificationRead = async (notificationId) => {
  const { data } = await api.post(`/notifications/${notificationId}/read`);
  return data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await api.post('/notifications/read-all');
  return data;
};
