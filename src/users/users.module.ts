import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/typeorm/user.repository';

const repoServiceProvider = [
  {
    provide: 'USER_REPOSITORY',
    useClass: UserRepository,
    inject: [],
  },
];

@Module({
  providers: [UsersService, ...repoServiceProvider],
  controllers: [UsersController],
})
export class UsersModule {}
