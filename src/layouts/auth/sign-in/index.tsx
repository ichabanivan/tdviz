import { Formik } from 'formik';
import React, { memo } from 'react';
import { CardContent } from '@mui/material';

import { SignInForm } from './form';
import { useController } from './controller';

export const SignIn = memo(() => {
  const { loading, onSubmit, initialValues, validationSchema } = useController();
  return (
    <CardContent>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        component={() => <SignInForm loading={loading} />}
      />
    </CardContent>
  );
});
