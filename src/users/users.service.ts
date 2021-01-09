import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '@/common/common.constants';
import { IUserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRespository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const exists = await this.userRespository.findOne({
      email: createUserDto.email,
    });

    if (exists) {
      throw new ConflictException('User already exists');
    }

    return this.userRespository.create(createUserDto);
  }

  async getByEmail(email: string) {
    return await this.userRespository.findOne({ email });
  }

  async findOne(id: number) {
    return await this.userRespository.findOne({ id });
  }
}
