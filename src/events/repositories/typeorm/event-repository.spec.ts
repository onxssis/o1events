import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { Category } from '@/categories/entities/category.entity';
import { eventDto } from '../../../../test/helpers';
import { EventRepository } from './event.repository';

const mockDbConnectionWithQueryBuilder = () => ({
  getRepository: () => ({
    createQueryBuilder: () => ({
      leftJoinAndSelect: () => ({
        loadRelationCountAndMap: () => ({
          skip: () => ({
            take: () => ({
              getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
            }),
          }),
        }),
      }),
    }),
    delete: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
    findOneOrFail: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([{ title: 'test event' }]),
    preload: jest.fn().mockResolvedValue({ categories: [{ id: 1 }] }),
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
  }),
});

describe('EventRepository', () => {
  let eventRepository: EventRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventRepository,
        {
          provide: Connection,
          useValue: mockDbConnectionWithQueryBuilder(),
        },
      ],
    }).compile();

    eventRepository = module.get<EventRepository>(EventRepository);
    connection = module.get(Connection);
  });

  it('should be defined', () => {
    expect(eventRepository).toBeDefined();
  });

  it('should call the create method', async () => {
    const user = await eventRepository.create(eventDto, [new Category()]);

    expect(user).toBe(true);
  });

  it('should call the findAll method', async () => {
    const result = {
      data: [],
      page: 1,
      perPage: 1,
      totalCount: 0,
      hasMorePages: false,
    };
    const events = await eventRepository.findAll({ limit: 1, page: 1 });

    expect(events).toMatchObject(result);
  });

  it('should call the update method', async () => {
    const event = await eventRepository.update(1, {
      ...eventDto,
      categories: [],
    });

    expect(event).toBe(true);
  });

  it('should call the getUpcomingEvents method', async () => {
    const event = await eventRepository.getUpcomingEvents();

    expect(event).toHaveLength(1);
  });

  it('should call the getPastEvents method', async () => {
    const event = await eventRepository.getPastEvents();

    expect(event).toHaveLength(1);
  });

  it('should call the findOne method', async () => {
    const event = await eventRepository.findOne(1);

    expect(event).toMatchObject({});
  });

  it('should call the findOneBySlug method', async () => {
    const event = await eventRepository.findOneBySlug('event-slug');

    expect(event).toMatchObject({});
  });

  it('should call the delete method', async () => {
    const event = await eventRepository.delete(1);

    expect(event).toBeNull();
  });

  it('should call the repo getter method', async () => {
    const repo = eventRepository.repo;

    expect(JSON.stringify(repo)).toStrictEqual(
      JSON.stringify(connection.getRepository('')),
    );
  });
});
