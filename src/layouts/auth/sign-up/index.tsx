import * as yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';
import { ApolloError } from '@apollo/client/errors';
import React, { memo, useCallback, useMemo } from 'react';

import AuthService from '../../../services/auth';
import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { useSignUpMutation } from '../../../apollo/graphql';
import { VALIDATION_ERROR } from '../../../constants/errors';

import { SignUpForm } from './form';


interface ISignUpForm {
  email: string
  password: string
  lastName: string
  firstName: string
  confirmPassword?: string
}

export const SignUp = memo(() => {
  const { t } : ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // NOTE initialValues
  const initialValues: ISignUpForm = useMemo(() => ({
    email: '',
    lastName: '',
    password: '',
    firstName: '',
    confirmPassword: '',
  }), []);
  // NOTE validationSchema
  const validationSchema = useMemo(() => yup.object().shape({
    firstName: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`)),
    lastName: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`)),
    email: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .email(t(`forms.validate.${VALIDATION_ERROR.INVALID_EMAIL}`)),
    password: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .min(8, t(`forms.validate.${VALIDATION_ERROR.MIN_LENGTH_CHARACTERS}`, { minLength: 8 })),
    confirmPassword: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .test('passwords-match', t(`forms.validate.${VALIDATION_ERROR.PASSWORD_MATCH}`), function (value) {
        return this.parent.password === value;
      })
  }), [t]);
  // NOTE GraphQL
  const [signUp] = useSignUpMutation();
  // NOTE Action
  const onSubmit = useCallback(async (values: ISignUpForm, { resetForm }: FormikHelpers<ISignUpForm>) => {
    try {
      const { data } = await signUp({
        variables: {
          input: {
            email: values?.email,
            password: values?.password,
            lastName: values?.lastName,
            firstName: values?.firstName,
          }
        }
      });
      AuthService.saveToken(data?.data);
      await resetForm();
      await enqueueSnackbar(t('layouts.auth.sign-up.notifications.success.sign-up'), { variant: 'success' });
      await navigate(ROUTES.LAYOUT_APP);
    } catch (error) {
      if (error instanceof ApolloError) {
        await enqueueSnackbar(error?.message, { variant: 'error' });
      } else {
        await enqueueSnackbar(String(error), { variant: 'error' });
      }
    }
  }, [enqueueSnackbar, navigate, signUp, t]);

  return (
    <CardContent>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        component={SignUpForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </CardContent>
  );
});
