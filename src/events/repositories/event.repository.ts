import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

export interface IEventRepository {
  findAll(): Promise<Event[]>;

  create(createEventDto: CreateEventDto): Promise<Event>;

  findOne(id: number): Promise<Event>;

  findOneBySlug(slug: string): Promise<Event>;

  update(id: number, updateEventDto: UpdateEventDto): Promise<Event>;

  delete(id: number): Promise<any>;
}
