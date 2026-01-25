import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { allCourses } from './data/index.js';

dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
  console.log('🌱 Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  await prisma.notification.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.paperCommentLike.deleteMany();
  await prisma.paperComment.deleteMany();
  await prisma.paperCollectionItem.deleteMany();
  await prisma.collectionFollower.deleteMany();
  await prisma.paperCollection.deleteMany();
  await prisma.paperReview.deleteMany();
  await prisma.researchAsset.deleteMany();
  await prisma.quizResult.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.credential.deleteMany();
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
  // COURSES - Professional CE/CME Courses
  // ============================================

  console.log('📚 Creating professional CE courses...');

  const createdCourses = [];

  for (const courseData of allCourses) {
    const { lessons, slug, instructorBio, learningObjectives, ...courseFields } = courseData;

    // Create the course
    const course = await prisma.course.create({
      data: courseFields
    });

    // Create lessons for this course
    if (lessons && lessons.length > 0) {
      for (const lessonData of lessons) {
        const { quizData, ...lessonFields } = lessonData;

        await prisma.lesson.create({
          data: {
            ...lessonFields,
            courseId: course.id,
            quizData: quizData ? JSON.stringify(quizData) : null,
          }
        });
      }
    }

    createdCourses.push(course);
    console.log(`  ✓ ${course.title} (${lessons?.length || 0} lessons, ${course.ceCredits} CE credits)`);
  }

  // Create enrollments for existing users
  const [firstCourse, secondCourse, thirdCourse] = createdCourses;

  await prisma.enrollment.createMany({
    data: [
      { userId: alice.id, courseId: firstCourse.id, status: 'completed', progress: 100 },
      { userId: alice.id, courseId: secondCourse.id, status: 'enrolled', progress: 65 },
      { userId: bob.id, courseId: firstCourse.id, status: 'completed', progress: 100 },
      { userId: bob.id, courseId: thirdCourse.id, status: 'enrolled', progress: 40 },
      { userId: carol.id, courseId: firstCourse.id, status: 'enrolled', progress: 80 },
      { userId: carol.id, courseId: thirdCourse.id, status: 'completed', progress: 100 },
      { userId: david.id, courseId: firstCourse.id, status: 'enrolled', progress: 25 },
      { userId: david.id, courseId: createdCourses[3]?.id || firstCourse.id, status: 'enrolled', progress: 15 },
      { userId: alice.id, courseId: createdCourses[4]?.id || secondCourse.id, status: 'enrolled', progress: 50 },
      { userId: bob.id, courseId: createdCourses[5]?.id || thirdCourse.id, status: 'enrolled', progress: 30 }
    ]
  });

  console.log(`✓ Created ${createdCourses.length} professional courses with ${createdCourses.reduce((sum, c) => sum + (allCourses.find(ac => ac.title === c.title)?.lessons?.length || 0), 0)} total lessons`);

  // ============================================
  // RESEARCH ASSETS - 100 Research Articles
  // ============================================

  const researchArticlesData = [
    // Psilocybin Research (1-20)
    {
      title: 'Psilocybin-Induced Neuroplasticity: A Systematic Review',
      description: 'Comprehensive review of neuroimaging studies examining psilocybin effects on brain connectivity and plasticity.',
      url: 'https://example.com/papers/psilocybin-neuroplasticity-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Johnson, A.', 'Williams, B.', 'Martinez, C.']),
      journal: 'Journal of Psychopharmacology',
      volume: '38',
      issue: '4',
      pages: '345-367',
      doi: '10.1177/0269881120000001',
      pmid: '34567890',
      abstract: 'This systematic review examines the current evidence for psilocybin-induced neuroplasticity across 47 neuroimaging studies.',
      keywords: JSON.stringify(['psilocybin', 'neuroplasticity', 'fMRI', 'connectivity']),
      topics: JSON.stringify(['psilocybin', 'neuroscience']),
      researchType: 'review',
      methodology: 'systematic-review',
      openAccess: true,
      peerReviewed: true,
      citationCount: 142,
      downloadCount: 1567,
      viewCount: 4521
    },
    {
      title: 'Psilocybin for Treatment-Resistant Depression: 6-Month Follow-Up',
      description: 'Long-term outcomes of psilocybin-assisted therapy for patients with treatment-resistant major depression.',
      url: 'https://example.com/papers/psilocybin-trd-followup.pdf',
      type: 'paper',
      authors: JSON.stringify(['Carhart-Harris, R.', 'Bolstridge, M.', 'Day, C.M.J.']),
      journal: 'The Lancet Psychiatry',
      doi: '10.1016/S2215-0366(21)00104-1',
      abstract: 'This study presents 6-month follow-up data from patients receiving psilocybin therapy for treatment-resistant depression.',
      keywords: JSON.stringify(['psilocybin', 'depression', 'treatment-resistant', 'long-term']),
      citationCount: 287,
      downloadCount: 2341
    },
    {
      title: 'Neural Correlates of the Psychedelic State: fMRI Studies with Psilocybin',
      description: 'Investigation of brain activity patterns during acute psilocybin experiences using functional magnetic resonance imaging.',
      url: 'https://example.com/papers/neural-correlates-psilocybin.pdf',
      type: 'paper',
      authors: JSON.stringify(['Muthukumaraswamy, S.D.', 'Carhart-Harris, R.L.']),
      journal: 'Proceedings of the National Academy of Sciences',
      doi: '10.1073/pnas.1518377113',
      abstract: 'We characterize the neural correlates of the psychedelic state produced by psilocybin.',
      keywords: JSON.stringify(['psilocybin', 'fMRI', 'brain imaging', 'neural correlates']),
      citationCount: 456,
      downloadCount: 3892
    },
    {
      title: 'Psilocybin and Mystical Experience: Predictors of Therapeutic Outcomes',
      description: 'Analysis of mystical-type experiences during psilocybin sessions and their relationship to treatment efficacy.',
      url: 'https://example.com/papers/psilocybin-mystical-outcomes.pdf',
      type: 'paper',
      authors: JSON.stringify(['Griffiths, R.R.', 'Johnson, M.W.', 'Richards, W.A.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881117731279',
      abstract: 'Mystical experiences during psilocybin sessions predict long-term therapeutic benefits.',
      keywords: JSON.stringify(['psilocybin', 'mystical experience', 'therapeutic outcomes', 'spirituality']),
      citationCount: 523,
      downloadCount: 4521
    },
    {
      title: 'Safety and Efficacy of Psilocybin in Cancer-Related Anxiety',
      description: 'Randomized controlled trial of psilocybin for existential distress in patients with life-threatening cancer diagnoses.',
      url: 'https://example.com/papers/psilocybin-cancer-anxiety.pdf',
      type: 'paper',
      authors: JSON.stringify(['Griffiths, R.R.', 'Johnson, M.W.', 'Carducci, M.A.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881116675513',
      abstract: 'High-dose psilocybin produced large decreases in clinician-rated and self-rated measures of depressed mood and anxiety.',
      keywords: JSON.stringify(['psilocybin', 'cancer', 'anxiety', 'existential distress']),
      citationCount: 612,
      downloadCount: 5234
    },
    {
      title: 'Psilocybin-Assisted Smoking Cessation: Pilot Study Results',
      description: 'Open-label pilot study examining psilocybin as an adjunct to cognitive-behavioral therapy for smoking cessation.',
      url: 'https://example.com/papers/psilocybin-smoking-cessation.pdf',
      type: 'paper',
      authors: JSON.stringify(['Johnson, M.W.', 'Garcia-Romeu, A.', 'Griffiths, R.R.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881114548296',
      abstract: 'Psilocybin-assisted treatment produced abstinence rates substantially higher than current therapies.',
      keywords: JSON.stringify(['psilocybin', 'smoking cessation', 'addiction', 'tobacco']),
      citationCount: 234,
      downloadCount: 1876
    },
    {
      title: 'Dose-Response Effects of Psilocybin on Default Mode Network Connectivity',
      description: 'Investigating the relationship between psilocybin dose and alterations in default mode network functional connectivity.',
      url: 'https://example.com/papers/psilocybin-dmn-dose.pdf',
      type: 'paper',
      authors: JSON.stringify(['Carhart-Harris, R.L.', 'Leech, R.', 'Hellyer, P.J.']),
      journal: 'NeuroImage',
      doi: '10.1016/j.neuroimage.2019.04.043',
      abstract: 'Psilocybin produced dose-dependent decreases in default mode network connectivity.',
      keywords: JSON.stringify(['psilocybin', 'default mode network', 'dose-response', 'connectivity']),
      citationCount: 389,
      downloadCount: 2945
    },
    {
      title: 'Psilocybin and Personality Change: Long-Term Assessment',
      description: 'Examination of sustained changes in personality traits following psilocybin experiences.',
      url: 'https://example.com/papers/psilocybin-personality-change.pdf',
      type: 'paper',
      authors: JSON.stringify(['MacLean, K.A.', 'Johnson, M.W.', 'Griffiths, R.R.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881111420188',
      abstract: 'Psilocybin can produce sustained increases in openness to experience.',
      keywords: JSON.stringify(['psilocybin', 'personality', 'openness', 'long-term']),
      citationCount: 445,
      downloadCount: 3678
    },
    {
      title: 'Microdosing Psilocybin: Systematic Review and Meta-Analysis',
      description: 'Comprehensive review of controlled studies examining sub-perceptual doses of psilocybin.',
      url: 'https://example.com/papers/psilocybin-microdosing-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Anderson, T.', 'Petranker, R.', 'Rosenbaum, D.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-022-06154-8',
      abstract: 'This meta-analysis examines the current evidence for microdosing psilocybin.',
      keywords: JSON.stringify(['psilocybin', 'microdosing', 'meta-analysis', 'cognitive enhancement']),
      citationCount: 167,
      downloadCount: 2134
    },
    {
      title: 'Psilocybin for Alcohol Use Disorder: Phase 2 Trial',
      description: 'Randomized controlled trial of psilocybin-assisted psychotherapy for alcohol dependence.',
      url: 'https://example.com/papers/psilocybin-alcohol-phase2.pdf',
      type: 'paper',
      authors: JSON.stringify(['Bogenschutz, M.P.', 'Ross, S.', 'Bhatt, S.']),
      journal: 'JAMA Psychiatry',
      doi: '10.1001/jamapsychiatry.2022.2096',
      abstract: 'Psilocybin-assisted therapy showed significant reductions in heavy drinking days.',
      keywords: JSON.stringify(['psilocybin', 'alcohol', 'addiction', 'clinical trial']),
      citationCount: 198,
      downloadCount: 1678
    },
    {
      title: 'Psilocybin Effects on Brain Entropy and Cognitive Flexibility',
      description: 'Investigation of how psilocybin affects brain signal complexity and cognitive flexibility.',
      url: 'https://example.com/papers/psilocybin-entropy-cognition.pdf',
      type: 'paper',
      authors: JSON.stringify(['Lebedev, A.V.', 'Kaelen, M.', 'Carhart-Harris, R.L.']),
      journal: 'Human Brain Mapping',
      doi: '10.1002/hbm.23391',
      abstract: 'Psilocybin increased brain entropy and was associated with enhanced cognitive flexibility.',
      keywords: JSON.stringify(['psilocybin', 'entropy', 'cognition', 'flexibility']),
      citationCount: 312,
      downloadCount: 2567
    },
    {
      title: 'Psilocybin and Emotional Processing: EEG Study',
      description: 'Electroencephalographic investigation of psilocybin effects on emotional face processing.',
      url: 'https://example.com/papers/psilocybin-emotional-eeg.pdf',
      type: 'paper',
      authors: JSON.stringify(['Kometer, M.', 'Schmidt, A.', 'Jancke, L.']),
      journal: 'Biological Psychiatry',
      doi: '10.1016/j.biopsych.2012.04.023',
      abstract: 'Psilocybin modulated early emotional processing as measured by EEG.',
      keywords: JSON.stringify(['psilocybin', 'emotion', 'EEG', 'face processing']),
      citationCount: 187,
      downloadCount: 1456
    },
    {
      title: 'Genetic Predictors of Psilocybin Response',
      description: 'Pharmacogenomic analysis of factors influencing individual responses to psilocybin.',
      url: 'https://example.com/papers/psilocybin-genetics.pdf',
      type: 'paper',
      authors: JSON.stringify(['Olson, J.A.', 'Suissa-Rocheleau, L.', 'Bhatt, S.']),
      journal: 'Translational Psychiatry',
      doi: '10.1038/s41398-021-01534-1',
      abstract: 'Genetic variants in serotonin receptor genes predicted psilocybin response intensity.',
      keywords: JSON.stringify(['psilocybin', 'genetics', 'pharmacogenomics', 'serotonin']),
      citationCount: 89,
      downloadCount: 987
    },
    {
      title: 'Psilocybin Therapy for Obsessive-Compulsive Disorder',
      description: 'Open-label study of psilocybin-assisted therapy for treatment-resistant OCD.',
      url: 'https://example.com/papers/psilocybin-ocd.pdf',
      type: 'paper',
      authors: JSON.stringify(['Moreno, F.A.', 'Wiegand, C.B.', 'Taitano, E.K.']),
      journal: 'Journal of Clinical Psychiatry',
      doi: '10.4088/JCP.14m09234',
      abstract: 'Psilocybin demonstrated acute reductions in OCD symptoms.',
      keywords: JSON.stringify(['psilocybin', 'OCD', 'obsessive-compulsive', 'anxiety']),
      citationCount: 156,
      downloadCount: 1234
    },
    {
      title: 'Psilocybin and Meditation: Synergistic Effects',
      description: 'Investigation of combined psilocybin and meditation practice on well-being outcomes.',
      url: 'https://example.com/papers/psilocybin-meditation.pdf',
      type: 'paper',
      authors: JSON.stringify(['Smigielski, L.', 'Scheidegger, M.', 'Kometer, M.']),
      journal: 'NeuroImage',
      doi: '10.1016/j.neuroimage.2019.116073',
      abstract: 'Combined psilocybin and meditation produced greater increases in well-being than either alone.',
      keywords: JSON.stringify(['psilocybin', 'meditation', 'mindfulness', 'well-being']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'Psilocybin Neuroimaging: PET Studies of 5-HT2A Occupancy',
      description: 'Positron emission tomography studies of psilocybin binding to serotonin 2A receptors.',
      url: 'https://example.com/papers/psilocybin-pet-5ht2a.pdf',
      type: 'paper',
      authors: JSON.stringify(['Madsen, M.K.', 'Fisher, P.M.', 'Burmester, D.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/s41386-019-0324-9',
      abstract: 'PET imaging revealed psilocybin occupancy at 5-HT2A receptors correlated with subjective effects.',
      keywords: JSON.stringify(['psilocybin', 'PET', '5-HT2A', 'neuroimaging']),
      citationCount: 145,
      downloadCount: 1123
    },
    {
      title: 'Psilocybin Safety Profile: Systematic Review',
      description: 'Comprehensive review of adverse events and safety considerations in psilocybin research.',
      url: 'https://example.com/papers/psilocybin-safety-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Johnson, M.W.', 'Richards, W.A.', 'Griffiths, R.R.']),
      journal: 'Neuropharmacology',
      doi: '10.1016/j.neuropharm.2017.06.032',
      abstract: 'Psilocybin has a favorable safety profile when administered in controlled settings.',
      keywords: JSON.stringify(['psilocybin', 'safety', 'adverse events', 'clinical']),
      citationCount: 567,
      downloadCount: 4567
    },
    {
      title: 'Psilocybin and Cluster Headache: Case Series',
      description: 'Retrospective case series of psilocybin use in cluster headache patients.',
      url: 'https://example.com/papers/psilocybin-cluster-headache.pdf',
      type: 'paper',
      authors: JSON.stringify(['Sewell, R.A.', 'Halpern, J.H.', 'Pope, H.G.']),
      journal: 'Neurology',
      doi: '10.1212/01.wnl.0000227122.38823.f7',
      abstract: 'Psilocybin may have efficacy in treating cluster headache.',
      keywords: JSON.stringify(['psilocybin', 'cluster headache', 'pain', 'neurology']),
      citationCount: 278,
      downloadCount: 2234
    },
    {
      title: 'Psilocybin Therapy Training Standards: Consensus Guidelines',
      description: 'Expert consensus on training requirements for psilocybin-assisted therapy practitioners.',
      url: 'https://example.com/papers/psilocybin-training-guidelines.pdf',
      type: 'paper',
      authors: JSON.stringify(['Earleywine, M.', 'Low, F.', 'Lau, C.']),
      journal: 'Journal of Humanistic Psychology',
      doi: '10.1177/0022167821997175',
      abstract: 'Consensus guidelines for training psilocybin therapy practitioners.',
      keywords: JSON.stringify(['psilocybin', 'training', 'guidelines', 'therapy']),
      citationCount: 78,
      downloadCount: 876
    },
    {
      title: 'Psilocybin Acute Effects on Creativity and Insight',
      description: 'Double-blind study of psilocybin effects on creative thinking and problem-solving.',
      url: 'https://example.com/papers/psilocybin-creativity.pdf',
      type: 'paper',
      authors: JSON.stringify(['Mason, N.L.', 'Mischler, E.', 'Uthaug, M.V.']),
      journal: 'Translational Psychiatry',
      doi: '10.1038/s41398-019-0612-3',
      abstract: 'Psilocybin enhanced divergent thinking and creative insights.',
      keywords: JSON.stringify(['psilocybin', 'creativity', 'insight', 'cognition']),
      citationCount: 167,
      downloadCount: 1567
    },
    // MDMA Research (21-40)
    {
      title: 'MDMA-Assisted Therapy for PTSD: Phase 3 Trial Results',
      description: 'Results from the pivotal Phase 3 clinical trial of MDMA-assisted therapy for post-traumatic stress disorder.',
      url: 'https://example.com/papers/mdma-ptsd-phase3.pdf',
      type: 'paper',
      authors: JSON.stringify(['Mitchell, J.M.', 'Bogenschutz, M.', 'Lilienstein, A.']),
      journal: 'Nature Medicine',
      doi: '10.1038/s41591-021-01336-3',
      abstract: 'MDMA-assisted therapy produced significant reductions in PTSD symptoms compared to placebo.',
      keywords: JSON.stringify(['MDMA', 'PTSD', 'phase 3', 'clinical trial']),
      citationCount: 456,
      downloadCount: 4567
    },
    {
      title: 'MDMA Neurotoxicity: Reassessing the Evidence',
      description: 'Critical review of preclinical and clinical evidence regarding MDMA neurotoxicity.',
      url: 'https://example.com/papers/mdma-neurotoxicity-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Pantoni, M.M.', 'Bhatt, S.', 'Feduccia, A.A.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/s41386-021-01001-6',
      abstract: 'Clinical studies do not support claims of MDMA neurotoxicity at therapeutic doses.',
      keywords: JSON.stringify(['MDMA', 'neurotoxicity', 'safety', 'serotonin']),
      citationCount: 234,
      downloadCount: 2345
    },
    {
      title: 'MDMA-Assisted Therapy: Mechanisms of Action',
      description: 'Review of proposed mechanisms underlying MDMA therapeutic effects in psychotherapy.',
      url: 'https://example.com/papers/mdma-mechanisms.pdf',
      type: 'paper',
      authors: JSON.stringify(['Feduccia, A.A.', 'Mithoefer, M.C.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-018-5085-6',
      abstract: 'MDMA facilitates therapy through increased oxytocin and decreased amygdala reactivity.',
      keywords: JSON.stringify(['MDMA', 'mechanisms', 'oxytocin', 'fear extinction']),
      citationCount: 345,
      downloadCount: 2890
    },
    {
      title: 'MDMA and Social Cognition: Effects on Empathy',
      description: 'Controlled study of MDMA effects on empathy and social emotional processing.',
      url: 'https://example.com/papers/mdma-empathy.pdf',
      type: 'paper',
      authors: JSON.stringify(['Schmid, Y.', 'Hysek, C.M.', 'Simmler, L.D.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881114531776',
      abstract: 'MDMA enhanced emotional empathy and prosocial behavior.',
      keywords: JSON.stringify(['MDMA', 'empathy', 'social cognition', 'prosocial']),
      citationCount: 267,
      downloadCount: 2123
    },
    {
      title: 'MDMA-Assisted Couples Therapy: Pilot Study',
      description: 'Open-label study of MDMA-assisted therapy for couples with relationship distress.',
      url: 'https://example.com/papers/mdma-couples-therapy.pdf',
      type: 'paper',
      authors: JSON.stringify(['Wagner, A.C.', 'Mithoefer, M.C.', 'Mithoefer, A.T.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881119899938',
      abstract: 'MDMA-assisted therapy improved relationship satisfaction and communication.',
      keywords: JSON.stringify(['MDMA', 'couples therapy', 'relationships', 'communication']),
      citationCount: 89,
      downloadCount: 987
    },
    {
      title: 'MDMA Pharmacokinetics and Pharmacodynamics',
      description: 'Comprehensive characterization of MDMA pharmacology in healthy volunteers.',
      url: 'https://example.com/papers/mdma-pharmacology.pdf',
      type: 'paper',
      authors: JSON.stringify(['Vizeli, P.', 'Liechti, M.E.']),
      journal: 'Clinical Pharmacology & Therapeutics',
      doi: '10.1002/cpt.1239',
      abstract: 'Detailed pharmacokinetic and pharmacodynamic profiles of MDMA.',
      keywords: JSON.stringify(['MDMA', 'pharmacokinetics', 'pharmacodynamics', 'metabolism']),
      citationCount: 178,
      downloadCount: 1456
    },
    {
      title: 'MDMA-Assisted Therapy for Social Anxiety in Autism',
      description: 'Randomized trial of MDMA-assisted therapy for social anxiety in autistic adults.',
      url: 'https://example.com/papers/mdma-autism-social-anxiety.pdf',
      type: 'paper',
      authors: JSON.stringify(['Danforth, A.L.', 'Grob, C.S.', 'Struble, C.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-018-5010-9',
      abstract: 'MDMA-assisted therapy reduced social anxiety in autistic adults.',
      keywords: JSON.stringify(['MDMA', 'autism', 'social anxiety', 'ASD']),
      citationCount: 145,
      downloadCount: 1234
    },
    {
      title: 'MDMA Effects on Fear Memory Reconsolidation',
      description: 'Investigation of MDMA effects on fear memory reconsolidation processes.',
      url: 'https://example.com/papers/mdma-fear-reconsolidation.pdf',
      type: 'paper',
      authors: JSON.stringify(['Young, M.B.', 'Andero, R.', 'Ressler, K.J.']),
      journal: 'Translational Psychiatry',
      doi: '10.1038/s41398-017-0050-5',
      abstract: 'MDMA enhanced fear memory extinction through reconsolidation processes.',
      keywords: JSON.stringify(['MDMA', 'fear', 'reconsolidation', 'extinction']),
      citationCount: 123,
      downloadCount: 1023
    },
    {
      title: 'MDMA and Brain Connectivity: Neuroimaging Study',
      description: 'fMRI study of MDMA effects on functional brain connectivity.',
      url: 'https://example.com/papers/mdma-brain-connectivity.pdf',
      type: 'paper',
      authors: JSON.stringify(['Carhart-Harris, R.L.', 'Murphy, K.', 'Leech, R.']),
      journal: 'Biological Psychiatry',
      doi: '10.1016/j.biopsych.2014.05.004',
      abstract: 'MDMA decreased connectivity between limbic and cortical regions.',
      keywords: JSON.stringify(['MDMA', 'connectivity', 'fMRI', 'amygdala']),
      citationCount: 289,
      downloadCount: 2345
    },
    {
      title: 'MDMA-Assisted Psychotherapy Training Program Development',
      description: 'Description of the MAPS MDMA-assisted psychotherapy training program curriculum.',
      url: 'https://example.com/papers/mdma-training-program.pdf',
      type: 'paper',
      authors: JSON.stringify(['Mithoefer, M.C.', 'Feduccia, A.A.', 'Jerome, L.']),
      journal: 'Frontiers in Psychiatry',
      doi: '10.3389/fpsyt.2019.00099',
      abstract: 'Overview of the comprehensive training program for MDMA therapy providers.',
      keywords: JSON.stringify(['MDMA', 'training', 'psychotherapy', 'certification']),
      citationCount: 67,
      downloadCount: 789
    },
    {
      title: 'MDMA Combined with CBT for PTSD: Efficacy Study',
      description: 'Study of MDMA-assisted therapy combined with cognitive-behavioral techniques.',
      url: 'https://example.com/papers/mdma-cbt-ptsd.pdf',
      type: 'paper',
      authors: JSON.stringify(['Ot\'alora, G.M.', 'Grigsby, J.', 'Poulter, B.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-018-5106-5',
      abstract: 'MDMA enhanced outcomes when combined with CBT techniques.',
      keywords: JSON.stringify(['MDMA', 'CBT', 'PTSD', 'psychotherapy']),
      citationCount: 156,
      downloadCount: 1345
    },
    {
      title: 'MDMA Therapy: Patient Perspectives and Experiences',
      description: 'Qualitative study of patient experiences in MDMA-assisted therapy trials.',
      url: 'https://example.com/papers/mdma-patient-experiences.pdf',
      type: 'paper',
      authors: JSON.stringify(['Barone, W.', 'Beck, J.', 'Mitsunaga-Whitten, M.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2019.1587556',
      abstract: 'Patients reported profound experiences of trust and emotional processing.',
      keywords: JSON.stringify(['MDMA', 'qualitative', 'patient experience', 'phenomenology']),
      citationCount: 78,
      downloadCount: 867
    },
    {
      title: 'MDMA and Oxytocin: Hormonal Mechanisms',
      description: 'Investigation of MDMA effects on oxytocin release and social bonding.',
      url: 'https://example.com/papers/mdma-oxytocin.pdf',
      type: 'paper',
      authors: JSON.stringify(['Dumont, G.J.', 'Sweep, F.C.', 'van der Steen, R.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/npp.2008.164',
      abstract: 'MDMA significantly increased plasma oxytocin levels.',
      keywords: JSON.stringify(['MDMA', 'oxytocin', 'hormones', 'social bonding']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'MDMA for Severe PTSD in Veterans',
      description: 'Study of MDMA-assisted therapy in military veterans with severe PTSD.',
      url: 'https://example.com/papers/mdma-veterans-ptsd.pdf',
      type: 'paper',
      authors: JSON.stringify(['Mithoefer, M.C.', 'Wagner, M.T.', 'Mithoefer, A.T.']),
      journal: 'The Lancet Psychiatry',
      doi: '10.1016/S2215-0366(18)30135-4',
      abstract: 'MDMA-assisted therapy produced significant improvements in treatment-resistant veteran PTSD.',
      keywords: JSON.stringify(['MDMA', 'veterans', 'PTSD', 'military']),
      citationCount: 345,
      downloadCount: 2789
    },
    {
      title: 'Long-Term Outcomes of MDMA-Assisted Therapy',
      description: 'Follow-up study assessing durability of MDMA therapy benefits.',
      url: 'https://example.com/papers/mdma-long-term-outcomes.pdf',
      type: 'paper',
      authors: JSON.stringify(['Jerome, L.', 'Feduccia, A.A.', 'Wang, J.B.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-020-05630-0',
      abstract: 'Benefits of MDMA-assisted therapy were maintained at 12-month follow-up.',
      keywords: JSON.stringify(['MDMA', 'long-term', 'durability', 'follow-up']),
      citationCount: 189,
      downloadCount: 1567
    },
    {
      title: 'MDMA Dose Optimization for Therapeutic Use',
      description: 'Study comparing different MDMA doses for optimal therapeutic outcomes.',
      url: 'https://example.com/papers/mdma-dose-optimization.pdf',
      type: 'paper',
      authors: JSON.stringify(['Schmid, Y.', 'Vizeli, P.', 'Hysek, C.M.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881120936428',
      abstract: 'Optimal therapeutic response observed at 125mg initial dose.',
      keywords: JSON.stringify(['MDMA', 'dose', 'optimization', 'therapeutic']),
      citationCount: 78,
      downloadCount: 890
    },
    {
      title: 'MDMA Safety in Controlled Clinical Settings',
      description: 'Comprehensive safety analysis from MDMA clinical trials.',
      url: 'https://example.com/papers/mdma-safety-clinical.pdf',
      type: 'paper',
      authors: JSON.stringify(['Feduccia, A.A.', 'Jerome, L.', 'Mithoefer, M.C.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881119881564',
      abstract: 'MDMA has an acceptable safety profile in controlled clinical settings.',
      keywords: JSON.stringify(['MDMA', 'safety', 'clinical trials', 'adverse events']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'MDMA Effects on Emotional Memory Processing',
      description: 'Investigation of MDMA effects on emotional memory encoding and retrieval.',
      url: 'https://example.com/papers/mdma-emotional-memory.pdf',
      type: 'paper',
      authors: JSON.stringify(['Hysek, C.M.', 'Domes, G.', 'Liechti, M.E.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/npp.2013.254',
      abstract: 'MDMA reduced negative emotional memory retrieval.',
      keywords: JSON.stringify(['MDMA', 'memory', 'emotion', 'retrieval']),
      citationCount: 145,
      downloadCount: 1234
    },
    {
      title: 'MDMA and the Therapeutic Alliance',
      description: 'Analysis of MDMA effects on therapeutic relationship in psychotherapy.',
      url: 'https://example.com/papers/mdma-therapeutic-alliance.pdf',
      type: 'paper',
      authors: JSON.stringify(['Wagner, A.C.', 'Mithoefer, M.C.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2020.1712617',
      abstract: 'MDMA enhanced therapeutic alliance and trust in the therapy relationship.',
      keywords: JSON.stringify(['MDMA', 'therapeutic alliance', 'trust', 'relationship']),
      citationCount: 89,
      downloadCount: 945
    },
    {
      title: 'MDMA for Treatment-Resistant PTSD: Cost-Effectiveness Analysis',
      description: 'Economic analysis of MDMA-assisted therapy compared to standard treatments.',
      url: 'https://example.com/papers/mdma-cost-effectiveness.pdf',
      type: 'paper',
      authors: JSON.stringify(['Marseille, E.', 'Mitchell, J.M.', 'Kahn, J.G.']),
      journal: 'PLoS ONE',
      doi: '10.1371/journal.pone.0263252',
      abstract: 'MDMA-assisted therapy is cost-effective compared to current treatments.',
      keywords: JSON.stringify(['MDMA', 'cost-effectiveness', 'economics', 'health policy']),
      citationCount: 56,
      downloadCount: 678
    },
    // Ketamine Research (41-55)
    {
      title: 'Ketamine for Treatment-Resistant Depression: Meta-Analysis',
      description: 'Meta-analysis of ketamine efficacy in treatment-resistant depression.',
      url: 'https://example.com/papers/ketamine-trd-meta.pdf',
      type: 'paper',
      authors: JSON.stringify(['Caddy, C.', 'Amit, B.H.', 'McCloud, T.L.']),
      journal: 'Psychological Medicine',
      doi: '10.1017/S0033291714002591',
      abstract: 'Ketamine produces rapid antidepressant effects in treatment-resistant depression.',
      keywords: JSON.stringify(['ketamine', 'depression', 'treatment-resistant', 'meta-analysis']),
      citationCount: 456,
      downloadCount: 3890
    },
    {
      title: 'Esketamine Nasal Spray: FDA Approval and Clinical Use',
      description: 'Review of esketamine nasal spray development and clinical applications.',
      url: 'https://example.com/papers/esketamine-clinical-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Wajs, E.', 'Aluisio, L.', 'Holder, R.']),
      journal: 'Journal of Clinical Psychiatry',
      doi: '10.4088/JCP.19m12891',
      abstract: 'Comprehensive review of esketamine clinical efficacy and safety.',
      keywords: JSON.stringify(['esketamine', 'nasal spray', 'depression', 'FDA']),
      citationCount: 234,
      downloadCount: 2345
    },
    {
      title: 'Ketamine Mechanisms: NMDA and Beyond',
      description: 'Review of ketamine mechanisms of action beyond NMDA receptor antagonism.',
      url: 'https://example.com/papers/ketamine-mechanisms.pdf',
      type: 'paper',
      authors: JSON.stringify(['Abdallah, C.G.', 'Adams, T.G.', 'Kelmendi, B.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/s41386-020-0770-3',
      abstract: 'Ketamine acts through multiple mechanisms beyond NMDA antagonism.',
      keywords: JSON.stringify(['ketamine', 'NMDA', 'mechanisms', 'glutamate']),
      citationCount: 345,
      downloadCount: 2890
    },
    {
      title: 'Ketamine-Assisted Psychotherapy: Clinical Framework',
      description: 'Development of a clinical framework for ketamine-assisted psychotherapy.',
      url: 'https://example.com/papers/ketamine-psychotherapy-framework.pdf',
      type: 'paper',
      authors: JSON.stringify(['Dore, J.', 'Turnipseed, B.', 'Dwyer, S.']),
      journal: 'Frontiers in Psychiatry',
      doi: '10.3389/fpsyt.2019.00572',
      abstract: 'Framework for integrating ketamine with psychotherapy for depression.',
      keywords: JSON.stringify(['ketamine', 'psychotherapy', 'depression', 'integration']),
      citationCount: 123,
      downloadCount: 1345
    },
    {
      title: 'Ketamine for Suicidal Ideation: Rapid Effects',
      description: 'Study of ketamine effects on suicidal ideation in emergency settings.',
      url: 'https://example.com/papers/ketamine-suicidal-ideation.pdf',
      type: 'paper',
      authors: JSON.stringify(['Wilkinson, S.T.', 'Ballard, E.D.', 'Bloch, M.H.']),
      journal: 'American Journal of Psychiatry',
      doi: '10.1176/appi.ajp.2017.17040472',
      abstract: 'Ketamine rapidly reduced suicidal ideation within hours.',
      keywords: JSON.stringify(['ketamine', 'suicidal ideation', 'suicide', 'emergency']),
      citationCount: 378,
      downloadCount: 3456
    },
    {
      title: 'Ketamine Infusion Protocols: Optimization Study',
      description: 'Comparison of different ketamine infusion protocols for depression.',
      url: 'https://example.com/papers/ketamine-protocols.pdf',
      type: 'paper',
      authors: JSON.stringify(['Phillips, J.L.', 'Norris, S.', 'Talbot, J.']),
      journal: 'Journal of Clinical Psychopharmacology',
      doi: '10.1097/JCP.0000000000001209',
      abstract: 'Repeated ketamine infusions extended antidepressant response duration.',
      keywords: JSON.stringify(['ketamine', 'infusion', 'protocols', 'optimization']),
      citationCount: 145,
      downloadCount: 1234
    },
    {
      title: 'Ketamine and BDNF: Neuroplasticity Markers',
      description: 'Investigation of ketamine effects on brain-derived neurotrophic factor.',
      url: 'https://example.com/papers/ketamine-bdnf.pdf',
      type: 'paper',
      authors: JSON.stringify(['Haile, C.N.', 'Murrough, J.W.', 'Iosifescu, D.V.']),
      journal: 'Biological Psychiatry',
      doi: '10.1016/j.biopsych.2013.05.032',
      abstract: 'Ketamine increased serum BDNF levels correlated with antidepressant response.',
      keywords: JSON.stringify(['ketamine', 'BDNF', 'neuroplasticity', 'biomarker']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'Ketamine for Chronic Pain: Systematic Review',
      description: 'Systematic review of ketamine for chronic pain management.',
      url: 'https://example.com/papers/ketamine-chronic-pain.pdf',
      type: 'paper',
      authors: JSON.stringify(['Orhurhu, V.', 'Orhurhu, M.S.', 'Bhatia, A.']),
      journal: 'Pain Medicine',
      doi: '10.1093/pm/pnz175',
      abstract: 'Ketamine showed efficacy for various chronic pain conditions.',
      keywords: JSON.stringify(['ketamine', 'chronic pain', 'analgesia', 'review']),
      citationCount: 167,
      downloadCount: 1567
    },
    {
      title: 'Ketamine Therapy: Dissociation and Therapeutic Outcomes',
      description: 'Study of dissociative experiences during ketamine and their relationship to outcomes.',
      url: 'https://example.com/papers/ketamine-dissociation.pdf',
      type: 'paper',
      authors: JSON.stringify(['Luckenbaugh, D.A.', 'Niciu, M.J.', 'Ionescu, D.F.']),
      journal: 'Journal of Affective Disorders',
      doi: '10.1016/j.jad.2014.02.017',
      abstract: 'Dissociative experiences correlated with antidepressant response.',
      keywords: JSON.stringify(['ketamine', 'dissociation', 'outcomes', 'predictors']),
      citationCount: 189,
      downloadCount: 1678
    },
    {
      title: 'Ketamine in Bipolar Depression: Efficacy and Safety',
      description: 'Controlled trial of ketamine for bipolar depression.',
      url: 'https://example.com/papers/ketamine-bipolar.pdf',
      type: 'paper',
      authors: JSON.stringify(['Diazgranados, N.', 'Ibrahim, L.', 'Brutsche, N.E.']),
      journal: 'Archives of General Psychiatry',
      doi: '10.1001/archgenpsychiatry.2010.83',
      abstract: 'Ketamine produced rapid antidepressant effects in bipolar depression.',
      keywords: JSON.stringify(['ketamine', 'bipolar', 'depression', 'rapid']),
      citationCount: 456,
      downloadCount: 3456
    },
    {
      title: 'Oral Ketamine for Depression: Feasibility Study',
      description: 'Assessment of oral ketamine as an alternative to intravenous administration.',
      url: 'https://example.com/papers/ketamine-oral.pdf',
      type: 'paper',
      authors: JSON.stringify(['Galvez, V.', 'Li, A.', 'Huggins, C.']),
      journal: 'Journal of Affective Disorders',
      doi: '10.1016/j.jad.2018.02.043',
      abstract: 'Oral ketamine showed antidepressant efficacy with practical advantages.',
      keywords: JSON.stringify(['ketamine', 'oral', 'administration', 'feasibility']),
      citationCount: 89,
      downloadCount: 987
    },
    {
      title: 'Ketamine and Glutamate: Neuroimaging Studies',
      description: 'MRS studies of ketamine effects on glutamate levels.',
      url: 'https://example.com/papers/ketamine-glutamate-mrs.pdf',
      type: 'paper',
      authors: JSON.stringify(['Abdallah, C.G.', 'Sanacora, G.', 'Krystal, J.H.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/s41386-018-0046-1',
      abstract: 'Ketamine modulated prefrontal glutamate levels.',
      keywords: JSON.stringify(['ketamine', 'glutamate', 'MRS', 'neuroimaging']),
      citationCount: 156,
      downloadCount: 1345
    },
    {
      title: 'Ketamine Clinic Implementation Guidelines',
      description: 'Clinical guidelines for establishing ketamine treatment clinics.',
      url: 'https://example.com/papers/ketamine-clinic-guidelines.pdf',
      type: 'paper',
      authors: JSON.stringify(['Sanacora, G.', 'Frye, M.A.', 'McDonald, W.']),
      journal: 'JAMA Psychiatry',
      doi: '10.1001/jamapsychiatry.2017.0080',
      abstract: 'Consensus statement on ketamine treatment implementation.',
      keywords: JSON.stringify(['ketamine', 'clinic', 'guidelines', 'implementation']),
      citationCount: 678,
      downloadCount: 5678
    },
    {
      title: 'Ketamine for Obsessive-Compulsive Disorder',
      description: 'Randomized trial of ketamine for treatment-resistant OCD.',
      url: 'https://example.com/papers/ketamine-ocd.pdf',
      type: 'paper',
      authors: JSON.stringify(['Rodriguez, C.I.', 'Kegeles, L.S.', 'Levinson, A.']),
      journal: 'Biological Psychiatry',
      doi: '10.1016/j.biopsych.2013.06.010',
      abstract: 'Ketamine produced rapid anti-obsessional effects.',
      keywords: JSON.stringify(['ketamine', 'OCD', 'obsessive-compulsive', 'glutamate']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'Ketamine Maintenance Therapy: Long-Term Outcomes',
      description: 'Study of repeated ketamine treatments for maintaining antidepressant response.',
      url: 'https://example.com/papers/ketamine-maintenance.pdf',
      type: 'paper',
      authors: JSON.stringify(['Murrough, J.W.', 'Perez, A.M.', 'Pillemer, S.']),
      journal: 'American Journal of Psychiatry',
      doi: '10.1176/appi.ajp.2013.12121411',
      abstract: 'Repeated ketamine maintained antidepressant benefits in responders.',
      keywords: JSON.stringify(['ketamine', 'maintenance', 'long-term', 'treatment']),
      citationCount: 345,
      downloadCount: 2789
    },
    // LSD Research (56-70)
    {
      title: 'LSD-Assisted Psychotherapy: Modern Clinical Trials',
      description: 'Overview of contemporary LSD-assisted psychotherapy research.',
      url: 'https://example.com/papers/lsd-psychotherapy-modern.pdf',
      type: 'paper',
      authors: JSON.stringify(['Gasser, P.', 'Kirchner, K.', 'Passie, T.']),
      journal: 'Journal of Nervous and Mental Disease',
      doi: '10.1097/NMD.0000000000000113',
      abstract: 'LSD-assisted psychotherapy showed safety and efficacy in anxiety treatment.',
      keywords: JSON.stringify(['LSD', 'psychotherapy', 'anxiety', 'clinical trial']),
      citationCount: 234,
      downloadCount: 2345
    },
    {
      title: 'LSD Microdosing: Double-Blind Controlled Study',
      description: 'First controlled study of LSD microdosing effects.',
      url: 'https://example.com/papers/lsd-microdosing-controlled.pdf',
      type: 'paper',
      authors: JSON.stringify(['Yanakieva, S.', 'Polychroni, N.', 'Family, N.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-018-5106-5',
      abstract: 'LSD microdoses produced subtle effects on time perception.',
      keywords: JSON.stringify(['LSD', 'microdosing', 'controlled study', 'cognition']),
      citationCount: 145,
      downloadCount: 1567
    },
    {
      title: 'LSD and Brain Connectivity: Neuroimaging Study',
      description: 'Comprehensive neuroimaging study of LSD effects on brain connectivity.',
      url: 'https://example.com/papers/lsd-brain-connectivity.pdf',
      type: 'paper',
      authors: JSON.stringify(['Carhart-Harris, R.L.', 'Muthukumaraswamy, S.', 'Roseman, L.']),
      journal: 'Proceedings of the National Academy of Sciences',
      doi: '10.1073/pnas.1518377113',
      abstract: 'LSD increased global functional connectivity across the brain.',
      keywords: JSON.stringify(['LSD', 'connectivity', 'fMRI', 'neuroimaging']),
      citationCount: 567,
      downloadCount: 4567
    },
    {
      title: 'LSD Effects on Language Processing',
      description: 'Study of LSD effects on semantic processing and language.',
      url: 'https://example.com/papers/lsd-language.pdf',
      type: 'paper',
      authors: JSON.stringify(['Family, N.', 'Vinson, D.', 'Vigliocco, G.']),
      journal: 'Language, Cognition and Neuroscience',
      doi: '10.1080/23273798.2016.1217030',
      abstract: 'LSD enhanced semantic activation and creative language use.',
      keywords: JSON.stringify(['LSD', 'language', 'semantics', 'cognition']),
      citationCount: 89,
      downloadCount: 978
    },
    {
      title: 'LSD for Cluster Headache: Clinical Evidence',
      description: 'Review of LSD efficacy in cluster headache treatment.',
      url: 'https://example.com/papers/lsd-cluster-headache.pdf',
      type: 'paper',
      authors: JSON.stringify(['Sewell, R.A.', 'Halpern, J.H.', 'Pope, H.G.']),
      journal: 'Cephalalgia',
      doi: '10.1177/0333102420939171',
      abstract: 'LSD showed promising results for cluster headache prophylaxis.',
      keywords: JSON.stringify(['LSD', 'cluster headache', 'headache', 'treatment']),
      citationCount: 156,
      downloadCount: 1345
    },
    {
      title: 'LSD Pharmacology: Receptor Binding Profile',
      description: 'Comprehensive analysis of LSD receptor binding and pharmacology.',
      url: 'https://example.com/papers/lsd-pharmacology.pdf',
      type: 'paper',
      authors: JSON.stringify(['Rickli, A.', 'Moning, O.D.', 'Hoener, M.C.']),
      journal: 'Neuropharmacology',
      doi: '10.1016/j.neuropharm.2015.08.034',
      abstract: 'LSD binds to multiple serotonin, dopamine, and adrenergic receptors.',
      keywords: JSON.stringify(['LSD', 'pharmacology', 'receptors', 'serotonin']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'LSD and Music: Emotional Enhancement Effects',
      description: 'Study of LSD effects on emotional responses to music.',
      url: 'https://example.com/papers/lsd-music.pdf',
      type: 'paper',
      authors: JSON.stringify(['Kaelen, M.', 'Barrett, F.S.', 'Roseman, L.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-015-4014-y',
      abstract: 'LSD enhanced emotional responses to music and personal meaning.',
      keywords: JSON.stringify(['LSD', 'music', 'emotion', 'enhancement']),
      citationCount: 178,
      downloadCount: 1567
    },
    {
      title: 'LSD and Visual Processing: EEG Study',
      description: 'Electroencephalographic study of LSD effects on visual processing.',
      url: 'https://example.com/papers/lsd-visual-eeg.pdf',
      type: 'paper',
      authors: JSON.stringify(['Schartner, M.M.', 'Carhart-Harris, R.L.', 'Barrett, A.B.']),
      journal: 'Scientific Reports',
      doi: '10.1038/srep46421',
      abstract: 'LSD increased neural signal diversity and visual cortex activity.',
      keywords: JSON.stringify(['LSD', 'visual', 'EEG', 'neural diversity']),
      citationCount: 234,
      downloadCount: 2123
    },
    {
      title: 'LSD Effects on Ego Dissolution and Connectedness',
      description: 'Investigation of LSD effects on self-boundaries and feelings of unity.',
      url: 'https://example.com/papers/lsd-ego-dissolution.pdf',
      type: 'paper',
      authors: JSON.stringify(['Nour, M.M.', 'Evans, L.', 'Nutt, D.J.']),
      journal: 'Consciousness and Cognition',
      doi: '10.1016/j.concog.2016.01.017',
      abstract: 'LSD produced ego dissolution correlated with increased nature connectedness.',
      keywords: JSON.stringify(['LSD', 'ego dissolution', 'connectedness', 'consciousness']),
      citationCount: 289,
      downloadCount: 2456
    },
    {
      title: 'LSD Safety in Modern Research Settings',
      description: 'Analysis of adverse events and safety protocols in LSD research.',
      url: 'https://example.com/papers/lsd-safety.pdf',
      type: 'paper',
      authors: JSON.stringify(['Liechti, M.E.', 'Holze, F.', 'Schmid, Y.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-020-05523-2',
      abstract: 'LSD has acceptable safety when administered in controlled settings.',
      keywords: JSON.stringify(['LSD', 'safety', 'adverse events', 'clinical']),
      citationCount: 167,
      downloadCount: 1456
    },
    {
      title: 'LSD and Suggestibility: Psychological Mechanisms',
      description: 'Study of how LSD affects suggestibility and openness.',
      url: 'https://example.com/papers/lsd-suggestibility.pdf',
      type: 'paper',
      authors: JSON.stringify(['Carhart-Harris, R.L.', 'Kaelen, M.', 'Whalley, M.G.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-014-3714-z',
      abstract: 'LSD increased suggestibility and trait openness.',
      keywords: JSON.stringify(['LSD', 'suggestibility', 'openness', 'personality']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'LSD Dose-Response Relationship: Subjective Effects',
      description: 'Characterization of LSD dose-response for subjective experiences.',
      url: 'https://example.com/papers/lsd-dose-response.pdf',
      type: 'paper',
      authors: JSON.stringify(['Holze, F.', 'Vizeli, P.', 'Muller, F.']),
      journal: 'Neuropsychopharmacology',
      doi: '10.1038/s41386-019-0569-3',
      abstract: 'LSD produced dose-dependent increases in psychedelic effects.',
      keywords: JSON.stringify(['LSD', 'dose-response', 'subjective effects', 'pharmacology']),
      citationCount: 145,
      downloadCount: 1234
    },
    {
      title: 'LSD for Anxiety in Terminal Illness',
      description: 'Study of LSD-assisted psychotherapy for end-of-life anxiety.',
      url: 'https://example.com/papers/lsd-terminal-anxiety.pdf',
      type: 'paper',
      authors: JSON.stringify(['Gasser, P.', 'Holstein, D.', 'Michel, Y.']),
      journal: 'Journal of Nervous and Mental Disease',
      doi: '10.1097/NMD.0000000000000113',
      abstract: 'LSD-assisted therapy reduced anxiety in patients facing death.',
      keywords: JSON.stringify(['LSD', 'anxiety', 'terminal illness', 'end-of-life']),
      citationCount: 189,
      downloadCount: 1567
    },
    {
      title: 'LSD and Meditation: Comparative Neuroimaging',
      description: 'Comparison of brain states during LSD and advanced meditation.',
      url: 'https://example.com/papers/lsd-meditation-comparison.pdf',
      type: 'paper',
      authors: JSON.stringify(['Milliere, R.', 'Carhart-Harris, R.L.', 'Roseman, L.']),
      journal: 'Frontiers in Psychology',
      doi: '10.3389/fpsyg.2018.01475',
      abstract: 'LSD and meditation produced overlapping changes in brain connectivity.',
      keywords: JSON.stringify(['LSD', 'meditation', 'neuroimaging', 'comparison']),
      citationCount: 178,
      downloadCount: 1456
    },
    {
      title: 'LSD and Creativity: Controlled Laboratory Study',
      description: 'Rigorous assessment of LSD effects on creative thinking.',
      url: 'https://example.com/papers/lsd-creativity-controlled.pdf',
      type: 'paper',
      authors: JSON.stringify(['Sessa, B.', 'Sakel, M.', 'Gould, M.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881121995793',
      abstract: 'LSD enhanced specific aspects of creative cognition.',
      keywords: JSON.stringify(['LSD', 'creativity', 'cognition', 'divergent thinking']),
      citationCount: 67,
      downloadCount: 789
    },
    // Ayahuasca Research (71-85)
    {
      title: 'Ayahuasca for Treatment-Resistant Depression: Clinical Trial',
      description: 'Randomized placebo-controlled trial of ayahuasca for depression.',
      url: 'https://example.com/papers/ayahuasca-depression-rct.pdf',
      type: 'paper',
      authors: JSON.stringify(['Palhano-Fontes, F.', 'Barreto, D.', 'Onias, H.']),
      journal: 'Psychological Medicine',
      doi: '10.1017/S0033291718001356',
      abstract: 'Ayahuasca produced rapid antidepressant effects in treatment-resistant patients.',
      keywords: JSON.stringify(['ayahuasca', 'depression', 'RCT', 'antidepressant']),
      citationCount: 234,
      downloadCount: 2345
    },
    {
      title: 'Ayahuasca Neuroimaging: Default Mode Network Effects',
      description: 'fMRI study of ayahuasca effects on brain network connectivity.',
      url: 'https://example.com/papers/ayahuasca-dmn-fmri.pdf',
      type: 'paper',
      authors: JSON.stringify(['Palhano-Fontes, F.', 'Andrade, K.C.', 'Tofoli, L.F.']),
      journal: 'PLoS ONE',
      doi: '10.1371/journal.pone.0118143',
      abstract: 'Ayahuasca decreased activity in default mode network regions.',
      keywords: JSON.stringify(['ayahuasca', 'DMN', 'fMRI', 'neuroimaging']),
      citationCount: 289,
      downloadCount: 2456
    },
    {
      title: 'Ayahuasca and Mindfulness: Psychological Mechanisms',
      description: 'Investigation of mindfulness-related processes during ayahuasca experiences.',
      url: 'https://example.com/papers/ayahuasca-mindfulness.pdf',
      type: 'paper',
      authors: JSON.stringify(['Soler, J.', 'Elices, M.', 'Franquesa, A.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-016-4362-7',
      abstract: 'Ayahuasca increased mindfulness and decentering abilities.',
      keywords: JSON.stringify(['ayahuasca', 'mindfulness', 'decentering', 'meditation']),
      citationCount: 167,
      downloadCount: 1456
    },
    {
      title: 'Ayahuasca Safety Profile: Systematic Review',
      description: 'Comprehensive review of ayahuasca safety and adverse events.',
      url: 'https://example.com/papers/ayahuasca-safety-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['dos Santos, R.G.', 'Bouso, J.C.', 'Alcazar-Corcoles, M.A.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881116652532',
      abstract: 'Ayahuasca has acceptable safety in controlled settings.',
      keywords: JSON.stringify(['ayahuasca', 'safety', 'adverse events', 'review']),
      citationCount: 345,
      downloadCount: 2789
    },
    {
      title: 'Ayahuasca for Grief and Bereavement',
      description: 'Study of ayahuasca ceremonial use for processing grief.',
      url: 'https://example.com/papers/ayahuasca-grief.pdf',
      type: 'paper',
      authors: JSON.stringify(['Gonzalez, D.', 'Cantillo, J.', 'Perez, I.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2020.1728685',
      abstract: 'Ayahuasca ceremonies helped process grief and find meaning.',
      keywords: JSON.stringify(['ayahuasca', 'grief', 'bereavement', 'ceremony']),
      citationCount: 56,
      downloadCount: 678
    },
    {
      title: 'DMT Pharmacology: Endogenous and Exogenous',
      description: 'Review of DMT pharmacology and its role as an endogenous compound.',
      url: 'https://example.com/papers/dmt-pharmacology.pdf',
      type: 'paper',
      authors: JSON.stringify(['Barker, S.A.', 'Borjigin, J.', 'Lomnicka, I.']),
      journal: 'Drug Testing and Analysis',
      doi: '10.1002/dta.2271',
      abstract: 'DMT is produced endogenously and acts at multiple receptors.',
      keywords: JSON.stringify(['DMT', 'pharmacology', 'endogenous', 'sigma-1']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'Ayahuasca and Addiction Treatment',
      description: 'Review of ayahuasca potential for treating substance use disorders.',
      url: 'https://example.com/papers/ayahuasca-addiction.pdf',
      type: 'paper',
      authors: JSON.stringify(['Thomas, G.', 'Lucas, P.', 'Capler, N.R.']),
      journal: 'Current Drug Abuse Reviews',
      doi: '10.2174/1874473706666131205113532',
      abstract: 'Ayahuasca showed promise for treating various addictions.',
      keywords: JSON.stringify(['ayahuasca', 'addiction', 'substance use', 'treatment']),
      citationCount: 189,
      downloadCount: 1567
    },
    {
      title: 'Ayahuasca Ceremony Setting and Outcomes',
      description: 'Study of how ceremony setting influences ayahuasca outcomes.',
      url: 'https://example.com/papers/ayahuasca-ceremony-setting.pdf',
      type: 'paper',
      authors: JSON.stringify(['Uthaug, M.V.', 'van Oorsouw, K.', 'Kuypers, K.P.C.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2018.1426002',
      abstract: 'Ceremony setting influenced the nature and benefits of experiences.',
      keywords: JSON.stringify(['ayahuasca', 'ceremony', 'set and setting', 'context']),
      citationCount: 89,
      downloadCount: 987
    },
    {
      title: 'Ayahuasca and Long-Term Psychological Well-Being',
      description: 'Longitudinal study of ayahuasca users psychological health.',
      url: 'https://example.com/papers/ayahuasca-wellbeing-longitudinal.pdf',
      type: 'paper',
      authors: JSON.stringify(['Bouso, J.C.', 'Gonzalez, D.', 'Fondevila, S.']),
      journal: 'PLoS ONE',
      doi: '10.1371/journal.pone.0042421',
      abstract: 'Long-term ayahuasca use associated with maintained psychological health.',
      keywords: JSON.stringify(['ayahuasca', 'well-being', 'longitudinal', 'mental health']),
      citationCount: 234,
      downloadCount: 1890
    },
    {
      title: 'Ayahuasca Neuroimaging: Visual Cortex Activation',
      description: 'Study of ayahuasca effects on visual cortex during closed-eye imagery.',
      url: 'https://example.com/papers/ayahuasca-visual-cortex.pdf',
      type: 'paper',
      authors: JSON.stringify(['de Araujo, D.B.', 'Ribeiro, S.', 'Aguilar, L.A.']),
      journal: 'Human Brain Mapping',
      doi: '10.1002/hbm.21381',
      abstract: 'Ayahuasca activated visual cortex during closed-eye imagery.',
      keywords: JSON.stringify(['ayahuasca', 'visual cortex', 'imagery', 'fMRI']),
      citationCount: 156,
      downloadCount: 1345
    },
    {
      title: 'Ayahuasca and PTSD: Preliminary Evidence',
      description: 'Observational study of ayahuasca effects on PTSD symptoms.',
      url: 'https://example.com/papers/ayahuasca-ptsd.pdf',
      type: 'paper',
      authors: JSON.stringify(['Nielsen, E.', 'May, D.', 'Cohn, E.']),
      journal: 'Journal of Psychedelic Studies',
      doi: '10.1556/2054.2020.00142',
      abstract: 'Ayahuasca ceremony attendance associated with reduced PTSD symptoms.',
      keywords: JSON.stringify(['ayahuasca', 'PTSD', 'trauma', 'observational']),
      citationCount: 67,
      downloadCount: 789
    },
    {
      title: 'Ayahuasca Components: Synergistic Effects',
      description: 'Investigation of interactions between DMT and harmine in ayahuasca.',
      url: 'https://example.com/papers/ayahuasca-synergy.pdf',
      type: 'paper',
      authors: JSON.stringify(['McKenna, D.J.', 'Towers, G.H.N.', 'Abbott, F.S.']),
      journal: 'Journal of Ethnopharmacology',
      doi: '10.1016/0378-8741(84)90062-3',
      abstract: 'MAO inhibition by harmine enables oral DMT activity.',
      keywords: JSON.stringify(['ayahuasca', 'DMT', 'harmine', 'synergy']),
      citationCount: 567,
      downloadCount: 4567
    },
    {
      title: 'Ayahuasca Ceremony Integration Practices',
      description: 'Qualitative study of integration practices following ayahuasca ceremonies.',
      url: 'https://example.com/papers/ayahuasca-integration.pdf',
      type: 'paper',
      authors: JSON.stringify(['Lafrance, A.', 'Loizaga-Velder, A.', 'Fletcher, J.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2017.1306695',
      abstract: 'Integration practices enhanced and sustained ceremony benefits.',
      keywords: JSON.stringify(['ayahuasca', 'integration', 'ceremony', 'qualitative']),
      citationCount: 78,
      downloadCount: 890
    },
    {
      title: 'Ayahuasca and Personality: Long-Term Changes',
      description: 'Study of personality changes in long-term ayahuasca users.',
      url: 'https://example.com/papers/ayahuasca-personality.pdf',
      type: 'paper',
      authors: JSON.stringify(['Barbosa, P.C.R.', 'Mizumoto, S.', 'Bogenschutz, M.P.']),
      journal: 'Journal of Psychoactive Drugs',
      doi: '10.1080/02791072.2012.703100',
      abstract: 'Long-term ayahuasca use associated with personality changes.',
      keywords: JSON.stringify(['ayahuasca', 'personality', 'long-term', 'psychological']),
      citationCount: 145,
      downloadCount: 1234
    },
    {
      title: 'Harmine and Neurogenesis: Preclinical Evidence',
      description: 'Study of harmine effects on hippocampal neurogenesis.',
      url: 'https://example.com/papers/harmine-neurogenesis.pdf',
      type: 'paper',
      authors: JSON.stringify(['Morales-Garcia, J.A.', 'de la Fuente Revenga, M.', 'Alonso-Gil, S.']),
      journal: 'Stem Cell Reports',
      doi: '10.1016/j.stemcr.2017.06.009',
      abstract: 'Harmine promoted neural stem cell proliferation and differentiation.',
      keywords: JSON.stringify(['harmine', 'neurogenesis', 'ayahuasca', 'stem cells']),
      citationCount: 178,
      downloadCount: 1456
    },
    // Integration and Clinical Practice (86-100)
    {
      title: 'Psychedelic Integration: A Systematic Framework',
      description: 'Development of a comprehensive framework for psychedelic integration.',
      url: 'https://example.com/papers/integration-framework.pdf',
      type: 'paper',
      authors: JSON.stringify(['Bathje, G.J.', 'Majeski, E.', 'Kudowor, M.']),
      journal: 'Journal of Humanistic Psychology',
      doi: '10.1177/00221678211013909',
      abstract: 'Comprehensive framework for integration across different substances and contexts.',
      keywords: JSON.stringify(['integration', 'framework', 'psychotherapy', 'clinical']),
      citationCount: 89,
      downloadCount: 1234
    },
    {
      title: 'Therapist Competencies in Psychedelic-Assisted Therapy',
      description: 'Expert consensus on core competencies for psychedelic therapists.',
      url: 'https://example.com/papers/therapist-competencies.pdf',
      type: 'paper',
      authors: JSON.stringify(['Phelps, J.', 'Shah, R.', 'Engberg, J.']),
      journal: 'Frontiers in Psychiatry',
      doi: '10.3389/fpsyt.2022.898522',
      abstract: 'Core competencies identified for psychedelic-assisted therapy practice.',
      keywords: JSON.stringify(['competencies', 'training', 'therapy', 'professional']),
      citationCount: 56,
      downloadCount: 678
    },
    {
      title: 'Set and Setting: Evidence-Based Guidelines',
      description: 'Systematic review informing set and setting guidelines for psychedelic therapy.',
      url: 'https://example.com/papers/set-setting-guidelines.pdf',
      type: 'paper',
      authors: JSON.stringify(['Hartogsohn, I.', 'Barrett, F.S.', 'Carhart-Harris, R.L.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/02698811211045619',
      abstract: 'Evidence-based guidelines for optimizing set and setting.',
      keywords: JSON.stringify(['set and setting', 'guidelines', 'environment', 'preparation']),
      citationCount: 145,
      downloadCount: 1567
    },
    {
      title: 'Music in Psychedelic Therapy: Systematic Review',
      description: 'Review of music selection and effects in psychedelic-assisted therapy.',
      url: 'https://example.com/papers/music-psychedelic-therapy.pdf',
      type: 'paper',
      authors: JSON.stringify(['Barrett, F.S.', 'Preller, K.H.', 'Kaelen, M.']),
      journal: 'Frontiers in Psychology',
      doi: '10.3389/fpsyg.2017.01238',
      abstract: 'Music significantly influences psychedelic therapy outcomes.',
      keywords: JSON.stringify(['music', 'therapy', 'psychedelic', 'treatment']),
      citationCount: 234,
      downloadCount: 2345
    },
    {
      title: 'Adverse Events in Psychedelic Research: Systematic Review',
      description: 'Comprehensive review of adverse events across psychedelic clinical trials.',
      url: 'https://example.com/papers/adverse-events-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Simonsson, O.', 'Goldberg, S.B.', 'Marks, S.']),
      journal: 'JAMA Psychiatry',
      doi: '10.1001/jamapsychiatry.2023.0035',
      abstract: 'Psychedelics have acceptable safety profiles in controlled settings.',
      keywords: JSON.stringify(['adverse events', 'safety', 'review', 'clinical trials']),
      citationCount: 178,
      downloadCount: 1890
    },
    {
      title: 'Psychedelic Therapy Ethics: Guidelines and Considerations',
      description: 'Ethical framework for psychedelic-assisted psychotherapy practice.',
      url: 'https://example.com/papers/psychedelic-ethics.pdf',
      type: 'paper',
      authors: JSON.stringify(['Smith, W.R.', 'Anderson, B.T.', 'Sessa, B.']),
      journal: 'Journal of Psychedelic Studies',
      doi: '10.1556/2054.2022.00182',
      abstract: 'Ethical guidelines for responsible psychedelic therapy practice.',
      keywords: JSON.stringify(['ethics', 'guidelines', 'therapy', 'professional']),
      citationCount: 89,
      downloadCount: 987
    },
    {
      title: 'Screening Protocols for Psychedelic Therapy',
      description: 'Development of standardized screening protocols for psychedelic research.',
      url: 'https://example.com/papers/screening-protocols.pdf',
      type: 'paper',
      authors: JSON.stringify(['Johnson, M.W.', 'Richards, W.A.', 'Griffiths, R.R.']),
      journal: 'Psychopharmacology',
      doi: '10.1007/s00213-018-4921-y',
      abstract: 'Standardized screening protocols for safe psychedelic administration.',
      keywords: JSON.stringify(['screening', 'protocols', 'safety', 'eligibility']),
      citationCount: 234,
      downloadCount: 2123
    },
    {
      title: 'Group Psychedelic Therapy: Models and Outcomes',
      description: 'Review of group-based approaches to psychedelic-assisted therapy.',
      url: 'https://example.com/papers/group-therapy-models.pdf',
      type: 'paper',
      authors: JSON.stringify(['Trope, A.', 'Anderson, B.T.', 'Hooker, A.R.']),
      journal: 'Frontiers in Psychiatry',
      doi: '10.3389/fpsyt.2019.00616',
      abstract: 'Group therapy models show promise for psychedelic-assisted treatment.',
      keywords: JSON.stringify(['group therapy', 'models', 'psychedelic', 'treatment']),
      citationCount: 67,
      downloadCount: 789
    },
    {
      title: 'Psychedelic-Assisted Therapy: Insurance and Reimbursement',
      description: 'Analysis of insurance coverage considerations for psychedelic therapy.',
      url: 'https://example.com/papers/insurance-reimbursement.pdf',
      type: 'paper',
      authors: JSON.stringify(['Cohen, M.', 'Smith, J.', 'Anderson, B.']),
      journal: 'Health Affairs',
      doi: '10.1377/hlthaff.2023.00412',
      abstract: 'Framework for insurance coverage of psychedelic-assisted therapy.',
      keywords: JSON.stringify(['insurance', 'reimbursement', 'health policy', 'coverage']),
      citationCount: 34,
      downloadCount: 456
    },
    {
      title: 'Challenging Experiences in Psychedelic Therapy: Management',
      description: 'Guidelines for managing difficult experiences during psychedelic sessions.',
      url: 'https://example.com/papers/challenging-experiences.pdf',
      type: 'paper',
      authors: JSON.stringify(['Barrett, F.S.', 'Carbonaro, T.M.', 'Hurwitz, E.']),
      journal: 'Journal of Psychopharmacology',
      doi: '10.1177/0269881116670283',
      abstract: 'Guidelines for supporting patients through challenging psychedelic experiences.',
      keywords: JSON.stringify(['challenging experiences', 'management', 'support', 'therapy']),
      citationCount: 189,
      downloadCount: 1678
    },
    {
      title: 'Biomarkers of Psychedelic Response: Review',
      description: 'Review of potential biomarkers predicting psychedelic therapy outcomes.',
      url: 'https://example.com/papers/biomarkers-review.pdf',
      type: 'paper',
      authors: JSON.stringify(['Olson, J.A.', 'Barrett, F.S.', 'Preller, K.H.']),
      journal: 'Biological Psychiatry',
      doi: '10.1016/j.biopsych.2022.08.014',
      abstract: 'Potential biomarkers for predicting and monitoring treatment response.',
      keywords: JSON.stringify(['biomarkers', 'prediction', 'treatment response', 'precision medicine']),
      citationCount: 78,
      downloadCount: 890
    },
    {
      title: 'Psychedelic Therapy for Healthcare Workers: Pilot Study',
      description: 'Study of psychedelic-assisted therapy for burnout in healthcare workers.',
      url: 'https://example.com/papers/healthcare-workers-burnout.pdf',
      type: 'paper',
      authors: JSON.stringify(['Zeifman, R.J.', 'Palhano-Fontes, F.', 'Hallak, J.']),
      journal: 'Frontiers in Psychiatry',
      doi: '10.3389/fpsyt.2022.874321',
      abstract: 'Psychedelic therapy showed promise for healthcare worker burnout.',
      keywords: JSON.stringify(['healthcare workers', 'burnout', 'occupational health', 'pilot']),
      citationCount: 45,
      downloadCount: 567
    },
    {
      title: 'Diversity and Inclusion in Psychedelic Research',
      description: 'Analysis of diversity in psychedelic clinical trial participation.',
      url: 'https://example.com/papers/diversity-inclusion.pdf',
      type: 'paper',
      authors: JSON.stringify(['George, J.R.', 'Michaels, T.I.', 'Sevelius, J.']),
      journal: 'BMC Psychiatry',
      doi: '10.1186/s12888-022-04116-4',
      abstract: 'Recommendations for improving diversity in psychedelic research.',
      keywords: JSON.stringify(['diversity', 'inclusion', 'equity', 'clinical trials']),
      citationCount: 67,
      downloadCount: 789
    },
    {
      title: 'Integration Best Practices: A Clinicians Guide',
      description: 'Practical guide for therapists on evidence-based integration practices.',
      url: 'https://example.com/guides/integration-best-practices.pdf',
      type: 'document',
      authors: JSON.stringify(['Martinez, C.']),
      keywords: JSON.stringify(['integration', 'therapy', 'best practices']),
      downloadCount: 2345
    },
    {
      title: 'MDMA-Assisted Therapy for PTSD: Phase 3 Trial Dataset',
      description: 'Anonymized dataset from the MAPS-sponsored Phase 3 clinical trial.',
      url: 'https://example.com/datasets/mdma-ptsd-phase3.zip',
      type: 'dataset',
      authors: JSON.stringify(['MAPS Research Team']),
      keywords: JSON.stringify(['MDMA', 'PTSD', 'clinical trial', 'dataset']),
      downloadCount: 1890
    }
  ];

  // Create research assets with rotating owners
  const owners = [alice, bob, carol, david, admin];
  const createdAssets = [];

  // Helper to generate additional fields for research assets
  const enhanceArticleData = (article, index) => {
    // Determine topics based on keywords or title
    const title = article.title.toLowerCase();
    let topics = [];
    if (title.includes('psilocybin')) topics.push('psilocybin');
    if (title.includes('mdma')) topics.push('mdma');
    if (title.includes('lsd')) topics.push('lsd');
    if (title.includes('ketamine') || title.includes('esketamine')) topics.push('ketamine');
    if (title.includes('ayahuasca') || title.includes('dmt') || title.includes('harmine')) topics.push('ayahuasca');
    if (title.includes('therapy') || title.includes('clinical') || title.includes('treatment')) topics.push('therapy');
    if (title.includes('neuro') || title.includes('brain') || title.includes('fmri') || title.includes('eeg')) topics.push('neuroscience');
    if (topics.length === 0) topics.push('general');

    // Determine research type
    let researchType = 'basic-science';
    if (title.includes('review') || title.includes('meta-analysis')) researchType = 'review';
    else if (title.includes('trial') || title.includes('rct') || title.includes('controlled')) researchType = 'clinical-trial';
    else if (title.includes('qualitative') || title.includes('experience')) researchType = 'qualitative';
    else if (title.includes('meta-analysis')) researchType = 'meta-analysis';

    // Determine methodology
    let methodology = null;
    if (title.includes('randomized') || title.includes('rct') || title.includes('controlled')) methodology = 'RCT';
    else if (title.includes('open-label') || title.includes('pilot')) methodology = 'open-label';
    else if (title.includes('systematic review')) methodology = 'systematic-review';
    else if (title.includes('cohort') || title.includes('longitudinal')) methodology = 'cohort';

    // Generate searchIndex for relevance searching
    const searchIndex = [
      article.title,
      article.description || '',
      article.abstract || '',
      article.journal || '',
      ...(typeof article.keywords === 'string' ? JSON.parse(article.keywords) : (article.keywords || []))
    ].join(' ').toLowerCase();

    return {
      ...article,
      topics: article.topics || JSON.stringify(topics),
      researchType: article.researchType || researchType,
      methodology: article.methodology || methodology,
      sampleSize: article.sampleSize || (researchType === 'clinical-trial' ? Math.floor(Math.random() * 200) + 20 : null),
      openAccess: article.openAccess !== undefined ? article.openAccess : Math.random() > 0.4,
      peerReviewed: article.peerReviewed !== undefined ? article.peerReviewed : true,
      viewCount: article.viewCount || Math.floor(Math.random() * 5000) + 500,
      commentCount: 0,
      searchIndex
    };
  };

  for (let i = 0; i < researchArticlesData.length; i++) {
    const owner = owners[i % owners.length];
    const enhancedData = enhanceArticleData(researchArticlesData[i], i);
    const asset = await prisma.researchAsset.create({
      data: {
        ...enhancedData,
        ownerId: owner.id
      }
    });
    createdAssets.push(asset);
  }

  console.log(`✓ Created ${researchArticlesData.length} research articles`);

  // Add paper reviews for selected assets
  const reviewData = [];
  const reviewers = [alice, bob, carol, david];
  const reviewTexts = [
    'Excellent comprehensive review. The methodology section is particularly thorough.',
    'Very informative. Would have liked more discussion of clinical implications.',
    'Invaluable resource for researchers. Well-documented and well-written.',
    'Essential reading for practitioners. Practical and evidence-based.',
    'Great contribution to the field. Minor suggestions for future work.',
    'Solid research with important findings. Methods are reproducible.',
    'Timely and relevant. Addresses an important gap in the literature.',
    'Well-designed study with clear results. Limitations appropriately discussed.'
  ];

  // Add reviews to first 30 assets
  for (let i = 0; i < Math.min(30, createdAssets.length); i++) {
    const numReviews = Math.floor(Math.random() * 3) + 1; // 1-3 reviews per asset
    const usedReviewers = new Set();

    for (let j = 0; j < numReviews; j++) {
      let reviewer;
      do {
        reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
      } while (usedReviewers.has(reviewer.id) || reviewer.id === createdAssets[i].ownerId);

      usedReviewers.add(reviewer.id);

      reviewData.push({
        assetId: createdAssets[i].id,
        userId: reviewer.id,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 rating
        review: reviewTexts[Math.floor(Math.random() * reviewTexts.length)]
      });
    }
  }

  await prisma.paperReview.createMany({ data: reviewData });

  console.log(`✓ Created ${reviewData.length} paper reviews`);

  // ============================================
  // PAPER COLLECTIONS
  // ============================================

  // Create some collections for users
  const aliceCollection1 = await prisma.paperCollection.create({
    data: {
      name: 'Psilocybin Depression Research',
      description: 'My collection of key papers on psilocybin for depression treatment. Includes clinical trials and mechanism studies.',
      isPublic: true,
      ownerId: alice.id
    }
  });

  const aliceCollection2 = await prisma.paperCollection.create({
    data: {
      name: 'Neuroimaging Studies',
      description: 'Brain imaging studies across different psychedelics.',
      isPublic: true,
      ownerId: alice.id
    }
  });

  const bobCollection1 = await prisma.paperCollection.create({
    data: {
      name: 'MDMA-PTSD Treatment Protocol',
      description: 'Essential readings for MDMA-assisted therapy for PTSD. Perfect for clinicians getting started.',
      isPublic: true,
      ownerId: bob.id
    }
  });

  const bobCollection2 = await prisma.paperCollection.create({
    data: {
      name: 'Clinical Safety Papers',
      description: 'Safety profiles and adverse event reviews.',
      isPublic: false,
      ownerId: bob.id
    }
  });

  const carolCollection1 = await prisma.paperCollection.create({
    data: {
      name: 'Integration & Therapy Practices',
      description: 'Papers on integration techniques, set & setting, and therapeutic frameworks.',
      isPublic: true,
      ownerId: carol.id
    }
  });

  const davidCollection1 = await prisma.paperCollection.create({
    data: {
      name: 'Research Methodology',
      description: 'Clinical trial design and methodology papers.',
      isPublic: false,
      ownerId: david.id
    }
  });

  console.log('✓ Created 6 paper collections');

  // Add papers to collections (based on topics)
  const psilocybinPapers = createdAssets.filter(a => a.title.toLowerCase().includes('psilocybin')).slice(0, 8);
  const mdmaPapers = createdAssets.filter(a => a.title.toLowerCase().includes('mdma')).slice(0, 8);
  const neuroPapers = createdAssets.filter(a =>
    a.title.toLowerCase().includes('neuro') ||
    a.title.toLowerCase().includes('brain') ||
    a.title.toLowerCase().includes('fmri')
  ).slice(0, 6);
  const integrationPapers = createdAssets.filter(a =>
    a.title.toLowerCase().includes('integration') ||
    a.title.toLowerCase().includes('therapy') ||
    a.title.toLowerCase().includes('set and setting')
  ).slice(0, 6);
  const safetyPapers = createdAssets.filter(a =>
    a.title.toLowerCase().includes('safety') ||
    a.title.toLowerCase().includes('adverse')
  ).slice(0, 5);

  // Alice's psilocybin collection
  for (let i = 0; i < psilocybinPapers.length; i++) {
    await prisma.paperCollectionItem.create({
      data: {
        collectionId: aliceCollection1.id,
        assetId: psilocybinPapers[i].id,
        orderIndex: i,
        notes: i === 0 ? 'Foundational paper for understanding mechanism' : null
      }
    });
  }

  // Alice's neuroimaging collection
  for (let i = 0; i < neuroPapers.length; i++) {
    await prisma.paperCollectionItem.create({
      data: {
        collectionId: aliceCollection2.id,
        assetId: neuroPapers[i].id,
        orderIndex: i
      }
    });
  }

  // Bob's MDMA collection
  for (let i = 0; i < mdmaPapers.length; i++) {
    await prisma.paperCollectionItem.create({
      data: {
        collectionId: bobCollection1.id,
        assetId: mdmaPapers[i].id,
        orderIndex: i,
        notes: i === 0 ? 'Start here - Phase 3 trial results' : null
      }
    });
  }

  // Bob's safety collection
  for (let i = 0; i < safetyPapers.length; i++) {
    await prisma.paperCollectionItem.create({
      data: {
        collectionId: bobCollection2.id,
        assetId: safetyPapers[i].id,
        orderIndex: i
      }
    });
  }

  // Carol's integration collection
  for (let i = 0; i < integrationPapers.length; i++) {
    await prisma.paperCollectionItem.create({
      data: {
        collectionId: carolCollection1.id,
        assetId: integrationPapers[i].id,
        orderIndex: i
      }
    });
  }

  console.log('✓ Added papers to collections');

  // Add followers to public collections
  await prisma.collectionFollower.createMany({
    data: [
      { collectionId: aliceCollection1.id, userId: bob.id },
      { collectionId: aliceCollection1.id, userId: carol.id },
      { collectionId: aliceCollection1.id, userId: david.id },
      { collectionId: aliceCollection2.id, userId: bob.id },
      { collectionId: bobCollection1.id, userId: alice.id },
      { collectionId: bobCollection1.id, userId: carol.id },
      { collectionId: carolCollection1.id, userId: alice.id },
      { collectionId: carolCollection1.id, userId: bob.id },
      { collectionId: carolCollection1.id, userId: david.id }
    ]
  });

  console.log('✓ Added collection followers');

  // ============================================
  // PAPER DISCUSSIONS (Comments on Research)
  // ============================================

  const discussionComments = [
    'Fascinating methodology here. The control design really addresses my earlier concerns about placebo effects.',
    'Has anyone tried replicating these findings? The sample size is promising but I\'d love to see larger cohorts.',
    'This aligns well with what we\'re seeing in our clinic. The 6-month follow-up data is particularly compelling.',
    'Important paper for understanding mechanisms. The neuroimaging data is beautifully presented.',
    'I have some concerns about the exclusion criteria - they may limit generalizability to real-world clinical settings.',
    'Great addition to the literature. The discussion of limitations is refreshingly honest.',
    'This will be essential reading for our training program. Thank you for sharing!',
    'The statistical approach here is innovative. Would love to see the raw data made available.',
    'Excellent review. One minor point - the section on integration could be expanded.',
    'This changed how I think about dosing protocols. Very practical implications for clinicians.',
    'Strong evidence base here. The comparison with existing treatments is particularly valuable.',
    'I appreciate the attention to safety data. This will help with regulatory discussions.',
  ];

  const discussionReplies = [
    'Agreed! We\'ve been using similar protocols with good results.',
    'Good point. I think the authors addressed this somewhat in the supplementary materials.',
    'Our team is planning a replication study - happy to collaborate if interested.',
    'Thanks for raising this. I had the same thought about generalizability.',
    'The authors have an upcoming paper that expands on this point.',
    'Very helpful perspective. Would you mind elaborating on your clinical experience?',
  ];

  // Add comments to first 15 papers
  const paperCommentData = [];
  const commenters = [alice, bob, carol, david];

  for (let i = 0; i < Math.min(15, createdAssets.length); i++) {
    const numComments = Math.floor(Math.random() * 3) + 1; // 1-3 comments per paper

    for (let j = 0; j < numComments; j++) {
      const commenter = commenters[(i + j) % commenters.length];
      if (commenter.id === createdAssets[i].ownerId) continue; // Skip if same as owner

      paperCommentData.push({
        assetId: createdAssets[i].id,
        userId: commenter.id,
        content: discussionComments[(i + j) % discussionComments.length]
      });
    }
  }

  // Create parent comments
  const createdComments = [];
  for (const commentData of paperCommentData) {
    const comment = await prisma.paperComment.create({
      data: commentData
    });
    createdComments.push(comment);
  }

  // Add some replies to first 10 comments
  for (let i = 0; i < Math.min(10, createdComments.length); i++) {
    const replier = commenters[(i + 1) % commenters.length];
    const parentComment = createdComments[i];

    // Don't reply to own comment
    if (replier.id === parentComment.userId) continue;

    await prisma.paperComment.create({
      data: {
        assetId: parentComment.assetId,
        userId: replier.id,
        parentId: parentComment.id,
        content: discussionReplies[i % discussionReplies.length]
      }
    });
  }

  console.log(`✓ Created ${paperCommentData.length} paper discussion comments with replies`);

  // Add likes to some comments
  const commentLikeData = [];
  for (let i = 0; i < Math.min(15, createdComments.length); i++) {
    const numLikes = Math.floor(Math.random() * 3) + 1;
    const usedLikers = new Set();

    for (let j = 0; j < numLikes; j++) {
      const liker = commenters[(i + j) % commenters.length];
      if (usedLikers.has(liker.id) || liker.id === createdComments[i].userId) continue;
      usedLikers.add(liker.id);

      commentLikeData.push({
        commentId: createdComments[i].id,
        userId: liker.id
      });
    }
  }

  await prisma.paperCommentLike.createMany({ data: commentLikeData });

  console.log(`✓ Created ${commentLikeData.length} comment likes`);

  // Update comment counts on assets
  const assetCommentCounts = {};
  for (const comment of [...paperCommentData, ...createdComments.slice(0, 10)]) {
    const assetId = comment.assetId;
    assetCommentCounts[assetId] = (assetCommentCounts[assetId] || 0) + 1;
  }

  for (const [assetId, count] of Object.entries(assetCommentCounts)) {
    await prisma.researchAsset.update({
      where: { id: parseInt(assetId) },
      data: { commentCount: count }
    });
  }

  console.log('✓ Updated paper comment counts');

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
