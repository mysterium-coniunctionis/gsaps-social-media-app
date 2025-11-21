import React, { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Avatar
} from '@mui/material';
import {
  ReportProblem as ReportIcon,
  Shield as ShieldIcon,
  Gavel as GavelIcon,
  History as HistoryIcon,
  Add as AddIcon,
  Policy as PolicyIcon,
  Security as SecurityIcon,
  ListAlt as ListIcon
} from '@mui/icons-material';
import {
  appealQueue,
  communityGuidelines,
  defaultBlocklist,
  detectionSummary,
  escalationPolicies,
  reportQueue
} from '../data/moderation/moderationData';
import {
  getAuditLog,
  getBlocklist,
  recordAuditEvent,
  saveBlocklist
} from '../utils/moderation';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={{ bgcolor: `${color}.main`, color: 'common.white' }}>{icon}</Avatar>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const QueueCard = ({ title, items, icon }) => (
  <Card>
    <CardHeader title={title} avatar={icon} />
    <CardContent>
      <Stack spacing={2}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography fontWeight="bold">{item.id}</Typography>
              <Chip label={item.status} size="small" color="warning" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.summary}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={item.type} size="small" />
              <Chip label={`Reporter: ${item.reporter}`} size="small" variant="outlined" />
              <Chip label={`Assignee: ${item.assignee}`} size="small" variant="outlined" />
              <Chip label={`Severity: ${item.severity}`} size="small" color="error" />
            </Stack>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const AppealCard = ({ title, items }) => (
  <Card>
    <CardHeader title={title} avatar={<GavelIcon color="primary" />} />
    <CardContent>
      <Stack spacing={2}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">{item.id}</Typography>
              <Chip label={item.status} size="small" color="info" />
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Linked report {item.reportId} — previous action: {item.previousAction}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Requested outcome: {item.requestedOutcome}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const EscalationCard = ({ policies }) => (
  <Card>
    <CardHeader title="Escalation Policies" avatar={<PolicyIcon color="primary" />} />
    <CardContent>
      <List>
        {policies.map((policy) => (
          <ListItem key={policy.trigger} alignItems="flex-start">
            <ListItemIcon>
              <ShieldIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary={policy.trigger}
              secondary={
                <>
                  <Typography variant="body2">{policy.action}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    SLA: {policy.sla}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

const AuditLogCard = ({ entries }) => (
  <Card>
    <CardHeader title="Audit Log" avatar={<HistoryIcon color="primary" />} />
    <CardContent>
      <Stack spacing={1.5}>
        {entries.map((entry) => (
          <Box key={entry.id} sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
            <Typography fontWeight="bold">{entry.event}</Typography>
            <Typography variant="body2" color="text.secondary">
              {entry.detail}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {entry.actor} • {new Date(entry.timestamp).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [blocklist, setBlocklist] = useState(() => getBlocklist());
  const [newTerm, setNewTerm] = useState('');
  const auditLog = useMemo(() => getAuditLog(), []);

  const totals = useMemo(
    () => [
      { title: 'Open reports', value: reportQueue.length, icon: <ReportIcon />, color: 'error' },
      { title: 'Active appeals', value: appealQueue.length, icon: <GavelIcon />, color: 'info' },
      { title: 'Automations', value: detectionSummary.totals.autoFlagged, icon: <SecurityIcon />, color: 'primary' }
    ],
    []
  );

  const handleAddTerm = () => {
    if (!newTerm.trim()) return;

    const updated = {
      ...blocklist,
      custom: [...(blocklist.custom || defaultBlocklist.custom), newTerm.trim()]
    };
    setBlocklist(saveBlocklist(updated));
    recordAuditEvent('Blocklist updated', currentUser?.username || 'admin', `Added term: ${newTerm.trim()}`);
    setNewTerm('');
  };

  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <ShieldIcon color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Trust & Safety
        </Typography>
        <Chip label="Admins & Moderators" color="secondary" />
      </Stack>

      <Grid container spacing={2}>
        {totals.map((stat) => (
          <Grid item xs={12} md={4} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <QueueCard title="Reports" items={reportQueue} icon={<ReportIcon color="error" />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppealCard title="Appeals" items={appealQueue} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Automated detection" avatar={<SecurityIcon color="primary" />} />
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip label={`Quarantined: ${detectionSummary.totals.quarantined}`} color="error" />
                <Chip label={`Auto-flagged: ${detectionSummary.totals.autoFlagged}`} color="warning" />
                <Chip label={`PII matches: ${detectionSummary.totals.piiDetected}`} color="info" />
              </Stack>
              <List>
                {detectionSummary.recentFindings.map((finding) => (
                  <ListItem key={finding.id}>
                    <ListItemIcon>
                      <ShieldIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${finding.signal} • ${finding.location}`}
                      secondary={`${finding.action} • ${new Date(finding.timestamp).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <EscalationCard policies={escalationPolicies} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Blocklists" avatar={<ListIcon color="primary" />} />
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                Configure what automated detection looks for. Updates are tracked in the audit log.
              </Alert>
              <Grid container spacing={1}>
                {Object.entries(blocklist).map(([category, terms]) => (
                  <Grid item xs={12} sm={6} key={category}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      {category.toUpperCase()} ({terms.length})
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {terms.map((term) => (
                        <Chip key={term} label={term} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1}>
                <TextField
                  label="Add custom term"
                  value={newTerm}
                  size="small"
                  onChange={(e) => setNewTerm(e.target.value)}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddTerm}>
                  Add
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Community guidelines" avatar={<GavelIcon color="primary" />} />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Latest version: {communityGuidelines.version} (updated {communityGuidelines.lastUpdated})
              </Typography>
              <List>
                {communityGuidelines.items.map((item) => (
                  <ListItem key={item}>
                    <ListItemIcon>
                      <GavelIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <AuditLogCard entries={auditLog} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
