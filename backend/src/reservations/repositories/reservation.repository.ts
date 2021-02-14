import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

export interface IReservationRepository {
  create(event: Event, user: User): Promise<any>;

  delete(event: Event, user: User): Promise<any>;
}
