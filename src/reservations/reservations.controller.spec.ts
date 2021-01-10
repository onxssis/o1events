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

describe('ReservationsController', () => {
  let controller: ReservationsController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
