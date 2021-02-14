import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { UserRepository } from './user.repository';

const mockDbConnection = () => ({
  getRepository: () => ({
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
  }),
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: Connection,
          useValue: mockDbConnection(),
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    connection = module.get(Connection);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should call the findAll method', async () => {
    const users = await userRepository.findAll();

    expect(users).toEqual([]);
  });

  it('should call the findOne method', async () => {
    const user = await userRepository.findOne({});

    expect(user).toBeNull();
  });

  it('should call the create method', async () => {
    const user = await userRepository.create({});

    expect(user).toBe(true);
  });

  it('should call the repo getter method', async () => {
    const repo = userRepository.repo;

    expect(JSON.stringify(repo)).toStrictEqual(
      JSON.stringify(connection.getRepository('')),
    );
  });
});
