import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public eventId: number;

  @Column()
  public userId: number;

  @ManyToOne(() => Event, (event) => event.reservations)
  public event: Event;

  @ManyToOne(() => User, (user) => user.reservations)
  public user: User;
}
