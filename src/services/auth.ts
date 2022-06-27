import { TokenFragment } from '../apollo/graphql';

import _ from './lodash';

export class AuthService {
  static AUTH_STORAGE = 'AUTH_STORAGE';

  static signOut () {
    AuthService.removeToken();
    location.reload();
  }

  static removeToken () {
    localStorage.removeItem(AuthService.AUTH_STORAGE);
  }

  static getToken (): TokenFragment | null {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data: string = localStorage.getItem(AuthService.AUTH_STORAGE)!;
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  static saveToken (data?: TokenFragment) {
    const result = JSON.stringify(data);
    localStorage.setItem(AuthService.AUTH_STORAGE, result);
    return result;
  }

  static isTokenExist () {
    return !_.isEmpty(AuthService.getToken());
  }
}

export default AuthService;
