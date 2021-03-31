import { CategoriesService } from '@/categories/categories.service';
import { EVENT_REPOSITORY } from '@/common/common.constants';
import {
  PaginatedResultDto,
  PaginationQueryDto,
} from '@/common/dto/pagination.dto';
import { auth } from '@/common/helpers';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IEventRepository } from './repositories/event.repository';

@Injectable()
export class EventsService {
  static PAGINATION_LIMIT = 25;

  constructor(
    @Inject(EVENT_REPOSITORY)
    private eventRepository: IEventRepository,
    private categoryService: CategoriesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const categories = await this.categoryService.findByIds(
      createEventDto.categories,
    );

    return this.eventRepository.create(createEventDto, categories);
  }

  async findAll(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResultDto> {
    return this.eventRepository.findAll(paginationDto);
  }

  async findOne(id: number) {
    return this.eventRepository.findOne(id);
  }

  findOneBySlug(slug: string) {
    return this.eventRepository.findOneBySlug(slug);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    // if (event.organizer.id !== auth().id) {
    //   throw new UnauthorizedException();
    // }

    const categories = await this.categoryService.findByIds(
      updateEventDto.categories,
    );

    return this.eventRepository.update(id, { ...updateEventDto, categories });
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }

  getUpcomingEvents() {
    return this.eventRepository.getUpcomingEvents();
  }
}
