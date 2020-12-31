import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserDto } from './dto/authuser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser({ email, password }: AuthenticateUserDto) {
    try {
      const user = await this.usersService.getByEmail(email);

      const passwordValid = await this.validPassword(password, user.password);

      if (passwordValid) {
        const { password: _, ...userResult } = user;
        return userResult;
      }

      return null;
    } catch (e) {
      throw new HttpException(
        'Invalid credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );

    return isPasswordMatching;
  }
}
