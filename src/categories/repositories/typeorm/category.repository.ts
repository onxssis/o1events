import { Connection, EntityRepository } from 'typeorm';
import { Category } from '@/categories/entities/category.entity';
import { ICategoryRepository } from '../category.repository';
import { CreateCategoryDto } from '@/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@/categories/dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository implements ICategoryRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(Category);
  }

  async findAll() {
    return this.repo.find({});
  }

  async findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  async findByIds(ids: number[]) {
    return this.repo.findByIds(ids);
  }

  async findOneBySlug(slug: string) {
    return this.repo.findOneOrFail({ slug });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);

    return this.repo.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.preload({ id, ...updateCategoryDto });

    return this.repo.save(category);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
