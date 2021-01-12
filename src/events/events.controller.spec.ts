import { Test, TestingModule } from '@nestjs/testing';
import {
  EVENT_REPOSITORY,
  CATEGORY_REPOSITORY,
} from '@/common/common.constants';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { CategoriesService } from '@/categories/categories.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { eventDto } from '../../test/helpers';

describe('EventsController', () => {
  let controller: EventsController;
  let categoryService: CategoriesService;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        CategoriesService,
        {
          provide: EVENT_REPOSITORY,
          useValue: {},
        },
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    categoryService = module.get<CategoriesService>(CategoriesService);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(eventsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const result = { ok: true };
      jest.spyOn<any, any>(eventsService, 'create').mockResolvedValue(result);

      expect(await controller.create(eventDto)).toBe(result);
    });

    it('should catch conflict exception when it is thrown', async () => {
      const error: NodeJS.ErrnoException = new Error();
      error.code = '23505';
      jest.spyOn(eventsService, 'create').mockRejectedValue(error);

      expect(async () => await controller.create(eventDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should catch any other exception when it is thrown', async () => {
      jest
        .spyOn(eventsService, 'create')
        .mockRejectedValue(new Error('error occured'));

      expect(async () => await controller.create(eventDto)).rejects.toThrow(
        'error occured',
      );
    });
  });

  describe('search', () => {
    const paginationDto = { page: 1, limit: 1 };

    it('should call the search method and return events that match search query', async () => {
      const filterDto = { q: 'Dev summ' };

      expect(await controller.search(filterDto, paginationDto)).toMatchObject({
        ...filterDto,
        ...paginationDto,
      });
    });
  });

  describe('findAll', () => {
    const eventResult = {
      data: [new Event()],
      page: 1,
      perPage: 3,
      totalCount: 6,
      hasMorePages: false,
    };

    it('should return a list of events', async () => {
      jest.spyOn(eventsService, 'findAll').mockResolvedValue(eventResult);

      expect(await controller.findAll({})).toBe(eventResult);
      expect((await controller.findAll({})).data).toHaveLength(1);
    });

    it('should return a list of events when pagination query is present', async () => {
      jest
        .spyOn(eventsService, 'findAll')
        .mockResolvedValue({ ...eventResult, page: 2 });

      expect(await controller.findAll({ page: 2, limit: 1 })).toMatchObject({
        ...eventResult,
        page: 2,
      });
      expect(
        (await controller.findAll({ page: 2, limit: 1 })).data,
      ).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = new Event();
      jest.spyOn(eventsService, 'findOneBySlug').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });

    it('should throw not found exception if event is not found', async () => {
      jest
        .spyOn(eventsService, 'findOneBySlug')
        .mockRejectedValue(new Error('No event'));

      expect(async () => await controller.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const result = { ...eventDto, title: 'Updated title' };
      jest.spyOn<any, any>(eventsService, 'update').mockResolvedValue(result);

      expect(await controller.update('1', result)).toMatchObject(result);
    });

    it('should throw not found exception if event is not found', async () => {
      jest
        .spyOn(eventsService, 'update')
        .mockRejectedValue(new Error('No event'));

      expect(
        async () =>
          await controller.update('1', { ...eventDto, title: 'New title' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a event', async () => {
      const result = { raw: {}, affected: 1 };
      jest.spyOn(eventsService, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
