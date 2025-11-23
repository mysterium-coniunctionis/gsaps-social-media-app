import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const { PORT = 4000, JWT_SECRET, CORS_ORIGINS } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const allowedOrigins = (CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json());

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2d' });

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing authorization header' });

  const [, token] = auth.split(' ');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
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
  createdAt: user.createdAt
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/register', async (req, res) => {
  const { email, username, password, name } = req.body;
  if (!email || !username || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
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
      verified: false
    }
  });

  const token = createToken(user);
  res.json({ token, user: toPublicUser(user) });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({ where: { OR: [{ email: username }, { username }] } });

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = createToken(user);
  res.json({ token, user: toPublicUser(user) });
});

app.get('/auth/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json(toPublicUser(user));
});

app.get('/posts', authMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, reactions: true },
    orderBy: { createdAt: 'desc' }
  });

  const formatted = posts.map((post) => ({
    id: post.id,
    content: post.content,
    title: post.title,
    tags: post.tags,
    timestamp: post.createdAt,
    author: {
      id: post.author.id,
      name: post.author.name,
      username: post.author.username,
      avatar: post.author.avatarUrl,
      verified: post.author.verified,
      credentials: post.author.credentials
    },
    reactions: post.reactions.map((reaction) => ({
      id: reaction.id,
      type: reaction.type,
      userId: reaction.userId
    })),
    currentUserReaction: post.reactions.find((r) => r.userId === req.user.id)?.type || null,
    comments: 0,
    shares: 0,
    isBookmarked: false
  }));

  res.json(formatted);
});

app.post('/posts', authMiddleware, async (req, res) => {
  const { content, title, tags = [] } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });

  const post = await prisma.post.create({
    data: {
      content,
      title,
      tags,
      authorId: req.user.id
    },
    include: { author: true }
  });

  res.status(201).json({
    id: post.id,
    content: post.content,
    title: post.title,
    tags: post.tags,
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
    comments: 0,
    shares: 0,
    isBookmarked: false
  });
});

app.post('/posts/:id/reactions', authMiddleware, async (req, res) => {
  const { type } = req.body;
  const postId = Number(req.params.id);
  const existing = await prisma.reaction.findFirst({ where: { postId, userId: req.user.id } });

  if (existing && (!type || type === existing.type)) {
    await prisma.reaction.delete({ where: { id: existing.id } });
  } else {
    if (existing) await prisma.reaction.delete({ where: { id: existing.id } });
    if (type) {
      await prisma.reaction.create({ data: { type, postId, userId: req.user.id } });
    }
  }

  const reactions = await prisma.reaction.findMany({ where: { postId } });
  res.json({ postId, reactions });
});

app.delete('/posts/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.authorId !== req.user.id && req.user.role !== 'administrator') {
    return res.status(403).json({ message: 'Not allowed' });
  }
  await prisma.reaction.deleteMany({ where: { postId: id } });
  await prisma.post.delete({ where: { id } });
  res.json({ success: true });
});

app.get('/messages', authMiddleware, async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: req.user.id }, { recipientId: req.user.id }] },
    include: { sender: true, recipient: true },
    orderBy: { createdAt: 'desc' }
  });

  const conversations = messages.reduce((acc, message) => {
    const participant = message.senderId === req.user.id ? message.recipient : message.sender;
    const key = participant.id;
    if (!acc[key]) {
      acc[key] = {
        id: key,
        participant: {
          id: participant.id,
          name: participant.name,
          username: participant.username,
          avatar: participant.avatarUrl
        },
        lastMessage: {
          text: message.body,
          timestamp: message.createdAt
        },
        unreadCount: 0
      };
    }
    if (!message.read && message.recipientId === req.user.id) {
      acc[key].unreadCount += 1;
    }
    return acc;
  }, {});

  res.json(Object.values(conversations));
});

app.post('/messages', authMiddleware, async (req, res) => {
  const { recipientId, body } = req.body;
  if (!recipientId || !body) return res.status(400).json({ message: 'recipientId and body are required' });

  const message = await prisma.message.create({
    data: {
      recipientId,
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
    createdAt: message.createdAt
  });
});

app.get('/courses', authMiddleware, async (req, res) => {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
  const enrollments = await prisma.enrollment.findMany({ where: { userId: req.user.id } });
  const enriched = courses.map((course) => {
    const enrollment = enrollments.find((enr) => enr.courseId === course.id);
    return {
      ...course,
      enrolled: Boolean(enrollment),
      progress: enrollment?.progress || 0,
      status: enrollment?.status || 'not-enrolled'
    };
  });
  res.json(enriched);
});

app.post('/courses/:id/enroll', authMiddleware, async (req, res) => {
  const courseId = Number(req.params.id);
  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: req.user.id, courseId } },
    update: { status: 'enrolled' },
    create: { userId: req.user.id, courseId }
  });
  res.json(enrollment);
});

app.post('/courses/:id/progress', authMiddleware, async (req, res) => {
  const courseId = Number(req.params.id);
  const { progress } = req.body;
  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: req.user.id, courseId } },
    update: { progress: progress ?? 0 },
    create: { userId: req.user.id, courseId, progress: progress ?? 0 }
  });
  res.json(enrollment);
});

app.get('/gamification', authMiddleware, async (req, res) => {
  const achievements = await prisma.achievement.findMany({ where: { userId: req.user.id } });
  const points = achievements.reduce((sum, a) => sum + a.points, 0);
  res.json({ achievements, points });
});

app.post('/gamification/award', authMiddleware, async (req, res) => {
  const { type, points = 5 } = req.body;
  const achievement = await prisma.achievement.create({ data: { userId: req.user.id, type, points } });
  res.status(201).json(achievement);
});

app.get('/assets', authMiddleware, async (req, res) => {
  const assets = await prisma.researchAsset.findMany({
    include: { owner: true },
    orderBy: { createdAt: 'desc' }
  });
  const formatted = assets.map((asset) => ({
    id: asset.id,
    title: asset.title,
    description: asset.description,
    url: asset.url,
    type: asset.type,
    owner: {
      id: asset.owner.id,
      name: asset.owner.name,
      username: asset.owner.username,
      avatar: asset.owner.avatarUrl
    },
    createdAt: asset.createdAt
  }));
  res.json(formatted);
});

app.post('/assets', authMiddleware, async (req, res) => {
  const { title, description, url, type } = req.body;
  if (!title || !url || !type) return res.status(400).json({ message: 'Missing required fields' });

  const asset = await prisma.researchAsset.create({
    data: {
      title,
      description,
      url,
      type,
      ownerId: req.user.id
    },
    include: { owner: true }
  });

  res.status(201).json({
    id: asset.id,
    title: asset.title,
    description: asset.description,
    url: asset.url,
    type: asset.type,
    owner: {
      id: asset.owner.id,
      name: asset.owner.name,
      username: asset.owner.username,
      avatar: asset.owner.avatarUrl
    },
    createdAt: asset.createdAt
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
