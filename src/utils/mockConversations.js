/**
 * Mock conversations data
 * Shared across Messages and Conversation pages
 */
export const mockConversations = [
  {
    id: 1,
    participant: {
      id: 2,
      name: 'Dr. Alice Johnson',
      username: 'alice_researcher',
      avatar_url: 'https://i.pravatar.cc/150?img=9',
      bio: 'Clinical psychologist specializing in psychedelic therapy. MAPS-certified therapist.',
      credentials: 'PhD, Clinical Psychology',
      location: 'San Francisco, CA',
      verified: true
    },
    lastMessage: {
      text: 'Thanks for sharing that research paper! Really insightful.',
      timestamp: '2024-02-20T15:30:00',
      senderId: 2,
      read: false
    },
    unreadCount: 2
  },
  {
    id: 2,
    participant: {
      id: 3,
      name: 'Dr. Bob Williams',
      username: 'bob_neuroscience',
      avatar_url: 'https://i.pravatar.cc/150?img=12',
      bio: 'Neuroscientist studying consciousness and psychedelic states.',
      credentials: 'PhD, Neuroscience',
      location: 'Boston, MA',
      verified: true
    },
    lastMessage: {
      text: 'Are you attending the symposium next month?',
      timestamp: '2024-02-20T10:15:00',
      senderId: 3,
      read: true
    },
    unreadCount: 0
  },
  {
    id: 3,
    participant: {
      id: 4,
      name: 'Carol Davis',
      username: 'carol_therapist',
      avatar_url: 'https://i.pravatar.cc/150?img=20',
      bio: 'Licensed therapist and integration coach.',
      credentials: 'LMFT',
      location: 'Portland, OR',
      verified: false
    },
    lastMessage: {
      text: "I'd love to collaborate on that project!",
      timestamp: '2024-02-19T16:45:00',
      senderId: 1,
      read: true
    },
    unreadCount: 0
  },
  {
    id: 4,
    participant: {
      id: 5,
      name: 'David Martinez',
      username: 'david_student',
      avatar_url: 'https://i.pravatar.cc/150?img=15',
      bio: 'Graduate student studying psychopharmacology.',
      credentials: 'MS Candidate',
      location: 'Berkeley, CA',
      verified: false
    },
    lastMessage: {
      text: 'Great meeting you at the conference!',
      timestamp: '2024-02-18T14:20:00',
      senderId: 5,
      read: false
    },
    unreadCount: 1
  }
];

/**
 * Get mock conversation by ID
 * @param {number} conversationId - The conversation ID
 * @returns {object|undefined} The conversation object or undefined if not found
 */
export const getMockConversationById = (conversationId) => {
  return mockConversations.find(c => c.id === parseInt(conversationId));
};

/**
 * Generate mock messages for a conversation
 * @param {object} conversation - The conversation object
 * @returns {array} Array of mock messages
 */
export const getMockMessages = (conversation) => {
  if (!conversation) return [];
  
  return [
    {
      id: 1,
      senderId: conversation.participant.id,
      text: 'Hi! I saw your post about the new psilocybin research. Really interesting!',
      timestamp: '2024-02-20T14:30:00',
      read: true
    },
    {
      id: 2,
      senderId: 1,
      text: 'Thanks! I thought the methodology was particularly innovative. They used fMRI imaging combined with psychometric assessments.',
      timestamp: '2024-02-20T14:32:00',
      read: true
    },
    {
      id: 3,
      senderId: conversation.participant.id,
      text: 'Absolutely. Have you seen the follow-up study they published? It shows even stronger effects with repeated sessions.',
      timestamp: '2024-02-20T14:35:00',
      read: true
    },
    {
      id: 4,
      senderId: 1,
      text: 'Not yet! Do you have a link? I\'d love to read it.',
      timestamp: '2024-02-20T14:36:00',
      read: true
    },
    {
      id: 5,
      senderId: conversation.participant.id,
      text: 'Sure, let me find it for you. It was published in Nature last month. The lead author is Dr. Carhart-Harris.',
      timestamp: '2024-02-20T14:38:00',
      read: true
    },
    {
      id: 6,
      senderId: conversation.participant.id,
      text: 'Thanks for sharing that research paper! Really insightful. I especially appreciated the discussion on default mode network changes.',
      timestamp: '2024-02-20T15:30:00',
      read: false
    }
  ];
};
