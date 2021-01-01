import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(createUserDto: any): Promise<User>;

  findOne(options: any): Promise<User | null>;
}
