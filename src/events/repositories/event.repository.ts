import { Event } from '../entities/event.entity';

export interface IEventRepository {
  findAll(): Promise<Event[]>;
}
