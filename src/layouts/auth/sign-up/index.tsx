import { Formik } from 'formik';
import React, { memo } from 'react';
import { CardContent } from '@mui/material';

import { SignUpForm } from './form';
import { useController } from './controller';

export const SignUp = memo(() => {
  const { loading, onSubmit, initialValues, validationSchema } = useController();

  return (
    <CardContent>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        component={() => <SignUpForm loading={loading} />}
      />
    </CardContent>
  );
});
