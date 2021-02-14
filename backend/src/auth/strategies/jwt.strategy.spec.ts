import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USER_REPOSITORY } from '@/common/common.constants';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn().mockReturnValue('jwt-key'),
          }),
        },
        {
          provide: USER_REPOSITORY,
          useValue: {},
        },
        UsersService,
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
    expect(configService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should call the validate method', async () => {
    jest
      .spyOn<any, any>(userService, 'findOne')
      .mockResolvedValue({ name: 'Test User' });

    const result = await jwtStrategy.validate({ sub: 2 });

    expect(result).toMatchObject({ name: 'Test User' });
  });

  it('should call the validate method and return undefined if no user is found', async () => {
    jest.spyOn<any, any>(userService, 'findOne').mockResolvedValue(null);

    const result = await jwtStrategy.validate({ sub: 2 });

    expect(result).toEqual(undefined);
  });
});
