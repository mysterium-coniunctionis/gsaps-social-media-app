export const communityGuidelines = {
  version: '2024.3',
  lastUpdated: '2024-05-10',
  summary: 'Keep discussions constructive, avoid personal data sharing, and follow research ethics.',
  items: [
    'Treat all members with respect and avoid harassment or discrimination.',
    'Do not share personally identifiable information (PII) without consent.',
    'Discuss psychedelics and mental health responsibly; no unsafe medical advice.',
    'Use citations when referencing research and respect intellectual property.',
    'Report harmful or misleading content to moderators for review.'
  ]
};

export const defaultBlocklist = {
  toxicity: ['hate speech', 'slur', 'harass', 'attack'],
  pii: ['ssn', 'passport', 'bank account'],
  medical: ['miracle cure', 'unlicensed therapy'],
  custom: ['banned substance']
};

export const reportQueue = [
  {
    id: 'R-4021',
    submitted: '2024-05-15T13:12:00Z',
    type: 'Post',
    summary: 'Harassing language in a thread',
    reporter: 'demo_user',
    assignee: 'Moderator Team',
    severity: 'high',
    status: 'awaiting review'
  },
  {
    id: 'R-4019',
    submitted: '2024-05-14T18:04:00Z',
    type: 'Message',
    summary: 'Possible sharing of patient identifiers',
    reporter: 'researcher_jane',
    assignee: 'Privacy Desk',
    severity: 'critical',
    status: 'quarantined'
  },
  {
    id: 'R-4005',
    submitted: '2024-05-12T09:00:00Z',
    type: 'Group',
    summary: 'Off-topic promotion and spam',
    reporter: 'admin',
    assignee: 'Moderator Team',
    severity: 'medium',
    status: 'triaged'
  }
];

export const appealQueue = [
  {
    id: 'A-104',
    reportId: 'R-3944',
    appellant: 'fieldresearcher',
    previousAction: '24h posting hold',
    requestedOutcome: 'Remove strike due to context',
    status: 'awaiting review'
  },
  {
    id: 'A-96',
    reportId: 'R-3901',
    appellant: 'demo_user',
    previousAction: 'Content removed',
    requestedOutcome: 'Restore post with edits',
    status: 'in progress'
  }
];

export const detectionSummary = {
  totals: {
    quarantined: 12,
    autoFlagged: 31,
    piiDetected: 7
  },
  recentFindings: [
    {
      id: 'D-510',
      signal: 'Toxicity phrases',
      location: 'Post #1842',
      action: 'Quarantined',
      timestamp: '2024-05-15T09:20:00Z'
    },
    {
      id: 'D-507',
      signal: 'Email detected',
      location: 'Message #540',
      action: 'Auto-redacted',
      timestamp: '2024-05-14T20:14:00Z'
    },
    {
      id: 'D-501',
      signal: 'Blocklisted term',
      location: 'Post #1833',
      action: 'Escalated to moderator',
      timestamp: '2024-05-13T11:02:00Z'
    }
  ]
};

export const escalationPolicies = [
  {
    trigger: 'Critical PII detected',
    action: 'Immediate quarantine + admin review',
    sla: '1 hour'
  },
  {
    trigger: 'High-toxicity matches',
    action: 'Notify moderators and soft-block author',
    sla: '4 hours'
  },
  {
    trigger: 'Repeat offenses (3 in 30 days)',
    action: 'Automatic 72h posting suspension and appeal link',
    sla: 'Same day'
  }
];

export const defaultAuditLog = [
  {
    id: 'L-901',
    actor: 'system',
    event: 'Automated quarantine',
    detail: 'High-risk toxicity detected in Post #1821',
    timestamp: '2024-05-14T02:10:00Z'
  },
  {
    id: 'L-895',
    actor: 'Moderator Jane',
    event: 'Report resolved',
    detail: 'Removed spam group and notified reporter',
    timestamp: '2024-05-13T17:44:00Z'
  },
  {
    id: 'L-888',
    actor: 'Administrator',
    event: 'Escalation policy updated',
    detail: 'Shortened SLA for PII findings to 1 hour',
    timestamp: '2024-05-12T09:23:00Z'
  }
];
