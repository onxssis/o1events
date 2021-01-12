import { Category } from '@/categories/entities/category.entity';
import {
  PaginatedResultDto,
  PaginationQueryDto,
} from '@/common/dto/pagination.dto';
import { DeleteResult } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

export interface IEventRepository {
  findAll(options?: PaginationQueryDto): Promise<PaginatedResultDto>;

  create(
    createEventDto: CreateEventDto,
    categories: Category[],
  ): Promise<Event>;

  findOne(id: number): Promise<Event>;

  findOneBySlug(slug: string): Promise<Event>;

  update(id: number, updateEventDto: UpdateEventDto): Promise<Event>;

  delete(id: number): Promise<DeleteResult | any>;
}
