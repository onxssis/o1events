import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;

  create(createCategoryDto: CreateCategoryDto): Promise<Category>;

  findByIds(ids: number[]): Promise<Category[]>;

  findOneBySlug(slug: string): Promise<Category>;

  findOne(id: number): Promise<Category>;

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;

  delete(id: number): Promise<any>;
}
