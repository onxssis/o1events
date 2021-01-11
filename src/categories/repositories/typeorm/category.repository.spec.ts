import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { CategoryRepository } from './category.repository';

const mockDbConnection = () => ({
  getRepository: () => ({
    delete: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
    findByIds: jest.fn().mockResolvedValue([]),
    findOneOrFail: jest.fn().mockResolvedValue('slug'),
    find: jest.fn().mockReturnValue({}),
    preload: jest.fn().mockResolvedValue({ id: 1 }),
  }),
});

describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        {
          provide: Connection,
          useValue: mockDbConnection(),
        },
      ],
    }).compile();

    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    connection = module.get(Connection);
  });

  it('should be defined', () => {
    expect(categoryRepository).toBeDefined();
  });

  it('should call the create method', async () => {
    const createCategoryDto = { name: 'Dev Summit' };
    const category = await categoryRepository.create(createCategoryDto);
    expect(category).toBe(true);
  });

  it('should call the delete method', async () => {
    const category = await categoryRepository.delete(1);

    expect(category).toBe(null);
  });

  it('should call the findByIds method', async () => {
    const categories = await categoryRepository.findByIds([1, 4]);

    expect(categories).toHaveLength(0);
  });

  it('should call the findOneBySlug method', async () => {
    const categorySlug = await categoryRepository.findOneBySlug(
      'category-slug',
    );

    expect(categorySlug).toBe('slug');
  });

  it('should call the findOne method', async () => {
    const category = await categoryRepository.findOne(1);

    expect(category).toBe('slug');
  });

  it('should call the findAll method', async () => {
    const category = await categoryRepository.findAll();

    expect(category).toMatchObject({});
  });

  it('should call the update method', async () => {
    const category = await categoryRepository.update(1, {
      name: 'updated name',
    });

    expect(category).toBe(true);
  });

  it('should call the repo getter method', async () => {
    const repo = categoryRepository.repo;

    expect(JSON.stringify(repo)).toStrictEqual(
      JSON.stringify(connection.getRepository('')),
    );
  });
});
