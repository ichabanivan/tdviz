/* eslint-disable */
import _ from '~services/lodash';

export interface ParameterOptions<Type, Default> {
  name: string
  short?: string
  defaults?: Type | Default | null
  isValid?: (value: Type | Default | string) => boolean
  archive?: (param: Type | Default) => string
  extract?: (param: string) => Type | string
}

export class Parameter<T, D> {
  static create = <Type, Default>(options: ParameterOptions<Type, Default>) => new Parameter(options);

  name = '';

  short = '';

  defaults: T | D | null = null;

  isValid: (value: T | D | string) => boolean = value => Boolean(value);

  archive: (value: T | D) => string = value => String(value);

  extract: (value: string) => T | string = value => value;

  constructor (options: ParameterOptions<T, D>) {
    this.name = options.name;
    this.short = options.short ?? this.name;
    // eslint-disable-next-line no-undefined
    if (options.defaults !== undefined) {
      this.defaults = options.defaults;
    }
    if (typeof options.isValid === 'function') {
      this.isValid = options.isValid;
    }
    if (typeof options.archive === 'function') {
      this.archive = options.archive;
    }
    if (typeof options.extract === 'function') {
      this.extract = options.extract;
    }
  }

  to = (value: T) => {
    const def = this.defaults;
    const archived = this.archive(value);
    if (this.isValid(value) && !_.isEqual(archived, def)) {
      return archived;
    }
  };

  from = (value: string) : T | D | string | null => {
    const def = this.defaults;
    const extracted = this.extract(value);
    return this.isValid(extracted) ? extracted : def;
  };
}
