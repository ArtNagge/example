import { AxiosPromise } from 'axios'

import Request from '../Request'

import { DribbbleRo } from './types'

class Dribbble {
  static getDribbble(): AxiosPromise<DribbbleRo[]> {
    return Request.get('/dribbble')
  }
}

export default Dribbble
