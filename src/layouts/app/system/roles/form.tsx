import React, { memo } from 'react';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { SaveIcon } from '../../../../components/icons';
import { ITranslation } from '../../../../services/i18n';
import { FInput } from '../../../../components/forms/input';
import { validationStyles } from '../../../../components/forms/helpers/helpers';

interface RolesEditFormProps {
  id?: number
  handleHideModal: () => void
}

export const RolesEditForm = memo<RolesEditFormProps>(({ id, handleHideModal }) => {
  const { t } : ITranslation = useTranslation();

  const { isSubmitting, isValid, submitCount, dirty } = useFormikContext();
  const valid = (submitCount >= 1 && dirty) ? isValid : false;
  const invalid = (submitCount >= 1 && dirty) ? !isValid : false;

  const isDisabled = isSubmitting;

  return (
    <Form>
      <DialogTitle>
        { id ? t('layouts.system.roles.general.update-role') : t('layouts.system.roles.general.create-role') }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { t('layouts.system.roles.general.creation-description') }
        </DialogContentText>
        <FInput
          autoFocus
          fullWidth
          name="name"
          type="text"
          margin="dense"
          variant="standard"
          disabled={isDisabled}
          label={t('forms.labels.name')}
          placeholder={t('forms.placeholders.name')}
        />
      </DialogContent>
      <DialogActions sx={{ px: 4 }}>
        <Button
          type="button"
          disabled={isDisabled}
          onClick={handleHideModal}
        >
          { t('actions.cancel') }
        </Button>
        <LoadingButton
          type="submit"
          loading={isDisabled}
          disabled={isDisabled}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          color={validationStyles(valid, invalid)}
        >
          { t('actions.save') }
        </LoadingButton>
      </DialogActions>
    </Form>
  );
});
