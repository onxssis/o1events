import {
  Between,
  Connection,
  EntityRepository,
  LessThan,
  MoreThan,
  Raw,
} from 'typeorm';
import { Event } from '@/events/entities/event.entity';
import { IEventRepository } from '../event.repository';
import { CreateEventDto } from '@/events/dto/create-event.dto';
import { UpdateEventDto } from '@/events/dto/update-event.dto';
import {
  PaginatedResultDto,
  PaginationQueryDto,
} from '@/common/dto/pagination.dto';
import { Category } from '@/categories/entities/category.entity';

@EntityRepository(Event)
export class EventRepository implements IEventRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(Event);
  }

  async findAll(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResultDto> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    // const [data, totalCount] = await this.repo
    //   .createQueryBuilder('event')
    //   .addSelect(`CASE WHEN event.type='person' THEN 1 END`, 'isOnline')
    //   .leftJoinAndSelect('event.categories', 'category')
    //   .loadRelationCountAndMap('event.reservationsCount', 'event.reservations')
    //   .skip(skip)
    //   .take(limit)
    //   .getManyAndCount();

    const [data, totalCount] = await this.repo.findAndCount({
      skip,
      take: limit,
    });

    return {
      totalCount,
      page,
      perPage: limit,
      data,
      hasMorePages: totalCount > limit,
    };
  }

  async getUpcomingEvents(limit = 5) {
    return this.repo.find({
      where: { startDate: MoreThan(new Date()) },
      take: limit,
    });
  }

  async getPastEvents(limit = 5) {
    return this.repo.find({
      where: { startDate: LessThan(new Date()) },
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOneOrFail({ slug });
  }

  async create(createEventDto: CreateEventDto, categories: Category[]) {
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
