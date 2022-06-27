import React, { memo } from 'react';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';

import { ITranslation } from '../../../../../services/i18n';
import { FInput } from '../../../../../components/forms/input';

interface ListFormProps {
  loading: boolean
}


export const ListForm = memo<ListFormProps>(({ loading }) => {
  const { t } : ITranslation = useTranslation();

  const { isSubmitting, isValid, submitCount } = useFormikContext();
  const valid = submitCount >= 1 ? isValid : false;
  const invalid = submitCount >= 1 ? !isValid : false;

  const isDisabled = isSubmitting || loading;

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <FInput
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          type="text"
          name="email"
          margin="normal"
          disabled={loading}
          label={t('forms.labels.email')}
          placeholder={t('forms.placeholders.email')}
        />
      </Grid>
      <Grid item xs={12}>
        <FInput
          fullWidth
          size="small"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          name="firstName"
          margin="normal"
          disabled={loading}
          label={t('forms.labels.firstName')}
          placeholder={t('forms.placeholders.firstName')}
        />
      </Grid>
      <Grid item xs={12}>
        <FInput
          fullWidth
          type="text"
          size="small"
          name="lastName"
          margin="normal"
          disabled={loading}
          InputLabelProps={{
            shrink: true,
          }}
          label={t('forms.labels.lastName')}
          placeholder={t('forms.placeholders.lastName')}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="end">
        <Button>
          { t('layouts.system.users.cta.clear-search') }
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          { t('layouts.system.users.cta.apply-search') }
        </Button>
      </Grid>
    </Grid>
  );
});
