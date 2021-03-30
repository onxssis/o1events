import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Exclude()
  public eventId: number;

  @Column()
  @Exclude()
  public userId: number;

  @Column()
  transactionRef: string;

  @Column({ nullable: true })
  authCode: string;

  @Column({ nullable: true })
  customerCode: string;

  @Column({ nullable: true })
  customerEmail: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  failedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  paidAt: Date;

  @ManyToOne(() => Event, (event) => event.reservations)
  public event: Event;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true })
  public user: User;
}
