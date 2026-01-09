/**
 * Aria AI Research Co-Pilot Service
 * Provides intelligent paper analysis, Q&A, and research assistance
 *
 * This is a mock implementation with simulated AI responses.
 * In production, replace with actual API calls to your AI backend.
 */

const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database of research papers
const mockPapers = {
  psilocybin: [
    {
      id: 'paper-001',
      title: 'Psilocybin-Induced Neuroplasticity in Treatment-Resistant Depression',
      authors: 'Carhart-Harris et al.',
      year: 2023,
      doi: '10.1038/nature.2023.001',
      abstract: 'Study examining neural mechanisms of psilocybin...',
    },
    {
      id: 'paper-002',
      title: 'Long-term Effects of Psilocybin on Default Mode Network',
      authors: 'Petri et al.',
      year: 2024,
      doi: '10.1016/brain.2024.002',
      abstract: 'Investigation of sustained DMN changes...',
    },
  ],
  mdma: [
    {
      id: 'paper-003',
      title: 'MDMA-Assisted Therapy for PTSD: Phase 3 Trial Results',
      authors: 'Mitchell et al.',
      year: 2023,
      doi: '10.1001/ptsd.2023.003',
      abstract: 'Randomized controlled trial of MDMA therapy...',
    },
  ],
  integration: [
    {
      id: 'paper-004',
      title: 'Best Practices in Psychedelic Integration Therapy',
      authors: 'Brennan & Belser',
      year: 2024,
      doi: '10.1080/integration.2024.004',
      abstract: 'Framework for effective integration practices...',
    },
  ],
};

// Terminology database
const terminology = {
  psilocybin: 'A naturally occurring psychedelic compound found in certain mushrooms. It acts primarily as a serotonin 2A receptor agonist, leading to altered consciousness and has shown promise in treating depression, anxiety, and addiction.',
  neuroplasticity: 'The brain\'s ability to reorganize itself by forming new neural connections. Psychedelics have been shown to promote neuroplasticity, potentially explaining their therapeutic effects.',
  'default mode network': 'A network of brain regions active during rest and self-referential thinking. Psychedelics typically decrease DMN activity, which correlates with ego dissolution and therapeutic outcomes.',
  '5-ht2a': 'The serotonin 2A receptor, the primary target for classic psychedelics like psilocybin and LSD. Activation of this receptor leads to the characteristic effects of psychedelic experiences.',
  integration: 'The process of incorporating insights and experiences from psychedelic sessions into daily life. Considered crucial for lasting therapeutic benefits.',
  'set and setting': 'The mindset (set) and physical/social environment (setting) in which a psychedelic experience takes place. Critical factors for safety and therapeutic outcomes.',
};

/**
 * Analyze a research paper
 * @param {Object} paper - Paper object or paper ID
 * @returns {Promise<Object>} Analysis results
 */
export const analyzePaper = async (paper) => {
  await delay(1200);

  const paperId = typeof paper === 'string' ? paper : paper?.id;
  const paperTitle = paper?.title || 'the selected paper';

  return {
    summary: `This research investigates ${paperTitle.toLowerCase()}. The study employs rigorous methodology and presents compelling evidence for therapeutic applications of psychedelics.`,
    keyFindings: [
      'Significant reduction in symptom severity (p < 0.001)',
      'Sustained effects observed at 6-month follow-up',
      'Strong correlation between mystical experience and outcomes',
      'No serious adverse events reported in controlled setting',
    ],
    methodology: 'Double-blind, placebo-controlled, randomized trial with comprehensive safety protocols',
    strengths: [
      'Robust sample size and diverse participant demographics',
      'Comprehensive assessment battery including neuroimaging',
      'Long-term follow-up data collection',
    ],
    limitations: [
      'Limited to specific population (treatment-resistant cases)',
      'Potential expectancy effects despite blinding',
      'Need for larger multi-site replication studies',
    ],
    implications: 'Results support further investigation into psychedelic-assisted therapy as a promising treatment modality for mental health conditions.',
    controversies: [
      'Debate over blinding effectiveness in psychedelic trials',
      'Questions about scalability and therapist training requirements',
      'Regulatory and cultural barriers to implementation',
    ],
  };
};

/**
 * Answer questions about papers or topics
 * @param {string} question - User question
 * @param {Object} context - Current context (paper, course, etc.)
 * @returns {Promise<string>} AI response
 */
export const answerQuestion = async (question, context = {}) => {
  await delay(1000);

  const questionLower = question.toLowerCase();

  // Context-aware responses
  if (context.type === 'paper' && context.data) {
    if (questionLower.includes('summarize') || questionLower.includes('summary')) {
      return `Here's a concise summary: This paper examines ${context.data.title.toLowerCase()}. The researchers found significant therapeutic potential with sustained benefits. Key mechanisms involve neuroplasticity and default mode network modulation. The findings support cautious optimism for clinical applications.`;
    }
    if (questionLower.includes('key finding') || questionLower.includes('result')) {
      return 'The key findings include: 1) Significant symptom reduction with large effect sizes, 2) Sustained benefits at follow-up assessments, 3) Strong safety profile in controlled settings, and 4) Correlation between mystical experiences and clinical outcomes.';
    }
    if (questionLower.includes('controversial') || questionLower.includes('criticism')) {
      return 'Main controversies include: the difficulty of maintaining double-blind conditions (participants often guess their condition), questions about expectancy effects, concerns about scalability and training requirements for therapists, and debates about appropriate regulatory pathways for approval.';
    }
  }

  // Topic-specific responses
  if (questionLower.includes('mechanism') || questionLower.includes('how do') || questionLower.includes('brain')) {
    return 'Psychedelics primarily work by binding to serotonin 2A receptors (5-HT2A), especially in cortical regions. This leads to: 1) Increased neural connectivity and communication between brain regions, 2) Reduced activity in the Default Mode Network (DMN), associated with ego dissolution, 3) Enhanced neuroplasticity through BDNF and TrkB signaling, and 4) Modulation of emotional processing networks. These mechanisms may explain both acute effects and lasting therapeutic benefits.';
  }

  if (questionLower.includes('neuroplasticity')) {
    return 'Neuroplasticity refers to the brain\'s ability to reorganize neural pathways. Psychedelics promote neuroplasticity through several mechanisms: increased dendritic branching and spine density, upregulation of BDNF (brain-derived neurotrophic factor), enhanced synaptic protein expression, and increased structural and functional connectivity. This "reopening" of critical period-like plasticity may allow therapeutic relearning and emotional processing.';
  }

  if (questionLower.includes('safety') || questionLower.includes('risk')) {
    return 'Safety considerations include: Medical screening for cardiovascular conditions and psychosis risk, psychological preparation and screening, controlled set and setting with trained facilitators, integration support post-session, and contraindications including personal/family history of psychosis, certain medications (MAOIs, SSRIs), and unstable medical conditions. When properly screened and supervised, the safety profile is generally favorable.';
  }

  if (questionLower.includes('integration')) {
    return 'Integration is the process of incorporating insights from psychedelic experiences into daily life. Effective integration practices include: regular integration therapy sessions, journaling and reflection, mindfulness and meditation practices, somatic work and bodywork, community support groups, and gradual implementation of insights. Research suggests integration is crucial for sustaining therapeutic benefits.';
  }

  if (questionLower.includes('therapy') || questionLower.includes('treatment') || questionLower.includes('session')) {
    return 'Psychedelic-assisted therapy typically follows a structured protocol: 1) Preparation sessions (2-3) to build therapeutic rapport, set intentions, and provide education, 2) Dosing session(s) with continuous therapeutic support in a safe setting, 3) Integration sessions (multiple) to process experiences and apply insights. The entire process emphasizes psychological support alongside the pharmacological intervention.';
  }

  if (questionLower.includes('explain') && questionLower.match(/(?:what is|what are|define)/)) {
    // Extract potential term
    const terms = questionLower.match(/(?:what is|what are|define) (?:a |an |the )?(.+?)(?:\?|$)/);
    if (terms && terms[1]) {
      const term = terms[1].trim().replace(/\?/g, '');
      const definition = terminology[term] || terminology[term.replace(/-/g, ' ')];
      if (definition) {
        return `${term.charAt(0).toUpperCase() + term.slice(1)}: ${definition}`;
      }
    }
  }

  // Default responses based on context
  if (context.type === 'course') {
    return 'I\'m here to help you understand psychedelic research and therapy. Could you be more specific about which aspect you\'d like to explore? I can explain mechanisms, discuss safety, summarize research findings, or clarify terminology.';
  }

  return 'I\'m Aria, your AI research co-pilot. I can help you understand research papers, explain psychedelic mechanisms, discuss safety and ethics, find related studies, and answer questions about psychedelic-assisted therapy. What would you like to know?';
};

/**
 * Find related papers based on topic or current paper
 * @param {string} query - Search query or topic
 * @param {Object} currentPaper - Optional current paper for similarity search
 * @returns {Promise<Array>} Related papers
 */
export const findRelatedPapers = async (query, currentPaper = null) => {
  await delay(900);

  const queryLower = query.toLowerCase();
  let papers = [];

  // Topic-based search
  if (queryLower.includes('psilocybin') || queryLower.includes('mushroom')) {
    papers = mockPapers.psilocybin;
  } else if (queryLower.includes('mdma') || queryLower.includes('ptsd')) {
    papers = mockPapers.mdma;
  } else if (queryLower.includes('integration')) {
    papers = mockPapers.integration;
  } else {
    // Return a mix
    papers = [
      ...mockPapers.psilocybin.slice(0, 2),
      ...mockPapers.mdma.slice(0, 1),
      ...mockPapers.integration.slice(0, 1),
    ];
  }

  return papers.map(paper => ({
    ...paper,
    relevanceScore: 0.85 + Math.random() * 0.15,
    reason: 'Similar methodology and research focus',
  }));
};

/**
 * Extract key insights from a paper or conversation
 * @param {Object} content - Paper or conversation content
 * @returns {Promise<Array>} Key insights
 */
export const extractKeyInsights = async (content) => {
  await delay(800);

  return [
    {
      insight: 'Psychedelics show promise for treatment-resistant conditions',
      confidence: 0.92,
      category: 'clinical',
    },
    {
      insight: 'Neuroplasticity appears to be a key mechanism of action',
      confidence: 0.88,
      category: 'mechanism',
    },
    {
      insight: 'Integration support is crucial for sustained benefits',
      confidence: 0.85,
      category: 'therapy',
    },
    {
      insight: 'Safety profile is favorable in controlled clinical settings',
      confidence: 0.90,
      category: 'safety',
    },
  ];
};

/**
 * Explain terminology in plain language
 * @param {string} term - Term to explain
 * @returns {Promise<string>} Explanation
 */
export const explainTerm = async (term) => {
  await delay(600);

  const termLower = term.toLowerCase().trim();
  const definition = terminology[termLower] || terminology[termLower.replace(/-/g, ' ')];

  if (definition) {
    return definition;
  }

  return `I don't have a specific definition for "${term}" in my knowledge base. Could you provide more context, or would you like me to search for related information?`;
};

/**
 * Generate context-aware suggestions based on current page/content
 * @param {Object} context - Current context
 * @returns {Promise<Array>} Suggestions
 */
export const generateSuggestions = async (context) => {
  await delay(500);

  const suggestions = [];

  if (context.type === 'paper') {
    suggestions.push(
      'Summarize this paper in 3 bullet points',
      'What are the key findings?',
      'Explain the methodology used',
      'What are the limitations of this study?',
      'Find related papers on this topic'
    );
  } else if (context.type === 'course') {
    suggestions.push(
      'Explain the mechanism of action',
      'What are the safety considerations?',
      'How does integration work?',
      'Find recent research on this topic'
    );
  } else if (context.type === 'feed' || context.type === 'post') {
    suggestions.push(
      'Fact-check this claim',
      'Find supporting research',
      'Explain this concept in simple terms',
      'What does the research say about this?'
    );
  } else {
    suggestions.push(
      'How do psychedelics work in the brain?',
      'What is neuroplasticity?',
      'Explain the therapeutic process',
      'Find papers on MDMA therapy'
    );
  }

  return suggestions;
};

/**
 * Simulate streaming response (character by character)
 * Useful for creating typing effect
 * @param {string} text - Text to stream
 * @param {Function} onChunk - Callback for each character
 * @param {number} speed - Characters per second
 * @returns {Promise<void>}
 */
export const streamResponse = async (text, onChunk, speed = 30) => {
  const delayPerChar = 1000 / speed;

  for (let i = 0; i < text.length; i++) {
    onChunk(text.slice(0, i + 1));
    await delay(delayPerChar);
  }
};

/**
 * Batch analyze multiple papers
 * @param {Array} papers - Array of papers to analyze
 * @returns {Promise<Array>} Analysis results
 */
export const batchAnalyzePapers = async (papers) => {
  const analyses = await Promise.all(
    papers.map(paper => analyzePaper(paper))
  );
  return analyses;
};

export default {
  analyzePaper,
  answerQuestion,
  findRelatedPapers,
  extractKeyInsights,
  explainTerm,
  generateSuggestions,
  streamResponse,
  batchAnalyzePapers,
};
