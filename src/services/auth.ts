import _ from './lodash';

export class AuthService {
  static AUTH_STORAGE = 'AUTH_STORAGE';

  static signOut () {
    AuthService.removeToken();
    window.location.reload();
  }

  static removeToken () {
    localStorage.remove(AuthService.AUTH_STORAGE);
  }

  static getToken () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data: string = localStorage.getItem(AuthService.AUTH_STORAGE)!;
    const token = JSON.parse(data);
    return token;
  }

  static saveToken (data: Map<any, any>) {
    const result = JSON.stringify(data);
    localStorage.set(AuthService.AUTH_STORAGE, result);
    return result;
  }

  static isTokenExist () {
    return !_.isEmpty(AuthService.getToken());
  }
}

export default AuthService;
