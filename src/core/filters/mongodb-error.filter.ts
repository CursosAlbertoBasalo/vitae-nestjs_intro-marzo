import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch()
export class MongodbErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.BAD_REQUEST;
    if (exception.code === 11000) status = HttpStatus.CONFLICT;
    else if (exception.name === 'ValidationError') status = HttpStatus.INTERNAL_SERVER_ERROR;
    else if ((exception.message as string).includes('not found')) status = HttpStatus.NOT_FOUND;
    const message = exception.message;
    const responseError = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };
    new Logger('MongodbErrorFilter').error(JSON.stringify(responseError));
    response.status(status).json(responseError);
  }
}
