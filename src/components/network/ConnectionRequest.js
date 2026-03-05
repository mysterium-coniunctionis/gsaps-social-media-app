import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  TextField,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Collapse
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Message as MessageIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon
} from '@mui/icons-material';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  getConnectionRequests,
  acceptConnectionRequest,
  declineConnectionRequest,
  sendConnectionRequest
} from '../../api/networkService';

/**
 * Connection Request Management Component
 * Handles incoming/outgoing connection requests
 */
const ConnectionRequest = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedProfile] = useState(null);
  const [connectionType, setConnectionType] = useState('peer');
  const [message, setMessage] = useState('');
  const [suggestions] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getConnectionRequests(currentUser?.id);
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId, withMessage = '') => {
    try {
      setProcessingId(requestId);
      await acceptConnectionRequest(requestId, withMessage);
      setSuccessMessage('Connection request accepted!');
      await loadRequests();
      setExpandedRequest(null);
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingId(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDecline = async (requestId, withMessage = '') => {
    try {
      setProcessingId(requestId);
      await declineConnectionRequest(requestId, withMessage);
      setSuccessMessage('Connection request declined');
      await loadRequests();
      setExpandedRequest(null);
    } catch (error) {
      console.error('Error declining request:', error);
    } finally {
      setProcessingId(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSendRequest = async () => {
    try {
      await sendConnectionRequest({
        fromUserId: currentUser?.id,
        toUserId: selectedProfile.id,
        type: connectionType,
        message
      });
      setSuccessMessage('Connection request sent!');
      setSendDialogOpen(false);
      await loadRequests();
    } catch (error) {
      console.error('Error sending request:', error);
    } finally {
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const RequestCard = ({ request, type }) => {
    const isIncoming = type === 'incoming';
    const profile = isIncoming ? request.fromUser : request.toUser;
    const isExpanded = expandedRequest === request.id;
    const [responseMessage, setResponseMessage] = useState('');

    if (!profile) return null;

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Avatar
              src={profile.avatar_url}
              sx={{ width: 56, height: 56 }}
            >
              {profile.name?.charAt(0)}
            </Avatar>

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" noWrap>
                  {profile.name}
                </Typography>
                <Chip
                  label={request.type}
                  size="small"
                  color={
                    request.type === 'mentor' ? 'primary' :
                    request.type === 'collaboration' ? 'secondary' : 'default'
                  }
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {profile.title} at {profile.organization}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profile.location} • {profile.yearsExperience} years experience
              </Typography>

              {request.message && (
                <Box
                  sx={{
                    bgcolor: 'action.hover',
                    p: 1.5,
                    borderRadius: 1,
                    mb: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <MessageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      Message
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {request.message}
                  </Typography>
                </Box>
              )}

              <Typography variant="caption" color="text.secondary">
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Typography>

              {/* Response Section for Incoming Requests */}
              {isIncoming && request.status === 'pending' && (
                <Box sx={{ mt: 2 }}>
                  <Collapse in={isExpanded}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Optional: Add a message with your response"
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      sx={{ mb: 1 }}
                      size="small"
                    />
                  </Collapse>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<CheckIcon />}
                      onClick={() => handleAccept(request.id, responseMessage)}
                      disabled={processingId === request.id}
                      size="small"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => handleDecline(request.id, responseMessage)}
                      disabled={processingId === request.id}
                      size="small"
                    >
                      Decline
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                    >
                      <ExpandMoreIcon
                        sx={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              )}

              {/* Status for non-pending requests */}
              {request.status !== 'pending' && (
                <Chip
                  label={request.status}
                  color={request.status === 'accepted' ? 'success' : 'default'}
                  size="small"
                  sx={{ mt: 1, textTransform: 'capitalize' }}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab
          label={`Incoming (${requests.incoming.filter(r => r.status === 'pending').length})`}
        />
        <Tab
          label={`Outgoing (${requests.outgoing.length})`}
        />
      </Tabs>

      {/* Incoming Requests */}
      {activeTab === 0 && (
        <Box>
          {requests.incoming.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <MessageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No incoming requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  When others want to connect with you, they'll appear here
                </Typography>
              </CardContent>
            </Card>
          ) : (
            requests.incoming.map((request) => (
              <RequestCard key={request.id} request={request} type="incoming" />
            ))
          )}
        </Box>
      )}

      {/* Outgoing Requests */}
      {activeTab === 1 && (
        <Box>
          {requests.outgoing.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <SendIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No outgoing requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start connecting with professionals in your field
                </Typography>
              </CardContent>
            </Card>
          ) : (
            requests.outgoing.map((request) => (
              <RequestCard key={request.id} request={request} type="outgoing" />
            ))
          )}
        </Box>
      )}

      {/* Send Request Dialog */}
      <Dialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send Connection Request to {selectedProfile?.name}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
            <InputLabel>Connection Type</InputLabel>
            <Select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              label="Connection Type"
            >
              <MenuItem value="mentor">Seeking Mentor</MenuItem>
              <MenuItem value="mentee">Willing to Mentor</MenuItem>
              <MenuItem value="peer">Peer Connection</MenuItem>
              <MenuItem value="collaboration">Research Collaboration</MenuItem>
            </Select>
          </FormControl>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                AI-Suggested Messages
              </Typography>
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => setMessage(suggestion)}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography variant="body2" color="text.secondary">
                      {suggestion}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            placeholder="Introduce yourself and explain why you'd like to connect..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendRequest}
            disabled={!message.trim()}
            startIcon={<SendIcon />}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectionRequest;
