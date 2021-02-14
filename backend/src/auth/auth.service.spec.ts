import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';

const dummyUser = {
  id: 1,
  name: 'Mike',
  email: 'user@email.com',
  password: bcrypt.hashSync('password', 10),
};

const mockUserService = () => ({
  getByEmail: jest.fn().mockReturnValue(dummyUser),
});

const mockJwtService = () => ({
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(),
});

const mockConfigService = () => ({
  get: jest.fn(() => '7h'),
});

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
        {
          provide: ConfigService,
          useValue: mockConfigService(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Log In', () => {
    it('should autheticate and return a user if login credentials are correct', async () => {
      const user = await service.authenticateUser({
        email: dummyUser.email,
        password: 'password',
      });

      expect(userService.getByEmail).toHaveBeenCalledTimes(1);
      expect(dummyUser).toEqual(expect.objectContaining(user));
    });

    it('should autheticate and return null if login credentials are incorrect', async () => {
      const user = await service.authenticateUser({
        email: dummyUser.email,
        password: 'password221',
      });

      expect(userService.getByEmail).toHaveBeenCalledTimes(1);
      expect(user).toBeNull();
    });

    it('should catch error thrown', async () => {
      (userService.getByEmail as jest.Mock).mockRejectedValue(new Error());

      expect(
        async () =>
          await service.authenticateUser({
            email: dummyUser.email,
            password: 'password221',
          }),
      ).rejects.toThrowError(HttpException);
      expect(userService.getByEmail).toHaveBeenCalledTimes(1);
    });

    it('should log a user in and return access_token', async () => {
      const result = await service.login(dummyUser);

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: dummyUser.email,
        sub: dummyUser.id,
      });
      expect(result).toMatchObject({
        user: dummyUser,
        access_token: 'signed-token',
      });
    });
  });
});
