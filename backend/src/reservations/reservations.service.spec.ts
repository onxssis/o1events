import {
  RESERVATION_REPOSITORY,
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
} from '@/common/common.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ReservationsService } from './reservations.service';
import { factory } from '@/factory';
import { User } from '@/users/entities/user.entity';
import { EventsModule } from '@/events/events.module';
import { EventsService } from '@/events/events.service';
import { CategoriesService } from '@/categories/categories.service';

const mockReservationRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
});

const mockEventRepository = () => ({
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ReservationsService', () => {
  let service: ReservationsService;
  let reservationRepository: MockRepository;

  const createReservationArgs = {
    event: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: RESERVATION_REPOSITORY,
          useValue: mockReservationRepository(),
        },
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {},
        },
        {
          provide: EVENT_REPOSITORY,
          useValue: mockEventRepository(),
        },
        EventsService,
        CategoriesService,
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    reservationRepository = module.get(RESERVATION_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(reservationRepository).toBeDefined();
  });

  it('should call the create method of the reservation repository', async () => {
    reservationRepository.create.mockReturnValue({});
    const user = new User();

    const reservation = await service.create(createReservationArgs.event, user);

    expect(reservationRepository.create).toHaveBeenCalledTimes(1);
    expect(reservation).toEqual(expect.objectContaining({}));
  });

  it('should call the delete method of the reservation repository', async () => {
    reservationRepository.delete.mockReturnValue(null);
    const user = new User();

    const reservation = await service.remove(createReservationArgs.event, user);

    expect(reservationRepository.delete).toHaveBeenCalledTimes(1);
    expect(reservation).toStrictEqual({ ok: true });
  });
});
