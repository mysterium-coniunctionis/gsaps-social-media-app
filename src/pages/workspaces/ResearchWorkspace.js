import React, { useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  Add as AddIcon,
  AttachFile,
  CheckCircle,
  CloudDownload,
  Description,
  FactCheck,
  Group as GroupIcon,
  History,
  Link as LinkIcon,
  OpenInNew,
  Science,
  TaskAlt,
  TextSnippet
} from '@mui/icons-material';
import { marked } from 'marked';
import { useToast } from '../../components/common';

const initialCitations = [
  {
    id: 'cit-001',
    title: 'MDMA-assisted therapy for PTSD (Phase 3)',
    doi: '10.1000/mdma.2024.001',
    note: 'Primary endpoint with 12-month durability',
    status: 'peer-reviewed'
  },
  {
    id: 'cit-002',
    title: 'Neuroplasticity markers following psilocybin',
    doi: '10.1000/psilo.2023.014',
    note: 'Includes fMRI connectivity maps',
    status: 'preprint'
  }
];

const initialDatasets = [
  {
    id: 'ds-01',
    name: 'CAPS-IV response curves',
    type: 'CSV',
    size: '2.4 MB',
    doi: '10.5281/zenodo.12345',
    verified: true
  },
  {
    id: 'ds-02',
    name: 'EEG raw signals (ketamine)',
    type: 'EDF',
    size: '740 MB',
    doi: '10.5281/zenodo.67890',
    verified: false
  }
];

const initialVersions = [
  {
    id: 'v1.3',
    label: 'v1.3 - added dosing schema',
    author: 'Dr. Li',
    timestamp: '2025-02-20 10:14 UTC',
    notes: 'Included revised titration ladder and safety pauses'
  },
  {
    id: 'v1.2',
    label: 'v1.2 - community review',
    author: 'Prof. Chen',
    timestamp: '2025-02-10 08:02 UTC',
    notes: 'Incorporated reviewer annotations and new consent language'
  },
  {
    id: 'v1.1',
    label: 'v1.1 - initial scaffold',
    author: 'A. Mendes',
    timestamp: '2025-01-18 17:33 UTC',
    notes: 'Baseline template with objectives and outcomes'
  }
];

const initialCollaborators = [
  { id: 'c1', name: 'Dr. Li', role: 'PI', status: 'editing' },
  { id: 'c2', name: 'A. Mendes', role: 'Data steward', status: 'reviewing' },
  { id: 'c3', name: 'Prof. Chen', role: 'Methodologist', status: 'idle' }
];

const protocolTemplates = [
  {
    id: 'template-acute',
    title: 'Acute safety protocol',
    description: 'Pre-session checks, exclusion criteria, and emergency playbooks.',
    body: `## Acute safety protocol\n\n- Verify vitals (BP, HR, SpO2) within 60 minutes of dosing.\n- Confirm sitter presence and escalation contacts.\n- Emergency medications staged and documented.\n- Psychological safety checklist completed.`
  },
  {
    id: 'template-integr',
    title: 'Integration framework',
    description: 'Structured integration points for qualitative and quantitative capture.',
    body: `## Integration framework\n\n- Day 1 interview: somatic markers + mood.\n- Day 7 survey: integration questionnaire + PROMIS.\n- Community reflection recorded with timestamps.\n- Annotate citations for integration tools.`
  },
  {
    id: 'template-random',
    title: 'Randomization block',
    description: 'Blinding, assignments, and deviation logging.',
    body: `## Randomization block\n\n- Block size: 6, stratified by prior exposure.\n- Blind code custodian: automation bot + steward.\n- Deviations logged with timestamps + investigator note.`
  }
];

const taskColumns = {
  backlog: [
    { id: 't1', title: 'Map citations to DOI badges', owner: 'A. Mendes', priority: 'High' },
    { id: 't2', title: 'Attach EEG dataset manifest', owner: 'Data team', priority: 'Medium' }
  ],
  active: [
    { id: 't3', title: 'Draft MDMA dosing appendix', owner: 'Dr. Li', priority: 'High' },
    { id: 't4', title: 'ORCID outreach for co-authors', owner: 'Comms', priority: 'Low' }
  ],
  review: [
    { id: 't5', title: 'Validate dataset checksum', owner: 'Data steward', priority: 'High' }
  ]
};

const ResearchWorkspace = () => {
  const toast = useToast();
  const [content, setContent] = useState(`# MDMA + Ketamine protocol\n\n- Objectives: safety, durability, and integration outcomes.\n- Link all datasets with DOIs and ORCID attribution.\n- Capture deviations and peer review in version history.`);
  const [citations, setCitations] = useState(initialCitations);
  const [datasets, setDatasets] = useState(initialDatasets);
  const [versions] = useState(initialVersions);
  const [selectedVersion, setSelectedVersion] = useState(initialVersions[0].id);
  const [collaborators] = useState(initialCollaborators);
  const [workspaceDoi, setWorkspaceDoi] = useState('10.5555/gsaps.workspace.2025.02');
  const [orcid, setOrcid] = useState('');

  const [citationForm, setCitationForm] = useState({ title: '', doi: '', note: '' });
  const [datasetForm, setDatasetForm] = useState({ name: '', type: '', size: '', doi: '' });

  const renderedMarkdown = useMemo(
    () => ({ __html: marked.parse(content || '') }),
    [content]
  );

  const addCitation = () => {
    if (!citationForm.title || !citationForm.doi) {
      toast.error('Citation requires a title and DOI');
      return;
    }

    setCitations(prev => [
      ...prev,
      {
        id: `cit-${prev.length + 1}`,
        ...citationForm,
        status: 'pending-review'
      }
    ]);
    setCitationForm({ title: '', doi: '', note: '' });
    toast.success('Citation added with inline DOI link');
  };

  const addDataset = () => {
    if (!datasetForm.name || !datasetForm.type) {
      toast.error('Dataset requires a name and type');
      return;
    }

    setDatasets(prev => [
      ...prev,
      {
        id: `ds-${prev.length + 1}`,
        ...datasetForm,
        verified: false
      }
    ]);
    setDatasetForm({ name: '', type: '', size: '', doi: '' });
    toast.success('Dataset attached with provenance metadata');
  };

  const applyTemplate = (template) => {
    setContent((prev) => `${prev}\n\n${template.body}`);
    toast.success(`${template.title} inserted into workspace`);
  };

  const mintDoi = () => {
    const minted = `10.5555/gsaps.workspace.${Date.now()}`;
    setWorkspaceDoi(minted);
    toast.success('Workspace DOI minted and reserved');
  };

  const exportFormat = (format) => {
    toast.success(`Export queued as ${format}`);
  };

  const linkOrcid = () => {
    if (!orcid) {
      toast.error('Enter your ORCID iD (0000-0000-0000-0000)');
      return;
    }
    toast.success('ORCID linked for attribution');
  };

  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Research workspace</Typography>
          <Typography color="text.secondary">Collaborative protocol drafting with citations, datasets, and DOIs.</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<CloudDownload />} onClick={() => exportFormat('PDF')}>Export PDF</Button>
          <Button variant="outlined" startIcon={<TextSnippet />} onClick={() => exportFormat('DOCX')}>Export DOCX</Button>
          <Button variant="outlined" startIcon={<Description />} onClick={() => exportFormat('Markdown')}>Export Markdown</Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Rich text / Markdown editor"
              subheader="Track citations inline and maintain a citable record of edits"
              action={<Chip icon={<History />} label={`Version ${selectedVersion}`} color="primary" />}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Protocol content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  minRows={10}
                  fullWidth
                  helperText="Supports Markdown for headings, checklists, and links"
                />
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Live preview with citations
                  </Typography>
                  <Box sx={{ typography: 'body2' }} dangerouslySetInnerHTML={renderedMarkdown} />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Task board"
              subheader="Project workspace with ready-to-ship tasks"
              avatar={<TaskAlt color="primary" />}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {Object.entries(taskColumns).map(([column, items]) => (
                  <Grid item xs={12} md={4} key={column}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'capitalize' }}>
                      {column}
                    </Typography>
                    <Stack spacing={1}>
                      {items.map((task) => (
                        <Box
                          key={task.id}
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 2,
                            p: 1.5,
                            bgcolor: 'background.paper'
                          }}
                        >
                          <Typography fontWeight="bold">{task.title}</Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                            <Chip size="small" icon={<FactCheck />} label={task.owner} />
                            <Chip size="small" color={task.priority === 'High' ? 'error' : 'warning'} label={task.priority} />
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Protocol templates"
              subheader="Drop in vetted blocks for consistent methods"
              avatar={<Science color="primary" />}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                {protocolTemplates.map((template) => (
                  <Box
                    key={template.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">{template.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{template.description}</Typography>
                    </Box>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => applyTemplate(template)}>
                      Insert
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Citations" subheader="Attach DOIs and notes" avatar={<Description color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                {citations.map((citation) => (
                  <Box key={citation.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25 }}>
                    <Typography fontWeight="bold">{citation.title}</Typography>
                    <Typography variant="body2" color="text.secondary">DOI: {citation.doi}</Typography>
                    <Chip
                      size="small"
                      label={citation.status}
                      color={citation.status === 'peer-reviewed' ? 'success' : 'warning'}
                      sx={{ mt: 0.5 }}
                    />
                    {citation.note && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {citation.note}
                      </Typography>
                    )}
                  </Box>
                ))}

                <Divider />
                <Typography variant="subtitle2">Add citation</Typography>
                <TextField
                  label="Title"
                  value={citationForm.title}
                  onChange={(e) => setCitationForm((prev) => ({ ...prev, title: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="DOI"
                  value={citationForm.doi}
                  onChange={(e) => setCitationForm((prev) => ({ ...prev, doi: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Note"
                  value={citationForm.note}
                  onChange={(e) => setCitationForm((prev) => ({ ...prev, note: e.target.value }))}
                  size="small"
                  fullWidth
                  multiline
                  minRows={2}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={addCitation}>
                  Add citation
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Dataset attachments" subheader="Link raw and derived data" avatar={<AttachFile color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                {datasets.map((dataset) => (
                  <Box key={dataset.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25 }}>
                    <Typography fontWeight="bold">{dataset.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dataset.type} • {dataset.size || 'size pending'}
                    </Typography>
                    {dataset.doi && (
                      <Typography variant="body2" color="text.secondary">DOI: {dataset.doi}</Typography>
                    )}
                    <Chip
                      size="small"
                      sx={{ mt: 0.5 }}
                      label={dataset.verified ? 'checksum verified' : 'awaiting verification'}
                      color={dataset.verified ? 'success' : 'warning'}
                    />
                  </Box>
                ))}

                <Divider />
                <Typography variant="subtitle2">Attach dataset</Typography>
                <TextField
                  label="Name"
                  value={datasetForm.name}
                  onChange={(e) => setDatasetForm((prev) => ({ ...prev, name: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Type (CSV, EDF, etc.)"
                  value={datasetForm.type}
                  onChange={(e) => setDatasetForm((prev) => ({ ...prev, type: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Size"
                  value={datasetForm.size}
                  onChange={(e) => setDatasetForm((prev) => ({ ...prev, size: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="DOI"
                  value={datasetForm.doi}
                  onChange={(e) => setDatasetForm((prev) => ({ ...prev, doi: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={addDataset}>
                  Attach dataset
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Version history" subheader="Restore and audit collaborative edits" avatar={<History color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                {versions.map((version) => (
                  <Box
                    key={version.id}
                    sx={{
                      border: 1,
                      borderColor: selectedVersion === version.id ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      p: 1.25
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography fontWeight="bold">{version.label}</Typography>
                      <Button size="small" onClick={() => setSelectedVersion(version.id)}>Load</Button>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{version.timestamp}</Typography>
                    <Typography variant="body2">By {version.author}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>{version.notes}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardHeader title="Collaboration" subheader="Live presence and editing rights" avatar={<GroupIcon color="primary" />} />
            <Divider />
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                Collaborative editing enabled. Presence is tracked for audit trails.
              </Alert>
              <Stack spacing={1}>
                {collaborators.map((collaborator) => (
                  <Box key={collaborator.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{collaborator.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography fontWeight="bold">{collaborator.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{collaborator.role}</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={collaborator.status}
                      color={collaborator.status === 'editing' ? 'success' : collaborator.status === 'reviewing' ? 'warning' : 'default'}
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Attribution & identifiers" subheader="ORCID linking and DOI minting" avatar={<LinkIcon color="primary" />} />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                <TextField
                  label="Workspace DOI"
                  value={workspaceDoi}
                  onChange={(e) => setWorkspaceDoi(e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={mintDoi} aria-label="Mint DOI">
                        <OpenInNew />
                      </IconButton>
                    )
                  }}
                />
                <TextField
                  label="Your ORCID iD"
                  placeholder="0000-0000-0000-0000"
                  value={orcid}
                  onChange={(e) => setOrcid(e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={linkOrcid} aria-label="Link ORCID">
                        <LinkIcon />
                      </IconButton>
                    )
                  }}
                />
                <Button variant="contained" startIcon={<CheckCircle />} onClick={linkOrcid}>
                  Confirm attribution
                </Button>
                <Chip icon={<CloudDownload />} label="Export CSV / JSON / PDF" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResearchWorkspace;
