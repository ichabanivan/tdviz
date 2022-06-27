import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { AppRegistration as AppRegistrationIcon, Login as LoginIcon } from '@mui/icons-material';

import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { FInput } from '../../../components/forms/input';
import { validationStyles } from '../../../components/forms/helpers/helpers';
import { VisibilityAdornment } from '../../../components/forms/helpers/visibility-adornment';


interface SignUpFormProps {
  loading: boolean
}

export const SignUpForm = memo<SignUpFormProps>(({ loading }) => {
  const { t }: ITranslation = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = useCallback(() => setIsVisible(value => !value), []);

  const { isSubmitting, isValid, submitCount } = useFormikContext();
  const valid = submitCount >= 1 ? isValid : false;
  const invalid = submitCount >= 1 ? !isValid : false;

  const isDisabled = isSubmitting || loading;

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" textAlign="center">
            { t('layouts.auth.sign-up.general.title') }
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
            disabled={isDisabled}
            label={t('forms.labels.email')}
            placeholder={t('forms.placeholders.email')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FInput
            fullWidth
            type="text"
            size="small"
            name="firstName"
            margin="normal"
            disabled={isDisabled}
            label={t('forms.labels.firstName')}
            placeholder={t('forms.placeholders.firstName')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FInput
            size="small"
            fullWidth
            type="text"
            name="lastName"
            margin="normal"
            disabled={isDisabled}
            label={t('forms.labels.lastName')}
            placeholder={t('forms.placeholders.lastName')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FInput
            size="small"
            fullWidth
            name="password"
            margin="normal"
            disabled={isDisabled}
            label={t('forms.labels.password')}
            type={isVisible ? 'text' : 'password'}
            placeholder={t('forms.placeholders.password')}
            InputProps={(valid, invalid) => ({
              endAdornment: <VisibilityAdornment
                valid={valid}
                invalid={invalid}
                isVisible={isVisible}
                disabled={isDisabled}
                toggleIsVisible={toggleIsVisible}
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
            disabled={isDisabled}
            type={isVisible ? 'text' : 'password'}
            label={t('forms.labels.confirmPassword')}
            placeholder={t('forms.placeholders.confirmPassword')}
            InputProps={(valid, invalid) => ({
              endAdornment: <VisibilityAdornment
                valid={valid}
                invalid={invalid}
                isVisible={isVisible}
                disabled={isDisabled}
                toggleIsVisible={toggleIsVisible}
              />
            })}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          fullWidth
          type="submit"
          sx={{ mb: 3 }}
          loading={loading}
          variant="contained"
          disabled={isDisabled}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          color={validationStyles(valid, invalid)}
        >
          { t('layouts.auth.sign-up.cta.sign-up') }
        </LoadingButton>
        <Button
          fullWidth
          component={Link}
          variant="outlined"
          disabled={isDisabled}
          to={ROUTES.SIGN_IN.LINK()}
          startIcon={<AppRegistrationIcon />}
        >
          { t('layouts.auth.sign-up.cta.sign-in') }
        </Button>
      </Grid>
    </Form>
  );
});
