import React, { memo, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import { Button, Grid, Typography } from '@mui/material';

import { FInput } from '~components/forms/input';
import { validationStyles } from '~components/forms/helpers/helpers';
import { VisibilityAdornment } from '~components/forms/helpers/visibility-adornment';

export const SignUpForm = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { isSubmitting, isValid, submitCount } = useFormikContext();
  const valid = submitCount >= 1 ? isValid : false;
  const invalid = submitCount >= 1 ? !isValid : false;

  return <Form>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" textAlign="center">
            Sign Up
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2} mb={4}>
      <Grid item xs={12}>
        <FInput
          size="small"
          fullWidth
          type="text"
          name="email"
          margin="normal"
          label="Email Address"
          disabled={isSubmitting}
          placeholder="Email Address"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FInput
          size="small"
          fullWidth
          type="text"
          name="firstName"
          margin="normal"
          label="First Name"
          disabled={isSubmitting}
          placeholder="First Name"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FInput
          size="small"
          fullWidth
          type="text"
          name="lastName"
          margin="normal"
          label="Last Name"
          placeholder="Last Name"
          disabled={isSubmitting}
        />
      </Grid>
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
        <FInput
          fullWidth
          size="small"
          margin="normal"
          name="confirmPassword"
          disabled={isSubmitting}
          label="Confirm Password"
          placeholder="Confirm Password"
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
          Sign Up
      </Button>
    </Grid>
  </Form>;
});
