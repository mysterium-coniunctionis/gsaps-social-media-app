import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  LinearProgress
} from '@mui/material';
import { Assessment, Badge, Checklist, WorkspacePremium } from '@mui/icons-material';
import { useSubscription } from '../../context/SubscriptionContext';

const OrgReporting = () => {
  const { licenses, credentials, organization } = useSubscription();

  const utilization = licenses.map(license => ({
    id: license.id,
    utilization: Math.round((license.seatsUsed / license.seats) * 100),
    label: license.label
  }));

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Organization Reporting
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Monitor license utilization, CE-bearing course access, and verifiable credential issuance.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Assessment color="primary" />
                <Typography variant="h6">License Utilization</Typography>
              </Stack>
              {utilization.map(item => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">{item.label}</Typography>
                    <Typography variant="body2">{item.utilization}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.utilization}
                    color={item.utilization > 85 ? 'warning' : 'primary'}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Checklist color="primary" />
                <Typography variant="h6">Compliance Snapshot</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Seat governance is enforced for CE-bearing courses and enterprise licenses.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                <Chip label={`${organization.seatsUsed} seats in use`} color="primary" />
                <Chip label={`Auto-issue certificates: ${organization.autoIssueCertificates ? 'On' : 'Off'}`} color="success" />
                <Chip label={`Billing contact: ${organization.billingEmail}`} color="secondary" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Badge color="primary" />
                <Typography variant="h6">Credential Issuance</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Verifiable credentials issued for completed CE courses.
              </Typography>
              <List dense sx={{ maxHeight: 260, overflow: 'auto' }}>
                {credentials.slice(0, 5).map(credential => (
                  <ListItem key={credential.id} divider>
                    <ListItemText
                      primary={credential.courseTitle}
                      secondary={`Issued to ${credential.issuedTo} • ${credential.ceCredits || 0} CE • ${new Date(credential.issuedAt).toLocaleDateString()}`}
                    />
                    <Chip label="Verifiable" color="success" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <WorkspacePremium color="primary" />
            <Typography variant="h6">CE License Coverage</Typography>
          </Stack>
          <Grid container spacing={2}>
            {licenses.map(license => (
              <Grid item xs={12} md={4} key={license.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography fontWeight="bold">{license.label}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Scope: {Array.isArray(license.scope) ? license.scope.join(', ') : 'All courses'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      CE coverage: {license.ceIncluded ? 'Included' : 'Excluded'}
                    </Typography>
                    <Typography variant="body2">Seats: {license.seatsUsed}/{license.seats}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrgReporting;
