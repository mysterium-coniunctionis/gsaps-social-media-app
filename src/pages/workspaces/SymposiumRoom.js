import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Badge,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  Bolt,
  CalendarToday,
  Chat,
  Checklist,
  CoPresent,
  EventAvailable,
  Group,
  Insights,
  PlayCircle,
  Send,
  ThumbUp,
  TipsAndUpdates
} from '@mui/icons-material';
import { marked } from 'marked';
import { useSymposiumChannel } from '../../api/symposiumClient';
import { findSymposiumById } from '../../data/symposiumData';
import { actionItems, citationSuggestions, generateSummary } from '../../api/aiService';

const presenceColors = {
  online: 'success',
  idle: 'warning',
  editing: 'info',
  offline: 'default'
};

const SymposiumRoom = () => {
  const { roomId = 'symp-001' } = useParams();
  const symposium = findSymposiumById(roomId);
  const [noteDraft, setNoteDraft] = useState('');
  const [chatDraft, setChatDraft] = useState('');
  const [agendaDraft, setAgendaDraft] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [aiActions, setAiActions] = useState([]);
  const [aiCitations, setAiCitations] = useState([]);
  const [aiState, setAiState] = useState('idle');
  const [aiError, setAiError] = useState('');

  const {
    agenda,
    speakerQueue,
    notes,
    polls,
    chat,
    canvas,
    presence,
    stageReactions,
    addAgendaItem,
    enqueueSpeaker,
    addNote,
    castPollVote,
    sendChatMessage,
    sendStageReaction,
    updateCanvasDraft,
    updatePresenceStatus,
    isConnected,
    lastEvent
  } = useSymposiumChannel(roomId);

  const renderedCanvas = useMemo(
    () => ({ __html: marked.parse(canvas || '') }),
    [canvas]
  );

  useEffect(() => {
    const hydratePresence = setTimeout(() => updatePresenceStatus('online'), 300);
    return () => clearTimeout(hydratePresence);
  }, [updatePresenceStatus]);

  useEffect(() => () => updatePresenceStatus('offline'), [updatePresenceStatus]);

  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (!editing) return undefined;

    const idleTimer = setTimeout(() => {
      setEditing(false);
      updatePresenceStatus('online');
    }, 4000);

    return () => clearTimeout(idleTimer);
  }, [editing, updatePresenceStatus]);

  const runAiNotetaker = useCallback(async () => {
    setAiState('loading');
    setAiError('');
    try {
      const [summary, actions, citations] = await Promise.all([
        generateSummary(notes),
        actionItems(notes),
        citationSuggestions(notes)
      ]);
      setAiSummary(summary);
      setAiActions(actions);
      setAiCitations(citations);
      setAiState('success');
    } catch (err) {
      setAiError(err.message || 'Failed to run AI notetaker');
      setAiState('error');
    }
  }, [notes]);

  useEffect(() => {
    if (notes.length) {
      runAiNotetaker();
    } else {
      setAiSummary('');
      setAiActions([]);
      setAiCitations([]);
      setAiState('idle');
    }
  }, [notes, runAiNotetaker]);

  const handleSendNote = () => {
    const trimmed = noteDraft.trim();
    if (!trimmed) return;
    addNote({ author: 'You', body: trimmed });
    setNoteDraft('');
  };

  const handleSendChat = () => {
    const trimmed = chatDraft.trim();
    if (!trimmed) return;
    sendChatMessage({ author: 'You', body: trimmed, ts: new Date().toISOString() });
    setChatDraft('');
  };

  const handleAddAgenda = () => {
    const trimmed = agendaDraft.trim();
    if (!trimmed) return;
    addAgendaItem({ title: trimmed, owner: 'You', time: 'TBD' });
    setAgendaDraft('');
  };

  const safeActions = aiActions || [];
  const safeCitations = aiCitations || [];

  const attendeeAvatars = (symposium.attendees || []).slice(0, 4);
  const roster = useMemo(() => {
    const attendeeMap = (symposium.attendees || []).reduce((acc, attendee) => {
      acc[attendee.id] = attendee;
      return acc;
    }, {});

    return Object.entries(presence).map(([id, status]) => ({
      id,
      name: attendeeMap[id]?.name || 'Guest',
      role: attendeeMap[id]?.role || 'Participant',
      status
    }));
  }, [presence, symposium.attendees]);

  const reactionOptions = useMemo(() => ['👏', '🔥', '💡', '❤️'], []);

  return (
    <Box sx={{ py: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Live Symposia</Typography>
          <Typography color="text.secondary">Real-time stage, agenda, and research protocol drafting.</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip icon={<EventAvailable />} label={symposium.topic} variant="outlined" />
            <Chip icon={<CalendarToday />} label={`Room code: ${symposium.roomCode}`} />
            <Chip color={isConnected ? 'success' : 'warning'} label={isConnected ? 'Live sync' : 'Offline demo'} />
          </Stack>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <AvatarGroup max={4} sx={{ mr: 1 }}>
            {attendeeAvatars.map((attendee) => (
              <Avatar key={attendee.id}>{attendee.name.charAt(0)}</Avatar>
            ))}
          </AvatarGroup>
          <Button variant="contained" startIcon={<PlayCircle />} component={RouterLink} to="/events">
            Upcoming symposia
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 2 }}>
            <CardHeader
              title={symposium.stage.title}
              subheader="Stage + stream placeholder with reactions"
              avatar={<CoPresent color="primary" />}
              action={<Chip icon={<Bolt />} color="secondary" label="On air" />}
            />
            <Divider />
            <CardContent>
              <Box sx={{
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.default',
                minHeight: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Typography color="text.secondary">Embed livestream or stage controls here</Typography>
                <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 12, right: 12 }}>
                  {reactionOptions.map((emoji) => (
                    <Button key={emoji} size="small" variant="outlined" onClick={() => sendStageReaction(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </Stack>
              </Box>
              {!!stageReactions.length && (
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                  {stageReactions.slice(0, 6).map((rx) => (
                    <Chip key={rx.id} label={`${rx.emoji} • ${rx.user}`} size="small" />
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Chat + reactions"
              subheader="Attendee chat, inline emojis, and live reactions"
              avatar={<Chat color="primary" />}
            />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                <Stack spacing={1} sx={{ maxHeight: 220, overflow: 'auto', pr: 1 }}>
                  {chat.length === 0 && (
                    <Typography color="text.secondary">No chat yet. Say hi to the stage!</Typography>
                  )}
                  {chat.map((message) => (
                    <Box key={message.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}>
                      <Typography fontWeight="bold">{message.author}</Typography>
                      <Typography variant="body2">{message.body}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    placeholder="Send a reaction or question"
                    value={chatDraft}
                    onChange={(e) => setChatDraft(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <IconButton color="primary" onClick={handleSendChat} aria-label="Send chat">
                    <Send />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Protocol canvas"
              subheader="Shared markdown editor with live presence"
              avatar={<Checklist color="primary" />}
              action={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Presence
                  </Typography>
                  <AvatarGroup max={6}>
                    {roster.map((attendee) => (
                      <Badge
                        key={attendee.id}
                        overlap="circular"
                        color={presenceColors[attendee.status] || 'default'}
                        variant="dot"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      >
                        <Avatar sx={{ borderColor: 'divider', border: 1 }}>
                          {attendee.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    ))}
                  </AvatarGroup>
                </Stack>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Live protocol"
                    value={canvas}
                    onChange={(e) => {
                      setEditing(true);
                      updatePresenceStatus('editing');
                      updateCanvasDraft(e.target.value);
                    }}
                    multiline
                    minRows={10}
                    fullWidth
                    helperText={`Last event: ${lastEvent?.type || 'waiting...'}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Live preview
                    </Typography>
                    <Box sx={{ typography: 'body2' }} dangerouslySetInnerHTML={renderedCanvas} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Agenda" subheader="Live run of show" avatar={<CalendarToday color="primary" />} />
            <Divider />
            <CardContent>
              <List dense>
                {agenda.map((item) => (
                  <ListItem key={item.id} disableGutters sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <CalendarToday />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`${item.time || 'TBD'} • ${item.owner || 'TBD'}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add agenda item"
                  value={agendaDraft}
                  onChange={(e) => setAgendaDraft(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" onClick={handleAddAgenda}>Add</Button>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Speaker queue" subheader="Backstage + live" avatar={<Group color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1}>
                {speakerQueue.map((speaker) => (
                  <Box key={speaker.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}>
                    <Typography fontWeight="bold">{speaker.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{speaker.status}</Typography>
                  </Box>
                ))}
                <Button variant="outlined" onClick={() => enqueueSpeaker({ name: 'Guest moderator', status: 'queued' })}>
                  Add to queue
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Attendee roster"
              subheader="Presence and status"
              avatar={<CoPresent color="primary" />}
            />
            <Divider />
            <CardContent>
              <Stack spacing={1}>
                {roster.map((attendee) => (
                  <Stack key={attendee.id} direction="row" spacing={1} alignItems="center">
                    <Avatar>{attendee.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography fontWeight="bold">{attendee.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{attendee.role}</Typography>
                    </Box>
                    <Chip
                      label={attendee.status}
                      color={presenceColors[attendee.status] || 'default'}
                      size="small"
                      sx={{ ml: 'auto' }}
                    />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Live notes" subheader="Shared protocol notepad" avatar={<Insights color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1} sx={{ maxHeight: 200, overflow: 'auto' }}>
                {notes.map((note) => (
                  <Box key={note.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}>
                    <Typography fontWeight="bold">{note.author}</Typography>
                    <Typography variant="body2">{note.body}</Typography>
                    <Typography variant="caption" color="text.secondary">{note.timestamp}</Typography>
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  placeholder="Capture a note"
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  fullWidth
                />
                <IconButton color="primary" onClick={handleSendNote} aria-label="Send note">
                  <Send />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Live polls" subheader="Collect attendee input" avatar={<ThumbUp color="primary" />} />
            <Divider />
            <CardContent>
              {(polls || []).map((poll) => (
                <Box key={poll.id} sx={{ mb: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>{poll.question}</Typography>
                  {poll.options.map((opt) => (
                    <Stack key={opt.id} direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Button size="small" variant="outlined" onClick={() => castPollVote(poll.id, opt.id)}>
                        Vote
                      </Button>
                      <Typography variant="body2">{opt.label}</Typography>
                      <LinearProgress variant="determinate" value={Math.min(100, (opt.votes || 0) * 5)} sx={{ flex: 1 }} />
                      <Chip label={opt.votes || 0} size="small" />
                    </Stack>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="AI Notetaker"
              subheader="Summaries, action items, and citations"
              avatar={<TipsAndUpdates color="primary" />}
              action={
                <Button size="small" variant="outlined" onClick={runAiNotetaker} disabled={aiState === 'loading'}>
                  Refresh
                </Button>
              }
            />
            <Divider />
            <CardContent>
              {aiState === 'loading' && <LinearProgress sx={{ mb: 2 }} />}
              {aiError && <Alert severity="error" sx={{ mb: 1 }}>{aiError}</Alert>}
              {aiSummary && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Summary</Typography>
                  <Typography variant="body2">{aiSummary}</Typography>
                </Box>
              )}
              {safeActions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Action items</Typography>
                  <List dense>
                    {safeActions.map((item, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              {safeCitations.length > 0 && (
                <Box>
                  <Typography variant="subtitle2">Citations</Typography>
                  <List dense>
                    {safeCitations.map((cit) => (
                      <ListItem key={cit.id}>
                        <ListItemText
                          primary={cit.title}
                          secondary={
                            <Link href={`https://doi.org/${cit.doi}`} target="_blank" rel="noreferrer">
                              {cit.doi}
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              {aiState === 'idle' && (
                <Typography variant="body2" color="text.secondary">
                  AI will summarize as soon as notes appear.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SymposiumRoom;
