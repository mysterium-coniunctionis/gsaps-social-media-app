/**
 * GSAPS Professional Course Data - Part 2
 * MDMA-Assisted Therapy and Clinical Protocols
 */

// ============================================
// COURSE 2: MDMA-Assisted Therapy for PTSD
// Advanced Clinical - 20 CE Credits (CME)
// ============================================

export const course2 = {
  title: 'MDMA-Assisted Therapy for PTSD: Clinical Protocols',
  slug: 'mdma-assisted-therapy-ptsd',
  description: 'Comprehensive training in MDMA-assisted therapy protocols based on MAPS Phase 3 clinical trials. This advanced course covers patient selection, preparation, medicine sessions, integration, and the therapeutic framework for treating post-traumatic stress disorder. Designed for licensed mental health professionals.',
  category: 'clinical-research',
  level: 'advanced',
  thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
  duration: 1200,
  ceCredits: 20,
  ceType: 'CME',
  instructorName: 'Dr. Rachel Yehuda, PhD',
  instructorBio: 'Director of Mental Health Services at James J. Peters VA Medical Center. Leading researcher in PTSD neurobiology and trauma-informed treatments.',
  learningObjectives: [
    'Describe the MAPS MDMA-assisted therapy protocol structure',
    'Conduct comprehensive screening for MDMA therapy candidates',
    'Implement the Inner Healing Intelligence therapeutic framework',
    'Guide patients through MDMA medicine sessions safely',
    'Provide effective integration support following sessions',
    'Manage challenging situations during MDMA sessions'
  ],
  lessons: [
    {
      title: 'Introduction to MDMA-Assisted Therapy',
      description: 'History, mechanism, and clinical evidence',
      duration: 60,
      orderIndex: 1,
      contentType: 'text',
      content: `
<h1>Introduction to MDMA-Assisted Therapy</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Understand the pharmacology of MDMA and its therapeutic mechanisms</li>
<li>Review the history of MDMA in therapeutic contexts</li>
<li>Summarize the clinical evidence from Phase 2 and Phase 3 trials</li>
<li>Explain why MDMA-assisted therapy differs from conventional treatments</li>
</ul>

<h2>1. MDMA Pharmacology</h2>

<h3>Chemical Properties</h3>
<p>MDMA (3,4-methylenedioxymethamphetamine) is a substituted amphetamine with both stimulant and entactogenic properties. Unlike classic psychedelics, MDMA's primary mechanism involves monoamine release rather than receptor agonism.</p>

<h3>Mechanism of Action</h3>
<p>MDMA produces its effects through multiple mechanisms:</p>
<ul>
<li><strong>Serotonin release:</strong> Massive release of stored serotonin (primary effect)</li>
<li><strong>Dopamine release:</strong> Moderate dopamine release contributing to reward/motivation</li>
<li><strong>Norepinephrine release:</strong> Contributes to arousal and cardiovascular effects</li>
<li><strong>Oxytocin release:</strong> May contribute to prosocial and bonding effects</li>
<li><strong>Cortisol modulation:</strong> Blunted cortisol response to stress</li>
</ul>

<h3>Pharmacokinetics</h3>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Onset</td><td>30-60 minutes</td></tr>
<tr><td>Peak effects</td><td>1-2 hours</td></tr>
<tr><td>Duration</td><td>3-5 hours</td></tr>
<tr><td>Half-life</td><td>7-9 hours</td></tr>
<tr><td>Typical clinical dose</td><td>80-120 mg initial + optional 40-60 mg supplement</td></tr>
</table>

<h3>Subjective Effects Relevant to Therapy</h3>
<ul>
<li><strong>Increased emotional empathy:</strong> Enhanced ability to connect with and understand emotions</li>
<li><strong>Reduced fear response:</strong> Decreased amygdala reactivity to threatening stimuli</li>
<li><strong>Enhanced social trust:</strong> Increased sense of safety with therapists</li>
<li><strong>Increased introspection:</strong> Enhanced access to internal experiences</li>
<li><strong>Maintained clarity:</strong> Unlike classic psychedelics, reality testing remains intact</li>
</ul>

<h2>2. History of MDMA in Therapy</h2>

<h3>Discovery and Early Use (1912-1985)</h3>
<p>MDMA was first synthesized by Merck in 1912 but remained obscure until the 1970s. Alexander Shulgin resynthesized it in 1976 and introduced it to psychotherapists. Hundreds of therapists used MDMA as an adjunct to psychotherapy in the early 1980s, reporting remarkable results with trauma, relationship issues, and anxiety.</p>

<h3>Prohibition and Underground Use (1985-2000)</h3>
<p>The DEA classified MDMA as Schedule I in 1985 despite opposition from researchers and therapists. Some practitioners continued using MDMA underground, while researchers began documenting safety concerns about recreational use.</p>

<h3>The MAPS Research Program (2000-Present)</h3>
<p>The Multidisciplinary Association for Psychedelic Studies (MAPS) has led the effort to study MDMA-assisted therapy:</p>
<ul>
<li>2004: First FDA-approved pilot study for PTSD</li>
<li>2010-2016: Phase 2 trials across multiple sites</li>
<li>2017-2021: Phase 3 trials with breakthrough therapy designation</li>
<li>2024: FDA approval expected pending review</li>
</ul>

<h2>3. Clinical Evidence for MDMA-Assisted Therapy</h2>

<h3>Phase 2 Trial Results</h3>
<p>Six Phase 2 trials (N=105) demonstrated:</p>
<ul>
<li>Significant PTSD symptom reduction vs. placebo</li>
<li>54% of participants no longer met PTSD criteria at 2-month follow-up</li>
<li>68% no longer met criteria at 12-month follow-up</li>
<li>Benefits sustained through 3.5-year follow-up</li>
</ul>

<h3>Phase 3 Trial Results</h3>
<p>The pivotal Phase 3 trials (MAPP1 and MAPP2) showed:</p>
<ul>
<li><strong>MAPP1 (N=90):</strong> 67% no longer met PTSD criteria vs. 32% placebo</li>
<li><strong>MAPP2 (N=104):</strong> 71% no longer met PTSD criteria vs. 48% placebo</li>
<li>Clinically significant reduction in CAPS-5 scores</li>
<li>Improvements in depression, dissociation, and functional impairment</li>
<li>No significant adverse events or abuse potential signals</li>
</ul>

<h3>Comparison to Existing Treatments</h3>
<table>
<tr><th>Treatment</th><th>Response Rate</th><th>Remission Rate</th></tr>
<tr><td>SSRIs (sertraline, paroxetine)</td><td>~60%</td><td>20-30%</td></tr>
<tr><td>Prolonged Exposure</td><td>~53%</td><td>~41%</td></tr>
<tr><td>CPT (Cognitive Processing Therapy)</td><td>~53%</td><td>~30%</td></tr>
<tr><td>EMDR</td><td>~60%</td><td>~35%</td></tr>
<tr><td>MDMA-Assisted Therapy</td><td>~88%</td><td>~67-71%</td></tr>
</table>

<h2>4. Why MDMA Works for PTSD</h2>

<h3>Neurobiological Mechanisms</h3>
<p>MDMA appears to facilitate trauma processing through:</p>
<ul>
<li><strong>Fear extinction:</strong> Enhanced consolidation of fear extinction learning</li>
<li><strong>Amygdala modulation:</strong> Reduced threat response during memory processing</li>
<li><strong>Prefrontal engagement:</strong> Enhanced top-down emotional regulation</li>
<li><strong>Social neuroscience:</strong> Increased oxytocin and prosocial processing</li>
<li><strong>Memory reconsolidation:</strong> Window for updating traumatic memories</li>
</ul>

<h3>Psychological Mechanisms</h3>
<p>MDMA creates conditions conducive to trauma therapy:</p>
<ul>
<li>Reduced avoidance of traumatic material</li>
<li>Increased tolerance for emotional distress</li>
<li>Enhanced therapeutic alliance and trust</li>
<li>Greater self-compassion and reduced shame</li>
<li>Ability to revisit trauma without overwhelming fear</li>
</ul>

<h2>5. The MDMA-Assisted Therapy Model</h2>

<h3>Treatment Structure Overview</h3>
<p>The MAPS protocol includes:</p>
<ul>
<li><strong>Preparation:</strong> 3 sessions (90 min each)</li>
<li><strong>Medicine Sessions:</strong> 3 sessions (8 hours each), spaced 3-5 weeks apart</li>
<li><strong>Integration:</strong> 3 sessions after each medicine session</li>
<li><strong>Total:</strong> 12+ sessions over approximately 12-16 weeks</li>
</ul>

<h3>Key Principles</h3>
<ol>
<li><strong>Inner Healing Intelligence:</strong> Trust the patient's innate capacity for healing</li>
<li><strong>Non-directive approach:</strong> Follow the patient's process rather than leading</li>
<li><strong>Safety and trust:</strong> The relationship provides a secure base for exploration</li>
<li><strong>Dual therapist model:</strong> Male-female co-therapy team</li>
</ol>

<h2>Summary</h2>
<p>MDMA-assisted therapy represents a paradigm shift in PTSD treatment, offering substantially higher efficacy than existing treatments through a novel combination of pharmacology and psychotherapy. Understanding the science behind this approach is essential for competent clinical practice.</p>
`
    },
    {
      title: 'Patient Selection and Screening',
      description: 'Comprehensive assessment for MDMA therapy',
      duration: 90,
      orderIndex: 2,
      contentType: 'text',
      content: `
<h1>Patient Selection and Screening</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Apply inclusion and exclusion criteria for MDMA-assisted therapy</li>
<li>Conduct comprehensive medical and psychiatric evaluations</li>
<li>Assess medication interactions and plan appropriate washouts</li>
<li>Evaluate patient readiness and appropriateness for this modality</li>
</ul>

<h2>1. Inclusion Criteria</h2>

<h3>Diagnostic Requirements</h3>
<ul>
<li>PTSD diagnosis confirmed by structured clinical interview (CAPS-5)</li>
<li>CAPS-5 score ≥35 (moderate or greater severity)</li>
<li>Trauma exposure meeting DSM-5 Criterion A</li>
<li>Age 18+ (adolescent protocols under development)</li>
</ul>

<h3>Treatment History</h3>
<ul>
<li>Prior trial of evidence-based treatment (preferred but not required)</li>
<li>Not currently in active exposure-based therapy</li>
<li>Stable on current treatment regimen (if any)</li>
</ul>

<h3>Support System</h3>
<ul>
<li>Has identified support person available during treatment period</li>
<li>Ability to attend all scheduled sessions</li>
<li>Transportation arranged for medicine session days</li>
</ul>

<h2>2. Exclusion Criteria</h2>

<h3>Psychiatric Exclusions</h3>
<table>
<tr><th>Condition</th><th>Rationale</th></tr>
<tr><td>Current psychotic disorder</td><td>Risk of exacerbation</td></tr>
<tr><td>Schizophrenia (history)</td><td>Risk of precipitation/relapse</td></tr>
<tr><td>Bipolar I with psychotic features</td><td>Risk of mania/psychosis</td></tr>
<tr><td>Borderline PD with recent self-harm</td><td>Safety concerns; requires stability</td></tr>
<tr><td>Active suicidality with plan/intent</td><td>Acute safety concern</td></tr>
<tr><td>Current severe dissociative disorder</td><td>Risk of destabilization</td></tr>
</table>

<h3>Medical Exclusions</h3>
<table>
<tr><th>Condition</th><th>Concern</th></tr>
<tr><td>Uncontrolled hypertension (>140/90)</td><td>MDMA elevates BP/HR</td></tr>
<tr><td>History of MI or stroke</td><td>Cardiovascular stress</td></tr>
<tr><td>Arrhythmia or conduction abnormality</td><td>Cardiac risk</td></tr>
<tr><td>Severe hepatic impairment</td><td>MDMA metabolism</td></tr>
<tr><td>Hyponatremia history/risk</td><td>MDMA can cause SIADH</td></tr>
<tr><td>Pregnancy or breastfeeding</td><td>Unknown fetal effects</td></tr>
<tr><td>Seizure disorder</td><td>Lowered seizure threshold</td></tr>
</table>

<h3>Medication Exclusions</h3>
<table>
<tr><th>Medication</th><th>Issue</th><th>Action</th></tr>
<tr><td>MAOIs</td><td>Hypertensive crisis, serotonin syndrome</td><td>2 week washout</td></tr>
<tr><td>SSRIs</td><td>Serotonin syndrome risk, blunted effects</td><td>5 half-lives washout</td></tr>
<tr><td>SNRIs</td><td>Similar to SSRIs</td><td>5 half-lives washout</td></tr>
<tr><td>Tramadol</td><td>Seizure risk, serotonin syndrome</td><td>1 week washout</td></tr>
<tr><td>St. John's Wort</td><td>Serotonergic interaction</td><td>2 week washout</td></tr>
</table>

<h2>3. Medical Screening Protocol</h2>

<h3>Required Assessments</h3>
<ol>
<li><strong>History and Physical:</strong> Comprehensive medical history, examination</li>
<li><strong>Vital Signs:</strong> Baseline BP, HR (repeated measurements)</li>
<li><strong>ECG:</strong> 12-lead ECG for arrhythmia, QT prolongation screening</li>
<li><strong>Laboratory Tests:</strong>
  <ul>
    <li>Complete blood count</li>
    <li>Comprehensive metabolic panel (including electrolytes)</li>
    <li>Liver function tests</li>
    <li>Thyroid panel</li>
  </ul>
</li>
<li><strong>Pregnancy Test:</strong> For individuals of childbearing potential</li>
<li><strong>Urine Drug Screen:</strong> Baseline substance use assessment</li>
</ol>

<h3>Cardiovascular Monitoring</h3>
<p>MDMA reliably increases heart rate and blood pressure. Screening must identify:</p>
<ul>
<li>Hypertension (controlled may be acceptable with monitoring)</li>
<li>Cardiac structural abnormalities</li>
<li>Arrhythmias or conduction delays</li>
<li>History of cardiac events</li>
<li>Medication interactions (e.g., PDE5 inhibitors)</li>
</ul>

<h2>4. Psychiatric Screening Protocol</h2>

<h3>Structured Assessments</h3>
<ul>
<li><strong>CAPS-5:</strong> Clinician-Administered PTSD Scale (gold standard diagnosis)</li>
<li><strong>MINI:</strong> Mini International Neuropsychiatric Interview (screen for exclusionary diagnoses)</li>
<li><strong>PHQ-9:</strong> Depression severity</li>
<li><strong>C-SSRS:</strong> Columbia Suicide Severity Rating Scale</li>
<li><strong>DES-II:</strong> Dissociative Experiences Scale</li>
</ul>

<h3>Clinical Interview Components</h3>
<ul>
<li>Trauma history (types, duration, age of onset)</li>
<li>Previous treatments and responses</li>
<li>Current symptom presentation and triggers</li>
<li>Substance use history (including previous MDMA use)</li>
<li>Family psychiatric history (especially psychosis, bipolar)</li>
<li>Social support and functioning assessment</li>
</ul>

<h2>5. Readiness Assessment</h2>

<h3>Psychological Readiness Indicators</h3>
<ul>
<li><strong>Motivation:</strong> Clear understanding of why they want this treatment</li>
<li><strong>Commitment:</strong> Ability to engage with full protocol including integration</li>
<li><strong>Window of tolerance:</strong> Some capacity to tolerate distress</li>
<li><strong>Insight:</strong> Basic self-awareness and reflective capacity</li>
<li><strong>Alliance potential:</strong> Ability to trust and connect with therapists</li>
</ul>

<h3>Practical Readiness</h3>
<ul>
<li>Life stability (housing, employment, relationships)</li>
<li>Absence of acute crises requiring immediate attention</li>
<li>Availability for all sessions over treatment period</li>
<li>Support person identified and briefed</li>
<li>Post-session care arrangements (next 24 hours)</li>
</ul>

<h2>6. Special Populations</h2>

<h3>Combat Veterans</h3>
<ul>
<li>Often treatment-resistant with multiple trauma exposures</li>
<li>May have mild TBI complicating presentation</li>
<li>Military culture may affect therapeutic relationship</li>
<li>Moral injury may be prominent theme</li>
</ul>

<h3>Survivors of Childhood Sexual Abuse</h3>
<ul>
<li>May have complex trauma presentation</li>
<li>Higher rates of dissociation</li>
<li>Body-based trauma requires sensitivity to touch protocols</li>
<li>Trust-building may take longer</li>
</ul>

<h3>First Responders</h3>
<ul>
<li>Cumulative trauma from repeated exposures</li>
<li>Professional identity concerns about treatment</li>
<li>May minimize symptoms</li>
<li>Often return to ongoing trauma exposure</li>
</ul>

<h2>Summary</h2>
<p>Comprehensive screening protects patient safety and optimizes outcomes. The assessment process must balance inclusivity with appropriate exclusion of high-risk individuals, while identifying patients most likely to benefit from this intensive treatment approach.</p>
`
    },
    {
      title: 'Preparation Sessions',
      description: 'Building alliance and preparing for medicine sessions',
      duration: 75,
      orderIndex: 3,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      title: 'The MDMA Medicine Session',
      description: 'Conducting 8-hour therapeutic sessions',
      duration: 120,
      orderIndex: 4,
      contentType: 'text',
      content: `
<h1>The MDMA Medicine Session</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Describe the structure and phases of an MDMA medicine session</li>
<li>Apply the Inner Healing Intelligence framework in real-time</li>
<li>Navigate common experiences and challenges during sessions</li>
<li>Implement safety monitoring protocols throughout</li>
</ul>

<h2>1. Session Day Preparation</h2>

<h3>Pre-Session Checklist</h3>
<ul>
<li><strong>Room preparation:</strong> Clean, comfortable, aesthetic environment</li>
<li><strong>Supplies ready:</strong> Water, tissues, blankets, eye shades, music system</li>
<li><strong>Medical supplies:</strong> BP cuff, thermometer, rescue medications if needed</li>
<li><strong>Documentation:</strong> Consent reviewed, vital signs baseline documented</li>
<li><strong>Support person:</strong> Confirmed for pick-up, brief contact information</li>
</ul>

<h3>Patient Arrival</h3>
<ol>
<li>Greet and settle the patient</li>
<li>Review current state (sleep, food intake, medications, concerns)</li>
<li>Obtain vital signs (BP, HR, temperature)</li>
<li>Pregnancy test if applicable (day of)</li>
<li>Brief intention review without creating pressure</li>
<li>Address any questions or anxieties</li>
</ol>

<h2>2. Dosing Protocol</h2>

<h3>Standard Dosing</h3>
<table>
<tr><th>Dose</th><th>Timing</th><th>Purpose</th></tr>
<tr><td>Initial: 80-120 mg</td><td>T+0</td><td>Primary therapeutic dose</td></tr>
<tr><td>Supplemental: 40-60 mg</td><td>T+1.5-2.5 hours</td><td>Optional: extends peak window</td></tr>
</table>

<h3>Dose Selection Factors</h3>
<ul>
<li>Body weight (generally 1.5-2 mg/kg for initial dose)</li>
<li>Previous MDMA experience</li>
<li>Anxiety level and sensitivity</li>
<li>Medical factors</li>
<li>Session number (may increase across sessions)</li>
</ul>

<h3>Supplemental Dose Decision</h3>
<p>Offered approximately 1.5-2.5 hours after initial dose if:</p>
<ul>
<li>Patient is engaged in meaningful therapeutic work</li>
<li>Effects are beginning to wane but more processing is needed</li>
<li>Patient expresses interest</li>
<li>No contraindications (adverse reaction, excessive distress)</li>
</ul>

<h2>3. Session Phases</h2>

<h3>Phase 1: Onset (0-60 minutes)</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Gradual onset of effects</li>
<li>Possible anxiety or anticipation</li>
<li>Physical sensations (warmth, tingling)</li>
<li>May feel "coming up" sensations</li>
</ul>

<p><strong>Therapist role:</strong></p>
<ul>
<li>Calm, reassuring presence</li>
<li>Encourage patient to relax and go inward</li>
<li>Offer eye shades and headphones once comfortable</li>
<li>Begin music playlist</li>
<li>Monitor vital signs</li>
</ul>

<h3>Phase 2: Peak Experience (1-4 hours)</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Full effects of MDMA present</li>
<li>Emotional openness and enhanced empathy</li>
<li>Reduced fear, increased trust</li>
<li>May engage traumatic material spontaneously</li>
<li>Range of emotional experiences</li>
</ul>

<p><strong>Therapist role:</strong></p>
<ul>
<li>Follow patient's lead</li>
<li>Supportive presence without excessive intervention</li>
<li>Trust the Inner Healing Intelligence</li>
<li>Be available for verbal processing when patient initiates</li>
<li>Offer support for difficult material</li>
<li>Continue vital sign monitoring</li>
</ul>

<h3>Phase 3: Later Experience (4-6 hours)</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Effects gradually diminishing</li>
<li>Often deep processing continues</li>
<li>May feel more conversational</li>
<li>Beginning integration of material</li>
</ul>

<p><strong>Therapist role:</strong></p>
<ul>
<li>More verbal engagement may be appropriate</li>
<li>Gentle reflection on what has emerged</li>
<li>Support early meaning-making</li>
<li>Continue supportive presence</li>
</ul>

<h3>Phase 4: Return (6-8 hours)</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Return to baseline consciousness</li>
<li>May feel tired, emotional, or peaceful</li>
<li>Often sense of completion</li>
</ul>

<p><strong>Therapist role:</strong></p>
<ul>
<li>Gradual transition toward session end</li>
<li>Brief verbal processing</li>
<li>Assess readiness for session end</li>
<li>Review self-care instructions</li>
<li>Confirm support person arrival</li>
</ul>

<h2>4. The Inner Healing Intelligence Framework</h2>

<h3>Core Principle</h3>
<p>The Inner Healing Intelligence refers to the innate capacity of the psyche to move toward healing when given the right conditions. The therapist's role is to create safety and support this natural process rather than direct it.</p>

<h3>Practical Applications</h3>
<ul>
<li><strong>Non-directive stance:</strong> Follow rather than lead the patient's process</li>
<li><strong>Trust the process:</strong> Difficult experiences often serve healing purposes</li>
<li><strong>Minimal intervention:</strong> Only intervene when clearly needed</li>
<li><strong>Curiosity over interpretation:</strong> Ask rather than tell</li>
<li><strong>Support autonomy:</strong> Encourage patient's own meaning-making</li>
</ul>

<h3>When to Intervene</h3>
<ul>
<li>Patient requests help or support</li>
<li>Safety concerns (physical or psychological)</li>
<li>Patient appears stuck and struggling</li>
<li>Grounding needed for overwhelming experience</li>
<li>Reality check requested</li>
</ul>

<h2>5. Common Experiences and Responses</h2>

<h3>Trauma Memory Processing</h3>
<p>Patients may:</p>
<ul>
<li>Spontaneously revisit traumatic memories</li>
<li>Experience memories with less fear/distress than usual</li>
<li>Gain new perspectives on past events</li>
<li>Feel emotions previously blocked</li>
</ul>

<p><strong>Therapist response:</strong></p>
<ul>
<li>Validate the experience</li>
<li>Provide reassurance of safety</li>
<li>Trust their capacity to process</li>
<li>Offer support without rescuing</li>
</ul>

<h3>Somatic Experiences</h3>
<p>Common physical manifestations:</p>
<ul>
<li>Body tension, shaking, or trembling</li>
<li>Temperature fluctuations</li>
<li>Nausea (usually brief)</li>
<li>Jaw tension or teeth grinding</li>
</ul>

<p><strong>Therapist response:</strong></p>
<ul>
<li>Normalize as part of the process</li>
<li>Encourage attention to body sensations</li>
<li>Offer grounding if needed</li>
<li>Physical comfort measures (blankets, water)</li>
</ul>

<h3>Relational Themes</h3>
<p>Common interpersonal material:</p>
<ul>
<li>Feelings toward perpetrators</li>
<li>Relationships with family, partners</li>
<li>Self-compassion and self-criticism</li>
<li>Connection and isolation themes</li>
</ul>

<h2>6. Safety Monitoring</h2>

<h3>Vital Signs Protocol</h3>
<table>
<tr><th>Timepoint</th><th>Measurements</th></tr>
<tr><td>Baseline (pre-dose)</td><td>BP, HR, temperature</td></tr>
<tr><td>T+60 minutes</td><td>BP, HR</td></tr>
<tr><td>T+90 minutes</td><td>BP, HR</td></tr>
<tr><td>T+120 minutes</td><td>BP, HR</td></tr>
<tr><td>Every 1-2 hours thereafter</td><td>BP, HR as indicated</td></tr>
<tr><td>Before discharge</td><td>BP, HR</td></tr>
</table>

<h3>Medical Response Thresholds</h3>
<ul>
<li><strong>BP > 180/110:</strong> Rest, reassurance, antihypertensive if needed</li>
<li><strong>HR > 130 sustained:</strong> Rest, evaluate, beta-blocker if needed</li>
<li><strong>Temperature > 39°C:</strong> Cooling measures, fluids, medical evaluation</li>
</ul>

<h2>Summary</h2>
<p>The MDMA medicine session is an intensive 8-hour therapeutic experience requiring careful preparation, skilled support, and continuous monitoring. The therapist's primary role is to create safety and trust while following the patient's innate healing process. Mastery of this approach requires both technical knowledge and cultivated therapeutic presence.</p>
`
    },
    {
      title: 'Managing Challenging Situations',
      description: 'Difficult experiences and therapeutic responses',
      duration: 60,
      orderIndex: 5,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      title: 'Integration in MDMA-Assisted Therapy',
      description: 'Post-session processing and behavioral change',
      duration: 75,
      orderIndex: 6,
      contentType: 'text',
      content: `
<h1>Integration in MDMA-Assisted Therapy</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Structure effective integration sessions following MDMA experiences</li>
<li>Support patients in translating insights into lasting change</li>
<li>Address common integration challenges specific to PTSD treatment</li>
<li>Navigate the three-session treatment arc and endpoints</li>
</ul>

<h2>1. Integration Session Structure</h2>

<h3>Timing and Frequency</h3>
<p>Following each MDMA session:</p>
<ul>
<li><strong>Session 1:</strong> Within 24-72 hours post-MDMA</li>
<li><strong>Session 2:</strong> 1 week post-MDMA</li>
<li><strong>Session 3:</strong> 2-3 weeks post-MDMA (before next MDMA session)</li>
</ul>

<h3>First Integration Session Goals</h3>
<ol>
<li>Check-in on physical and emotional state</li>
<li>Create space for patient to share their experience</li>
<li>Begin identifying key themes, insights, and experiences</li>
<li>Normalize the range of post-session experiences</li>
<li>Establish self-care and support plans</li>
</ol>

<h3>Subsequent Integration Session Goals</h3>
<ol>
<li>Continue processing material from the session</li>
<li>Address any challenging after-effects</li>
<li>Support translation of insights into behavioral changes</li>
<li>Connect session material to ongoing life and relationships</li>
<li>Prepare for next MDMA session or treatment completion</li>
</ol>

<h2>2. Integration Approaches</h2>

<h3>Narrative Integration</h3>
<p>Helping patients construct coherent narratives:</p>
<ul>
<li>What happened during the session?</li>
<li>What were the key moments or turning points?</li>
<li>What emotions emerged?</li>
<li>What new understanding developed?</li>
<li>How does this connect to your trauma history?</li>
</ul>

<h3>Meaning-Making</h3>
<p>Supporting patients in finding significance:</p>
<ul>
<li>What does this experience mean to you?</li>
<li>How does this change your understanding of yourself or your trauma?</li>
<li>What feels different now?</li>
<li>What beliefs have shifted?</li>
</ul>

<h3>Behavioral Integration</h3>
<p>Translating insights into action:</p>
<ul>
<li>What changes do you want to make based on this experience?</li>
<li>What specific steps can you take this week?</li>
<li>What obstacles might arise and how will you address them?</li>
<li>Who can support you in making these changes?</li>
</ul>

<h2>3. Common Integration Themes in PTSD Treatment</h2>

<h3>Self-Compassion</h3>
<p>Many patients with PTSD carry shame and self-blame. MDMA sessions often facilitate:</p>
<ul>
<li>Recognition that the trauma was not their fault</li>
<li>Compassion for their past self</li>
<li>Understanding of survival responses</li>
<li>Release of carried shame</li>
</ul>

<p><strong>Integration focus:</strong> Sustaining self-compassion in daily life; identifying and challenging self-critical patterns.</p>

<h3>Safety and Trust</h3>
<p>Trauma often shatters sense of safety. Sessions may bring:</p>
<ul>
<li>Experiences of genuine safety with therapists</li>
<li>Revised relationship with fear</li>
<li>Capacity for trust restored</li>
<li>Discrimination between past danger and present safety</li>
</ul>

<p><strong>Integration focus:</strong> Generalizing safety experiences to daily life; building trusting relationships carefully.</p>

<h3>Grief and Loss</h3>
<p>Processing trauma often involves grief:</p>
<ul>
<li>Mourning the self before trauma</li>
<li>Grieving relationships damaged by trauma</li>
<li>Losses associated with the traumatic event</li>
<li>Time lost to PTSD symptoms</li>
</ul>

<p><strong>Integration focus:</strong> Supporting healthy grief process; creating meaning from loss.</p>

<h3>Forgiveness</h3>
<p>Complex and individual process that may include:</p>
<ul>
<li>Forgiveness of self</li>
<li>Complex feelings toward perpetrators</li>
<li>Understanding vs. condoning</li>
<li>Releasing resentment for own freedom</li>
</ul>

<p><strong>Integration focus:</strong> Patient's autonomous process; avoiding pressure to forgive; distinguishing types of forgiveness.</p>

<h2>4. Managing Integration Challenges</h2>

<h3>Emotional Aftereffects</h3>
<p>Common post-session experiences:</p>
<ul>
<li><strong>Emotional sensitivity:</strong> Normal for 1-2 weeks; self-care important</li>
<li><strong>"Comedown" effects:</strong> Mild fatigue or mood dip in days 2-5; usually resolves</li>
<li><strong>Continued processing:</strong> Dreams, spontaneous memories, emotions arising</li>
</ul>

<h3>When to Be Concerned</h3>
<p>Red flags requiring additional support:</p>
<ul>
<li>Severe depression lasting more than 2 weeks</li>
<li>Suicidal ideation (escalation from baseline)</li>
<li>Dissociative symptoms increasing</li>
<li>Functional impairment not improving</li>
<li>Destabilization of relationships/work</li>
</ul>

<h3>Supporting Relational Changes</h3>
<p>PTSD treatment often shifts relationships:</p>
<ul>
<li>Partners may struggle to adapt to patient's changes</li>
<li>Family dynamics may shift as patient asserts boundaries</li>
<li>Some relationships may end</li>
<li>New capacity for intimacy may emerge</li>
</ul>

<p><strong>Therapist role:</strong> Support navigation of these changes; consider couples/family sessions; normalize adjustment periods.</p>

<h2>5. The Three-Session Arc</h2>

<h3>Session 1: Opening</h3>
<p>Often characterized by:</p>
<ul>
<li>Building trust in the process</li>
<li>Initial trauma processing</li>
<li>Foundational insights emerging</li>
<li>May feel incomplete (more to do)</li>
</ul>

<h3>Session 2: Deepening</h3>
<p>Often characterized by:</p>
<ul>
<li>Deeper access to traumatic material</li>
<li>More challenging content may emerge</li>
<li>Building on first session's foundation</li>
<li>Greater trust allows more vulnerability</li>
</ul>

<h3>Session 3: Integration/Completion</h3>
<p>Often characterized by:</p>
<ul>
<li>Consolidation of processing</li>
<li>Sense of resolution (though healing continues)</li>
<li>Looking forward rather than back</li>
<li>Preparation for life after treatment</li>
</ul>

<h2>6. Treatment Completion</h2>

<h3>Assessing Outcomes</h3>
<ul>
<li>Re-administer CAPS-5 assessment</li>
<li>Review symptom changes and functional improvement</li>
<li>Discuss patient's subjective sense of change</li>
<li>Identify remaining work (if any)</li>
</ul>

<h3>Transition Planning</h3>
<ul>
<li>Maintenance strategies for gains achieved</li>
<li>Ongoing therapy needs (if any)</li>
<li>Support resources and community connections</li>
<li>Signs that additional treatment might be needed</li>
<li>Door left open for future contact</li>
</ul>

<h2>Summary</h2>
<p>Integration is where MDMA sessions become lasting therapeutic change. Effective integration requires skilled support for narrative construction, meaning-making, and behavioral change while navigating the common themes and challenges specific to PTSD treatment. The three-session arc provides a structure for progressive deepening and eventual completion.</p>
`
    },
    {
      title: 'Module Assessment: MDMA-AT Protocols',
      description: 'Test your knowledge of MDMA-assisted therapy',
      duration: 45,
      orderIndex: 7,
      contentType: 'quiz',
      quizData: {
        title: 'MDMA-Assisted Therapy Assessment',
        passingScore: 80,
        questions: [
          {
            question: 'What is the primary mechanism of action for MDMA?',
            options: ['5-HT2A receptor agonism', 'Monoamine release (serotonin, dopamine, norepinephrine)', 'GABA receptor potentiation', 'Opioid receptor activation'],
            correctAnswer: 'Monoamine release (serotonin, dopamine, norepinephrine)',
            explanation: 'Unlike classic psychedelics, MDMA works primarily through releasing stored monoamines, particularly serotonin.'
          },
          {
            question: 'In the MAPS MDMA-assisted therapy protocol, how many medicine sessions are typically conducted?',
            options: ['1', '2', '3', '5'],
            correctAnswer: '3',
            explanation: 'The MAPS protocol includes three MDMA medicine sessions, spaced 3-5 weeks apart, with preparation and integration sessions between.'
          },
          {
            question: 'What is the typical duration of an MDMA medicine session?',
            options: ['2-3 hours', '4-5 hours', '6-8 hours', '10-12 hours'],
            correctAnswer: '6-8 hours',
            explanation: 'MDMA medicine sessions typically last 6-8 hours to allow for full processing of the experience.'
          },
          {
            question: 'Which medication interaction poses the greatest risk with MDMA?',
            options: ['Antihistamines', 'MAOIs', 'Proton pump inhibitors', 'Acetaminophen'],
            correctAnswer: 'MAOIs',
            explanation: 'MAOIs combined with MDMA can cause life-threatening hypertensive crisis and serotonin syndrome.'
          },
          {
            question: 'The "Inner Healing Intelligence" framework refers to:',
            options: ['The therapist\'s clinical knowledge', 'Artificial intelligence tools in therapy', 'The patient\'s innate capacity for healing', 'Neuroimaging-guided interventions'],
            correctAnswer: 'The patient\'s innate capacity for healing',
            explanation: 'Inner Healing Intelligence refers to the belief that patients have an innate capacity for healing that can be supported but not directed by therapists.'
          },
          {
            question: 'What is the blood pressure threshold that would require intervention during an MDMA session?',
            options: ['BP > 120/80', 'BP > 140/90', 'BP > 160/100', 'BP > 180/110'],
            correctAnswer: 'BP > 180/110',
            explanation: 'BP > 180/110 requires intervention with rest, reassurance, and possibly antihypertensive medication.'
          },
          {
            question: 'The optional supplemental MDMA dose is typically offered:',
            options: ['At the start of the session', '30 minutes after initial dose', '1.5-2.5 hours after initial dose', 'At the end of the session'],
            correctAnswer: '1.5-2.5 hours after initial dose',
            explanation: 'The supplemental dose (40-60mg) is offered 1.5-2.5 hours after the initial dose to extend the peak therapeutic window.'
          },
          {
            question: 'Which is an absolute exclusion criterion for MDMA-assisted therapy?',
            options: ['History of depression', 'Current SSRI use (with washout)', 'Personal history of schizophrenia', 'Previous MDMA recreational use'],
            correctAnswer: 'Personal history of schizophrenia',
            explanation: 'Personal history of schizophrenia is an absolute contraindication due to risk of precipitating psychosis.'
          },
          {
            question: 'How soon after an MDMA session should the first integration session occur?',
            options: ['Same day', 'Within 24-72 hours', '1 week later', '2 weeks later'],
            correctAnswer: 'Within 24-72 hours',
            explanation: 'The first integration session should occur within 24-72 hours while the experience is fresh and the patient may still be in an enhanced processing state.'
          },
          {
            question: 'In Phase 3 trials, what percentage of participants no longer met PTSD criteria after MDMA-assisted therapy?',
            options: ['Approximately 30%', 'Approximately 50%', 'Approximately 67-71%', 'Approximately 90%'],
            correctAnswer: 'Approximately 67-71%',
            explanation: 'Phase 3 trials showed 67-71% of participants no longer met PTSD diagnostic criteria, compared to 32-48% with placebo.'
          },
          {
            question: 'The MAPS protocol utilizes which therapist configuration?',
            options: ['Single therapist', 'Male-female co-therapy team', 'Group therapy with multiple patients', 'Rotating therapist model'],
            correctAnswer: 'Male-female co-therapy team',
            explanation: 'The MAPS protocol uses a male-female co-therapy team to provide diverse presence and as a safety measure.'
          },
          {
            question: 'What is the primary therapeutic stance during the peak phase of an MDMA session?',
            options: ['Active direction of the experience', 'Constant verbal processing', 'Supportive presence with minimal intervention', 'Systematic desensitization exercises'],
            correctAnswer: 'Supportive presence with minimal intervention',
            explanation: 'During peak phases, therapists maintain supportive presence while following the patient\'s process, intervening only when needed.'
          },
          {
            question: 'MDMA facilitates trauma processing partly through:',
            options: ['Increasing fear response to enhance exposure', 'Complete memory suppression', 'Reduced amygdala reactivity and fear extinction enhancement', 'Blocking all emotional response'],
            correctAnswer: 'Reduced amygdala reactivity and fear extinction enhancement',
            explanation: 'MDMA reduces amygdala threat response and enhances fear extinction, allowing trauma to be processed with less overwhelming fear.'
          },
          {
            question: 'SSRIs require washout before MDMA-assisted therapy because:',
            options: ['They enhance MDMA effects dangerously', 'They pose serotonin syndrome risk and blunt MDMA effects', 'They cause dangerous hypotension', 'They extend MDMA duration excessively'],
            correctAnswer: 'They pose serotonin syndrome risk and blunt MDMA effects',
            explanation: 'SSRIs both reduce MDMA\'s therapeutic effects and increase serotonin syndrome risk when combined.'
          },
          {
            question: 'In the three-session arc, Session 2 is often characterized by:',
            options: ['Building initial trust', 'Deeper processing and more challenging content', 'Focus on treatment completion', 'Primarily psychoeducation'],
            correctAnswer: 'Deeper processing and more challenging content',
            explanation: 'Session 2 often involves deeper access to traumatic material as trust is established, sometimes with more challenging content emerging.'
          }
        ]
      }
    },
    {
      title: 'Case Studies and Clinical Applications',
      description: 'Real-world treatment examples and discussion',
      duration: 90,
      orderIndex: 8,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      title: 'Final Examination: MDMA-AT Certification',
      description: 'Comprehensive examination for CME credit',
      duration: 60,
      orderIndex: 9,
      contentType: 'quiz',
      quizData: {
        title: 'MDMA-Assisted Therapy Final Examination',
        passingScore: 80,
        questions: [
          {
            question: 'A patient with well-controlled hypertension (currently 135/85 on medication) wants to pursue MDMA-assisted therapy. The appropriate response is:',
            options: ['Automatically exclude due to any hypertension history', 'Proceed with enhanced cardiovascular monitoring', 'Discontinue antihypertensive medication for the sessions', 'Require cardiology clearance regardless of control'],
            correctAnswer: 'Proceed with enhanced cardiovascular monitoring',
            explanation: 'Well-controlled hypertension is a relative, not absolute, contraindication. Enhanced monitoring during sessions is appropriate.'
          },
          {
            question: 'During an MDMA session, a patient begins crying intensely while discussing childhood abuse. The appropriate immediate response is:',
            options: ['Stop the session immediately', 'Provide calm presence and allow the process to continue', 'Distract the patient to different topics', 'Administer a benzodiazepine'],
            correctAnswer: 'Provide calm presence and allow the process to continue',
            explanation: 'Emotional release is often therapeutic. The therapist should provide supportive presence while trusting the patient\'s process.'
          },
          {
            question: 'Oxytocin release during MDMA experiences may contribute to:',
            options: ['Visual hallucinations', 'Enhanced prosocial connection and trust', 'Increased blood pressure', 'Memory impairment'],
            correctAnswer: 'Enhanced prosocial connection and trust',
            explanation: 'Oxytocin release likely contributes to MDMA\'s prosocial effects and the enhanced therapeutic alliance observed during sessions.'
          },
          {
            question: 'A patient reports persistent depressed mood 3 weeks after their first MDMA session. What is the most appropriate response?',
            options: ['This is expected; no action needed', 'Cancel remaining MDMA sessions', 'Assess severity and consider additional support or evaluation', 'Immediately start antidepressant medication'],
            correctAnswer: 'Assess severity and consider additional support or evaluation',
            explanation: 'While some mood effects can occur, persistent depression at 3 weeks warrants assessment to distinguish normal processing from concerning symptoms.'
          },
          {
            question: 'The primary purpose of the preparation sessions is:',
            options: ['To administer the MDMA', 'To build therapeutic alliance and prepare for the medicine experience', 'To conduct exposure therapy', 'To complete paperwork only'],
            correctAnswer: 'To build therapeutic alliance and prepare for the medicine experience',
            explanation: 'Preparation sessions establish the therapeutic relationship, review expectations, and psychologically prepare the patient for medicine sessions.'
          },
          {
            question: 'If a patient refuses the supplemental MDMA dose during a session, the therapist should:',
            options: ['Insist on taking it for full protocol adherence', 'Respect the decision and continue supporting their process', 'End the session early', 'Document non-compliance'],
            correctAnswer: 'Respect the decision and continue supporting their process',
            explanation: 'Patient autonomy is paramount. Refusing the supplemental dose is a valid choice that should be respected.'
          },
          {
            question: 'Memory reconsolidation theory suggests MDMA may help PTSD by:',
            options: ['Erasing traumatic memories completely', 'Opening a window where traumatic memories can be updated with new information', 'Creating false positive memories', 'Blocking all memory recall'],
            correctAnswer: 'Opening a window where traumatic memories can be updated with new information',
            explanation: 'Memory reconsolidation theory proposes that MDMA enables traumatic memories to be modified with new emotional/contextual information during recall.'
          },
          {
            question: 'When a patient reports that MDMA sessions have improved their relationship with their partner, integration should:',
            options: ['Dismiss this as off-topic from PTSD treatment', 'Support exploration of how relational improvements connect to trauma healing', 'Suggest the patient is avoiding trauma work', 'Focus only on symptom checklists'],
            correctAnswer: 'Support exploration of how relational improvements connect to trauma healing',
            explanation: 'Relational improvements are often integral to trauma healing and should be explored as part of comprehensive integration.'
          },
          {
            question: 'The CAPS-5 assessment is re-administered:',
            options: ['Before each MDMA session', 'Only at initial intake', 'After treatment completion to assess outcomes', 'During MDMA sessions'],
            correctAnswer: 'After treatment completion to assess outcomes',
            explanation: 'The CAPS-5 is the gold-standard outcome measure, re-administered after treatment to objectively assess symptom change.'
          },
          {
            question: 'Physical touch during MDMA sessions requires:',
            options: ['Prohibition in all circumstances', 'Prior discussion and active in-the-moment consent', 'Written permission from a third party', 'Therapist initiation based on clinical judgment'],
            correctAnswer: 'Prior discussion and active in-the-moment consent',
            explanation: 'Touch must be discussed in advance during preparation and actively consented to in the moment, respecting patient autonomy.'
          },
          {
            question: 'A combat veteran expresses feeling "defective" for having PTSD. Integration work should include:',
            options: ['Agreeing that military should have prepared them better', 'Exploring self-compassion and normalizing stress responses to trauma', 'Challenging them to be stronger', 'Avoiding the topic to prevent distress'],
            correctAnswer: 'Exploring self-compassion and normalizing stress responses to trauma',
            explanation: 'Self-blame is common in PTSD. Integration should support self-compassion and understanding that PTSD is a normal response to abnormal circumstances.'
          },
          {
            question: 'The term "entactogen" used to describe MDMA refers to its ability to:',
            options: ['Produce visual hallucinations', 'Generate touch within - enhanced emotional connection', 'Cause amnesia', 'Induce sleep'],
            correctAnswer: 'Generate touch within - enhanced emotional connection',
            explanation: 'Entactogen means "generating touch within," referring to MDMA\'s characteristic effect of enhanced emotional openness and connection.'
          },
          {
            question: 'A patient becomes very quiet and still during the peak of their MDMA session. The appropriate response is:',
            options: ['Interrupt to check if they are okay', 'Allow the process to continue while monitoring safety', 'Assume they are having a bad experience', 'Play louder music to stimulate them'],
            correctAnswer: 'Allow the process to continue while monitoring safety',
            explanation: 'Quiet, internal processing is common and often valuable. The therapist should maintain presence and monitor safety without unnecessary interruption.'
          },
          {
            question: 'Phase 2 trials showed that at 12-month follow-up, what percentage no longer met PTSD criteria?',
            options: ['32%', '54%', '68%', '90%'],
            correctAnswer: '68%',
            explanation: 'Phase 2 trials showed that 68% of participants no longer met PTSD criteria at 12-month follow-up, demonstrating durability of treatment effects.'
          },
          {
            question: 'If a patient\'s blood pressure reaches 185/115 during a session, the first-line response is:',
            options: ['Immediately transport to emergency room', 'Continue session unchanged', 'Encourage rest, reassurance, and monitor closely with antihypertensive available', 'Administer stimulant to counteract'],
            correctAnswer: 'Encourage rest, reassurance, and monitor closely with antihypertensive available',
            explanation: 'Moderate BP elevation is expected. Rest and reassurance often help, with antihypertensive medication available if needed.'
          }
        ]
      }
    }
  ]
};

export default { course2 };
