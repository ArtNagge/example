import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HeaderState, TScrollState } from './types'

const initialState: HeaderState = {
  scroll: 'noScrolling',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setScrolling: (state, { payload }: PayloadAction<TScrollState>) => {
      state.scroll = payload
    },
  },
})

export const { setScrolling } = headerSlice.actions

export const setHeaderScroll = (scroll) => (dispatch) => {
  dispatch(setScrolling(scroll))
}

export default headerSlice.reducer
