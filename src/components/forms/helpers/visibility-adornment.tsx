import React, { memo } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

import { validationStyles } from './helpers';

interface VisibilityAdornmentProps {
  valid: boolean
  invalid: boolean
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const VisibilityAdornment = memo<VisibilityAdornmentProps>(({ isVisible, setIsVisible, valid, invalid }) => {
  return <InputAdornment position="end">
    <IconButton
      edge="end"
      sx={{ marginRight: -1 }}
      aria-label="toggle password visibility"
      color={validationStyles(valid, invalid)}
      onClick={() => setIsVisible(value => !value)}
    >
      { isVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
    </IconButton>
  </InputAdornment>;
});
