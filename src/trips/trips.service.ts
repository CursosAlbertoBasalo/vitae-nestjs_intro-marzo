import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/utils/utils.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const trip = this.tripRepository.create(createTripDto);
    trip.id = this.utilsService.createGUID();
    return await this.tripRepository.save(trip);
  }

  async findAll() {
    return await this.tripRepository.find({ relations: ['bookings'] });
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOne(id, { relations: ['bookings'] });
    if (!trip) throw new EntityNotFoundError(Trip, id);
    this.tripRepository.save(trip);
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    const updatedTrip = {
      ...trip,
      ...updateTripDto,
      updatedAt: new Date(),
    };
    return await this.tripRepository.save(updatedTrip);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    await this.tripRepository.remove(trip);
    return {};
  }
}
