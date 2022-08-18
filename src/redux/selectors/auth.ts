import { RootState, useAppSelector } from '@store/store'

export const useIsAuth = () =>
  useAppSelector((state: RootState) => state.authReducer.info.isAuth)
