import { RootState, useAppSelector } from '@store/store'

export const useMailerLoading = () =>
  useAppSelector((state: RootState) => state.mailerReducer.loading)

export const useMailerSuccess = () =>
  useAppSelector((state: RootState) => state.mailerReducer.success)

export const useMailerFailuer = () =>
  useAppSelector((state: RootState) => state.mailerReducer.error)
