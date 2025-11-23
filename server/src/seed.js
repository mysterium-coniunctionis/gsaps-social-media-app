import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
  const password = await bcrypt.hash('password123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: password,
      name: 'Alice Johnson',
      role: 'member',
      credentials: 'PhD, Neuroscience',
      verified: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    }
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      username: 'bobby',
      passwordHash: password,
      name: 'Bob Williams',
      role: 'member',
      credentials: 'MD, Psychiatry',
      verified: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=20'
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'administrator',
      verified: true
    }
  });

  const course = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Foundations of Psychedelic Therapy',
      description: 'Core practices and safety considerations for psychedelic-assisted therapy.',
      category: 'psychedelic-therapy',
      level: 'intermediate',
      contentUrl: 'https://example.com/courses/psychedelic-therapy'
    }
  });

  await prisma.enrollment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: alice.id,
      courseId: course.id,
      status: 'enrolled',
      progress: 35
    }
  });

  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Neuroplasticity update',
      content: 'Sharing encouraging neuroplasticity findings from our latest psilocybin study.',
      tags: ['research', 'psilocybin'],
      authorId: alice.id
    }
  });

  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Clinical integration notes',
      content: 'Integration protocol draft for our upcoming pilot.',
      tags: ['clinical', 'integration'],
      authorId: bob.id
    }
  });

  await prisma.message.createMany({
    data: [
      { senderId: alice.id, recipientId: bob.id, body: 'Hey Bob, did you review the draft?', read: false },
      { senderId: bob.id, recipientId: alice.id, body: 'Yes, looks great! I left a few notes.', read: true }
    ],
    skipDuplicates: true
  });

  await prisma.researchAsset.createMany({
    data: [
      {
        title: 'Psilocybin fMRI results',
        description: 'Processed fMRI datasets from the neuroplasticity study.',
        url: 'https://example.com/assets/fmri-datasets',
        type: 'dataset',
        ownerId: alice.id
      },
      {
        title: 'Integration protocol draft',
        description: 'Clinical integration checklist for therapists.',
        url: 'https://example.com/assets/integration-protocol',
        type: 'document',
        ownerId: bob.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.achievement.createMany({
    data: [
      { userId: alice.id, type: 'CREATE_POST', points: 10 },
      { userId: alice.id, type: 'COURSE_PROGRESS', points: 15 },
      { userId: bob.id, type: 'MESSAGE_SENT', points: 5 }
    ],
    skipDuplicates: true
  });

  console.log('Database seeded');
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
