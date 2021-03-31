import {
  Connection,
  EntityRepository,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Raw,
  SelectQueryBuilder,
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
import { FilterQueryDto } from '@/common/dto/filter.dto';
import { auth } from '@/common/helpers';

@EntityRepository(Event)
export class EventRepository implements IEventRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(Event);
  }

  async findAll(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResultDto> {
    const {
      limit,
      page,
      q,
      type,
      startDate,
      endDate,
      category,
    } = paginationDto;
    const skip = (page - 1) * limit;
    const where = this.whereClauses({ q, type, startDate, endDate, category });

    // const [data, totalCount] = await this.repo
    //   .createQueryBuilder('event')
    //   // .addSelect(`CASE WHEN event.type='person' THEN 1 END`, 'isOnline')
    //   .leftJoinAndSelect('event.categories', 'category')
    //   .leftJoinAndSelect('event.reservations', 'reservation')
    //   .leftJoinAndSelect('reservation.user', 'reservation_user')
    //   // .loadRelationCountAndMap('event.reservationsCount', 'event.reservations')
    //   .skip(skip)
    //   [where]()
    //   .take(limit)
    //   .getManyAndCount();

    const [data, totalCount] = await this.repo.findAndCount({
      relations: ['categories'],
      join: { alias: 'event', leftJoin: { categories: 'event.categories' } },
      where,
      skip,
      take: limit,
    });

    const lastPage = Math.max(Math.ceil(totalCount / limit));

    return {
      totalCount,
      page,
      lastPage,
      perPage: limit,
      data,
      hasMorePages: page < lastPage,
    };
  }

  async getUpcomingEvents(limit = 5) {
    return this.repo.find({
      where: { startDate: MoreThanOrEqual(new Date(Date.now()).toISOString()) },
      take: limit,
    });
  }

  async getPastEvents(limit = 5) {
    return this.repo.find({
      where: { startDate: LessThan(new Date(Date.now()).toISOString()) },
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.repo.findOneOrFail(id, {
      relations: ['categories', 'organizer'],
    });
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOneOrFail(
      { slug },
      { relations: ['categories', 'organizer'] },
    );
  }

  async create(createEventDto: CreateEventDto, categories: Category[]) {
    const event = this.repo.create({
      ...createEventDto,
      categories,
      organizer: auth(),
    });

    return this.repo.save(event);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const { categories, ...rest } = updateEventDto;
    let event = await this.findOne(id);

    event.categories =
      event.categories?.filter((category) =>
        updateEventDto.categories.includes(category.id),
      ) || [];

    event = await this.repo.preload({
      ...event,
      ...rest,
      categories: [...event.categories, ...categories],
    });

    return this.repo.save(event);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  private whereClauses(filters: FilterQueryDto) {
    const { q, type, startDate, endDate, category } = filters;
    let whereClause = {};

    if (type) {
      whereClause = { ...whereClause, type };
    }

    if (startDate && endDate) {
      whereClause = {
        ...whereClause,
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      };
    }

    if (q) {
      whereClause = {
        title: Raw(
          (alias) => `${alias} ILIKE :q OR event.description ILIKE :q`,
          {
            q: `%${q}%`,
          },
        ),
        ...whereClause,
      };
    }

    if (category) {
      const currentWhereClause = whereClause;
      whereClause = (qb: SelectQueryBuilder<Event>) => {
        qb.where({ ...currentWhereClause }).andWhere(
          'categories.slug = :category',
          {
            category,
          },
        );
      };
    }

    // if (dateRange) {
    //   switch (dateRange) {
    //     case 'now':
    //       where = {
    //         ...where,
    //         startDate: LessThan(new Date(Date.now()).toISOString()),
    //         endDate: MoreThan(new Date(Date.now()).toISOString()),
    //       };
    //       break;

    //     case 'today':
    //       where = {
    //         ...where,
    //         startDate: Raw(
    //           (alias) =>
    //             `TO_CHAR(${alias}, 'YYYY-MM-DD') = TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')`,
    //         ),
    //       };
    //       break;

    //     case 'tomorrow':
    //       where = {
    //         ...where,
    //         startDate: Raw(
    //           (alias) =>
    //             `TO_CHAR(${alias}, 'YYYY-MM-DD') = TO_CHAR(CURRENT_DATE + INTERVAL '1' DAY, 'YYYY-MM-DD')`,
    //         ),
    //       };
    //       break;

    //     default:
    //       break;
    //   }
    // }

    return whereClause;
  }
}
