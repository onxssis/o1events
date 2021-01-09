import * as Faker from 'faker';
import { define } from '@/factory';
import { Category } from '../entities/category.entity';
import slugify from 'slugify';

define(Category, (faker: typeof Faker) => {
  const category = new Category();
  const name = faker.lorem.word();

  category.name = name;
  category.description = faker.lorem.sentences(3);
  category.slug = slugify(name, { lower: true });

  return category;
});
