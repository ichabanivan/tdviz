import * as yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import React, { memo, useCallback, useMemo } from 'react';
import { Button, CardActions, CardContent } from '@mui/material';

import { useSignInMutation } from '~apollo/graphql';

import * as ROUTES from '~constants/routes';

import { SignInForm } from './form';

interface ISignInForm {
  email: string
  password: string
}

export const SignIn = memo(() => {
  const [signIn] = useSignInMutation({
    onError: (error) => {
      console.log('error', error);
    }
  });

  const onSubmit = useCallback(async (values: ISignInForm) => {
    await signIn({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        }
      }
    });
  }, [signIn]);
  const initialValues: ISignInForm = useMemo(() => ({
    email: 'ichabanivan@gmail.com',
    password: 'Asdf1234',
  }), []);
  // NOTE Data for current screen
  const validationSchema = useMemo(() => yup.object().shape({
    email: yup.string()
      .nullable()
      .required('Field is required')
      .email('Email is invalid'),
    password: yup.string()
      .nullable()
      .required('Field is required')
      .min(8, 'Password should have at least 8 characters'),
  }), []);

  return <>
    <CardContent>
      <Formik
        onSubmit={onSubmit}
        component={SignInForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </CardContent>
    <CardActions sx={{ mb: 2 }}>
      <Button
        fullWidth
        component={Link}
        to={ROUTES.SIGN_UP.LINK()}
      >
        Sign Up
      </Button>
    </CardActions>
  </>;
});
