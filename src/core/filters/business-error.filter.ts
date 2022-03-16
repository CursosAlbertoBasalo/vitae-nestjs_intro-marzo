import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.BAD_REQUEST;
    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }
}
