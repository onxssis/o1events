import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  PaginatedResultDto,
  PaginationQueryDto,
} from '@/common/dto/pagination.dto';
import { FilterQueryDto } from '@/common/dto/filter.dto';
import { AdminRoute } from '@/common/decorators/admin-route.decorator';
import { EntityCollectionSerializer } from '@/common/interceptors/serializer.interceptor';

@Controller('events')
@UseInterceptors(EntityCollectionSerializer)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @AdminRoute()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventsService.create(createEventDto);

      return event;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      }

      throw error;
    }
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page) || 1;
    paginationDto.limit =
      Number(paginationDto.limit) || EventsService.PAGINATION_LIMIT;

    return await this.eventsService.findAll(paginationDto);
  }

  @Get('upcoming')
  async upcoming() {
    return await this.eventsService.getUpcomingEvents();
  }

  @Get('search')
  async search(
    @Query() filterDto: FilterQueryDto,
    @Query() paginationDto: PaginationQueryDto,
  ) {
    return { ...filterDto, ...paginationDto };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      return await this.eventsService.findOneBySlug(slug);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  @AdminRoute()
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    try {
      return await this.eventsService.update(+id, updateEventDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @AdminRoute()
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
