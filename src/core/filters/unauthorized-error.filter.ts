import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.UNAUTHORIZED;
    response.status(statusCode).json({
      statusCode,
      message: '👮‍♂️ ' + exception.message,
    });
  }
}
