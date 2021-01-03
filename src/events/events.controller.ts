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
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  PaginatedResultDto,
  PaginationQueryDto,
} from '@/common/dto/pagination.dto';
import { AdminGuard } from '@/common/guards/admin.guard';
import { AuthGuard } from '@/auth/guards/jwt.guard';
import { FilterQueryDto } from '@/common/dto/filter.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
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
    return await this.eventsService.findAll(paginationDto);
  }

  @Get('search')
  async search(
    @Query() filterDto: FilterQueryDto,
    @Query() paginationDto: PaginationQueryDto,
  ) {
    console.log({ ...filterDto, ...paginationDto });
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
  @UseGuards(AuthGuard, AdminGuard)
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
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
