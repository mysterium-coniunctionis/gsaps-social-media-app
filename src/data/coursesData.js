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
            content: 'Trauma effects on brain structure and function: amygdala hyperactivity, hippocampal atrophy, prefrontal cortex dysfunction, altered fear conditioning. This lesson explores how traumatic experiences create lasting neurobiological changes that manifest as PTSD symptoms. Understanding these mechanisms is essential for comprehending how MDMA therapy facilitates healing by normalizing fear responses and enabling memory reconsolidation.',
            resources: [
              'Reading: van der Kolk - The Body Keeps the Score (Ch. 3-4)',
              'Neuroimaging: PTSD brain scan comparisons',
              'Video lecture: Fear conditioning and extinction'
            ]
          },
          {
            lessonId: 3,
            title: 'MDMA Mechanisms in Trauma Processing',
            type: 'video',
            duration: '60 min',
            content: 'Deep exploration of how MDMA facilitates trauma processing through reduced fear response, enhanced emotional engagement, and strengthened therapeutic alliance. MDMA\'s unique pharmacological profile decreases amygdala reactivity while increasing prefrontal cortex activity, creating an optimal window for processing traumatic memories. The compound enhances oxytocin release, promoting trust and social connection essential for therapeutic work. This lesson examines the neurobiological underpinnings that make MDMA particularly effective for PTSD treatment.',
            resources: [
              'Reading: Mithoefer - Mechanisms of MDMA-Assisted Psychotherapy',
              'Research: Fear extinction enhancement with MDMA',
              'Diagram: MDMA effects on fear circuitry',
              'Video: Neural mechanisms of therapeutic action'
            ]
          },
          {
            lessonId: 4,
            title: 'MAPS Phase 3 Clinical Trial Results',
            type: 'video',
            duration: '50 min',
            content: 'Comprehensive review of the landmark MAPS Phase 3 clinical trials that demonstrated MDMA therapy\'s efficacy for severe PTSD. Analysis of study design, participant demographics, treatment protocol, and outcome measures. The trials showed 67% of participants no longer met PTSD criteria after three MDMA sessions, with effects maintained at long-term follow-up. Understanding this evidence base is crucial for clinical practice and helps contextualize MDMA therapy within evidence-based treatment approaches.',
            resources: [
              'Reading: Mitchell et al. - MDMA-Assisted Therapy for Severe PTSD (Nature Medicine)',
              'Data: Phase 3 trial results and effect sizes',
              'Protocol: MAPS treatment manual overview',
              'Video: Principal investigators discuss findings'
            ]
          },
          {
            lessonId: 5,
            title: 'Somatic Approaches and Body-Centered Healing',
            type: 'video',
            duration: '55 min',
            content: 'Trauma is stored in the body as well as the mind. This lesson explores somatic experiencing, body-oriented therapy, and the role of physical sensations in trauma processing. MDMA therapy integrates somatic awareness, helping clients process traumatic material held in bodily memory. Learn techniques for facilitating body-centered healing, recognizing somatic releases, and supporting clients through physical manifestations of trauma processing during MDMA sessions.',
            resources: [
              'Reading: Levine - Waking the Tiger: Healing Trauma',
              'Video: Somatic experiencing techniques',
              'Protocol: Body scan and somatic tracking in MDMA therapy',
              'Research: Embodied trauma and therapeutic approaches'
            ]
          },
          {
            lessonId: 6,
            title: 'Polyvagal Theory and Window of Tolerance',
            type: 'video',
            duration: '50 min',
            content: 'Polyvagal theory provides a neurobiological framework for understanding trauma responses and healing. This lesson covers the autonomic nervous system\'s role in PTSD, the concept of "window of tolerance," and how MDMA helps expand this window. Learn to recognize autonomic states, track nervous system regulation, and help clients develop greater capacity for processing traumatic material without becoming overwhelmed or dissociated.',
            resources: [
              'Reading: Porges - The Polyvagal Theory',
              'Diagram: Autonomic ladder and trauma responses',
              'Video: Window of tolerance in trauma therapy',
              'Application: Using polyvagal theory in MDMA sessions'
            ]
          },
          {
            lessonId: 7,
            title: 'Memory Reconsolidation and Therapeutic Change',
            type: 'video',
            duration: '55 min',
            content: 'Memory reconsolidation theory explains how therapeutic change occurs at the level of emotional memory. When traumatic memories are retrieved in a safe, supportive context under MDMA, they become labile and can be updated with new emotional and cognitive information. This lesson explores the neuroscience of memory reconsolidation, optimal timing for therapeutic interventions, and how to maximize reconsolidation windows during MDMA sessions for lasting therapeutic benefit.',
            resources: [
              'Reading: Ecker - Unlocking the Emotional Brain',
              'Research: Memory reconsolidation mechanisms',
              'Timeline: Windows for therapeutic intervention',
              'Protocol: Facilitating memory updating in MDMA therapy'
            ]
          },
          {
            lessonId: 8,
            title: 'Safety Pharmacology and Medical Screening',
            type: 'video',
            duration: '60 min',
            content: 'Comprehensive safety profile of MDMA including cardiovascular effects, contraindications, and medical screening requirements. MDMA causes moderate increases in blood pressure and heart rate, requiring careful cardiovascular screening. This lesson covers absolute and relative contraindications, pre-treatment medical evaluation, medication interactions (especially SSRIs and MAOIs), and monitoring protocols during MDMA sessions to ensure participant safety.',
            resources: [
              'Reading: MAPS Medical Screening Protocol',
              'Checklist: Contraindications and risk factors',
              'Guidelines: Cardiovascular screening requirements',
              'Drug interactions: Comprehensive interaction database'
            ]
          },
          {
            lessonId: 9,
            title: 'Psychiatric Screening and Risk Assessment',
            type: 'video',
            duration: '55 min',
            content: 'Thorough psychiatric screening is essential for safe MDMA therapy. This lesson covers structured diagnostic interviews, assessment of psychosis risk (personal and family history), evaluation of dissociative symptoms, and screening for personality disorders that may complicate treatment. Learn to differentiate between manageable psychiatric complexity and true exclusion criteria, balancing accessibility with safety in participant selection.',
            resources: [
              'Tools: SCID-5 and MINI diagnostic interviews',
              'Protocol: Psychiatric screening procedures',
              'Research: Psychiatric adverse events in trials',
              'Case studies: Complex psychiatric presentations'
            ]
          },
          {
            lessonId: 10,
            title: 'Ethical Considerations in MDMA Therapy',
            type: 'video',
            duration: '50 min',
            content: 'MDMA therapy involves unique ethical considerations due to the vulnerability of altered states and the intimacy of trauma work. This lesson addresses informed consent, power dynamics, boundary maintenance, preventing exploitation, touch policies, and ethical decision-making frameworks. Special attention to historical harms in psychedelic therapy, including sexual misconduct, and concrete strategies for maintaining ethical practice and protecting participants.',
            resources: [
              'Reading: Cover - Psychedelic Ethics and Misconduct',
              'Guidelines: Professional boundaries in altered states',
              'Policy templates: Informed consent and touch consent',
              'Case discussions: Ethical dilemmas and solutions'
            ]
          },
          {
            lessonId: 11,
            title: 'Cultural Competence and Trauma-Informed Care',
            type: 'video',
            duration: '55 min',
            content: 'Trauma intersects with culture, identity, and systemic oppression. This lesson explores culturally responsive MDMA therapy, understanding historical trauma in marginalized communities, addressing power dynamics, and creating identity-safe therapeutic spaces. Learn about cultural humility, working with interpreters, adapting protocols for diverse populations, and recognizing how race, gender, sexuality, and other identities shape both trauma experiences and healing processes.',
            resources: [
              'Reading: Cultural Safety in Psychedelic Medicine',
              'Research: PTSD in diverse populations',
              'Guidelines: Culturally adapted therapy approaches',
              'Resources: Community-specific considerations'
            ]
          },
          {
            lessonId: 12,
            title: 'Module 1 Assessment: Foundations and Theory',
            type: 'quiz',
            duration: '45 min',
            content: 'Comprehensive assessment of MDMA pharmacology, trauma neurobiology, clinical evidence, safety considerations, and ethical foundations. This assessment ensures mastery of essential theoretical knowledge before advancing to clinical protocol training.',
            resources: [
              'Study guide: Key concepts from Module 1',
              'Practice questions: Self-assessment preparation',
              'References: Primary sources for review'
            ]
          }
        ]
      },
      {
        moduleId: 2,
        title: 'Module 2: MAPS Protocol and Treatment Structure',
        description: 'Detailed training in the three-phase MAPS MDMA therapy protocol',
        duration: '2.5 weeks',
        learningObjectives: [
          'Master the structure of MAPS MDMA therapy protocol',
          'Understand the rationale for each treatment component',
          'Learn the therapeutic stance and therapist role',
          'Develop competency in protocol implementation'
        ],
        lessons: [
          {
            lessonId: 13,
            title: 'Overview of MAPS Three-Phase Protocol',
            type: 'video',
            duration: '60 min',
            content: 'Comprehensive introduction to the MAPS protocol structure: preparatory sessions, MDMA-assisted sessions, and integration sessions. The protocol typically includes three preparatory sessions, three 8-hour MDMA sessions spaced one month apart, and integration sessions following each MDMA session. Understanding the rationale for each phase and how they work together to facilitate healing. This lesson provides the roadmap for the entire treatment process and explains the evidence-based reasoning behind protocol design.',
            resources: [
              'Reading: MAPS MDMA-Assisted Psychotherapy Treatment Manual',
              'Timeline: Typical treatment trajectory',
              'Video: Protocol overview from MAPS trainers',
              'Research: Protocol development and refinement'
            ]
          },
          {
            lessonId: 14,
            title: 'Therapeutic Stance: Non-Directive Support',
            type: 'video',
            duration: '55 min',
            content: 'MDMA therapy utilizes a non-directive, client-centered therapeutic stance that trusts the innate healing wisdom of the psyche. Therapists serve as compassionate witnesses and safety anchors rather than directing content or interpretation. This lesson explores the therapeutic stance, the balance between structure and spontaneity, when to intervene versus allow process to unfold, and how to maintain therapeutic presence without imposing agenda. Learning to "follow" rather than "lead" is a crucial skill for MDMA therapists.',
            resources: [
              'Reading: Rogers - Client-Centered Therapy foundations',
              'Video demonstrations: Therapeutic presence examples',
              'Protocol: Intervention decision framework',
              'Discussion: Balancing support and space'
            ]
          },
          {
            lessonId: 15,
            title: 'Co-Therapy Model and Team Dynamics',
            type: 'video',
            duration: '50 min',
            content: 'MAPS protocol employs a co-therapy team (typically male-female dyad) to provide balanced support, ensure safety, and model healthy relationship dynamics. This lesson covers co-therapy benefits, team communication, role division, managing countertransference as a team, and addressing conflicts or differences. Special attention to co-therapy dynamics during challenging moments and how teams can support each other while remaining attuned to the client.',
            resources: [
              'Reading: Co-therapy in Psychedelic-Assisted Treatment',
              'Protocol: Team preparation and debriefing structure',
              'Video: Co-therapy teams in action',
              'Exercises: Developing team communication'
            ]
          }
        ]
      },
      {
        moduleId: 3,
        title: 'Module 3: Preparation Phase',
        description: 'Building therapeutic alliance and preparing clients for MDMA sessions',
        duration: '2 weeks',
        learningObjectives: [
          'Establish strong therapeutic alliance and safety',
          'Conduct thorough trauma history and treatment planning',
          'Prepare clients psychologically for MDMA experiences',
          'Set appropriate intentions and expectations'
        ],
        lessons: [
          {
            lessonId: 16,
            title: 'Building Therapeutic Alliance and Trust',
            type: 'video',
            duration: '60 min',
            content: 'The foundation of effective MDMA therapy is a strong therapeutic relationship built on trust, safety, and attunement. Preparatory sessions focus on establishing rapport, understanding the client\'s trauma history, and creating a container of safety. This lesson covers alliance-building techniques, addressing fears and concerns, demonstrating reliability and consistency, and creating the relational foundation necessary for vulnerable trauma work. The quality of the therapeutic relationship predicts treatment outcomes.',
            resources: [
              'Reading: Therapeutic Alliance in Trauma Treatment',
              'Video: First preparation session demonstration',
              'Assessment: Working Alliance Inventory',
              'Techniques: Attunement and rapport-building strategies'
            ]
          },
          {
            lessonId: 17,
            title: 'Trauma History and Treatment Planning',
            type: 'video',
            duration: '55 min',
            content: 'Conducting a thorough trauma history while maintaining safety and avoiding retraumatization. Learn pacing techniques, recognizing dissociation, grounding interventions, and how to gather necessary information while respecting client readiness. This lesson covers treatment planning, identifying target traumas, assessing resources and resilience, and collaboratively setting treatment goals. Special attention to complex trauma, developmental trauma, and multiple trauma types.',
            resources: [
              'Protocol: Trauma history interview structure',
              'Tools: Timeline and mapping exercises',
              'Guidelines: Preventing retraumatization during assessment',
              'Case examples: Treatment planning for complex presentations'
            ]
          },
          {
            lessonId: 18,
            title: 'Preparation Session Structure and Content',
            type: 'video',
            duration: '50 min',
            content: 'Detailed walkthrough of preparation session content: education about MDMA effects, what to expect during sessions, introducing therapeutic techniques, discussing fears and hopes, practicing communication signals, and setting intentions. This lesson provides session-by-session structure for the preparatory phase, including specific topics, exercises, and preparation practices. Learn to balance education, emotional preparation, and practical logistics while maintaining focus on building safety and readiness.',
            resources: [
              'Protocol: Preparation session outlines (sessions 1-3)',
              'Handouts: Client education materials',
              'Video: Preparation session excerpts',
              'Exercises: Intention-setting and visualization practices'
            ]
          }
        ]
      },
      {
        moduleId: 4,
        title: 'Module 4: MDMA Sessions - Protocol and Practice',
        description: 'Conducting MDMA-assisted therapy sessions with skill and safety',
        duration: '3 weeks',
        learningObjectives: [
          'Execute MDMA session protocol with fidelity',
          'Provide skilled therapeutic support during altered states',
          'Navigate challenging experiences and intense emotions',
          'Maintain safety and therapeutic boundaries'
        ],
        lessons: [
          {
            lessonId: 19,
            title: 'MDMA Session Structure and Timeline',
            type: 'video',
            duration: '60 min',
            content: 'Comprehensive walkthrough of an 8-hour MDMA session from arrival to departure. Typical timeline: assessment and preparation (30 min), MDMA administration, onset period (30-45 min), peak effects (2-3 hours), plateau (2-3 hours), gradual return (2-3 hours), and departure preparation. This lesson details what happens in each phase, typical experiences, therapeutic tasks, and how to pace the session. Understanding session flow helps therapists provide appropriate support and anticipate client needs.',
            resources: [
              'Protocol: MDMA session timeline and structure',
              'Video: Complete session walkthrough (condensed)',
              'Checklist: Session preparation and setup',
              'Chart: Typical effect timeline and therapeutic windows'
            ]
          },
          {
            lessonId: 20,
            title: 'Facilitating Trauma Processing and Emotional Release',
            type: 'video',
            duration: '65 min',
            content: 'MDMA creates optimal conditions for processing traumatic memories with reduced fear and enhanced emotional access. This lesson covers techniques for supporting trauma processing: staying present with intense emotions, facilitating somatic releases, supporting abreactions, helping clients stay with difficult material, and recognizing when processing is complete. Learn to distinguish productive processing from overwhelm, support emotional expression while maintaining safety, and trust the healing process unfolding organically.',
            resources: [
              'Reading: Emotional Processing in MDMA Therapy',
              'Video demonstrations: Supporting trauma work',
              'Techniques: Somatic tracking and emotional facilitation',
              'Case examples: Various trauma processing patterns'
            ]
          },
          {
            lessonId: 21,
            title: 'Managing Challenging Experiences and Crisis Intervention',
            type: 'video',
            duration: '55 min',
            content: 'Not all MDMA sessions proceed smoothly. This lesson prepares therapists for challenging experiences including anxiety, panic, overwhelming emotions, dissociation, paranoia, or physical discomfort. Learn intervention hierarchy: reassuring presence, verbal support, grounding techniques, physical comfort measures, breathing exercises, and when to consider pharmacological rescue. Understand the difference between challenging-but-therapeutic experiences versus situations requiring intervention. Decision-making frameworks for crisis situations.',
            resources: [
              'Protocol: Managing difficult experiences',
              'Video: Responding to challenges - demonstrations',
              'Decision tree: Intervention escalation',
              'Rescue protocols: Benzodiazepine administration'
            ]
          }
        ]
      },
      {
        moduleId: 5,
        title: 'Module 5: Integration Sessions',
        description: 'Supporting meaning-making and consolidating therapeutic gains',
        duration: '2 weeks',
        learningObjectives: [
          'Facilitate effective integration of MDMA experiences',
          'Support meaning-making and insight consolidation',
          'Address post-session challenges and questions',
          'Connect session experiences to daily life and recovery'
        ],
        lessons: [
          {
            lessonId: 22,
            title: 'Integration Theory and Best Practices',
            type: 'video',
            duration: '60 min',
            content: 'Integration is the process of incorporating insights, healing, and changes from MDMA sessions into daily life. This lesson covers integration theory, why integration is crucial for lasting change, typical integration challenges, and evidence-based integration practices. Learn the distinction between processing (during sessions) and integrating (afterwards), timing of integration work, and how to support clients in applying new understandings to relationships, behaviors, and self-concept.',
            resources: [
              'Reading: Integration in Psychedelic Therapy',
              'Research: Integration and therapeutic outcomes',
              'Framework: Integration stages and tasks',
              'Resources: Integration workbooks and exercises'
            ]
          },
          {
            lessonId: 23,
            title: 'Integration Session Structure and Techniques',
            type: 'video',
            duration: '55 min',
            content: 'Detailed guidance for conducting integration sessions following MDMA experiences. Typical structure includes reviewing the session experience, exploring insights and realizations, addressing questions or concerns, connecting experiences to treatment goals, and planning actionable changes. Learn specific techniques: narrative reconstruction, identifying themes, cognitive restructuring, behavioral experiments, and supporting implementation of changes. Integration sessions bridge extraordinary experiences with ordinary life.',
            resources: [
              'Protocol: Integration session structure',
              'Video: Integration session examples',
              'Techniques: Meaning-making interventions',
              'Worksheets: Integration planning tools'
            ]
          }
        ]
      },
      {
        moduleId: 6,
        title: 'Module 6: Safety, Ethics, and Boundaries',
        description: 'Maintaining safety and ethical practice in MDMA therapy',
        duration: '1.5 weeks',
        learningObjectives: [
          'Implement comprehensive safety protocols',
          'Maintain ethical boundaries in vulnerable states',
          'Prevent and address boundary violations',
          'Navigate ethical dilemmas with integrity'
        ],
        lessons: [
          {
            lessonId: 24,
            title: 'Medical Safety and Monitoring Protocols',
            type: 'video',
            duration: '60 min',
            content: 'Comprehensive medical safety procedures for MDMA therapy. Pre-session medical screening, vital sign monitoring schedules, recognizing concerning physiological changes, emergency response protocols, and post-session medical follow-up. MDMA causes predictable cardiovascular effects requiring vigilant monitoring. This lesson covers when to assess vitals, what parameters indicate concern, documentation requirements, and when to escalate to medical intervention. Safety is paramount and requires systematic, disciplined protocols.',
            resources: [
              'Protocol: Medical monitoring procedures',
              'Guidelines: Vital sign parameters and red flags',
              'Emergency protocols: Medical response algorithms',
              'Documentation: Medical monitoring forms'
            ]
          },
          {
            lessonId: 25,
            title: 'Ethical Boundaries and Sexual Misconduct Prevention',
            type: 'video',
            duration: '65 min',
            content: 'The altered state induced by MDMA creates profound vulnerability and increased suggestibility, making strict boundary maintenance absolutely essential. This lesson addresses the history of sexual misconduct in psychedelic therapy, power dynamics in therapeutic relationships, touch policies and consent, recognizing boundary crossings before they become violations, and creating a culture of accountability. Concrete strategies for maintaining professional boundaries, managing attraction or countertransference, and protecting clients from exploitation.',
            resources: [
              'Reading: Cover - Sexual Boundary Violations in Psychedelic Therapy',
              'Policy: Touch consent and documentation protocols',
              'Ethics: Professional boundary standards',
              'Case studies: Boundary violations and prevention'
            ]
          }
        ]
      },
      {
        moduleId: 7,
        title: 'Module 7: Special Populations and Adaptations',
        description: 'Adapting MDMA therapy for diverse populations and presentations',
        duration: '1.5 weeks',
        learningObjectives: [
          'Adapt protocols for specific populations and trauma types',
          'Address cultural and identity-specific considerations',
          'Work effectively with complex presentations',
          'Recognize when additional supports are needed'
        ],
        lessons: [
          {
            lessonId: 26,
            title: 'Complex PTSD and Developmental Trauma',
            type: 'video',
            duration: '60 min',
            content: 'Complex PTSD from chronic, developmental trauma requires protocol adaptations. Clients with complex trauma may have difficulty with emotional regulation, relationship trust, and maintaining therapeutic alliance. This lesson covers recognizing complex PTSD, protocol modifications for greater stabilization and pacing, working with dissociation and fragmentation, addressing relational trauma in the therapeutic relationship, and determining when clients need additional preparation or contraindication for MDMA therapy.',
            resources: [
              'Reading: Complex PTSD - Clinical Features',
              'Assessment: Distinguishing PTSD from complex PTSD',
              'Protocol adaptations: Modified approach for complex trauma',
              'Case examples: Complex presentations in MDMA therapy'
            ]
          },
          {
            lessonId: 27,
            title: 'Cultural Adaptations and Working with Diverse Communities',
            type: 'video',
            duration: '55 min',
            content: 'MDMA therapy must be culturally responsive and adapted for diverse populations. This lesson explores working with BIPOC clients, LGBTQ+ individuals, veterans, refugees, and other communities with specific cultural contexts and trauma experiences. Topics include historical trauma, culturally-specific healing practices, language and communication considerations, family involvement, spirituality and meaning-making frameworks, and addressing systemic oppression as a trauma source. Cultural humility and responsiveness enhance therapeutic effectiveness and accessibility.',
            resources: [
              'Reading: Cultural Competence in Trauma Treatment',
              'Guidelines: Community-specific considerations',
              'Resources: Culturally-adapted protocols',
              'Discussion: Decolonizing psychedelic therapy'
            ]
          }
        ]
      },
      {
        moduleId: 8,
        title: 'Module 8: Clinical Skills and Therapeutic Techniques',
        description: 'Advanced therapeutic skills for MDMA-assisted therapy',
        duration: '2 weeks',
        learningObjectives: [
          'Develop advanced therapeutic presence and attunement',
          'Master specific intervention techniques',
          'Manage countertransference and self-care',
          'Integrate multiple therapeutic modalities'
        ],
        lessons: [
          {
            lessonId: 28,
            title: 'Therapeutic Presence and Attunement',
            type: 'video',
            duration: '60 min',
            content: 'Therapeutic presence - being fully present, attuned, and responsive - is the foundation of effective MDMA therapy. This lesson explores cultivating presence, tracking client experience through multiple channels (verbal, nonverbal, somatic, energetic), staying grounded while holding space for intense experiences, and developing the capacity to be with suffering without trying to fix or change it. Practical techniques for enhancing presence including mindfulness, somatic awareness, and supervision practices.',
            resources: [
              'Reading: Therapeutic Presence in Psychotherapy',
              'Practices: Presence cultivation exercises',
              'Video: Demonstrating attuned presence',
              'Self-assessment: Presence and attunement skills'
            ]
          },
          {
            lessonId: 29,
            title: 'Countertransference and Therapist Self-Care',
            type: 'video',
            duration: '55 min',
            content: 'Working with trauma is emotionally demanding and therapists must manage their own reactions and maintain wellbeing. This lesson addresses recognizing countertransference, using supervision effectively, processing vicarious trauma, maintaining boundaries between personal and client experiences, and comprehensive self-care strategies. MDMA therapy can activate therapists\' own trauma or attachment patterns, making self-awareness and self-care essential for ethical, effective practice.',
            resources: [
              'Reading: Countertransference in Trauma Work',
              'Assessment: Vicarious trauma screening',
              'Practices: Self-care and boundary maintenance',
              'Resources: Therapist support and supervision options'
            ]
          }
        ]
      },
      {
        moduleId: 9,
        title: 'Module 9: Supervision and Consultation',
        description: 'Engaging in effective supervision for ongoing development',
        duration: '1.5 weeks',
        learningObjectives: [
          'Utilize supervision for clinical development',
          'Present cases effectively',
          'Integrate feedback and continue learning',
          'Build a practice community and support network'
        ],
        lessons: [
          {
            lessonId: 30,
            title: 'Clinical Supervision Models and Best Practices',
            type: 'video',
            duration: '60 min',
            content: 'Clinical supervision is essential for safe, ethical, and effective MDMA therapy practice. This lesson covers supervision models (individual, group, peer), what makes effective supervision, how to prepare case presentations, asking for specific feedback, integrating supervision insights into practice, and finding qualified supervisors. Understanding that supervision is not remedial but rather an essential component of professional development and lifelong learning. Requirements for supervision in MDMA therapy certification pathways.',
            resources: [
              'Reading: Clinical Supervision in Psychedelic Therapy',
              'Guidelines: Supervision requirements and standards',
              'Templates: Case presentation structures',
              'Resources: Finding qualified supervisors'
            ]
          },
          {
            lessonId: 31,
            title: 'Building Practice Community and Peer Support',
            type: 'video',
            duration: '50 min',
            content: 'MDMA therapy is emerging and practitioners benefit from community, peer learning, and mutual support. This lesson explores building professional networks, participating in peer consultation groups, attending conferences and continuing education, engaging with research communities, and contributing to field development. Discussion of maintaining ethical standards in community spaces, balancing collaboration with healthy boundaries, and participating in the broader psychedelic therapy ecosystem.',
            resources: [
              'Resources: Professional organizations and networks',
              'Events: Conferences and training opportunities',
              'Platform: Peer consultation group guidelines',
              'Discussion: Community building and field development'
            ]
          }
        ]
      },
      {
        moduleId: 10,
        title: 'Module 10: Research Literacy and Evidence-Based Practice',
        description: 'Understanding research and contributing to the evidence base',
        duration: '1.5 weeks',
        learningObjectives: [
          'Critically evaluate psychedelic research',
          'Understand research methodologies and limitations',
          'Apply evidence to clinical decision-making',
          'Contribute to data collection and research efforts'
        ],
        lessons: [
          {
            lessonId: 32,
            title: 'Critical Evaluation of Psychedelic Research',
            type: 'video',
            duration: '60 min',
            content: 'Psychedelic research is rapidly expanding but must be critically evaluated. This lesson covers reading and interpreting clinical trials, understanding study design (randomized controlled trials, blinding challenges, expectancy effects), evaluating methodological quality, recognizing bias and limitations, and distinguishing strong evidence from preliminary findings. Learn to assess effect sizes, follow-up duration, generalizability, and applicability to clinical practice. Developing research literacy enables evidence-based practice.',
            resources: [
              'Reading: How to Read a Clinical Trial',
              'Analysis: MAPS Phase 3 trials - critical review',
              'Tools: Research quality assessment checklists',
              'Database: Accessing primary research literature'
            ]
          },
          {
            lessonId: 33,
            title: 'Contributing to Research and Practice Development',
            type: 'video',
            duration: '55 min',
            content: 'As an emerging field, MDMA therapy needs practitioner contributions to research and knowledge development. This lesson covers participating in clinical trials, conducting practice-based research, case reporting, outcome measurement, data collection for quality improvement, and disseminating knowledge through presentations and publications. Understanding ethical research practices, informed consent in research contexts, and how clinicians can contribute to building the evidence base while maintaining focus on client care.',
            resources: [
              'Guidelines: Practice-based research methods',
              'Tools: Standardized outcome measures',
              'Resources: Research participation opportunities',
              'Examples: Case reports and practice data sharing'
            ]
          }
        ]
      },
      {
        moduleId: 11,
        title: 'Module 11: Legal, Regulatory, and Professional Considerations',
        description: 'Navigating the legal landscape and professional requirements',
        duration: '1.5 weeks',
        learningObjectives: [
          'Understand current legal and regulatory status',
          'Navigate licensure and practice requirements',
          'Prepare for regulatory changes and FDA approval',
          'Maintain professional standards and accountability'
        ],
        lessons: [
          {
            lessonId: 34,
            title: 'Legal Status and Regulatory Pathways',
            type: 'video',
            duration: '60 min',
            content: 'MDMA remains Schedule I federally but is progressing through FDA approval processes. This lesson covers current legal status, FDA Breakthrough Therapy designation, expected approval timeline, state-level considerations, Expanded Access programs, clinical trial participation requirements, and what FDA approval will mean for practice. Understanding legal risks, practice restrictions, and how to maintain compliance while the field evolves. Preparing for the transition from research to clinical access.',
            resources: [
              'Reading: FDA Approval Process for MDMA',
              'Timeline: Regulatory pathway and expected milestones',
              'Guidelines: Current legal practice limitations',
              'Updates: State-by-state regulatory developments'
            ]
          },
          {
            lessonId: 35,
            title: 'Professional Certification and Practice Requirements',
            type: 'video',
            duration: '55 min',
            content: 'What will be required to practice MDMA therapy legally and ethically? This lesson covers anticipated certification pathways, training requirements, ongoing education, supervision requirements, scope of practice considerations, documentation and record-keeping, insurance and liability issues, and professional standards. Understanding the difference between general psychedelic knowledge and MDMA-specific certification. Preparing for professional requirements as the field becomes established.',
            resources: [
              'Information: Anticipated certification requirements',
              'Organizations: Certifying bodies and training programs',
              'Guidelines: Documentation and record-keeping standards',
              'Discussion: Building professional infrastructure'
            ]
          }
        ]
      },
      {
        moduleId: 12,
        title: 'Module 12: Course Completion and Next Steps',
        description: 'Synthesis, assessment, and planning your path forward',
        duration: '1 week',
        learningObjectives: [
          'Synthesize learning from entire course',
          'Demonstrate competency through comprehensive assessment',
          'Develop personal plan for continued training and practice',
          'Understand next steps toward MDMA therapy practice'
        ],
        lessons: [
          {
            lessonId: 36,
            title: 'Comprehensive Final Assessment and Course Completion',
            type: 'quiz + assignment',
            duration: '90 min',
            content: 'Capstone assessment covering all course content: MDMA pharmacology and mechanisms, trauma theory, MAPS protocol, preparation and integration, session conduct, safety and ethics, special populations, clinical skills, research literacy, and professional considerations. Comprehensive case study assignment requiring integration of theoretical knowledge with clinical decision-making. Successful completion demonstrates readiness for advanced training and supervised practice. This assessment ensures graduates have mastered essential knowledge for safe, ethical, and effective MDMA-assisted therapy.',
            resources: [
              'Study guide: Comprehensive course review',
              'Practice assessment: Self-testing materials',
              'Case study: Final integration assignment',
              'Certificate: Course completion documentation'
            ]
          }
        ]
      }
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
