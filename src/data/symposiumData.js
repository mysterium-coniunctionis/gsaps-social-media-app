export const mockSymposia = [
  {
    id: 'symp-001',
    title: 'Psychedelic Science Symposium',
    topic: 'Ketamine-assisted therapy in community clinics',
    roomCode: 'ROOM-UX9',
    stage: {
      title: 'Live plenary + stage Q&A',
      streamUrl: 'https://example.com/live-stage'
    },
    protocolDraft:
      '# Shared protocol canvas\n\nCapture safety, dosing, and integration decisions together. Use headings for agenda items and bullet points for action items.',
    agenda: [
      { id: 'ag-01', title: 'Welcome + safety briefing', owner: 'Dr. Lee', time: '09:00' },
      { id: 'ag-02', title: 'Real-world dosing outcomes', owner: 'Dr. Patel', time: '09:20' },
      { id: 'ag-03', title: 'Integration and community care', owner: 'Prof. Chen', time: '10:00' }
    ],
    speakerQueue: [
      { id: 'sq-01', name: 'Dr. Lopez', status: 'backstage' },
      { id: 'sq-02', name: 'A. Mendes', status: 'green room' }
    ],
    notes: [
      {
        id: 'note-1',
        author: 'Moderator',
        body: 'Summarize PK data for ketamine duration and subjective reports.',
        timestamp: '09:10'
      }
    ],
    chat: [
      { id: 'chat-1', author: 'Dr. Li', body: 'Slides will be posted right after the talk.' },
      { id: 'chat-2', author: 'Sam', body: 'Can we get dosing tables in the protocol canvas?' }
    ],
    polls: [
      {
        id: 'poll-1',
        question: 'Which practice setting are you in?',
        options: [
          { id: 'opt-1', label: 'Clinic', votes: 12 },
          { id: 'opt-2', label: 'Academic', votes: 8 },
          { id: 'opt-3', label: 'Community', votes: 5 }
        ]
      }
    ],
    attendees: [
      { id: 'att-1', name: 'Dr. Li', role: 'Moderator', status: 'online' },
      { id: 'att-2', name: 'Dr. Patel', role: 'Speaker', status: 'online' },
      { id: 'att-3', name: 'Sam', role: 'Observer', status: 'idle' }
    ]
  }
];

export const findSymposiumById = (roomId) =>
  mockSymposia.find((item) => item.id === roomId) || mockSymposia[0];
