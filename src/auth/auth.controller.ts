import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticateUserDto } from './dto/authuser.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() authDto: AuthenticateUserDto) {
    return await this.userService.authenticateUser(authDto);
  }
}
