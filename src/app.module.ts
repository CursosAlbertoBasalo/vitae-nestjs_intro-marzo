import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [AuthModule, UtilsModule, AgenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
