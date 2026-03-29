import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';

const challengeLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const stageLabels = {
  intake: 'Contact / Appraisal',
  working: 'Working Contact',
  core: 'Core Pattern Contact'
};

export const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const styleRules = {
  empathic: {
    label: 'Empathic + paced',
    allianceDelta: { safety: 10, trust: 8, hope: 6, shame: -6, resistance: -7 }
  },
  interpretive: {
    label: 'Interpretive too early',
    allianceDelta: { safety: -7, trust: -3, hope: 1, shame: 7, resistance: 10 }
  },
  directive: {
    label: 'Directive / advice-heavy',
    allianceDelta: { safety: -3, trust: -2, hope: 3, shame: 2, resistance: 7 }
  },
  vague: {
    label: 'Vague / detached',
    allianceDelta: { safety: -4, trust: -5, hope: -3, shame: 1, resistance: 5 }
  },
  invalidating: {
    label: 'Invalidating / minimizing',
    allianceDelta: { safety: -12, trust: -10, hope: -8, shame: 10, resistance: 12 }
  }
};

export const detectTherapistStyle = (text) => {
  const normalized = text.toLowerCase();

  if (/just relax|not a big deal|you're overreacting|everyone feels that|move on/.test(normalized)) {
    return 'invalidating';
  }

  if (/deep down|this is because|your real issue|clearly you/.test(normalized)) {
    return 'interpretive';
  }

  if (/you should|you need to|here's what to do|make a plan|do this/.test(normalized)) {
    return 'directive';
  }

  if (/how does that feel|take your time|that sounds hard|i hear you|we can slow down/.test(normalized)) {
    return 'empathic';
  }

  return 'vague';
};

export const makeBaselineAlliance = (challengeLevel) => {
  if (challengeLevel === 'advanced') {
    return { safety: 36, trust: 30, hope: 42, shame: 62, resistance: 66 };
  }

  if (challengeLevel === 'beginner') {
    return { safety: 52, trust: 48, hope: 55, shame: 42, resistance: 40 };
  }

  return { safety: 44, trust: 40, hope: 48, shame: 52, resistance: 52 };
};

export const applyAllianceShift = (currentAlliance, style, challengeLevel) => {
  const styleDelta = styleRules[style].allianceDelta;
  const challengeMultiplier = challengeLevel === 'advanced' ? 1.2 : challengeLevel === 'beginner' ? 0.8 : 1;

  return Object.fromEntries(
    Object.entries(currentAlliance).map(([key, value]) => {
      const delta = Math.round((styleDelta[key] || 0) * challengeMultiplier);
      return [key, clamp(value + delta)];
    })
  );
};

export const chooseDefense = (alliance) => {
  if (alliance.resistance > 70 || alliance.shame > 70) return 'shutdown';
  if (alliance.safety < 35) return 'intellectualize';
  if (alliance.trust > 58 && alliance.safety > 58) return 'partial_openness';
  return 'guarded';
};

const responseBank = {
  intake: {
    guarded: [
      'I can give you the outline version, I guess. The cleaner version. That is usually what I do first.',
      'I am here, but I am still figuring out what feels safe to say in this room.',
      'I know I am being vague. I am not trying to be difficult. I just do this when I am not sure yet.'
    ],
    intellectualize: [
      'From a functional standpoint, I am still meeting obligations. That is technically true. Emotionally... less true.',
      'If we keep this at the level of patterns, I can do that. The personal details are harder right now.',
      'I can map the sequence really clearly. Feeling it while I describe it is the part that falls apart.'
    ],
    shutdown: [
      'I do not know. Sorry. My mind just kind of blanked.',
      'Can we not do the core issue this fast? I can feel myself pulling away already.',
      'I heard you. I just... need a second.'
    ],
    partial_openness: [
      'Okay. The part I usually skip is that after conflict, I go numb for hours and then panic later.',
      'I am noticing I am less defended right now than when we started, which is unusual for me.',
      'I think what scares me is needing people and then resenting them for having that power.'
    ]
  },
  working: {
    guarded: [
      'Last time I said it was mostly stress. That was not wrong, just incomplete.',
      'I keep telling people I am fine, then I avoid their calls for days. That pattern is getting worse.',
      'Part of me wants advice. Part of me knows I will argue with it the second I hear it.'
    ],
    intellectualize: [
      'My reaction profile is predictable: conflict, overcontrol, delayed panic, social withdrawal.',
      'I can narrate the pattern in a coherent way. I cannot tolerate what it implies yet.',
      'I keep trying to think my way out of something that is probably relational, not logical.'
    ],
    shutdown: [
      'I kind of disappeared just now. Sorry.',
      'I want to keep going, but I can feel myself flattening out.',
      'Can we stay with something less loaded for a minute?'
    ],
    partial_openness: [
      'I avoided saying this before, but I track people for rejection cues constantly. It is exhausting.',
      'When you slowed down, it helped. I did not feel managed. I could stay present.',
      'There is anger under this, not just anxiety. I usually hide that part.'
    ]
  },
  core: {
    guarded: [
      'This is the point where I usually switch to facts so I do not feel exposed.',
      'I can see the pattern happening here with you, which is uncomfortable to admit.',
      'I want you to get it, and I also want distance at the same time.'
    ],
    intellectualize: [
      'If I frame this as an attachment strategy it sounds coherent; if I say it plainly, it feels humiliating.',
      'I run a competence performance when I feel dependent. That is happening right now.',
      'I know the formulation. Living it in real time is different.'
    ],
    shutdown: [
      'Never mind. I should not have started this.',
      'I am not sure I can stay with this without going numb.',
      'I think I need you to say less for a minute.'
    ],
    partial_openness: [
      'The part I hide is how quickly I assume people will use my need against me.',
      'I wanted to dismiss what you said, but it actually landed. I hate that and I am relieved by it.',
      'When I feel understood too quickly, I panic. When I feel unseen, I panic. That is the bind.'
    ]
  }
};

const styleReactionPivots = {
  empathic: [
    'That landed better than I expected.',
    'I do feel a little less on guard when you phrase it like that.'
  ],
  interpretive: [
    'That felt fast. I get why you said it, but I pulled back.',
    'I know that could be true, but hearing it that directly makes me defensive.'
  ],
  directive: [
    'I can do plans. I am very good at plans. They do not always touch the actual problem.',
    'Advice is easier for me than being known. I am noticing that right now.'
  ],
  vague: [
    'I am not sure what you are asking for there.',
    'When it is abstract like that, I disappear a little.'
  ],
  invalidating: [
    'Yeah... okay. That makes me want to shut this down.',
    'I know you might not mean it this way, but that felt dismissive.'
  ]
};

const pickLine = (lines, turnCount) => lines[turnCount % lines.length];

export const buildPatientResponse = ({ stage, alliance, style, turnCount }) => {
  const defense = chooseDefense(alliance);
  const stageSet = responseBank[stage] || responseBank.intake;
  const base = pickLine(stageSet[defense], turnCount);
  const pivot = pickLine(styleReactionPivots[style], turnCount + 1);

  if (alliance.safety < 30 && style !== 'empathic') {
    return `${pivot} ${pickLine(responseBank[stage].shutdown, turnCount + 2)}`;
  }

  if (alliance.trust > 62 && style === 'empathic') {
    return `${pivot} ${pickLine(responseBank[stage].partial_openness, turnCount + 2)}`;
  }

  return `${pivot} ${base}`;
};

const TherapistSkillsDojoDemo = () => {
  const [formState, setFormState] = useState({
    age: '32',
    presentingProblem: 'panic spikes and emotional shutdown after conflict',
    context: 'first-generation professional balancing family expectations and clinical training',
    setting: 'outpatient individual therapy',
    sessionStage: 'intake',
    challengeLevel: 'intermediate',
    mode: 'Pure Patient'
  });

  const [therapistInput, setTherapistInput] = useState('');
  const [turnCount, setTurnCount] = useState(0);
  const [alliance, setAlliance] = useState(makeBaselineAlliance('intermediate'));
  const [lastStyle, setLastStyle] = useState('empathic');
  const [transcript, setTranscript] = useState([]);

  const inferredCaseSummary = useMemo(
    () => `${formState.age}-year-old in ${formState.setting}; presenting issue: ${formState.presentingProblem}.`,
    [formState.age, formState.presentingProblem, formState.setting]
  );

  const startDemo = () => {
    const baseline = makeBaselineAlliance(formState.challengeLevel);
    setAlliance(baseline);
    setTurnCount(1);
    setLastStyle('empathic');

    const opener =
      formState.challengeLevel === 'advanced'
        ? `Hi. I almost skipped today. ${formState.presentingProblem} is getting harder to contain, and I do not want a quick fix conversation.`
        : `Hi. I have been putting this off, but I need help with ${formState.presentingProblem}. I can function, but it is costing me.`;

    setTranscript([{ speaker: 'patient', text: opener }]);
  };

  const onFieldChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleTherapistSend = () => {
    if (!therapistInput.trim()) return;

    const style = detectTherapistStyle(therapistInput);
    const nextAlliance = applyAllianceShift(alliance, style, formState.challengeLevel);
    const nextTurn = turnCount + 1;

    const patientText = buildPatientResponse({
      stage: formState.sessionStage,
      alliance: nextAlliance,
      style,
      turnCount: nextTurn
    });

    setTranscript((prev) => [
      ...prev,
      { speaker: 'therapist', text: therapistInput.trim() },
      { speaker: 'patient', text: patientText }
    ]);

    setTherapistInput('');
    setTurnCount(nextTurn);
    setLastStyle(style);
    setAlliance(nextAlliance);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Therapist Skills Dojo — Clinical Realism Demo
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Stateful patient simulation with alliance tracking and therapist-style-dependent branching.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Protocol demo: every therapist turn updates trust, safety, shame, hope, and resistance; the patient response
        changes based on those shifts rather than a fixed script.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Case Setup
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {inferredCaseSummary}
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Presenting Problem"
                  value={formState.presentingProblem}
                  onChange={onFieldChange('presentingProblem')}
                  fullWidth
                />
                <TextField label="Age" value={formState.age} onChange={onFieldChange('age')} fullWidth />
                <TextField
                  label="Cultural / social context"
                  value={formState.context}
                  onChange={onFieldChange('context')}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label="Therapy setting"
                  value={formState.setting}
                  onChange={onFieldChange('setting')}
                  fullWidth
                />
                <TextField
                  select
                  label="Session stage"
                  value={formState.sessionStage}
                  onChange={onFieldChange('sessionStage')}
                  fullWidth
                >
                  <MenuItem value="intake">Intake / Contact</MenuItem>
                  <MenuItem value="working">Working Contact</MenuItem>
                  <MenuItem value="core">Core Pattern Contact</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Challenge level"
                  value={formState.challengeLevel}
                  onChange={onFieldChange('challengeLevel')}
                  fullWidth
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Training mode"
                  value={formState.mode}
                  onChange={onFieldChange('mode')}
                  fullWidth
                >
                  <MenuItem value="Pure Patient">Mode A: Pure Patient</MenuItem>
                  <MenuItem value="Patient + Hidden Teaching Delay">Mode B: Hidden Teaching Delay</MenuItem>
                  <MenuItem value="Exam/Standardized Patient">Mode C: Standardized Patient</MenuItem>
                  <MenuItem value="High-Complexity Depth Work">Mode D: High-Complexity Depth Work</MenuItem>
                </TextField>

                <Button variant="contained" size="large" onClick={startDemo}>
                  Start Demo Session
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2.5, minHeight: 540 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
              <Chip label={`Challenge: ${challengeLabels[formState.challengeLevel]}`} color="primary" />
              <Chip label={`Stage: ${stageLabels[formState.sessionStage]}`} variant="outlined" />
              <Chip label={`Last therapist style: ${styleRules[lastStyle].label}`} variant="outlined" />
            </Stack>

            <Typography variant="h6" gutterBottom>
              Alliance State
            </Typography>
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {Object.entries(alliance).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                    {key}: {value}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={value}
                    color={key === 'shame' || key === 'resistance' ? 'warning' : 'primary'}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" gutterBottom>
              Session Transcript
            </Typography>

            {transcript.length === 0 ? (
              <Typography color="text.secondary">
                Start the demo, then respond as therapist. The simulator classifies your intervention style each turn and
                adjusts alliance + response realism accordingly.
              </Typography>
            ) : (
              <Stack spacing={1.5} sx={{ mb: 2 }}>
                {transcript.map((entry, idx) => (
                  <Box
                    key={`${entry.speaker}-${idx}`}
                    sx={{
                      alignSelf: entry.speaker === 'therapist' ? 'flex-end' : 'flex-start',
                      maxWidth: '92%',
                      bgcolor: entry.speaker === 'therapist' ? 'primary.light' : 'grey.100',
                      color: entry.speaker === 'therapist' ? 'primary.contrastText' : 'text.primary',
                      px: 1.5,
                      py: 1,
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {entry.speaker === 'therapist' ? 'Therapist' : 'Patient'}
                    </Typography>
                    <Typography>{entry.text}</Typography>
                  </Box>
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                label="Therapist response"
                value={therapistInput}
                onChange={(event) => setTherapistInput(event.target.value)}
                fullWidth
                multiline
                minRows={2}
              />
              <Button variant="contained" onClick={handleTherapistSend} sx={{ minWidth: 120 }}>
                Send
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TherapistSkillsDojoDemo;
