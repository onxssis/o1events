import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
@Index(['userId', 'eventId'], { unique: true })
export class Reservation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public eventId: number;

  @Column()
  public userId: number;

  @ManyToOne(() => Event, (event) => event.reservations)
  public event: Event;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true })
  public user: User;
}
