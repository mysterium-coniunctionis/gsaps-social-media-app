import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.paperReview.deleteMany();
  await prisma.researchAsset.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.eventAttendee.deleteMany();
  await prisma.event.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.message.deleteMany();
  await prisma.commentReaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.reaction.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('✓ Cleared existing data');

  // Create passwords
  const password = await bcrypt.hash('password123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  // ============================================
  // USERS
  // ============================================

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: password,
      name: 'Dr. Alice Johnson',
      role: 'member',
      bio: 'Neuroscientist specializing in psychedelic research. Passionate about understanding consciousness and therapeutic applications.',
      credentials: 'PhD, Neuroscience',
      verified: true,
      xp: 1250,
      level: 8,
      streak: 12,
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    }
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bobby',
      passwordHash: password,
      name: 'Dr. Bob Williams',
      role: 'member',
      bio: 'Clinical psychiatrist with 15 years of experience. Currently researching MDMA-assisted therapy for PTSD.',
      credentials: 'MD, Psychiatry',
      verified: true,
      xp: 980,
      level: 6,
      streak: 7,
      avatarUrl: 'https://i.pravatar.cc/150?img=20'
    }
  });

  const carol = await prisma.user.create({
    data: {
      email: 'carol@example.com',
      username: 'carol_therapist',
      passwordHash: password,
      name: 'Carol Martinez',
      role: 'member',
      bio: 'Licensed therapist specializing in integration practices. Trained in IFS and somatic experiencing.',
      credentials: 'LMFT, Certified KAP Therapist',
      verified: true,
      xp: 750,
      level: 5,
      streak: 21,
      avatarUrl: 'https://i.pravatar.cc/150?img=25'
    }
  });

  const david = await prisma.user.create({
    data: {
      email: 'david@example.com',
      username: 'david_research',
      passwordHash: password,
      name: 'David Chen',
      role: 'member',
      bio: 'Research coordinator and data analyst. Focused on clinical trial design and outcomes research.',
      credentials: 'MS, Clinical Research',
      verified: false,
      xp: 420,
      level: 3,
      streak: 3,
      avatarUrl: 'https://i.pravatar.cc/150?img=33'
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash: adminPassword,
      name: 'Platform Admin',
      role: 'administrator',
      bio: 'Platform administrator',
      verified: true,
      xp: 5000,
      level: 25,
      streak: 100,
      avatarUrl: 'https://i.pravatar.cc/150?img=68'
    }
  });

  console.log('✓ Created 5 users');

  // ============================================
  // POSTS
  // ============================================

  const post1 = await prisma.post.create({
    data: {
      title: 'Exciting Neuroplasticity Findings',
      content: 'Just finished analyzing our latest psilocybin study data. The neuroplasticity markers are showing remarkable improvement at 3-month follow-up. Eager to share more at the upcoming symposium! #research #psilocybin #neuroplasticity',
      tags: JSON.stringify(['research', 'psilocybin', 'neuroplasticity']),
      authorId: alice.id
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Integration Protocol Draft',
      content: 'Working on a new integration protocol for our MDMA-assisted therapy pilot. Would love feedback from fellow clinicians on the timeline for follow-up sessions. What has worked best in your practice?',
      tags: JSON.stringify(['clinical', 'integration', 'MDMA']),
      authorId: bob.id
    }
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Somatic Approaches in Integration',
      content: 'Had an incredible session today incorporating somatic experiencing into post-journey integration. The body truly holds wisdom that words cannot capture. Sharing some reflections on embodied processing approaches.',
      tags: JSON.stringify(['integration', 'somatic', 'therapy']),
      authorId: carol.id
    }
  });

  const post4 = await prisma.post.create({
    data: {
      title: 'Data Analysis Tools',
      content: 'Looking for recommendations on statistical software for analyzing clinical trial outcomes. Currently using R but considering switching to Python. What does everyone prefer for psychedelic research data?',
      tags: JSON.stringify(['research', 'data', 'tools']),
      authorId: david.id
    }
  });

  console.log('✓ Created 4 posts');

  // ============================================
  // REACTIONS
  // ============================================

  await prisma.reaction.createMany({
    data: [
      { type: '👍', userId: bob.id, postId: post1.id },
      { type: '❤️', userId: carol.id, postId: post1.id },
      { type: '🎉', userId: david.id, postId: post1.id },
      { type: '👍', userId: alice.id, postId: post2.id },
      { type: '🤔', userId: david.id, postId: post2.id },
      { type: '❤️', userId: alice.id, postId: post3.id },
      { type: '👍', userId: bob.id, postId: post3.id },
    ]
  });

  console.log('✓ Created reactions');

  // ============================================
  // COMMENTS
  // ============================================

  const comment1 = await prisma.comment.create({
    data: {
      content: 'This is fantastic news! Would love to see the detailed methodology.',
      authorId: bob.id,
      postId: post1.id
    }
  });

  await prisma.comment.create({
    data: {
      content: 'I\'ll share it in our next lab meeting. Happy to collaborate!',
      authorId: alice.id,
      postId: post1.id,
      parentId: comment1.id
    }
  });

  await prisma.comment.create({
    data: {
      content: 'For follow-up timing, we\'ve had good results with sessions at 1 week, 1 month, and 3 months post-journey.',
      authorId: carol.id,
      postId: post2.id
    }
  });

  console.log('✓ Created comments');

  // ============================================
  // MESSAGES
  // ============================================

  await prisma.message.createMany({
    data: [
      { senderId: alice.id, recipientId: bob.id, body: 'Hey Bob, did you have a chance to review the draft protocol?', read: true },
      { senderId: bob.id, recipientId: alice.id, body: 'Yes! Looks great. I left some comments in the shared doc.', read: true },
      { senderId: alice.id, recipientId: bob.id, body: 'Perfect, thanks! Let\'s schedule a call to discuss.', read: false },
      { senderId: carol.id, recipientId: alice.id, body: 'Hi Alice! Loved your neuroplasticity post. Would you be open to collaborating on an integration study?', read: false },
      { senderId: david.id, recipientId: bob.id, body: 'Dr. Williams, I\'d love to help with the data analysis for your pilot study.', read: true }
    ]
  });

  console.log('✓ Created messages');

  // ============================================
  // GROUPS
  // ============================================

  const researchGroup = await prisma.group.create({
    data: {
      name: 'Psilocybin Research Network',
      description: 'A community of researchers studying psilocybin and its therapeutic applications. Share findings, discuss methodologies, and collaborate on projects.',
      privacy: 'public',
      category: 'research',
      ownerId: alice.id,
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
    }
  });

  const cliniciansGroup = await prisma.group.create({
    data: {
      name: 'Clinical Practitioners Circle',
      description: 'For licensed therapists and clinicians practicing psychedelic-assisted therapy. Case discussions, peer support, and professional development.',
      privacy: 'private',
      category: 'professional',
      ownerId: bob.id,
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800'
    }
  });

  const integrationGroup = await prisma.group.create({
    data: {
      name: 'Integration Practices',
      description: 'Exploring diverse approaches to psychedelic integration. From somatic work to art therapy to traditional practices.',
      privacy: 'public',
      category: 'support',
      ownerId: carol.id,
      coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
    }
  });

  // Add group members
  await prisma.groupMember.createMany({
    data: [
      { userId: alice.id, groupId: researchGroup.id, role: 'admin' },
      { userId: bob.id, groupId: researchGroup.id, role: 'member' },
      { userId: david.id, groupId: researchGroup.id, role: 'member' },
      { userId: bob.id, groupId: cliniciansGroup.id, role: 'admin' },
      { userId: carol.id, groupId: cliniciansGroup.id, role: 'member' },
      { userId: alice.id, groupId: cliniciansGroup.id, role: 'member' },
      { userId: carol.id, groupId: integrationGroup.id, role: 'admin' },
      { userId: alice.id, groupId: integrationGroup.id, role: 'member' },
      { userId: bob.id, groupId: integrationGroup.id, role: 'member' },
      { userId: david.id, groupId: integrationGroup.id, role: 'member' }
    ]
  });

  console.log('✓ Created 3 groups with members');

  // ============================================
  // EVENTS
  // ============================================

  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const symposium = await prisma.event.create({
    data: {
      title: 'Annual Psychedelic Science Symposium',
      description: 'Join us for three days of cutting-edge research presentations, workshops, and networking with leading scientists and clinicians in the field.',
      location: 'San Francisco Convention Center',
      isVirtual: false,
      startDate: nextMonth,
      endDate: new Date(nextMonth.getTime() + 3 * 24 * 60 * 60 * 1000),
      category: 'conference',
      maxAttendees: 500,
      creatorId: admin.id,
      coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    }
  });

  const webinar = await prisma.event.create({
    data: {
      title: 'Webinar: MDMA Therapy Best Practices',
      description: 'An in-depth look at the latest protocols and best practices for MDMA-assisted therapy. Presented by Dr. Bob Williams.',
      isVirtual: true,
      virtualUrl: 'https://zoom.us/j/example',
      startDate: nextWeek,
      endDate: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000),
      category: 'webinar',
      maxAttendees: 100,
      creatorId: bob.id,
      coverUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
    }
  });

  const workshop = await prisma.event.create({
    data: {
      title: 'Somatic Integration Workshop',
      description: 'Hands-on workshop exploring body-based approaches to psychedelic integration. Limited spots available.',
      location: 'Wellness Center, Boulder CO',
      isVirtual: false,
      startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
      category: 'workshop',
      maxAttendees: 20,
      creatorId: carol.id,
      coverUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
    }
  });

  // Add event attendees
  await prisma.eventAttendee.createMany({
    data: [
      { userId: alice.id, eventId: symposium.id, status: 'going' },
      { userId: bob.id, eventId: symposium.id, status: 'going' },
      { userId: carol.id, eventId: symposium.id, status: 'interested' },
      { userId: david.id, eventId: symposium.id, status: 'going' },
      { userId: bob.id, eventId: webinar.id, status: 'going' },
      { userId: alice.id, eventId: webinar.id, status: 'going' },
      { userId: david.id, eventId: webinar.id, status: 'interested' },
      { userId: carol.id, eventId: workshop.id, status: 'going' },
      { userId: alice.id, eventId: workshop.id, status: 'going' }
    ]
  });

  console.log('✓ Created 3 events with attendees');

  // ============================================
  // COURSES
  // ============================================

  const course1 = await prisma.course.create({
    data: {
      title: 'Foundations of Psychedelic Therapy',
      description: 'A comprehensive introduction to psychedelic-assisted therapy, covering history, pharmacology, safety protocols, and therapeutic frameworks.',
      category: 'psychedelic-therapy',
      level: 'beginner',
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
      duration: 480,
      ceCredits: 8,
      ceType: 'APA',
      instructorName: 'Dr. Michael Pollan'
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'MDMA-Assisted Therapy: Clinical Protocols',
      description: 'Deep dive into MAPS Phase 3 protocols for MDMA-assisted therapy for PTSD. For licensed clinicians only.',
      category: 'clinical',
      level: 'advanced',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
      duration: 720,
      ceCredits: 12,
      ceType: 'CME',
      instructorName: 'Dr. Rachel Yehuda'
    }
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Integration Techniques for Therapists',
      description: 'Practical integration methods including somatic, artistic, and narrative approaches for post-journey processing.',
      category: 'integration',
      level: 'intermediate',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      duration: 360,
      ceCredits: 6,
      ceType: 'CNE',
      instructorName: 'Carol Martinez, LMFT'
    }
  });

  // Add lessons to courses
  await prisma.lesson.createMany({
    data: [
      { courseId: course1.id, title: 'History of Psychedelic Therapy', description: 'From ancient practices to modern research', duration: 45, orderIndex: 1, contentType: 'video' },
      { courseId: course1.id, title: 'Pharmacology Basics', description: 'How psychedelics work in the brain', duration: 60, orderIndex: 2, contentType: 'video' },
      { courseId: course1.id, title: 'Safety Protocols', description: 'Screening, preparation, and risk management', duration: 75, orderIndex: 3, contentType: 'video' },
      { courseId: course1.id, title: 'Set and Setting', description: 'Creating the optimal therapeutic environment', duration: 45, orderIndex: 4, contentType: 'video' },
      { courseId: course1.id, title: 'Module Quiz', description: 'Test your knowledge', duration: 30, orderIndex: 5, contentType: 'quiz' },
      { courseId: course2.id, title: 'MAPS Protocol Overview', description: 'Understanding the Phase 3 trial design', duration: 90, orderIndex: 1, contentType: 'video' },
      { courseId: course2.id, title: 'Pre-Session Preparation', description: 'Client screening and preparation', duration: 60, orderIndex: 2, contentType: 'video' },
      { courseId: course2.id, title: 'The MDMA Session', description: 'Conducting the medicine session', duration: 120, orderIndex: 3, contentType: 'video' },
      { courseId: course2.id, title: 'Integration Sessions', description: 'Post-session processing and integration', duration: 90, orderIndex: 4, contentType: 'video' },
      { courseId: course3.id, title: 'Understanding Integration', description: 'What is integration and why it matters', duration: 40, orderIndex: 1, contentType: 'video' },
      { courseId: course3.id, title: 'Somatic Approaches', description: 'Body-based integration techniques', duration: 60, orderIndex: 2, contentType: 'video' },
      { courseId: course3.id, title: 'Creative Expression', description: 'Art, music, and movement in integration', duration: 45, orderIndex: 3, contentType: 'video' }
    ]
  });

  // Create enrollments
  await prisma.enrollment.createMany({
    data: [
      { userId: alice.id, courseId: course1.id, status: 'completed', progress: 100 },
      { userId: alice.id, courseId: course2.id, status: 'enrolled', progress: 65 },
      { userId: bob.id, courseId: course1.id, status: 'completed', progress: 100 },
      { userId: bob.id, courseId: course3.id, status: 'enrolled', progress: 40 },
      { userId: carol.id, courseId: course1.id, status: 'enrolled', progress: 80 },
      { userId: carol.id, courseId: course3.id, status: 'completed', progress: 100 },
      { userId: david.id, courseId: course1.id, status: 'enrolled', progress: 25 }
    ]
  });

  console.log('✓ Created 3 courses with lessons and enrollments');

  // ============================================
  // RESEARCH ASSETS
  // ============================================

  const asset1 = await prisma.researchAsset.create({
    data: {
      title: 'Psilocybin-Induced Neuroplasticity: A Systematic Review',
      description: 'Comprehensive review of neuroimaging studies examining psilocybin effects on brain connectivity and plasticity.',
      url: 'https://example.com/papers/psilocybin-neuroplasticity-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Johnson, A.', 'Williams, B.', 'Martinez, C.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881120000001',
      abstract: 'This systematic review examines the current evidence for psilocybin-induced neuroplasticity...',
      keywords: JSON.stringify(['psilocybin', 'neuroplasticity', 'fMRI', 'connectivity']),
      citationCount: 42,
      downloadCount: 156,
      ownerId: alice.id
    }
  });

  const asset2 = await prisma.researchAsset.create({
    data: {
      title: 'MDMA-Assisted Therapy for PTSD: Phase 3 Trial Dataset',
      description: 'Anonymized dataset from the MAPS-sponsored Phase 3 clinical trial of MDMA-assisted therapy for PTSD.',
      url: 'https://example.com/datasets/mdma-ptsd-phase3.zip',
      type: 'dataset',
      authors: JSON.stringify(['MAPS Research Team']),
      keywords: JSON.stringify(['MDMA', 'PTSD', 'clinical trial', 'therapy']),
      downloadCount: 89,
      ownerId: bob.id
    }
  });

  const asset3 = await prisma.researchAsset.create({
    data: {
      title: 'Integration Best Practices: A Clinician\'s Guide',
      description: 'Practical guide for therapists on evidence-based integration practices following psychedelic experiences.',
      url: 'https://example.com/guides/integration-best-practices.pdf',
      type: 'document',
      authors: JSON.stringify(['Martinez, C.']),
      keywords: JSON.stringify(['integration', 'therapy', 'best practices']),
      downloadCount: 234,
      ownerId: carol.id
    }
  });

  // Add paper reviews
  await prisma.paperReview.createMany({
    data: [
      { assetId: asset1.id, userId: bob.id, rating: 5, review: 'Excellent comprehensive review. The methodology section is particularly thorough.' },
      { assetId: asset1.id, userId: carol.id, rating: 4, review: 'Very informative. Would have liked more discussion of clinical implications.' },
      { assetId: asset2.id, userId: alice.id, rating: 5, review: 'Invaluable resource for researchers. Well-documented and clean data.' },
      { assetId: asset3.id, userId: alice.id, rating: 5, review: 'Essential reading for any integration therapist. Practical and evidence-based.' },
      { assetId: asset3.id, userId: bob.id, rating: 4, review: 'Great guide. Would benefit from more case examples.' }
    ]
  });

  console.log('✓ Created 3 research assets with reviews');

  // ============================================
  // ACHIEVEMENTS
  // ============================================

  await prisma.achievement.createMany({
    data: [
      { userId: alice.id, type: 'first_post', name: 'First Steps', description: 'Published your first post', points: 10 },
      { userId: alice.id, type: 'course_completed', name: 'Scholar', description: 'Completed your first course', points: 100 },
      { userId: alice.id, type: 'research_shared', name: 'Contributor', description: 'Shared a research paper', points: 50 },
      { userId: bob.id, type: 'first_post', name: 'First Steps', description: 'Published your first post', points: 10 },
      { userId: bob.id, type: 'course_completed', name: 'Scholar', description: 'Completed your first course', points: 100 },
      { userId: bob.id, type: 'group_created', name: 'Community Builder', description: 'Created a group', points: 25 },
      { userId: carol.id, type: 'first_post', name: 'First Steps', description: 'Published your first post', points: 10 },
      { userId: carol.id, type: 'streak_7', name: 'Consistent', description: 'Maintained a 7-day streak', points: 50 },
      { userId: carol.id, type: 'course_completed', name: 'Scholar', description: 'Completed your first course', points: 100 },
      { userId: david.id, type: 'first_post', name: 'First Steps', description: 'Published your first post', points: 10 }
    ]
  });

  console.log('✓ Created achievements');

  // ============================================
  // NOTIFICATIONS
  // ============================================

  await prisma.notification.createMany({
    data: [
      { userId: alice.id, type: 'reaction', title: 'New reaction on your post', body: 'Bob Williams reacted to your post', data: JSON.stringify({ postId: post1.id }) },
      { userId: alice.id, type: 'comment', title: 'New comment', body: 'Bob Williams commented on your post', data: JSON.stringify({ postId: post1.id }) },
      { userId: alice.id, type: 'message', title: 'New message', body: 'Carol Martinez sent you a message', read: false },
      { userId: bob.id, type: 'event', title: 'Event reminder', body: 'Your webinar starts in 2 days', data: JSON.stringify({ eventId: webinar.id }) },
      { userId: carol.id, type: 'achievement', title: 'Achievement unlocked!', body: 'You earned the Consistent badge', read: false }
    ]
  });

  console.log('✓ Created notifications');

  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Demo accounts:');
  console.log('   - alice@example.com / password123 (Researcher)');
  console.log('   - bob@example.com / password123 (Clinician)');
  console.log('   - carol@example.com / password123 (Therapist)');
  console.log('   - david@example.com / password123 (Research Coordinator)');
  console.log('   - admin@example.com / admin123 (Administrator)');
};

seed()
  .catch((error) => {
    console.error('❌ Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
