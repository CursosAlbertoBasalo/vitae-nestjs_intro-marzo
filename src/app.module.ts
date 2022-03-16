import { Module } from '@nestjs/common';
import { AgenciesModule } from './agencies/agencies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { CoreModule } from './core/core.module';
import { TripsModule } from './trips/trips.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [AuthModule, UtilsModule, AgenciesModule, TripsModule, BookingsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
