import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { AgenciesModule } from './agencies/agencies.module';
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [AuthModule, UtilsModule, AgenciesModule, TripsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
