import { Connection, EntityRepository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { IUserRepository } from '../user.repository';
import { CategoriesService } from '@/categories/categories.service';

@EntityRepository(User)
export class UserRepository implements IUserRepository {
  constructor(private connection: Connection) {}

  get repo() {
    return this.connection.getRepository(User);
  }

  async findAll() {
    return this.repo.find({});
  }

  async findOne(id: number) {
    return this.repo.findOneOrFail(id);
  }

  // async findOneBySlug(slug: string) {
  //   return this.repo.findOneOrFail({ slug });
  // }

  async create(createUserDto: Record<string, unknown>) {
    const user = this.repo.create(createUserDto);

    return this.repo.save(user);
  }

  // async update(id: number, updateEventDto: UpdateEventDto) {
  //   const event = await this.repo.preload({ id, ...updateEventDto });

  //   event.categories = event.categories.filter((category) =>
  //     updateEventDto.categories.includes(category.id),
  //   );

  //   return this.repo.save(event);
  // }

  // async delete(id: number) {
  //   return this.repo.delete(id);
  // }
}
