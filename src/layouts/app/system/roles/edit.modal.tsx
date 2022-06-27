import * as yup from 'yup';
import { Formik } from 'formik';
import { Dialog } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { FormikHelpers } from 'formik/dist/types';
import { ApolloError } from '@apollo/client/errors';
import React, { useMemo, useCallback } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';

import TextService from '../../../../services/text';
import { ITranslation } from '../../../../services/i18n';
import { VALIDATION_ERROR } from '../../../../constants/errors';
import { FullRoleEntityFragment, useCreateRoleMutation, useUpdateRoleMutation } from '../../../../apollo/graphql';

import { RolesEditForm } from './form';


interface EditModalOptions {
  isOpen: boolean
  role?: FullRoleEntityFragment
}

const manageRolesEditModal = makeVar<EditModalOptions>({ isOpen: false });
export const hideModal = () => manageRolesEditModal({ isOpen: false });
export const showModal = (role?: FullRoleEntityFragment) => manageRolesEditModal({
  role,
  isOpen: true,
});

export const EditModal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } : ITranslation = useTranslation();
  // NOTE Modal data
  const { isOpen, role } = useReactiveVar(manageRolesEditModal);
  const handleHideModal = useCallback(() => hideModal(), []);
  // NOTE initialValues
  const initialValues = useMemo<Partial<FullRoleEntityFragment>>(() => ({
    name: '',
    ...role
  }), [role]);
  // NOTE validationSchema
  const validationSchema = useMemo(() => yup.object().shape({
    name: yup.string()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`)),
  }), [t]);
  // NOTE GraphQL
  const [create] = useCreateRoleMutation({
    awaitRefetchQueries: true,
    refetchQueries: ['FilterRolesPermissions'],
  });
  const [update] = useUpdateRoleMutation({
    awaitRefetchQueries: true,
    refetchQueries: ['FilterRolesPermissions'],
  });
  // NOTE Action
  const handleSubmit = useCallback(
    async (values: Partial<FullRoleEntityFragment>, { resetForm }: FormikHelpers<Partial<FullRoleEntityFragment>>) => {
      try {
        if (values?.id) {
          await update({
            variables: {
              input: {
                id: values.id,
                name: TextService.toEnum(values?.name)
              }
            }
          });
          await enqueueSnackbar('Role has been successfully updated', { variant: 'success' });
          await hideModal();
        } else {
          await create({
            variables: {
              input: {
                name: TextService.toEnum(values?.name)
              }
            }
          });
          await hideModal();
          await enqueueSnackbar('Role has been successfully created', { variant: 'success' });
        }
      } catch (error) {
        if (error instanceof ApolloError) {
          await enqueueSnackbar(error?.message, { variant: 'error' });
        } else {
          await enqueueSnackbar(String(error), { variant: 'error' });
        }
      }
    },
    [create, enqueueSnackbar, update]
  );

  return (
    <Dialog
      fullWidth
      open={isOpen}
      maxWidth="sm"
      onClose={handleHideModal}
    >
      <Formik<Partial<FullRoleEntityFragment>>
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        component={() => <RolesEditForm id={role?.id} handleHideModal={handleHideModal} />}
      />
    </Dialog>
  );
};

