import * as Faker from 'faker';
import * as bcrypt from 'bcrypt';
import { define } from '@/factory';
import { User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.is_admin = false;
  user.password = bcrypt.hashSync('password', 10);

  return user;
});
