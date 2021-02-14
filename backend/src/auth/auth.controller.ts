import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { Auth } from '@/common/decorators/auth-user.decorator';
import { User } from '@/users/entities/user.entity';
import { AuthenticateUserDto } from './dto/authuser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

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
  async login(@Body() loginDto: AuthenticateUserDto) {
    const user = await this.authService.authenticateUser(loginDto);

    if (!user) {
      throw new HttpException(
        'Invalid credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Auth() user: User) {
    return user;
  }
}
