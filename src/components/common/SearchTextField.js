import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Reusable search text field component with search icon
 * @param {string} value - Current search value
 * @param {function} onChange - Handler for value changes
 * @param {string} placeholder - Placeholder text
 * @param {object} sx - Additional Material-UI sx styles
 * @param {string} size - TextField size variant
 * @param {boolean} fullWidth - Whether the field should be full width
 * @param {object} otherProps - Any other TextField props
 */
const SearchTextField = ({
  value,
  onChange,
  placeholder = 'Search...',
  sx = {},
  size,
  fullWidth = true,
  ...otherProps
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      size={size}
      sx={sx}
      {...otherProps}
    />
  );
};

export default SearchTextField;
