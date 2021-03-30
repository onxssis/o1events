import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPaystack } from 'nestjs-paystack';
import Paystack from 'paystack';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { EventsService } from '@/events/events.service';
import { auth } from '@/common/helpers';
import { PaymentVerificationFailedException } from './exceptions/verification-failed.exception';

@Injectable()
export class PaymentsService {
  public constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectPaystack() private readonly paystackClient: Paystack.Object,
    private readonly eventsService: EventsService,
  ) {}

  async create(paymentInfo: CreatePaymentDto) {
    try {
      const response = await this.paystackClient.transaction.verify(
        paymentInfo.transactionRef,
      );

      const { metadata, amount, gateway_response, status } = response.data;

      if (status === 'success') {
        const event = await this.eventsService.findOne(metadata.event);

        if (amount !== event.price * 100) {
          throw new PaymentVerificationFailedException({
            message: 'Invalid amount paid',
            transactionDetails: {
              ...response.data,
              status: 'failed',
              paidAt: null,
            },
          });
        }

        this.createPaymentRecord(response.data);

        return {
          ok: true,
          message: gateway_response,
        };
      } else if (status === 'failed') {
        throw new PaymentVerificationFailedException({
          message: response.data.gateway_response,
          transactionDetails: response.data,
        });
      }
    } catch (e) {
      if (e instanceof PaymentVerificationFailedException) {
        this.createPaymentRecord(e.transactionDetails);
      }

      throw e;
    }
  }

  protected async createPaymentRecord({
    reference,
    authorization,
    customer,
    paidAt = null,
    status,
    metadata,
  }: any) {
    const record = {
      transactionRef: reference,
      authCode: authorization.authorization_code,
      customerCode: customer.customer_code,
      customerEmail: customer.email,
      paidAt,
      failedAt: status === 'failed' ? new Date().toISOString() : null,
      eventId: metadata.event,
      userId: auth().id,
    };

    const payment = this.paymentRepo.create(record);
    return this.paymentRepo.save(payment);
  }
}
