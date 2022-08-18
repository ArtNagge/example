import { AxiosPromise } from 'axios'

import Request from '../Request'

import { MailerDto } from './types'

class Mailer {
  static sendMessage(message: MailerDto): AxiosPromise<any> {
    return Request.post('/mailer', message)
  }
}

export default Mailer
