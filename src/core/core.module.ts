import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import helmet from 'helmet';
import { CORE_PROVIDERS } from './core.providers';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

const mongoUser = 'nest_user';
const mongoPass = 'nest_password';
const mongoHost = 'localhost:27017';
const mongoDB = 'nest';
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?authSource=admin`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: process.env.DB_PASS,
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
  ],
  providers: CORE_PROVIDERS,
})
export class CoreModule implements NestModule {
  constructor(private config: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    new Logger('Core').debug(this.config.get<string>('DB_PASS'));
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(MonitorMiddleware).forRoutes('*');
  }
}
