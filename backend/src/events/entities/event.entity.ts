import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import slugify from 'slugify';
import { Expose } from 'class-transformer';

import { Category } from '@/categories/entities/category.entity';
import { CoreEntity } from '@/common/entities/core.entity';
import { Reservation } from '@/reservations/entities/reservation.entity';
import { auth } from '@/common/helpers';
import { User } from '@/users/entities/user.entity';

export enum EventType {
  ONLINE = 'online',
  PERSON = 'person',
}

@Entity({ name: 'events' })
export class Event extends CoreEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true, type: 'real' })
  lng?: string;

  @Column({ nullable: true, type: 'real' })
  lat?: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ default: false })
  premium: boolean;

  @Column({
    type: 'timestamp',
    name: 'start_date',
    default: 'NOW()',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    name: 'end_date',
    default: 'NOW()',
  })
  endDate: Date;

  @Column({ default: 0 })
  price: number;

  @Column({ type: 'enum', enum: EventType, default: EventType.PERSON })
  type: EventType;

  @Column({ nullable: true })
  link?: string;

  @ManyToOne(() => User, (user) => user.events, { nullable: true })
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @ManyToMany(() => Category, { onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Reservation, (reservation) => reservation.event, {
    eager: true,
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];

  @Expose()
  get isAttending(): any {
    return this.reservations?.some((r) => r.user.id === auth().id);
  }

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.title, { lower: true });
  }
}
