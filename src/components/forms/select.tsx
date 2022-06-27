import { useField } from 'formik';
import React, { memo } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps, FormHelperText } from '@mui/material';

import { validationStyles } from './helpers/helpers';

type Option = {
  label: string,
  value: string | number
}

type FSelectProps = SelectProps & {
  name: string
  skipTouch?: boolean
  options: Array<Option>
  margin: 'dense' | 'none' | 'normal'
}

export const FSelect: React.FC<FSelectProps> = props => {
  const { name, label, skipTouch, options, margin, ...attr } = props;
  const [field, meta] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      error={invalid}
      focused={meta.touched}
      color={validationStyles(valid, invalid)}
    >
      <InputLabel>{ label }</InputLabel>
      <Select
        {...field}
        {...attr}
        label={label}
        id={field.name}
        inputProps={{ 'data-testid': `input-${name}` }}
      >
        { options?.map(({ value, label }) => (
          <MenuItem value={value} key={value}>
            { label }
          </MenuItem>
        )) }
      </Select>
      { invalid
        ? <FormHelperText error={invalid}>{ meta.error }</FormHelperText>
        : null }
    </FormControl>
  );
};

export default memo(FSelect);
