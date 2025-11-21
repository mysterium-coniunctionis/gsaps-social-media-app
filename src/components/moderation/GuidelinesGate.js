import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert
} from '@mui/material';
import { Gavel as GavelIcon, CheckCircle as CheckIcon } from '@mui/icons-material';

const GuidelinesGate = ({ open, guidelines, onAccept, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <GavelIcon color="primary" />
      Community Guidelines ({guidelines.version})
    </DialogTitle>
    <DialogContent dividers>
      <Alert severity="info" sx={{ mb: 2 }}>
        You need to review and accept the latest guidelines before posting. This keeps
        reports, appeals, and safety reviews predictable for everyone.
      </Alert>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Last updated {guidelines.lastUpdated} • {guidelines.summary}
      </Typography>
      <List>
        {guidelines.items.map((item) => (
          <ListItem key={item}>
            <ListItemIcon>
              <CheckIcon color="success" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Chip label="Required before posting" color="warning" sx={{ mt: 1 }} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onAccept} variant="contained">
        I agree and will comply
      </Button>
    </DialogActions>
  </Dialog>
);

export default GuidelinesGate;
