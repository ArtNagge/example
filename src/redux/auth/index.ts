import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '@store/store'
import Cookie from 'js-cookie'

import Auth from '@services/auth/Auth'
import { AuthDto, AuthRo } from '@services/auth/types'
import { request } from '@services/Request'

export interface AuthState {
  error?: any
  info: Partial<AuthRo> & { isAuth: boolean }
  readyStatus: string
}

const initialState: AuthState = {
  readyStatus: 'INVALID',
  info: {
    isAuth: false,
    accessToken: undefined,
    refreshToken: undefined,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthRequesting: (state: AuthState) => {
      state.readyStatus = 'REQUEST'
    },
    getAuthSuccess: (state, { payload }: PayloadAction<AuthRo>) => {
      state.readyStatus = 'SUCCESS'
      state.info = { ...payload, isAuth: true }
    },
    getRefreshRequesting: (state) => {
      state.readyStatus = 'REQUEST'
    },
    getRefreshSuccess: (state) => {
      state.readyStatus = 'SUCCESS'
    },
    getRefreshFailure: (state) => {
      state.readyStatus = 'FAILURE'
      state.info = initialState.info
    },
    getAuthFailure: (state, { payload }: PayloadAction<string>) => {
      state.readyStatus = 'FAILURE'
      state.error = payload
    },
  },
})

export const {
  getRefreshRequesting,
  getRefreshSuccess,
  getRefreshFailure,
  getAuthSuccess,
  getAuthRequesting,
  getAuthFailure,
} = authSlice.actions

export const fetchAuthLogin =
  (data: AuthDto): AppThunk =>
  async (dispatch) => {
    dispatch(getAuthRequesting())

    try {
      const {
        data: { accessToken, refreshToken },
      } = await Auth.login(data)

      request.setHeader(accessToken)

      Cookie.set('accessToken', accessToken)
      Cookie.set('refreshToken', refreshToken)

      dispatch(getAuthSuccess({ accessToken, refreshToken }))
    } catch (error) {
      dispatch(getAuthFailure(error))
    }
  }

export const initAuthLogin =
  (data: AuthRo): AppThunk =>
  async (dispatch) => {
    dispatch(getAuthRequesting())

    try {
      dispatch(getAuthSuccess(data))
    } catch (error) {
      dispatch(getAuthFailure(error))
    }
  }

export const logoutAuth = (): AppThunk => (dispatch) => {
  dispatch(getRefreshFailure())

  Cookie.remove('accessToken')
  Cookie.remove('refreshToken')
}

export default authSlice.reducer
