import { useField } from 'formik';
import React, { memo } from 'react';
import { TextField, TextFieldProps, InputBaseComponentProps } from '@mui/material';

import { validationStyles } from './helpers/helpers';

type FInputProps = TextFieldProps & {
  name: string
  skipTouch?: boolean
  InputProps?: (valid: boolean, invalid: boolean) => InputBaseComponentProps
}

export const FInput: React.FC<FInputProps> = props => {
  const { name, type, label, skipTouch, InputProps = () => ({}), ...attr } = props;
  const [field, meta] = useField({ name, type });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return (
    <TextField
      {...attr}
      {...field}
      type={type}
      label={label}
      error={invalid}
      focused={meta.touched}
      value={field.value ?? ''}
      autoComplete={field.value}
      InputProps={InputProps(valid, invalid)}
      helperText={meta.touched && meta.error}
      color={validationStyles(valid, invalid)}
      inputProps={{ 'data-testid': `input-${name}` }}
    />
  );
};

export default memo(FInput);
