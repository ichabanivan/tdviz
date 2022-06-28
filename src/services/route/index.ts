import { Route, RouteOptions } from './route';
import { Parameter, ParameterOptions } from './parameter';

export { history } from './history';
export { NEW_ID } from './constants';
export { ANNOTATION } from './annotations';

// eslint-disable-next-line max-len
export const defineRoute = (url: string, relative: string, options: RouteOptions) => Route.create(url, relative, options);
export const defineParameter = <T, D>(options: ParameterOptions<T, D>) => Parameter.create<T, D>(options);
