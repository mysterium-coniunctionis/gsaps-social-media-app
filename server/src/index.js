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
  try {
    const id = parseInt(req.params.id);
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

app.post('/assets/:id/reviews', authMiddleware, async (req, res, next) => {
  try {
    const assetId = parseInt(req.params.id);
    const { rating, review } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating (1-5) required' });
    }

    const paperReview = await prisma.paperReview.upsert({
      where: { assetId_userId: { assetId, userId: req.user.id } },
      create: { assetId, userId: req.user.id, rating, review },
      update: { rating, review },
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
