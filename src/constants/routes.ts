import * as yup from 'yup';

import { defineRoute, ANNOTATION } from '../services/route';

const BASE_PATH = '/';

export const LAYOUT_AUTH = `${BASE_PATH}auth`;
export const LAYOUT_APP = `${BASE_PATH}app`;

export const SIGN_IN = defineRoute(LAYOUT_AUTH, 'sign-in', {});
export const SIGN_UP = defineRoute(LAYOUT_AUTH, 'sign-up', {});

export const USERS = defineRoute(LAYOUT_APP, 'users', {});

export const USERS_LIST = defineRoute(USERS.ROUTE, 'list', {
  query: [
    ANNOTATION.PAGE({ defaults: 0 }),
    ANNOTATION.SIZE({ defaults: 10 }),
    ANNOTATION.SEARCH({ defaults: '', short: 'search' }),
    ANNOTATION.SORT_DIRECTION({ defaults: false }),
    ANNOTATION.SORT_FIELD({
      defaults: 'email',
      isValid: value => yup.string()
        .required()
        .oneOf(['email'])
        .isValidSync(value)
    }),
  ]
});
export const USERS_EDIT = defineRoute(USERS.ROUTE, ':id', {
  params: [ANNOTATION.ID({})]
});
