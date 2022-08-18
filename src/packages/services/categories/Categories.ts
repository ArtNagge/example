import { AxiosPromise } from 'axios'

import Request from '../Request'

import { CategoriesRo } from './types'

class Categories {
  static getCategories(): AxiosPromise<CategoriesRo[]> {
    return Request.get('/categories')
  }
}

export default Categories
