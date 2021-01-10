import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './repositories/typeorm/category.repository';
import { CATEGORY_REPOSITORY } from '@/common/common.constants';

const repoServiceProvider = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryRepository,
  },
];

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ...repoServiceProvider],
  exports: [CategoriesService],
})
export class CategoriesModule {}
