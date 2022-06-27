import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import { AppRegistration as AppRegistrationIcon, Login as LoginIcon } from '@mui/icons-material';

import _ from '../../../../../services/lodash';
import * as ROUTES from '../../../../../constants/routes';
import { UserStatus } from '../../../../../apollo/graphql';
import { ITranslation } from '../../../../../services/i18n';
import { FInput } from '../../../../../components/forms/input';
import { FDatePicker } from '../../../../../components/forms/datepicker';
import { validationStyles } from '../../../../../components/forms/helpers/helpers';
import { FAutocomplete, Option } from '../../../../../components/forms/autocomplete';


interface EditFormProps {
  height: number
}

export const EditForm = memo<EditFormProps>(({ height }) => {
  const { t } : ITranslation = useTranslation();

  const { isSubmitting, isValid, submitCount, dirty, values } = useFormikContext();
  const valid = (submitCount >= 1 && dirty) ? isValid : false;
  const invalid = (submitCount >= 1 && dirty) ? !isValid : false;

  const isDisabled = isSubmitting;

  // return (
  //
  // )

  return (
    <Form>
      <Grid container spacing={4} alignItems="start">
        <Grid item xs={12}>
          <Typography variant="h1" textAlign="center" sx={{ pt: 0 }}>
            { t('layouts.system.users.general.title') }
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="start">
        <Grid item xs={12} md={6}>
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
          <FAutocomplete<Option, false, true, false>
            fullWidth
            size="small"
            disablePortal
            name="status2"
            disabled={isDisabled}
            filterSelectedOptions
            isOptionEqualToValue={_.isEqual}
            options={_.map(UserStatus, (value, key) => ({ label: key, value }))}
            fieldProps={{
              size: 'small',
              margin: 'normal',
              label: t('forms.labels.status'),
              placeholder: t('forms.placeholders.status')
            }}
          />

        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="start">
        <Grid item xs={12} md={6}>
          <FInput
            fullWidth
            size="small"
            type="text"
            name="firstName"
            margin="normal"
            disabled={isDisabled}
            label={t('forms.labels.firstName')}
            placeholder={t('forms.placeholders.firstName')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FInput
            fullWidth
            size="small"
            type="text"
            name="lastName"
            margin="normal"
            disabled={isDisabled}
            label={t('forms.labels.lastName')}
            placeholder={t('forms.placeholders.lastName')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="start">
        <Grid item xs={12} md={6}>
          <FAutocomplete<Option, true, true, false>
            name="roles"
            multiple
            fullWidth
            options={_.map(UserStatus, (value, key) => ({ label: key, value }))}
            getOptionLabel={({ label }) => label}
            filterSelectedOptions
            fieldProps={{
              size: 'small',
              margin: 'normal',
              label: t('forms.labels.status'),
              placeholder: t('forms.placeholders.status')
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FDatePicker
            name="birthday"
            fieldProps={{
              fullWidth: true,
              size: 'small',
              margin: 'normal',
              label: t('forms.labels.birthday'),
              placeholder: t('forms.placeholders.birthday')
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <pre>
          <code>
            { JSON.stringify(values, null, 2) }
          </code>
        </pre>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isDisabled}
          disabled={isDisabled}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          data-testid="sign-in-submit"
          color={validationStyles(valid, invalid)}
        >
          { t('layouts.auth.sign-in.cta.sign-in') }
        </LoadingButton>
        <Button
          component={Link}
          variant="outlined"
          disabled={isDisabled}
          to={ROUTES.SIGN_UP.LINK()}
          startIcon={<AppRegistrationIcon />}
        >
          { t('layouts.auth.sign-in.cta.sign-up') }
        </Button>
      </Grid>
    </Form>
  );
});
