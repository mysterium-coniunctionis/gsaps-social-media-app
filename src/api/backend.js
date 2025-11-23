import api from './api';

export const login = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const fetchPosts = async () => {
  const { data } = await api.get('/posts');
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

export const fetchMessages = async () => {
  const { data } = await api.get('/messages');
  return data;
};

export const sendMessage = async (payload) => {
  const { data } = await api.post('/messages', payload);
  return data;
};

export const fetchCourses = async () => {
  const { data } = await api.get('/courses');
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

export const fetchGamification = async () => {
  const { data } = await api.get('/gamification');
  return data;
};

export const awardGamification = async (payload) => {
  const { data } = await api.post('/gamification/award', payload);
  return data;
};

export const fetchResearchAssets = async () => {
  const { data } = await api.get('/assets');
  return data;
};

export const createResearchAsset = async (payload) => {
  const { data } = await api.post('/assets', payload);
  return data;
};
