import { User } from '../entities/user.entity';

export interface IUserRepository {
  // findAll(): Promise<User[]>;

  create(createUserDto: any): Promise<User>;

  findOne(id: number): Promise<User>;

  // findOneBySlug(slug: string): Promise<User>;

  // update(id: number, updateUserDto: any): Promise<User>;

  // delete(id: number): Promise<any>;
}
