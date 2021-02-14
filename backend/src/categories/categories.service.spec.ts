import { CATEGORY_REPOSITORY } from '@/common/common.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

const mockCategoryRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository: MockRepository;

  const createCategoryArgs = {
    name: 'Dev Summit',
    description: 'sdmh sfjd',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CATEGORY_REPOSITORY,
          useValue: mockCategoryRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get(CATEGORY_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should call the create method of the category repository', async () => {
    categoryRepository.create.mockReturnValue({ id: 1, ...createCategoryArgs });

    const category = await service.create(createCategoryArgs);

    expect(categoryRepository.create).toHaveBeenCalledTimes(1);
    expect(category).toEqual(
      expect.objectContaining({
        id: 1,
        ...createCategoryArgs,
      }),
    );
  });

  it('should call the findAll method of the category repository', async () => {
    (categoryRepository as any).findAll.mockReturnValue([]);

    const categories = await service.findAll();

    expect((categoryRepository as any).findAll).toHaveBeenCalledTimes(1);
    expect(categories).toHaveLength(0);
  });

  it('should call the findOne method of the category repository', async () => {
    categoryRepository.findOne.mockReturnValue(null);

    const category = await service.findOne(1);

    expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
    expect(category).toBeNull();
  });

  it('should call the delete method of the category repository', async () => {
    categoryRepository.delete.mockReturnValue(null);

    const category = await service.remove(1);

    expect(categoryRepository.delete).toHaveBeenCalledTimes(1);
    expect(category).toBeNull();
  });

  it('should call the update method of the category repository', async () => {
    categoryRepository.update.mockReturnValue({
      ...createCategoryArgs,
      name: 'update',
    });
    categoryRepository.findOne.mockReturnValue({});

    const category = await service.update(1, createCategoryArgs);

    expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(category).toEqual(
      expect.objectContaining({ ...createCategoryArgs, name: 'update' }),
    );
  });

  it('should call the slugify listener method on entity', () => {
    const category = new Category();
    category.name = 'Dev Summit';

    category.slugify();

    expect(category.slug).toBe('dev-summit');
  });
});
