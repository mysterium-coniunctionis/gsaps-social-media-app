/**
 * Comprehensive Course Data
 * Graduate and Post-Graduate Level Courses with Full Curriculum
 * TutorLMS-style structure with modules, lessons, quizzes, assessments
 */

export const COMPREHENSIVE_COURSES = [
  {
    id: 1,
    title: 'Introduction to Psychedelic-Assisted Therapy',
    slug: 'intro-psychedelic-therapy',
    shortDescription: 'A comprehensive introduction to the field of psychedelic-assisted psychotherapy, covering history, mechanisms, and current clinical applications.',
    fullDescription: `This comprehensive 8-week graduate-level course provides a rigorous foundation in psychedelic-assisted therapy. Drawing from the latest clinical research, neuroscience, and therapeutic frameworks, students will explore the historical context, pharmacological mechanisms, clinical protocols, and ethical considerations of working with psychedelic medicines in therapeutic settings.

The course integrates evidence-based practice with experiential learning through case studies, role-playing exercises, and expert interviews. Students will develop competencies in screening, preparation, dosing sessions, and integration support while understanding the broader cultural and legal landscape of psychedelic therapy.

Upon completion, participants will be prepared to pursue advanced training and understand the foundations necessary for ethical, effective psychedelic-assisted therapy practice.`,
    instructor: {
      id: 3,
      name: 'Dr. Jane Smith',
      avatar_url: 'https://i.pravatar.cc/150?img=5',
      credentials: 'PhD, Clinical Psychology',
      bio: 'Dr. Smith is a licensed clinical psychologist with 15 years of experience in psychedelic research. She has published over 30 peer-reviewed articles and served as principal investigator in multiple FDA-approved psilocybin trials.',
      verified: true
    },
    category: 'psychedelic-therapy',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400',
    duration: '8 weeks',
    totalHours: 60,
    lessonsCount: 24,
    quizzesCount: 8,
    assignmentsCount: 4,
    studentsEnrolled: 142,
    rating: 4.8,
    ratingCount: 67,
    price: 0, // Free course
    ceCredits: 15,
    ceCategories: ['APA', 'CME', 'CNE'],
    featured: true,
    prerequisites: ['Basic psychology knowledge', 'Professional clinical background preferred'],
    learningOutcomes: [
      'Understand the history and cultural context of psychedelic use',
      'Explain the neurobiological mechanisms of major psychedelic compounds',
      'Describe evidence-based clinical protocols for psychedelic-assisted therapy',
      'Apply ethical frameworks to psychedelic therapy practice',
      'Conduct proper screening and contraindication assessment',
      'Facilitate preparation, dosing, and integration sessions',
      'Navigate legal and professional considerations in the field'
    ],
    syllabus: [
      {
        moduleId: 1,
        title: 'Module 1: Foundations and History',
        description: 'Explore the historical, cultural, and scientific foundations of psychedelic therapy',
        duration: '2 weeks',
        learningObjectives: [
          'Trace the history of psychedelic use from indigenous practices to modern research',
          'Identify key figures and research periods in psychedelic science',
          'Understand the cultural renaissance and current regulatory landscape',
          'Analyze the impact of prohibition on psychedelic research'
        ],
        lessons: [
          {
            lessonId: 1,
            title: 'Indigenous Traditions and Sacred Medicines',
            type: 'video',
            duration: '45 min',
            content: 'Exploration of traditional psychedelic use in indigenous cultures, including ayahuasca ceremonies, peyote rituals, and mushroom traditions. Discussion of cultural appropriation and ethical considerations.',
            resources: [
              'Reading: Labate & Cavnar - The Therapeutic Use of Ayahuasca (Ch. 1-2)',
              'Documentary: Sacred Medicine (30 min excerpt)',
              'Article: Indigenous Perspectives on Psychedelic Research'
            ]
          },
          {
            lessonId: 2,
            title: 'Early Western Research: 1950s-1960s',
            type: 'video',
            duration: '50 min',
            content: 'The first wave of psychedelic research, including work by Hofmann, Osmond, Grof, and others. Analysis of methodologies, findings, and cultural impact.',
            resources: [
              'Reading: Pollan - How to Change Your Mind (Ch. 2)',
              'Primary source: Osmond & Smythies - Schizophrenia: A New Approach (1952)',
              'Video interview: Stanislav Grof on LSD Psychotherapy'
            ]
          },
          {
            lessonId: 3,
            title: 'The Dark Ages: Prohibition and the War on Drugs',
            type: 'video',
            duration: '40 min',
            content: 'Understanding how prohibition shaped (and limited) psychedelic research, the role of Schedule I classification, and impacts on medical access.',
            resources: [
              'Reading: Psychedelic Policy Quagmire - Health, Law, Freedom',
              'Case study: DEA Schedule I implications for research',
              'Timeline: Major legislative events 1970-2000'
            ]
          },
          {
            lessonId: 4,
            title: 'Renaissance: Modern Research Revival',
            type: 'video',
            duration: '45 min',
            content: 'The resurgence of psychedelic research in the 21st century, landmark studies, and the path toward medicalization.',
            resources: [
              'Reading: Multidisciplinary Association for Psychedelic Studies (MAPS) timeline',
              'Article: Johns Hopkins psilocybin studies overview',
              'Interactive timeline: Key research milestones 2000-2024'
            ]
          },
          {
            lessonId: 5,
            title: 'Current Regulatory Landscape',
            type: 'text + interactive',
            duration: '35 min',
            content: 'Analysis of current FDA designation pathways, state-level decriminalization efforts, and international regulatory frameworks.',
            resources: [
              'Reading: FDA Breakthrough Therapy Designation explained',
              'Interactive map: Global psychedelic legal status',
              'Policy brief: State-by-state psychedelic laws (2024)'
            ]
          },
          {
            lessonId: 6,
            title: 'Cultural Context and Social Justice',
            type: 'video + discussion',
            duration: '50 min',
            content: 'Examining equity, access, cultural appropriation, and social justice issues in the psychedelic renaissance.',
            resources: [
              'Reading: Equity in Psychedelic Science - Challenges and Solutions',
              'Panel discussion: Indigenous leaders on reciprocity and respect',
              'Article: Addressing racial disparities in psychedelic access'
            ]
          },
          {
            lessonId: 7,
            title: 'Key Research Organizations and Advocacy Groups',
            type: 'text',
            duration: '30 min',
            content: 'Overview of major organizations advancing psychedelic research and therapy: MAPS, Usona Institute, Compass Pathways, Heffter Research Institute.',
            resources: [
              'Organization profiles and mission statements',
              'Current clinical trials database',
              'How to get involved: pathways for professionals'
            ]
          },
          {
            lessonId: 8,
            title: 'Module 1 Assessment',
            type: 'quiz',
            duration: '30 min',
            content: 'Comprehensive quiz covering historical timeline, key figures, cultural contexts, and regulatory frameworks.',
            questions: 20
          }
        ]
      },
      {
        moduleId: 2,
        title: 'Module 2: Pharmacology and Neuroscience',
        description: 'Deep dive into the pharmacological and neurobiological mechanisms of psychedelic compounds',
        duration: '2.5 weeks',
        learningObjectives: [
          'Explain the pharmacokinetics and pharmacodynamics of major psychedelic classes',
          'Describe receptor binding profiles and neural mechanisms',
          'Understand the neuroscience of mystical experiences and ego dissolution',
          'Analyze neuroplasticity and default mode network theories'
        ],
        lessons: [
          {
            lessonId: 9,
            title: 'Psychedelic Compound Classes',
            type: 'video',
            duration: '55 min',
            content: 'Overview of major psychedelic classes: classical psychedelics (tryptamines, phenethylamines), MDMA, ketamine, ibogaine. Chemical structures and classification.',
            resources: [
              'Reading: Nichols - Psychedelics (Pharmacological Reviews, 2016)',
              'Interactive 3D models: Molecular structures',
              'Comparison chart: Compound characteristics'
            ]
          },
          {
            lessonId: 10,
            title: 'Serotonergic System and 5-HT2A Receptors',
            type: 'video',
            duration: '50 min',
            content: 'Detailed exploration of serotonin receptor subtypes, focusing on 5-HT2A receptor agonism as the primary mechanism of classical psychedelics.',
            resources: [
              'Reading: Vollenweider & Preller - Serotonergic System in Psychedelics',
              'Animation: Receptor binding and signal transduction',
              'Lecture: Dr. David Olson on psychoplastogens'
            ]
          },
          {
            lessonId: 11,
            title: 'MDMA: Entactogenic Mechanisms',
            type: 'video',
            duration: '45 min',
            content: 'Unique pharmacology of MDMA as a serotonin-norepinephrine-dopamine releasing agent. Mechanisms underlying prosocial effects and fear extinction.',
            resources: [
              'Reading: Mithoefer - MDMA-Assisted Therapy Mechanisms',
              'Diagram: Monoamine release cascade',
              'Case study: MDMA effects on amygdala reactivity'
            ]
          },
          {
            lessonId: 12,
            title: 'Ketamine and Glutamate Modulation',
            type: 'video',
            duration: '40 min',
            content: 'NMDA receptor antagonism, rapid antidepressant effects, and dissociative experiences. Comparison with classical psychedelics.',
            resources: [
              'Reading: Ketamine for Treatment-Resistant Depression',
              'Video: Mechanism of rapid antidepressant action',
              'Protocol overview: Clinical ketamine administration'
            ]
          },
          {
            lessonId: 13,
            title: 'Neuroimaging Studies',
            type: 'video + interactive',
            duration: '50 min',
            content: 'fMRI and PET studies revealing brain activity patterns under psychedelics. Default mode network disruption, global connectivity increases.',
            resources: [
              'Reading: Carhart-Harris - Neuroimaging of Psychedelic States',
              'Interactive brain visualization: DMN connectivity changes',
              'Research review: Key neuroimaging findings (2010-2024)'
            ]
          },
          {
            lessonId: 14,
            title: 'Neuroplasticity and Synaptogenesis',
            type: 'video',
            duration: '45 min',
            content: 'How psychedelics promote neural plasticity, dendritic growth, and synapse formation. Implications for therapeutic efficacy.',
            resources: [
              'Reading: Ly et al. - Psychedelics Promote Structural and Functional Neural Plasticity',
              'Animation: Dendritic spine formation',
              'Interview: Dr. David Olson on psychoplastogens'
            ]
          },
          {
            lessonId: 15,
            title: 'The Neuroscience of Mystical Experiences',
            type: 'video',
            duration: '50 min',
            content: 'Neural correlates of mystical-type experiences, ego dissolution, and transcendent states. Role in therapeutic outcomes.',
            resources: [
              'Reading: Griffiths et al. - Mystical-Type Experiences',
              'Scale: Mystical Experience Questionnaire (MEQ30)',
              'Research: Correlation between mystical experience and outcomes'
            ]
          },
          {
            lessonId: 16,
            title: 'Safety Pharmacology and Drug Interactions',
            type: 'text + case studies',
            duration: '40 min',
            content: 'Physiological safety profile, cardiovascular effects, potential adverse reactions, and dangerous drug combinations (especially MAOIs, SSRIs).',
            resources: [
              'Reading: Safety and toxicology review',
              'Drug interaction checker tool',
              'Case studies: Managing adverse reactions'
            ]
          },
          {
            lessonId: 17,
            title: 'Module 2 Assessment',
            type: 'quiz',
            duration: '35 min',
            content: 'Assessment of pharmacology, neuroscience concepts, receptor mechanisms, and safety considerations.',
            questions: 25
          }
        ]
      },
      {
        moduleId: 3,
        title: 'Module 3: Clinical Applications and Evidence Base',
        description: 'Review of clinical evidence for psychedelic-assisted therapy across mental health conditions',
        duration: '2 weeks',
        learningObjectives: [
          'Evaluate the evidence base for psychedelic therapy across conditions',
          'Analyze clinical trial methodologies and outcomes',
          'Understand mechanisms of therapeutic change',
          'Compare efficacy to standard treatments'
        ],
        lessons: [
          {
            lessonId: 18,
            title: 'Treatment-Resistant Depression',
            type: 'video',
            duration: '50 min',
            content: 'Psilocybin and ketamine for major depressive disorder. Review of landmark trials, effect sizes, and durability of effects.',
            resources: [
              'Reading: Carhart-Harris et al. - Psilocybin with Psychological Support for TRD',
              'Meta-analysis: Psychedelic therapy for depression',
              'Patient testimonials: Recovery stories'
            ]
          },
          {
            lessonId: 19,
            title: 'PTSD and Trauma Processing',
            type: 'video',
            duration: '50 min',
            content: 'MDMA-assisted therapy for PTSD. MAPS Phase 3 trials, FDA Breakthrough Therapy designation, mechanisms of trauma resolution.',
            resources: [
              'Reading: Mitchell et al. - MDMA-Assisted Therapy for Severe PTSD',
              'Protocol: MAPS MDMA therapy manual',
              'Video: Trauma processing mechanisms'
            ]
          },
          {
            lessonId: 20,
            title: 'Anxiety Disorders and End-of-Life Distress',
            type: 'video',
            duration: '45 min',
            content: 'Psilocybin for anxiety in life-threatening illness. Studies with cancer patients, existential distress, death anxiety.',
            resources: [
              'Reading: Griffiths et al. - Psilocybin for Cancer-Related Anxiety',
              'Case study: End-of-life psychedelic therapy',
              'Interview: Patients discussing existential relief'
            ]
          },
          {
            lessonId: 21,
            title: 'Substance Use Disorders',
            type: 'video',
            duration: '45 min',
            content: 'Psychedelics for addiction: alcohol use disorder, tobacco cessation, opioid dependence. Mechanisms disrupting addictive patterns.',
            resources: [
              'Reading: Bogenschutz et al. - Psilocybin for Alcohol Use Disorder',
              'Study: Johns Hopkins smoking cessation trial',
              'Theory: How psychedelics address addiction'
            ]
          },
          {
            lessonId: 22,
            title: 'Obsessive-Compulsive Disorder and Eating Disorders',
            type: 'video',
            duration: '40 min',
            content: 'Emerging evidence for OCD and anorexia nervosa. Mechanisms involving cognitive flexibility and rumination interruption.',
            resources: [
              'Reading: Moreno et al. - Psilocybin for OCD',
              'Research update: Anorexia nervosa trials',
              'Theory: Breaking rigid thought patterns'
            ]
          },
          {
            lessonId: 23,
            title: 'Comparative Effectiveness and Treatment Matching',
            type: 'text + discussion',
            duration: '40 min',
            content: 'Comparing psychedelic therapy to conventional treatments. When are psychedelics indicated? Treatment algorithms and personalized medicine.',
            resources: [
              'Reading: Comparative effectiveness review',
              'Algorithm: Treatment selection decision tree',
              'Discussion: Balancing benefits and risks'
            ]
          },
          {
            lessonId: 24,
            title: 'Module 3 Assessment and Case Study Analysis',
            type: 'quiz + assignment',
            duration: '60 min',
            content: 'Assessment of clinical evidence knowledge. Case study assignment: Analyze patient presentation and recommend treatment approach with rationale.',
            questions: 20,
            assignment: 'Detailed case formulation paper'
          }
        ]
      }
    ],
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-10-28'),
    status: 'published'
  },

  // Course 2: MDMA-Assisted Therapy
  {
    id: 2,
    title: 'MDMA-Assisted Therapy for PTSD: Clinical Training',
    slug: 'mdma-therapy-ptsd',
    shortDescription: 'Comprehensive clinical training in MDMA-assisted therapy based on MAPS Phase 3 protocols for treating post-traumatic stress disorder.',
    fullDescription: `This intensive 12-week clinical training program provides comprehensive preparation for conducting MDMA-assisted therapy with PTSD patients. Based on the MAPS Phase 3 clinical trial protocols that led to FDA Breakthrough Therapy designation, this course offers rigorous training in the theoretical foundations, clinical protocols, and therapeutic skills essential for this emerging treatment modality.

Participants will master the three-phase MDMA therapy model (preparation, medicine sessions, integration), learn evidence-based techniques for trauma processing, and develop competencies in managing challenging experiences. The curriculum integrates neuroscience, trauma theory, somatic approaches, and ethical considerations specific to MDMA therapy.

This course includes extensive case study analysis, role-play practice, video demonstrations from actual therapy sessions (with consent), and supervision-style feedback on clinical decision-making. Upon completion, graduates will be positioned to pursue advanced certification and meet requirements for conducting MDMA therapy in clinical settings.`,
    instructor: {
      id: 4,
      name: 'Dr. Michael Chen',
      avatar_url: 'https://i.pravatar.cc/150?img=7',
      credentials: 'MD, Psychiatry, MDMA Therapy Certified Trainer',
      bio: 'Dr. Chen is a board-certified psychiatrist who served as a therapist and supervisor in MAPS Phase 2 and 3 MDMA trials. He has trained over 200 clinicians in MDMA-assisted therapy protocols.',
      verified: true
    },
    category: 'clinical-research',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    duration: '12 weeks',
    totalHours: 120,
    lessonsCount: 36,
    quizzesCount: 12,
    assignmentsCount: 8,
    studentsEnrolled: 89,
    rating: 4.9,
    ratingCount: 45,
    price: 299,
    ceCredits: 24,
    ceCategories: ['APA', 'CME', 'CNE', 'Social Work'],
    featured: true,
    prerequisites: [
      'Licensed mental health professional (required)',
      'Experience treating trauma (required)',
      'Completion of Introduction to Psychedelic-Assisted Therapy or equivalent (required)',
      'Basic understanding of somatic therapies (recommended)'
    ],
    learningOutcomes: [
      'Demonstrate mastery of MAPS MDMA therapy protocol',
      'Conduct comprehensive trauma-informed screening and assessment',
      'Facilitate preparation sessions building therapeutic alliance and safety',
      'Guide MDMA medicine sessions using non-directive, supportive techniques',
      'Navigate challenging experiences and manage safety issues',
      'Conduct integration sessions consolidating insights and promoting healing',
      'Apply trauma theory and somatic approaches in MDMA therapy context',
      'Maintain ethical boundaries and provide trauma-informed care'
    ],
    syllabus: [
      {
        moduleId: 1,
        title: 'Module 1: MDMA Foundations and Trauma Theory',
        description: 'Essential foundations: MDMA pharmacology, trauma neurobiology, and therapeutic rationale',
        duration: '3 weeks',
        learningObjectives: [
          'Explain MDMA pharmacology and mechanisms in trauma treatment',
          'Describe neurobiological models of PTSD',
          'Understand the rationale for MDMA as a trauma treatment',
          'Review clinical trial evidence and outcomes'
        ],
        lessons: [
          {
            lessonId: 1,
            title: 'MDMA Pharmacology Deep Dive',
            type: 'video',
            duration: '60 min',
            content: 'Comprehensive pharmacology: serotonin-norepinephrine-dopamine release, oxytocin system activation, effects on fear extinction and emotional processing.',
            resources: [
              'Reading: Sessa - MDMA and PTSD Treatment (Ch. 2)',
              'Animation: Mechanism of MDMA action in the brain',
              'Research: Pharmacokinetics and optimal dosing'
            ]
          },
          {
            lessonId: 2,
            title: 'Neurobiology of PTSD',
            type: 'video',
            duration: '55 min',
            content: 'Trauma effects on brain structure and function: amygdala hyperactivity, hippocampal atrophy, prefrontal cortex dysfunction, altered fear conditioning.',
            resources: [
              'Reading: van der Kolk - The Body Keeps the Score (Ch. 3-4)',
              'Neuroimaging: PTSD brain scan comparisons',
              'Video lecture: Fear conditioning and extinction'
            ]
          }
          // ... more lessons
        ]
      }
      // ... more modules
    ],
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-10-28'),
    status: 'published'
  }

  // Additional courses truncated for brevity - will be fully expanded in actual file
];

export default COMPREHENSIVE_COURSES;
