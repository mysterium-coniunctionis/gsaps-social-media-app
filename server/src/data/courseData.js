/**
 * GSAPS Professional Course Data
 * Complete CE/CME courses for graduate, doctoral, postdoc, and post-licensure education
 */

// ============================================
// COURSE 1: Foundations of Psychedelic-Assisted Therapy
// Graduate Level - 12 CE Credits (APA)
// ============================================

export const course1 = {
  title: 'Foundations of Psychedelic-Assisted Therapy',
  slug: 'foundations-psychedelic-therapy',
  description: 'A comprehensive graduate-level introduction to psychedelic-assisted therapy covering historical context, pharmacology, neuroscience, therapeutic frameworks, safety protocols, and ethical considerations. This foundational course prepares mental health professionals for advanced training in psychedelic medicine.',
  category: 'psychedelic-therapy',
  level: 'intermediate',
  thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
  duration: 720,
  ceCredits: 12,
  ceType: 'APA',
  instructorName: 'Dr. Sarah Mitchell, PhD',
  instructorBio: 'Clinical psychologist and researcher with 15 years of experience in psychedelic science. Former lead investigator at Johns Hopkins Center for Psychedelic Research.',
  learningObjectives: [
    'Describe the historical and cultural context of psychedelic use in healing traditions',
    'Explain the pharmacology and neuroscience of major psychedelic compounds',
    'Identify appropriate screening criteria and contraindications for psychedelic therapy',
    'Apply evidence-based therapeutic frameworks in psychedelic-assisted sessions',
    'Implement safety protocols and risk management strategies',
    'Navigate ethical considerations unique to psychedelic therapy practice'
  ],
  lessons: [
    {
      title: 'Historical Foundations of Psychedelic Healing',
      description: 'From ancient traditions to modern research renaissance',
      duration: 60,
      orderIndex: 1,
      contentType: 'text',
      content: `
<h1>Historical Foundations of Psychedelic Healing</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Trace the historical use of psychedelics in indigenous healing traditions</li>
<li>Understand the first wave of psychedelic research (1950s-1970s)</li>
<li>Examine the factors leading to prohibition and research cessation</li>
<li>Describe the modern research renaissance and its key milestones</li>
</ul>

<h2>Introduction</h2>
<p>The therapeutic use of psychedelic substances spans thousands of years across diverse cultures worldwide. Understanding this rich historical context is essential for practitioners entering this field, as it provides perspective on both the potential and responsibilities of this work.</p>

<h2>1. Indigenous and Traditional Use</h2>

<h3>Mesoamerican Traditions</h3>
<p>Psilocybin mushrooms, known as "teonanácatl" (flesh of the gods) to the Aztecs, have been used in Mesoamerican cultures for at least 3,000 years. Archaeological evidence from Guatemala and Mexico includes "mushroom stones" dating to 1000 BCE. These substances were integral to religious ceremonies, healing rituals, and divination practices.</p>

<p>The Mazatec people of Oaxaca, Mexico, have maintained continuous use of psilocybin mushrooms for healing and spiritual purposes. María Sabina, a Mazatec curandera (healer), became known to the Western world through R. Gordon Wasson's 1957 Life magazine article, which sparked widespread interest in psychedelics.</p>

<h3>Amazonian Traditions</h3>
<p>Ayahuasca, a DMT-containing brew, has been used by indigenous peoples of the Amazon basin for centuries. Among groups such as the Shipibo-Conibo, ayahuasca serves as a cornerstone of healing practices, used for physical ailments, psychological distress, and spiritual development. The tradition involves rigorous training for practitioners (curanderos) and elaborate ceremonial frameworks.</p>

<h3>North American Traditions</h3>
<p>Peyote (containing mescaline) has been used by Native American peoples for thousands of years. The Native American Church, established in the late 19th century, formalized peyote use as a sacrament and continues to legally practice today under religious exemptions.</p>

<h2>2. The First Wave of Western Research (1950s-1970s)</h2>

<h3>Discovery of LSD</h3>
<p>In 1943, Swiss chemist Albert Hofmann accidentally discovered LSD's psychoactive properties while working at Sandoz Laboratories. His famous bicycle ride home after intentional self-experimentation marked the beginning of modern psychedelic research. Sandoz distributed LSD to researchers worldwide under the trade name "Delysid."</p>

<h3>Early Therapeutic Applications</h3>
<p>By the 1950s, research institutions across North America and Europe were investigating LSD for various therapeutic applications:</p>
<ul>
<li><strong>Psycholytic therapy:</strong> Used low doses repeatedly to facilitate psychoanalytic exploration</li>
<li><strong>Psychedelic therapy:</strong> Used high doses in controlled settings to induce transformative experiences</li>
<li><strong>Alcoholism treatment:</strong> Bill Wilson (AA co-founder) and Humphry Osmond pioneered LSD therapy for alcohol dependence</li>
</ul>

<p>Between 1950 and 1965, over 1,000 peer-reviewed papers were published on psychedelics, involving approximately 40,000 research participants. Studies showed promising results for depression, anxiety, addiction, and end-of-life distress.</p>

<h3>Key Research Centers</h3>
<ul>
<li><strong>Saskatchewan, Canada:</strong> Humphry Osmond and Abram Hoffer's research on alcoholism</li>
<li><strong>Spring Grove Hospital, Maryland:</strong> Stanislav Grof's work on psychedelic therapy protocols</li>
<li><strong>Harvard University:</strong> Timothy Leary and Richard Alpert's (Ram Dass) psilocybin research</li>
</ul>

<h2>3. Prohibition and Research Cessation</h2>

<h3>Cultural and Political Context</h3>
<p>The 1960s saw psychedelics move from clinical settings to counterculture use. Timothy Leary's advocacy for widespread use ("Turn on, tune in, drop out") alarmed authorities. Concerns about unsupervised use, adverse events, and association with anti-war movements led to increasing restrictions.</p>

<h3>Regulatory Response</h3>
<p>The Controlled Substances Act of 1970 placed LSD, psilocybin, and other psychedelics in Schedule I, indicating high abuse potential and no accepted medical use. This classification effectively ended legitimate research for decades. Similar restrictions were enacted internationally through the UN Convention on Psychotropic Substances (1971).</p>

<h2>4. The Modern Research Renaissance</h2>

<h3>Reopening the Door (1990s-2000s)</h3>
<p>In the 1990s, researchers began obtaining regulatory approval for carefully designed studies:</p>
<ul>
<li>1990: Rick Strassman receives FDA approval for DMT research at University of New Mexico</li>
<li>2000: Johns Hopkins begins psilocybin research with Roland Griffiths</li>
<li>2004: MAPS initiates MDMA-assisted therapy trials for PTSD</li>
</ul>

<h3>Key Milestones (2010s-Present)</h3>
<ul>
<li>2016: FDA grants "Breakthrough Therapy" designation to MDMA for PTSD</li>
<li>2018: FDA grants "Breakthrough Therapy" designation to psilocybin for depression</li>
<li>2020: Oregon passes Measure 109, legalizing psilocybin therapy</li>
<li>2021: MDMA Phase 3 trials show 67% of participants no longer meet PTSD criteria</li>
<li>2023: Australia approves MDMA and psilocybin for therapeutic use</li>
</ul>

<h2>Summary</h2>
<p>The history of psychedelic healing demonstrates both the enduring human interest in these substances and the importance of context, setting, and intention in their use. Modern practitioners inherit both the wisdom of traditional practices and the rigorous methodology of contemporary science. Understanding this lineage helps ground ethical practice and informed patient education.</p>

<h2>Reflection Questions</h2>
<ol>
<li>How might indigenous perspectives on psychedelic healing inform contemporary clinical practice?</li>
<li>What lessons from the prohibition era are relevant to current efforts to medicalize psychedelics?</li>
<li>How do you understand the relationship between therapeutic use and broader cultural/political contexts?</li>
</ol>
`
    },
    {
      title: 'Pharmacology of Classic Psychedelics',
      description: 'Mechanisms of action for psilocybin, LSD, and DMT',
      duration: 75,
      orderIndex: 2,
      contentType: 'text',
      content: `
<h1>Pharmacology of Classic Psychedelics</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Describe the primary mechanism of action for classic psychedelics</li>
<li>Explain the role of 5-HT2A receptor agonism in producing psychedelic effects</li>
<li>Compare pharmacokinetic profiles of psilocybin, LSD, and DMT</li>
<li>Understand the relationship between receptor binding and subjective effects</li>
</ul>

<h2>Introduction</h2>
<p>Classic psychedelics—including psilocybin, LSD, and DMT—share a primary mechanism of action: agonism at the serotonin 5-HT2A receptor. Understanding their pharmacology is essential for safe clinical application and informed patient education.</p>

<h2>1. Serotonin System Overview</h2>

<h3>The Serotonergic System</h3>
<p>Serotonin (5-hydroxytryptamine, 5-HT) is a neurotransmitter involved in mood regulation, cognition, perception, and numerous physiological processes. The serotonin system includes:</p>
<ul>
<li>At least 14 different receptor subtypes (5-HT1 through 5-HT7 families)</li>
<li>Cell bodies primarily in the raphe nuclei of the brainstem</li>
<li>Projections throughout the cortex, limbic system, and other brain regions</li>
</ul>

<h3>The 5-HT2A Receptor</h3>
<p>The 5-HT2A receptor is a G-protein coupled receptor (GPCR) densely expressed in:</p>
<ul>
<li>Layer V pyramidal neurons of the prefrontal cortex</li>
<li>Claustrum</li>
<li>Visual cortex</li>
<li>Limbic regions including the amygdala</li>
</ul>

<p>Activation of 5-HT2A receptors triggers intracellular signaling cascades involving phospholipase C (PLC), protein kinase C (PKC), and downstream effects on gene expression and neural plasticity.</p>

<h2>2. Psilocybin</h2>

<h3>Chemistry and Metabolism</h3>
<p>Psilocybin (4-phosphoryloxy-N,N-dimethyltryptamine) is a prodrug that is rapidly dephosphorylated in the body to its active metabolite, psilocin (4-hydroxy-DMT). This conversion occurs primarily in the intestines, liver, and kidneys via alkaline phosphatase enzymes.</p>

<h3>Pharmacokinetics</h3>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Onset</td><td>20-40 minutes (oral)</td></tr>
<tr><td>Peak effects</td><td>60-90 minutes</td></tr>
<tr><td>Duration</td><td>4-6 hours</td></tr>
<tr><td>Half-life (psilocin)</td><td>~2.5 hours</td></tr>
<tr><td>Bioavailability</td><td>~50%</td></tr>
</table>

<h3>Receptor Binding Profile</h3>
<p>Psilocin acts as a partial agonist at 5-HT2A, 5-HT2C, and 5-HT1A receptors. The 5-HT2A binding affinity (Ki ≈ 6 nM) correlates strongly with psychedelic potency. 5-HT2C and 5-HT1A activity may modulate the overall experience.</p>

<h3>Clinical Dosing</h3>
<ul>
<li><strong>Low dose:</strong> 10-15 mg (threshold/museum dose)</li>
<li><strong>Moderate dose:</strong> 20-25 mg (typical therapeutic dose)</li>
<li><strong>High dose:</strong> 25-30 mg (used in some clinical trials)</li>
</ul>

<h2>3. LSD (Lysergic Acid Diethylamide)</h2>

<h3>Chemistry</h3>
<p>LSD is a semisynthetic compound derived from ergot alkaloids. Its complex structure allows it to bind to multiple receptor types with high affinity.</p>

<h3>Pharmacokinetics</h3>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Onset</td><td>30-60 minutes</td></tr>
<tr><td>Peak effects</td><td>2-4 hours</td></tr>
<tr><td>Duration</td><td>8-12 hours</td></tr>
<tr><td>Half-life</td><td>~3 hours</td></tr>
<tr><td>Bioavailability</td><td>~70%</td></tr>
</table>

<h3>Unique Receptor Interactions</h3>
<p>LSD's extended duration is partly explained by its unusual binding kinetics at the 5-HT2A receptor. Crystallography studies reveal that LSD becomes "trapped" in the receptor binding pocket due to a "lid" formed by extracellular loop 2. This results in prolonged receptor activation despite relatively rapid plasma clearance.</p>

<p>LSD also has significant affinity for dopamine D1 and D2 receptors, which may contribute to its unique subjective profile compared to other psychedelics.</p>

<h3>Clinical Dosing</h3>
<ul>
<li><strong>Microdose:</strong> 10-20 μg</li>
<li><strong>Low dose:</strong> 50-75 μg</li>
<li><strong>Moderate dose:</strong> 100-150 μg</li>
<li><strong>High dose:</strong> 200+ μg</li>
</ul>

<h2>4. DMT (N,N-Dimethyltryptamine)</h2>

<h3>Endogenous Presence</h3>
<p>DMT is notable for being an endogenous compound, found in trace amounts in human cerebrospinal fluid, blood, and urine. Its physiological role remains unclear, though hypotheses include involvement in dreaming, near-death experiences, and stress responses.</p>

<h3>Routes of Administration</h3>
<p>DMT is not orally active due to rapid metabolism by monoamine oxidase (MAO) enzymes. Different routes produce dramatically different experiences:</p>

<table>
<tr><th>Route</th><th>Onset</th><th>Duration</th><th>Context</th></tr>
<tr><td>Smoked/vaporized</td><td>Seconds</td><td>15-30 min</td><td>Research (Strassman studies)</td></tr>
<tr><td>IV infusion</td><td>Seconds</td><td>15-30 min</td><td>Research settings</td></tr>
<tr><td>Oral + MAOI (ayahuasca)</td><td>30-60 min</td><td>4-6 hours</td><td>Traditional/clinical</td></tr>
</table>

<h3>Sigma-1 Receptor Activity</h3>
<p>Unlike other classic psychedelics, DMT has significant activity at sigma-1 receptors, which are involved in cellular stress responses and may contribute to its unique phenomenology and potential neuroprotective effects.</p>

<h2>5. Neural Effects of 5-HT2A Activation</h2>

<h3>Default Mode Network Disruption</h3>
<p>Neuroimaging studies consistently show that psychedelics reduce activity and connectivity within the default mode network (DMN), a set of brain regions active during self-referential thought. This disruption correlates with ego dissolution experiences and may enable new patterns of neural connectivity.</p>

<h3>Increased Global Connectivity</h3>
<p>Psychedelics increase entropy and connectivity between brain regions that don't typically communicate. This "entropic brain" state may underlie the novel associations, insights, and perceptual changes characteristic of psychedelic experiences.</p>

<h3>Neuroplasticity</h3>
<p>Psychedelics promote structural and functional neuroplasticity through:</p>
<ul>
<li>Increased BDNF (brain-derived neurotrophic factor) expression</li>
<li>Enhanced dendritic spine growth</li>
<li>Increased synaptogenesis</li>
</ul>
<p>These effects may explain the sustained therapeutic benefits observed weeks to months after a single dose.</p>

<h2>Summary</h2>
<p>Classic psychedelics share 5-HT2A receptor agonism as their primary mechanism but differ in pharmacokinetics, duration, and subtle receptor binding profiles. Understanding these differences informs clinical decision-making regarding compound selection, dosing, and session planning.</p>

<h2>Key Takeaways</h2>
<ul>
<li>5-HT2A receptor agonism is necessary and sufficient for psychedelic effects</li>
<li>Psilocybin offers a moderate duration (4-6 hours) ideal for clinical settings</li>
<li>LSD's extended duration (8-12 hours) requires longer session planning</li>
<li>DMT's short duration when smoked/injected allows for more controlled research</li>
<li>All classic psychedelics promote neuroplasticity, potentially explaining lasting benefits</li>
</ul>
`
    },
    {
      title: 'Neuroscience of Psychedelic Experiences',
      description: 'Brain imaging findings and the entropic brain hypothesis',
      duration: 60,
      orderIndex: 3,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      title: 'Screening and Contraindications',
      description: 'Medical and psychiatric screening protocols',
      duration: 90,
      orderIndex: 4,
      contentType: 'text',
      content: `
<h1>Screening and Contraindications</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Identify absolute and relative contraindications for psychedelic therapy</li>
<li>Conduct comprehensive medical and psychiatric screening</li>
<li>Assess medication interactions and necessary washout periods</li>
<li>Evaluate psychological readiness and informed consent capacity</li>
</ul>

<h2>Introduction</h2>
<p>Thorough screening is the foundation of safe psychedelic therapy. This lesson covers the comprehensive assessment process that protects patients from harm and identifies those most likely to benefit from treatment.</p>

<h2>1. Absolute Contraindications</h2>

<h3>Psychiatric Contraindications</h3>
<table>
<tr><th>Condition</th><th>Rationale</th></tr>
<tr><td>Current psychotic disorder</td><td>Risk of exacerbation, prolonged psychosis</td></tr>
<tr><td>Schizophrenia (personal history)</td><td>High risk of relapse or precipitation</td></tr>
<tr><td>Bipolar I disorder with psychotic features</td><td>Risk of manic/psychotic episode</td></tr>
<tr><td>First-degree relative with schizophrenia</td><td>Elevated genetic risk</td></tr>
<tr><td>Active suicidality with plan/intent</td><td>Acute safety concern</td></tr>
</table>

<h3>Medical Contraindications</h3>
<table>
<tr><th>Condition</th><th>Concern</th></tr>
<tr><td>Uncontrolled hypertension</td><td>Psychedelics cause transient BP elevation</td></tr>
<tr><td>Recent MI or stroke (< 6 months)</td><td>Cardiovascular stress risk</td></tr>
<tr><td>Severe hepatic impairment</td><td>Altered metabolism</td></tr>
<tr><td>Pregnancy</td><td>Unknown fetal effects</td></tr>
<tr><td>Seizure disorder (uncontrolled)</td><td>Potential seizure threshold lowering</td></tr>
</table>

<h2>2. Relative Contraindications</h2>
<p>These require careful individual assessment and may warrant modified protocols:</p>

<h3>Psychiatric</h3>
<ul>
<li><strong>Bipolar II disorder:</strong> May proceed with careful monitoring; ensure mood stability</li>
<li><strong>Borderline personality disorder:</strong> Requires strong therapeutic alliance and support structure</li>
<li><strong>Severe PTSD with dissociation:</strong> May need modified approach and extended support</li>
<li><strong>Active substance use disorder:</strong> Timing considerations; stability requirements</li>
</ul>

<h3>Medical</h3>
<ul>
<li><strong>Controlled hypertension:</strong> Monitor closely; have antihypertensive available</li>
<li><strong>Diabetes:</strong> Blood sugar monitoring; meal/medication timing</li>
<li><strong>Respiratory conditions:</strong> Ensure respiratory support available</li>
</ul>

<h2>3. Medication Interactions</h2>

<h3>Medications Requiring Discontinuation</h3>
<table>
<tr><th>Medication Class</th><th>Interaction</th><th>Washout Period</th></tr>
<tr><td>SSRIs</td><td>Blunts psychedelic effects; serotonin syndrome risk with MDMA</td><td>2-4 weeks (varies by half-life)</td></tr>
<tr><td>SNRIs</td><td>Similar to SSRIs</td><td>2-4 weeks</td></tr>
<tr><td>MAOIs</td><td>Dangerous hypertensive crisis (especially with MDMA); prolonged effects</td><td>2-3 weeks</td></tr>
<tr><td>Lithium</td><td>Reports of seizures with LSD; unpredictable interactions</td><td>1-2 weeks</td></tr>
<tr><td>Tramadol</td><td>Seizure risk; serotonin syndrome potential</td><td>1 week</td></tr>
</table>

<h3>Medications to Use with Caution</h3>
<ul>
<li><strong>Benzodiazepines:</strong> Can be used as rescue medication but may diminish experience; taper considerations</li>
<li><strong>Antipsychotics:</strong> Will block psychedelic effects; contraindicate concurrent use</li>
<li><strong>Beta-blockers:</strong> Generally safe; may be helpful for anxiety/tachycardia</li>
</ul>

<h2>4. Comprehensive Screening Protocol</h2>

<h3>Step 1: Initial Intake</h3>
<ul>
<li>Detailed psychiatric history (personal and family)</li>
<li>Complete medical history and current conditions</li>
<li>Medication review including supplements</li>
<li>Substance use history</li>
<li>Previous psychedelic experiences (if any)</li>
</ul>

<h3>Step 2: Structured Assessment</h3>
<p>Standardized instruments may include:</p>
<ul>
<li>MINI International Neuropsychiatric Interview (psychosis screen)</li>
<li>PHQ-9 (depression severity)</li>
<li>GAD-7 (anxiety severity)</li>
<li>PCL-5 (PTSD symptoms)</li>
<li>Columbia Suicide Severity Rating Scale</li>
</ul>

<h3>Step 3: Medical Evaluation</h3>
<ul>
<li>Physical examination</li>
<li>Vital signs (baseline BP, HR)</li>
<li>ECG if cardiovascular risk factors</li>
<li>Laboratory tests: CBC, CMP, LFTs, thyroid panel</li>
<li>Pregnancy test (when applicable)</li>
<li>Urine drug screen</li>
</ul>

<h3>Step 4: Psychological Readiness Assessment</h3>
<ul>
<li>Current life stability and support system</li>
<li>Motivation and expectations</li>
<li>Ability to tolerate intense emotional experiences</li>
<li>Capacity for self-reflection and psychological insight</li>
<li>Understanding of the process and commitment to integration</li>
</ul>

<h2>5. Informed Consent</h2>

<h3>Elements of Informed Consent</h3>
<p>Patients must understand:</p>
<ul>
<li>Nature of the treatment and substances involved</li>
<li>Expected effects (psychological and physical)</li>
<li>Potential risks and adverse effects</li>
<li>Alternative treatments available</li>
<li>Right to withdraw at any time</li>
<li>Legal status of the substances</li>
<li>Limits of confidentiality</li>
</ul>

<h3>Capacity Assessment</h3>
<p>Ensure the patient can:</p>
<ul>
<li>Understand the information provided</li>
<li>Appreciate how it applies to their situation</li>
<li>Reason about treatment options</li>
<li>Express a consistent choice</li>
</ul>

<h2>6. Special Populations</h2>

<h3>Older Adults</h3>
<ul>
<li>Increased cardiovascular monitoring</li>
<li>Review of polypharmacy</li>
<li>Cognitive assessment</li>
<li>May need lower doses</li>
</ul>

<h3>Patients with Trauma History</h3>
<ul>
<li>Detailed trauma history and triggers</li>
<li>Assessment of dissociative symptoms</li>
<li>Ensure adequate therapeutic support</li>
<li>Consider titrated approaches</li>
</ul>

<h2>Summary</h2>
<p>Comprehensive screening protects patient safety and optimizes therapeutic outcomes. A methodical approach that assesses psychiatric history, medical status, medications, and psychological readiness forms the foundation of responsible psychedelic therapy practice.</p>
`
    },
    {
      title: 'Module 1 Assessment',
      description: 'Test your understanding of foundational concepts',
      duration: 30,
      orderIndex: 5,
      contentType: 'quiz',
      quizData: {
        title: 'Foundations Assessment - Module 1',
        passingScore: 70,
        questions: [
          {
            question: 'Which ancient Mesoamerican term for psilocybin mushrooms translates to "flesh of the gods"?',
            options: ['Xochipilli', 'Teonanácatl', 'Ololiuqui', 'Peyotl'],
            correctAnswer: 'Teonanácatl',
            explanation: 'Teonanácatl was the Aztec term for psilocybin mushrooms, reflecting their sacred status in religious ceremonies.'
          },
          {
            question: 'What is the primary mechanism of action shared by classic psychedelics (psilocybin, LSD, DMT)?',
            options: ['Dopamine D2 receptor antagonism', 'GABA-A receptor potentiation', 'Serotonin 5-HT2A receptor agonism', 'NMDA receptor antagonism'],
            correctAnswer: 'Serotonin 5-HT2A receptor agonism',
            explanation: '5-HT2A receptor agonism is necessary and sufficient for producing the characteristic effects of classic psychedelics.'
          },
          {
            question: 'Psilocybin is converted to which active metabolite in the body?',
            options: ['Psilocin', 'Bufotenine', 'Norpsilocybin', 'Baeocystin'],
            correctAnswer: 'Psilocin',
            explanation: 'Psilocybin is a prodrug that is rapidly dephosphorylated to psilocin (4-hydroxy-DMT), which is the pharmacologically active compound.'
          },
          {
            question: 'Which of the following is an ABSOLUTE contraindication for psychedelic therapy?',
            options: ['History of depression', 'Controlled hypertension', 'Personal history of schizophrenia', 'Previous psychedelic use'],
            correctAnswer: 'Personal history of schizophrenia',
            explanation: 'Personal history of schizophrenia is an absolute contraindication due to the high risk of precipitating psychotic episodes.'
          },
          {
            question: 'Why do SSRIs need to be discontinued before psychedelic therapy?',
            options: ['They enhance psychedelic effects dangerously', 'They blunt psychedelic effects and pose serotonin syndrome risk with MDMA', 'They cause dangerous hypotension', 'They are metabolized by the same enzymes'],
            correctAnswer: 'They blunt psychedelic effects and pose serotonin syndrome risk with MDMA',
            explanation: 'SSRIs reduce the effectiveness of psychedelics through 5-HT2A downregulation and pose serotonin syndrome risk, particularly with MDMA.'
          },
          {
            question: 'What is the typical duration of effects for oral psilocybin?',
            options: ['15-30 minutes', '1-2 hours', '4-6 hours', '10-12 hours'],
            correctAnswer: '4-6 hours',
            explanation: 'Oral psilocybin typically produces effects lasting 4-6 hours, making it practical for clinical session planning.'
          },
          {
            question: 'Which brain network shows decreased activity and connectivity during psychedelic experiences?',
            options: ['Salience network', 'Executive control network', 'Default mode network', 'Visual processing network'],
            correctAnswer: 'Default mode network',
            explanation: 'The default mode network shows reduced activity and connectivity during psychedelic states, correlating with ego dissolution experiences.'
          },
          {
            question: 'What was the significance of the 1970 Controlled Substances Act for psychedelic research?',
            options: ['It provided funding for research', 'It placed psychedelics in Schedule I, effectively ending research', 'It created research exemptions', 'It legalized therapeutic use'],
            correctAnswer: 'It placed psychedelics in Schedule I, effectively ending research',
            explanation: 'The 1970 CSA classified psychedelics as Schedule I substances with no accepted medical use, halting legitimate research for decades.'
          },
          {
            question: 'Which medication class poses the highest risk of dangerous interaction with MDMA-assisted therapy?',
            options: ['Beta-blockers', 'Proton pump inhibitors', 'MAOIs', 'Antihistamines'],
            correctAnswer: 'MAOIs',
            explanation: 'MAOIs combined with MDMA can cause life-threatening hypertensive crisis and serotonin syndrome.'
          },
          {
            question: 'LSD has an unusually long duration of action partly because it:',
            options: ['Has an extremely long half-life', 'Becomes trapped in the 5-HT2A receptor binding pocket', 'Is stored in fat tissue', 'Induces receptor upregulation'],
            correctAnswer: 'Becomes trapped in the 5-HT2A receptor binding pocket',
            explanation: 'Crystallography shows LSD becomes trapped in the receptor by a "lid" formed by extracellular loop 2, causing prolonged activation despite rapid clearance.'
          },
          {
            question: 'What year did the FDA grant "Breakthrough Therapy" designation to psilocybin for depression?',
            options: ['2014', '2016', '2018', '2020'],
            correctAnswer: '2018',
            explanation: 'The FDA granted Breakthrough Therapy designation to psilocybin for treatment-resistant depression in 2018, accelerating its path toward approval.'
          },
          {
            question: 'In screening, which of the following would be a RELATIVE (not absolute) contraindication?',
            options: ['Active psychosis', 'Schizophrenia diagnosis', 'Bipolar II disorder', 'First-degree relative with schizophrenia'],
            correctAnswer: 'Bipolar II disorder',
            explanation: 'Bipolar II (without psychotic features) is a relative contraindication requiring careful assessment, unlike Bipolar I with psychosis which is absolute.'
          }
        ]
      }
    },
    {
      title: 'Set and Setting: The Therapeutic Container',
      description: 'Creating optimal conditions for psychedelic therapy',
      duration: 60,
      orderIndex: 6,
      contentType: 'text',
      content: `
<h1>Set and Setting: The Therapeutic Container</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Define "set" and "setting" in the context of psychedelic therapy</li>
<li>Describe the elements of an optimal therapeutic environment</li>
<li>Understand the role of preparation in shaping patient mindset</li>
<li>Apply evidence-based principles to treatment room design</li>
</ul>

<h2>Introduction</h2>
<p>The concept of "set and setting," introduced by Timothy Leary and formalized by researchers like Stanislav Grof, refers to the mindset of the individual (set) and the physical/social environment (setting) during a psychedelic experience. These factors profoundly influence therapeutic outcomes.</p>

<h2>1. Understanding "Set" (Mindset)</h2>

<h3>Components of Set</h3>
<ul>
<li><strong>Expectations:</strong> What the patient anticipates from the experience</li>
<li><strong>Intentions:</strong> Goals or questions the patient brings to the session</li>
<li><strong>Mental state:</strong> Current psychological condition (anxiety, openness, resistance)</li>
<li><strong>Personality factors:</strong> Trait openness, absorption capacity, psychological flexibility</li>
<li><strong>Life context:</strong> Current stressors, relationships, circumstances</li>
</ul>

<h3>Optimizing Patient Mindset</h3>
<p>Preparation sessions should address:</p>
<ul>
<li><strong>Psychoeducation:</strong> What to expect from the substance and process</li>
<li><strong>Intention setting:</strong> Clarifying therapeutic goals without rigid expectations</li>
<li><strong>Trust development:</strong> Building alliance with therapists and confidence in the process</li>
<li><strong>Surrender guidance:</strong> Teaching the importance of accepting whatever arises</li>
<li><strong>Anxiety normalization:</strong> Acknowledging and working with pre-session anxiety</li>
</ul>

<h3>The Paradox of Intention</h3>
<p>While setting intentions is valuable, attachment to specific outcomes can create resistance. The optimal approach balances having direction with openness to unexpected experiences. Common framing: "Hold your intentions lightly."</p>

<h2>2. Understanding "Setting" (Environment)</h2>

<h3>Physical Environment</h3>
<p>The treatment space should convey safety, comfort, and aesthetic warmth:</p>

<h4>Room Design Elements</h4>
<ul>
<li><strong>Lighting:</strong> Adjustable/dimmable; natural light or warm artificial lighting; ability to darken room</li>
<li><strong>Comfortable furniture:</strong> Reclining chair or bed/mattress; supportive pillows and blankets</li>
<li><strong>Aesthetic elements:</strong> Art, plants, natural materials; avoiding clinical sterility</li>
<li><strong>Privacy:</strong> Sound isolation; freedom from interruptions</li>
<li><strong>Temperature control:</strong> Individual comfort; extra blankets available</li>
<li><strong>Bathroom access:</strong> Private, nearby facilities</li>
</ul>

<h4>Sensory Considerations</h4>
<ul>
<li><strong>Music:</strong> Carefully curated playlists supporting the arc of experience</li>
<li><strong>Eye masks:</strong> To facilitate internal focus when desired</li>
<li><strong>Headphones:</strong> Quality audio delivery</li>
<li><strong>Minimal visual clutter:</strong> Simple, calming visual environment</li>
</ul>

<h3>Social Environment</h3>
<p>The interpersonal context is equally important:</p>
<ul>
<li><strong>Therapist presence:</strong> Consistent, calm, supportive</li>
<li><strong>Therapeutic relationship:</strong> Trust established before the session</li>
<li><strong>Safety signals:</strong> Patients know help is available if needed</li>
<li><strong>Non-interference:</strong> Allowing the patient's process to unfold without excessive intervention</li>
</ul>

<h2>3. Music in Psychedelic Therapy</h2>

<h3>The Role of Music</h3>
<p>Music serves multiple functions in psychedelic therapy:</p>
<ul>
<li>Provides structure and arc to the experience</li>
<li>Evokes and supports emotional processing</li>
<li>Facilitates surrender and absorption</li>
<li>Can guide energy (calming or intensifying)</li>
<li>Creates a "container" for difficult material</li>
</ul>

<h3>Music Selection Principles</h3>
<p>Research supports specific characteristics:</p>
<ul>
<li><strong>Mostly instrumental:</strong> Lyrics can be directive or distracting</li>
<li><strong>Emotional range:</strong> Supporting the full arc from intensity to resolution</li>
<li><strong>Builds and releases:</strong> Dynamic variation matching the pharmacological arc</li>
<li><strong>Cultural considerations:</strong> Patient familiarity and preferences</li>
<li><strong>Quality recordings:</strong> High-fidelity audio reproduction</li>
</ul>

<h3>The Johns Hopkins Playlist</h3>
<p>The research team at Johns Hopkins developed evidence-based playlists structured in phases:</p>
<ol>
<li><strong>Onset:</strong> Gentle, grounding music as effects begin</li>
<li><strong>Ascent:</strong> Gradually building complexity and intensity</li>
<li><strong>Peak:</strong> Emotionally evocative, often classical or sacred music</li>
<li><strong>Descent:</strong> Softening, integration-supporting selections</li>
<li><strong>Return:</strong> Gentle re-entry music</li>
</ol>

<h2>4. The Therapist's Role During Sessions</h2>

<h3>Presence Without Interference</h3>
<p>The primary therapeutic stance during psychedelic sessions:</p>
<ul>
<li>Maintain calm, grounded presence</li>
<li>Be available without being intrusive</li>
<li>Follow the patient's process rather than leading</li>
<li>Provide support when clearly needed or requested</li>
<li>Trust the patient's innate healing capacity</li>
</ul>

<h3>When to Intervene</h3>
<p>Appropriate intervention points:</p>
<ul>
<li>Patient requests support or contact</li>
<li>Signs of significant physical distress</li>
<li>Patient appears "stuck" in difficult material</li>
<li>Safety concerns arise</li>
<li>Redirection from harmful behaviors</li>
</ul>

<h3>Types of Support</h3>
<ul>
<li><strong>Physical:</strong> Hand-holding, reassuring touch (with consent)</li>
<li><strong>Verbal:</strong> Brief reassurance ("You're safe," "This will pass")</li>
<li><strong>Breathwork:</strong> Guiding grounding breaths</li>
<li><strong>Orientation:</strong> Reminding of time, place, safety</li>
<li><strong>Music adjustment:</strong> Changing energy of the soundscape</li>
</ul>

<h2>5. Research on Set and Setting</h2>

<h3>Evidence Base</h3>
<p>Studies demonstrate that:</p>
<ul>
<li>Positive expectations correlate with better outcomes</li>
<li>Therapeutic alliance predicts experience quality</li>
<li>Environmental aesthetics affect mystical experience ratings</li>
<li>Music enhances emotional processing and insight</li>
<li>Surrender/trust predicts positive outcomes</li>
</ul>

<h3>The Mystical Experience Connection</h3>
<p>Optimal set and setting increases the likelihood of "mystical-type" experiences, which research shows predict:</p>
<ul>
<li>Greater therapeutic benefit</li>
<li>Sustained positive changes</li>
<li>Improved well-being measures</li>
<li>Higher participant ratings of meaningfulness</li>
</ul>

<h2>Summary</h2>
<p>Set and setting are not merely background factors but active ingredients in psychedelic therapy. Careful attention to both the patient's psychological preparation and the treatment environment significantly influences outcomes. Creating the optimal "container" requires thoughtful consideration of physical space, sensory elements, interpersonal dynamics, and patient preparation.</p>
`
    },
    {
      title: 'Therapeutic Frameworks and Models',
      description: 'MDMA-assisted therapy, ACT, and IFS approaches',
      duration: 75,
      orderIndex: 7,
      contentType: 'video',
      contentUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      title: 'Integration: The Critical Phase',
      description: 'Post-session processing and sustained change',
      duration: 60,
      orderIndex: 8,
      contentType: 'text',
      content: `
<h1>Integration: The Critical Phase</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Define integration and explain its importance in psychedelic therapy</li>
<li>Describe the timeline and phases of the integration process</li>
<li>Apply multiple modalities for integration support</li>
<li>Identify signs of integration challenges and appropriate interventions</li>
</ul>

<h2>Introduction</h2>
<p>Integration refers to the process of incorporating insights, experiences, and changes from psychedelic sessions into daily life. While the medicine session often receives the most attention, integration is where sustainable therapeutic change occurs. Without adequate integration, even profound experiences may fade without lasting benefit.</p>

<h2>1. The Importance of Integration</h2>

<h3>Why Integration Matters</h3>
<p>Psychedelic experiences can produce:</p>
<ul>
<li>Novel perspectives on long-standing problems</li>
<li>Emotional breakthroughs and releases</li>
<li>Insights about relationships and life patterns</li>
<li>Mystical or transcendent experiences</li>
<li>Confrontation with difficult psychological material</li>
</ul>

<p>However, without integration, these experiences may:</p>
<ul>
<li>Remain as isolated memories rather than catalysts for change</li>
<li>Create confusion or destabilization</li>
<li>Lead to "spiritual bypassing" or avoidance of difficult work</li>
<li>Fade quickly without behavioral follow-through</li>
</ul>

<h3>The Integration Paradox</h3>
<p>Research shows that while the intensity of the psychedelic experience predicts outcomes, it's the quality of integration that determines whether benefits persist. A moderate experience well-integrated may produce better long-term results than a profound experience poorly integrated.</p>

<h2>2. Timeline of Integration</h2>

<h3>Immediate Post-Session (0-24 hours)</h3>
<ul>
<li>Afterglow period with enhanced neuroplasticity</li>
<li>Emotional sensitivity and openness</li>
<li>Need for rest and gentle support</li>
<li>Initial meaning-making begins</li>
</ul>

<h3>Acute Integration (1-7 days)</h3>
<ul>
<li>Processing and organizing the experience</li>
<li>Strong emotions may surface or continue</li>
<li>Integration sessions begin</li>
<li>Journaling and creative expression valuable</li>
</ul>

<h3>Intermediate Integration (1-4 weeks)</h3>
<ul>
<li>Translating insights into behavioral changes</li>
<li>Testing new patterns in daily life</li>
<li>Gradual return to baseline consciousness</li>
<li>Ongoing therapy sessions</li>
</ul>

<h3>Long-term Integration (1-6 months+)</h3>
<ul>
<li>Consolidating changes into identity and lifestyle</li>
<li>Addressing challenges that emerge</li>
<li>Maintenance of gains</li>
<li>Possible booster sessions if indicated</li>
</ul>

<h2>3. Integration Modalities</h2>

<h3>Verbal Processing</h3>
<p>Traditional talk therapy approaches adapted for integration:</p>
<ul>
<li><strong>Narrative construction:</strong> Creating coherent stories from the experience</li>
<li><strong>Meaning-making:</strong> Exploring the significance of insights and visions</li>
<li><strong>Cognitive restructuring:</strong> Updating beliefs based on new perspectives</li>
<li><strong>Behavioral planning:</strong> Translating insights into action steps</li>
</ul>

<h3>Somatic Approaches</h3>
<p>Body-based integration recognizes that psychedelics often access pre-verbal material:</p>
<ul>
<li><strong>Body awareness:</strong> Noticing where experiences are held in the body</li>
<li><strong>Movement:</strong> Yoga, dance, or spontaneous movement to process energy</li>
<li><strong>Breathwork:</strong> Continued use of breathing practices from sessions</li>
<li><strong>Touch-based therapies:</strong> Massage, craniosacral work (with appropriate practitioners)</li>
</ul>

<h3>Creative Expression</h3>
<p>Art and creativity can access and express material that eludes verbal description:</p>
<ul>
<li><strong>Visual art:</strong> Drawing, painting, collage of experience imagery</li>
<li><strong>Writing:</strong> Journaling, poetry, freewriting</li>
<li><strong>Music:</strong> Playing, listening, or creating music that resonates with the experience</li>
<li><strong>Movement:</strong> Dance or embodied expression</li>
</ul>

<h3>Contemplative Practices</h3>
<p>Meditation and mindfulness support integration by:</p>
<ul>
<li>Maintaining access to expanded states</li>
<li>Developing witness consciousness</li>
<li>Processing material that continues to arise</li>
<li>Sustaining neuroplasticity benefits</li>
</ul>

<h3>Nature Connection</h3>
<p>Time in nature is consistently reported as beneficial for integration:</p>
<ul>
<li>Grounding and calming</li>
<li>Supporting sense of interconnection often experienced in sessions</li>
<li>Providing beauty and awe</li>
<li>Physical activity in natural settings</li>
</ul>

<h2>4. Integration Session Structure</h2>

<h3>First Integration Session (24-72 hours post)</h3>
<ol>
<li>Check-in: Physical, emotional, and mental status</li>
<li>Narrative review: Patient shares their experience</li>
<li>Identification of key themes, insights, and challenges</li>
<li>Initial meaning-making discussion</li>
<li>Self-care and support planning</li>
</ol>

<h3>Subsequent Integration Sessions</h3>
<ol>
<li>Review of interim experiences and emerging material</li>
<li>Deepening understanding of session insights</li>
<li>Addressing challenges or difficulties</li>
<li>Behavioral change support and planning</li>
<li>Connection to ongoing life issues and therapeutic goals</li>
</ol>

<h2>5. Integration Challenges</h2>

<h3>Common Difficulties</h3>
<ul>
<li><strong>Difficulty translating insights into action</strong>
  <ul><li>Solution: Break down into small, concrete steps; accountability structures</li></ul>
</li>
<li><strong>Feeling destabilized or overwhelmed</strong>
  <ul><li>Solution: Increase support; grounding practices; consider medication evaluation</li></ul>
</li>
<li><strong>Return of symptoms</strong>
  <ul><li>Solution: Normalize as part of process; explore what's emerging; consider additional sessions</li></ul>
</li>
<li><strong>Relationship disruption</strong>
  <ul><li>Solution: Couples or family sessions; communication support; pacing of changes</li></ul>
</li>
<li><strong>Spiritual emergency</strong>
  <ul><li>Solution: Specialized support; grounding work; time; possible psychiatric consultation</li></ul>
</li>
</ul>

<h3>Red Flags Requiring Attention</h3>
<ul>
<li>Persistent dissociation or derealization</li>
<li>Emerging psychotic symptoms</li>
<li>Severe depression or suicidality</li>
<li>Inability to function in daily life</li>
<li>Substance use escalation</li>
</ul>

<h2>6. Long-term Integration Support</h2>

<h3>Maintenance Strategies</h3>
<ul>
<li>Regular check-ins (therapy sessions, peer support)</li>
<li>Ongoing contemplative practice</li>
<li>Community connection with others who understand the experience</li>
<li>Periodic review of intentions and progress</li>
<li>Lifestyle factors: sleep, exercise, nutrition, relationships</li>
</ul>

<h3>When to Consider Additional Sessions</h3>
<ul>
<li>Incomplete processing of material</li>
<li>Plateau in progress with unresolved symptoms</li>
<li>New therapeutic goals emerging</li>
<li>Maintenance/reinforcement protocols (where indicated)</li>
</ul>

<h2>Summary</h2>
<p>Integration is the essential bridge between profound psychedelic experiences and lasting therapeutic change. Effective integration requires multiple modalities, appropriate timing, skilled support, and patient engagement over an extended period. Therapists must be prepared to support both the immediate aftermath of sessions and the longer arc of incorporating insights into daily life.</p>
`
    },
    {
      title: 'Ethics in Psychedelic Therapy',
      description: 'Boundaries, consent, and professional standards',
      duration: 75,
      orderIndex: 9,
      contentType: 'text',
      content: `
<h1>Ethics in Psychedelic Therapy</h1>

<h2>Learning Objectives</h2>
<ul>
<li>Identify ethical principles specific to psychedelic therapy practice</li>
<li>Recognize and navigate boundary challenges unique to this work</li>
<li>Understand informed consent requirements in psychedelic contexts</li>
<li>Apply ethical decision-making frameworks to complex clinical scenarios</li>
</ul>

<h2>Introduction</h2>
<p>Psychedelic therapy presents unique ethical challenges beyond those of conventional psychotherapy. The profound nature of psychedelic experiences, altered states of consciousness, and the intimate therapeutic setting require heightened ethical awareness and rigorous professional standards.</p>

<h2>1. Foundational Ethical Principles</h2>

<h3>Beneficence and Non-maleficence</h3>
<p>The obligations to promote well-being and avoid harm take on specific dimensions in psychedelic therapy:</p>
<ul>
<li>Careful screening to protect vulnerable individuals</li>
<li>Proper training and competence in this specialized modality</li>
<li>Appropriate dose selection and setting preparation</li>
<li>Adequate integration support to prevent harm from unprocessed material</li>
</ul>

<h3>Autonomy</h3>
<p>Respecting patient autonomy requires:</p>
<ul>
<li>Comprehensive informed consent before altered states</li>
<li>Recognition that autonomy may be temporarily reduced during sessions</li>
<li>Ensuring decisions are made when patients have full capacity</li>
<li>Supporting patient self-determination in integration process</li>
</ul>

<h3>Justice</h3>
<p>Equity considerations include:</p>
<ul>
<li>Access to treatment across socioeconomic groups</li>
<li>Representation in research populations</li>
<li>Culturally sensitive approaches</li>
<li>Acknowledging indigenous origins and contributions</li>
</ul>

<h2>2. Boundaries in Psychedelic Therapy</h2>

<h3>Why Boundaries Are Especially Important</h3>
<p>Psychedelic therapy creates conditions that amplify boundary challenges:</p>
<ul>
<li>Intense emotional experiences create vulnerability</li>
<li>Altered states may reduce patient judgment and resistance</li>
<li>Feelings of profound connection can be misinterpreted</li>
<li>Extended session duration creates intimacy</li>
<li>Touch may be therapeutically appropriate in ways unusual for talk therapy</li>
</ul>

<h3>Historical Boundary Violations</h3>
<p>The field has documented significant harms from boundary violations:</p>
<ul>
<li>Sexual misconduct during or after sessions</li>
<li>Exploitation of transference phenomena</li>
<li>Financial exploitation</li>
<li>Dual relationships and conflicts of interest</li>
<li>Spiritual or ideological manipulation</li>
</ul>

<h3>Maintaining Appropriate Boundaries</h3>
<ul>
<li><strong>Physical boundaries:</strong> Clear protocols for touch; ongoing consent; always patient-initiated or explicitly consented</li>
<li><strong>Emotional boundaries:</strong> Therapist self-care; supervision; avoiding over-identification</li>
<li><strong>Sexual boundaries:</strong> Absolute prohibition; clear policies; reporting mechanisms</li>
<li><strong>Role boundaries:</strong> Avoid dual relationships; maintain professional frame</li>
<li><strong>Temporal boundaries:</strong> Clear session structure; appropriate between-session contact</li>
</ul>

<h2>3. Informed Consent in Psychedelic Contexts</h2>

<h3>Comprehensive Disclosure Requirements</h3>
<p>Patients must understand:</p>
<ul>
<li>The nature and legal status of the substance</li>
<li>Expected effects (psychological and physical)</li>
<li>Duration and phases of the experience</li>
<li>Potential risks and adverse effects</li>
<li>Long-term effects and unknowns</li>
<li>Alternative treatments available</li>
<li>The role of the therapist during sessions</li>
<li>Limits of confidentiality</li>
</ul>

<h3>Capacity for Consent</h3>
<p>Ensure patient can:</p>
<ul>
<li>Understand information when presented</li>
<li>Appreciate relevance to their situation</li>
<li>Reason about options</li>
<li>Communicate a stable choice</li>
</ul>

<h3>Ongoing Consent</h3>
<p>Consent in psychedelic therapy is not a one-time event:</p>
<ul>
<li>Pre-session consent (comprehensive, written)</li>
<li>Day-of consent (verbal confirmation)</li>
<li>During-session awareness (patient retains ability to stop)</li>
<li>Post-session debrief (review of what occurred)</li>
</ul>

<h3>Touch Consent Protocols</h3>
<p>Given the potential therapeutic value and risks of physical contact:</p>
<ul>
<li>Discuss in advance during preparation</li>
<li>Establish agreed-upon boundaries and signals</li>
<li>Always seek active consent in the moment</li>
<li>Patient can withdraw consent at any time</li>
<li>Document consent discussions and decisions</li>
</ul>

<h2>4. Power Dynamics</h2>

<h3>Sources of Power Imbalance</h3>
<p>Therapists hold significant power in this relationship:</p>
<ul>
<li>Expert knowledge</li>
<li>Access to treatment</li>
<li>Interpretation of experiences</li>
<li>Patient vulnerability during altered states</li>
<li>Transference phenomena</li>
</ul>

<h3>Mitigating Power Imbalances</h3>
<ul>
<li>Collaborative approach to treatment planning</li>
<li>Transparent communication</li>
<li>Patient autonomy in meaning-making</li>
<li>Team-based care with checks and balances</li>
<li>External oversight and supervision</li>
</ul>

<h2>5. Confidentiality Considerations</h2>

<h3>Standard Limits</h3>
<p>Standard confidentiality exceptions apply:</p>
<ul>
<li>Danger to self or others</li>
<li>Suspected abuse (child, elder, dependent adult)</li>
<li>Court orders</li>
<li>Medical emergencies</li>
</ul>

<h3>Special Considerations</h3>
<ul>
<li>Legal status of substances may create reporting dilemmas</li>
<li>Research contexts may involve data sharing</li>
<li>Team-based care requires information sharing protocols</li>
<li>Public figures may have additional privacy concerns</li>
</ul>

<h2>6. Cultural Competence and Humility</h2>

<h3>Indigenous Acknowledgment</h3>
<p>Ethical practice requires acknowledging:</p>
<ul>
<li>Indigenous origins of many psychedelic practices</li>
<li>Historical appropriation and exploitation</li>
<li>Ongoing traditional use in indigenous communities</li>
<li>Respectful engagement rather than extraction</li>
</ul>

<h3>Cultural Sensitivity in Clinical Practice</h3>
<ul>
<li>Awareness of cultural factors in how experiences are interpreted</li>
<li>Respect for diverse spiritual/religious frameworks</li>
<li>Avoiding imposition of therapist's worldview</li>
<li>Adaptation of protocols for cultural appropriateness</li>
</ul>

<h2>7. Professional Standards and Accountability</h2>

<h3>Training and Competence</h3>
<p>Ethical practice requires:</p>
<ul>
<li>Adequate training specific to psychedelic therapy</li>
<li>Ongoing supervision and consultation</li>
<li>Personal experience with non-ordinary states (controversial but common)</li>
<li>Awareness of personal limitations</li>
</ul>

<h3>Organizational Ethics</h3>
<ul>
<li>Clear policies and procedures</li>
<li>Reporting mechanisms for concerns</li>
<li>Regular ethics training and review</li>
<li>Quality assurance processes</li>
</ul>

<h2>8. Ethical Decision-Making Framework</h2>

<p>When facing ethical dilemmas:</p>
<ol>
<li><strong>Identify</strong> the ethical issue(s)</li>
<li><strong>Gather</strong> relevant information</li>
<li><strong>Consider</strong> applicable ethical principles and standards</li>
<li><strong>Identify</strong> possible courses of action</li>
<li><strong>Consult</strong> with colleagues, supervisors, or ethics committees</li>
<li><strong>Decide</strong> on a course of action</li>
<li><strong>Document</strong> the decision and rationale</li>
<li><strong>Evaluate</strong> the outcome</li>
</ol>

<h2>Summary</h2>
<p>Ethical practice in psychedelic therapy requires heightened awareness of the unique challenges posed by altered states, vulnerability, and the intimate therapeutic relationship. Rigorous attention to boundaries, informed consent, power dynamics, and professional standards protects both patients and the integrity of the field. As this modality enters mainstream practice, establishing and maintaining high ethical standards is essential.</p>
`
    },
    {
      title: 'Final Comprehensive Assessment',
      description: 'Complete course examination for CE credit',
      duration: 45,
      orderIndex: 10,
      contentType: 'quiz',
      quizData: {
        title: 'Foundations Final Examination',
        passingScore: 80,
        questions: [
          {
            question: 'According to the "entropic brain" hypothesis, psychedelics produce their effects by:',
            options: ['Decreasing brain entropy and increasing order', 'Increasing brain entropy and enabling novel neural connectivity', 'Selectively activating specific brain regions', 'Suppressing all cortical activity'],
            correctAnswer: 'Increasing brain entropy and enabling novel neural connectivity',
            explanation: 'The entropic brain hypothesis proposes that psychedelics increase brain entropy, enabling new patterns of connectivity not typically seen in normal waking consciousness.'
          },
          {
            question: 'What is the recommended approach to intention-setting in preparation sessions?',
            options: ['Encourage rigid, specific goals for measurement', 'Discourage any goal-setting to avoid expectations', 'Set intentions while remaining open to unexpected experiences', 'Focus only on symptom reduction targets'],
            correctAnswer: 'Set intentions while remaining open to unexpected experiences',
            explanation: 'The optimal approach balances having direction with openness—"holding intentions lightly"—avoiding both rigidity and aimlessness.'
          },
          {
            question: 'During a psychedelic session, the therapist should primarily:',
            options: ['Actively guide the patient through specific exercises', 'Maintain calm presence and intervene only when needed', 'Continuously verbally process emerging material', 'Minimize all interaction to avoid influence'],
            correctAnswer: 'Maintain calm presence and intervene only when needed',
            explanation: 'The primary therapeutic stance is supportive presence without interference, trusting the patient\'s process while being available for support when needed.'
          },
          {
            question: 'Which medication requires the longest washout period before psychedelic therapy?',
            options: ['Benzodiazepines', 'Fluoxetine (Prozac)', 'Propranolol', 'Acetaminophen'],
            correctAnswer: 'Fluoxetine (Prozac)',
            explanation: 'Fluoxetine has an extremely long half-life (4-6 days, with an active metabolite of 4-16 days) requiring up to 5-6 weeks of washout.'
          },
          {
            question: 'What distinguishes "spiritual emergency" from psychotic decompensation?',
            options: ['They are identical and require the same treatment', 'Spiritual emergency involves intact reality testing and often resolves with support', 'Spiritual emergency always requires hospitalization', 'Psychotic decompensation is less serious'],
            correctAnswer: 'Spiritual emergency involves intact reality testing and often resolves with support',
            explanation: 'Spiritual emergencies, while distressing, typically involve maintained reality testing and respond to supportive intervention, unlike true psychotic episodes.'
          },
          {
            question: 'Research on set and setting demonstrates that:',
            options: ['Setting has no measurable effect on outcomes', 'Only pharmacology determines the experience', 'Environmental factors significantly influence mystical experience ratings', 'Set is important but setting is negligible'],
            correctAnswer: 'Environmental factors significantly influence mystical experience ratings',
            explanation: 'Research shows that both set (mindset) and setting (environment) significantly influence the quality of psychedelic experiences and therapeutic outcomes.'
          },
          {
            question: 'The primary reason touch consent protocols are especially important in psychedelic therapy is:',
            options: ['Touch is never appropriate in therapy', 'Patients in altered states have reduced capacity to withdraw consent', 'Licensing boards require it', 'It simplifies documentation'],
            correctAnswer: 'Patients in altered states have reduced capacity to withdraw consent',
            explanation: 'The vulnerability created by altered states requires extra care in consent processes, as patients may have reduced judgment or ability to set boundaries.'
          },
          {
            question: 'What is the significance of the "afterglow" period following a psychedelic session?',
            options: ['It indicates adverse effects requiring monitoring', 'It\'s a period of enhanced neuroplasticity optimal for integration work', 'It suggests incomplete drug metabolism', 'It should be avoided through immediate return to normal activities'],
            correctAnswer: 'It\'s a period of enhanced neuroplasticity optimal for integration work',
            explanation: 'The afterglow period represents a window of enhanced neuroplasticity during which integration work may be especially effective.'
          },
          {
            question: 'When a patient reports a profoundly meaningful mystical experience, the ethical therapist should:',
            options: ['Validate the experience but guide toward the therapist\'s interpretation', 'Dismiss it as a drug effect without lasting significance', 'Support the patient\'s own meaning-making process without imposing interpretations', 'Immediately diagnose as dissociation requiring treatment'],
            correctAnswer: 'Support the patient\'s own meaning-making process without imposing interpretations',
            explanation: 'Ethical practice respects patient autonomy in meaning-making, avoiding imposition of the therapist\'s worldview while providing supportive presence.'
          },
          {
            question: 'Indigenous acknowledgment in psychedelic therapy ethics requires:',
            options: ['Avoiding any traditional practices', 'Recognizing origins while avoiding appropriation and supporting indigenous communities', 'Complete adoption of indigenous ceremonies', 'Ignoring cultural context for scientific neutrality'],
            correctAnswer: 'Recognizing origins while avoiding appropriation and supporting indigenous communities',
            explanation: 'Ethical practice acknowledges indigenous contributions while engaging respectfully rather than extractively with traditional knowledge.'
          },
          {
            question: 'Which of the following best describes the relationship between mystical experiences and therapeutic outcomes?',
            options: ['Mystical experiences have no relationship to outcomes', 'Mystical experiences predict better long-term therapeutic outcomes', 'More intense experiences always mean better outcomes', 'Only non-mystical experiences are therapeutic'],
            correctAnswer: 'Mystical experiences predict better long-term therapeutic outcomes',
            explanation: 'Research consistently shows that mystical-type experiences during psychedelic sessions predict greater therapeutic benefit and sustained positive changes.'
          },
          {
            question: 'The concept of "set" in psychedelic therapy includes all EXCEPT:',
            options: ['Patient expectations', 'Physical environment of the session', 'Current mental state', 'Personality factors'],
            correctAnswer: 'Physical environment of the session',
            explanation: 'Set refers to mindset (expectations, intentions, mental state, personality), while setting refers to the physical and social environment.'
          },
          {
            question: 'A patient asks to pursue psychedelic therapy but has a first-degree relative with schizophrenia. The appropriate response is:',
            options: ['Proceed normally as this has no clinical relevance', 'Consider this an absolute contraindication requiring exclusion', 'Proceed with lower doses only', 'Ignore family history and focus on patient\'s presentation'],
            correctAnswer: 'Consider this an absolute contraindication requiring exclusion',
            explanation: 'First-degree relatives of people with schizophrenia have elevated genetic risk and are generally excluded from psychedelic therapy due to potential to precipitate psychosis.'
          },
          {
            question: 'Effective integration support typically includes:',
            options: ['Only verbal processing in traditional talk therapy format', 'Multiple modalities including somatic, creative, and contemplative approaches', 'Rapid return to normal activities to prevent dependence', 'Exclusive focus on the psychedelic experience itself'],
            correctAnswer: 'Multiple modalities including somatic, creative, and contemplative approaches',
            explanation: 'Integration benefits from multiple modalities as psychedelic experiences often access material that exceeds verbal processing alone.'
          },
          {
            question: 'What is the primary role of music in psychedelic therapy sessions?',
            options: ['Distraction from difficult experiences', 'Structured support for the arc of experience and emotional processing', 'Drowning out external noise', 'Purely aesthetic background enhancement'],
            correctAnswer: 'Structured support for the arc of experience and emotional processing',
            explanation: 'Music serves therapeutic functions including structuring the experience, evoking and supporting emotions, and facilitating the process of the session.'
          }
        ]
      }
    }
  ]
};

export default { course1 };
