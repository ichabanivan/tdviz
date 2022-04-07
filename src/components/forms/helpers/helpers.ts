
export enum ValidationColor {
  error = 'error',
  primary = 'primary',
  success = 'success',
}

export const validationStyles = (valid: boolean, invalid: boolean): ValidationColor => {
  if (valid) {
    return ValidationColor.success;
  } else if (invalid) {
    return ValidationColor.error;
  }
  return ValidationColor.primary;
};
