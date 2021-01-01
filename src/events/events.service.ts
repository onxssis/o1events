import { EVENT_REPOSITORY } from '@/common/common.constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IEventRepository } from './repositories/event.repository';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private eventRepository: IEventRepository,
  ) {}

  async create(createEventDto: CreateEventDto) {
    return this.eventRepository.create(createEventDto);
  }

  findAll() {
    return this.eventRepository.findAll();
  }

  async findOne(id: number) {
    return this.eventRepository.findOne(id);
  }

  findOneBySlug(slug: string) {
    return this.eventRepository.findOneBySlug(slug);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    return this.eventRepository.update(id, updateEventDto);
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }
}
