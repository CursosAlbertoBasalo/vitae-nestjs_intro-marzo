import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payments/entities/payment.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Trip, Payment])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
