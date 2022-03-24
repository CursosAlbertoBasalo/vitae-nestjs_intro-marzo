import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/trips/entities/trip.entity';
import { UtilsService } from 'src/utils/utils.service';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    private readonly utilsService: UtilsService,
    private readonly connection: Connection,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const booking = this.bookingRepository.create(createBookingDto);
    booking.id = this.utilsService.createGUID();
    const trip = await this.tripRepository.findOne(createBookingDto.tripId, {});
    if (!trip) throw new EntityNotFoundError(Trip, createBookingDto.tripId);
    if (booking.passengers > trip.places) throw new Error('Not enough places');
    trip.places -= booking.passengers;
    booking.trip = trip;
    try {
      await this.tripRepository.save(trip);
      throw new Error('Forced error');
      // await this.bookingRepository.save(booking);
      // await queryRunner.commitTransaction();
    } catch (error) {
      new Logger('BookingsService').error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.bookingRepository.find({});
  }

  async findOne(id: string) {
    const booking = await this.bookingRepository.findOne(id, {});
    if (!booking) throw new EntityNotFoundError(Booking, id);
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);
    const updatedBooking = {
      ...booking,
      ...updateBookingDto,
      updatedAt: new Date(),
    };
    return await this.bookingRepository.save(updatedBooking);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    await this.bookingRepository.remove(trip);
    return {};
  }
}
