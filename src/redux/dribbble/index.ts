import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '@store/store'

import Shots from '@services/dribbble/Dribbble'
import { DribbbleRo } from '@services/dribbble/types'

export interface DribbbleState {
  error?: any
  list: DribbbleRo[]
  readyStatus: string
}

const initialState: DribbbleState = {
  readyStatus: 'INVALID',
  list: [],
}

export const dribbbleSlice = createSlice({
  name: 'dribbble',
  initialState,
  reducers: {
    getDribbbleRequesting: (state: DribbbleState) => {
      state.readyStatus = 'REQUEST'
    },
    getDribbbleSuccess: (state, { payload }: PayloadAction<DribbbleRo[]>) => {
      state.readyStatus = 'SUCCESS'
      state.list = payload
    },
    getDribbbleFailure: (state, { payload }: PayloadAction<string>) => {
      state.readyStatus = 'FAILURE'
      state.error = payload
    },
  },
})

export const { getDribbbleSuccess, getDribbbleRequesting, getDribbbleFailure } =
  dribbbleSlice.actions

export const fetchDribbble = (): AppThunk => async (dispatch) => {
  dispatch(getDribbbleRequesting())

  try {
    const { data } = await Shots.getDribbble()

    dispatch(getDribbbleSuccess(data))
  } catch (error) {
    dispatch(getDribbbleFailure(error))
  }
}

const shouldFetchDribbble = (state: RootState): boolean => {
  if (
    state.dribbbleReducer.readyStatus === 'SUCCESS' &&
    state.dribbbleReducer.list.length
  ) {
    return false
  }

  return true
}

export const fetchDribbbleIfNeeded = (): AppThunk => (dispatch, getState) => {
  if (shouldFetchDribbble(getState())) {
    return dispatch(fetchDribbble())
  }

  return null
}

export default dribbbleSlice.reducer
