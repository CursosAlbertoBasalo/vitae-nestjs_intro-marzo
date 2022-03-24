import { Payment } from 'src/payments/entities/payment.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryColumn()
  id: string;

  @Column()
  client: string;

  @Column()
  passengers: number;

  @ManyToOne(() => Trip, (trip) => trip.bookings)
  trip: Trip;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.booking, { cascade: true, eager: true })
  payments: Payment[];
}
