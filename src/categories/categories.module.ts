import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './repositories/typeorm/category.repository';

const repoServiceProvider = {
  provide: 'CATEGORY_REPOSITORY',
  useClass: CategoryRepository,
  inject: [],
};

@Module({
  controllers: [CategoriesController],
  providers: [repoServiceProvider, CategoriesService, CategoryRepository],
  exports: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
