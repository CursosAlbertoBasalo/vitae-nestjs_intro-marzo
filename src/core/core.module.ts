import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MonitorMiddleware).forRoutes('*');
  }
}
