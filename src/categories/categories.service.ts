import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: ICategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async findByIds(ids: number[]) {
    return this.categoryRepository.findByIds(ids);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
