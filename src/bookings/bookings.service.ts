import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/utils/utils.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const booking = this.bookingRepository.create(createBookingDto);
    booking.id = this.utilsService.createGUID();
    return await this.bookingRepository.save(booking);
  }

  async findAll() {
    return await this.bookingRepository.find();
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
