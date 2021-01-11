import { Test, TestingModule } from '@nestjs/testing';
import {
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
  RESERVATION_REPOSITORY,
} from '@/common/common.constants';
import { EventsService } from '@/events/events.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { User } from '@/users/entities/user.entity';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoryService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoryService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const result = new Category();
      const categoryDto = { name: 'design', description: 'design category' };
      jest.spyOn(categoryService, 'create').mockResolvedValue(result);

      expect(await controller.create(categoryDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return a list of categories', async () => {
      const result = [new Category(), new Category()];
      jest.spyOn(categoryService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(await controller.findAll()).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const result = new Category();
      jest.spyOn(categoryService, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const result = new Category();
      const categoryDto = { name: 'updated design', description: '' };
      jest.spyOn(categoryService, 'update').mockResolvedValue(result);

      expect(await controller.update('1', categoryDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const result = null;
      jest.spyOn(categoryService, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
