import qs from 'qs';

import _ from '~services/lodash';

import { history } from './history';
import { Parameter } from './parameter';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouteOptions {
  REGEXP?: RegExp
  isActive?: (url: string) => boolean
  query?: Array<Parameter<any, any>>
  params?: Array<Parameter<any, any>>
  formatQuery?: (params: { [key: string]: any; }) => string
  parseQuery?: (value: string) => { [key: string]: any; }
  formatPath?: (params: { [key: string]: any; }) => string
  parsePath?: (value: string) => { [key: string]: any; }
}

export type IParameterType = number | string | Array<unknown> | Map<string, unknown>

export class Route {
  static regParameter = /:([^/]*)/gi;

  static getSearch = () => String(_.get(history, 'location.search') || '');

  static getPathname = () => String(_.get(history, 'location.pathname') || '');

  static create = (url: string, relative: string, options: RouteOptions = {}) => new Route(url, relative, options);

  static defineQueryAnnotation = (url: string, options?: Array<Parameter<any, any>>) => {
    const annotation: Array<Parameter<any, any>> = [];
    if (_.isArray(options)) {
      options.forEach(item => {
        annotation.push(Parameter.create(item));
      });
    }
    return annotation;
  };

  static defineParametersAnnotation = (url: string, options?: Array<Parameter<any, any>>) => {
    const annotation: Array<Parameter<IParameterType, IParameterType>> = [];
    if (_.isArray(options)) {
      options.forEach(item => {
        return annotation.push(Parameter.create(item));
      });
    }
    return annotation;
  };

  ROUTE = '';

  ROUTE_RELATIVE = '';

  ROUTE_RELATIVE_DEEP = '';

  REGEXP: RegExp;

  isActive: any = () => this.REGEXP.test(Route.getPathname());

  private query: Array<Parameter<any, any>> = [];

  private params: Array<Parameter<any, any>> = [];

  private formatQuery: (params: { [key: string]: any; }) => string = params => {
    const result: { [key: string]: any; } = {};
    _.forEach(params, (value, key) => {
      const r = _.find(this.query, { name: key });
      if (r) {
        const v = r.to(value);
        if (v) {
          result[r.short] = v;
        }
      }
    });
    return qs.stringify(result, { addQueryPrefix: true });
  };

  private parseQuery = (queryString: string) => {
    const result: { [key: string]: any; } = {};
    const params = qs.parse(queryString, { ignoreQueryPrefix: true });
    this.query.forEach(param => {
      const value = params[param.short] as string;
      result[param.name] = param.from(value);
    });
    return result;
  };

  private parsePath = (url: string) => {
    const result: { [key: string]: any; } = {};
    const matcher = new RegExp(String(this.ROUTE).replace(Route.regParameter, (a, propName) => `(?<${propName}>[^/]+)`), 'i');
    const p: { [key: string]: any; } = _.get(String(url).match(matcher), 'groups', {});
    this.params.forEach(param => {
      result[param.name] = param.from(p[param.name]);
    });
    return result;
  };

  private formatPath = (params: { [key: string]: any; }) => {
    const result: { [key: string]: any; } = {};
    this.params.forEach(param => {
      result[param.short] = param.from(params[param.name]);
    });
    return String(this.ROUTE).replace(Route.regParameter, (match, propName) => {
      return encodeURIComponent(result[propName]);
    });
  };

  constructor (url: string, relative: string, options: RouteOptions) {
    // this[Route.secret] = {};
    // NOTE prepare public props
    this.ROUTE = `${url}/${relative}`;
    this.ROUTE_RELATIVE = relative;
    this.ROUTE_RELATIVE_DEEP = `${relative}/*`;
    if (_.isRegExp(options.REGEXP)) {
      this.REGEXP = options.REGEXP;
    } else {
      this.REGEXP = new RegExp(String(this.ROUTE).replace(Route.regParameter, '.*'), 'i');
    }
    if (_.isFunction(options.isActive)) {
      this.isActive = options.isActive;
    }
    // NOTE prepare private props
    const queryAnnotation = Route.defineQueryAnnotation(url, options.query);
    const paramsAnnotation = Route.defineParametersAnnotation(this.ROUTE, options.params);
    this.query = queryAnnotation;
    this.params = paramsAnnotation;
    // this.parseQuery = Route.defineParseQuery(queryAnnotation, options.parseQuery);
    if (_.isFunction(options.parseQuery)) {
      this.parseQuery = options.parseQuery;
    }
    if (_.isFunction(options.formatQuery)) {
      this.formatQuery = options.formatQuery;
    }
    if (_.isFunction(options.parsePath)) {
      this.parsePath = options.parsePath;
    }
    if (_.isFunction(options.formatPath)) {
      this.formatPath = options.formatPath;
    }
  }

  LINK = (params?: { [key: string]: any; }, query?: { [key: string]: any; }) => {
    params = Object.assign({}, params);
    query = Object.assign({}, query);
    // const formatPath = this.formatPath;
    // console.log('%c LINK ', 'color: #156F93; font-weight: bolder; font-size: 12px;'
    //   , '\n ROUTE:', this
    //   , '\n params:', params
    //   , '\n query:', query
    //   , '\n ps:', this.params
    //   , '\n qs:', this.query
    //   , '\n formatPath(params):', this.formatPath(params)
    //   , '\n formatQuery(query):', this.formatQuery(query)
    // );
    // ${formatPath(params)}
    return `${this.formatPath(params)}${this.formatQuery(query)}`;
  };

  PARAMS = (pathname?: string) => this.parsePath(_.isString(pathname) ? pathname : Route.getPathname());

  QUERY = (search?: string) => this.parseQuery(_.isString(search) ? search : Route.getSearch());

  PUSH = (params?: { [key: string]: any; }, query?: { [key: string]: any; }) => {
    history.push(this.LINK(params, query));
  };

  REPLACE = (params?: { [key: string]: any; }, query?: { [key: string]: any; }) => {
    history.replace(this.LINK(params, query));
  };
}
