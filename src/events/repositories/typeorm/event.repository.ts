import { Connection, EntityRepository } from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { IEventRepository } from '../event.repository';
import { CreateEventDto } from '@/events/dto/create-event.dto';
import { CategoriesService } from '@/categories/categories.service';
import { UpdateEventDto } from '@/events/dto/update-event.dto';

@EntityRepository(Event)
export class EventRepository implements IEventRepository {
  constructor(
    private connection: Connection,
    private categoryService: CategoriesService,
  ) {}

  get repo() {
    return this.connection.getRepository(Event);
  }

  async findAll() {
    return this.repo.find({});
  }

  async findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOneOrFail({ slug });
  }

  async create(createEventDto: CreateEventDto) {
    const categories = await this.categoryService.findByIds(
      createEventDto.categories,
    );

    const event = this.repo.create({ ...createEventDto, categories });

    return this.repo.save(event);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.repo.preload({ id, ...updateEventDto });

    event.categories = event.categories.filter((category) =>
      updateEventDto.categories.includes(category.id),
    );

    return this.repo.save(event);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
