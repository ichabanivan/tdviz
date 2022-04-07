import * as yup from 'yup';
import { Formik } from 'formik';
import React, { memo, useCallback, useMemo } from 'react';
import { Button, CardActions, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import { SignInForm } from './form';

export const SignIn = memo(() => {
  const onSubmit = useCallback((values) => console.log(values), []);
  const initialValues = useMemo(() => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
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
