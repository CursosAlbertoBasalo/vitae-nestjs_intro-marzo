import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { CORE_PROVIDERS } from './core.providers';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 10 })],
  providers: CORE_PROVIDERS,
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(MonitorMiddleware).forRoutes('*');
  }
}
