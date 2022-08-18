import getConfig from 'next/config'

import {
  getRefreshRequesting,
  getRefreshSuccess,
  logoutAuth,
} from '@store/auth'
import { store } from '@store/store'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import Cookie from 'js-cookie'
import qs from 'qs'

import Auth from './auth/Auth'

const { publicRuntimeConfig } = getConfig()

class Request {
  protected readonly instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: publicRuntimeConfig.PUBLIC_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': publicRuntimeConfig.APP_LOCALE,
      },
    })

    const token = Cookie.get('accessToken')

    if (token) this.setHeader(token)

    this._initResponseInterceptor()

    createAuthRefreshInterceptor(this.instance as any, this.refreshToken, {
      pauseInstanceWhileRefreshing: true,
    })
  }

  private _initResponseInterceptor = () => {
    this.instance.interceptors.request.use((response: AxiosResponse) => ({
      ...response,
      paramsSerializer: (params) => qs.stringify(params, { indices: false }),
    }))
  }

  private refreshToken = async ({ config }: AxiosError) => {
    const { dispatch } = store

    dispatch(getRefreshRequesting())

    try {
      const {
        data: { accessToken, refreshToken },
      } = await Auth.refreshTokens()

      this.setHeader(accessToken)
      config.headers['Authorization'] = `Bearer ${accessToken}`

      Cookie.set('accessToken', accessToken)
      Cookie.set('refreshToken', refreshToken)

      return Promise.resolve(dispatch(getRefreshSuccess()))
    } catch (error) {
      return Promise.reject(dispatch(logoutAuth()))
    }
  }

  public setHeader = (accessToken: string) => {
    this.instance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
  }

  public getInstant = () => this.instance
}

export const request = new Request()

export default request.getInstant()
