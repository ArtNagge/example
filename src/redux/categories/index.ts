import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '@store/store'

import Categories from '@services/categories/Categories'
import { CategoriesRo } from '@services/categories/types'

export interface CategoriesState {
  error?: any
  list: CategoriesRo[]
  readyStatus: string
}

const initialState: CategoriesState = {
  readyStatus: 'INVALID',
  list: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequesting: (state: CategoriesState) => {
      state.readyStatus = 'REQUEST'
    },
    getCategoriesSuccess: (
      state,
      { payload }: PayloadAction<CategoriesRo[]>,
    ) => {
      state.readyStatus = 'SUCCESS'
      state.list = payload
    },
    getCategoriesFailure: (state, { payload }: PayloadAction<string>) => {
      state.readyStatus = 'FAILURE'
      state.error = payload
    },
  },
})

export const {
  getCategoriesSuccess,
  getCategoriesRequesting,
  getCategoriesFailure,
} = categoriesSlice.actions

export const fetchCategories = (): AppThunk => async (dispatch) => {
  dispatch(getCategoriesRequesting())

  try {
    const { data } = await Categories.getCategories()

    dispatch(getCategoriesSuccess(data))
  } catch (error) {
    dispatch(getCategoriesFailure(error))
  }
}

const shouldFetchCategories = (state: RootState): boolean => {
  if (
    state.categoriesReducer.readyStatus === 'SUCCESS' &&
    state.categoriesReducer.list.length
  ) {
    return false
  }

  return true
}

export const fetchCategoriesIfNeeded = (): AppThunk => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories())
  }

  return null
}

export default categoriesSlice.reducer
