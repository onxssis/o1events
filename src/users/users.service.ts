import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '@/common/common.constants';
import { IUserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticateUserDto } from '@/auth/dto/authuser.dto';

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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.userRespository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async getByEmail(email: string) {
    return await this.userRespository.findOne({ email });
  }

  async authenticateUser({ email, password }: AuthenticateUserDto) {
    try {
      const user = await this.getByEmail(email);

      await this.verifyPassword(password, user.password);
      user.password = undefined;

      return user;
    } catch (e) {
      throw new HttpException(
        'Invalid credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Invalid credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
