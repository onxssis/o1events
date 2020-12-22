import { EntityRepository, Repository } from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { IEventRepository } from '../event.repository';

@EntityRepository(Event)
export class EventRepository
  extends Repository<Event>
  implements IEventRepository {
  async findAll() {
    return this.find({});
  }
}
