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

const makeResponses = ({ challengeLevel, sessionStage, presentingProblem, age }) => {
  const shared = [
    `Uh... I can start. I almost cancelled today, honestly. ${presentingProblem || 'I have been feeling off'} has been getting louder, but I still keep telling people I'm fine.`,
    "I don't totally know what you want me to say first. I can give you the bullet points if that's easier... but that's kind of what I always do.",
    'I keep functioning at work, so part of me thinks this is dramatic. Then I get home and it all hits at once.',
    "I heard your question. I'm not avoiding it... I just don't have a neat answer yet.",
    'Can we slow down for a second? When it gets too direct I kind of go blank.'
  ];

  if (challengeLevel === 'advanced') {
    return [
      `I'm ${age || 34}, not new to therapy, and still somehow doing the same loop. So... either I'm stubborn or scared. Probably both.`,
      'You seem competent, which is good. Also slightly terrifying. People who get me quickly usually decide what I am before I finish a sentence.',
      'I can explain my pattern in detail and still not feel anything while I say it. Then later I crash and pretend I am just tired.',
      'If you push for the core thing right now, I will get polite and give you a clean story. It will sound true, and it will not be the truth.',
      'I want help, but I also do not want to be managed. Those are both true.'
    ];
  }

  if (challengeLevel === 'intermediate') {
    return [
      ...shared,
      sessionStage === 'working'
        ? 'Last week I said it was just stress. That was only half true. I have been avoiding people I actually care about.'
        : 'I know this is early, I just... I need to know you are not going to force this faster than I can handle.'
    ];
  }

  return [
    `Hi. I'm ${age || 29}. I wasn't sure if I should do this, but I think I need help with ${presentingProblem || 'anxiety and burnout'}.`,
    'I can tell I am talking around it. Sorry. I do that when I am nervous.',
    'The outside of my life looks okay. The inside does not feel okay.',
    'It helps when you ask one question at a time. I can answer better that way.',
    'I feel embarrassed even saying that out loud.'
  ];
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
  const [transcript, setTranscript] = useState([]);

  const responses = useMemo(
    () => makeResponses(formState),
    [formState]
  );

  const startDemo = () => {
    setTurnCount(1);
    setTranscript([
      {
        speaker: 'patient',
        text: responses[0]
      }
    ]);
  };

  const handleTherapistSend = () => {
    if (!therapistInput.trim()) return;

    const nextTurn = turnCount + 1;
    const patientText = responses[Math.min(nextTurn - 1, responses.length - 1)];

    setTranscript((prev) => [
      ...prev,
      { speaker: 'therapist', text: therapistInput.trim() },
      { speaker: 'patient', text: patientText }
    ]);

    setTherapistInput('');
    setTurnCount(nextTurn);
  };

  const onFieldChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Therapist Skills Dojo — Clinical Realism Demo
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Configure a psychologically realistic simulated patient and run a short training encounter with nonlinear,
        defensive, and alliance-sensitive responses.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Demo focus: realism over theatrics. Patient responses are paced to mimic guarded early contact, mixed insight,
        and interpersonal testing.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Case Setup
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
              <Chip label={`Stage: ${formState.sessionStage}`} variant="outlined" />
              <Chip label={formState.mode} variant="outlined" />
            </Stack>

            <Typography variant="h6" gutterBottom>
              Session Transcript
            </Typography>

            {transcript.length === 0 ? (
              <Typography color="text.secondary">
                Start the demo to generate the patient opener. Then type therapist responses to observe evolving
                realism and defensive shifts.
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
