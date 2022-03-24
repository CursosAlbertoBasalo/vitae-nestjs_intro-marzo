import { Booking } from 'src/bookings/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('trips')
export class Trip {
  @PrimaryColumn()
  id: string;

  @Column()
  destination: string;

  @Column({ default: new Date() })
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int', default: 10 })
  places: number;

  @Column()
  agencyId: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.trip, { cascade: true })
  bookings: Booking[];
}
