import * as yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Paper, Tab, Tabs } from '@mui/material';
import { FormikHelpers } from 'formik/dist/types';
import { ApolloError } from '@apollo/client/errors';
import { useNavigate, Link } from 'react-router-dom';
import React, { memo, useCallback, useContext, useMemo } from 'react';

import AuthService from '../../../../../services/auth';
import * as ROUTES from '../../../../../constants/routes';
import { ITranslation } from '../../../../../services/i18n';
import useFreeHeight from '../../../../../hooks/use-free-height';
import { AppContext } from '../../../../../services/app.context';
import { VALIDATION_ERROR } from '../../../../../constants/errors';
import { USERS_EDIT_TAB_OPTIONS } from '../../../../../constants/routes';
import { UserStatus, useSignInMutation } from '../../../../../apollo/graphql';

import { EditForm } from './form';

enum TabsTitle {
  INFO,
  EMAIL,
  PASSWORD,
}

export interface IEditForm {
  email: string
  password: string
}

export const Edit = memo(() => {
  const { t } : ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { updateCtrl } = useContext(AppContext);
  const navigate = useNavigate();
  let freeHeight = useFreeHeight();
  freeHeight -= (20 * 2 + 20 * 2);
  // NOTE initialValues
  const initialValues = useMemo<IEditForm>(() => ({
    email: '',
    password: '',
    // status: UserStatus.Enabled,
    status2: null,
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
      .min(8, t(`forms.validate.${VALIDATION_ERROR.MIN_LENGTH_CHARACTERS}`, { minLength: 8 })),
    status: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .matches(new RegExp(UserStatus.Enabled), { excludeEmptyString: true }),
    status2: yup.string()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .matches(new RegExp(UserStatus.Enabled), { excludeEmptyString: true }),
    birthday: yup.date()
      .nullable()
      .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
      .max(new Date(), `enDate should be equal or earlier than ${new Date()}`)
  }), [t]);
  // NOTE GraphQL
  const [signIn] = useSignInMutation();
  // NOTE Action
  const onSubmit = useCallback(async (values: IEditForm, { resetForm }: FormikHelpers<IEditForm>) => {
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
    <Paper sx={{ m: 4, p: 4, height: freeHeight }}>
      <Tabs value={TabsTitle.INFO} onChange={(tab) => console.log(tab)}>
        <Tab component={Link} to={ROUTES.USERS_EDIT_TAB.LINK({ id: 1, tab: USERS_EDIT_TAB_OPTIONS.INFO })} label={t('layouts.system.users.general.info')} id={String(TabsTitle.INFO)} />
        <Tab component={Link} to={ROUTES.USERS_EDIT_TAB.LINK({ id: 1, tab: USERS_EDIT_TAB_OPTIONS.EMAIL })} label={t('layouts.system.users.general.email')} id={String(TabsTitle.EMAIL)} />
        <Tab component={Link} to={ROUTES.USERS_EDIT_TAB.LINK({ id: 1, tab: USERS_EDIT_TAB_OPTIONS.PASSWORD })} label={t('layouts.system.users.general.password')} id={String(TabsTitle.PASSWORD)} />
      </Tabs>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        component={() => <EditForm height={freeHeight - 28 - 36.5} />}
      />
    </Paper>
  );
});
