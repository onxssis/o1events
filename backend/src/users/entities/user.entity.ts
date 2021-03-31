import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CoreEntity } from '@/common/entities/core.entity';
import { Reservation } from '@/reservations/entities/reservation.entity';
import { Exclude, Expose } from 'class-transformer';
import { Event } from '@/events/entities/event.entity';

@Entity({ name: 'users' })
export class User extends CoreEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    onDelete: 'CASCADE',
  })
  public reservations: Reservation[];

  @Expose()
  get initials(): string {
    const halves = this.name.split(' ');
    return `${halves[0][0].toUpperCase()}${halves[1][0].toUpperCase()}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
