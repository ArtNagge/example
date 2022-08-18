import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import errorMessages, { defaultMessages } from '../utils/errorMessages';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = errorMessages[status] || exception?.message;
    const error = exception?.message || exception.stack;

    if (
      status === HttpStatus.UNAUTHORIZED &&
      defaultMessages[status] !== exception?.message
    ) {
      message = exception?.message || errorMessages[status];
    }

    response.status(status).json({
      status,
      message,
      error,
    });
  }
}
