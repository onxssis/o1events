import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@/categories/categories.service';
import {
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
  RESERVATION_REPOSITORY,
  USER_REPOSITORY,
} from '@/common/common.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      name: 'User Name',
      email: 'user@email.com',
      password: 'password',
    };

    it('should create a user', async () => {
      const result = { ok: true };
      jest.spyOn<any, any>(userService, 'createUser').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toBe(result);
    });

    it('should catch error while creating a user', () => {
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new Error('error occured'));

      expect(
        async () => await controller.create(createUserDto),
      ).rejects.toThrowError('error occured');
    });
  });

  describe('login', () => {
    const loginDto = { email: 'user@email.com', password: 'password' };

    it('should log a user in', async () => {
      const result = new User();
      const response = { user: result, access_token: 'token' };

      jest.spyOn(authService, 'authenticateUser').mockResolvedValue(result);
      jest.spyOn(authService, 'login').mockResolvedValue(response);

      expect(await controller.login(loginDto)).toMatchObject(response);
    });

    it('should catch error while logging a user in', async () => {
      jest.spyOn(authService, 'authenticateUser').mockResolvedValue(null);

      expect(async () => await controller.login(loginDto)).rejects.toThrowError(
        HttpException,
      );
    });
  });

  describe('getProfile', () => {
    it('should get an authenticated user profile', async () => {
      const result = new User();

      expect(controller.getProfile(result)).toMatchObject(result);
    });
  });
});
