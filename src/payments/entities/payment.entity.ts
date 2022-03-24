import { Booking } from 'src/bookings/entities/booking.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  creditCard: string;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking: Booking;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
