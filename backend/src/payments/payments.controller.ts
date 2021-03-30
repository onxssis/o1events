import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/jwt.guard';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/verify')
  async create(@Body() body: CreatePaymentDto) {
    return await this.paymentsService.create(body);
  }
}
