import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Catch,
  Logger,
} from '@nestjs/common';
import HttpErrorResponse from '../entities/http-error-response';
import InternalServerError from '../entities/internal-server-error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  public internalServerError: InternalServerError;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const isInternalServerError = status === HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: HttpErrorResponse = {
      code: status,
      path: request.url,
      method: request.method,
      message: isInternalServerError
        ? 'Internal server error'
        : exception.message || null,
      internalServerError: isInternalServerError
        ? this.internalServerError
        : null,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'HttpExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
