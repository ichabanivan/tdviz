import * as yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import React, { memo, useCallback, useMemo } from 'react';
import { CardContent, CardActions, Button } from '@mui/material';

import * as ROUTES from '../../../constants/routes';

import { SignUpForm } from './form';

export const SignUp = memo(() => {
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
    firstName: yup.string()
      .nullable()
      .required('Field is required'),
    lastName: yup.string()
      .nullable()
      .required('Field is required'),
    email: yup.string()
      .nullable()
      .required('Field is required')
      .email('Email is invalid'),
    password: yup.string()
      .nullable()
      .required('Field is required')
      .min(8, 'Password should have at least 8 characters'),
    confirmPassword: yup.string()
      .nullable()
      .required('Field is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      })
  }), []);

  return <>
    <CardContent>
      <Formik
        onSubmit={onSubmit}
        component={SignUpForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </CardContent>
    <CardActions sx={{ mb: 2 }}>
      <Button
        fullWidth
        component={Link}
        to={ROUTES.SIGN_IN.LINK()}
      >
        Sign In
      </Button>
    </CardActions>
  </>;
});
