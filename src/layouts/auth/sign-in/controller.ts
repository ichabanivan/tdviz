import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { useSignInMutation } from '../../../apollo/graphql';
import { VALIDATION_ERROR } from '../../../constants/errors';

interface ISignInForm {
  email: string
  password: string
}

export const useController = () => {
  const { t }: ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // GraphQL
  const [signIn, { loading }] = useSignInMutation({
    onCompleted: () => {
      enqueueSnackbar(t('layouts.auth.sign-in.notifications.success.sign-in'), { variant: 'success' });
      navigate(ROUTES.LAYOUT_APP);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  // Action
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
  // initialValues
  const initialValues: ISignInForm = useMemo(() => ({
    email: 'admin@example.com',
    password: 'Asdf1234',
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

  return ({
    loading,
    onSubmit,
    initialValues,
    validationSchema,
  });
};
