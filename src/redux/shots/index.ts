import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '@store/store'

import Shots from '@services/shots/Shots'
import {
  ShotsDto,
  ShotsListAndCountRo,
  ShotsRo,
  ShotsTypeEnum,
} from '@services/shots/types'
import { ShotsFilterDto } from '@services/shots/types'

export interface ShotsState {
  error?: any
  list: {
    [ShotsTypeEnum.LIVE]: ShotsListAndCountRo
    [ShotsTypeEnum.COMPLETE]: ShotsListAndCountRo
  }
  info: {
    base?: ShotsRo
    changes?: Partial<ShotsDto>
  }
  readyStatus: string
}

const initialState: ShotsState = {
  readyStatus: 'INVALID',
  list: {
    [ShotsTypeEnum.LIVE]: {
      data: [],
      count: 0,
    },
    [ShotsTypeEnum.COMPLETE]: {
      data: [],
      count: 0,
    },
  },
  info: {
    base: undefined,
    changes: undefined,
  },
}

export const shotsSlice = createSlice({
  name: 'shots',
  initialState,
  reducers: {
    getShotsRequesting: (state: ShotsState) => {
      state.readyStatus = 'REQUEST'
    },
    getShotsSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: ShotsTypeEnum
        data: ShotsListAndCountRo
      }>,
    ) => {
      state.readyStatus = 'SUCCESS'
      state.list = {
        ...state.list,
        [payload.type]: payload.data,
      }
    },
    getShotsSuccessFilter: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: ShotsTypeEnum
        data: ShotsRo[]
      }>,
    ) => {
      state.readyStatus = 'SUCCESS'
      state.list = {
        ...state.list,
        [payload.type]: {
          ...state.list[payload.type],
          data: [...state.list[payload.type].data, ...payload.data],
        },
      }
    },
    getShotsByIdSuccess: (state, { payload }: PayloadAction<ShotsRo>) => {
      state.readyStatus = 'SUCCESS'
      state.info = { ...state, base: payload }
    },
    getShotsFailure: (state, { payload }: PayloadAction<string>) => {
      state.readyStatus = 'FAILURE'
      state.error = payload
    },
  },
})

export const {
  getShotsSuccess,
  getShotsSuccessFilter,
  getShotsByIdSuccess,
  getShotsRequesting,
  getShotsFailure,
} = shotsSlice.actions

export const fetchShots =
  (type: ShotsTypeEnum, filter?: ShotsFilterDto): AppThunk =>
  async (dispatch) => {
    dispatch(getShotsRequesting())

    try {
      const { data } = await Shots.getShots(filter)

      dispatch(getShotsSuccess({ type, data }))
    } catch (error) {
      dispatch(getShotsFailure(error))
    }
  }

export const fetchShotsByFilter =
  (type: ShotsTypeEnum, filter?: ShotsFilterDto): AppThunk =>
  async (dispatch) => {
    dispatch(getShotsRequesting())

    try {
      const { data } = await Shots.getShotsFilter(filter)

      dispatch(getShotsSuccessFilter({ type, data }))
    } catch (error) {
      dispatch(getShotsFailure(error))
    }
  }

export const fetchShotsById =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(getShotsRequesting())

    try {
      const { data } = await Shots.getShotsById(id)

      dispatch(getShotsByIdSuccess(data))
    } catch (error) {
      dispatch(getShotsFailure(error))
    }
  }
export default shotsSlice.reducer
