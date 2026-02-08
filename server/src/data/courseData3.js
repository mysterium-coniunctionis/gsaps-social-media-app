/**
 * GSAPS Professional Course Data - Part 3
 * Ketamine-Assisted Therapy and Neuroscience
 */

// ============================================
// COURSE 3: Ketamine-Assisted Psychotherapy
// Post-Licensure - 16 CE Credits (APA/CME)
// ============================================

export const course3 = {
  title: 'Ketamine-Assisted Psychotherapy: Clinical Practice',
  slug: 'ketamine-assisted-psychotherapy',
  description: 'Evidence-based training in ketamine-assisted psychotherapy for treatment-resistant depression, anxiety, and PTSD. Covers pharmacology, patient selection, session protocols, integration, and the unique considerations of working with a legal psychedelic medicine in clinical practice.',
  category: 'clinical-research',
  level: 'advanced',
  thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
  duration: 960,
  ceCredits: 16,
  ceType: 'APA',
  instructorName: 'Dr. Phil Wolfson, MD',
  instructorBio: 'Psychiatrist and pioneer in ketamine-assisted psychotherapy. Author of "The Ketamine Papers" and founder of the Ketamine Research Foundation.',
  learningObjectives: [
    'Explain ketamine pharmacology and mechanisms relevant to psychiatric treatment',
    'Apply appropriate screening criteria for ketamine therapy candidates',
    'Conduct ketamine-assisted psychotherapy sessions using evidence-based protocols',
    'Differentiate between IV ketamine, IM, and sublingual/oral routes for clinical applications',
    'Integrate ketamine experiences into ongoing psychotherapeutic treatment',
    'Navigate legal and ethical considerations unique to ketamine practice'
  ],
  lessons: [
    {
      title: 'Ketamine Pharmacology and Neuroscience',
      description: 'Mechanisms of action and therapeutic effects',
      duration: 75,
      orderIndex: 1,
      contentType: 'text',
      content: `
<h1>Ketamine Pharmacology and Neuroscience</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Describe ketamine's mechanisms of action relevant to psychiatric treatment</li>
<li>Explain the glutamate hypothesis of depression</li>
<li>Understand ketamine's unique pharmacological profile</li>
<li>Differentiate between racemic ketamine and esketamine</li>
</ul>

<h2>1. Introduction to Ketamine</h2>

<h3>Historical Context</h3>
<p>Ketamine was synthesized in 1962 and approved by the FDA in 1970 as an anesthetic. Its psychiatric potential was recognized in 2000 when Berman et al. published the first RCT showing rapid antidepressant effects. Since then, ketamine has emerged as a revolutionary treatment for treatment-resistant depression.</p>

<h3>Current Status</h3>
<ul>
<li>FDA-approved as an anesthetic (racemic ketamine)</li>
<li>Esketamine (Spravato) FDA-approved for treatment-resistant depression (2019)</li>
<li>Off-label use of ketamine for depression, anxiety, PTSD widely practiced</li>
<li>Only currently legal psychedelic-adjacent medicine in US psychiatry</li>
</ul>

<h2>2. Mechanism of Action</h2>

<h3>NMDA Receptor Antagonism</h3>
<p>Ketamine's primary mechanism is non-competitive antagonism of NMDA (N-methyl-D-aspartate) glutamate receptors. This differs fundamentally from traditional antidepressants:</p>
<ul>
<li>Traditional antidepressants: Modulate monoamines (serotonin, norepinephrine)</li>
<li>Ketamine: Modulates glutamate, the brain's primary excitatory neurotransmitter</li>
</ul>

<h3>The Glutamate Surge Theory</h3>
<p>NMDA blockade on GABAergic interneurons leads to:</p>
<ol>
<li>Disinhibition of glutamatergic neurons</li>
<li>Surge of glutamate release</li>
<li>Activation of AMPA receptors</li>
<li>Downstream BDNF release and mTOR pathway activation</li>
<li>Rapid synaptogenesis and neuroplasticity</li>
</ol>

<h3>Neuroplasticity Effects</h3>
<p>Ketamine promotes structural and functional brain changes:</p>
<ul>
<li>Increased dendritic spine density (within 24 hours)</li>
<li>Restored synaptic connections in prefrontal cortex</li>
<li>Enhanced BDNF (brain-derived neurotrophic factor)</li>
<li>Normalization of default mode network activity</li>
</ul>

<h2>3. Pharmacokinetic Profiles by Route</h2>

<table>
<tr><th>Route</th><th>Onset</th><th>Peak</th><th>Duration</th><th>Bioavailability</th></tr>
<tr><td>IV</td><td>Seconds</td><td>1-5 min</td><td>15-30 min</td><td>100%</td></tr>
<tr><td>IM</td><td>2-5 min</td><td>20-30 min</td><td>45-60 min</td><td>93%</td></tr>
<tr><td>Sublingual</td><td>10-15 min</td><td>30-45 min</td><td>1-2 hours</td><td>25-30%</td></tr>
<tr><td>Oral</td><td>15-30 min</td><td>30-60 min</td><td>1-2 hours</td><td>16-24%</td></tr>
<tr><td>Intranasal</td><td>5-10 min</td><td>20-30 min</td><td>45-60 min</td><td>45-50%</td></tr>
</table>

<h2>4. Racemic Ketamine vs. Esketamine</h2>

<h3>Stereochemistry</h3>
<p>Ketamine exists as two mirror-image molecules (enantiomers):</p>
<ul>
<li><strong>S-ketamine (esketamine):</strong> Approximately 3-4x more potent at NMDA receptor</li>
<li><strong>R-ketamine (arketamine):</strong> Less potent at NMDA but may have unique antidepressant properties</li>
<li><strong>Racemic ketamine:</strong> 50/50 mixture of both enantiomers</li>
</ul>

<h3>Clinical Implications</h3>
<table>
<tr><th>Factor</th><th>Racemic Ketamine</th><th>Esketamine (Spravato)</th></tr>
<tr><td>FDA approval</td><td>Off-label for depression</td><td>Approved for TRD</td></tr>
<tr><td>Route</td><td>IV, IM, sublingual, oral</td><td>Intranasal only</td></tr>
<tr><td>Setting</td><td>Various clinical settings</td><td>REMS-certified facilities only</td></tr>
<tr><td>Cost</td><td>Generic, lower cost</td><td>Branded, higher cost</td></tr>
<tr><td>Flexibility</td><td>Dose and route adjustable</td><td>Fixed dosing protocol</td></tr>
</table>

<h2>5. Subjective Effects</h2>

<h3>Dose-Dependent Experience Spectrum</h3>
<ul>
<li><strong>Sub-perceptual (< 0.2 mg/kg IV):</strong> Mild mood lift, no altered perception</li>
<li><strong>Psycholytic (0.2-0.5 mg/kg IV):</strong> Altered perception, emotional opening, mild dissociation</li>
<li><strong>Psychedelic (0.5-1.0 mg/kg IV):</strong> Significant altered states, ego dissolution, transcendent experiences</li>
<li><strong>Anesthetic (> 1.0 mg/kg IV):</strong> Unconsciousness (not therapeutic for psychiatric use)</li>
</ul>

<h3>Common Experiential Features</h3>
<ul>
<li>Dissociation (feeling separate from body/environment)</li>
<li>Altered time perception</li>
<li>Visual phenomena (geometric patterns, dreamlike imagery)</li>
<li>Profound relaxation or floating sensation</li>
<li>Emotional release or insight</li>
<li>Mystical or transcendent experiences (at higher doses)</li>
</ul>

<h2>6. Antidepressant Mechanisms</h2>

<h3>Rapid vs. Sustained Effects</h3>
<p>Ketamine produces two distinct phases of antidepressant effect:</p>

<h4>Acute Phase (hours to days)</h4>
<ul>
<li>Glutamate surge and AMPA activation</li>
<li>BDNF release</li>
<li>Opioid system involvement (mu-receptor partial agonism)</li>
<li>Anti-inflammatory effects</li>
</ul>

<h4>Sustained Phase (days to weeks)</h4>
<ul>
<li>Synaptogenesis and spine formation</li>
<li>Neural circuit modification</li>
<li>Default mode network changes</li>
<li>Psychological integration of experiences</li>
</ul>

<h2>Summary</h2>
<p>Ketamine represents a paradigm shift in psychiatric pharmacology, working through glutamate modulation rather than monoamines. Its rapid neuroplasticity-promoting effects and unique experiential properties make it valuable both as a standalone treatment and as an adjunct to psychotherapy. Understanding these mechanisms informs clinical decision-making about dosing, timing, and integration strategies.</p>
`
    },
    {
      title: 'Patient Selection and Medical Screening',
      description: 'Comprehensive assessment for ketamine therapy',
      duration: 60,
      orderIndex: 2,
      contentType: 'text',
      content: `
<h1>Patient Selection and Medical Screening</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Apply inclusion and exclusion criteria for ketamine-assisted therapy</li>
<li>Conduct appropriate medical and psychiatric evaluations</li>
<li>Understand medication interactions specific to ketamine</li>
<li>Assess patient appropriateness for different ketamine protocols</li>
</ul>

<h2>1. Indications for Ketamine-Assisted Therapy</h2>

<h3>Primary Indications</h3>
<ul>
<li><strong>Treatment-Resistant Depression (TRD):</strong> Failed ≥2 adequate antidepressant trials</li>
<li><strong>Major Depressive Disorder with suicidal ideation:</strong> Rapid antisuicidal effects</li>
<li><strong>Bipolar Depression:</strong> When mood stabilizer maintained</li>
</ul>

<h3>Emerging Indications</h3>
<ul>
<li>PTSD (especially treatment-resistant)</li>
<li>Anxiety disorders (GAD, social anxiety)</li>
<li>OCD (treatment-resistant)</li>
<li>Chronic pain with depression comorbidity</li>
<li>Substance use disorders (especially alcohol, cocaine)</li>
</ul>

<h2>2. Exclusion Criteria</h2>

<h3>Absolute Medical Contraindications</h3>
<table>
<tr><th>Condition</th><th>Rationale</th></tr>
<tr><td>Uncontrolled hypertension</td><td>Ketamine increases BP; risk of crisis</td></tr>
<tr><td>Unstable cardiovascular disease</td><td>Hemodynamic stress</td></tr>
<tr><td>History of intracranial hemorrhage</td><td>Increased ICP risk</td></tr>
<tr><td>Severe hepatic impairment</td><td>Metabolism concerns</td></tr>
<tr><td>Active substance abuse (excluding cannabis)</td><td>Safety and efficacy concerns</td></tr>
<tr><td>Pregnancy</td><td>Unknown fetal effects</td></tr>
<tr><td>Known ketamine allergy</td><td>Allergic reaction risk</td></tr>
</table>

<h3>Psychiatric Contraindications</h3>
<table>
<tr><th>Condition</th><th>Rationale</th></tr>
<tr><td>Active psychosis</td><td>Risk of exacerbation</td></tr>
<tr><td>Schizophrenia (history)</td><td>May precipitate relapse</td></tr>
<tr><td>Active manic episode</td><td>Risk of destabilization</td></tr>
<tr><td>Severe dissociative disorders</td><td>May worsen dissociation</td></tr>
</table>

<h2>3. Medical Screening Protocol</h2>

<h3>Required Assessments</h3>
<ol>
<li><strong>Medical History:</strong> Cardiovascular, neurological, hepatic, renal</li>
<li><strong>Vital Signs:</strong> BP (seated and standing), HR, SpO2</li>
<li><strong>Physical Examination:</strong> Cardiac and neurological focus</li>
<li><strong>ECG:</strong> If cardiovascular risk factors present</li>
<li><strong>Laboratory Tests (as indicated):</strong>
  <ul>
    <li>Liver function tests</li>
    <li>Renal function</li>
    <li>Pregnancy test</li>
  </ul>
</li>
</ol>

<h3>Cardiovascular Monitoring</h3>
<p>Ketamine typically increases:</p>
<ul>
<li>Systolic BP: 15-25% increase</li>
<li>Heart rate: 10-20% increase</li>
<li>Peak effects: 5-15 minutes post-administration (IV/IM)</li>
</ul>

<h2>4. Medication Considerations</h2>

<h3>Medications That May Reduce Ketamine Efficacy</h3>
<table>
<tr><th>Medication</th><th>Interaction</th><th>Recommendation</th></tr>
<tr><td>Benzodiazepines</td><td>May blunt ketamine effects</td><td>Hold dose day of treatment if safe</td></tr>
<tr><td>Lamotrigine</td><td>May reduce antidepressant effects</td><td>Consider timing; data mixed</td></tr>
</table>

<h3>Medications Requiring Caution</h3>
<table>
<tr><th>Medication</th><th>Concern</th><th>Recommendation</th></tr>
<tr><td>MAOIs</td><td>Theoretical interaction; limited data</td><td>Caution; experienced prescriber</td></tr>
<tr><td>CNS depressants</td><td>Additive sedation</td><td>Monitor closely</td></tr>
<tr><td>Sympathomimetics</td><td>Additive cardiovascular effects</td><td>Hold stimulants day of treatment</td></tr>
</table>

<h3>Generally Safe to Continue</h3>
<ul>
<li>SSRIs/SNRIs (may enhance effects)</li>
<li>Mood stabilizers (lithium, valproate)</li>
<li>Atypical antipsychotics (monitor for sedation)</li>
<li>Bupropion</li>
</ul>

<h2>5. Special Populations</h2>

<h3>Older Adults</h3>
<ul>
<li>Start with lower doses</li>
<li>Closer cardiovascular monitoring</li>
<li>Longer observation periods</li>
<li>Cognitive baseline assessment</li>
</ul>

<h3>Patients with Chronic Pain</h3>
<ul>
<li>May have opioid tolerance</li>
<li>Lower starting doses may still be effective</li>
<li>Consider pain as both indication and complication</li>
</ul>

<h3>Patients with Trauma History</h3>
<ul>
<li>Dissociative experiences may be triggering</li>
<li>Strong therapeutic relationship essential</li>
<li>Consider starting with lower doses</li>
<li>Emphasize psychotherapy component</li>
</ul>

<h2>Summary</h2>
<p>Comprehensive screening ensures patient safety and identifies those most likely to benefit from ketamine-assisted therapy. The relatively favorable safety profile of ketamine compared to other psychedelics allows for broader inclusion criteria, though careful attention to cardiovascular health and psychiatric stability remains essential.</p>
`
    },
    {
      title: 'Routes of Administration: Comparing Approaches',
      description: 'IV, IM, sublingual, and intranasal protocols',
      duration: 60,
      orderIndex: 3,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    {
      title: 'The Ketamine-Assisted Psychotherapy Session',
      description: 'Conducting therapeutic sessions with ketamine',
      duration: 90,
      orderIndex: 4,
      contentType: 'text',
      content: `
<h1>The Ketamine-Assisted Psychotherapy Session</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Structure ketamine-assisted psychotherapy sessions effectively</li>
<li>Apply appropriate therapeutic interventions during altered states</li>
<li>Manage common experiences and challenges during sessions</li>
<li>Differentiate between infusion-only and KAP approaches</li>
</ul>

<h2>1. Models of Ketamine Treatment</h2>

<h3>Ketamine Infusion Therapy (Medical Model)</h3>
<ul>
<li>Focus on ketamine as pharmacological intervention</li>
<li>Minimal psychological support during infusion</li>
<li>Comfortable environment but not psychotherapeutically oriented</li>
<li>Standard in many ketamine clinics</li>
</ul>

<h3>Ketamine-Assisted Psychotherapy (KAP)</h3>
<ul>
<li>Integrates ketamine with structured psychotherapy</li>
<li>Preparation and integration sessions included</li>
<li>Active therapeutic engagement during altered state</li>
<li>Leverages ketamine's neuroplasticity window for psychological work</li>
</ul>

<h2>2. Session Structure (KAP Model)</h2>

<h3>Pre-Session (30 minutes)</h3>
<ol>
<li>Welcome and settling in</li>
<li>Vital signs check</li>
<li>Review current state (sleep, food, medications, concerns)</li>
<li>Set intention for the session</li>
<li>Review safety and support signals</li>
</ol>

<h3>Medicine Administration Phase</h3>
<p>Timing varies by route:</p>
<ul>
<li><strong>IV infusion:</strong> 40-minute infusion; effects begin within minutes</li>
<li><strong>IM injection:</strong> Effects within 2-5 minutes; peak 20-30 minutes</li>
<li><strong>Sublingual:</strong> Hold 10-15 minutes; effects begin 15-20 minutes</li>
</ul>

<h3>Peak Experience (30-60 minutes)</h3>
<ul>
<li>Primary altered state experience</li>
<li>Therapist maintains supportive presence</li>
<li>Interventions as clinically indicated</li>
<li>Music typically playing</li>
<li>Eye mask available</li>
</ul>

<h3>Return Phase (30-60 minutes)</h3>
<ul>
<li>Gradual return to baseline</li>
<li>Verbal processing begins</li>
<li>Meaning-making and insight consolidation</li>
<li>Vital signs monitoring continues</li>
</ul>

<h3>Post-Session (30 minutes)</h3>
<ul>
<li>Integration discussion</li>
<li>Safety assessment before discharge</li>
<li>Self-care instructions</li>
<li>Confirm transport home</li>
</ul>

<h2>3. Therapeutic Approach During Sessions</h2>

<h3>Core Principles</h3>
<ul>
<li><strong>Presence over intervention:</strong> Be with, not doing to</li>
<li><strong>Follow the patient's process:</strong> Let material emerge naturally</li>
<li><strong>Trust the medicine:</strong> Ketamine facilitates its own process</li>
<li><strong>Minimize unnecessary talk:</strong> Silence can be therapeutic</li>
<li><strong>Support without leading:</strong> Reflect rather than interpret</li>
</ul>

<h3>Types of Interventions</h3>

<h4>Grounding Interventions</h4>
<ul>
<li>Verbal reassurance ("You're safe, I'm here")</li>
<li>Orienting statements ("You're in my office, you've taken ketamine")</li>
<li>Breath guidance</li>
<li>Physical grounding (feet on floor, hands on armrests)</li>
</ul>

<h4>Process-Oriented Interventions</h4>
<ul>
<li>Gentle inquiries ("What are you experiencing?")</li>
<li>Encouraging approach ("Can you stay with that feeling?")</li>
<li>Somatic awareness ("Where do you notice that in your body?")</li>
<li>Intention reminders (when helpful)</li>
</ul>

<h4>Integration-Oriented Interventions</h4>
<ul>
<li>Meaning questions ("What does this mean to you?")</li>
<li>Connection to life ("How does this relate to your depression?")</li>
<li>Future orientation ("What might change based on this?")</li>
</ul>

<h2>4. Common Experiences and Responses</h2>

<h3>Dissociative Experiences</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Feeling separate from body</li>
<li>Observing self from outside</li>
<li>"K-hole" experiences at higher doses</li>
</ul>
<p><strong>Therapist response:</strong></p>
<ul>
<li>Normalize if distressing</li>
<li>Ground if overwhelming</li>
<li>Allow if productive</li>
</ul>

<h3>Emotional Release</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Crying, laughter, or both</li>
<li>Accessing grief or anger</li>
<li>Feelings of love or connection</li>
</ul>
<p><strong>Therapist response:</strong></p>
<ul>
<li>Create space for expression</li>
<li>Offer tissues, reassurance</li>
<li>Validate without rescuing</li>
</ul>

<h3>Mystical/Transcendent Experiences</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Unity experiences</li>
<li>Ego dissolution</li>
<li>Encounters with "entities" or imagery</li>
<li>Sense of profound meaning</li>
</ul>
<p><strong>Therapist response:</strong></p>
<ul>
<li>Maintain quiet, supportive presence</li>
<li>Don't interpret during experience</li>
<li>Process meaning afterward</li>
</ul>

<h3>Challenging Experiences</h3>
<p><strong>What to expect:</strong></p>
<ul>
<li>Anxiety or fear</li>
<li>Confusion or disorientation</li>
<li>Nausea</li>
<li>Difficult memories surfacing</li>
</ul>
<p><strong>Therapist response:</strong></p>
<ul>
<li>Ground and reassure</li>
<li>"This will pass"</li>
<li>Breathwork</li>
<li>Adjust music if needed</li>
<li>Ondansetron for nausea</li>
</ul>

<h2>5. Safety Monitoring</h2>

<h3>Vital Signs Protocol</h3>
<table>
<tr><th>Timepoint</th><th>Measurement</th></tr>
<tr><td>Baseline</td><td>BP, HR, SpO2</td></tr>
<tr><td>Peak (15-30 min)</td><td>BP, HR</td></tr>
<tr><td>Hourly thereafter</td><td>BP, HR as indicated</td></tr>
<tr><td>Pre-discharge</td><td>BP, HR, mental status</td></tr>
</table>

<h3>Discharge Criteria</h3>
<ul>
<li>Vital signs near baseline</li>
<li>Oriented and alert</li>
<li>Able to ambulate safely</li>
<li>No nausea/vomiting</li>
<li>Responsible adult for transport</li>
<li>No driving for 24 hours</li>
</ul>

<h2>Summary</h2>
<p>Ketamine-assisted psychotherapy combines the pharmacological benefits of ketamine with structured therapeutic support. The therapist's role balances supportive presence with strategic intervention, leveraging the neuroplasticity window for psychological growth. Effective KAP requires both clinical competence and cultivated therapeutic presence.</p>
`
    },
    {
      title: 'Integration and Treatment Planning',
      description: 'Maximizing therapeutic benefit from ketamine treatment',
      duration: 60,
      orderIndex: 5,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      title: 'Module Assessment: Ketamine Therapy',
      description: 'Test your knowledge of ketamine-assisted treatment',
      duration: 30,
      orderIndex: 6,
      contentType: 'quiz',
      quizData: {
        title: 'Ketamine-Assisted Psychotherapy Assessment',
        passingScore: 75,
        questions: [
          {
            question: 'Ketamine\'s primary mechanism of action is:',
            options: ['Serotonin reuptake inhibition', 'NMDA receptor antagonism', 'Dopamine agonism', 'GABA potentiation'],
            correctAnswer: 'NMDA receptor antagonism',
            explanation: 'Ketamine is a non-competitive NMDA receptor antagonist, which leads to glutamate modulation and downstream neuroplasticity effects.'
          },
          {
            question: 'The rapid antidepressant effects of ketamine are thought to involve:',
            options: ['Serotonin depletion', 'Glutamate surge and AMPA receptor activation', 'Dopamine blockade', 'GABA inhibition'],
            correctAnswer: 'Glutamate surge and AMPA receptor activation',
            explanation: 'NMDA blockade leads to glutamate release, AMPA activation, BDNF release, and rapid synaptogenesis.'
          },
          {
            question: 'Which route of ketamine administration has 100% bioavailability?',
            options: ['Oral', 'Sublingual', 'Intravenous', 'Intranasal'],
            correctAnswer: 'Intravenous',
            explanation: 'IV administration bypasses first-pass metabolism, providing 100% bioavailability and most predictable dosing.'
          },
          {
            question: 'What is an absolute contraindication for ketamine therapy?',
            options: ['History of depression', 'Current SSRI use', 'Uncontrolled hypertension', 'Previous ketamine experience'],
            correctAnswer: 'Uncontrolled hypertension',
            explanation: 'Ketamine increases blood pressure and heart rate, making uncontrolled hypertension an absolute contraindication.'
          },
          {
            question: 'Esketamine (Spravato) differs from racemic ketamine in that it:',
            options: ['Is less potent at NMDA receptors', 'Is FDA-approved for treatment-resistant depression', 'Can be administered at home', 'Has no dissociative effects'],
            correctAnswer: 'Is FDA-approved for treatment-resistant depression',
            explanation: 'Esketamine received FDA approval in 2019 for TRD and must be administered in REMS-certified healthcare settings.'
          },
          {
            question: 'During a ketamine session, the therapist should primarily:',
            options: ['Provide constant verbal guidance', 'Maintain supportive presence with minimal unnecessary intervention', 'Conduct structured exposure exercises', 'Keep the patient engaged in conversation'],
            correctAnswer: 'Maintain supportive presence with minimal unnecessary intervention',
            explanation: 'KAP emphasizes being with rather than doing to, allowing the patient\'s process to unfold with minimal interference.'
          },
          {
            question: 'Benzodiazepines should be held before ketamine treatment because:',
            options: ['They cause dangerous interactions', 'They may blunt ketamine\'s therapeutic effects', 'They extend ketamine duration', 'They increase blood pressure'],
            correctAnswer: 'They may blunt ketamine\'s therapeutic effects',
            explanation: 'Benzodiazepines can reduce ketamine\'s antidepressant and experiential effects, so holding them (when safe) is often recommended.'
          },
          {
            question: 'The neuroplasticity effects of ketamine include:',
            options: ['Decreased BDNF', 'Reduced synaptic connections', 'Increased dendritic spine density', 'Neuronal death'],
            correctAnswer: 'Increased dendritic spine density',
            explanation: 'Ketamine promotes synaptogenesis and increases dendritic spine density, often within 24 hours of administration.'
          },
          {
            question: 'When a patient experiences intense dissociation during ketamine treatment, the therapist should:',
            options: ['Immediately terminate the session', 'Ground the patient if it\'s overwhelming, allow if it\'s productive', 'Administer more ketamine', 'Ignore it completely'],
            correctAnswer: 'Ground the patient if it\'s overwhelming, allow if it\'s productive',
            explanation: 'Dissociation is expected with ketamine; the response depends on whether it\'s distressing or therapeutically productive.'
          },
          {
            question: 'Ketamine-Assisted Psychotherapy (KAP) differs from ketamine infusion therapy primarily in:',
            options: ['The dose of ketamine used', 'The integration of structured psychotherapy with ketamine treatment', 'The route of administration', 'The setting (clinic vs. hospital)'],
            correctAnswer: 'The integration of structured psychotherapy with ketamine treatment',
            explanation: 'KAP integrates preparation, medicine sessions with therapeutic support, and integration into a comprehensive treatment model.'
          }
        ]
      }
    },
    {
      title: 'Legal, Ethical, and Business Considerations',
      description: 'Building a ketamine therapy practice',
      duration: 75,
      orderIndex: 7,
      contentType: 'text',
      content: `
<h1>Legal, Ethical, and Business Considerations</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Navigate the legal landscape of ketamine prescribing and administration</li>
<li>Apply ethical principles to ketamine practice</li>
<li>Understand collaborative care models for KAP</li>
<li>Address informed consent requirements specific to ketamine</li>
</ul>

<h2>1. Legal Framework</h2>

<h3>Ketamine's Legal Status</h3>
<ul>
<li><strong>DEA Schedule III:</strong> Controlled substance with accepted medical use</li>
<li><strong>FDA-approved:</strong> For anesthesia (1970)</li>
<li><strong>Off-label use:</strong> Legal for prescribers to use for depression, anxiety, etc.</li>
<li><strong>State variations:</strong> Some states have additional regulations</li>
</ul>

<h3>Who Can Prescribe/Administer</h3>
<ul>
<li><strong>Prescribe:</strong> MD, DO, NP, PA (scope varies by state)</li>
<li><strong>Administer:</strong> Licensed healthcare providers under medical supervision</li>
<li><strong>Psychotherapy:</strong> Licensed mental health professionals (collaboration model)</li>
</ul>

<h3>Esketamine (Spravato) REMS Requirements</h3>
<ul>
<li>Must be administered in certified healthcare settings</li>
<li>Patient must be monitored for 2 hours post-administration</li>
<li>Prescribers and pharmacies must be certified</li>
<li>Patients must enroll in REMS program</li>
</ul>

<h2>2. Ethical Considerations</h2>

<h3>Informed Consent</h3>
<p>Patients must understand:</p>
<ul>
<li>Off-label status of ketamine for psychiatric use</li>
<li>Expected effects and duration</li>
<li>Potential risks and side effects</li>
<li>Alternative treatments available</li>
<li>Abuse potential and dependency risks</li>
<li>Limitations of current evidence</li>
</ul>

<h3>Scope of Practice</h3>
<ul>
<li>Mental health clinicians without prescribing authority cannot administer ketamine</li>
<li>Collaborative models require clear role delineation</li>
<li>Medical oversight essential for safe practice</li>
<li>Stay within competence boundaries</li>
</ul>

<h3>Avoiding Harm</h3>
<ul>
<li>Proper screening to identify contraindications</li>
<li>Appropriate dosing and monitoring</li>
<li>Clear protocols for adverse events</li>
<li>Avoid dependency through appropriate treatment frequency</li>
</ul>

<h2>3. Collaborative Practice Models</h2>

<h3>The Psychiatrist-Therapist Team</h3>
<ul>
<li><strong>Psychiatrist role:</strong> Screening, prescribing, medical monitoring</li>
<li><strong>Therapist role:</strong> Preparation, in-session support, integration</li>
<li><strong>Shared:</strong> Treatment planning, outcome assessment</li>
</ul>

<h3>Integration with Ongoing Care</h3>
<ul>
<li>KAP as part of comprehensive treatment plan</li>
<li>Communication with other providers</li>
<li>Coordination with medication management</li>
<li>Continuity of therapeutic relationship</li>
</ul>

<h2>4. Documentation Requirements</h2>

<h3>Essential Documentation</h3>
<ul>
<li>Informed consent (detailed, signed)</li>
<li>Medical screening results</li>
<li>Treatment rationale (off-label justification)</li>
<li>Session notes (preparation, medicine, integration)</li>
<li>Vital signs monitoring records</li>
<li>Outcome measures (standardized assessments)</li>
<li>Adverse events (if any)</li>
</ul>

<h2>Summary</h2>
<p>Ketamine practice requires careful attention to legal requirements, ethical obligations, and collaborative relationships. The off-label status of ketamine for psychiatric use places additional responsibility on practitioners to ensure informed consent and appropriate documentation. Building a sustainable practice involves clear protocols, proper training, and commitment to patient safety.</p>
`
    },
    {
      title: 'Final Examination: Ketamine-Assisted Psychotherapy',
      description: 'Comprehensive examination for CE credit',
      duration: 45,
      orderIndex: 8,
      contentType: 'quiz',
      quizData: {
        title: 'KAP Final Examination',
        passingScore: 80,
        questions: [
          {
            question: 'A patient with treatment-resistant depression and well-controlled type 2 diabetes inquires about ketamine therapy. The appropriate response is:',
            options: ['Exclude due to diabetes', 'Proceed with standard protocols and appropriate monitoring', 'Require endocrinology clearance', 'Recommend only esketamine'],
            correctAnswer: 'Proceed with standard protocols and appropriate monitoring',
            explanation: 'Well-controlled diabetes is not a contraindication for ketamine therapy.'
          },
          {
            question: 'During a ketamine session, a patient reports feeling like they\'re "dying" but appears physiologically stable. The best response is:',
            options: ['Immediately call emergency services', 'Provide calm reassurance that they\'re safe and this is temporary', 'Administer reversal agent', 'End the session immediately'],
            correctAnswer: 'Provide calm reassurance that they\'re safe and this is temporary',
            explanation: 'Ego dissolution experiences can feel like dying but are normal with ketamine; calm reassurance while monitoring safety is appropriate.'
          },
          {
            question: 'The "glutamate surge" theory of ketamine\'s antidepressant effect proposes that:',
            options: ['Ketamine directly increases glutamate reuptake', 'NMDA blockade leads to downstream AMPA activation and neuroplasticity', 'Glutamate depletion causes mood improvement', 'Ketamine replaces glutamate in synapses'],
            correctAnswer: 'NMDA blockade leads to downstream AMPA activation and neuroplasticity',
            explanation: 'NMDA blockade on interneurons leads to glutamate release, AMPA activation, BDNF expression, and synaptogenesis.'
          },
          {
            question: 'A patient on therapeutic doses of venlafaxine (SNRI) is referred for ketamine therapy. The appropriate approach is:',
            options: ['Discontinue venlafaxine before starting ketamine', 'Proceed with ketamine while continuing venlafaxine', 'Reduce venlafaxine to half dose', 'Switch to SSRI first'],
            correctAnswer: 'Proceed with ketamine while continuing venlafaxine',
            explanation: 'SSRIs and SNRIs are generally safe to continue during ketamine treatment and may enhance effects.'
          },
          {
            question: 'The primary reason for the 24-hour driving restriction after ketamine treatment is:',
            options: ['Legal liability only', 'Residual cognitive and motor impairment affecting safe driving', 'To encourage rest', 'Insurance requirements'],
            correctAnswer: 'Residual cognitive and motor impairment affecting safe driving',
            explanation: 'Ketamine can cause residual effects on coordination, reaction time, and judgment that make driving unsafe.'
          },
          {
            question: 'Which statement about sublingual ketamine is accurate?',
            options: ['It has higher bioavailability than IV', 'It produces effects more rapidly than IV', 'It typically has 25-30% bioavailability and slower onset', 'It is not appropriate for KAP'],
            correctAnswer: 'It typically has 25-30% bioavailability and slower onset',
            explanation: 'Sublingual ketamine has lower bioavailability (25-30%) and slower onset than IV, but offers accessibility advantages.'
          },
          {
            question: 'In the KAP model, the optimal frequency of ketamine sessions is typically:',
            options: ['Daily for maximum effect', 'Weekly to biweekly during acute phase, then as needed', 'Monthly regardless of response', 'Once only with no repeats'],
            correctAnswer: 'Weekly to biweekly during acute phase, then as needed',
            explanation: 'Initial treatment often involves 4-6 sessions over 2-3 weeks, with maintenance sessions based on individual response.'
          },
          {
            question: 'A patient experiences significant nausea during their ketamine session. The first-line intervention is:',
            options: ['Discontinue ketamine permanently', 'Administer ondansetron', 'Increase the ketamine dose', 'Convert to IV administration'],
            correctAnswer: 'Administer ondansetron',
            explanation: 'Ondansetron is an effective antiemetic for ketamine-induced nausea and is commonly used in KAP settings.'
          },
          {
            question: 'For a patient with active suicidal ideation, ketamine\'s potential benefit includes:',
            options: ['There is no evidence for suicidal ideation', 'Rapid reduction in suicidal ideation within hours', 'Permanent cure of suicidality', 'Prevention of all future suicidal thoughts'],
            correctAnswer: 'Rapid reduction in suicidal ideation within hours',
            explanation: 'Ketamine has demonstrated rapid antisuicidal effects, often within hours, making it valuable for acute suicidal crises.'
          },
          {
            question: 'Informed consent for off-label ketamine use must include:',
            options: ['Only the benefits of treatment', 'Information about off-label status, risks, benefits, and alternatives', 'Guarantee of cure', 'Only comparison to FDA-approved options'],
            correctAnswer: 'Information about off-label status, risks, benefits, and alternatives',
            explanation: 'Off-label prescribing requires comprehensive informed consent about the non-FDA-approved use for this indication.'
          },
          {
            question: 'R-ketamine (arketamine) differs from S-ketamine in that it:',
            options: ['Is more potent at NMDA receptors', 'Is FDA-approved while S-ketamine is not', 'May have unique antidepressant properties despite lower NMDA potency', 'Has no psychoactive effects'],
            correctAnswer: 'May have unique antidepressant properties despite lower NMDA potency',
            explanation: 'R-ketamine is less potent at NMDA receptors but emerging research suggests it may have distinct antidepressant mechanisms.'
          },
          {
            question: 'The primary role of the therapist during the peak phase of a KAP session is:',
            options: ['Conducting structured CBT interventions', 'Maintaining supportive presence while following the patient\'s process', 'Keeping the patient verbally engaged throughout', 'Documenting every statement'],
            correctAnswer: 'Maintaining supportive presence while following the patient\'s process',
            explanation: 'During peak experiences, the therapist\'s role is to be present and supportive rather than directive.'
          }
        ]
      }
    }
  ]
};

// ============================================
// COURSE 4: Psychedelic Neuroscience
// Doctoral Level - 15 CE Credits (APA)
// ============================================

export const course4 = {
  title: 'Neuroscience of Psychedelic States',
  slug: 'neuroscience-psychedelic-states',
  description: 'An advanced doctoral-level exploration of the neuroscience underlying psychedelic experiences. Covers neuroimaging findings, receptor pharmacology, network neuroscience, predictive processing models, and the neural correlates of therapeutic outcomes.',
  category: 'neuroscience',
  level: 'advanced',
  thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
  duration: 900,
  ceCredits: 15,
  ceType: 'APA',
  instructorName: 'Dr. Robin Carhart-Harris, PhD',
  instructorBio: 'Head of the Centre for Psychedelic Research at Imperial College London. Pioneer in psychedelic neuroimaging and the Entropic Brain hypothesis.',
  learningObjectives: [
    'Interpret neuroimaging findings from psychedelic research studies',
    'Explain the Entropic Brain hypothesis and its implications',
    'Describe the role of the default mode network in psychedelic states',
    'Apply predictive processing models to understand psychedelic effects',
    'Connect neural mechanisms to therapeutic outcomes',
    'Critically evaluate current theories of psychedelic action'
  ],
  lessons: [
    {
      title: 'Foundations of Psychedelic Neuroscience',
      description: 'Research methods and key concepts',
      duration: 60,
      orderIndex: 1,
      contentType: 'text',
      content: `
<h1>Foundations of Psychedelic Neuroscience</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Understand the neuroimaging methods used in psychedelic research</li>
<li>Review the history of psychedelic neuroscience</li>
<li>Identify key brain structures and networks relevant to psychedelic effects</li>
</ul>

<h2>1. Introduction</h2>
<p>The modern renaissance of psychedelic research has been characterized by sophisticated neuroimaging studies that reveal how these substances alter brain function. This lesson provides the foundational knowledge necessary for understanding the neuroscience of psychedelic states.</p>

<h2>2. Neuroimaging Methods in Psychedelic Research</h2>

<h3>Functional MRI (fMRI)</h3>
<p>Measures blood oxygen level-dependent (BOLD) signal as a proxy for neural activity:</p>
<ul>
<li><strong>Advantages:</strong> High spatial resolution, whole-brain coverage</li>
<li><strong>Limitations:</strong> Indirect measure, temporal lag, motion sensitivity</li>
<li><strong>Applications:</strong> Resting-state connectivity, task-based activation</li>
</ul>

<h3>Electroencephalography (EEG)</h3>
<p>Records electrical activity from the scalp:</p>
<ul>
<li><strong>Advantages:</strong> High temporal resolution, portable, relatively inexpensive</li>
<li><strong>Limitations:</strong> Poor spatial resolution, susceptible to artifacts</li>
<li><strong>Applications:</strong> Spectral analysis, connectivity measures, event-related potentials</li>
</ul>

<h3>Magnetoencephalography (MEG)</h3>
<p>Measures magnetic fields produced by neural activity:</p>
<ul>
<li><strong>Advantages:</strong> High temporal and reasonable spatial resolution</li>
<li><strong>Limitations:</strong> Expensive, limited availability</li>
<li><strong>Applications:</strong> Source localization, oscillatory dynamics</li>
</ul>

<h3>Positron Emission Tomography (PET)</h3>
<p>Measures distribution of radioactive tracers:</p>
<ul>
<li><strong>Advantages:</strong> Direct measurement of receptor binding, metabolism</li>
<li><strong>Limitations:</strong> Radiation exposure, lower temporal resolution</li>
<li><strong>Applications:</strong> Receptor occupancy studies, metabolic mapping</li>
</ul>

<h2>3. Key Brain Structures and Networks</h2>

<h3>The Default Mode Network (DMN)</h3>
<p>A set of brain regions active during rest and self-referential thought:</p>
<ul>
<li>Medial prefrontal cortex (mPFC)</li>
<li>Posterior cingulate cortex (PCC)</li>
<li>Angular gyrus</li>
<li>Lateral temporal cortex</li>
<li>Hippocampal formation</li>
</ul>
<p><strong>Relevance:</strong> Psychedelics consistently reduce DMN activity and connectivity, correlating with ego dissolution experiences.</p>

<h3>The Salience Network</h3>
<p>Involved in detecting and filtering salient stimuli:</p>
<ul>
<li>Anterior insula</li>
<li>Dorsal anterior cingulate cortex (dACC)</li>
</ul>
<p><strong>Relevance:</strong> May mediate altered salience attribution during psychedelic states.</p>

<h3>Visual Cortex</h3>
<p>Primary and association visual areas:</p>
<ul>
<li>V1 (primary visual cortex)</li>
<li>Higher visual areas (V2, V3, V4, etc.)</li>
</ul>
<p><strong>Relevance:</strong> Psychedelics increase visual cortex activity and alter its connectivity with other regions.</p>

<h3>Claustrum</h3>
<p>A thin sheet of neurons beneath the insula:</p>
<ul>
<li>High density of 5-HT2A receptors</li>
<li>Hypothesized role in consciousness integration</li>
<li>May be important for psychedelic effects</li>
</ul>

<h2>4. Serotonin System Review</h2>

<h3>5-HT2A Receptor Distribution</h3>
<p>High density in:</p>
<ul>
<li>Layer V pyramidal neurons of cortex</li>
<li>Prefrontal cortex</li>
<li>Claustrum</li>
<li>Visual cortex</li>
</ul>

<h3>Receptor Signaling</h3>
<p>5-HT2A activation triggers:</p>
<ul>
<li>Gq protein coupling</li>
<li>Phospholipase C activation</li>
<li>Intracellular calcium release</li>
<li>Downstream effects on gene expression and plasticity</li>
</ul>

<h2>Summary</h2>
<p>Understanding psychedelic neuroscience requires familiarity with neuroimaging methods, key brain structures and networks, and the serotonergic system. This foundation enables interpretation of the research findings covered in subsequent lessons.</p>
`
    },
    {
      title: 'The Entropic Brain Hypothesis',
      description: 'Brain complexity, entropy, and consciousness',
      duration: 75,
      orderIndex: 2,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      title: 'Default Mode Network and Ego Dissolution',
      description: 'Neural correlates of self and its dissolution',
      duration: 90,
      orderIndex: 3,
      contentType: 'text',
      content: `
<h1>Default Mode Network and Ego Dissolution</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Describe the default mode network and its functions</li>
<li>Explain psychedelic effects on DMN activity and connectivity</li>
<li>Understand the neural correlates of ego dissolution</li>
<li>Connect DMN changes to therapeutic outcomes</li>
</ul>

<h2>1. The Default Mode Network</h2>

<h3>Discovery and Definition</h3>
<p>The DMN was identified by Marcus Raichle and colleagues through PET studies showing brain regions more active at rest than during tasks. Key characteristics:</p>
<ul>
<li>Active during rest, mind-wandering, and self-referential thought</li>
<li>Deactivates during attention-demanding external tasks</li>
<li>Involved in autobiographical memory, future simulation, theory of mind</li>
<li>Central hub in brain's functional architecture</li>
</ul>

<h3>DMN and Self-Referential Processing</h3>
<p>The DMN is associated with:</p>
<ul>
<li>Sense of self and personal identity</li>
<li>Autobiographical memory retrieval</li>
<li>Imagining future scenarios</li>
<li>Thinking about others' mental states</li>
<li>Default mode of consciousness</li>
</ul>

<h2>2. Psychedelic Effects on the DMN</h2>

<h3>Consistent Findings Across Studies</h3>
<p>Neuroimaging studies with psilocybin, LSD, ayahuasca, and DMT consistently show:</p>
<ul>
<li><strong>Decreased DMN activity:</strong> Reduced BOLD signal in key DMN nodes</li>
<li><strong>Decreased DMN connectivity:</strong> Reduced correlation between DMN regions</li>
<li><strong>Increased connectivity between DMN and other networks:</strong> Novel inter-network connections</li>
</ul>

<h3>Landmark Studies</h3>
<h4>Carhart-Harris et al. (2012) - Psilocybin fMRI</h4>
<p>Key findings:</p>
<ul>
<li>Psilocybin decreased cerebral blood flow and BOLD signal</li>
<li>Largest decreases in DMN hubs (mPFC, PCC)</li>
<li>Magnitude of DMN suppression correlated with subjective effects</li>
</ul>

<h4>Palhano-Fontes et al. (2015) - Ayahuasca fMRI</h4>
<p>Showed decreased DMN activity and connectivity during ayahuasca experience, replicating psilocybin findings.</p>

<h4>Carhart-Harris et al. (2016) - LSD Multimodal Study</h4>
<p>Combined fMRI, MEG, and arterial spin labeling:</p>
<ul>
<li>Decreased DMN integrity correlated with ego dissolution</li>
<li>Increased global connectivity</li>
<li>Visual cortex activity correlated with hallucinations</li>
</ul>

<h2>3. Ego Dissolution</h2>

<h3>Definition and Phenomenology</h3>
<p>Ego dissolution refers to the temporary loss of the sense of self as separate from the world:</p>
<ul>
<li>Boundary dissolution between self and environment</li>
<li>Loss of narrative self-identity</li>
<li>Experiences of unity or oneness</li>
<li>Transcendence of space and time</li>
</ul>

<h3>Neural Correlates</h3>
<p>Studies link ego dissolution to:</p>
<ul>
<li>DMN disintegration (reduced connectivity within DMN)</li>
<li>Increased entropy in brain activity</li>
<li>Novel global connectivity patterns</li>
<li>Reduced alpha oscillations</li>
</ul>

<h3>The Ego Dissolution Inventory</h3>
<p>Standardized measure of ego dissolution with items reflecting:</p>
<ul>
<li>Experience of unity</li>
<li>Dissolution of sense of self</li>
<li>Altered sense of time</li>
<li>Feeling of transcendence</li>
</ul>

<h2>4. Therapeutic Implications</h2>

<h3>DMN and Depression</h3>
<p>Research shows DMN abnormalities in depression:</p>
<ul>
<li>Increased DMN connectivity (hyperconnectivity)</li>
<li>Rumination associated with DMN activity</li>
<li>Rigid, inflexible patterns of self-referential thought</li>
</ul>

<h3>The "Reset" Hypothesis</h3>
<p>Psychedelics may have therapeutic effects through:</p>
<ul>
<li>Disrupting pathological DMN patterns</li>
<li>Enabling new, healthier patterns to form</li>
<li>Breaking rigid loops of negative self-thought</li>
<li>Creating a "restart" for stuck brain patterns</li>
</ul>

<h3>Evidence for DMN Reset</h3>
<p>Carhart-Harris et al. (2017) showed:</p>
<ul>
<li>Post-psilocybin changes in DMN connectivity predicted clinical improvement</li>
<li>Patients showed more normalized DMN function after treatment</li>
<li>Acute DMN disruption may enable lasting reorganization</li>
</ul>

<h2>5. Beyond the DMN: Whole-Brain Effects</h2>

<h3>Global Integration Increase</h3>
<p>Psychedelics don't just affect the DMN:</p>
<ul>
<li>Increased communication between previously segregated networks</li>
<li>More entropic, less hierarchical brain organization</li>
<li>Novel connectivity patterns not seen in normal waking state</li>
</ul>

<h3>The Claustrum Hypothesis</h3>
<p>The claustrum has been proposed as a key site for psychedelic effects:</p>
<ul>
<li>Very high 5-HT2A receptor density</li>
<li>Proposed role in integrating conscious experience</li>
<li>May mediate psychedelic effects on consciousness</li>
</ul>

<h2>Summary</h2>
<p>The DMN plays a central role in self-referential processing and its disruption by psychedelics correlates with ego dissolution experiences. This DMN disruption may be key to therapeutic effects, particularly in depression where DMN hyperconnectivity is associated with rumination. Understanding these mechanisms informs both basic science and clinical application of psychedelic therapy.</p>
`
    },
    {
      title: 'Predictive Processing and Psychedelics',
      description: 'REBUS model and hierarchical prediction',
      duration: 75,
      orderIndex: 4,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      title: 'Neuroplasticity and Therapeutic Mechanisms',
      description: 'How psychedelics change the brain',
      duration: 60,
      orderIndex: 5,
      contentType: 'text',
      content: `
<h1>Neuroplasticity and Therapeutic Mechanisms</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Describe the neuroplasticity effects of psychedelics</li>
<li>Explain the role of BDNF and other growth factors</li>
<li>Connect structural brain changes to therapeutic outcomes</li>
<li>Understand the concept of the "critical period" reopening</li>
</ul>

<h2>1. Psychedelics as Plasticity Promoters</h2>

<h3>Definition of Neuroplasticity</h3>
<p>Neuroplasticity refers to the brain's ability to change structure and function:</p>
<ul>
<li><strong>Structural plasticity:</strong> Changes in dendritic spines, synapses, neural architecture</li>
<li><strong>Functional plasticity:</strong> Changes in synaptic strength, connectivity patterns</li>
<li><strong>Cognitive plasticity:</strong> Changes in thought patterns, beliefs, behaviors</li>
</ul>

<h3>Psychedelic-Induced Neuroplasticity</h3>
<p>Multiple studies demonstrate that psychedelics promote neuroplasticity:</p>
<ul>
<li>Increased dendritic spine density and complexity</li>
<li>Enhanced synaptogenesis</li>
<li>Elevated BDNF expression</li>
<li>Activation of mTOR pathway</li>
</ul>

<h2>2. Molecular Mechanisms</h2>

<h3>BDNF (Brain-Derived Neurotrophic Factor)</h3>
<p>BDNF is a key molecule in learning and plasticity:</p>
<ul>
<li>Promotes neuron survival and growth</li>
<li>Enhances synaptic plasticity</li>
<li>Involved in memory formation</li>
<li>Often reduced in depression</li>
</ul>
<p>Psychedelics increase BDNF expression in key brain regions, potentially restoring plasticity compromised by chronic stress and depression.</p>

<h3>TrkB Receptor Activation</h3>
<p>Recent research suggests psychedelics may directly activate TrkB receptors:</p>
<ul>
<li>TrkB is the receptor for BDNF</li>
<li>Psychedelics may bind TrkB independently of 5-HT2A</li>
<li>This could contribute to plasticity effects</li>
</ul>

<h3>mTOR Pathway</h3>
<p>The mechanistic target of rapamycin (mTOR) pathway:</p>
<ul>
<li>Central regulator of protein synthesis and cell growth</li>
<li>Activated by psychedelics</li>
<li>Drives synaptogenesis</li>
<li>Necessary for sustained antidepressant effects</li>
</ul>

<h2>3. Structural Brain Changes</h2>

<h3>Dendritic Spine Growth</h3>
<p>Ly et al. (2018) demonstrated:</p>
<ul>
<li>Psilocybin, LSD, and DMT increase dendritic spine density</li>
<li>Effects comparable to ketamine</li>
<li>Changes occur within 24 hours</li>
<li>Spines are more complex (mushroom-shaped)</li>
</ul>

<h3>Cortical Thickness Changes</h3>
<p>Preliminary evidence suggests psychedelic therapy may affect cortical thickness:</p>
<ul>
<li>Increased thickness in certain regions post-treatment</li>
<li>May reflect increased dendritic branching</li>
<li>Long-term studies ongoing</li>
</ul>

<h2>4. The "Critical Period" Hypothesis</h2>

<h3>Critical Periods in Development</h3>
<p>Critical periods are windows of enhanced plasticity during development:</p>
<ul>
<li>Example: Language acquisition in childhood</li>
<li>Example: Visual system development</li>
<li>Characterized by high plasticity and sensitivity to experience</li>
<li>Close with maturation, limiting adult plasticity</li>
</ul>

<h3>Psychedelics and Critical Period Reopening</h3>
<p>Recent research by Dölen and colleagues suggests psychedelics may reopen critical periods:</p>
<ul>
<li>MDMA reopens critical period for social reward learning in mice</li>
<li>Other psychedelics may have similar effects</li>
<li>Could explain why psychedelics make psychological change easier</li>
<li>Window of enhanced plasticity for therapeutic work</li>
</ul>

<h2>5. Implications for Therapy</h2>

<h3>The Plasticity Window</h3>
<p>The period following psychedelic administration may represent an opportunity:</p>
<ul>
<li>Enhanced capacity for learning and change</li>
<li>Importance of integration during this window</li>
<li>New experiences and insights may be more readily encoded</li>
<li>Supports intensive therapeutic work post-session</li>
</ul>

<h3>Sustained Change</h3>
<p>Neuroplasticity may explain sustained benefits:</p>
<ul>
<li>Structural changes outlast acute drug effects</li>
<li>New synapses and connectivity patterns persist</li>
<li>Provides substrate for lasting psychological change</li>
</ul>

<h2>Summary</h2>
<p>Psychedelics are powerful promoters of neuroplasticity, increasing BDNF, activating growth pathways, and promoting synaptogenesis. These effects may "reopen critical periods" of enhanced learning capability, providing a biological basis for the lasting psychological changes observed following psychedelic therapy. Understanding these mechanisms underscores the importance of integration and the therapeutic potential of these compounds.</p>
`
    },
    {
      title: 'Final Examination: Psychedelic Neuroscience',
      description: 'Comprehensive assessment for doctoral credit',
      duration: 60,
      orderIndex: 6,
      contentType: 'quiz',
      quizData: {
        title: 'Neuroscience of Psychedelic States Final Examination',
        passingScore: 80,
        questions: [
          {
            question: 'The Entropic Brain hypothesis proposes that psychedelics:',
            options: ['Decrease brain entropy and increase order', 'Increase brain entropy, enabling novel states of consciousness', 'Have no effect on brain entropy', 'Only affect entropy in the visual cortex'],
            correctAnswer: 'Increase brain entropy, enabling novel states of consciousness',
            explanation: 'The Entropic Brain hypothesis proposes that psychedelics increase brain entropy, enabling more flexible, less constrained states of consciousness.'
          },
          {
            question: 'The default mode network is associated with:',
            options: ['Motor control', 'Self-referential thought and autobiographical memory', 'Visual processing', 'Auditory perception'],
            correctAnswer: 'Self-referential thought and autobiographical memory',
            explanation: 'The DMN is active during rest and involved in self-referential processing, including sense of self, autobiographical memory, and future simulation.'
          },
          {
            question: 'Psychedelics consistently produce which effect on the DMN?',
            options: ['Increased activity and connectivity', 'Decreased activity and connectivity', 'No change', 'Increased activity but decreased connectivity'],
            correctAnswer: 'Decreased activity and connectivity',
            explanation: 'Multiple neuroimaging studies show psychedelics decrease both DMN activity and within-network connectivity.'
          },
          {
            question: 'Ego dissolution experiences correlate with:',
            options: ['Increased DMN connectivity', 'DMN disintegration and reduced connectivity', 'No change in brain function', 'Only visual cortex activation'],
            correctAnswer: 'DMN disintegration and reduced connectivity',
            explanation: 'The intensity of ego dissolution experiences correlates with the degree of DMN disintegration observed in neuroimaging.'
          },
          {
            question: 'BDNF (Brain-Derived Neurotrophic Factor) is important because:',
            options: ['It causes psychedelic effects directly', 'It promotes neuroplasticity, synaptic growth, and is reduced in depression', 'It blocks 5-HT2A receptors', 'It has no relevance to psychedelic therapy'],
            correctAnswer: 'It promotes neuroplasticity, synaptic growth, and is reduced in depression',
            explanation: 'BDNF promotes neuroplasticity and neuron survival; its reduction in depression may be addressed by psychedelics which increase BDNF expression.'
          },
          {
            question: 'The claustrum is of interest in psychedelic neuroscience because:',
            options: ['It has no 5-HT2A receptors', 'It has very high 5-HT2A receptor density and may integrate conscious experience', 'It is only involved in motor control', 'It shows no response to psychedelics'],
            correctAnswer: 'It has very high 5-HT2A receptor density and may integrate conscious experience',
            explanation: 'The claustrum has the highest density of 5-HT2A receptors in the brain and has been proposed as important for integrating conscious experience.'
          },
          {
            question: 'The REBUS model proposes that psychedelics work by:',
            options: ['Strengthening top-down predictions', 'Relaxing high-level priors and allowing more bottom-up information', 'Eliminating all predictions', 'Only affecting low-level sensory processing'],
            correctAnswer: 'Relaxing high-level priors and allowing more bottom-up information',
            explanation: 'REBUS (RElaxed Beliefs Under pSychedelics) proposes that psychedelics relax the constraints of high-level predictions, allowing more bottom-up sensory information to influence perception.'
          },
          {
            question: 'Research on psychedelic-induced neuroplasticity has shown:',
            options: ['Decreased dendritic spine density', 'Increased dendritic spine density and complexity within 24 hours', 'No structural changes', 'Changes only after weeks of treatment'],
            correctAnswer: 'Increased dendritic spine density and complexity within 24 hours',
            explanation: 'Ly et al. demonstrated that psychedelics increase dendritic spine density and complexity within 24 hours of administration.'
          },
          {
            question: 'The "critical period reopening" hypothesis suggests that psychedelics:',
            options: ['Close developmental windows', 'May reopen windows of enhanced plasticity normally limited to development', 'Only affect adult brains in negative ways', 'Have no effect on plasticity'],
            correctAnswer: 'May reopen windows of enhanced plasticity normally limited to development',
            explanation: 'Research suggests psychedelics may reopen critical periods of enhanced plasticity, potentially explaining their ability to facilitate lasting psychological change.'
          },
          {
            question: 'In depression, the DMN typically shows:',
            options: ['Decreased connectivity (hypoconnectivity)', 'Increased connectivity (hyperconnectivity) associated with rumination', 'No abnormalities', 'Complete absence of activity'],
            correctAnswer: 'Increased connectivity (hyperconnectivity) associated with rumination',
            explanation: 'Depression is associated with DMN hyperconnectivity, linked to excessive rumination and rigid negative self-referential thought patterns.'
          },
          {
            question: 'The therapeutic "reset" hypothesis proposes that psychedelics help depression by:',
            options: ['Strengthening pathological DMN patterns', 'Disrupting pathological patterns and enabling healthier reorganization', 'Having no effect on brain networks', 'Permanently eliminating DMN function'],
            correctAnswer: 'Disrupting pathological patterns and enabling healthier reorganization',
            explanation: 'The reset hypothesis proposes that psychedelics disrupt stuck, pathological brain patterns (like DMN hyperconnectivity in depression) and enable healthier patterns to form.'
          },
          {
            question: 'Global brain connectivity during psychedelic states:',
            options: ['Decreases throughout the brain', 'Increases, with novel connections between typically segregated networks', 'Remains unchanged', 'Only increases in motor areas'],
            correctAnswer: 'Increases, with novel connections between typically segregated networks',
            explanation: 'Psychedelics increase global brain connectivity, with novel connections forming between networks that don\'t typically communicate, contributing to novel perceptions and insights.'
          }
        ]
      }
    }
  ]
};

export default { course3, course4 };
