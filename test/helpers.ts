import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { factory } from '@/factory';

import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';

const getPasswordHash = async (password: any) => {
  return bcrypt.hashSync(password, 10);
};

export const users = [
  {
    id: 1,
    name: 'Administrator',
    email: 'admin@email.com',
    password: '123456',
    is_admin: true,
  },
  {
    id: 2,
    name: 'User',
    email: 'user@email.com',
    password: '123456',
    is_admin: false,
  },
];

export const populateUsers = async (done: any) => {
  const adminHash = await getPasswordHash(users[0].password);
  const userHash = await getPasswordHash(users[1].password);
  const users_ = [
    { ...users[0], password: adminHash },
    { ...users[1], password: userHash },
  ];

  await getRepository(User).insert(users_);

  done();
};

export const deleteUser = async (id: number) => {
  await getRepository(User).delete({ id });
};

export const populateEvents = async (overrides?: any, count = 2) => {
  const events = await factory(Event).makeMany(count, overrides);

  await getRepository(Event).save(events);
};
