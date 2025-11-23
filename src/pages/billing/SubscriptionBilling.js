import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button
} from '@mui/material';
import { CreditCard, Group, ReceiptLong, Verified, WorkspacePremium } from '@mui/icons-material';
import { useSubscription } from '../../context/SubscriptionContext';
import subscriptionPlans from '../../data/subscriptionPlans';

const SubscriptionBilling = () => {
  const { organization, licenses, invoices, activePlan } = useSubscription();

  const seatUtilization = Math.round((organization.seatsUsed / organization.seats) * 100);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Billing & Subscriptions
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Stripe-backed billing with license-based seats, CE coverage, and invoice history.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <CreditCard color="primary" />
                <Typography variant="h6">Active Plan</Typography>
              </Stack>
              <Typography variant="h4" fontWeight="bold">
                {activePlan.label}
              </Typography>
              <Typography color="text.secondary">{activePlan.price} via Stripe</Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {activePlan.features.map(feature => (
                  <Stack direction="row" key={feature} spacing={1} alignItems="center">
                    <Verified fontSize="small" color="success" />
                    <Typography variant="body2">{feature}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                Manage in Stripe
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Group color="primary" />
                <Typography variant="h6">Seat Management</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {organization.seatsUsed} of {organization.seats} seats in use across licenses
              </Typography>
              <LinearProgress
                variant="determinate"
                value={seatUtilization}
                sx={{ height: 10, borderRadius: 5, mb: 2 }}
                color={seatUtilization > 85 ? 'warning' : 'primary'}
              />
              <Grid container spacing={2}>
                {licenses.map(license => (
                  <Grid item xs={12} sm={6} key={license.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <WorkspacePremium color="primary" />
                          <Typography fontWeight="bold">{license.label}</Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2" sx={{ my: 1 }}>
                          Seats {license.seatsUsed}/{license.seats} · Expires {license.expiresAt}
                        </Typography>
                        <Chip
                          label={Array.isArray(license.scope) ? license.scope.join(', ') : 'All Content'}
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                        {license.ceIncluded ? (
                          <Chip label="CE Included" size="small" color="success" />
                        ) : (
                          <Chip label="No CE" size="small" color="warning" />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <ReceiptLong color="primary" />
                <Typography variant="h6">Invoice History</Typography>
              </Stack>
              <List dense>
                {invoices.map(invoice => (
                  <ListItem key={invoice.id} disableGutters divider>
                    <ListItemText
                      primary={`${invoice.period} • ${invoice.amount}`}
                      secondary={`Status: ${invoice.status} · Seats: ${invoice.seats} · Due ${invoice.dueAt}`}
                    />
                    <Chip label={invoice.status} color={invoice.status === 'Paid' ? 'success' : 'warning'} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Verified color="primary" />
                <Typography variant="h6">Plan Comparison</Typography>
              </Stack>
              <Grid container spacing={1}>
                {subscriptionPlans.map(plan => (
                  <Grid item xs={12} sm={6} key={plan.id}>
                    <Card variant={plan.id === activePlan.id ? 'outlined' : 'elevation'}>
                      <CardContent>
                        <Typography fontWeight="bold">{plan.label}</Typography>
                        <Typography color="text.secondary">{plan.price}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {plan.seats} seats · {plan.billingProvider} billing
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscriptionBilling;
