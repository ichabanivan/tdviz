import React, { memo } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

import { validationStyles } from './helpers';

interface VisibilityAdornmentProps {
  valid: boolean
  invalid: boolean
  disabled: boolean
  isVisible: boolean
  toggleIsVisible: () => void
}

export const VisibilityAdornment = memo<VisibilityAdornmentProps>(
  ({ disabled, isVisible, toggleIsVisible, valid, invalid }) => {
    return (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          disabled={disabled}
          sx={{ marginRight: -1 }}
          onClick={toggleIsVisible}
          aria-label="toggle password visibility"
          color={validationStyles(valid, invalid)}
        >
          { isVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
        </IconButton>
      </InputAdornment>
    );
  }
);
