/**
 * Patient Preparation Academy Data
 * 8-module curriculum for psychedelic preparation
 * Includes intention setting, safety screening, and family resources
 */

export const PREP_ACADEMY_MODULES = [
  {
    id: 1,
    title: 'Understanding Psychedelic Experiences',
    description: 'Learn what to expect during a psychedelic experience, including common effects, timelines, and the spectrum of possible experiences.',
    duration: '45 min',
    lessons: 4,
    icon: '🧠',
    topics: [
      'What is a psychedelic experience?',
      'Common effects and sensations',
      'Timeline of effects by substance',
      'Set and setting fundamentals'
    ],
    resources: [
      { title: 'Understanding Psychedelics Guide', type: 'pdf' },
      { title: 'Experience Timeline Chart', type: 'infographic' }
    ]
  },
  {
    id: 2,
    title: 'Intention Setting & Personal Goals',
    description: 'Discover how to set meaningful intentions for your journey and align your experience with your personal growth goals.',
    duration: '60 min',
    lessons: 5,
    icon: '🎯',
    topics: [
      'Why intentions matter',
      'Identifying personal growth areas',
      'Writing effective intentions',
      'Balancing expectations and openness',
      'Intention vs. expectation'
    ],
    resources: [
      { title: 'Intention Setting Workbook', type: 'pdf' },
      { title: 'Guided Intention Meditation', type: 'audio' }
    ],
    hasInteractiveTool: true
  },
  {
    id: 3,
    title: 'Medical & Safety Screening',
    description: 'Understand the importance of medical screening, contraindications, and how to assess your readiness for a psychedelic experience.',
    duration: '30 min',
    lessons: 4,
    icon: '🏥',
    topics: [
      'Physical health considerations',
      'Mental health screening',
      'Medication interactions',
      'Contraindications overview'
    ],
    resources: [
      { title: 'Medical Screening Checklist', type: 'pdf' },
      { title: 'Contraindications Reference', type: 'document' }
    ],
    hasInteractiveTool: true
  },
  {
    id: 4,
    title: 'Preparing Your Environment',
    description: 'Learn how to create a safe, comfortable, and supportive environment for your psychedelic experience.',
    duration: '40 min',
    lessons: 4,
    icon: '🏡',
    topics: [
      'Physical space preparation',
      'Creating comfort and safety',
      'Music and sensory elements',
      'Emergency preparedness'
    ],
    resources: [
      { title: 'Environment Checklist', type: 'pdf' },
      { title: 'Recommended Playlists', type: 'link' }
    ]
  },
  {
    id: 5,
    title: 'Working with a Guide or Therapist',
    description: 'Understand the role of guides, therapists, and sitters, and how to find and vet qualified support.',
    duration: '35 min',
    lessons: 4,
    icon: '🤝',
    topics: [
      'Roles: therapist vs. guide vs. sitter',
      'What to look for in a guide',
      'Red flags and warning signs',
      'Building trust and rapport'
    ],
    resources: [
      { title: 'Guide Vetting Checklist', type: 'pdf' },
      { title: 'Questions to Ask Your Guide', type: 'document' }
    ]
  },
  {
    id: 6,
    title: 'Day-of Preparation',
    description: 'Practical guidance for the day of your experience, including nutrition, mindset, and final preparations.',
    duration: '30 min',
    lessons: 3,
    icon: '☀️',
    topics: [
      'Diet and fasting guidelines',
      'Morning preparation routine',
      'Final mindset preparation'
    ],
    resources: [
      { title: 'Day-of Checklist', type: 'pdf' },
      { title: 'Centering Meditation', type: 'audio' }
    ]
  },
  {
    id: 7,
    title: 'Navigating Difficult Experiences',
    description: 'Learn techniques for working with challenging moments and how to find meaning in difficult experiences.',
    duration: '50 min',
    lessons: 5,
    icon: '🌊',
    topics: [
      'Understanding difficult experiences',
      'Grounding techniques',
      'Surrender and acceptance',
      'Working with fear and anxiety',
      'Finding meaning in challenges'
    ],
    resources: [
      { title: 'Crisis Navigation Guide', type: 'pdf' },
      { title: 'Grounding Exercises Audio', type: 'audio' }
    ]
  },
  {
    id: 8,
    title: 'Integration Fundamentals',
    description: 'Essential practices for integrating your experience into daily life and maximizing lasting benefits.',
    duration: '55 min',
    lessons: 5,
    icon: '🌱',
    topics: [
      'What is integration?',
      'Journaling and reflection',
      'Body-based integration',
      'Community and support',
      'Long-term integration practices'
    ],
    resources: [
      { title: 'Integration Workbook', type: 'pdf' },
      { title: 'Integration Circle Directory', type: 'link' }
    ]
  }
];

export const FAMILY_RESOURCES = [
  {
    id: 1,
    title: 'Understanding Psychedelic Therapy',
    description: 'A guide for family members to understand what psychedelic-assisted therapy is and how it works.',
    type: 'guide',
    audience: 'Family Members',
    duration: '20 min read'
  },
  {
    id: 2,
    title: 'How to Support Your Loved One',
    description: 'Practical tips for supporting someone before, during, and after their psychedelic experience.',
    type: 'guide',
    audience: 'Family Members',
    duration: '15 min read'
  },
  {
    id: 3,
    title: 'FAQ for Family Members',
    description: 'Answers to common questions and concerns from family members about psychedelic therapy.',
    type: 'faq',
    audience: 'Family Members',
    duration: '10 min read'
  },
  {
    id: 4,
    title: 'Safety & Emergency Information',
    description: 'What to know about safety protocols and when to seek help.',
    type: 'guide',
    audience: 'Family & Caregivers',
    duration: '10 min read'
  }
];

export const SAFETY_SCREENING_QUESTIONS = {
  physical: [
    {
      id: 'cardiac',
      question: 'Do you have a history of heart conditions, including arrhythmias, high blood pressure, or heart disease?',
      severity: 'high',
      info: 'Certain psychedelics can increase heart rate and blood pressure.'
    },
    {
      id: 'liver',
      question: 'Do you have any liver conditions or take medications that affect liver function?',
      severity: 'medium',
      info: 'The liver metabolizes many psychedelic compounds.'
    },
    {
      id: 'pregnancy',
      question: 'Are you pregnant, breastfeeding, or planning to become pregnant?',
      severity: 'high',
      info: 'Psychedelics are not recommended during pregnancy or breastfeeding.'
    },
    {
      id: 'seizure',
      question: 'Do you have a history of seizures or epilepsy?',
      severity: 'high',
      info: 'Some psychedelics may lower seizure threshold.'
    }
  ],
  mental: [
    {
      id: 'psychosis',
      question: 'Do you have a personal or family history of psychosis, schizophrenia, or bipolar disorder with psychotic features?',
      severity: 'high',
      info: 'These conditions are typically contraindicated for psychedelic use.'
    },
    {
      id: 'current-crisis',
      question: 'Are you currently experiencing a mental health crisis, suicidal thoughts, or severe depression?',
      severity: 'high',
      info: 'A stable mental state is important before psychedelic experiences.'
    },
    {
      id: 'ptsd',
      question: 'Do you have PTSD or trauma that you are currently addressing in therapy?',
      severity: 'medium',
      info: 'While psychedelics can help with PTSD, proper clinical support is essential.'
    },
    {
      id: 'anxiety',
      question: 'Do you experience severe anxiety or panic attacks?',
      severity: 'medium',
      info: 'Proper preparation and support can help manage anxiety during experiences.'
    }
  ],
  medications: [
    {
      id: 'ssri',
      question: 'Are you currently taking SSRIs, SNRIs, or other antidepressants?',
      severity: 'high',
      info: 'These medications can interact with psychedelics and may need to be tapered.'
    },
    {
      id: 'maoi',
      question: 'Are you taking MAO inhibitors or medications that affect MAO?',
      severity: 'high',
      info: 'MAOIs have dangerous interactions with many substances.'
    },
    {
      id: 'lithium',
      question: 'Are you taking lithium or other mood stabilizers?',
      severity: 'high',
      info: 'Lithium has potentially dangerous interactions with psychedelics.'
    },
    {
      id: 'other-meds',
      question: 'Are you taking any other psychiatric medications not listed above?',
      severity: 'medium',
      info: 'Please discuss all medications with your healthcare provider.'
    }
  ]
};

export const INTENTION_PROMPTS = [
  {
    category: 'Healing',
    prompts: [
      'What emotional wounds am I ready to explore and heal?',
      'What patterns or behaviors no longer serve me?',
      'What relationship in my life needs healing attention?'
    ]
  },
  {
    category: 'Growth',
    prompts: [
      'What aspects of myself am I ready to develop?',
      'What fears are holding me back from my potential?',
      'What would my best self look like?'
    ]
  },
  {
    category: 'Understanding',
    prompts: [
      'What life questions am I seeking clarity on?',
      'What would I like to understand better about myself?',
      'What meaning am I seeking in my life?'
    ]
  },
  {
    category: 'Connection',
    prompts: [
      'How can I deepen my connection to myself?',
      'How can I improve my relationships with others?',
      'How can I feel more connected to nature or something larger?'
    ]
  },
  {
    category: 'Release',
    prompts: [
      'What am I ready to let go of?',
      'What grief or loss needs acknowledgment?',
      'What stories about myself am I ready to release?'
    ]
  }
];

export const CAREER_PATHWAYS = [
  {
    id: 'therapist',
    title: 'Psychedelic Therapist',
    description: 'Provide therapeutic support during psychedelic-assisted therapy sessions.',
    icon: '🧠',
    requiredEducation: 'Masters or Doctoral degree in psychology, counseling, or related field',
    certifications: [
      'Licensed Mental Health Professional (LMHP)',
      'MAPS MDMA Therapy Training',
      'Psilocybin Facilitator Certification (where legal)'
    ],
    skills: [
      'Trauma-informed care',
      'Non-directive therapy',
      'Crisis intervention',
      'Somatic therapy',
      'Integration support'
    ],
    avgSalary: '$80,000 - $150,000',
    demandLevel: 'Very High',
    timeToQualify: '3-7 years',
    steps: [
      'Complete graduate education in psychology/counseling',
      'Obtain clinical licensure (LPC, LCSW, PhD)',
      'Gain experience in trauma and altered states',
      'Complete specialized psychedelic training',
      'Pursue certification programs'
    ]
  },
  {
    id: 'researcher',
    title: 'Psychedelic Researcher',
    description: 'Conduct clinical trials and scientific research on psychedelic compounds.',
    icon: '🔬',
    requiredEducation: 'PhD in Neuroscience, Psychology, Pharmacology, or related field',
    certifications: [
      'IRB/Ethics Training',
      'GCP (Good Clinical Practice)',
      'DEA Schedule I Research License'
    ],
    skills: [
      'Clinical trial design',
      'Statistical analysis',
      'Grant writing',
      'Publication',
      'Regulatory compliance'
    ],
    avgSalary: '$70,000 - $130,000',
    demandLevel: 'High',
    timeToQualify: '6-10 years',
    steps: [
      'Complete undergraduate degree in relevant field',
      'Pursue PhD with focus on psychedelics/consciousness',
      'Gain research experience during graduate studies',
      'Complete postdoctoral fellowship',
      'Apply for faculty/research positions'
    ]
  },
  {
    id: 'facilitator',
    title: 'Psychedelic Facilitator/Guide',
    description: 'Provide non-therapeutic support and guidance during psychedelic experiences.',
    icon: '🧭',
    requiredEducation: 'Varies by jurisdiction; certification programs available',
    certifications: [
      'Oregon Psilocybin Facilitator License',
      'Retreat center certifications',
      'First aid/CPR'
    ],
    skills: [
      'Presence and holding space',
      'Harm reduction',
      'Music curation',
      'Bodywork basics',
      'Integration support'
    ],
    avgSalary: '$50,000 - $100,000',
    demandLevel: 'Growing',
    timeToQualify: '1-3 years',
    steps: [
      'Research training programs and requirements',
      'Complete facilitator training program',
      'Gain supervised experience',
      'Obtain required licenses (where applicable)',
      'Build practice or join retreat center'
    ]
  },
  {
    id: 'integration-coach',
    title: 'Integration Coach/Specialist',
    description: 'Help individuals make meaning of and apply insights from psychedelic experiences.',
    icon: '🌱',
    requiredEducation: 'Coaching certification plus specialized training',
    certifications: [
      'ICF Coaching Certification',
      'Psychedelic Integration Coach Training',
      'Trauma-informed training'
    ],
    skills: [
      'Active listening',
      'Motivational interviewing',
      'Goal setting',
      'Accountability support',
      'Resource connection'
    ],
    avgSalary: '$45,000 - $90,000',
    demandLevel: 'Growing',
    timeToQualify: '1-2 years',
    steps: [
      'Complete coaching certification',
      'Pursue psychedelic-specific training',
      'Build supervised coaching hours',
      'Develop niche expertise',
      'Launch coaching practice'
    ]
  },
  {
    id: 'nurse',
    title: 'Psychedelic Nurse',
    description: 'Provide medical monitoring and support during psychedelic-assisted therapy.',
    icon: '💉',
    requiredEducation: 'Nursing degree (BSN or higher)',
    certifications: [
      'RN License',
      'Psychiatric-Mental Health certification',
      'Psychedelic therapy training'
    ],
    skills: [
      'Medical monitoring',
      'Medication management',
      'Crisis response',
      'Patient education',
      'Trauma-informed care'
    ],
    avgSalary: '$60,000 - $110,000',
    demandLevel: 'High',
    timeToQualify: '2-4 years',
    steps: [
      'Complete nursing degree (BSN recommended)',
      'Obtain RN license',
      'Gain psychiatric nursing experience',
      'Complete specialized psychedelic training',
      'Join clinical practice or research team'
    ]
  },
  {
    id: 'advocate',
    title: 'Policy Advocate/Educator',
    description: 'Advance psychedelic policy reform and public education.',
    icon: '📢',
    requiredEducation: 'Varies; law, public policy, or communications helpful',
    certifications: [
      'No specific certification required',
      'Relevant graduate degrees helpful'
    ],
    skills: [
      'Public speaking',
      'Policy analysis',
      'Community organizing',
      'Media relations',
      'Strategic communication'
    ],
    avgSalary: '$40,000 - $80,000',
    demandLevel: 'Moderate',
    timeToQualify: '1-5 years',
    steps: [
      'Educate yourself deeply on the science and policy',
      'Get involved with advocacy organizations',
      'Develop communication skills',
      'Build network in the field',
      'Take on leadership roles'
    ]
  }
];

export const SKILL_ASSESSMENTS = {
  clinical: [
    'Trauma-informed care',
    'Non-directive therapy techniques',
    'Crisis intervention',
    'Somatic awareness',
    'Group facilitation',
    'Cultural competency'
  ],
  research: [
    'Clinical trial methodology',
    'Statistical analysis',
    'Scientific writing',
    'Grant writing',
    'Literature review',
    'IRB/Ethics compliance'
  ],
  facilitation: [
    'Holding space/presence',
    'Harm reduction knowledge',
    'Music selection/curation',
    'Breathwork techniques',
    'Integration support',
    'Set and setting creation'
  ],
  general: [
    'Communication skills',
    'Ethical decision-making',
    'Self-awareness',
    'Continuous learning',
    'Professional boundaries',
    'Interdisciplinary collaboration'
  ]
};
