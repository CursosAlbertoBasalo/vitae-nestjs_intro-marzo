import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import helmet from 'helmet';
import { CORE_PROVIDERS } from './core.providers';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

const mongoUser = 'nest_user';
const mongoPass = 'nest_password';
const mongoHost = 'localhost:27017';
const mongoDB = 'nest';
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?authSource=admin`;

const postgresOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nest_user',
  password: 'nest_password',
  database: 'nest',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    TypeOrmModule.forRoot(postgresOptions),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
  ],
  providers: CORE_PROVIDERS,
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    new Logger('Core').debug(mongoUri);
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(MonitorMiddleware).forRoutes('*');
  }
}
