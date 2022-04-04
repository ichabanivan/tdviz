import { NEW_ID } from './constants';
import { ParameterOptions } from './parameter';

import { defineParameter } from './index';

/**
 * Some commonly used annotations
 */
export const ANNOTATION = {
  // NOTE popular params
  ID: (options: Partial<ParameterOptions<number, string>>) => defineParameter<number, string>({ name: 'id', defaults: NEW_ID, ...options }),
  TOKEN: (options: Partial<ParameterOptions<string, string>>) => defineParameter<string, string>({ name: 'token', defaults: 'invalid-token', ...options }),
  // NOTE popular query
  SEARCH: (options: Partial<ParameterOptions<string, string>>) => defineParameter<string, string>({ short: 's', name: 'search', defaults: '', ...options }),
  NAME: (options: Partial<ParameterOptions<string, string>>) => defineParameter<string, string>({ short: 'n', name: 'name', defaults: '', ...options }),
  PAGE: (options: Partial<ParameterOptions<number, number>>) => defineParameter<number, number>({ short: 'p', name: 'page', defaults: 0, archive: String, extract: Number, ...options }),
  SIZE: (options: Partial<ParameterOptions<number, number>>) => defineParameter<number, number>({
    short: 's',
    name: 'size',
    defaults: 10,
    archive: String,
    extract: Number,
    ...options
  }),
  SORT_DIRECTION: (options: Partial<ParameterOptions<boolean, boolean>>) => defineParameter<boolean, boolean>({
    short: 'sd',
    name: 'sortDirection',
    defaults: false,
    archive: (value: boolean) => String(Number(value)),
    extract: (value: string) => Boolean(Number(value)),
    ...options
  }),
  SORT_FIELD: (options: Partial<ParameterOptions<string, string>>) => defineParameter<string, string>({
    short: 'sf',
    name: 'sortField',
    defaults: 'name',
    isValid: (value: string) => ['name'].includes(value),
    ...options
  }),
  // Complex types
  // STATUSES: (options: Partial<ParameterOptions<Array<string>, Array<string>>>) =>
  // defineParameter<Array<string>, Array<string>>({
  //   short: 'st',
  //   name: 'statuses',
  //   defaults: [],
  //   isValid: (value: Array<string>) => yup.array()
  //     .of(
  //       yup.string()
  //         .required()
  //         .oneOf(Object.values(ENTITY_STATUS))
  //     )
  //     .required()
  //     .isValidSync(value),
  //   ...options
  // }),
};
