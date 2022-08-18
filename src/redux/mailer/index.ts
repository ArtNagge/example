import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '@store/store'

import Mailer from '@services/mailer/Mailer'
import { MailerDto } from '@services/mailer/types'

import { MailerState } from './types'

const initialState: MailerState = {
  loading: false,
  error: undefined,
  success: false,
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    setSuccess: (state) => {
      state.loading = false
      state.success = true
      state.error = false
    },
    setFailure: (state) => {
      state.loading = false
      state.success = false
      state.error = true
    },
  },
})

export const { setRequest, setSuccess, setFailure } = headerSlice.actions

export const requestMail =
  (message: MailerDto): AppThunk =>
  async (dispatch) => {
    dispatch(setRequest())

    try {
      await Mailer.sendMessage(message)

      return dispatch(setSuccess())
    } catch {}
    dispatch(setFailure())
  }

export default headerSlice.reducer
