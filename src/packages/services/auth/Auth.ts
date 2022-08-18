import { AxiosPromise } from 'axios'
import Cookie from 'js-cookie'

import Request from '../Request'

import { AuthDto, AuthRo } from './types'

class Auth {
  static login(data: AuthDto): AxiosPromise<AuthRo> {
    return Request.post('/auth/login', data)
  }

  static refreshTokens(): AxiosPromise<AuthRo> {
    return Request.post('/auth/refresh-tokens', {
      refresh_token: Cookie.get('refreshToken'),
    })
  }

  static checkTokens(): AxiosPromise<boolean> {
    return Request.post('/auth/check-tokens')
  }
}

export default Auth
