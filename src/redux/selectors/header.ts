import { RootState, useAppSelector } from '@store/store'

export const useHeaderScroll = () =>
  useAppSelector((state: RootState) => state.headerReducer.scroll)
