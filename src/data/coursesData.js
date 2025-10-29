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

  ,

  // Course 3: Neuroscience of Psychedelics
  {
    id: 3,
    title: 'Neuroscience of Psychedelics: Advanced Mechanisms',
    slug: 'neuroscience-psychedelics',
    shortDescription: 'Advanced graduate-level exploration of the neuroscientific mechanisms underlying psychedelic effects, from molecular pharmacology to network neuroscience.',
    fullDescription: `This rigorous 10-week advanced course provides an in-depth examination of the neuroscience underlying psychedelic experiences and therapeutic effects. Designed for graduate students, researchers, and clinicians with strong foundational knowledge, this course integrates molecular pharmacology, systems neuroscience, neuroimaging, and computational modeling to provide a comprehensive understanding of how psychedelics affect brain function.

Students will explore cutting-edge research on receptor mechanisms, neural network dynamics, neuroplasticity, and consciousness. The course emphasizes critical analysis of primary literature, experimental design, and translational implications for therapy. Topics include default mode network disruption, cortical entropy, predictive processing models, and the neurobiology of mystical experiences.

Upon completion, participants will possess expert-level knowledge of psychedelic neuroscience, enabling them to critically evaluate research, contribute to scientific discourse, and apply mechanistic understanding to clinical practice. This course prepares students for doctoral-level research or advanced clinical specialization in psychedelic medicine.`,
    instructor: {
      id: 5,
      name: 'Dr. Robin Carhart-Harris',
      avatar_url: 'https://i.pravatar.cc/150?img=12',
      credentials: 'PhD, Neuroscience, Director of Psychedelic Research',
      bio: 'Dr. Carhart-Harris is a leading neuroscientist in psychedelic research, pioneering neuroimaging studies and developing influential theories including the REBUS model and entropic brain hypothesis. He has published over 100 papers on psychedelic neuroscience.',
      verified: true
    },
    category: 'neuroscience',
    level: 'advanced',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
    duration: '10 weeks',
    totalHours: 85,
    lessonsCount: 32,
    quizzesCount: 8,
    assignmentsCount: 6,
    studentsEnrolled: 67,
    rating: 4.9,
    ratingCount: 34,
    price: 349,
    ceCredits: 20,
    ceCategories: ['APA', 'CME', 'Neuroscience'],
    featured: true,
    prerequisites: [
      'Graduate-level neuroscience background (required)',
      'Completion of Introduction to Psychedelic-Assisted Therapy or equivalent (required)',
      'Understanding of pharmacology and receptor systems (required)',
      'Familiarity with neuroimaging techniques (recommended)',
      'Experience reading primary scientific literature (required)'
    ],
    learningOutcomes: [
      'Master molecular mechanisms of psychedelic action across receptor systems',
      'Analyze neuroimaging data revealing network-level brain changes',
      'Explain theories of consciousness and altered states',
      'Evaluate neuroplasticity mechanisms and therapeutic implications',
      'Critically assess primary research and experimental methodologies',
      'Apply computational models to psychedelic brain states',
      'Integrate mechanistic knowledge with clinical applications',
      'Contribute to scientific discourse on psychedelic neuroscience'
    ],
    syllabus: [
      {
        moduleId: 1,
        title: 'Module 1: Molecular Mechanisms and Receptor Systems',
        description: 'Comprehensive exploration of molecular pharmacology and receptor-level mechanisms',
        duration: '2.5 weeks',
        learningObjectives: [
          'Describe detailed receptor pharmacology for all major psychedelic compounds',
          'Explain signal transduction cascades and downstream effects',
          'Analyze structure-activity relationships and molecular selectivity',
          'Evaluate methods for studying receptor mechanisms'
        ],
        lessons: [
          {
            lessonId: 1,
            title: 'Serotonin Receptor Families: Comprehensive Overview',
            type: 'video',
            duration: '60 min',
            content: 'Detailed examination of all serotonin receptor subtypes (5-HT1-7), their distribution, function, and signaling pathways. Focus on 5-HT2A, 5-HT2C, and 5-HT1A in psychedelic action.',
            resources: [
              'Reading: Nichols - Serotonin Receptors (Pharmacological Reviews)',
              'Interactive: 3D receptor structure visualization',
              'Database: Receptor expression mapping across brain regions'
            ]
          },
          {
            lessonId: 2,
            title: '5-HT2A Receptor: The Primary Target',
            type: 'video',
            duration: '65 min',
            content: 'Deep dive into 5-HT2A receptor structure, function, and role as the principal mediator of psychedelic effects. G-protein coupling, downstream signaling, and hallucinogenic potency correlations.',
            resources: [
              'Reading: Vollenweider & Preller - Serotonergic Mechanisms (Current Topics)',
              'Research: 5-HT2A antagonist blocking studies',
              'Animation: Signal transduction cascade',
              'Primary source: Glennon structure-activity studies'
            ]
          },
          {
            lessonId: 3,
            title: 'Structure-Activity Relationships',
            type: 'video + interactive',
            duration: '55 min',
            content: 'How molecular structure determines psychoactive effects. Analysis of tryptamines, phenethylamines, and ergolines. Substituent effects on potency, duration, and subjective quality.',
            resources: [
              'Reading: Shulgin - PiHKAL and TiHKAL (selected chapters)',
              'Interactive: Molecular editor exploring SAR',
              'Chart: Potency vs. structure across compound series',
              'Research: Computational docking studies'
            ]
          },
          {
            lessonId: 4,
            title: 'Biased Agonism and Functional Selectivity',
            type: 'video',
            duration: '50 min',
            content: 'Advanced concept of biased signaling at 5-HT2A receptors. How different psychedelics activate distinct signaling pathways with therapeutic implications.',
            resources: [
              'Reading: Gonzalez-Maeso - Biased Agonism in Psychedelics',
              'Diagram: β-arrestin vs. G-protein signaling',
              'Research: Functional selectivity and behavioral outcomes',
              'Review: Implications for drug development'
            ]
          },
          {
            lessonId: 5,
            title: 'MDMA: Multi-Target Pharmacology',
            type: 'video',
            duration: '50 min',
            content: 'Complex pharmacology of MDMA as a releasing agent. Effects on serotonin, norepinephrine, dopamine transporters. Oxytocin and prolactin release. Comparison with classical psychedelics.',
            resources: [
              'Reading: Liechti - Effects of MDMA on the Brain',
              'Animation: Transporter reversal mechanism',
              'Chart: Time course of monoamine release',
              'Research: Social cognition and oxytocin'
            ]
          },
          {
            lessonId: 6,
            title: 'Ketamine and Glutamate Systems',
            type: 'video',
            duration: '55 min',
            content: 'NMDA receptor antagonism mechanisms. Glutamate surge hypothesis. mTOR pathway activation. Rapid synaptic effects and antidepressant mechanisms.',
            resources: [
              'Reading: Duman - Ketamine and Synaptic Plasticity',
              'Diagram: NMDA receptor structure and blockade',
              'Research: Time course of BDNF and synaptogenesis',
              'Review: Comparing ketamine to classical psychedelics'
            ]
          },
          {
            lessonId: 7,
            title: 'Trace Amine-Associated Receptor 1 (TAAR1)',
            type: 'video',
            duration: '45 min',
            content: 'Emerging role of TAAR1 in psychedelic effects, particularly for DMT and other tryptamines. Implications for understanding mechanism diversity.',
            resources: [
              'Reading: Bunzow et al. - TAAR1 and Psychoactive Compounds',
              'Research: DMT at TAAR1 receptors',
              'Hypothesis: Multiple receptor mechanisms in psychedelic experience',
              'Future directions: TAAR1 as therapeutic target'
            ]
          },
          {
            lessonId: 8,
            title: 'Module 1 Assessment: Molecular Mechanisms',
            type: 'quiz',
            duration: '45 min',
            content: 'Comprehensive assessment of receptor pharmacology, signaling mechanisms, and structure-activity relationships.',
            questions: 30
          }
        ]
      },
      {
        moduleId: 2,
        title: 'Module 2: Neuroimaging and Brain Network Dynamics',
        description: 'Advanced analysis of brain imaging studies revealing network-level effects',
        duration: '2.5 weeks',
        learningObjectives: [
          'Interpret neuroimaging findings from fMRI, PET, and EEG studies',
          'Explain default mode network disruption and global connectivity changes',
          'Analyze the entropic brain hypothesis and REBUS model',
          'Evaluate methodological considerations in psychedelic neuroimaging'
        ],
        lessons: [
          {
            lessonId: 9,
            title: 'Neuroimaging Methods in Psychedelic Research',
            type: 'video',
            duration: '60 min',
            content: 'Overview of neuroimaging techniques: fMRI, PET, EEG, MEG. Methodological challenges of imaging during psychedelic states. Study design considerations.',
            resources: [
              'Reading: Carhart-Harris - Neuroimaging Methods Review',
              'Video: How fMRI works and interpretation',
              'Protocol: Imperial College psilocybin imaging study',
              'Discussion: Methodological limitations and innovations'
            ]
          },
          {
            lessonId: 10,
            title: 'Default Mode Network: Discovery and Function',
            type: 'video',
            duration: '55 min',
            content: 'The default mode network (DMN) in normal brain function: self-referential thought, autobiographical memory, theory of mind. Hubs: posterior cingulate cortex, medial prefrontal cortex.',
            resources: [
              'Reading: Raichle - The Default Mode Network',
              'Interactive: DMN visualization and connectivity maps',
              'Research: DMN in psychiatric disorders',
              'Animation: Task-positive vs. default networks'
            ]
          },
          {
            lessonId: 11,
            title: 'DMN Disruption Under Psychedelics',
            type: 'video',
            duration: '65 min',
            content: 'Landmark findings: reduced DMN connectivity under psilocybin, LSD, ayahuasca. Correlation with ego dissolution and mystical experiences. Implications for self-model.',
            resources: [
              'Reading: Carhart-Harris et al. - Neural Correlates of the Psychedelic State (PNAS)',
              'Data visualization: Connectivity matrix changes',
              'Research: Ego dissolution and DMN activity',
              'Commentary: Mechanistic implications for therapy'
            ]
          },
          {
            lessonId: 12,
            title: 'Global Connectivity and Brain Entropy',
            type: 'video',
            duration: '60 min',
            content: 'Increased global connectivity and information integration. The entropic brain hypothesis: psychedelics increase neural entropy, enabling cognitive flexibility.',
            resources: [
              'Reading: Carhart-Harris - The Entropic Brain Hypothesis',
              'Visualization: Entropy measures across brain states',
              'Research: Repertoire of brain states under psychedelics',
              'Theory paper: Entropy and therapeutic effects'
            ]
          },
          {
            lessonId: 13,
            title: 'The REBUS Model: Relaxed Beliefs Under Psychedelics',
            type: 'video',
            duration: '55 min',
            content: 'Comprehensive explanation of the REBUS (RElaxed Beliefs Under pSychedelics) model. Predictive processing framework, precision weighting, and belief updating.',
            resources: [
              'Reading: Carhart-Harris & Friston - REBUS and the Anarchic Brain',
              'Diagram: Hierarchical predictive processing',
              'Animation: Precision weighting under psychedelics',
              'Discussion: Clinical implications of belief relaxation'
            ]
          },
          {
            lessonId: 14,
            title: 'Network Flexibility and Functional Reorganization',
            type: 'video',
            duration: '50 min',
            content: 'Dynamic reconfiguration of brain networks. Increased between-network communication. Functional reorganization and cognitive flexibility.',
            resources: [
              'Reading: Petri et al. - Homological Scaffolds of Brain Function',
              'Research: Network topology changes under psychedelics',
              'Visualization: Dynamic network switching',
              'Analysis: Relationship to therapeutic outcomes'
            ]
          },
          {
            lessonId: 15,
            title: 'PET and Receptor Occupancy Studies',
            type: 'video',
            duration: '50 min',
            content: 'PET imaging with radioligands. Measuring 5-HT2A receptor occupancy. Pharmacokinetic-pharmacodynamic relationships. Dose-response curves.',
            resources: [
              'Reading: Madsen et al. - PET Studies of Psilocybin',
              'Data: Receptor occupancy time courses',
              'Research: Correlating occupancy with subjective effects',
              'Protocol: PET study design and analysis'
            ]
          },
          {
            lessonId: 16,
            title: 'Module 2 Assessment: Neuroimaging Analysis',
            type: 'quiz + assignment',
            duration: '60 min',
            content: 'Assessment of neuroimaging concepts and data interpretation. Assignment: Analyze and interpret actual fMRI connectivity data from a psychedelic study.',
            questions: 25,
            assignment: 'Neuroimaging data interpretation report'
          }
        ]
      },
      {
        moduleId: 3,
        title: 'Module 3: Neuroplasticity and Therapeutic Mechanisms',
        description: 'Mechanisms of neural plasticity and long-term therapeutic effects',
        duration: '2.5 weeks',
        learningObjectives: [
          'Explain molecular mechanisms of psychedelic-induced neuroplasticity',
          'Describe structural and functional plasticity changes',
          'Analyze critical periods and windows of plasticity',
          'Evaluate translation from plasticity to therapeutic outcomes'
        ],
        lessons: [
          {
            lessonId: 17,
            title: 'Psychoplastogens: Definition and Discovery',
            type: 'video',
            duration: '60 min',
            content: 'Introduction to psychoplastogens—compounds that promote rapid neural plasticity. Discovery by Olson lab. Potential for therapeutic effect without hallucinations.',
            resources: [
              'Reading: Ly et al. - Psychedelics Promote Structural and Functional Neural Plasticity',
              'Video: Dr. David Olson lab tour and research overview',
              'Diagram: Psychoplastogen structure-activity',
              'Future directions: Non-hallucinogenic derivatives'
            ]
          },
          {
            lessonId: 18,
            title: 'Dendritic Spine Formation and Synaptogenesis',
            type: 'video',
            duration: '55 min',
            content: 'Rapid increase in dendritic arbor complexity and spine density. Time course of structural plasticity. Imaging studies in cell culture and animal models.',
            resources: [
              'Reading: Ly - Single dose of LSD influences gene expression',
              'Microscopy: Time-lapse dendritic growth',
              'Research: Spine density measurements post-psychedelic',
              'Mechanism: Cytoskeletal remodeling pathways'
            ]
          },
          {
            lessonId: 19,
            title: 'mTOR and BDNF Signaling Pathways',
            type: 'video',
            duration: '60 min',
            content: 'Mechanistic target of rapamycin (mTOR) and brain-derived neurotrophic factor (BDNF) as key mediators. Signaling cascades leading to protein synthesis and synaptic strengthening.',
            resources: [
              'Reading: mTOR signaling in antidepressant effects',
              'Pathway diagram: From receptor to synapse formation',
              'Research: BDNF levels after psychedelic administration',
              'Comparison: Psychedelics vs. ketamine plasticity mechanisms'
            ]
          },
          {
            lessonId: 20,
            title: 'Critical Periods and Windows of Plasticity',
            type: 'video',
            duration: '50 min',
            content: 'Psychedelics may reopen critical periods for learning and rewiring. Implications for treating conditions with developmental origins. Duration of enhanced plasticity window.',
            resources: [
              'Reading: Critical period reopening in neuroscience',
              'Research: Psychedelics and ocular dominance plasticity',
              'Theory: Windows for therapeutic intervention',
              'Clinical implications: Timing of integration work'
            ]
          },
          {
            lessonId: 21,
            title: 'Fear Extinction and Memory Reconsolidation',
            type: 'video',
            duration: '55 min',
            content: 'Enhanced fear extinction learning. Memory reconsolidation mechanisms. Relevance to PTSD and anxiety treatment. MDMA-specific mechanisms.',
            resources: [
              'Reading: Cahill & McGaugh - Memory reconsolidation',
              'Research: MDMA enhancement of fear extinction',
              'Animal models: Conditioned fear paradigms',
              'Translation: From bench to bedside in PTSD treatment'
            ]
          },
          {
            lessonId: 22,
            title: 'Anti-inflammatory and Neuroprotective Effects',
            type: 'video',
            duration: '50 min',
            content: 'Emerging evidence for anti-inflammatory actions. Sigma-1 receptor activation. Neuroprotection in models of neurodegeneration and stress.',
            resources: [
              'Reading: Flanagan & Nichols - Psychedelics as Anti-inflammatory Agents',
              'Research: Inflammation markers after psychedelic use',
              'Mechanism: Sigma-1 receptor and cellular stress',
              'Future: Implications for neurodegenerative diseases'
            ]
          },
          {
            lessonId: 23,
            title: 'Epigenetic Modifications',
            type: 'video',
            duration: '50 min',
            content: 'Gene expression changes after psychedelic exposure. DNA methylation, histone modifications. Long-term molecular changes underlying sustained effects.',
            resources: [
              'Reading: Erritzoe et al. - Effects on gene expression',
              'Data: RNA-seq analysis from human studies',
              'Research: Epigenetic marks and behavioral change',
              'Theory: Molecular memory of psychedelic experience'
            ]
          },
          {
            lessonId: 24,
            title: 'Module 3 Assessment: Plasticity Mechanisms',
            type: 'quiz',
            duration: '45 min',
            content: 'Comprehensive assessment of neuroplasticity mechanisms, signaling pathways, and therapeutic implications.',
            questions: 28
          }
        ]
      },
      {
        moduleId: 4,
        title: 'Module 4: Consciousness, Cognition, and Future Directions',
        description: 'Advanced topics in consciousness science and emerging research frontiers',
        duration: '2.5 weeks',
        learningObjectives: [
          'Analyze theories of consciousness through the lens of psychedelic states',
          'Evaluate cognitive and perceptual changes under psychedelics',
          'Assess emerging research directions and technologies',
          'Synthesize mechanistic knowledge for future research and applications'
        ],
        lessons: [
          {
            lessonId: 25,
            title: 'Theories of Consciousness: Integrated Information Theory',
            type: 'video',
            duration: '60 min',
            content: 'Integrated Information Theory (IIT) and psychedelic states. Measuring phi (integrated information). Paradox of increased connectivity but altered consciousness.',
            resources: [
              'Reading: Tononi - Integrated Information Theory',
              'Research: IIT measures under psychedelics',
              'Discussion: Complexity, integration, and subjective experience',
              'Commentary: Challenges to IIT from psychedelic data'
            ]
          },
          {
            lessonId: 26,
            title: 'Global Neuronal Workspace Theory',
            type: 'video',
            duration: '55 min',
            content: 'Global Workspace Theory and psychedelic effects. Broadcasting of information. Relationship between connectivity and conscious access.',
            resources: [
              'Reading: Dehaene - Global Workspace Theory',
              'Analysis: Workspace dynamics under psychedelics',
              'Research: EEG signatures of global broadcasting',
              'Integration: Combining theories for comprehensive model'
            ]
          },
          {
            lessonId: 27,
            title: 'Ego Dissolution and Self-Representation',
            type: 'video',
            duration: '60 min',
            content: 'Neural basis of self and ego. Dissolution of self-boundaries. Relationship to DMN activity. Therapeutic implications of ego dissolution.',
            resources: [
              'Reading: Millière - The Varieties of Selflessness',
              'Research: Ego Dissolution Inventory validation',
              'Neuroscience: Self-processing networks',
              'Philosophy: Implications for understanding consciousness'
            ]
          },
          {
            lessonId: 28,
            title: 'Visual Perception and Hallucinations',
            type: 'video',
            duration: '50 min',
            content: 'Mechanisms of visual alterations: geometric patterns, enhanced colors, object transformations. V1 cortex excitability. Form constants and neural geometry.',
            resources: [
              'Reading: Bressloff et al. - Geometric Visual Hallucinations',
              'Research: Primary visual cortex under psychedelics',
              'Interactive: Form constant patterns',
              'Theory: From cortical activity to subjective geometry'
            ]
          },
          {
            lessonId: 29,
            title: 'Temporal Perception and Time Dilation',
            type: 'video',
            duration: '45 min',
            content: 'Altered time perception. Subjective time expansion. Neural mechanisms of temporal processing and distortion.',
            resources: [
              'Reading: Wackermann et al. - Altered States and Time Perception',
              'Research: Time estimation tasks under psychedelics',
              'Neuroscience: Neural clocks and psychedelics',
              'Experience reports: Phenomenology of timelessness'
            ]
          },
          {
            lessonId: 30,
            title: 'Creativity and Cognitive Flexibility',
            type: 'video',
            duration: '55 min',
            content: 'Enhanced creativity and divergent thinking. Reduced cognitive rigidity. Applications for problem-solving and innovation. Post-acute effects on creativity.',
            resources: [
              'Reading: Kuypers et al. - Creativity and Psychedelics',
              'Research: Divergent thinking tests pre/post psychedelic',
              'Case studies: Problem-solving breakthroughs',
              'Theory: Entropy, flexibility, and creative cognition'
            ]
          },
          {
            lessonId: 31,
            title: 'Emerging Technologies and Future Research',
            type: 'video + discussion',
            duration: '60 min',
            content: 'Cutting-edge methods: optogenetics, chemogenetics, advanced imaging. AI and machine learning in psychedelic research. Future directions and unanswered questions.',
            resources: [
              'Reading: Future of Psychedelic Neuroscience (Review)',
              'Technology overview: Novel research tools',
              'Discussion: Priority questions for the field',
              'Grant opportunities: Funding landscape'
            ]
          },
          {
            lessonId: 32,
            title: 'Final Comprehensive Assessment',
            type: 'quiz + assignment',
            duration: '90 min',
            content: 'Capstone assessment covering all course material. Research proposal assignment: Design a novel neuroscience study addressing an open question in psychedelic research.',
            questions: 40,
            assignment: 'Research proposal with mechanistic hypotheses'
          }
        ]
      }
    ],
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-10-28'),
    status: 'published'
  },

  // Course 4: Harm Reduction & Safety Protocols
  {
    id: 4,
    title: 'Harm Reduction & Safety Protocols in Psychedelic Work',
    slug: 'harm-reduction-safety',
    shortDescription: 'Essential safety training covering comprehensive harm reduction strategies, medical screening, crisis management, and ethical safeguarding in psychedelic therapy and research.',
    fullDescription: `This critical 6-week foundational course provides comprehensive training in safety protocols and harm reduction principles essential for anyone working with psychedelics in clinical, research, or community settings. Safety is paramount in psychedelic work, and this course equips participants with the knowledge and skills to minimize risks and respond effectively to challenging situations.

The curriculum covers medical screening and contraindications, set and setting optimization, dosing protocols, managing difficult experiences, emergency interventions, and ethical safeguarding. Students will learn evidence-based harm reduction strategies drawn from clinical trials, community practice, and public health approaches.

Special emphasis is placed on recognizing and preventing adverse outcomes, supporting vulnerable populations, maintaining professional boundaries, and navigating ethical dilemmas. Through case studies, simulation exercises, and expert interviews, participants will develop practical competencies in creating safe containers for psychedelic experiences.

This course is essential preparation for anyone pursuing clinical work, research participation, or informed community practice in psychedelic contexts. Upon completion, graduates will have comprehensive safety knowledge and decision-making frameworks to protect participant wellbeing.`,
    instructor: {
      id: 6,
      name: 'Dr. Julie Holland',
      avatar_url: 'https://i.pravatar.cc/150?img=9',
      credentials: 'MD, Psychiatry, Medical Director',
      bio: 'Dr. Holland is a board-certified psychiatrist with decades of experience in psychopharmacology and emergency psychiatry. She served as medical director at Bellevue Hospital and has extensive expertise in managing acute psychedelic crises and promoting safe use.',
      verified: true
    },
    category: 'safety-ethics',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
    duration: '6 weeks',
    totalHours: 48,
    lessonsCount: 22,
    quizzesCount: 6,
    assignmentsCount: 4,
    studentsEnrolled: 198,
    rating: 4.7,
    ratingCount: 89,
    price: 199,
    ceCredits: 12,
    ceCategories: ['APA', 'CME', 'CNE', 'Social Work', 'Public Health'],
    featured: false,
    prerequisites: [
      'Basic understanding of psychedelics (recommended)',
      'Interest in safety and harm reduction (required)',
      'No prior clinical experience required'
    ],
    learningOutcomes: [
      'Conduct comprehensive medical and psychological screening',
      'Identify absolute and relative contraindications',
      'Optimize set and setting for safety and therapeutic benefit',
      'Recognize and manage challenging psychedelic experiences',
      'Implement emergency protocols for adverse reactions',
      'Apply harm reduction principles across diverse contexts',
      'Maintain ethical boundaries and prevent harm',
      'Support integration and minimize post-experience risks'
    ],
    syllabus: [
      {
        moduleId: 1,
        title: 'Module 1: Foundations of Harm Reduction and Risk Assessment',
        description: 'Core principles of harm reduction and systematic risk evaluation',
        duration: '2 weeks',
        learningObjectives: [
          'Understand harm reduction philosophy and evidence base',
          'Conduct thorough medical and psychiatric screening',
          'Identify contraindications across physical and mental health domains',
          'Assess individual risk profiles and protective factors'
        ],
        lessons: [
          {
            lessonId: 1,
            title: 'Harm Reduction Philosophy and History',
            type: 'video',
            duration: '50 min',
            content: 'Foundations of harm reduction: meeting people where they are, reducing risks without requiring abstinence. History from needle exchange to psychedelic contexts. Evidence base for harm reduction approaches.',
            resources: [
              'Reading: Marlatt - Harm Reduction: Pragmatic Strategies',
              'History: Evolution of harm reduction movements',
              'Research: Effectiveness of harm reduction interventions',
              'Case examples: Application to psychedelic use'
            ]
          },
          {
            lessonId: 2,
            title: 'Medical Screening: Cardiovascular Considerations',
            type: 'video',
            duration: '55 min',
            content: 'Cardiovascular effects of psychedelics: blood pressure, heart rate changes. Screening for cardiovascular disease, hypertension, arrhythmias. Risk stratification and medical clearance.',
            resources: [
              'Reading: Cardiovascular Safety of Psychedelics (Review)',
              'Protocol: Pre-participation cardiac screening',
              'Research: Adverse cardiovascular events in trials',
              'Guidelines: When to require cardiology consult'
            ]
          },
          {
            lessonId: 3,
            title: 'Medical Contraindications: Comprehensive Review',
            type: 'video',
            duration: '60 min',
            content: 'Absolute and relative contraindications: seizure disorders, pregnancy, liver/kidney disease. Age considerations. Special populations requiring additional precautions.',
            resources: [
              'Reading: Medical Contraindications Checklist',
              'Chart: Risk stratification by condition',
              'Case studies: Navigating complex medical histories',
              'Resources: When to consult specialists'
            ]
          },
          {
            lessonId: 4,
            title: 'Psychiatric Screening and Contraindications',
            type: 'video',
            duration: '65 min',
            content: 'Psychosis risk: personal and family history of schizophrenia, bipolar disorder. Screening tools and structured interviews. Differentiating exclusion criteria from manageable risks.',
            resources: [
              'Reading: Psychiatric Screening Best Practices',
              'Tools: SCID, MINI diagnostic interviews',
              'Research: Psychosis induction risk data',
              'Protocol: Family history assessment'
            ]
          },
          {
            lessonId: 5,
            title: 'Medication Interactions and Contraindications',
            type: 'video',
            duration: '55 min',
            content: 'Dangerous drug interactions: SSRIs, MAOIs, lithium, immunosuppressants. Pharmacokinetic and pharmacodynamic interactions. Washout periods and switching strategies.',
            resources: [
              'Reading: Drug Interaction Mechanisms',
              'Database: Interactive contraindication checker',
              'Research: Serotonin syndrome risk',
              'Guidelines: Medication discontinuation protocols'
            ]
          },
          {
            lessonId: 6,
            title: 'Substance Use History and Polysubstance Considerations',
            type: 'video',
            duration: '45 min',
            content: 'Assessing substance use patterns. Risks of polysubstance use. Alcohol and stimulant interactions. Supporting people with addiction histories.',
            resources: [
              'Assessment: Substance use screening tools',
              'Research: Polysubstance risks and harm reduction',
              'Guidance: Working with active substance use',
              'Resources: Referral pathways for addiction treatment'
            ]
          },
          {
            lessonId: 7,
            title: 'Risk-Benefit Assessment Frameworks',
            type: 'text + interactive',
            duration: '50 min',
            content: 'Systematic approaches to weighing risks and benefits. Shared decision-making with participants. Documenting informed consent. When to exclude vs. accommodate with precautions.',
            resources: [
              'Framework: Risk-benefit decision matrix',
              'Template: Informed consent documentation',
              'Case examples: Complex risk-benefit scenarios',
              'Discussion: Ethical considerations in gatekeeping'
            ]
          },
          {
            lessonId: 8,
            title: 'Module 1 Assessment: Screening and Contraindications',
            type: 'quiz',
            duration: '40 min',
            content: 'Assessment covering harm reduction principles, medical and psychiatric screening, and risk assessment frameworks.',
            questions: 25
          }
        ]
      },
      {
        moduleId: 2,
        title: 'Module 2: Clinical Safety Protocols and Emergency Management',
        description: 'Operational safety procedures and crisis intervention skills',
        duration: '2 weeks',
        learningObjectives: [
          'Implement evidence-based dosing and administration protocols',
          'Monitor vital signs and recognize concerning changes',
          'Manage challenging psychological experiences',
          'Execute emergency protocols for medical and psychiatric crises'
        ],
        lessons: [
          {
            lessonId: 9,
            title: 'Dosing Protocols and Administration Safety',
            type: 'video',
            duration: '60 min',
            content: 'Evidence-based dosing guidelines for psilocybin, MDMA, LSD, ketamine. Weight-based vs. fixed dosing. Administration routes and timing. Documentation and chain of custody.',
            resources: [
              'Protocols: Clinical trial dosing procedures',
              'Chart: Dose-response relationships',
              'Safety: Medication preparation and verification',
              'Documentation: Dosing logs and accountability'
            ]
          },
          {
            lessonId: 10,
            title: 'Vital Sign Monitoring and Medical Oversight',
            type: 'video',
            duration: '50 min',
            content: 'When and how to monitor vital signs. Normal vs. concerning changes in blood pressure, heart rate, temperature. Documentation and escalation criteria.',
            resources: [
              'Protocol: Vital sign monitoring schedule',
              'Guidelines: Normal ranges and red flags',
              'Equipment: Proper use of monitoring devices',
              'Case studies: Recognizing medical deterioration'
            ]
          },
          {
            lessonId: 11,
            title: 'Managing Challenging Experiences',
            type: 'video',
            duration: '65 min',
            content: 'Difficult psychological content: anxiety, panic, paranoia, overwhelming emotion. Non-pharmacological interventions: grounding, reassurance, supportive presence. When to use pharmacological rescue.',
            resources: [
              'Reading: Grof - Navigating Difficult Sessions',
              'Techniques: Grounding and calming interventions',
              'Video demonstrations: Therapeutic responses',
              'Protocol: Decision tree for difficult experiences'
            ]
          },
          {
            lessonId: 12,
            title: 'Pharmacological Rescue: When and How',
            type: 'video',
            duration: '50 min',
            content: 'Benzodiazepines and antipsychotics for crisis management. Indications and contraindications. Dosing and administration. Balancing safety with therapeutic process.',
            resources: [
              'Guidelines: Rescue medication protocols',
              'Research: Effects of trip termination on outcomes',
              'Pharmacology: Mechanism of benzodiazepine rescue',
              'Ethics: When intervention is necessary vs. premature'
            ]
          },
          {
            lessonId: 13,
            title: 'Psychiatric Emergencies: Psychosis and Mania',
            type: 'video',
            duration: '55 min',
            content: 'Recognizing acute psychotic or manic symptoms. Distinguishing transient psychotic features from emergent psychiatric crisis. Assessment and intervention protocols.',
            resources: [
              'Clinical criteria: Psychotic vs. psychedelic experience',
              'Protocol: Emergency psychiatric evaluation',
              'Research: Incidence of persistent psychosis',
              'Resources: When to transfer to emergency care'
            ]
          },
          {
            lessonId: 14,
            title: 'Medical Emergencies: Recognition and Response',
            type: 'video',
            duration: '50 min',
            content: 'Rare but serious medical emergencies: seizures, severe hypertension, serotonin syndrome, cardiac events. Recognition, initial management, emergency services activation.',
            resources: [
              'Protocol: Medical emergency algorithms',
              'Training: Basic life support review',
              'Serotonin syndrome: Recognition and treatment',
              'Simulation: Emergency scenario practice'
            ]
          },
          {
            lessonId: 15,
            title: 'Module 2 Assessment and Simulation',
            type: 'quiz + practical',
            duration: '60 min',
            content: 'Knowledge assessment on protocols and emergency management. Practical simulation: Respond to challenging scenarios with appropriate interventions.',
            questions: 20,
            assignment: 'Written analysis of simulation performance'
          }
        ]
      },
      {
        moduleId: 3,
        title: 'Module 3: Set, Setting, and Integration Safety',
        description: 'Environmental safety, psychological preparation, and post-experience support',
        duration: '2 weeks',
        learningObjectives: [
          'Design safe and therapeutic physical environments',
          'Facilitate effective psychological preparation',
          'Recognize and prevent boundary violations',
          'Support safe integration and minimize post-acute risks'
        ],
        lessons: [
          {
            lessonId: 16,
            title: 'Physical Setting: Creating Safe Containers',
            type: 'video',
            duration: '55 min',
            content: 'Environmental design for safety and comfort. Private vs. group settings. Safety considerations: fall prevention, bathroom access, temperature control. Aesthetic and therapeutic elements.',
            resources: [
              'Reading: Set and Setting in Psychedelic Therapy',
              'Photo tour: Clinical session rooms',
              'Checklist: Physical safety setup',
              'Design principles: Balancing safety and aesthetics'
            ]
          },
          {
            lessonId: 17,
            title: 'Psychological Set: Preparation Protocols',
            type: 'video',
            duration: '60 min',
            content: 'Effective preparation practices. Setting intentions, building trust, education on what to expect. Managing expectations and reducing anticipatory anxiety.',
            resources: [
              'Protocol: Preparation session structure',
              'Research: Preparation quality and outcomes',
              'Tools: Intention-setting exercises',
              'Case examples: Preparation strategies'
            ]
          },
          {
            lessonId: 18,
            title: 'Ethical Boundaries and Preventing Harm',
            type: 'video',
            duration: '65 min',
            content: 'Critical importance of boundaries in vulnerable states. Sexual misconduct prevention. Power dynamics and exploitation. Dual relationships. Touch policies and consent.',
            resources: [
              'Reading: Cover - Psychedelic Therapist Sexual Misconduct',
              'Guidelines: Professional boundaries in altered states',
              'Case studies: Boundary violations and consequences',
              'Policy: Touch consent and documentation'
            ]
          },
          {
            lessonId: 19,
            title: 'Supporting Vulnerable Populations',
            type: 'video',
            duration: '55 min',
            content: 'Additional considerations for BIPOC, LGBTQ+, trauma survivors, and other marginalized groups. Cultural humility, identity safety, trauma-informed care.',
            resources: [
              'Reading: Cultural Safety in Psychedelic Therapy',
              'Research: Addressing disparities and access',
              'Guidelines: Trauma-informed approaches',
              'Resources: Community-specific support'
            ]
          },
          {
            lessonId: 20,
            title: 'Integration Support and Post-Acute Safety',
            type: 'video',
            duration: '60 min',
            content: 'Integration best practices. Common post-experience challenges. Recognizing concerning symptoms requiring intervention. Long-term follow-up and support.',
            resources: [
              'Reading: Integration in Psychedelic Therapy',
              'Protocol: Integration session structure',
              'Red flags: When to escalate care',
              'Resources: Integration circles and peer support'
            ]
          },
          {
            lessonId: 21,
            title: 'Hallucinogen Persisting Perception Disorder (HPPD)',
            type: 'video',
            duration: '45 min',
            content: 'Understanding HPPD: prevalence, symptoms, risk factors. Differentiating concerning from benign perceptual changes. Management and treatment approaches.',
            resources: [
              'Reading: HPPD Clinical Review',
              'Research: Incidence and natural history',
              'Assessment: HPPD screening questions',
              'Treatment: Evidence-based management strategies'
            ]
          },
          {
            lessonId: 22,
            title: 'Final Comprehensive Assessment',
            type: 'quiz + assignment',
            duration: '70 min',
            content: 'Capstone assessment covering all safety domains. Assignment: Develop a comprehensive safety protocol for a specific psychedelic therapy context.',
            questions: 30,
            assignment: 'Safety protocol development project'
          }
        ]
      }
    ],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-10-28'),
    status: 'published'
  }

  // Additional courses can be added following the same comprehensive structure
];

export default COMPREHENSIVE_COURSES;
