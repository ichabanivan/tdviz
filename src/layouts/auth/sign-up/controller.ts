import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { useSignUpMutation } from '../../../apollo/graphql';
import { VALIDATION_ERROR } from '../../../constants/errors';

interface ISignUpForm {
  email: string
  password: string
  lastName: string
  firstName: string
  confirmPassword?: string
}

export const useController = () => {
  const { t }: ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // GraphQL
  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: () => {
      enqueueSnackbar(t('layouts.auth.sign-up.notifications.success.sign-up'), { variant: 'success' });
      navigate(ROUTES.SIGN_IN.LINK());
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  // Action
  const onSubmit = useCallback(async (values: ISignUpForm) => {
    delete values.confirmPassword;
    await signUp({
      variables: {
        input: values
      }
    });
  }, [signUp]);
  // initialValues
  const initialValues: ISignUpForm = useMemo(() => ({
    email: 'ichabanivan@gmail.com',
    lastName: 'Chaban',
    password: 'Asdf1234',
    firstName: 'Ivan',
    confirmPassword: 'Asdf1234',
  }), []);
  // NOTE Data for current screen
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

  return ({
    loading,
    onSubmit,
    initialValues,
    validationSchema,
  });
};
