import { useField } from 'formik';
import React, { memo } from 'react';
import { LocalizationProvider } from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker';

import { validationStyles } from './helpers/helpers';

interface FDatePickerProps extends Partial<DesktopDatePickerProps<any, any>> {
  name: string
  skipTouch?: boolean
  fieldProps: TextFieldProps
}

// TODO Check implementation
export const FDatePicker: React.FC<FDatePickerProps> = props => {
  const { name, label, skipTouch, fieldProps, ...attr } = props;
  const [field, meta, helpers] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        {...field}
        {...attr}
        onChange={(value) => helpers.setValue(value)}
        renderInput={({ inputProps, ...params }) => (
          <TextField
            {...params}
            {...fieldProps}
            name={name}
            error={invalid}
            onBlur={field.onBlur}
            focused={meta.touched}
            helperText={meta.touched && meta.error}
            color={validationStyles(valid, invalid)}
            inputProps={{ ...inputProps, 'data-testid': `input-${name}` }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default memo(FDatePicker);
