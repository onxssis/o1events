import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import slugify from 'slugify';

import { Category } from '@/categories/entities/category.entity';
import { CoreEntity } from '@/common/entities/core.entity';
import { Reservation } from '@/reservations/entities/reservation.entity';

@Entity()
export class Event extends CoreEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true, type: 'real' })
  lng?: string;

  @Column({ nullable: true, type: 'real' })
  lat?: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ default: false })
  premium: boolean;

  @Column({ type: 'timestamp', name: 'start_date', default: 'NOW()' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date', default: 'NOW()' })
  endDate: Date;

  @Column({ default: 0 })
  price: number;

  @ManyToMany(() => Category, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Reservation, (reservation) => reservation.event, {
    onDelete: 'CASCADE',
  })
  public reservations: Reservation[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.title, { lower: true });
  }
}
