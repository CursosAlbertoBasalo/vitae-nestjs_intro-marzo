import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MonitorMiddleware implements NestMiddleware {
  private readonly logger = new Logger('MonitorMiddleware');

  public use(req: any, res: any, next: () => void) {
    // ! Warning: Express specific code
    const start = Date.now();
    res.on('finish', () => this.logRequest(req, res, start));
    next();
  }
  private logRequest(req: Request, res: Response, startTime: number) {
    const logEntry = this.getLogEntry(req, res, startTime);
    const serverErrors = 500;
    const clientErrors = 400;
    if (res.statusCode >= serverErrors) this.logger.error(logEntry);
    else if (res.statusCode >= clientErrors) this.logger.warn(logEntry);
    else this.logger.debug(logEntry);
    // console.log(logEntry);
  }

  private getLogEntry(req: Request, res: Response, startTime: number) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const requestInfo = `${ip} ${userAgent} [${method}] ${originalUrl}`;
    const contentLength = res.get('content-length') || 0;
    const logEntry = `${requestInfo} -> ${Date.now() - startTime}ms ${contentLength} bytes`;
    return logEntry;
  }
}
