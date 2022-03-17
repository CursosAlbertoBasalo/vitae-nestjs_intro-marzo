import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MonitorMiddleware implements NestMiddleware {
  private readonly logger = new Logger('MonitorMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => this.logRequest(req, res, start));
    next();
  }
  private logRequest(req: Request, res: Response, startTime: number) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const requestInfo = `${ip} ${userAgent} [${method}] ${originalUrl}`;
    const contentLength = res.get('content-length') || 0;
    this.logger.debug(`${requestInfo} -> ${Date.now() - startTime}ms ${contentLength} bytes`);
  }
}
