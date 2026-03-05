import api from './api';
import {
  login,
  register,
  getCurrentUser,
  fetchUsers,
  fetchUser,
  updateUser,
  fetchPosts,
  createPost,
  reactToPost,
  deletePost,
  fetchComments,
  createComment,
  deleteComment,
  fetchMessages,
  fetchConversation,
  sendMessage,
  fetchGroups,
  fetchGroup,
  createGroup,
  joinGroup,
  leaveGroup,
  fetchEvents,
  fetchEvent,
  createEvent,
  rsvpEvent,
  fetchCourses,
  fetchCourse,
  enrollInCourse,
  updateCourseProgress,
  fetchGamification,
  awardGamification,
  fetchLeaderboard,
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  fetchResearchAssets,
  fetchResearchAsset,
  createResearchAsset,
  fetchMyCollections,
  fetchCollection,
  createCollection,
  deleteCollection,
  addPaperToCollection,
  removePaperFromCollection,
  completeCourse,
  verifyCredential,
  fetchPaperComments,
  createPaperComment,
  deletePaperComment,
  togglePaperCommentLike
} from './backend';

jest.mock('./api', () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
  };
  return {
    __esModule: true,
    default: mockApi,
    setAuthToken: jest.fn()
  };
});

describe('backend API service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================
  // AUTHENTICATION
  // ============================================
  describe('authentication', () => {
    it('login should POST to /auth/login and return data', async () => {
      const mockData = { user: { id: '1' }, token: 'abc123' };
      api.post.mockResolvedValue({ data: mockData });

      const result = await login('testuser', 'password');
      expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'testuser', password: 'password' });
      expect(result).toEqual(mockData);
    });

    it('register should POST to /auth/register and return data', async () => {
      const payload = { username: 'newuser', email: 'new@test.com', password: 'pass' };
      const mockData = { user: { id: '2' }, token: 'def456' };
      api.post.mockResolvedValue({ data: mockData });

      const result = await register(payload);
      expect(api.post).toHaveBeenCalledWith('/auth/register', payload);
      expect(result).toEqual(mockData);
    });

    it('getCurrentUser should GET /auth/me', async () => {
      const mockUser = { id: '1', username: 'testuser' };
      api.get.mockResolvedValue({ data: mockUser });

      const result = await getCurrentUser();
      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });
  });

  // ============================================
  // USERS
  // ============================================
  describe('users', () => {
    it('fetchUsers should GET /users with params', async () => {
      const mockUsers = [{ id: '1' }, { id: '2' }];
      api.get.mockResolvedValue({ data: mockUsers });

      const result = await fetchUsers({ page: 1 });
      expect(api.get).toHaveBeenCalledWith('/users', { params: { page: 1 } });
      expect(result).toEqual(mockUsers);
    });

    it('fetchUser should GET /users/:id', async () => {
      const mockUser = { id: '1', username: 'user1' };
      api.get.mockResolvedValue({ data: mockUser });

      const result = await fetchUser('1');
      expect(api.get).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockUser);
    });

    it('updateUser should PATCH /users/:id', async () => {
      const updated = { id: '1', bio: 'Updated bio' };
      api.patch.mockResolvedValue({ data: updated });

      const result = await updateUser('1', { bio: 'Updated bio' });
      expect(api.patch).toHaveBeenCalledWith('/users/1', { bio: 'Updated bio' });
      expect(result).toEqual(updated);
    });
  });

  // ============================================
  // POSTS
  // ============================================
  describe('posts', () => {
    it('fetchPosts should GET /posts with params', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'p1' }] });
      const result = await fetchPosts({ limit: 10 });
      expect(api.get).toHaveBeenCalledWith('/posts', { params: { limit: 10 } });
      expect(result).toEqual([{ id: 'p1' }]);
    });

    it('createPost should POST /posts', async () => {
      const payload = { content: 'Hello world' };
      api.post.mockResolvedValue({ data: { id: 'p1', ...payload } });
      const result = await createPost(payload);
      expect(api.post).toHaveBeenCalledWith('/posts', payload);
      expect(result.content).toBe('Hello world');
    });

    it('reactToPost should POST /posts/:id/reactions', async () => {
      api.post.mockResolvedValue({ data: { success: true } });
      await reactToPost({ postId: 'p1', type: 'like' });
      expect(api.post).toHaveBeenCalledWith('/posts/p1/reactions', { type: 'like' });
    });

    it('deletePost should DELETE /posts/:id and return id', async () => {
      api.delete.mockResolvedValue({});
      const result = await deletePost('p1');
      expect(api.delete).toHaveBeenCalledWith('/posts/p1');
      expect(result).toBe('p1');
    });
  });

  // ============================================
  // COMMENTS
  // ============================================
  describe('comments', () => {
    it('fetchComments should GET /posts/:id/comments', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'c1' }] });
      const result = await fetchComments('p1');
      expect(api.get).toHaveBeenCalledWith('/posts/p1/comments');
      expect(result).toEqual([{ id: 'c1' }]);
    });

    it('createComment should POST /posts/:id/comments', async () => {
      api.post.mockResolvedValue({ data: { id: 'c1', content: 'Great post' } });
      const result = await createComment({ postId: 'p1', content: 'Great post', parentId: null });
      expect(api.post).toHaveBeenCalledWith('/posts/p1/comments', { content: 'Great post', parentId: null });
      expect(result.content).toBe('Great post');
    });

    it('deleteComment should DELETE /comments/:id', async () => {
      api.delete.mockResolvedValue({});
      const result = await deleteComment('c1');
      expect(api.delete).toHaveBeenCalledWith('/comments/c1');
      expect(result).toBe('c1');
    });
  });

  // ============================================
  // MESSAGES
  // ============================================
  describe('messages', () => {
    it('fetchMessages should GET /messages', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'm1' }] });
      const result = await fetchMessages();
      expect(api.get).toHaveBeenCalledWith('/messages');
      expect(result).toEqual([{ id: 'm1' }]);
    });

    it('fetchConversation should GET /messages/:userId', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'm1' }] });
      const result = await fetchConversation('user1');
      expect(api.get).toHaveBeenCalledWith('/messages/user1');
      expect(result).toEqual([{ id: 'm1' }]);
    });

    it('sendMessage should POST /messages', async () => {
      const payload = { to: 'user1', content: 'Hello' };
      api.post.mockResolvedValue({ data: { id: 'm1', ...payload } });
      const result = await sendMessage(payload);
      expect(api.post).toHaveBeenCalledWith('/messages', payload);
      expect(result.content).toBe('Hello');
    });
  });

  // ============================================
  // GROUPS
  // ============================================
  describe('groups', () => {
    it('fetchGroups should GET /groups with params', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'g1' }] });
      const result = await fetchGroups({ category: 'research' });
      expect(api.get).toHaveBeenCalledWith('/groups', { params: { category: 'research' } });
      expect(result).toEqual([{ id: 'g1' }]);
    });

    it('fetchGroup should GET /groups/:id', async () => {
      api.get.mockResolvedValue({ data: { id: 'g1', name: 'Test Group' } });
      const result = await fetchGroup('g1');
      expect(api.get).toHaveBeenCalledWith('/groups/g1');
      expect(result.name).toBe('Test Group');
    });

    it('createGroup should POST /groups', async () => {
      api.post.mockResolvedValue({ data: { id: 'g1', name: 'New Group' } });
      const result = await createGroup({ name: 'New Group' });
      expect(api.post).toHaveBeenCalledWith('/groups', { name: 'New Group' });
      expect(result.name).toBe('New Group');
    });

    it('joinGroup should POST /groups/:id/join', async () => {
      api.post.mockResolvedValue({ data: { success: true } });
      await joinGroup('g1');
      expect(api.post).toHaveBeenCalledWith('/groups/g1/join');
    });

    it('leaveGroup should POST /groups/:id/leave', async () => {
      api.post.mockResolvedValue({ data: { success: true } });
      await leaveGroup('g1');
      expect(api.post).toHaveBeenCalledWith('/groups/g1/leave');
    });
  });

  // ============================================
  // EVENTS
  // ============================================
  describe('events', () => {
    it('fetchEvents should GET /events with params', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'e1' }] });
      const result = await fetchEvents({ upcoming: true });
      expect(api.get).toHaveBeenCalledWith('/events', { params: { upcoming: true } });
      expect(result).toEqual([{ id: 'e1' }]);
    });

    it('fetchEvent should GET /events/:id', async () => {
      api.get.mockResolvedValue({ data: { id: 'e1' } });
      await fetchEvent('e1');
      expect(api.get).toHaveBeenCalledWith('/events/e1');
    });

    it('createEvent should POST /events', async () => {
      api.post.mockResolvedValue({ data: { id: 'e1' } });
      await createEvent({ title: 'Conference' });
      expect(api.post).toHaveBeenCalledWith('/events', { title: 'Conference' });
    });

    it('rsvpEvent should POST /events/:id/rsvp with status', async () => {
      api.post.mockResolvedValue({ data: { success: true } });
      await rsvpEvent('e1', 'attending');
      expect(api.post).toHaveBeenCalledWith('/events/e1/rsvp', { status: 'attending' });
    });
  });

  // ============================================
  // COURSES
  // ============================================
  describe('courses', () => {
    it('fetchCourses should GET /courses with params', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'course1' }] });
      const result = await fetchCourses({ category: 'therapy' });
      expect(api.get).toHaveBeenCalledWith('/courses', { params: { category: 'therapy' } });
      expect(result).toEqual([{ id: 'course1' }]);
    });

    it('fetchCourse should GET /courses/:id', async () => {
      api.get.mockResolvedValue({ data: { id: 'course1' } });
      await fetchCourse('course1');
      expect(api.get).toHaveBeenCalledWith('/courses/course1');
    });

    it('enrollInCourse should POST /courses/:id/enroll', async () => {
      api.post.mockResolvedValue({ data: { enrolled: true } });
      await enrollInCourse('course1');
      expect(api.post).toHaveBeenCalledWith('/courses/course1/enroll');
    });

    it('updateCourseProgress should POST /courses/:id/progress', async () => {
      api.post.mockResolvedValue({ data: { progress: 50 } });
      await updateCourseProgress({ courseId: 'course1', progress: 50 });
      expect(api.post).toHaveBeenCalledWith('/courses/course1/progress', { progress: 50 });
    });

    it('completeCourse should POST /courses/:id/complete', async () => {
      api.post.mockResolvedValue({ data: { completed: true } });
      await completeCourse('course1');
      expect(api.post).toHaveBeenCalledWith('/courses/course1/complete');
    });

    it('verifyCredential should GET /verify/:id', async () => {
      api.get.mockResolvedValue({ data: { valid: true } });
      const result = await verifyCredential('cert123');
      expect(api.get).toHaveBeenCalledWith('/verify/cert123');
      expect(result.valid).toBe(true);
    });
  });

  // ============================================
  // GAMIFICATION
  // ============================================
  describe('gamification', () => {
    it('fetchGamification should GET /gamification', async () => {
      api.get.mockResolvedValue({ data: { points: 100 } });
      const result = await fetchGamification();
      expect(api.get).toHaveBeenCalledWith('/gamification');
      expect(result.points).toBe(100);
    });

    it('awardGamification should POST /gamification/award', async () => {
      api.post.mockResolvedValue({ data: { points: 110 } });
      await awardGamification({ type: 'CREATE_POST', points: 10 });
      expect(api.post).toHaveBeenCalledWith('/gamification/award', { type: 'CREATE_POST', points: 10 });
    });

    it('fetchLeaderboard should GET /leaderboard', async () => {
      api.get.mockResolvedValue({ data: [{ userId: '1', points: 500 }] });
      const result = await fetchLeaderboard({ limit: 10 });
      expect(api.get).toHaveBeenCalledWith('/leaderboard', { params: { limit: 10 } });
      expect(result).toEqual([{ userId: '1', points: 500 }]);
    });
  });

  // ============================================
  // NOTIFICATIONS
  // ============================================
  describe('notifications', () => {
    it('fetchNotifications should GET /notifications', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'n1' }] });
      const result = await fetchNotifications({ unread: true });
      expect(api.get).toHaveBeenCalledWith('/notifications', { params: { unread: true } });
      expect(result).toEqual([{ id: 'n1' }]);
    });

    it('markNotificationRead should POST /notifications/:id/read', async () => {
      api.post.mockResolvedValue({ data: { read: true } });
      await markNotificationRead('n1');
      expect(api.post).toHaveBeenCalledWith('/notifications/n1/read');
    });

    it('markAllNotificationsRead should POST /notifications/read-all', async () => {
      api.post.mockResolvedValue({ data: { count: 5 } });
      await markAllNotificationsRead();
      expect(api.post).toHaveBeenCalledWith('/notifications/read-all');
    });
  });

  // ============================================
  // RESEARCH ASSETS
  // ============================================
  describe('research assets', () => {
    it('fetchResearchAssets should GET /assets', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'a1' }] });
      const result = await fetchResearchAssets({ query: 'psilocybin' });
      expect(api.get).toHaveBeenCalledWith('/assets', { params: { query: 'psilocybin' } });
      expect(result).toEqual([{ id: 'a1' }]);
    });

    it('fetchResearchAsset should GET /assets/:id', async () => {
      api.get.mockResolvedValue({ data: { id: 'a1' } });
      await fetchResearchAsset('a1');
      expect(api.get).toHaveBeenCalledWith('/assets/a1');
    });

    it('createResearchAsset should POST /assets', async () => {
      api.post.mockResolvedValue({ data: { id: 'a1' } });
      await createResearchAsset({ title: 'Paper' });
      expect(api.post).toHaveBeenCalledWith('/assets', { title: 'Paper' });
    });
  });

  // ============================================
  // COLLECTIONS
  // ============================================
  describe('collections', () => {
    it('fetchMyCollections should GET /collections', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'col1' }] });
      const result = await fetchMyCollections();
      expect(api.get).toHaveBeenCalledWith('/collections');
      expect(result).toEqual([{ id: 'col1' }]);
    });

    it('fetchCollection should GET /collections/:id', async () => {
      api.get.mockResolvedValue({ data: { id: 'col1' } });
      await fetchCollection('col1');
      expect(api.get).toHaveBeenCalledWith('/collections/col1');
    });

    it('createCollection should POST /collections', async () => {
      api.post.mockResolvedValue({ data: { id: 'col1' } });
      await createCollection({ name: 'My Collection' });
      expect(api.post).toHaveBeenCalledWith('/collections', { name: 'My Collection' });
    });

    it('deleteCollection should DELETE /collections/:id', async () => {
      api.delete.mockResolvedValue({});
      const result = await deleteCollection('col1');
      expect(api.delete).toHaveBeenCalledWith('/collections/col1');
      expect(result).toBe('col1');
    });

    it('addPaperToCollection should POST /collections/:id/papers', async () => {
      api.post.mockResolvedValue({ data: { success: true } });
      await addPaperToCollection('col1', 'a1', 'Some notes');
      expect(api.post).toHaveBeenCalledWith('/collections/col1/papers', { assetId: 'a1', notes: 'Some notes' });
    });

    it('removePaperFromCollection should DELETE /collections/:collectionId/papers/:assetId', async () => {
      api.delete.mockResolvedValue({});
      const result = await removePaperFromCollection('col1', 'a1');
      expect(api.delete).toHaveBeenCalledWith('/collections/col1/papers/a1');
      expect(result).toEqual({ collectionId: 'col1', assetId: 'a1' });
    });
  });

  // ============================================
  // PAPER DISCUSSIONS
  // ============================================
  describe('paper discussions', () => {
    it('fetchPaperComments should GET /assets/:id/comments', async () => {
      api.get.mockResolvedValue({ data: [{ id: 'pc1' }] });
      const result = await fetchPaperComments('a1');
      expect(api.get).toHaveBeenCalledWith('/assets/a1/comments');
      expect(result).toEqual([{ id: 'pc1' }]);
    });

    it('createPaperComment should POST /assets/:id/comments', async () => {
      api.post.mockResolvedValue({ data: { id: 'pc1' } });
      await createPaperComment('a1', 'Great paper!', null);
      expect(api.post).toHaveBeenCalledWith('/assets/a1/comments', { content: 'Great paper!', parentId: null });
    });

    it('deletePaperComment should DELETE /assets/comments/:id', async () => {
      api.delete.mockResolvedValue({});
      const result = await deletePaperComment('pc1');
      expect(api.delete).toHaveBeenCalledWith('/assets/comments/pc1');
      expect(result).toBe('pc1');
    });

    it('togglePaperCommentLike should POST /assets/comments/:id/like', async () => {
      api.post.mockResolvedValue({ data: { liked: true } });
      await togglePaperCommentLike('pc1');
      expect(api.post).toHaveBeenCalledWith('/assets/comments/pc1/like');
    });
  });
});
