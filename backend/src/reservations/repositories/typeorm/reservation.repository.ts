import { Connection, EntityRepository } from 'typeorm';
import { Reservation } from '@/reservations/entities/reservation.entity';
import { IReservationRepository } from '../reservation.repository';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

@EntityRepository(Reservation)
export class ReservationRepository implements IReservationRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(Reservation);
  }

  async create(event: Event, user: User) {
    const reservation = this.repo.create({ event, user });
    return this.repo.save(reservation);
  }

  async delete(event: Event, user: User) {
    return this.repo.delete({ event, user });
  }
}
