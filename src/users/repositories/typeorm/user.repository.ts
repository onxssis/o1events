import { Connection, EntityRepository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { IUserRepository } from '../user.repository';

@EntityRepository(User)
export class UserRepository implements IUserRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(User);
  }

  async findAll() {
    return this.repo.find({});
  }

  async findOne(options: any) {
    return this.repo.findOne(options);
  }

  async create(createUserDto: Record<string, unknown>) {
    const user = this.repo.create(createUserDto);

    return this.repo.save(user);
  }
}
