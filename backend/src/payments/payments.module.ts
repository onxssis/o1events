import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaystackModule } from 'nestjs-paystack';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { EventsModule } from '@/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    EventsModule,
    PaystackModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('PAYSTACK_SECRET_KEY'),
      }),
    }),
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
