import { useAppSelector } from '@store/store'

export const useShotsLive = () =>
  useAppSelector((state) => state.shotsReducer.list.live.data)

export const useShotsLiveCount = () =>
  useAppSelector((state) => state.shotsReducer.list.live.count)

export const useShotsComplete = () =>
  useAppSelector((state) => state.shotsReducer.list.complete.data)

export const useShotsCompleteCount = () =>
  useAppSelector((state) => state.shotsReducer.list.complete.count)

export const useShotsIsRequest = () =>
  useAppSelector((state) => state.shotsReducer.readyStatus === 'REQUEST')
