import { UserRepository } from '@/users/repositories/typeorm/user.repository';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule {}
