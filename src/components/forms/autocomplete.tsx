import React from 'react';
import { useField } from 'formik';
import { ChipTypeMap } from '@mui/material/Chip';
import { Autocomplete, TextField, TextFieldProps, AutocompleteProps } from '@mui/material';

import { validationStyles } from './helpers/helpers';

export type Option = {
  label: string,
  value: string | number
}


interface FAutocompleteProps<
T,
Multiple extends boolean | undefined,
DisableClearable extends boolean | undefined,
FreeSolo extends boolean | undefined,
ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>{
  name: string
  skipTouch?: boolean
  fieldProps: TextFieldProps
}

export const FAutocomplete = <
T,
Multiple extends boolean | undefined,
DisableClearable extends boolean | undefined,
FreeSolo extends boolean | undefined,
ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>(
    { skipTouch, name, fieldProps, ...attr }: Omit<FAutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput'>
  ) => {
  const [field, meta, helpers] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;

  return (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    <Autocomplete
      {...field}
      {...attr}
      onChange={(event, value) => helpers.setValue(value)}
      renderInput={({ inputProps, ...params }) => {
        return (
          <TextField
            {...params}
            {...fieldProps}
            error={invalid}
            name={name}
            focused={meta.touched}
            helperText={meta.touched && meta.error}
            color={validationStyles(valid, invalid)}
            inputProps={{ ...inputProps, 'data-testid': `input-${name}` }}
          />
        );
      }}
    />
  );
};

