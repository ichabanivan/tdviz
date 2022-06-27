import * as yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';
import { ApolloError } from '@apollo/client/errors';
import React, { memo, useCallback, useContext, useMemo } from 'react';

import AuthService from '../../../services/auth';
import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { AppContext } from '../../../services/app.context';
import { useSignInMutation } from '../../../apollo/graphql';
import { VALIDATION_ERROR } from '../../../constants/errors';

import { SignInForm } from './form';


interface ISignInForm {
  email: string
  password: string
}

export const SignIn = memo(() => {
  const { t } : ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { updateCtrl } = useContext(AppContext);
  const navigate = useNavigate();
  // NOTE initialValues
  const initialValues = useMemo<ISignInForm>(() => ({
    email: '',
    password: '',
  }), []);
  // NOTE validationSchema
  const validationSchema = useMemo(() => yup.object().shape({
    email: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .email(t(`forms.validate.${VALIDATION_ERROR.INVALID_EMAIL}`)),
    password: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .min(8, t(`forms.validate.${VALIDATION_ERROR.MIN_LENGTH_CHARACTERS}`, { minLength: 8 }))
  }), [t]);
  // NOTE GraphQL
  const [signIn] = useSignInMutation();
  // NOTE Action
  const onSubmit = useCallback(async (values: ISignInForm, { resetForm }: FormikHelpers<ISignInForm>) => {
    try {
      const { data } = await signIn({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          }
        }
      });
      AuthService.saveToken(data?.data);
      updateCtrl({ auth: true });
      await resetForm();
      await enqueueSnackbar(t('layouts.auth.sign-in.notifications.success.sign-in'), { variant: 'success' });
      await navigate(ROUTES.LAYOUT_APP);
    } catch (error) {
      if (error instanceof ApolloError) {
        await enqueueSnackbar(error?.message, { variant: 'error' });
      } else {
        await enqueueSnackbar(String(error), { variant: 'error' });
      }
    }
  }, [enqueueSnackbar, navigate, signIn, t, updateCtrl]);

  return (
    <CardContent data-testid="screen-sign-in">
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        component={SignInForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </CardContent>
  );
});
