import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

// ============================================
// DATA: USERS (15 diverse professionals)
// ============================================

const USERS_DATA = [
  { email: 'alice@example.com', username: 'alice_neuro', name: 'Dr. Alice Johnson', credentials: 'PhD, Neuroscience', bio: 'Neuroscientist specializing in psychedelic research at Johns Hopkins. Lead researcher on psilocybin neuroimaging studies.', verified: true, xp: 2450, level: 12 },
  { email: 'bob@example.com', username: 'dr_bob', name: 'Dr. Robert Williams', credentials: 'MD, Psychiatry', bio: 'Clinical psychiatrist with 15 years experience. Principal investigator for MDMA-assisted therapy trials.', verified: true, xp: 1980, level: 10 },
  { email: 'carol@example.com', username: 'carol_therapy', name: 'Carol Martinez, LMFT', credentials: 'LMFT, Certified KAP Therapist', bio: 'Integration specialist trained in IFS, somatic experiencing, and ketamine-assisted psychotherapy.', verified: true, xp: 1650, level: 9 },
  { email: 'david@example.com', username: 'david_chen', name: 'David Chen', credentials: 'MS, Clinical Research', bio: 'Research coordinator specializing in psychedelic clinical trial design and regulatory affairs.', verified: true, xp: 890, level: 6 },
  { email: 'elena@example.com', username: 'elena_phd', name: 'Dr. Elena Vasquez', credentials: 'PhD, Clinical Psychology', bio: 'Clinical psychologist researching therapeutic mechanisms of psychedelic-assisted therapy for treatment-resistant depression.', verified: true, xp: 1420, level: 8 },
  { email: 'frank@example.com', username: 'frank_md', name: 'Dr. Frank O\'Brien', credentials: 'MD, Anesthesiology', bio: 'Anesthesiologist and ketamine therapy specialist. Medical director of a ketamine clinic network.', verified: true, xp: 2100, level: 11 },
  { email: 'grace@example.com', username: 'grace_nurse', name: 'Grace Kim, RN', credentials: 'RN, PMHNP-BC', bio: 'Psychiatric nurse practitioner specializing in psychedelic medicine integration and harm reduction.', verified: true, xp: 780, level: 5 },
  { email: 'henry@example.com', username: 'henry_research', name: 'Dr. Henry Okonkwo', credentials: 'PhD, Pharmacology', bio: 'Pharmacologist studying psychedelic receptor binding and novel therapeutic compounds.', verified: true, xp: 1890, level: 10 },
  { email: 'iris@example.com', username: 'iris_social', name: 'Iris Thompson, LCSW', credentials: 'LCSW, SEP', bio: 'Trauma-informed social worker and somatic experiencing practitioner focused on integration therapy.', verified: true, xp: 1150, level: 7 },
  { email: 'james@example.com', username: 'james_ethics', name: 'Dr. James Morrison', credentials: 'PhD, Bioethics', bio: 'Bioethicist specializing in psychedelic research ethics, informed consent, and policy development.', verified: true, xp: 920, level: 6 },
  { email: 'kate@example.com', username: 'kate_student', name: 'Kate Sullivan', credentials: 'Graduate Student', bio: 'Doctoral candidate researching psilocybin for end-of-life anxiety. Interested in meaning-making and existential distress.', verified: false, xp: 340, level: 3 },
  { email: 'luis@example.com', username: 'luis_veteran', name: 'Luis Ramirez', credentials: 'Peer Support Specialist', bio: 'Combat veteran and certified peer support specialist. Advocate for psychedelic therapy access for veterans with PTSD.', verified: true, xp: 560, level: 4 },
  { email: 'maria@example.com', username: 'maria_anthropology', name: 'Dr. Maria Santos', credentials: 'PhD, Medical Anthropology', bio: 'Medical anthropologist studying indigenous healing traditions and the cultural context of psychedelic use.', verified: true, xp: 1340, level: 8 },
  { email: 'nathan@example.com', username: 'nathan_tech', name: 'Nathan Park', credentials: 'MS, Biomedical Engineering', bio: 'Biomedical engineer developing neuroimaging analysis tools for psychedelic research.', verified: false, xp: 480, level: 4 },
  { email: 'admin@example.com', username: 'admin', name: 'Platform Administrator', credentials: 'System Administrator', bio: 'GSAPS platform administrator and support.', verified: true, xp: 5000, level: 25 }
];

// ============================================
// DATA: 10 COMPREHENSIVE COURSES
// ============================================

const COURSES_DATA = [
  {
    title: 'Foundations of Psychedelic-Assisted Therapy',
    description: 'A comprehensive introduction to psychedelic-assisted therapy covering history, pharmacology, therapeutic frameworks, safety protocols, and ethical considerations. This foundational course is essential for all practitioners entering the field.',
    category: 'foundations',
    level: 'beginner',
    duration: 720,
    ceCredits: 12,
    ceType: 'APA',
    instructorName: 'Dr. Matthew Johnson',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    lessons: [
      { title: 'History of Psychedelic Therapy', description: 'From ancient ceremonial use to modern clinical research - tracing the evolution of psychedelic healing.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/history' },
      { title: 'Pharmacology of Classic Psychedelics', description: 'Understanding serotonergic psychedelics: mechanisms, receptor binding, and neurobiological effects.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/pharmacology' },
      { title: 'The Therapeutic Framework', description: 'Preparation, journey, and integration: the three pillars of psychedelic-assisted therapy.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/framework' },
      { title: 'Safety and Screening Protocols', description: 'Medical and psychological screening, contraindications, and risk management strategies.', duration: 75, contentType: 'video', contentUrl: 'https://vimeo.com/example/safety' },
      { title: 'Set and Setting', description: 'Creating optimal conditions for therapeutic psychedelic experiences.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/setting' },
      { title: 'Ethical Considerations', description: 'Informed consent, boundaries, power dynamics, and professional ethics in psychedelic therapy.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/ethics' },
      { title: 'Legal Landscape', description: 'Current regulations, clinical trial frameworks, and emerging legal pathways.', duration: 40, contentType: 'video', contentUrl: 'https://vimeo.com/example/legal' },
      { title: 'Case Studies Overview', description: 'Introduction to clinical case presentations and learning objectives.', duration: 30, contentType: 'video', contentUrl: 'https://vimeo.com/example/cases' },
      { title: 'Module Assessment', description: 'Comprehensive quiz covering all foundational concepts.', duration: 45, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'MDMA-Assisted Therapy for PTSD',
    description: 'Deep dive into the MAPS Phase 3 protocol for MDMA-assisted therapy for PTSD. Covers the complete treatment arc from screening through integration, with detailed session guides and clinical techniques.',
    category: 'clinical',
    level: 'advanced',
    duration: 960,
    ceCredits: 16,
    ceType: 'CME',
    instructorName: 'Dr. Michael Mithoefer',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    lessons: [
      { title: 'MDMA Pharmacology and Safety', description: 'Mechanism of action, physiological effects, and medical safety considerations for MDMA.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-pharm' },
      { title: 'PTSD Pathophysiology', description: 'Understanding trauma neurobiology and why MDMA may be uniquely therapeutic.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/ptsd' },
      { title: 'Patient Selection and Screening', description: 'Inclusion/exclusion criteria, medical workup, and psychological assessment.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-screening' },
      { title: 'Preparation Sessions 1-3', description: 'Building therapeutic alliance and preparing clients for MDMA sessions.', duration: 90, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-prep' },
      { title: 'The MDMA Session: First Half', description: 'Session setup, dosing, onset, and therapeutic techniques for the first 3 hours.', duration: 80, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-session1' },
      { title: 'The MDMA Session: Second Half', description: 'Peak experience, supplemental dosing, and supporting the descent.', duration: 75, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-session2' },
      { title: 'Overnight and Next-Day Protocol', description: 'Post-session monitoring, sleep support, and next-day integration session.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-overnight' },
      { title: 'Integration Sessions', description: 'Processing MDMA experiences through subsequent integration therapy.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-integration' },
      { title: 'Working with Difficult Experiences', description: 'Managing challenging material, trauma responses, and therapeutic interventions.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-difficult' },
      { title: 'Clinical Case Presentations', description: 'Review of actual clinical cases with discussion of therapeutic decision-making.', duration: 90, contentType: 'video', contentUrl: 'https://vimeo.com/example/mdma-cases' },
      { title: 'Certification Assessment', description: 'Comprehensive examination for MDMA therapy certification.', duration: 60, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Psilocybin-Assisted Therapy Certification',
    description: 'Complete training in psilocybin-assisted therapy following the Johns Hopkins protocol. Includes theoretical foundations, practical skills, and supervised practice requirements.',
    category: 'clinical',
    level: 'advanced',
    duration: 840,
    ceCredits: 14,
    ceType: 'APA',
    instructorName: 'Dr. Roland Griffiths',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    lessons: [
      { title: 'Psilocybin: Mechanism and Effects', description: 'Neurobiological mechanisms, subjective effects, and therapeutic potential of psilocybin.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-mech' },
      { title: 'Research Evidence Base', description: 'Comprehensive review of clinical trial data for depression, anxiety, and addiction.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-evidence' },
      { title: 'The Mystical Experience', description: 'Understanding mystical-type experiences and their therapeutic significance.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-mystical' },
      { title: 'Preparation Protocol', description: 'Structured preparation sessions: building trust and setting intentions.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-prep' },
      { title: 'Session Room and Music', description: 'Environmental design, eyeshade/headphone protocol, and curated music programs.', duration: 40, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-music' },
      { title: 'Dosing and Session Structure', description: 'Dose selection, timing, and the arc of a psilocybin session.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-dosing' },
      { title: 'Therapeutic Presence', description: 'The role of the therapist: being vs. doing in psychedelic sessions.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-presence' },
      { title: 'Challenging Experiences', description: 'Working with fear, resistance, and difficult psychological material.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-challenge' },
      { title: 'Integration Therapy', description: 'Post-session integration: techniques, timeline, and therapeutic goals.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/psi-integrate' },
      { title: 'Certification Exam', description: 'Written and practical assessment for psilocybin therapy certification.', duration: 60, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Ketamine-Assisted Psychotherapy (KAP)',
    description: 'Clinical training in ketamine-assisted psychotherapy for depression, anxiety, and chronic pain. Covers both IV infusion and sublingual protocols with emphasis on psychotherapeutic integration.',
    category: 'clinical',
    level: 'intermediate',
    duration: 600,
    ceCredits: 10,
    ceType: 'CME',
    instructorName: 'Dr. Phil Wolfson',
    thumbnailUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800',
    lessons: [
      { title: 'Ketamine Pharmacology', description: 'NMDA antagonism, neuroplasticity, and the unique pharmacological profile of ketamine.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-pharm' },
      { title: 'Clinical Applications', description: 'Evidence for depression, PTSD, chronic pain, and suicidal ideation.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-clinical' },
      { title: 'Administration Routes', description: 'IV, IM, sublingual, and intranasal: comparing protocols and considerations.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-routes' },
      { title: 'Medical Screening and Monitoring', description: 'Cardiovascular considerations, contraindications, and safety monitoring.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-medical' },
      { title: 'The KAP Session', description: 'Structuring ketamine sessions for optimal therapeutic benefit.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-session' },
      { title: 'Psychotherapeutic Techniques', description: 'Integrating psychotherapy during and after ketamine experiences.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-therapy' },
      { title: 'Series Design and Maintenance', description: 'Treatment series protocols and long-term maintenance strategies.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-series' },
      { title: 'Special Populations', description: 'Considerations for chronic pain, adolescents, and treatment-resistant cases.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/ket-special' },
      { title: 'KAP Competency Assessment', description: 'Clinical skills evaluation and knowledge assessment.', duration: 45, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Integration Therapy: Theory and Practice',
    description: 'Comprehensive training in psychedelic integration therapy. Learn to help clients process and apply insights from psychedelic experiences through various therapeutic modalities.',
    category: 'integration',
    level: 'intermediate',
    duration: 540,
    ceCredits: 9,
    ceType: 'CNE',
    instructorName: 'Dr. Rosalind Watts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    lessons: [
      { title: 'What is Integration?', description: 'Defining integration and its role in psychedelic therapy outcomes.', duration: 40, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-what' },
      { title: 'The ACE Model', description: 'Accept, Connect, Embody: A framework for integration therapy.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-ace' },
      { title: 'Somatic Approaches', description: 'Body-based integration: breathwork, movement, and somatic experiencing.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-somatic' },
      { title: 'Narrative and Meaning-Making', description: 'Helping clients construct meaningful narratives from psychedelic experiences.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-narrative' },
      { title: 'Creative Expression', description: 'Art, music, journaling, and other creative modalities for integration.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-creative' },
      { title: 'Relational Integration', description: 'Working with relationship insights and improving interpersonal connections.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-relational' },
      { title: 'Spiritual Integration', description: 'Supporting clients with mystical experiences and spiritual emergence.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-spiritual' },
      { title: 'Difficult Integration', description: 'Working with challenging experiences, spiritual emergencies, and stuck processes.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/int-difficult' },
      { title: 'Integration Skills Assessment', description: 'Practical skills evaluation for integration therapy.', duration: 40, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Trauma-Informed Psychedelic Care',
    description: 'Essential training for providing trauma-informed care in psychedelic therapy settings. Covers trauma neurobiology, safety, and specialized techniques for working with trauma survivors.',
    category: 'clinical',
    level: 'intermediate',
    duration: 480,
    ceCredits: 8,
    ceType: 'APA',
    instructorName: 'Dr. Gabor Maté',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800',
    lessons: [
      { title: 'Understanding Trauma', description: 'Trauma definitions, types, and manifestations in clinical settings.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-understand' },
      { title: 'Neurobiology of Trauma', description: 'How trauma affects the brain, nervous system, and embodied experience.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-neuro' },
      { title: 'Trauma-Informed Principles', description: 'Safety, choice, collaboration, trustworthiness, and empowerment.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-principles' },
      { title: 'Window of Tolerance', description: 'Working within the window of tolerance during psychedelic sessions.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-window' },
      { title: 'Grounding and Resourcing', description: 'Techniques for stabilization before, during, and after sessions.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-ground' },
      { title: 'Working with Dissociation', description: 'Recognizing and responding to dissociative experiences.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-dissoc' },
      { title: 'Complex Trauma Considerations', description: 'Special considerations for developmental and complex trauma.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/trauma-complex' },
      { title: 'Trauma Assessment', description: 'Knowledge and skills assessment for trauma-informed care.', duration: 40, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Psychedelic Research Methods',
    description: 'Comprehensive training in designing, conducting, and analyzing psychedelic clinical research. Covers regulatory requirements, methodology, and ethical considerations.',
    category: 'research',
    level: 'advanced',
    duration: 660,
    ceCredits: 11,
    ceType: 'CME',
    instructorName: 'Dr. Robin Carhart-Harris',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    lessons: [
      { title: 'History of Psychedelic Research', description: 'From the first wave to the psychedelic renaissance: lessons learned.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-history' },
      { title: 'Regulatory Pathways', description: 'FDA, DEA, and IRB requirements for psychedelic research.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-regulatory' },
      { title: 'Study Design', description: 'RCTs, open-label studies, and novel trial designs for psychedelics.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-design' },
      { title: 'Outcome Measures', description: 'Validated instruments and novel assessments for psychedelic research.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-measures' },
      { title: 'Blinding Challenges', description: 'Addressing the blinding problem in psychedelic trials.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-blinding' },
      { title: 'Neuroimaging Methods', description: 'fMRI, EEG, and PET imaging in psychedelic neuroscience.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-imaging' },
      { title: 'Data Analysis', description: 'Statistical approaches and qualitative methods for psychedelic research.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-analysis' },
      { title: 'Publication and Ethics', description: 'Publishing research, avoiding hype, and maintaining scientific integrity.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/res-ethics' },
      { title: 'Research Methods Exam', description: 'Comprehensive assessment of research methodology knowledge.', duration: 50, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Group Psychedelic Therapy',
    description: 'Training in facilitating group psychedelic therapy sessions. Covers group dynamics, safety protocols, and techniques for multi-participant ceremonies and clinical groups.',
    category: 'clinical',
    level: 'advanced',
    duration: 540,
    ceCredits: 9,
    ceType: 'APA',
    instructorName: 'Dr. Bill Richards',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    lessons: [
      { title: 'Rationale for Group Work', description: 'Benefits, challenges, and indications for group psychedelic therapy.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-rationale' },
      { title: 'Group Selection and Composition', description: 'Screening, group size, and creating balanced group composition.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-selection' },
      { title: 'Group Preparation', description: 'Building group cohesion and preparing participants together.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-prep' },
      { title: 'Facilitator Roles', description: 'Lead and support facilitator responsibilities and coordination.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-roles' },
      { title: 'Space Design for Groups', description: 'Physical setup, participant spacing, and environmental considerations.', duration: 40, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-space' },
      { title: 'Managing Group Dynamics', description: 'Handling interactions, disturbances, and emergencies in group settings.', duration: 70, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-dynamics' },
      { title: 'Group Integration Sessions', description: 'Facilitating sharing circles and group integration processes.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/grp-integrate' },
      { title: 'Group Facilitation Assessment', description: 'Skills evaluation for group psychedelic therapy facilitation.', duration: 45, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Ethics in Psychedelic Therapy',
    description: 'In-depth exploration of ethical issues in psychedelic-assisted therapy. Covers boundaries, consent, power dynamics, sexual ethics, and professional conduct.',
    category: 'ethics',
    level: 'intermediate',
    duration: 420,
    ceCredits: 7,
    ceType: 'Ethics',
    instructorName: 'Dr. Kylea Taylor',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    lessons: [
      { title: 'Ethical Foundations', description: 'Core ethical principles applied to psychedelic therapy contexts.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-foundations' },
      { title: 'Informed Consent', description: 'Comprehensive consent processes for psychedelic interventions.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-consent' },
      { title: 'Boundaries and Touch', description: 'Physical boundaries, appropriate touch, and consent during sessions.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-boundaries' },
      { title: 'Power Dynamics', description: 'Understanding and managing power differentials in altered states.', duration: 60, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-power' },
      { title: 'Sexual Ethics', description: 'Preventing sexual boundary violations and responding to disclosures.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-sexual' },
      { title: 'Cultural Considerations', description: 'Cultural humility, appropriation concerns, and inclusive practices.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-cultural' },
      { title: 'Ethics Case Studies', description: 'Analyzing ethical dilemmas through case-based learning.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/eth-cases' },
      { title: 'Ethics Assessment', description: 'Comprehensive ethics knowledge and reasoning assessment.', duration: 40, contentType: 'quiz', contentUrl: null }
    ]
  },
  {
    title: 'Psychedelic Medicine for End-of-Life Care',
    description: 'Specialized training in using psychedelic therapy to address existential distress, death anxiety, and quality of life in patients with life-threatening diagnoses.',
    category: 'clinical',
    level: 'advanced',
    duration: 480,
    ceCredits: 8,
    ceType: 'CME',
    instructorName: 'Dr. Anthony Bossis',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800',
    lessons: [
      { title: 'Death Anxiety and Existential Distress', description: 'Understanding existential suffering in terminal illness.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-anxiety' },
      { title: 'Research Evidence', description: 'Clinical trial data for psilocybin in cancer-related distress.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-evidence' },
      { title: 'Patient Selection', description: 'Appropriate candidates and medical considerations for end-of-life psychedelic therapy.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-selection' },
      { title: 'Family Involvement', description: 'Working with family systems and caregivers in end-of-life care.', duration: 45, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-family' },
      { title: 'The Therapeutic Session', description: 'Unique considerations for psychedelic sessions with dying patients.', duration: 65, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-session' },
      { title: 'Meaning and Transcendence', description: 'Supporting meaning-making and transcendent experiences.', duration: 55, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-meaning' },
      { title: 'Grief and Bereavement', description: 'Post-death support for families and therapeutic closure.', duration: 50, contentType: 'video', contentUrl: 'https://vimeo.com/example/eol-grief' },
      { title: 'End-of-Life Care Assessment', description: 'Competency assessment for end-of-life psychedelic care.', duration: 45, contentType: 'quiz', contentUrl: null }
    ]
  }
];

// ============================================
// DATA: 10 GROUPS
// ============================================

const GROUPS_DATA = [
  { name: 'Psilocybin Research Network', description: 'A collaborative community of researchers studying psilocybin for depression, anxiety, addiction, and other conditions. Share findings, discuss methodology, and find collaborators.', privacy: 'public', category: 'research', coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800' },
  { name: 'MDMA Therapy Practitioners', description: 'For trained MDMA-assisted therapy practitioners. Discuss clinical cases, share best practices, and support each other through challenging work.', privacy: 'private', category: 'clinical', coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800' },
  { name: 'Ketamine Clinicians Network', description: 'Connect with fellow ketamine therapy providers. Discuss protocols, business practices, and clinical outcomes in ketamine-assisted treatment.', privacy: 'public', category: 'clinical', coverUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800' },
  { name: 'Integration Circle', description: 'A supportive space for integration therapists and coaches. Share techniques, case consultations (anonymized), and resources for helping clients integrate psychedelic experiences.', privacy: 'public', category: 'integration', coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800' },
  { name: 'Psychedelic Nurses Association', description: 'Nursing professionals in psychedelic medicine. Discuss scope of practice, clinical protocols, and advocate for nursing roles in psychedelic therapy.', privacy: 'public', category: 'nursing', coverUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800' },
  { name: 'Veterans Psychedelic Therapy', description: 'Dedicated to expanding access to psychedelic therapy for veterans. Share research, advocacy efforts, and support veteran-focused programs.', privacy: 'public', category: 'advocacy', coverUrl: 'https://images.unsplash.com/photo-1534481909716-9a482087f27d?w=800' },
  { name: 'Psychedelic Ethics Forum', description: 'Discuss ethical challenges in psychedelic therapy and research. Explore consent, boundaries, equity, cultural considerations, and professional standards.', privacy: 'public', category: 'ethics', coverUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800' },
  { name: 'Neuroimaging Research Group', description: 'Researchers using neuroimaging to study psychedelics. Share analysis techniques, collaborate on studies, and discuss the neuroscience of altered states.', privacy: 'private', category: 'research', coverUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800' },
  { name: 'Psychedelic Therapists of Color', description: 'A supportive community for BIPOC practitioners in psychedelic therapy. Address unique challenges, celebrate successes, and promote equity in the field.', privacy: 'private', category: 'community', coverUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800' },
  { name: 'Graduate Students in Psychedelic Science', description: 'Connect with fellow graduate students researching psychedelics. Share resources, find mentors, and navigate academic careers in this emerging field.', privacy: 'public', category: 'education', coverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' }
];

// ============================================
// DATA: 10 EVENTS
// ============================================

const getEventDates = () => {
  const now = new Date();
  return {
    nextWeek: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    twoWeeks: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
    threeWeeks: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
    oneMonth: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    sixWeeks: new Date(now.getTime() + 42 * 24 * 60 * 60 * 1000),
    twoMonths: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
    threeMonths: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
  };
};

const EVENTS_DATA = [
  { title: 'Psychedelic Science 2026 Conference', description: 'The premier international conference on psychedelic research and therapy. Three days of cutting-edge presentations, workshops, and networking with 3000+ attendees from around the world. Featuring keynotes from leading researchers and clinicians.', location: 'Colorado Convention Center, Denver, CO', isVirtual: false, category: 'conference', maxAttendees: 3000, coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', daysOffset: 90, duration: 3 },
  { title: 'MDMA Therapy Training Intensive', description: 'Five-day immersive training in MDMA-assisted therapy following MAPS protocols. Includes didactic instruction, experiential exercises, and supervised role-plays. Limited to licensed mental health professionals.', location: 'Esalen Institute, Big Sur, CA', isVirtual: false, category: 'training', maxAttendees: 24, coverUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', daysOffset: 42, duration: 5 },
  { title: 'Webinar: Psilocybin for Treatment-Resistant Depression', description: 'Join Dr. Robin Carhart-Harris as he presents the latest findings from Imperial College London\'s psilocybin depression trials. Includes Q&A session with the research team.', location: null, isVirtual: true, virtualUrl: 'https://zoom.us/j/psychedelic-webinar-123', category: 'webinar', maxAttendees: 500, coverUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', daysOffset: 7, duration: 0.08 },
  { title: 'Ketamine-Assisted Psychotherapy Workshop', description: 'Two-day experiential workshop on ketamine-assisted psychotherapy. Learn protocols, practice therapeutic techniques, and explore integration strategies. CE credits available.', location: 'Kripalu Center, Stockbridge, MA', isVirtual: false, category: 'workshop', maxAttendees: 30, coverUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', daysOffset: 21, duration: 2 },
  { title: 'Integration Circle Training', description: 'Learn to facilitate peer integration circles for community psychedelic support. This three-day training covers group facilitation, holding space, and harm reduction principles.', location: 'Spirit Rock Meditation Center, Woodacre, CA', isVirtual: false, category: 'training', maxAttendees: 20, coverUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', daysOffset: 30, duration: 3 },
  { title: 'Webinar: Ethics in Psychedelic Therapy', description: 'Critical discussion of ethical challenges in psychedelic-assisted therapy. Topics include consent, boundaries, power dynamics, and cultural considerations. Featuring a panel of ethics experts.', location: null, isVirtual: true, virtualUrl: 'https://zoom.us/j/ethics-panel-456', category: 'webinar', maxAttendees: 300, coverUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', daysOffset: 14, duration: 0.08 },
  { title: 'Psychedelic Research Symposium', description: 'Academic symposium featuring presentations from leading psychedelic research laboratories. Topics include neuroimaging, clinical trials, and novel compounds. Poster session included.', location: 'Johns Hopkins University, Baltimore, MD', isVirtual: false, category: 'symposium', maxAttendees: 200, coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', daysOffset: 60, duration: 2 },
  { title: 'Somatic Integration Intensive', description: 'Deep dive into body-based approaches for psychedelic integration. Learn somatic experiencing, breathwork, and movement practices for supporting integration.', location: '1440 Multiversity, Scotts Valley, CA', isVirtual: false, category: 'workshop', maxAttendees: 25, coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', daysOffset: 35, duration: 4 },
  { title: 'Veterans & Psychedelic Healing Summit', description: 'Conference focused on psychedelic therapy access for military veterans. Featuring veteran testimonials, research updates, and policy discussions.', location: 'MAPS Office, San Jose, CA', isVirtual: true, virtualUrl: 'https://zoom.us/j/veterans-summit-789', category: 'conference', maxAttendees: 400, coverUrl: 'https://images.unsplash.com/photo-1534481909716-9a482087f27d?w=800', daysOffset: 45, duration: 1 },
  { title: 'Graduate Student Research Colloquium', description: 'Presentation session for graduate students conducting psychedelic research. Share your work, get feedback from peers and mentors, and build your network.', location: null, isVirtual: true, virtualUrl: 'https://zoom.us/j/grad-colloquium-101', category: 'academic', maxAttendees: 50, coverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', daysOffset: 10, duration: 0.17 }
];

console.log('Seed data arrays prepared');

// Continue in next part...
