import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Popper,
  ClickAwayListener,
  Typography
} from '@mui/material';
import { findMentionStart, extractMentionQuery, filterUsersForMention } from '../../utils/mentionUtils';

/**
 * MentionInput Component
 * Text input that supports @mentions with autocomplete
 *
 * Props:
 * - value: Current input value
 * - onChange: Callback when value changes
 * - onMentionSelect: Callback when a user is mentioned
 * - placeholder: Placeholder text
 * - multiline: Whether input should be multiline
 * - rows: Number of rows (if multiline)
 * - maxLength: Maximum character length
 * - users: Array of users for mention suggestions
 */
const MentionInput = ({
  value,
  onChange,
  onMentionSelect,
  placeholder = 'Write something...',
  multiline = true,
  rows = 4,
  maxLength = 5000,
  users = [],
  ...textFieldProps
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const anchorEl = useRef(null);

  // Mock users if none provided
  const defaultUsers = [
    { id: 1, name: 'Dr. Alice Johnson', username: 'alice_researcher', avatar_url: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Williams', username: 'bob_neuroscience', avatar_url: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Carol Davis', username: 'carol_therapist', avatar_url: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David Martinez', username: 'david_student', avatar_url: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Emily Rodriguez', username: 'emily_r', avatar_url: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Frank Chen', username: 'frank_chen', avatar_url: 'https://i.pravatar.cc/150?img=6' },
  ];

  const availableUsers = users.length > 0 ? users : defaultUsers;

  // Detect @mention trigger
  useEffect(() => {
    if (!inputRef.current) return;

    const text = value || '';
    const cursor = cursorPosition;

    // Find the @ symbol before cursor
    const atIndex = findMentionStart(text, cursor);

    if (atIndex !== -1 && cursor > atIndex) {
      // Extract query after @
      const query = extractMentionQuery(text, atIndex, cursor);

      // Filter users
      const filtered = filterUsersForMention(availableUsers, query);

      setFilteredUsers(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, cursorPosition, availableUsers]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    const cursor = event.target.selectionStart;

    setCursorPosition(cursor);
    onChange(newValue);
  };

  const handleKeyDown = (event) => {
    if (!showSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredUsers.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredUsers.length - 1
      );
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      if (filteredUsers.length > 0) {
        event.preventDefault();
        insertMention(filteredUsers[selectedIndex]);
      }
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const insertMention = (user) => {
    const text = value || '';
    const cursor = cursorPosition;

    // Find the @ symbol before cursor
    const atIndex = findMentionStart(text, cursor);

    if (atIndex !== -1) {
      // Replace @query with @username
      const beforeMention = text.substring(0, atIndex);
      const afterMention = text.substring(cursor);
      const mention = `@${user.username}`;
      const newValue = beforeMention + mention + ' ' + afterMention;
      const newCursor = atIndex + mention.length + 1;

      onChange(newValue);
      setShowSuggestions(false);

      // Set cursor position after mention
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursor, newCursor);
          setCursorPosition(newCursor);
        }
      }, 0);

      // Notify parent
      if (onMentionSelect) {
        onMentionSelect(user);
      }
    }
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  const characterCount = value?.length || 0;
  const isOverLimit = characterCount > maxLength;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={anchorEl} sx={{ position: 'relative' }}>
        <TextField
          {...textFieldProps}
          inputRef={inputRef}
          fullWidth
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={(e) => setCursorPosition(e.target.selectionStart)}
          error={isOverLimit}
          helperText={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Type @ to mention someone
              </Typography>
              <Typography
                variant="caption"
                color={isOverLimit ? 'error' : 'text.secondary'}
              >
                {characterCount} / {maxLength}
              </Typography>
            </Box>
          }
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'inherit',
            }
          }}
        />

        {/* Mention Suggestions Dropdown */}
        {showSuggestions && (
          <Popper
            open={showSuggestions}
            anchorEl={anchorEl.current}
            placement="bottom-start"
            style={{ zIndex: 1300, width: anchorEl.current?.offsetWidth || 'auto' }}
          >
            <Paper
              elevation={8}
              sx={{
                mt: 0.5,
                maxHeight: 250,
                overflow: 'auto',
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <List sx={{ p: 0 }}>
                {filteredUsers.length === 0 ? (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.secondary">
                          No users found
                        </Typography>
                      }
                    />
                  </ListItem>
                ) : (
                  filteredUsers.map((user, index) => (
                    <ListItem
                      key={user.id}
                      button
                      selected={index === selectedIndex}
                      onClick={() => insertMention(user)}
                      sx={{
                        cursor: 'pointer',
                        '&.Mui-selected': {
                          bgcolor: 'action.selected',
                        },
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={user.avatar_url}
                          alt={user.name}
                          sx={{ width: 32, height: 32 }}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={`@${user.username}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Popper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default MentionInput;
