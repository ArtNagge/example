import { AxiosPromise } from 'axios'

import Request from '../Request'

import {
  ShotPicturesUploadRo,
  ShotsDto,
  ShotsFilterDto,
  ShotsListAndCountRo,
  ShotsRo,
  ShotsUpdateDto,
} from './types'

class Shots {
  static getShots(filter?: ShotsFilterDto): AxiosPromise<ShotsListAndCountRo> {
    return Request.get('/shots', { params: { ...filter } })
  }

  static getShotsFilter(filter?: ShotsFilterDto): AxiosPromise<ShotsRo[]> {
    return Request.get('/shots/filter', { params: { ...filter } })
  }

  static getShotsById(id: string): AxiosPromise<ShotsRo> {
    return Request.get(`/shots/${id}`)
  }

  static uploadShot(shot: ShotsDto): AxiosPromise<ShotsRo> {
    return Request.post('/shots', shot)
  }

  static updateShot(id: string, shot: ShotsUpdateDto): AxiosPromise<ShotsRo> {
    return Request.patch(`/shots/${id}`, shot)
  }

  static removeShot(id: string): AxiosPromise<any> {
    return Request.delete(`/shots/${id}`)
  }

  static uploadShotPicture(
    files: FormData,
  ): AxiosPromise<ShotPicturesUploadRo> {
    return Request.post('/uploads', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default Shots
