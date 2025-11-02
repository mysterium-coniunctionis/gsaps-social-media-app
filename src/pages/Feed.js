import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { fadeInUp } from '../theme/animations';
import { useGamification } from '../context/GamificationContext';

/**
 * Activity Feed Page - The heart of the social platform
 * Displays posts from the community with engagement features
 */
const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { awardXP, updateStat } = useGamification();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState('all'); // all, following, trending - TODO: implement filter UI

  // Mock data for now - replace with API call
  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Helper to generate mock reactions
  const generateMockReactions = (count, includeCurrentUser = false, currentUserType = null) => {
    const reactionTypes = ['like', 'love', 'laugh', 'wow', 'celebrate', 'think'];
    const mockUsers = [
      { id: 101, name: 'Sarah Chen', username: 'sarah_chen', avatar_url: 'https://i.pravatar.cc/150?img=1' },
      { id: 102, name: 'Marcus Johnson', username: 'marcus_j', avatar_url: 'https://i.pravatar.cc/150?img=2' },
      { id: 103, name: 'Emily Rodriguez', username: 'emily_r', avatar_url: 'https://i.pravatar.cc/150?img=3' },
      { id: 104, name: 'David Park', username: 'david_park', avatar_url: 'https://i.pravatar.cc/150?img=4' },
      { id: 105, name: 'Lisa Wang', username: 'lisa_wang', avatar_url: 'https://i.pravatar.cc/150?img=5' },
      { id: 106, name: 'James Kim', username: 'james_kim', avatar_url: 'https://i.pravatar.cc/150?img=6' },
    ];

    const reactions = [];

    // Add current user reaction if specified
    if (includeCurrentUser && currentUserType) {
      reactions.push({
        type: currentUserType,
        user: { id: 'current-user', name: 'You', username: 'you', avatar_url: '' }
      });
    }

    // Add random reactions from other users
    for (let i = 0; i < count - (includeCurrentUser ? 1 : 0); i++) {
      reactions.push({
        type: reactionTypes[Math.floor(Math.random() * reactionTypes.length)],
        user: mockUsers[i % mockUsers.length]
      });
    }

    return reactions;
  };

  const fetchPosts = async () => {
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      const mockPosts = [
        // Recent posts (last few hours)
        {
          id: 1,
          author: {
            id: 1,
            name: 'Dr. Alice Johnson',
            username: 'alice_researcher',
            avatar: 'https://i.pravatar.cc/150?img=1',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          content: 'Excited to share our latest findings on psilocybin and neuroplasticity! The results from our 6-month study show remarkable improvements in neural connectivity. Full paper coming soon. 🧠✨',
          images: [],
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          reactions: generateMockReactions(156, false),
          currentUserReaction: null,
          comments: 23,
          shares: 12,
          isBookmarked: false,
          tags: ['research', 'psilocybin', 'neuroscience']
        },
        {
          id: 2,
          author: {
            id: 9,
            name: 'Dr. Priya Sharma',
            username: 'priya_psychiatrist',
            avatar: 'https://i.pravatar.cc/150?img=20',
            credentials: 'MD, Psychiatry',
            verified: true
          },
          content: 'Just wrapped up an incredible session with a patient showing complete remission from depression after psilocybin therapy. These moments remind me why this work matters. 💜',
          images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          reactions: generateMockReactions(289, false),
          currentUserReaction: null,
          comments: 48,
          shares: 34,
          isBookmarked: true,
          tags: ['clinical', 'psilocybin', 'success']
        },
        {
          id: 3,
          author: {
            id: 2,
            name: 'Prof. Robert Williams',
            username: 'bob_neuroscience',
            avatar: 'https://i.pravatar.cc/150?img=12',
            credentials: 'Professor, MIT'
          },
          content: 'Anyone attending the Psychedelic Science Symposium next month? Would love to connect and discuss collaboration opportunities!',
          images: [],
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          reactions: generateMockReactions(89, true, 'celebrate'),
          currentUserReaction: 'celebrate',
          comments: 34,
          shares: 5,
          isBookmarked: false,
          tags: ['conference', 'networking']
        },
        {
          id: 4,
          author: {
            id: 17,
            name: 'Dr. Jessica Turner',
            username: 'jessica_clinical',
            avatar: 'https://i.pravatar.cc/150?img=47',
            credentials: 'PsyD',
            verified: true
          },
          content: '🎉 Just completed the MAPS MDMA Therapy Training Program! Feeling grateful to join this incredible community of therapists. Looking forward to bringing this work to more people who need it.',
          images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          reactions: generateMockReactions(412, false),
          currentUserReaction: null,
          comments: 76,
          shares: 89,
          isBookmarked: false,
          tags: ['training', 'mdma', 'maps', 'milestone']
        },

        // Yesterday
        {
          id: 5,
          author: {
            id: 12,
            name: 'Daniel Foster',
            username: 'daniel_mycology',
            avatar: 'https://i.pravatar.cc/150?img=51',
            credentials: 'Mycologist'
          },
          content: 'Beautiful flush of Golden Teachers this morning! 🍄 Teaching identification workshop this weekend - still a few spots open if anyone wants to join. PM for details.',
          images: ['https://images.unsplash.com/photo-1565696436691-6a2e7f7e0c2c?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
          reactions: generateMockReactions(203, false),
          currentUserReaction: null,
          comments: 45,
          shares: 23,
          isBookmarked: false,
          tags: ['mycology', 'mushrooms', 'workshop']
        },
        {
          id: 6,
          author: {
            id: 3,
            name: 'Carol Davis',
            username: 'carol_therapist',
            avatar: 'https://i.pravatar.cc/150?img=5',
            credentials: 'LMFT',
            verified: true
          },
          content: 'Just completed my first MDMA-assisted therapy training session. The integration of psychedelic medicine into mainstream therapy is happening, and it\'s beautiful to witness. 💚',
          images: [],
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          reactions: generateMockReactions(234, false),
          currentUserReaction: null,
          comments: 67,
          shares: 45,
          isBookmarked: true,
          tags: ['therapy', 'mdma', 'training']
        },
        {
          id: 7,
          author: {
            id: 10,
            name: 'Alex Kim',
            username: 'alex_neuropharm',
            avatar: 'https://i.pravatar.cc/150?img=33',
            credentials: 'PhD, Neuropharmacology'
          },
          content: 'New preprint alert! Our lab just published data on LSD microdosing and cognitive flexibility. TL;DR: small but significant improvements in divergent thinking tasks. Link in bio. 📊',
          images: [],
          timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000), // 28 hours ago
          reactions: generateMockReactions(167, false),
          currentUserReaction: null,
          comments: 52,
          shares: 67,
          isBookmarked: true,
          tags: ['research', 'lsd', 'microdosing', 'cognition']
        },

        // 2 days ago
        {
          id: 8,
          author: {
            id: 4,
            name: 'David Martinez',
            username: 'david_student',
            avatar: 'https://i.pravatar.cc/150?img=13',
            credentials: 'Graduate Student'
          },
          content: 'Reading list for anyone new to psychedelic research:\n\n1. "How to Change Your Mind" - Michael Pollan\n2. "The Psychedelic Explorer\'s Guide" - James Fadiman\n3. "LSD: My Problem Child" - Albert Hofmann\n\nWhat would you add to this list?',
          images: [],
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          reactions: generateMockReactions(178, true, 'love'),
          currentUserReaction: 'love',
          comments: 92,
          shares: 56,
          isBookmarked: true,
          tags: ['books', 'education', 'resources']
        },
        {
          id: 9,
          author: {
            id: 25,
            name: 'Maya Whitehorse',
            username: 'maya_indigenous',
            avatar: 'https://i.pravatar.cc/150?img=41',
            credentials: 'Medicine Keeper'
          },
          content: 'Important reminder: Before engaging with sacred plant medicines, take time to understand their cultural origins and protocols. Reciprocity and respect are not optional. 🌿',
          images: [],
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
          reactions: generateMockReactions(456, false),
          currentUserReaction: null,
          comments: 103,
          shares: 234,
          isBookmarked: true,
          tags: ['ethics', 'indigenous', 'respect', 'culture']
        },
        {
          id: 10,
          author: {
            id: 14,
            name: 'Marcus Washington',
            username: 'marcus_counseling',
            avatar: 'https://i.pravatar.cc/150?img=11',
            credentials: 'LPC',
            verified: true
          },
          content: '📸 Set and setting matters! Here\'s our new therapy space designed specifically for ketamine-assisted sessions. Soft lighting, comfortable furniture, and calming artwork all contribute to healing.',
          images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 10 * 60 * 60 * 1000),
          reactions: generateMockReactions(312, false),
          currentUserReaction: null,
          comments: 58,
          shares: 42,
          isBookmarked: false,
          tags: ['ketamine', 'therapy', 'space', 'design']
        },

        // 3 days ago
        {
          id: 11,
          author: {
            id: 7,
            name: 'Dr. Emily Rodriguez',
            username: 'emily_pharmacology',
            avatar: 'https://i.pravatar.cc/150?img=10',
            credentials: 'PhD, Pharmacology',
            verified: true
          },
          content: 'Fascinating finding from today\'s lab work: Novel 5-HT2A partial agonists showing therapeutic promise WITHOUT the visual hallucinations. Could be game-changing for clinical applications. 🔬',
          images: [],
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(278, false),
          currentUserReaction: null,
          comments: 61,
          shares: 45,
          isBookmarked: false,
          tags: ['pharmacology', 'research', '5HT2A']
        },
        {
          id: 12,
          author: {
            id: 21,
            name: 'Isabella Santos',
            username: 'isabella_yoga',
            avatar: 'https://i.pravatar.cc/150?img=43',
            credentials: 'Yoga Instructor'
          },
          content: 'Integration circle this Saturday! We\'ll combine gentle yoga, breathwork, and group sharing. All experience levels welcome. Comment below if you\'re interested! 🧘‍♀️',
          images: [],
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000),
          reactions: generateMockReactions(145, false),
          currentUserReaction: null,
          comments: 38,
          shares: 28,
          isBookmarked: false,
          tags: ['integration', 'yoga', 'breathwork', 'community']
        },
        {
          id: 13,
          author: {
            id: 13,
            name: 'Dr. Olivia Patterson',
            username: 'olivia_neuroscience',
            avatar: 'https://i.pravatar.cc/150?img=32',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          content: '🧠 New fMRI data dropping tomorrow in Nature! DMT and the Default Mode Network - preview: things get VERY interesting around the 15-minute mark. Stay tuned...',
          images: ['https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000),
          reactions: generateMockReactions(523, false),
          currentUserReaction: null,
          comments: 134,
          shares: 178,
          isBookmarked: true,
          tags: ['neuroscience', 'dmt', 'fmri', 'research']
        },

        // 4 days ago
        {
          id: 14,
          author: {
            id: 8,
            name: 'Prof. James O\'Neill',
            username: 'james_anthropology',
            avatar: 'https://i.pravatar.cc/150?img=15',
            credentials: 'Medical Anthropologist'
          },
          content: 'Just returned from 6 weeks in the Peruvian Amazon working with Shipibo healers. The depth of knowledge in traditional ayahuasca practices continues to humble me. Sharing photos and reflections soon. 🌿✨',
          images: ['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(387, false),
          currentUserReaction: null,
          comments: 89,
          shares: 112,
          isBookmarked: true,
          tags: ['ayahuasca', 'peru', 'indigenous', 'fieldwork']
        },
        {
          id: 15,
          author: {
            id: 16,
            name: 'Nathan Brooks',
            username: 'nathan_student',
            avatar: 'https://i.pravatar.cc/150?img=52',
            credentials: 'Undergraduate'
          },
          content: 'Question for the community: What are the most important ethical considerations when designing psychedelic clinical trials? Working on a research proposal and would love input! 🤔',
          images: [],
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000),
          reactions: generateMockReactions(98, false),
          currentUserReaction: null,
          comments: 67,
          shares: 15,
          isBookmarked: false,
          tags: ['ethics', 'research', 'question']
        },
        {
          id: 16,
          author: {
            id: 11,
            name: 'Rachel Green',
            username: 'rachel_harm_reduction',
            avatar: 'https://i.pravatar.cc/150?img=24',
            credentials: 'MPH, Harm Reduction'
          },
          content: 'PSA: Free naloxone and drug testing strips available at our harm reduction center. No questions asked, no judgment. Safety first, always. 💜',
          images: [],
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 14 * 60 * 60 * 1000),
          reactions: generateMockReactions(267, false),
          currentUserReaction: null,
          comments: 34,
          shares: 156,
          isBookmarked: false,
          tags: ['harm-reduction', 'safety', 'community']
        },

        // 5 days ago
        {
          id: 17,
          author: {
            id: 5,
            name: 'Dr. Sarah Chen',
            username: 'sarah_maps',
            avatar: 'https://i.pravatar.cc/150?img=9',
            credentials: 'Clinical Psychologist',
            verified: true
          },
          content: 'Reflecting on 15 years of trauma work: MDMA therapy represents the most significant advancement I\'ve witnessed in my career. Watching clients heal from decades-old wounds in weeks is... profound.',
          images: [],
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(445, false),
          currentUserReaction: null,
          comments: 112,
          shares: 87,
          isBookmarked: true,
          tags: ['mdma', 'trauma', 'healing', 'reflection']
        },
        {
          id: 18,
          author: {
            id: 22,
            name: 'Kevin Patel',
            username: 'kevin_data',
            avatar: 'https://i.pravatar.cc/150?img=68',
            credentials: 'MS, Data Science'
          },
          content: '📊 Just finished analyzing 10 years of clinical trial data. Predictive model for treatment responders is showing 87% accuracy. Machine learning + psychedelic research = exciting possibilities!',
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
          reactions: generateMockReactions(189, false),
          currentUserReaction: null,
          comments: 43,
          shares: 38,
          isBookmarked: false,
          tags: ['data-science', 'research', 'ml', 'analysis']
        },

        // 6 days ago
        {
          id: 19,
          author: {
            id: 19,
            name: 'Amanda Rivera',
            username: 'amanda_integration',
            avatar: 'https://i.pravatar.cc/150?img=16',
            credentials: 'MA, Transpersonal Psychology'
          },
          content: 'Integration tip: Journaling immediately after an experience captures insights that often fade. Keep a dedicated journal by your bedside. Your future self will thank you. 📓✨',
          images: [],
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(223, false),
          currentUserReaction: null,
          comments: 56,
          shares: 89,
          isBookmarked: true,
          tags: ['integration', 'journaling', 'tips']
        },
        {
          id: 20,
          author: {
            id: 20,
            name: 'Prof. Christopher Lee',
            username: 'chris_biochem',
            avatar: 'https://i.pravatar.cc/150?img=60',
            credentials: 'PhD, Biochemistry'
          },
          content: '🔬 Teaching "Chemistry of Consciousness" next semester! Topics: tryptamines, phenethylamines, synthesis pathways, and receptor pharmacology. Excited to dive deep with a new cohort.',
          images: [],
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 - 10 * 60 * 60 * 1000),
          reactions: generateMockReactions(178, false),
          currentUserReaction: null,
          comments: 45,
          shares: 34,
          isBookmarked: false,
          tags: ['education', 'chemistry', 'course']
        },
        {
          id: 21,
          author: {
            id: 15,
            name: 'Dr. Sophia Morales',
            username: 'sophia_ethnobotany',
            avatar: 'https://i.pravatar.cc/150?img=44',
            credentials: 'PhD, Ethnobotany'
          },
          content: 'San Pedro cactus in full bloom! 🌵 These magnificent plants have been used ceremonially for 3,000+ years in the Andes. The wisdom embedded in traditional practices continues to inform modern therapeutic approaches.',
          images: ['https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 - 16 * 60 * 60 * 1000),
          reactions: generateMockReactions(312, false),
          currentUserReaction: null,
          comments: 67,
          shares: 78,
          isBookmarked: false,
          tags: ['san-pedro', 'ethnobotany', 'traditional']
        },

        // 1 week ago
        {
          id: 22,
          author: {
            id: 23,
            name: 'Lauren Mitchell',
            username: 'lauren_nursing',
            avatar: 'https://i.pravatar.cc/150?img=28',
            credentials: 'RN, Psychiatric Nursing'
          },
          content: 'Observation from the ketamine clinic: The patients who do best are those with strong aftercare and integration support. The medicine opens doors, but the real work happens afterward. 💚',
          images: [],
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(267, false),
          currentUserReaction: null,
          comments: 72,
          shares: 54,
          isBookmarked: true,
          tags: ['ketamine', 'integration', 'clinical']
        },
        {
          id: 23,
          author: {
            id: 18,
            name: 'William Cooper',
            username: 'william_policy',
            avatar: 'https://i.pravatar.cc/150?img=56',
            credentials: 'JD, Drug Policy'
          },
          content: '🎉 BREAKING: Oregon releases first-year data on psilocybin program. 1,200+ legal sessions, zero serious adverse events, high satisfaction rates. This is how evidence-based policy works!',
          images: [],
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000),
          reactions: generateMockReactions(678, false),
          currentUserReaction: null,
          comments: 203,
          shares: 445,
          isBookmarked: true,
          tags: ['policy', 'oregon', 'psilocybin', 'legalization']
        },
        {
          id: 24,
          author: {
            id: 6,
            name: 'Michael Thompson',
            username: 'michael_integration',
            avatar: 'https://i.pravatar.cc/150?img=14',
            credentials: 'MA, Integration Coach'
          },
          content: 'Hot take: The integration phase is MORE important than the psychedelic experience itself. The insights mean nothing if we don\'t do the work to embody them in daily life. Agree or disagree?',
          images: [],
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 15 * 60 * 60 * 1000),
          reactions: generateMockReactions(389, false),
          currentUserReaction: null,
          comments: 167,
          shares: 92,
          isBookmarked: false,
          tags: ['integration', 'debate', 'discussion']
        },

        // 8-10 days ago
        {
          id: 25,
          author: {
            id: 24,
            name: 'Dr. Ryan Anderson',
            username: 'ryan_philosophy',
            avatar: 'https://i.pravatar.cc/150?img=70',
            credentials: 'PhD, Philosophy'
          },
          content: 'New paper exploring phenomenology of ego dissolution. What can psychedelic experiences teach us about the nature of self and consciousness? Full text open access - link in comments.',
          images: [],
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(234, false),
          currentUserReaction: null,
          comments: 89,
          shares: 67,
          isBookmarked: true,
          tags: ['philosophy', 'consciousness', 'ego-dissolution']
        },
        {
          id: 26,
          author: {
            id: 1,
            name: 'Dr. Alice Johnson',
            username: 'alice_researcher',
            avatar: 'https://i.pravatar.cc/150?img=1',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          content: '📸 Lab life! Our team celebrating after successfully completing the final participant visit for our PTSD/psilocybin trial. 18 months of intensive work, but seeing the transformations has been worth every moment.',
          images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(567, false),
          currentUserReaction: null,
          comments: 134,
          shares: 178,
          isBookmarked: false,
          tags: ['research', 'ptsd', 'milestone', 'team']
        },
        {
          id: 27,
          author: {
            id: 12,
            name: 'Daniel Foster',
            username: 'daniel_mycology',
            avatar: 'https://i.pravatar.cc/150?img=51',
            credentials: 'Mycologist'
          },
          content: 'PSA: The season for wild psilocybin mushrooms is here, but please be EXTREMELY cautious. Many look-alikes are deadly. If you\'re not 100% certain, DON\'T consume. When in doubt, reach out!',
          images: [],
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(445, false),
          currentUserReaction: null,
          comments: 98,
          shares: 312,
          isBookmarked: true,
          tags: ['safety', 'mushrooms', 'identification', 'psa']
        },
        {
          id: 28,
          author: {
            id: 17,
            name: 'Dr. Jessica Turner',
            username: 'jessica_clinical',
            avatar: 'https://i.pravatar.cc/150?img=47',
            credentials: 'PsyD',
            verified: true
          },
          content: 'Therapist vulnerability moment: I had my own MDMA-assisted therapy session as part of training. It was deeply healing and gave me profound respect for what I\'m asking clients to do. This work changes everyone it touches. 💜',
          images: [],
          timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(512, false),
          currentUserReaction: null,
          comments: 156,
          shares: 89,
          isBookmarked: true,
          tags: ['therapy', 'personal', 'mdma', 'vulnerability']
        },

        // 12-14 days ago
        {
          id: 29,
          author: {
            id: 13,
            name: 'Dr. Olivia Patterson',
            username: 'olivia_neuroscience',
            avatar: 'https://i.pravatar.cc/150?img=32',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          content: '🧠 Brain scan comparison: Default Mode Network connectivity before and after psilocybin. The changes persist for MONTHS. Neuroplasticity is real, folks.',
          images: ['https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(678, false),
          currentUserReaction: null,
          comments: 187,
          shares: 234,
          isBookmarked: true,
          tags: ['neuroscience', 'neuroplasticity', 'psilocybin', 'brain']
        },
        {
          id: 30,
          author: {
            id: 10,
            name: 'Alex Kim',
            username: 'alex_neuropharm',
            avatar: 'https://i.pravatar.cc/150?img=33',
            credentials: 'PhD, Neuropharmacology'
          },
          content: 'Unpopular opinion: We need more null results published in psychedelic research. Publication bias is real and it doesn\'t serve the field. Science means reporting what we find, not what we hope to find. 🔬',
          images: [],
          timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(389, false),
          currentUserReaction: null,
          comments: 203,
          shares: 145,
          isBookmarked: false,
          tags: ['research', 'ethics', 'debate', 'science']
        },
        {
          id: 31,
          author: {
            id: 8,
            name: 'Prof. James O\'Neill',
            username: 'james_anthropology',
            avatar: 'https://i.pravatar.cc/150?img=15',
            credentials: 'Medical Anthropologist'
          },
          content: 'New book announcement! "Ayahuasca and Reciprocity: Lessons from the Amazon" drops next month. 20 years of fieldwork distilled into frameworks for respectful engagement with plant medicines. Pre-order link coming soon! 📚',
          images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop'],
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          reactions: generateMockReactions(523, false),
          currentUserReaction: null,
          comments: 167,
          shares: 278,
          isBookmarked: true,
          tags: ['book', 'ayahuasca', 'anthropology', 'announcement']
        },
        {
          id: 32,
          author: {
            id: 25,
            name: 'Maya Whitehorse',
            username: 'maya_indigenous',
            avatar: 'https://i.pravatar.cc/150?img=41',
            credentials: 'Medicine Keeper'
          },
          content: 'Grateful for this community\'s growing understanding of indigenous rights and traditional knowledge. Real change happens when we listen, learn, and act with humility. Thank you for showing up with respect. 🙏',
          images: [],
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000),
          reactions: generateMockReactions(789, false),
          currentUserReaction: null,
          comments: 234,
          shares: 456,
          isBookmarked: true,
          tags: ['indigenous', 'gratitude', 'community', 'respect']
        }
      ];
      setPosts(mockPosts);
      setLoading(false);
    }, 800);
  };

  const handleCreatePost = useCallback((newPost) => {
    // Add new post to the feed
    const post = {
      id: Date.now(),
      author: {
        id: 'current-user',
        name: 'You',
        username: 'your_username',
        avatar: ''
      },
      content: newPost.content,
      images: newPost.images || [],
      timestamp: new Date(),
      reactions: [],
      currentUserReaction: null,
      comments: 0,
      shares: 0,
      isBookmarked: false,
      tags: newPost.tags || []
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    setComposerOpen(false);

    // Award XP for creating post
    if (newPost.images && newPost.images.length > 0) {
      awardXP('POST_WITH_IMAGE'); // +15 XP for post with image
    } else {
      awardXP('CREATE_POST'); // +10 XP for regular post
    }

    // Bonus XP for using tags
    if (newPost.tags && newPost.tags.length > 0) {
      awardXP('POST_WITH_TAGS'); // +5 XP bonus for tagging
    }

    // Update stats
    updateStat('posts_created');
  }, [awardXP, updateStat]);

  const handleReaction = useCallback((postId, reactionType) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const currentUserReaction = post.currentUserReaction;
        let newReactions = [...post.reactions];

        // Remove current user's existing reaction
        newReactions = newReactions.filter(r => r.user.id !== 'current-user');

        // If different reaction or no previous reaction, add new one
        if (reactionType !== null && reactionType !== currentUserReaction) {
          newReactions.push({
            type: reactionType,
            user: {
              id: 'current-user',
              name: 'You',
              username: 'your_username',
              avatar_url: ''
            }
          });

          // Award XP for adding reaction
          awardXP('ADD_REACTION'); // +3 XP for reacting to post
          updateStat('reactions_given');
        }

        return {
          ...post,
          reactions: newReactions,
          currentUserReaction: (reactionType === currentUserReaction) ? null : reactionType
        };
      }
      return post;
    }));
  }, [awardXP, updateStat]);

  const handleBookmark = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  }, []);

  const handleComment = useCallback((postId, comment) => {
    // TODO: Add comment to post
    console.log('Comment on post', postId, comment);

    // Award XP for commenting
    awardXP('COMMENT'); // +5 XP for commenting
    updateStat('comments_made');
  }, [awardXP, updateStat]);

  const handleShare = useCallback((postId) => {
    // TODO: Share functionality
    console.log('Share post', postId);

    // Award XP for sharing
    awardXP('SHARE_POST'); // +8 XP for sharing
    updateStat('posts_shared');
  }, [awardXP, updateStat]);

  const handleDelete = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 1,
              animation: `${fadeInUp} 0.5s ease-out`
            }}
          >
            Activity Feed
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              animation: `${fadeInUp} 0.5s ease-out 0.1s backwards`
            }}
          >
            Stay updated with the latest from the GSAPS community
          </Typography>
        </Box>

        {/* Filter Tabs - Future enhancement */}
        {/* <Tabs value={filter} onChange={(e, v) => setFilter(v)}>
          <Tab label="All Posts" value="all" />
          <Tab label="Following" value="following" />
          <Tab label="Trending" value="trending" />
        </Tabs> */}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Posts Feed */}
        {!loading && posts.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post, index) => (
              <Box
                key={post.id}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <PostCard
                  post={post}
                  onReaction={handleReaction}
                  onComment={handleComment}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  onDelete={handleDelete}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              animation: `${fadeInUp} 0.5s ease-out`
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Be the first to share something with the community!
            </Typography>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setComposerOpen(true)}
            >
              <AddIcon sx={{ mr: 1 }} />
              Create Post
            </Fab>
          </Box>
        )}

        {/* Floating Action Button */}
        {!loading && posts.length > 0 && (
          <Fab
            color="primary"
            aria-label="create post"
            onClick={() => setComposerOpen(true)}
            sx={{
              position: 'fixed',
              bottom: isMobile ? 80 : 24,
              right: 24,
              boxShadow: 6,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 8
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Post Composer Modal */}
        <PostComposer
          open={composerOpen}
          onClose={() => setComposerOpen(false)}
          onSubmit={handleCreatePost}
        />
      </Container>
    </Box>
  );
};

export default Feed;
