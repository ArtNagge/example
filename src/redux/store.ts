import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { Action, configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import authReducer from './auth'
import categoriesReducer from './categories'
import dribbbleReducer from './dribbble'
import headerReducer from './header'
import mailerReducer from './mailer'
import shotsReducer from './shots'

export const store = configureStore({
  reducer: {
    authReducer,
    categoriesReducer,
    dribbbleReducer,
    shotsReducer,
    mailerReducer,
    headerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
