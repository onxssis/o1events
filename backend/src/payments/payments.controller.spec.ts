import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CATEGORY_REPOSITORY,
  EVENT_REPOSITORY,
} from '@/common/common.constants';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { EventsService } from '@/events/events.service';
import { CategoriesService } from '@/categories/categories.service';
import { PaymentVerificationFailedException } from './exceptions/verification-failed.exception';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PaymentsService,
        EventsService,
        CategoriesService,
        {
          provide: getRepositoryToken(Payment),
          useValue: {},
        },
        {
          provide: 'PaystackToken',
          useValue: {},
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

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(paymentsService).toBeDefined();
  });

  describe('create', () => {
    it('should verify and create a payment entry', async () => {
      const result = { ok: true, message: 'Success' };
      jest.spyOn(paymentsService, 'create').mockResolvedValue(result);

      expect(await controller.create({ transactionRef: '378dsdas3fm' })).toBe(
        result,
      );
    });

    it('should catch error while verifying a payment', () => {
      jest
        .spyOn(paymentsService, 'create')
        .mockRejectedValue(
          new PaymentVerificationFailedException({ transactionDetails: {} }),
        );

      expect(
        async () => await controller.create({ transactionRef: '378dsdas3fm' }),
      ).rejects.toThrowError('Payment Verification Failed');
    });
  });
});
