import * as yup from 'yup';

import { defineRoute, ANNOTATION, defineParameter } from '../services/route';

const BASE_PATH = '/';

export const LAYOUT_AUTH = `${BASE_PATH}auth`;
export const LAYOUT_APP = `${BASE_PATH}app`;

export const PAGE404 = defineRoute(BASE_PATH, '404', {});

export const SIGN_IN = defineRoute(LAYOUT_AUTH, 'sign-in', {});
export const SIGN_UP = defineRoute(LAYOUT_AUTH, 'sign-up', {});

export const SYSTEM = defineRoute(LAYOUT_APP, 'system', {});

export const ROLES = defineRoute(SYSTEM.ROUTE, 'roles', {});
export const USERS = defineRoute(SYSTEM.ROUTE, 'users', {});

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

export enum USERS_EDIT_TAB_OPTIONS {
  INFO = 'INFO',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL',
}

export const USERS_EDIT_TAB = defineRoute(USERS_EDIT.ROUTE, ':tab', {
  params: [
    ANNOTATION.ID({}),
    defineParameter<USERS_EDIT_TAB_OPTIONS, string>({
      short: 'tab',
      name: 'tab',
      defaults: USERS_EDIT_TAB_OPTIONS.INFO,
      isValid: (value: string) => yup.string()
        .required()
        .oneOf(Object.values(USERS_EDIT_TAB_OPTIONS))
        .isValidSync(value),
    })
  ]
});

