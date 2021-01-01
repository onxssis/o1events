import { USER_REPOSITORY } from '@/common/common.constants';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserRepository } from './repositories/typeorm/user.repository';
import { IUserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create Account', () => {
    const createAccountArgs = {
      name: 'John Appleseed',
      email: 'john@appleseed.com',
      password: 'password',
      is_admin: false,
    };

    it('should fail if user exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: '',
      });

      expect(
        async () => await service.createUser(createAccountArgs),
      ).rejects.toThrowError(ConflictException);
    });

    it('should create a new user account', async () => {
      usersRepository.create.mockResolvedValue(createAccountArgs);

      const user = await service.createUser(createAccountArgs);

      expect(user).toEqual(expect.objectContaining(createAccountArgs));
    });

    it('should find a user by email', async () => {
      const result = {
        id: 1,
        email: createAccountArgs.email,
      };
      usersRepository.findOne.mockResolvedValue(result);

      const user = await service.getByEmail(createAccountArgs.email);

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject(user);
    });

    it('should find a user by id', async () => {
      const result = {
        id: 2,
        email: 'reandomuse@emai.com',
      };
      usersRepository.findOne.mockResolvedValue(result);

      const user = await service.findOne(2);

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject(user);
    });
  });
});
