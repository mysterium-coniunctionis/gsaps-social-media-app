import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Environment variable validation
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(
    `Warning: Missing environment variables: ${missingEnvVars.join(', ')}. ` +
    'Using default values for development.'
  );
}

const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  jwtSecret: process.env.JWT_SECRET || 'gsaps-dev-secret-change-in-production',
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production'
};

const prisma = new PrismaClient();
const app = express();

// Security headers
app.use(helmet({ contentSecurityPolicy: false }));

// CORS configuration
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (config.corsOrigins.length === 0 || config.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all origins in development
    },
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ============================================
// HELPER FUNCTIONS
// ============================================

const createAccessToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '15m' }
  );

const createRefreshToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

const setAuthCookies = (res, user) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return accessToken;
};

const authMiddleware = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    const auth = req.headers.authorization;
    if (auth) {
      const [scheme, bearerToken] = auth.split(' ');
      if (scheme === 'Bearer' && bearerToken) {
        token = bearerToken;
      }
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'Missing authentication credentials',
      error: 'UNAUTHORIZED'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError'
      ? 'Token has expired'
      : 'Invalid token';
    res.status(401).json({ message, error: error.name });
  }
};

// Optional auth - doesn't fail if no token
const optionalAuthMiddleware = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    const auth = req.headers.authorization;
    if (auth) {
      const [scheme, bearerToken] = auth.split(' ');
      if (scheme === 'Bearer' && bearerToken) {
        token = bearerToken;
      }
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
    } catch {
      // Ignore token errors for optional auth
    }
  }
  next();
};

const toPublicUser = (user) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  name: user.name,
  role: user.role,
  avatar: user.avatarUrl,
  credentials: user.credentials,
  bio: user.bio,
  verified: user.verified,
  xp: user.xp || 0,
  level: user.level || 1,
  streak: user.streak || 0,
  createdAt: user.createdAt
});

const parseTags = (tags) => {
  if (Array.isArray(tags)) return JSON.stringify(tags);
  if (typeof tags === 'string') {
    try {
      JSON.parse(tags);
      return tags;
    } catch {
      return JSON.stringify([tags]);
    }
  }
  return '[]';
};

const parseJsonField = (field) => {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch {
    return [];
  }
};

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

app.post('/auth/register', async (req, res, next) => {
  try {
    const { email, username, password, name } = req.body;
    if (!email || !username || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        name,
        role: 'member',
        verified: false,
        xp: 0,
        level: 1,
        streak: 0
      }
    });

    const token = setAuthCookies(res, user);
    res.json({ user: toPublicUser(user), token });
  } catch (error) {
    next(error);
  }
});

app.post('/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: username }, { username }] }
    });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });

    const token = setAuthCookies(res, user);
    res.json({ user: toPublicUser(user), token });
  } catch (error) {
    next(error);
  }
});

app.get('/auth/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(toPublicUser(user));
  } catch (error) {
    next(error);
  }
});

app.post('/auth/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided', error: 'UNAUTHORIZED' });
    }

    const decoded = jwt.verify(refreshToken, config.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'User not found', error: 'UNAUTHORIZED' });
    }

    const accessToken = createAccessToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: config.isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token', error: error.name });
  }
});

app.post('/auth/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true });
});

// ============================================
// USERS / MEMBERS ROUTES
// ============================================

app.get('/users', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { search, limit = 20, offset = 0 } = req.query;

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { username: { contains: search } },
        { credentials: { contains: search } }
      ]
    } : {};

    const users = await prisma.user.findMany({
      where,
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: { createdAt: 'desc' }
    });

    res.json(users.map(toPublicUser));
  } catch (error) {
    next(error);
  }
});

app.get('/users/:id', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: { take: 5, orderBy: { createdAt: 'desc' } },
        achievements: true,
        _count: {
          select: {
            posts: true,
            groupMemberships: true,
            enrollments: true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      ...toPublicUser(user),
      stats: {
        posts: user._count.posts,
        groups: user._count.groupMemberships,
        courses: user._count.enrollments
      },
      achievements: user.achievements
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/users/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (req.user.id !== id && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, bio, credentials, avatarUrl } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(bio !== undefined && { bio }),
        ...(credentials !== undefined && { credentials }),
        ...(avatarUrl !== undefined && { avatarUrl })
      }
    });

    res.json(toPublicUser(user));
  } catch (error) {
    next(error);
  }
});

// ============================================
// POSTS ROUTES
// ============================================

app.get('/posts', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, authorId } = req.query;

    const where = authorId ? { authorId: parseInt(authorId) } : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        reactions: true,
        comments: {
          include: { author: true },
          take: 3,
          orderBy: { createdAt: 'desc' }
        },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const formatted = posts.map((post) => {
      const currentUserReaction = req.user
        ? post.reactions.find((r) => r.userId === req.user.id)?.type || null
        : null;

      return {
        id: post.id,
        content: post.content,
        title: post.title,
        tags: parseJsonField(post.tags),
        mediaUrl: post.mediaUrl,
        mediaType: post.mediaType,
        timestamp: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.name,
          username: post.author.username,
          avatar: post.author.avatarUrl,
          verified: post.author.verified,
          credentials: post.author.credentials
        },
        reactions: post.reactions.map((r) => ({
          id: r.id,
          type: r.type,
          userId: r.userId
        })),
        currentUserReaction,
        comments: post.comments.map((c) => ({
          id: c.id,
          content: c.content,
          author: {
            id: c.author.id,
            name: c.author.name,
            username: c.author.username,
            avatar: c.author.avatarUrl
          },
          createdAt: c.createdAt
        })),
        commentCount: post._count.comments,
        shares: 0,
        isBookmarked: false
      };
    });

    res.json(formatted);
  } catch (error) {
    next(error);
  }
});

app.post('/posts', authMiddleware, async (req, res, next) => {
  try {
    const { content, title, tags = [], mediaUrl, mediaType } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const post = await prisma.post.create({
      data: {
        content,
        title,
        tags: parseTags(tags),
        mediaUrl,
        mediaType,
        authorId: req.user.id
      },
      include: { author: true }
    });

    // Award XP for posting
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 10 } }
    });

    res.status(201).json({
      id: post.id,
      content: post.content,
      title: post.title,
      tags: parseJsonField(post.tags),
      mediaUrl: post.mediaUrl,
      mediaType: post.mediaType,
      timestamp: post.createdAt,
      author: {
        id: post.author.id,
        name: post.author.name,
        username: post.author.username,
        avatar: post.author.avatarUrl,
        verified: post.author.verified,
        credentials: post.author.credentials
      },
      reactions: [],
      currentUserReaction: null,
      comments: [],
      commentCount: 0,
      shares: 0,
      isBookmarked: false
    });
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:id/reactions', authMiddleware, async (req, res, next) => {
  try {
    const { type } = req.body;
    const postId = parseInt(req.params.id);

    const existing = await prisma.reaction.findUnique({
      where: { userId_postId: { userId: req.user.id, postId } }
    });

    if (existing && (!type || type === existing.type)) {
      await prisma.reaction.delete({ where: { id: existing.id } });
    } else {
      if (existing) {
        await prisma.reaction.update({
          where: { id: existing.id },
          data: { type }
        });
      } else if (type) {
        await prisma.reaction.create({
          data: { type, postId, userId: req.user.id }
        });
        // Award XP for reacting
        await prisma.user.update({
          where: { id: req.user.id },
          data: { xp: { increment: 2 } }
        });
      }
    }

    const reactions = await prisma.reaction.findMany({ where: { postId } });
    res.json({ postId, reactions });
  } catch (error) {
    next(error);
  }
});

app.delete('/posts/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.authorId !== req.user.id && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await prisma.post.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// ============================================
// COMMENTS ROUTES
// ============================================

app.get('/posts/:postId/comments', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      include: {
        author: true,
        replies: {
          include: { author: true },
          orderBy: { createdAt: 'asc' }
        },
        reactions: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(comments.map((c) => ({
      id: c.id,
      content: c.content,
      author: {
        id: c.author.id,
        name: c.author.name,
        username: c.author.username,
        avatar: c.author.avatarUrl,
        verified: c.author.verified
      },
      createdAt: c.createdAt,
      reactions: c.reactions,
      replies: c.replies.map((r) => ({
        id: r.id,
        content: r.content,
        author: {
          id: r.author.id,
          name: r.author.name,
          username: r.author.username,
          avatar: r.author.avatarUrl
        },
        createdAt: r.createdAt
      }))
    })));
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:postId/comments', authMiddleware, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const { content, parentId } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.user.id,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: { author: true }
    });

    // Award XP for commenting
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 5 } }
    });

    res.status(201).json({
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.author.id,
        name: comment.author.name,
        username: comment.author.username,
        avatar: comment.author.avatarUrl
      },
      createdAt: comment.createdAt,
      replies: []
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/comments/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.authorId !== req.user.id && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await prisma.comment.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// ============================================
// MESSAGES ROUTES
// ============================================

app.get('/messages', authMiddleware, async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      where: { OR: [{ senderId: req.user.id }, { recipientId: req.user.id }] },
      include: { sender: true, recipient: true },
      orderBy: { createdAt: 'desc' }
    });

    const conversationsMap = new Map();

    for (const message of messages) {
      const participant = message.senderId === req.user.id ? message.recipient : message.sender;
      const key = participant.id;

      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          id: key,
          participant: {
            id: participant.id,
            name: participant.name,
            username: participant.username,
            avatar: participant.avatarUrl
          },
          lastMessage: {
            text: message.body,
            timestamp: message.createdAt,
            isFromMe: message.senderId === req.user.id
          },
          unreadCount: 0
        });
      }

      if (!message.read && message.recipientId === req.user.id) {
        conversationsMap.get(key).unreadCount += 1;
      }
    }

    res.json(Array.from(conversationsMap.values()));
  } catch (error) {
    next(error);
  }
});

app.get('/messages/:userId', authMiddleware, async (req, res, next) => {
  try {
    const otherUserId = parseInt(req.params.userId);

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id, recipientId: otherUserId },
          { senderId: otherUserId, recipientId: req.user.id }
        ]
      },
      include: { sender: true },
      orderBy: { createdAt: 'asc' }
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: { senderId: otherUserId, recipientId: req.user.id, read: false },
      data: { read: true }
    });

    res.json(messages.map((m) => ({
      id: m.id,
      body: m.body,
      senderId: m.senderId,
      recipientId: m.recipientId,
      isFromMe: m.senderId === req.user.id,
      read: m.read,
      createdAt: m.createdAt
    })));
  } catch (error) {
    next(error);
  }
});

app.post('/messages', authMiddleware, async (req, res, next) => {
  try {
    const { recipientId, body } = req.body;
    if (!recipientId || !body) {
      return res.status(400).json({ message: 'recipientId and body are required' });
    }

    const message = await prisma.message.create({
      data: {
        recipientId: parseInt(recipientId),
        body,
        senderId: req.user.id
      },
      include: { sender: true, recipient: true }
    });

    res.status(201).json({
      id: message.id,
      body: message.body,
      senderId: message.senderId,
      recipientId: message.recipientId,
      isFromMe: true,
      read: false,
      createdAt: message.createdAt
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// GROUPS ROUTES
// ============================================

app.get('/groups', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { search, category, limit = 20, offset = 0 } = req.query;

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      }),
      ...(category && { category })
    };

    const groups = await prisma.group.findMany({
      where,
      include: {
        owner: true,
        _count: { select: { members: true } },
        members: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(groups.map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      coverUrl: g.coverUrl,
      privacy: g.privacy,
      category: g.category,
      memberCount: g._count.members,
      isMember: req.user ? g.members.length > 0 : false,
      owner: {
        id: g.owner.id,
        name: g.owner.name,
        username: g.owner.username,
        avatar: g.owner.avatarUrl
      },
      createdAt: g.createdAt
    })));
  } catch (error) {
    next(error);
  }
});

app.get('/groups/:id', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        owner: true,
        members: {
          include: { user: true },
          take: 20
        },
        _count: { select: { members: true } }
      }
    });

    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userMembership = req.user
      ? group.members.find((m) => m.userId === req.user.id)
      : null;

    res.json({
      id: group.id,
      name: group.name,
      description: group.description,
      coverUrl: group.coverUrl,
      privacy: group.privacy,
      category: group.category,
      memberCount: group._count.members,
      isMember: !!userMembership,
      userRole: userMembership?.role || null,
      owner: {
        id: group.owner.id,
        name: group.owner.name,
        username: group.owner.username,
        avatar: group.owner.avatarUrl
      },
      members: group.members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        username: m.user.username,
        avatar: m.user.avatarUrl,
        role: m.role,
        joinedAt: m.joinedAt
      })),
      createdAt: group.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/groups', authMiddleware, async (req, res, next) => {
  try {
    const { name, description, privacy = 'public', category, coverUrl } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description required' });
    }

    const group = await prisma.group.create({
      data: {
        name,
        description,
        privacy,
        category,
        coverUrl,
        ownerId: req.user.id,
        members: {
          create: { userId: req.user.id, role: 'admin' }
        }
      },
      include: { owner: true, _count: { select: { members: true } } }
    });

    res.status(201).json({
      id: group.id,
      name: group.name,
      description: group.description,
      coverUrl: group.coverUrl,
      privacy: group.privacy,
      category: group.category,
      memberCount: group._count.members,
      isMember: true,
      owner: {
        id: group.owner.id,
        name: group.owner.name,
        username: group.owner.username,
        avatar: group.owner.avatarUrl
      },
      createdAt: group.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/groups/:id/join', authMiddleware, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.id);

    await prisma.groupMember.upsert({
      where: { userId_groupId: { userId: req.user.id, groupId } },
      create: { userId: req.user.id, groupId },
      update: {}
    });

    res.json({ success: true, groupId });
  } catch (error) {
    next(error);
  }
});

app.post('/groups/:id/leave', authMiddleware, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.id);

    await prisma.groupMember.delete({
      where: { userId_groupId: { userId: req.user.id, groupId } }
    });

    res.json({ success: true, groupId });
  } catch (error) {
    next(error);
  }
});

// ============================================
// EVENTS ROUTES
// ============================================

app.get('/events', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { upcoming, category, limit = 20, offset = 0 } = req.query;

    const where = {
      ...(upcoming === 'true' && { startDate: { gte: new Date() } }),
      ...(category && { category })
    };

    const events = await prisma.event.findMany({
      where,
      include: {
        creator: true,
        _count: { select: { attendees: true } },
        attendees: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      },
      orderBy: { startDate: 'asc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      location: e.location,
      isVirtual: e.isVirtual,
      virtualUrl: e.virtualUrl,
      startDate: e.startDate,
      endDate: e.endDate,
      coverUrl: e.coverUrl,
      category: e.category,
      maxAttendees: e.maxAttendees,
      attendeeCount: e._count.attendees,
      isAttending: req.user ? e.attendees.length > 0 : false,
      attendingStatus: req.user && e.attendees.length > 0 ? e.attendees[0].status : null,
      creator: {
        id: e.creator.id,
        name: e.creator.name,
        username: e.creator.username,
        avatar: e.creator.avatarUrl
      },
      createdAt: e.createdAt
    })));
  } catch (error) {
    next(error);
  }
});

app.get('/events/:id', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
        attendees: {
          include: { user: true },
          take: 50
        },
        _count: { select: { attendees: true } }
      }
    });

    if (!event) return res.status(404).json({ message: 'Event not found' });

    const userAttendance = req.user
      ? event.attendees.find((a) => a.userId === req.user.id)
      : null;

    res.json({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      isVirtual: event.isVirtual,
      virtualUrl: event.virtualUrl,
      startDate: event.startDate,
      endDate: event.endDate,
      coverUrl: event.coverUrl,
      category: event.category,
      maxAttendees: event.maxAttendees,
      attendeeCount: event._count.attendees,
      isAttending: !!userAttendance,
      attendingStatus: userAttendance?.status || null,
      creator: {
        id: event.creator.id,
        name: event.creator.name,
        username: event.creator.username,
        avatar: event.creator.avatarUrl
      },
      attendees: event.attendees.map((a) => ({
        id: a.user.id,
        name: a.user.name,
        username: a.user.username,
        avatar: a.user.avatarUrl,
        status: a.status
      })),
      createdAt: event.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/events', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, location, isVirtual, virtualUrl, startDate, endDate, coverUrl, category, maxAttendees } = req.body;
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: 'Title, description, startDate and endDate required' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        isVirtual: isVirtual || false,
        virtualUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverUrl,
        category,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
        creatorId: req.user.id,
        attendees: {
          create: { userId: req.user.id, status: 'going' }
        }
      },
      include: { creator: true, _count: { select: { attendees: true } } }
    });

    res.status(201).json({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      isVirtual: event.isVirtual,
      virtualUrl: event.virtualUrl,
      startDate: event.startDate,
      endDate: event.endDate,
      coverUrl: event.coverUrl,
      category: event.category,
      maxAttendees: event.maxAttendees,
      attendeeCount: event._count.attendees,
      isAttending: true,
      attendingStatus: 'going',
      creator: {
        id: event.creator.id,
        name: event.creator.name,
        username: event.creator.username,
        avatar: event.creator.avatarUrl
      },
      createdAt: event.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/events/:id/rsvp', authMiddleware, async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.id);
    const { status = 'going' } = req.body;

    if (status === 'not_going') {
      await prisma.eventAttendee.delete({
        where: { userId_eventId: { userId: req.user.id, eventId } }
      }).catch(() => {});
    } else {
      await prisma.eventAttendee.upsert({
        where: { userId_eventId: { userId: req.user.id, eventId } },
        create: { userId: req.user.id, eventId, status },
        update: { status }
      });
    }

    res.json({ success: true, eventId, status });
  } catch (error) {
    next(error);
  }
});

// ============================================
// COURSES ROUTES
// ============================================

app.get('/courses', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { category, level, limit = 20, offset = 0 } = req.query;

    const where = {
      ...(category && { category }),
      ...(level && { level })
    };

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: { select: { lessons: true, enrollments: true } },
        enrollments: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(courses.map((c) => {
      const enrollment = req.user && c.enrollments.length > 0 ? c.enrollments[0] : null;
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        level: c.level,
        thumbnailUrl: c.thumbnailUrl,
        duration: c.duration,
        ceCredits: c.ceCredits,
        ceType: c.ceType,
        instructorName: c.instructorName,
        lessonCount: c._count.lessons,
        enrollmentCount: c._count.enrollments,
        enrolled: !!enrollment,
        progress: enrollment?.progress || 0,
        status: enrollment?.status || 'not-enrolled',
        createdAt: c.createdAt
      };
    }));
  } catch (error) {
    next(error);
  }
});

app.get('/courses/:id', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: { orderBy: { orderIndex: 'asc' } },
        _count: { select: { lessons: true, enrollments: true } },
        enrollments: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      }
    });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = req.user && course.enrollments.length > 0 ? course.enrollments[0] : null;

    res.json({
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      thumbnailUrl: course.thumbnailUrl,
      duration: course.duration,
      ceCredits: course.ceCredits,
      ceType: course.ceType,
      instructorName: course.instructorName,
      lessonCount: course._count.lessons,
      enrollmentCount: course._count.enrollments,
      enrolled: !!enrollment,
      progress: enrollment?.progress || 0,
      status: enrollment?.status || 'not-enrolled',
      lessons: course.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        description: l.description,
        contentUrl: l.contentUrl,
        contentType: l.contentType,
        duration: l.duration,
        orderIndex: l.orderIndex
      })),
      createdAt: course.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/courses/:id/enroll', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);
    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: req.user.id, courseId } },
      update: { status: 'enrolled' },
      create: { userId: req.user.id, courseId }
    });

    // Award XP for enrolling
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 25 } }
    });

    res.json(enrollment);
  } catch (error) {
    next(error);
  }
});

app.post('/courses/:id/progress', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);
    const { progress } = req.body;

    const previousEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: req.user.id, courseId } },
      update: {
        progress: progress ?? 0,
        status: progress >= 100 ? 'completed' : 'enrolled',
        completedAt: progress >= 100 ? new Date() : null
      },
      create: { userId: req.user.id, courseId, progress: progress ?? 0 }
    });

    // Award XP for course completion
    if (progress >= 100 && (!previousEnrollment || previousEnrollment.progress < 100)) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { xp: { increment: 100 } }
      });

      // Create achievement
      await prisma.achievement.create({
        data: {
          userId: req.user.id,
          type: 'course_completed',
          name: 'Course Completed',
          description: 'Completed a course',
          points: 100
        }
      });
    }

    res.json(enrollment);
  } catch (error) {
    next(error);
  }
});

// ============================================
// LESSON PROGRESS ROUTES
// ============================================

// Get lesson with progress data
app.get('/courses/:courseId/lessons/:lessonId', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessonId = parseInt(req.params.lessonId);

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, courseId }
    });

    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    // Get enrollment and lesson progress
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } },
      include: {
        lessonProgress: { where: { lessonId } }
      }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    const progress = enrollment.lessonProgress[0] || null;

    res.json({
      id: lesson.id,
      courseId: lesson.courseId,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      contentUrl: lesson.contentUrl,
      contentType: lesson.contentType,
      duration: lesson.duration,
      orderIndex: lesson.orderIndex,
      quizData: lesson.quizData ? JSON.parse(lesson.quizData) : null,
      completed: progress?.completed || false,
      completedAt: progress?.completedAt || null,
      watchTime: progress?.watchTime || 0
    });
  } catch (error) {
    next(error);
  }
});

// Mark lesson as complete
app.post('/courses/:courseId/lessons/:lessonId/complete', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessonId = parseInt(req.params.lessonId);
    const { watchTime } = req.body;

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Create or update lesson progress
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId } },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        completed: true,
        completedAt: new Date(),
        watchTime: watchTime || 0
      },
      update: {
        completed: true,
        completedAt: new Date(),
        watchTime: watchTime || 0
      }
    });

    // Recalculate course progress
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: true }
    });

    const completedLessons = await prisma.lessonProgress.count({
      where: { enrollmentId: enrollment.id, completed: true }
    });

    const totalLessons = course.lessons.length;
    const newProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { progress: newProgress }
    });

    // Award XP for completing a lesson
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 10 } }
    });

    res.json({
      lessonProgress,
      courseProgress: newProgress,
      completedLessons,
      totalLessons
    });
  } catch (error) {
    next(error);
  }
});

// Update lesson watch time (for video progress tracking)
app.post('/courses/:courseId/lessons/:lessonId/watchtime', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessonId = parseInt(req.params.lessonId);
    const { watchTime } = req.body;

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    const lessonProgress = await prisma.lessonProgress.upsert({
      where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId } },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        watchTime: watchTime || 0
      },
      update: {
        watchTime: watchTime || 0
      }
    });

    res.json(lessonProgress);
  } catch (error) {
    next(error);
  }
});

// ============================================
// QUIZ ROUTES
// ============================================

// Get quiz status for a lesson
app.get('/courses/:courseId/lessons/:lessonId/quiz/status', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessonId = parseInt(req.params.lessonId);

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    const quizResults = await prisma.quizResult.findMany({
      where: { enrollmentId: enrollment.id, lessonId },
      orderBy: { completedAt: 'desc' }
    });

    const bestResult = quizResults.reduce((best, current) => {
      return (current.score > (best?.score || 0)) ? current : best;
    }, null);

    res.json({
      attempts: quizResults.length,
      bestScore: bestResult?.score || 0,
      passed: bestResult?.passed || false,
      lastAttempt: quizResults[0] || null,
      results: quizResults
    });
  } catch (error) {
    next(error);
  }
});

// Submit quiz results
app.post('/courses/:courseId/lessons/:lessonId/quiz/submit', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessonId = parseInt(req.params.lessonId);
    const { score, answers } = req.body;

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Get attempt number
    const previousAttempts = await prisma.quizResult.count({
      where: { enrollmentId: enrollment.id, lessonId }
    });

    const passed = score >= 70;

    const quizResult = await prisma.quizResult.create({
      data: {
        enrollmentId: enrollment.id,
        lessonId,
        score,
        passed,
        answers: JSON.stringify(answers || {}),
        attemptNumber: previousAttempts + 1
      }
    });

    // If passed, mark lesson as complete
    if (passed) {
      await prisma.lessonProgress.upsert({
        where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId } },
        create: {
          enrollmentId: enrollment.id,
          lessonId,
          completed: true,
          completedAt: new Date()
        },
        update: {
          completed: true,
          completedAt: new Date()
        }
      });

      // Recalculate course progress
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: { lessons: true }
      });

      const completedLessons = await prisma.lessonProgress.count({
        where: { enrollmentId: enrollment.id, completed: true }
      });

      const newProgress = course.lessons.length > 0
        ? Math.round((completedLessons / course.lessons.length) * 100)
        : 0;

      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { progress: newProgress }
      });

      // Award XP for passing quiz
      await prisma.user.update({
        where: { id: req.user.id },
        data: { xp: { increment: 25 } }
      });
    }

    res.status(201).json({
      ...quizResult,
      answers: JSON.parse(quizResult.answers)
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// COURSE COMPLETION & CREDENTIALS ROUTES
// ============================================

// Helper function to generate certificate ID
const generateCertificateId = () => {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `GSAPS-${year}-${code}`;
};

// Complete course and generate credential
app.post('/courses/:id/complete', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);

    // Get course with lessons
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: true }
    });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Get enrollment with progress
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } },
      include: {
        lessonProgress: true,
        quizResults: true
      }
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Verify all lessons completed
    const completedLessonIds = enrollment.lessonProgress
      .filter(lp => lp.completed)
      .map(lp => lp.lessonId);

    const allLessonsCompleted = course.lessons.every(lesson =>
      completedLessonIds.includes(lesson.id)
    );

    if (!allLessonsCompleted) {
      return res.status(400).json({
        message: 'Not all lessons completed',
        completedLessons: completedLessonIds.length,
        totalLessons: course.lessons.length
      });
    }

    // Verify quiz lessons passed
    const quizLessons = course.lessons.filter(l => l.contentType === 'quiz');
    for (const quizLesson of quizLessons) {
      const quizPassed = enrollment.quizResults.some(
        qr => qr.lessonId === quizLesson.id && qr.passed
      );
      if (!quizPassed) {
        return res.status(400).json({
          message: `Quiz not passed: ${quizLesson.title}`,
          lessonId: quizLesson.id
        });
      }
    }

    // Get best quiz score for the course
    const bestQuizScore = enrollment.quizResults.reduce((best, current) => {
      return Math.max(best, current.score);
    }, 0);

    // Check if credential already exists
    let credential = await prisma.credential.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    if (!credential) {
      // Generate certificate
      const certificateId = generateCertificateId();
      const verificationUrl = `/verify/${certificateId}`;

      credential = await prisma.credential.create({
        data: {
          userId: req.user.id,
          courseId,
          certificateId,
          score: bestQuizScore,
          ceCredits: course.ceCredits,
          ceType: course.ceType,
          verificationUrl
        }
      });

      // Update enrollment status
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          status: 'completed',
          progress: 100,
          completedAt: new Date()
        }
      });

      // Award XP for course completion
      await prisma.user.update({
        where: { id: req.user.id },
        data: { xp: { increment: 100 } }
      });

      // Create achievement
      await prisma.achievement.create({
        data: {
          userId: req.user.id,
          type: 'course_completed',
          name: `Completed: ${course.title}`,
          description: `Earned certificate for ${course.title}`,
          points: 100
        }
      });
    }

    // Get user details for response
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    res.json({
      credential: {
        id: credential.id,
        certificateId: credential.certificateId,
        score: credential.score,
        ceCredits: credential.ceCredits,
        ceType: credential.ceType,
        issuedAt: credential.issuedAt,
        verificationUrl: credential.verificationUrl
      },
      course: {
        id: course.id,
        title: course.title,
        instructorName: course.instructorName
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// Public credential verification
app.get('/verify/:certificateId', async (req, res, next) => {
  try {
    const { certificateId } = req.params;

    const credential = await prisma.credential.findUnique({
      where: { certificateId },
      include: {
        user: true,
        course: true
      }
    });

    if (!credential) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({
      verified: true,
      certificateId: credential.certificateId,
      issuedAt: credential.issuedAt,
      recipient: {
        name: credential.user.name
      },
      course: {
        title: credential.course.title,
        instructorName: credential.course.instructorName
      },
      ceCredits: credential.ceCredits,
      ceType: credential.ceType,
      score: credential.score
    });
  } catch (error) {
    next(error);
  }
});

// Get user's credentials (CE transcript)
app.get('/users/:id/credentials', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Only allow users to see their own credentials or if they're an admin
    if (!req.user || (req.user.id !== userId && req.user.role !== 'administrator')) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const credentials = await prisma.credential.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { issuedAt: 'desc' }
    });

    // Calculate CE credit totals by type
    const ceTotals = credentials.reduce((acc, cred) => {
      if (cred.ceCredits && cred.ceType) {
        acc[cred.ceType] = (acc[cred.ceType] || 0) + cred.ceCredits;
        acc.total = (acc.total || 0) + cred.ceCredits;
      }
      return acc;
    }, { total: 0 });

    res.json({
      credentials: credentials.map(c => ({
        id: c.id,
        certificateId: c.certificateId,
        course: {
          id: c.course.id,
          title: c.course.title,
          instructorName: c.course.instructorName
        },
        score: c.score,
        ceCredits: c.ceCredits,
        ceType: c.ceType,
        issuedAt: c.issuedAt,
        verificationUrl: c.verificationUrl
      })),
      ceTotals
    });
  } catch (error) {
    next(error);
  }
});

// Get enrollment details with all progress data
app.get('/courses/:id/enrollment', authMiddleware, async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } },
      include: {
        course: {
          include: { lessons: { orderBy: { orderIndex: 'asc' } } }
        },
        lessonProgress: true,
        quizResults: true
      }
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' });
    }

    // Check if credential exists
    const credential = await prisma.credential.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId } }
    });

    res.json({
      id: enrollment.id,
      courseId: enrollment.courseId,
      status: enrollment.status,
      progress: enrollment.progress,
      startedAt: enrollment.startedAt,
      completedAt: enrollment.completedAt,
      credential: credential ? {
        certificateId: credential.certificateId,
        issuedAt: credential.issuedAt,
        verificationUrl: credential.verificationUrl
      } : null,
      lessons: enrollment.course.lessons.map(lesson => {
        const progress = enrollment.lessonProgress.find(lp => lp.lessonId === lesson.id);
        const quizResult = enrollment.quizResults
          .filter(qr => qr.lessonId === lesson.id)
          .sort((a, b) => b.score - a.score)[0];

        return {
          id: lesson.id,
          title: lesson.title,
          contentType: lesson.contentType,
          duration: lesson.duration,
          orderIndex: lesson.orderIndex,
          completed: progress?.completed || false,
          completedAt: progress?.completedAt || null,
          watchTime: progress?.watchTime || 0,
          quizPassed: quizResult?.passed || false,
          quizScore: quizResult?.score || null,
          quizAttempts: enrollment.quizResults.filter(qr => qr.lessonId === lesson.id).length
        };
      })
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// RESEARCH ASSETS ROUTES
// ============================================

app.get('/assets', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { type, search, limit = 20, offset = 0 } = req.query;

    const where = {
      ...(type && { type }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { abstract: { contains: search } }
        ]
      })
    };

    const assets = await prisma.researchAsset.findMany({
      where,
      include: {
        owner: true,
        reviews: true,
        _count: { select: { reviews: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(assets.map((a) => {
      const avgRating = a.reviews.length > 0
        ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
        : 0;

      return {
        id: a.id,
        title: a.title,
        description: a.description,
        url: a.url,
        type: a.type,
        authors: parseJsonField(a.authors),
        publishedDate: a.publishedDate,
        journal: a.journal,
        doi: a.doi,
        abstract: a.abstract,
        keywords: parseJsonField(a.keywords),
        citationCount: a.citationCount,
        downloadCount: a.downloadCount,
        reviewCount: a._count.reviews,
        averageRating: Math.round(avgRating * 10) / 10,
        owner: {
          id: a.owner.id,
          name: a.owner.name,
          username: a.owner.username,
          avatar: a.owner.avatarUrl
        },
        createdAt: a.createdAt
      };
    }));
  } catch (error) {
    next(error);
  }
});

app.get('/assets/:id', optionalAuthMiddleware, async (req, res, next) => {
  // Skip if 'id' is 'search' - let the search route handle it
  if (req.params.id === 'search') {
    return next('route');
  }
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid asset ID' });
    }
    const asset = await prisma.researchAsset.findUnique({
      where: { id },
      include: {
        owner: true,
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!asset) return res.status(404).json({ message: 'Asset not found' });

    const avgRating = asset.reviews.length > 0
      ? asset.reviews.reduce((sum, r) => sum + r.rating, 0) / asset.reviews.length
      : 0;

    res.json({
      id: asset.id,
      title: asset.title,
      description: asset.description,
      url: asset.url,
      type: asset.type,
      authors: parseJsonField(asset.authors),
      publishedDate: asset.publishedDate,
      journal: asset.journal,
      doi: asset.doi,
      abstract: asset.abstract,
      keywords: parseJsonField(asset.keywords),
      citationCount: asset.citationCount,
      downloadCount: asset.downloadCount,
      reviewCount: asset.reviews.length,
      averageRating: Math.round(avgRating * 10) / 10,
      owner: {
        id: asset.owner.id,
        name: asset.owner.name,
        username: asset.owner.username,
        avatar: asset.owner.avatarUrl
      },
      reviews: asset.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        review: r.review,
        user: {
          id: r.user.id,
          name: r.user.name,
          username: r.user.username,
          avatar: r.user.avatarUrl
        },
        createdAt: r.createdAt
      })),
      createdAt: asset.createdAt
    });
  } catch (error) {
    next(error);
  }
});

app.post('/assets', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, url, type, authors = [], publishedDate, journal, doi, abstract, keywords = [] } = req.body;
    if (!title || !url || !type) {
      return res.status(400).json({ message: 'Title, url and type required' });
    }

    const asset = await prisma.researchAsset.create({
      data: {
        title,
        description: description || '',
        url,
        type,
        authors: JSON.stringify(authors),
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        journal,
        doi,
        abstract,
        keywords: JSON.stringify(keywords),
        ownerId: req.user.id
      },
      include: { owner: true }
    });

    // Award XP for sharing research
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 20 } }
    });

    res.status(201).json({
      id: asset.id,
      title: asset.title,
      description: asset.description,
      url: asset.url,
      type: asset.type,
      authors: parseJsonField(asset.authors),
      publishedDate: asset.publishedDate,
      journal: asset.journal,
      doi: asset.doi,
      abstract: asset.abstract,
      keywords: parseJsonField(asset.keywords),
      citationCount: 0,
      downloadCount: 0,
      reviewCount: 0,
      averageRating: 0,
      owner: {
        id: asset.owner.id,
        name: asset.owner.name,
        username: asset.owner.username,
        avatar: asset.owner.avatarUrl
      },
      createdAt: asset.createdAt
    });
  } catch (error) {
    next(error);
  }
});

// GET reviews for a paper
app.get('/assets/:id/reviews', async (req, res, next) => {
  try {
    const assetId = parseInt(req.params.id);

    const reviews = await prisma.paperReview.findMany({
      where: { assetId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            credentials: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(reviews.map(r => ({
      id: r.id,
      userId: r.userId,
      rating: r.rating,
      text: r.review,
      createdAt: r.createdAt,
      user: r.user
    })));
  } catch (error) {
    next(error);
  }
});

// POST (create/update) a review for a paper
app.post('/assets/:id/reviews', authMiddleware, async (req, res, next) => {
  try {
    const assetId = parseInt(req.params.id);
    const { rating, review, text } = req.body;
    const reviewText = text || review; // Accept both field names
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating (1-5) required' });
    }

    const paperReview = await prisma.paperReview.upsert({
      where: { assetId_userId: { assetId, userId: req.user.id } },
      create: { assetId, userId: req.user.id, rating, review: reviewText },
      update: { rating, review: reviewText },
      include: { user: true }
    });

    res.status(201).json({
      id: paperReview.id,
      rating: paperReview.rating,
      review: paperReview.review,
      user: {
        id: paperReview.user.id,
        name: paperReview.user.name,
        username: paperReview.user.username,
        avatar: paperReview.user.avatarUrl
      },
      createdAt: paperReview.createdAt
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// ADVANCED SEARCH ROUTES
// ============================================

// Calculate relevance score for search results
const calculateRelevanceScore = (asset, query, queryWords) => {
  const lowerQuery = query.toLowerCase();
  const title = asset.title.toLowerCase();
  const abstract = (asset.abstract || '').toLowerCase();
  const keywords = parseJsonField(asset.keywords);
  const topics = parseJsonField(asset.topics);

  let score = 0;

  // Exact title match - highest weight
  if (title === lowerQuery) score += 100;
  // Title contains query
  else if (title.includes(lowerQuery)) score += 50;

  // Word matches in title
  queryWords.forEach(word => {
    if (title.includes(word)) score += 20;
  });

  // Abstract matches
  queryWords.forEach(word => {
    if (abstract.includes(word)) score += 5;
  });

  // Keyword exact matches
  keywords.forEach(kw => {
    if (kw.toLowerCase() === lowerQuery) score += 30;
    else if (queryWords.some(w => kw.toLowerCase().includes(w))) score += 15;
  });

  // Topic matches
  topics.forEach(topic => {
    if (topic.toLowerCase() === lowerQuery) score += 25;
    else if (queryWords.some(w => topic.toLowerCase().includes(w))) score += 10;
  });

  // Citation boost (normalized)
  score += Math.min(asset.citationCount * 0.1, 20);

  // Recency boost (papers < 2 years old)
  const publishedDate = asset.publishedDate ? new Date(asset.publishedDate) : new Date(asset.createdAt);
  const yearsOld = (Date.now() - publishedDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (yearsOld < 2) score += 10;

  return Math.round(score);
};

app.get('/assets/search', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const {
      q,
      topics,
      researchType,
      methodology,
      journal,
      yearFrom,
      yearTo,
      openAccess,
      sortBy = 'relevance',
      limit = 20,
      offset = 0
    } = req.query;

    const where = {};

    // Topic filter
    if (topics) {
      const topicList = topics.split(',').map(t => t.trim());
      where.OR = topicList.map(topic => ({
        topics: { contains: topic }
      }));
    }

    // Research type filter
    if (researchType) {
      const types = researchType.split(',').map(t => t.trim());
      where.researchType = { in: types };
    }

    // Methodology filter
    if (methodology) {
      const methods = methodology.split(',').map(m => m.trim());
      where.methodology = { in: methods };
    }

    // Journal filter
    if (journal) {
      where.journal = { contains: journal };
    }

    // Year range filter
    if (yearFrom || yearTo) {
      where.publishedDate = {};
      if (yearFrom) where.publishedDate.gte = new Date(`${yearFrom}-01-01`);
      if (yearTo) where.publishedDate.lte = new Date(`${yearTo}-12-31`);
    }

    // Open access filter
    if (openAccess === 'true') {
      where.openAccess = true;
    }

    // Text search
    if (q) {
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { title: { contains: q } },
          { abstract: { contains: q } },
          { keywords: { contains: q } },
          { searchIndex: { contains: q } }
        ]
      });
    }

    let assets = await prisma.researchAsset.findMany({
      where,
      include: {
        owner: true,
        reviews: true,
        _count: { select: { reviews: true, comments: true } }
      },
      take: parseInt(limit) * 5, // Get more for relevance sorting
      skip: 0
    });

    // Calculate relevance scores if searching
    if (q) {
      const queryWords = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      assets = assets.map(asset => ({
        ...asset,
        relevanceScore: calculateRelevanceScore(asset, q, queryWords)
      }));
    }

    // Sort results
    switch (sortBy) {
      case 'relevance':
        assets.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        break;
      case 'citations':
        assets.sort((a, b) => b.citationCount - a.citationCount);
        break;
      case 'recent':
        assets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'downloads':
        assets.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
    }

    // Apply pagination
    const paginatedAssets = assets.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
      results: paginatedAssets.map(a => {
        const avgRating = a.reviews.length > 0
          ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
          : 0;

        return {
          id: a.id,
          title: a.title,
          description: a.description,
          url: a.url,
          type: a.type,
          authors: parseJsonField(a.authors),
          publishedDate: a.publishedDate,
          journal: a.journal,
          volume: a.volume,
          issue: a.issue,
          pages: a.pages,
          doi: a.doi,
          pmid: a.pmid,
          abstract: a.abstract,
          keywords: parseJsonField(a.keywords),
          topics: parseJsonField(a.topics),
          researchType: a.researchType,
          methodology: a.methodology,
          sampleSize: a.sampleSize,
          openAccess: a.openAccess,
          peerReviewed: a.peerReviewed,
          citationCount: a.citationCount,
          downloadCount: a.downloadCount,
          viewCount: a.viewCount,
          reviewCount: a._count.reviews,
          commentCount: a._count.comments,
          averageRating: Math.round(avgRating * 10) / 10,
          relevanceScore: a.relevanceScore || null,
          owner: {
            id: a.owner.id,
            name: a.owner.name,
            username: a.owner.username,
            avatar: a.owner.avatarUrl
          },
          createdAt: a.createdAt
        };
      }),
      total: assets.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// PAPER COLLECTIONS ROUTES
// ============================================

// Get user's collections
app.get('/collections', authMiddleware, async (req, res, next) => {
  try {
    const { includePublic } = req.query;

    let where = { ownerId: req.user.id };

    if (includePublic === 'true') {
      where = {
        OR: [
          { ownerId: req.user.id },
          { isPublic: true }
        ]
      };
    }

    const collections = await prisma.paperCollection.findMany({
      where,
      include: {
        owner: true,
        _count: { select: { items: true, followers: true } },
        followers: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(collections.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      isPublic: c.isPublic,
      coverUrl: c.coverUrl,
      paperCount: c._count.items,
      followerCount: c._count.followers,
      isFollowing: c.followers ? c.followers.length > 0 : false,
      isOwner: c.ownerId === req.user.id,
      owner: {
        id: c.owner.id,
        name: c.owner.name,
        username: c.owner.username,
        avatar: c.owner.avatarUrl
      },
      createdAt: c.createdAt,
      updatedAt: c.updatedAt
    })));
  } catch (error) {
    next(error);
  }
});

// Browse public collections
app.get('/collections/public', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, search } = req.query;

    const where = {
      isPublic: true,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      })
    };

    const collections = await prisma.paperCollection.findMany({
      where,
      include: {
        owner: true,
        _count: { select: { items: true, followers: true } },
        followers: req.user ? {
          where: { userId: req.user.id },
          take: 1
        } : false
      },
      orderBy: { updatedAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(collections.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      isPublic: c.isPublic,
      coverUrl: c.coverUrl,
      paperCount: c._count.items,
      followerCount: c._count.followers,
      isFollowing: req.user && c.followers ? c.followers.length > 0 : false,
      isOwner: req.user ? c.ownerId === req.user.id : false,
      owner: {
        id: c.owner.id,
        name: c.owner.name,
        username: c.owner.username,
        avatar: c.owner.avatarUrl
      },
      createdAt: c.createdAt,
      updatedAt: c.updatedAt
    })));
  } catch (error) {
    next(error);
  }
});

// Get single collection with papers
app.get('/collections/:id', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const collection = await prisma.paperCollection.findUnique({
      where: { id },
      include: {
        owner: true,
        items: {
          include: {
            asset: {
              include: {
                owner: true,
                reviews: true,
                _count: { select: { reviews: true, comments: true } }
              }
            }
          },
          orderBy: { orderIndex: 'asc' }
        },
        followers: {
          include: { user: true },
          take: 20
        },
        _count: { select: { items: true, followers: true } }
      }
    });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Check access for private collections
    if (!collection.isPublic && (!req.user || collection.ownerId !== req.user.id)) {
      return res.status(403).json({ message: 'This collection is private' });
    }

    const isFollowing = req.user
      ? collection.followers.some(f => f.userId === req.user.id)
      : false;

    res.json({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isPublic: collection.isPublic,
      coverUrl: collection.coverUrl,
      paperCount: collection._count.items,
      followerCount: collection._count.followers,
      isFollowing,
      isOwner: req.user ? collection.ownerId === req.user.id : false,
      owner: {
        id: collection.owner.id,
        name: collection.owner.name,
        username: collection.owner.username,
        avatar: collection.owner.avatarUrl
      },
      papers: collection.items.map(item => {
        const a = item.asset;
        const avgRating = a.reviews.length > 0
          ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
          : 0;

        return {
          id: a.id,
          title: a.title,
          authors: parseJsonField(a.authors),
          journal: a.journal,
          publishedDate: a.publishedDate,
          doi: a.doi,
          abstract: a.abstract,
          topics: parseJsonField(a.topics),
          citationCount: a.citationCount,
          averageRating: Math.round(avgRating * 10) / 10,
          notes: item.notes,
          addedAt: item.addedAt
        };
      }),
      followers: collection.followers.map(f => ({
        id: f.user.id,
        name: f.user.name,
        username: f.user.username,
        avatar: f.user.avatarUrl
      })),
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt
    });
  } catch (error) {
    next(error);
  }
});

// Create collection
app.post('/collections', authMiddleware, async (req, res, next) => {
  try {
    const { name, description, isPublic = false, coverUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const collection = await prisma.paperCollection.create({
      data: {
        name,
        description,
        isPublic,
        coverUrl,
        ownerId: req.user.id
      },
      include: { owner: true }
    });

    // Award XP for creating collection
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: 15 } }
    });

    res.status(201).json({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isPublic: collection.isPublic,
      coverUrl: collection.coverUrl,
      paperCount: 0,
      followerCount: 0,
      isFollowing: false,
      isOwner: true,
      owner: {
        id: collection.owner.id,
        name: collection.owner.name,
        username: collection.owner.username,
        avatar: collection.owner.avatarUrl
      },
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt
    });
  } catch (error) {
    next(error);
  }
});

// Update collection
app.patch('/collections/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, isPublic, coverUrl } = req.body;

    const collection = await prisma.paperCollection.findUnique({ where: { id } });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await prisma.paperCollection.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isPublic !== undefined && { isPublic }),
        ...(coverUrl !== undefined && { coverUrl })
      },
      include: { owner: true, _count: { select: { items: true, followers: true } } }
    });

    res.json({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      isPublic: updated.isPublic,
      coverUrl: updated.coverUrl,
      paperCount: updated._count.items,
      followerCount: updated._count.followers,
      isOwner: true,
      owner: {
        id: updated.owner.id,
        name: updated.owner.name,
        username: updated.owner.username,
        avatar: updated.owner.avatarUrl
      },
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });
  } catch (error) {
    next(error);
  }
});

// Delete collection
app.delete('/collections/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const collection = await prisma.paperCollection.findUnique({ where: { id } });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.paperCollection.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Add paper to collection
app.post('/collections/:id/papers', authMiddleware, async (req, res, next) => {
  try {
    const collectionId = parseInt(req.params.id);
    const { assetId, notes } = req.body;

    if (!assetId) {
      return res.status(400).json({ message: 'assetId is required' });
    }

    const collection = await prisma.paperCollection.findUnique({ where: { id: collectionId } });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get current max order index
    const maxOrder = await prisma.paperCollectionItem.aggregate({
      where: { collectionId },
      _max: { orderIndex: true }
    });

    const item = await prisma.paperCollectionItem.create({
      data: {
        collectionId,
        assetId: parseInt(assetId),
        notes,
        orderIndex: (maxOrder._max.orderIndex || 0) + 1
      },
      include: { asset: true }
    });

    res.status(201).json({
      id: item.id,
      assetId: item.assetId,
      paper: {
        id: item.asset.id,
        title: item.asset.title,
        authors: parseJsonField(item.asset.authors),
        journal: item.asset.journal
      },
      notes: item.notes,
      orderIndex: item.orderIndex,
      addedAt: item.addedAt
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Paper already in collection' });
    }
    next(error);
  }
});

// Update paper notes in collection
app.patch('/collections/:id/papers/:assetId', authMiddleware, async (req, res, next) => {
  try {
    const collectionId = parseInt(req.params.id);
    const assetId = parseInt(req.params.assetId);
    const { notes } = req.body;

    const collection = await prisma.paperCollection.findUnique({ where: { id: collectionId } });

    if (!collection || collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const item = await prisma.paperCollectionItem.update({
      where: { collectionId_assetId: { collectionId, assetId } },
      data: { notes }
    });

    res.json({
      id: item.id,
      assetId: item.assetId,
      notes: item.notes,
      orderIndex: item.orderIndex,
      addedAt: item.addedAt
    });
  } catch (error) {
    next(error);
  }
});

// Remove paper from collection
app.delete('/collections/:id/papers/:assetId', authMiddleware, async (req, res, next) => {
  try {
    const collectionId = parseInt(req.params.id);
    const assetId = parseInt(req.params.assetId);

    const collection = await prisma.paperCollection.findUnique({ where: { id: collectionId } });

    if (!collection || collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.paperCollectionItem.delete({
      where: { collectionId_assetId: { collectionId, assetId } }
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Follow collection
app.post('/collections/:id/follow', authMiddleware, async (req, res, next) => {
  try {
    const collectionId = parseInt(req.params.id);

    const collection = await prisma.paperCollection.findUnique({ where: { id: collectionId } });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (!collection.isPublic && collection.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Cannot follow private collection' });
    }

    await prisma.collectionFollower.create({
      data: { collectionId, userId: req.user.id }
    });

    res.json({ success: true, isFollowing: true });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.json({ success: true, isFollowing: true }); // Already following
    }
    next(error);
  }
});

// Unfollow collection
app.delete('/collections/:id/follow', authMiddleware, async (req, res, next) => {
  try {
    const collectionId = parseInt(req.params.id);

    await prisma.collectionFollower.delete({
      where: { collectionId_userId: { collectionId, userId: req.user.id } }
    }).catch(() => {});

    res.json({ success: true, isFollowing: false });
  } catch (error) {
    next(error);
  }
});

// ============================================
// PAPER DISCUSSION (COMMENTS) ROUTES
// ============================================

// Get comments for an asset
app.get('/assets/:id/comments', optionalAuthMiddleware, async (req, res, next) => {
  try {
    const assetId = parseInt(req.params.id);

    const comments = await prisma.paperComment.findMany({
      where: { assetId, parentId: null },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(comments.map(c => ({
      id: c.id,
      content: c.content,
      user: {
        id: c.user.id,
        name: c.user.name,
        username: c.user.username,
        avatar: c.user.avatarUrl,
        credentials: c.user.credentials,
        verified: c.user.verified
      },
      likeCount: c.likes.length,
      isLiked: req.user ? c.likes.some(l => l.userId === req.user.id) : false,
      replies: c.replies.map(r => ({
        id: r.id,
        content: r.content,
        user: {
          id: r.user.id,
          name: r.user.name,
          username: r.user.username,
          avatar: r.user.avatarUrl,
          credentials: r.user.credentials,
          verified: r.user.verified
        },
        likeCount: r.likes.length,
        isLiked: req.user ? r.likes.some(l => l.userId === req.user.id) : false,
        createdAt: r.createdAt
      })),
      createdAt: c.createdAt
    })));
  } catch (error) {
    next(error);
  }
});

// Post comment on asset
app.post('/assets/:id/comments', authMiddleware, async (req, res, next) => {
  try {
    const assetId = parseInt(req.params.id);
    const { content, parentId } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const comment = await prisma.paperComment.create({
      data: {
        assetId,
        userId: req.user.id,
        content,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: { user: true }
    });

    // Update comment count on asset
    await prisma.researchAsset.update({
      where: { id: assetId },
      data: { commentCount: { increment: 1 } }
    });

    // Award XP for commenting
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: parentId ? 5 : 10 } }
    });

    res.status(201).json({
      id: comment.id,
      content: comment.content,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        username: comment.user.username,
        avatar: comment.user.avatarUrl,
        credentials: comment.user.credentials,
        verified: comment.user.verified
      },
      likeCount: 0,
      isLiked: false,
      replies: [],
      createdAt: comment.createdAt
    });
  } catch (error) {
    next(error);
  }
});

// Update comment
app.patch('/assets/comments/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { content } = req.body;

    const comment = await prisma.paperComment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await prisma.paperComment.update({
      where: { id },
      data: { content },
      include: { user: true }
    });

    res.json({
      id: updated.id,
      content: updated.content,
      user: {
        id: updated.user.id,
        name: updated.user.name,
        username: updated.user.username,
        avatar: updated.user.avatarUrl
      },
      updatedAt: updated.updatedAt
    });
  } catch (error) {
    next(error);
  }
});

// Delete comment
app.delete('/assets/comments/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const comment = await prisma.paperComment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.user.id && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.paperComment.delete({ where: { id } });

    // Update comment count on asset
    await prisma.researchAsset.update({
      where: { id: comment.assetId },
      data: { commentCount: { decrement: 1 } }
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Like/unlike comment
app.post('/assets/comments/:id/like', authMiddleware, async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.id);

    const existing = await prisma.paperCommentLike.findUnique({
      where: { commentId_userId: { commentId, userId: req.user.id } }
    });

    if (existing) {
      await prisma.paperCommentLike.delete({ where: { id: existing.id } });
      res.json({ success: true, isLiked: false });
    } else {
      await prisma.paperCommentLike.create({
        data: { commentId, userId: req.user.id }
      });
      res.json({ success: true, isLiked: true });
    }
  } catch (error) {
    next(error);
  }
});

// ============================================
// GAMIFICATION ROUTES
// ============================================

app.get('/gamification', authMiddleware, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { achievements: { orderBy: { createdAt: 'desc' } } }
    });

    const totalPoints = user.achievements.reduce((sum, a) => sum + a.points, 0);

    res.json({
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      totalPoints,
      achievements: user.achievements.map((a) => ({
        id: a.id,
        type: a.type,
        name: a.name,
        description: a.description,
        iconUrl: a.iconUrl,
        points: a.points,
        createdAt: a.createdAt
      }))
    });
  } catch (error) {
    next(error);
  }
});

app.get('/leaderboard', async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const users = await prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset),
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streak: true,
        verified: true,
        credentials: true
      }
    });

    res.json(users.map((u, index) => ({
      rank: parseInt(offset) + index + 1,
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatarUrl,
      xp: u.xp,
      level: u.level,
      streak: u.streak,
      verified: u.verified,
      credentials: u.credentials
    })));
  } catch (error) {
    next(error);
  }
});

app.post('/gamification/award', authMiddleware, async (req, res, next) => {
  try {
    const { type, name, description, points = 5 } = req.body;

    const achievement = await prisma.achievement.create({
      data: {
        userId: req.user.id,
        type: type || 'custom',
        name: name || 'Achievement',
        description,
        points
      }
    });

    // Update user XP
    await prisma.user.update({
      where: { id: req.user.id },
      data: { xp: { increment: points } }
    });

    res.status(201).json(achievement);
  } catch (error) {
    next(error);
  }
});

// ============================================
// NOTIFICATIONS ROUTES
// ============================================

app.get('/notifications', authMiddleware, async (req, res, next) => {
  try {
    const { unreadOnly, limit = 20, offset = 0 } = req.query;

    const where = {
      userId: req.user.id,
      ...(unreadOnly === 'true' && { read: false })
    };

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const unreadCount = await prisma.notification.count({
      where: { userId: req.user.id, read: false }
    });

    res.json({
      notifications: notifications.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        body: n.body,
        data: parseJsonField(n.data),
        read: n.read,
        createdAt: n.createdAt
      })),
      unreadCount
    });
  } catch (error) {
    next(error);
  }
});

app.post('/notifications/:id/read', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.notification.update({
      where: { id },
      data: { read: true }
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.post('/notifications/read-all', authMiddleware, async (req, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true }
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// ============================================
// ERROR HANDLERS
// ============================================

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found',
    error: 'NOT_FOUND',
    path: req.path
  });
});

app.use((err, req, res, next) => {
  if (config.isDevelopment) {
    console.error('Error:', err);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      error: 'VALIDATION_ERROR',
      details: err.details || err.message
    });
  }

  if (err.name === 'UnauthorizedError' || err.message === 'Not allowed by CORS') {
    return res.status(401).json({
      message: err.message || 'Unauthorized',
      error: 'UNAUTHORIZED'
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      message: 'Resource already exists',
      error: 'CONFLICT',
      field: err.meta?.target
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      message: 'Resource not found',
      error: 'NOT_FOUND'
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    message: config.isProduction ? 'Internal server error' : err.message,
    error: err.name || 'INTERNAL_SERVER_ERROR',
    ...(config.isDevelopment && { stack: err.stack })
  });
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received, closing server gracefully...`);

  try {
    await prisma.$disconnect();
    console.log('Database connections closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// ============================================
// START SERVER
// ============================================

app.listen(config.port, () => {
  console.log(`🚀 GSAPS API listening on port ${config.port} in ${config.nodeEnv} mode`);
  console.log(`📦 Database: SQLite (Replit compatible)`);
});
