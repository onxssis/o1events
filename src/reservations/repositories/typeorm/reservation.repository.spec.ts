import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { ReservationRepository } from './reservation.repository';

const mockDbConnection = () => ({
  getRepository: () => ({
    delete: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
  }),
});

describe('ReservationRepository', () => {
  let reservationRepository: ReservationRepository;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationRepository,
        {
          provide: Connection,
          useValue: mockDbConnection(),
        },
      ],
    }).compile();

    reservationRepository = module.get<ReservationRepository>(
      ReservationRepository,
    );
    connection = module.get(Connection);
  });

  it('should be defined', () => {
    expect(reservationRepository).toBeDefined();
  });

  it('should call the create method', async () => {
    const user = await reservationRepository.create(new Event(), new User());

    expect(user).toBe(true);
  });

  it('should call the delete method', async () => {
    const user = await reservationRepository.delete(new Event(), new User());

    expect(user).toBe(null);
  });

  it('should call the repo getter method', async () => {
    const repo = reservationRepository.repo;

    expect(JSON.stringify(repo)).toStrictEqual(
      JSON.stringify(connection.getRepository('')),
    );
  });
});
