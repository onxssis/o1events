import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@/categories/categories.service';
import {
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
  RESERVATION_REPOSITORY,
} from '@/common/common.constants';
import { EventsService } from '@/events/events.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { User } from '@/users/entities/user.entity';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let reservationService: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        ReservationsService,
        {
          provide: RESERVATION_REPOSITORY,
          useValue: {},
        },
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {},
        },
        {
          provide: EVENT_REPOSITORY,
          useValue: {},
        },
        EventsService,
        CategoriesService,
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    reservationService = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(reservationService).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const result = { ok: true };
      jest.spyOn(reservationService, 'create').mockResolvedValue(result);

      expect(await controller.create({ event: 1 }, new User())).toBe(result);
    });

    it('should catch error while creating a reservation', () => {
      jest
        .spyOn(reservationService, 'create')
        .mockRejectedValue(new Error('error occured'));

      expect(
        async () => await controller.create({ event: 1 }, new User()),
      ).rejects.toThrowError('error occured');
    });
  });

  describe('destroy', () => {
    it('should remove a reservation', async () => {
      const result = { ok: true };
      jest.spyOn(reservationService, 'remove').mockResolvedValue(result);

      expect(await controller.destroy({ event: 1 }, new User())).toBe(result);
    });

    it('should catch error while removing a reservation', () => {
      jest
        .spyOn(reservationService, 'remove')
        .mockRejectedValue(new Error('error occured'));

      expect(
        async () => await controller.destroy({ event: 1 }, new User()),
      ).rejects.toThrowError('error occured');
    });
  });
});
