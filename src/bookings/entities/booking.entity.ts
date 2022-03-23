import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryColumn()
  id: string;

  @Column()
  client: string;

  @Column()
  passengers: number;

  @Column()
  tripId: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
