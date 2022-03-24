import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryColumn()
  id: string;

  @Column()
  client: string;

  @Column()
  passengers: number;

  // @Column()
  // tripId: string;

  @ManyToOne(() => Trip, (trip) => trip.bookings)
  trip: Trip;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
