// Integration Circle Facilitation Resources
// Guidelines, prompts, and tools for circle facilitators

export const CIRCLE_GUIDELINES = {
  general: {
    title: 'General Circle Guidelines',
    principles: [
      {
        name: 'Confidentiality',
        description: 'What is shared in circle stays in circle. We create safety through confidentiality.',
        icon: '🔒'
      },
      {
        name: 'Consent',
        description: 'All sharing is voluntary. You can pass, listen, or participate as feels right.',
        icon: '✋'
      },
      {
        name: 'Non-Judgment',
        description: 'We hold space for all experiences without judgment. All feelings are valid.',
        icon: '🤲'
      },
      {
        name: 'Speak from "I"',
        description: 'Share your own experience, not advice or interpretations for others.',
        icon: '💬'
      },
      {
        name: 'Listen Deeply',
        description: 'When others share, listen without planning your response. Be fully present.',
        icon: '👂'
      },
      {
        name: 'Honor the Medicine',
        description: 'We approach psychedelics with respect, humility, and gratitude.',
        icon: '🙏'
      }
    ]
  },
  traumaInformed: {
    title: 'Trauma-Informed Practices',
    practices: [
      'Acknowledge that difficult experiences may bring up trauma',
      'Create explicit safety and choice throughout',
      'Honor body wisdom and somatic signals',
      'Respect when someone needs to step back',
      'Avoid re-traumatization through pressure or intensity',
      'Recognize trauma responses (freeze, flight, fight, fawn)',
      'Provide grounding resources when needed',
      'Know when to refer to professional support'
    ]
  },
  safety: {
    title: 'Safety Protocols',
    protocols: [
      {
        situation: 'Someone shares suicidal ideation',
        response: 'Take seriously. Connect to crisis resources (988, Fireside Project). Follow up.'
      },
      {
        situation: 'Difficult emotions arise (crying, anger)',
        response: 'Hold space. Don\'t try to fix. Offer grounding if wanted. This is healing.'
      },
      {
        situation: 'Boundary violation occurs',
        response: 'Address directly and kindly. Restate boundaries. Remove from circle if needed.'
      },
      {
        situation: 'Medical or psychiatric emergency',
        response: 'Call 911 or crisis line. Don\'t try to handle alone. Document and report.'
      },
      {
        situation: 'Dissociation or overwhelm',
        response: 'Offer grounding. Name objects in room. Breathing. Physical sensation. Slow down.'
      }
    ]
  },
  crisisResources: {
    title: 'Crisis Resources',
    resources: [
      {
        name: 'Fireside Project',
        number: '62-FIRESIDE (623-473-7433)',
        hours: 'Daily 11am-11pm PT',
        description: 'Peer support for psychedelic experiences'
      },
      {
        name: '988 Suicide & Crisis Lifeline',
        number: '988',
        hours: '24/7',
        description: 'National mental health crisis support'
      },
      {
        name: 'Crisis Text Line',
        number: 'Text HOME to 741741',
        hours: '24/7',
        description: 'Text-based crisis support'
      },
      {
        name: 'SAMHSA National Helpline',
        number: '1-800-662-4357',
        hours: '24/7',
        description: 'Mental health and substance use support'
      }
    ]
  }
};

export const OPENING_PROMPTS = [
  {
    id: 1,
    name: 'Gratitude Opening',
    prompt: 'Let\'s begin by going around and each sharing one thing we\'re grateful for today.',
    duration: '5-10 min',
    energy: 'gentle'
  },
  {
    id: 2,
    name: 'Intention Setting',
    prompt: 'What brings you to circle today? What do you hope to explore or receive?',
    duration: '10-15 min',
    energy: 'focused'
  },
  {
    id: 3,
    name: 'Weather Check-In',
    prompt: 'If your inner state were weather right now, what would it be? Sunny, stormy, foggy?',
    duration: '10-15 min',
    energy: 'creative'
  },
  {
    id: 4,
    name: 'Body Check-In',
    prompt: 'Take a moment to scan your body. What sensations or emotions are present?',
    duration: '10-15 min',
    energy: 'somatic'
  },
  {
    id: 5,
    name: 'Simple Hello',
    prompt: 'Let\'s go around and simply say your name and how you\'re feeling in one word.',
    duration: '5 min',
    energy: 'simple'
  },
  {
    id: 6,
    name: 'Recent Integration',
    prompt: 'Share one thing that\'s come up in your integration practice since we last met.',
    duration: '15-20 min',
    energy: 'integrative'
  },
  {
    id: 7,
    name: 'Embodied Arrival',
    prompt: 'Let\'s take three deep breaths together to arrive in this space. Notice your body.',
    duration: '3-5 min',
    energy: 'centering'
  },
  {
    id: 8,
    name: 'Rose, Thorn, Bud',
    prompt: 'Share a rose (something good), a thorn (challenge), and a bud (something emerging).',
    duration: '15-20 min',
    energy: 'balanced'
  }
];

export const DISCUSSION_PROMPTS = [
  {
    id: 1,
    topic: 'Integration',
    prompt: 'What insights from your journey are you working to integrate into daily life?',
    depth: 'deep'
  },
  {
    id: 2,
    topic: 'Challenges',
    prompt: 'What\'s been difficult in your integration process? Where do you feel stuck?',
    depth: 'deep'
  },
  {
    id: 3,
    topic: 'Meaning-Making',
    prompt: 'How are you making meaning of your psychedelic experience? What story are you telling?',
    depth: 'deep'
  },
  {
    id: 4,
    topic: 'Relationships',
    prompt: 'How have your experiences affected your relationships? What\'s shifting?',
    depth: 'medium'
  },
  {
    id: 5,
    topic: 'Spirituality',
    prompt: 'Did your experience connect you to something larger than yourself? What does that mean?',
    depth: 'deep'
  },
  {
    id: 6,
    topic: 'Shadow Work',
    prompt: 'What shadow material came up for you? How are you working with it?',
    depth: 'deep'
  },
  {
    id: 7,
    topic: 'Embodiment',
    prompt: 'How are you feeling in your body these days? What somatic experiences are present?',
    depth: 'medium'
  },
  {
    id: 8,
    topic: 'Creativity',
    prompt: 'Have you noticed changes in your creativity or expression? How are you channeling it?',
    depth: 'medium'
  },
  {
    id: 9,
    topic: 'Purpose',
    prompt: 'Did your journey reveal anything about your life purpose or calling?',
    depth: 'deep'
  },
  {
    id: 10,
    topic: 'Grief',
    prompt: 'What are you grieving or releasing? How is that process unfolding?',
    depth: 'deep'
  },
  {
    id: 11,
    topic: 'Joy',
    prompt: 'What brings you joy now? How has your capacity for joy shifted?',
    depth: 'light'
  },
  {
    id: 12,
    topic: 'Fear',
    prompt: 'What fears came up during or after your experience? How are you relating to them?',
    depth: 'deep'
  },
  {
    id: 13,
    topic: 'Surrender',
    prompt: 'What have you learned about surrender and letting go?',
    depth: 'medium'
  },
  {
    id: 14,
    topic: 'Connection',
    prompt: 'How has your sense of connection to others, nature, or spirit changed?',
    depth: 'medium'
  },
  {
    id: 15,
    topic: 'Ego Death',
    prompt: 'For those who experienced ego dissolution, how are you integrating that?',
    depth: 'deep'
  },
  {
    id: 16,
    topic: 'Patterns',
    prompt: 'What old patterns or habits are you noticing and releasing?',
    depth: 'medium'
  },
  {
    id: 17,
    topic: 'Boundaries',
    prompt: 'What are you learning about your boundaries and needs?',
    depth: 'medium'
  },
  {
    id: 18,
    topic: 'Ancestors',
    prompt: 'Did you encounter ancestral or intergenerational material? How are you working with it?',
    depth: 'deep'
  },
  {
    id: 19,
    topic: 'Forgiveness',
    prompt: 'What are you forgiving in yourself or others?',
    depth: 'deep'
  },
  {
    id: 20,
    topic: 'Identity',
    prompt: 'How has your sense of self or identity shifted?',
    depth: 'deep'
  },
  {
    id: 21,
    topic: 'Daily Practice',
    prompt: 'What practices are supporting your integration (meditation, journaling, movement)?',
    depth: 'light'
  },
  {
    id: 22,
    topic: 'Gratitude',
    prompt: 'What gratitude emerged from your experience?',
    depth: 'light'
  },
  {
    id: 23,
    topic: 'Mystical',
    prompt: 'For those who had mystical experiences, how do you understand them now?',
    depth: 'deep'
  },
  {
    id: 24,
    topic: 'Nature',
    prompt: 'How has your relationship with nature changed?',
    depth: 'medium'
  },
  {
    id: 25,
    topic: 'Death',
    prompt: 'What did your journey teach you about death, impermanence, or mortality?',
    depth: 'deep'
  },
  {
    id: 26,
    topic: 'Healing',
    prompt: 'What healing has unfolded? What still needs healing?',
    depth: 'deep'
  },
  {
    id: 27,
    topic: 'Truth',
    prompt: 'What truths became clear that you can\'t unsee?',
    depth: 'deep'
  },
  {
    id: 28,
    topic: 'Service',
    prompt: 'How are you feeling called to serve or give back?',
    depth: 'medium'
  },
  {
    id: 29,
    topic: 'Loneliness',
    prompt: 'How are you relating to loneliness or feeling different from others?',
    depth: 'deep'
  },
  {
    id: 30,
    topic: 'Integration Tools',
    prompt: 'What tools or practices have been most helpful in your integration?',
    depth: 'light'
  }
];

export const CLOSING_PROMPTS = [
  {
    id: 1,
    name: 'One Word Close',
    prompt: 'Let\'s close with one word about what you\'re taking from circle today.',
    duration: '5 min'
  },
  {
    id: 2,
    name: 'Commitment',
    prompt: 'Share one small commitment you\'re making to your integration this week.',
    duration: '10 min'
  },
  {
    id: 3,
    name: 'Gratitude Circle',
    prompt: 'What are you grateful for from today\'s circle? Who or what touched you?',
    duration: '10 min'
  },
  {
    id: 4,
    name: 'Grounding',
    prompt: 'Let\'s take three deep breaths together to ground before we leave this space.',
    duration: '3 min'
  },
  {
    id: 5,
    name: 'Intention Forward',
    prompt: 'What intention are you carrying forward from today into the rest of your week?',
    duration: '10 min'
  },
  {
    id: 6,
    name: 'Appreciation',
    prompt: 'Take a moment to appreciate yourself for showing up today.',
    duration: '5 min'
  },
  {
    id: 7,
    name: 'Resources',
    prompt: 'Does anyone need resources or support between now and our next circle?',
    duration: '5 min'
  },
  {
    id: 8,
    name: 'Closing Ritual',
    prompt: 'Let\'s close with a moment of silence, honoring the medicine and each other.',
    duration: '3 min'
  },
  {
    id: 9,
    name: 'Simple Thank You',
    prompt: 'Thank you for being here. Thank you for your courage and vulnerability.',
    duration: '2 min'
  },
  {
    id: 10,
    name: 'Next Steps',
    prompt: 'Before we go, let\'s confirm our next meeting time and any logistics.',
    duration: '5 min'
  }
];

export const GROUNDING_EXERCISES = [
  {
    id: 1,
    name: '5-4-3-2-1 Technique',
    description: 'Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste.',
    duration: '5 min',
    when: 'Anxiety, overwhelm, dissociation'
  },
  {
    id: 2,
    name: 'Box Breathing',
    description: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 4 times.',
    duration: '3 min',
    when: 'Panic, stress, need centering'
  },
  {
    id: 3,
    name: 'Feet on Floor',
    description: 'Feel your feet firmly on the ground. Press down. Feel the earth supporting you.',
    duration: '2 min',
    when: 'Spaciness, need grounding'
  },
  {
    id: 4,
    name: 'Body Scan',
    description: 'Slowly scan attention through body from head to toe, noticing sensations.',
    duration: '10 min',
    when: 'Disconnection, need embodiment'
  },
  {
    id: 5,
    name: 'Cold Water',
    description: 'Splash cold water on face or hold ice cube. Activates present moment.',
    duration: '2 min',
    when: 'Dissociation, overwhelm'
  },
  {
    id: 6,
    name: 'Name Objects',
    description: 'Slowly name objects you see around you. Describe them in detail.',
    duration: '5 min',
    when: 'Anxiety, racing thoughts'
  },
  {
    id: 7,
    name: 'Bilateral Tapping',
    description: 'Alternately tap left and right shoulders, knees, or thighs. Regulates nervous system.',
    duration: '5 min',
    when: 'Trauma activation, overwhelm'
  },
  {
    id: 8,
    name: 'Safe Place Visualization',
    description: 'Visualize a safe, peaceful place. Engage all senses. Stay as long as needed.',
    duration: '10 min',
    when: 'Need safety, overwhelm'
  },
  {
    id: 9,
    name: 'Progressive Muscle Relaxation',
    description: 'Tense and release each muscle group from feet to head.',
    duration: '15 min',
    when: 'Tension, stress, anxiety'
  },
  {
    id: 10,
    name: 'Humming or Toning',
    description: 'Make a humming sound or tone. Feel vibration in body. Regulates vagus nerve.',
    duration: '5 min',
    when: 'Stress, need regulation'
  }
];

export const FACILITATION_BEST_PRACTICES = {
  preparation: [
    'Arrive early to set up space (virtual or physical)',
    'Test technology ahead of time',
    'Review participant names and any notes',
    'Set your own intention for holding space',
    'Have crisis resources ready and accessible',
    'Prepare prompts but stay flexible'
  ],
  duringCircle: [
    'Start and end on time',
    'Restate guidelines at beginning',
    'Model vulnerability and authenticity',
    'Track time and energy in the room',
    'Intervene compassionately if needed',
    'Don\'t try to fix or solve',
    'Hold space for silence',
    'Notice who hasn\'t spoken',
    'Keep confidentiality sacred',
    'Trust the process'
  ],
  challenges: [
    {
      situation: 'Someone dominates conversation',
      approach: 'Gently redirect: "Thank you for sharing. Let\'s hear from others who haven\'t spoken."'
    },
    {
      situation: 'Awkward silence',
      approach: 'Silence is okay. Wait 30 seconds. Then offer a prompt or share yourself.'
    },
    {
      situation: 'Advice-giving',
      approach: 'Redirect to "I" statements: "Let\'s share from our own experience rather than advice."'
    },
    {
      situation: 'Conflict between members',
      approach: 'Address directly. Restate guidelines. Offer to discuss offline if needed.'
    },
    {
      situation: 'You don\'t know answer',
      approach: 'It\'s okay to not know. "I don\'t have that answer. Let\'s explore together."'
    }
  ],
  selfCare: [
    'Facilitating is energy work. Take care of yourself.',
    'Have your own circle or therapist for support.',
    'Set boundaries around what you can hold.',
    'Don\'t carry others\' experiences home.',
    'Know when to refer to professional help.',
    'Take breaks when needed.',
    'Celebrate the honor of holding space.'
  ]
};

export const CULTURAL_SENSITIVITY = {
  title: 'Cultural Humility & Sensitivity',
  principles: [
    'Recognize psychedelics come from indigenous traditions',
    'Practice reciprocity - give back to indigenous communities',
    'Use proper names for medicines (don\'t appropriate or romanticize)',
    'Acknowledge land and indigenous territories',
    'Center indigenous voices and leadership',
    'Recognize power dynamics and privilege',
    'Be aware of cultural appropriation vs. appreciation',
    'Educate yourself on decolonization',
    'Support indigenous-led organizations and initiatives'
  ],
  resources: [
    'Indigenous Reciprocity Initiative',
    'Chacruna Institute for Psychedelic Plant Medicines',
    'North American Indigenous Psychedelics Summit',
    'Traditional Plant Teachers organizations'
  ]
};

// Helper function to get random prompt
export const getRandomPrompt = (category) => {
  const prompts = {
    opening: OPENING_PROMPTS,
    discussion: DISCUSSION_PROMPTS,
    closing: CLOSING_PROMPTS
  };

  const categoryPrompts = prompts[category] || [];
  return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
};

// Helper function to get grounding exercise by situation
export const getGroundingExercise = (situation) => {
  return GROUNDING_EXERCISES.find(ex =>
    ex.when.toLowerCase().includes(situation.toLowerCase())
  ) || GROUNDING_EXERCISES[0];
};
