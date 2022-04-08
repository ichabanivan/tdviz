import React, { memo, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import { Button, Grid, Typography } from '@mui/material';

import { FInput } from '~components/forms/input';
import { validationStyles } from '~components/forms/helpers/helpers';
import { VisibilityAdornment } from '~components/forms/helpers/visibility-adornment';

export const SignInForm = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { isSubmitting, isValid, submitCount } = useFormikContext();
  const valid = submitCount >= 1 ? isValid : false;
  const invalid = submitCount >= 1 ? !isValid : false;

  return <Form>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" textAlign="center">
          Sign In
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2} mb={4}>
      <Grid item xs={12}>
        <FInput
          fullWidth
          size="small"
          type="text"
          name="email"
          margin="normal"
          label="Email Address"
          disabled={isSubmitting}
          placeholder="Email Address"
        />
      </Grid>
      <Grid item xs={12}>
        <FInput
          size="small"
          fullWidth
          name="password"
          margin="normal"
          label="Password"
          placeholder="Password"
          disabled={isSubmitting}
          type={isVisible ? 'text' : 'password'}
          InputProps={(valid, invalid) => ({
            endAdornment: <VisibilityAdornment
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              valid={valid}
              invalid={invalid}
            />
          })}
        />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        color={validationStyles(valid, invalid)}
      >
        Sign In
      </Button>
    </Grid>
  </Form>;
});
