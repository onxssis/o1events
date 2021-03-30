import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { EventsService } from '@/events/events.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import {
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
} from '@/common/common.constants';
import { CategoriesService } from '@/categories/categories.service';

const mockPaymentRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
});

const mockPaystackClient = () => ({
  transaction: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        EventsService,
        CategoriesService,
        {
          provide: getRepositoryToken(Payment),
          useFactory: mockPaymentRepository,
        },
        {
          provide: 'PaystackToken',
          useFactory: mockPaystackClient,
        },
        {
          provide: EVENT_REPOSITORY,
          useValue: {},
        },
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
