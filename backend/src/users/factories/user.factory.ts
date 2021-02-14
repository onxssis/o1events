import * as Faker from 'faker';
import { define } from '@/factory';
import { User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.isAdmin = false;
  user.password = faker.internet.password(8);

  return user;
});
