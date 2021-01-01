import { EVENT_REPOSITORY, USER_REPOSITORY } from '@/common/common.constants';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { EventRepository } from './repositories/typeorm/event.repository';
import { IEventRepository } from './repositories/event.repository';
import { EventsService } from './events.service';

const mockEventRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findOneBySlug: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('EventsService', () => {
  let service: EventsService;
  let eventRepository: MockRepository;

  const createEventArgs = {
    title: 'Exchanges Dev Summit',
    description: 'sdmh sfjd',
    location: 'doewb4r9o23',
    lng: '4.322',
    lat: '-1.23433',
    categories: [1, 2],
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EVENT_REPOSITORY,
          useValue: mockEventRepository(),
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventRepository = module.get(EVENT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(eventRepository).toBeDefined();
  });

  it('should call the create method of the event repository', async () => {
    eventRepository.create.mockReturnValue({ id: 1, ...createEventArgs });

    const event = await service.create(createEventArgs);

    expect(eventRepository.create).toHaveBeenCalledTimes(1);
    expect(event).toEqual(
      expect.objectContaining({
        id: 1,
        ...createEventArgs,
      }),
    );
  });

  it('should call the findAll method of the event repository', async () => {
    (eventRepository as any).findAll.mockReturnValue([]);

    const events = await service.findAll();

    expect((eventRepository as any).findAll).toHaveBeenCalledTimes(1);
    expect(events).toHaveLength(0);
  });

  it('should call the findOne method of the event repository', async () => {
    eventRepository.findOne.mockReturnValue(null);

    const event = await service.findOne(1);

    expect(eventRepository.findOne).toHaveBeenCalledTimes(1);
    expect(event).toBeNull();
  });

  it('should call the findOneBySlug method of the event repository', async () => {
    (eventRepository as any).findOneBySlug.mockReturnValue(null);

    const event = await service.findOneBySlug('slug');

    expect((eventRepository as any).findOneBySlug).toHaveBeenCalledTimes(1);
    expect(event).toBeNull();
  });

  it('should call the delete method of the event repository', async () => {
    eventRepository.delete.mockReturnValue(null);

    const event = await service.remove(1);

    expect(eventRepository.delete).toHaveBeenCalledTimes(1);
    expect(event).toBeNull();
  });

  it('should call the update method of the event repository', async () => {
    eventRepository.update.mockReturnValue({
      ...createEventArgs,
      title: 'update',
    });
    eventRepository.findOne.mockReturnValue({});

    const event = await service.update(1, createEventArgs);

    expect(eventRepository.findOne).toHaveBeenCalledTimes(1);
    expect(eventRepository.update).toHaveBeenCalledTimes(1);
    expect(event).toEqual(
      expect.objectContaining({ ...createEventArgs, title: 'update' }),
    );
  });
});
