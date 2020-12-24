import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@/common/common.constants';
import { IUserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRespository: IUserRepository,
  ) {}

  async createUser(createUserDto: any) {
    this.userRespository.create(createUserDto);
  }

  async checkIdentity(email: string, password: string) {
    console.log(email, password);
  }
}
