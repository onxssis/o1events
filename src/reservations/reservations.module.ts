import { CategoriesModule } from '@/categories/categories.module';
import { RESERVATION_REPOSITORY } from '@/common/common.constants';
import { EventsModule } from '@/events/events.module';
import { Module } from '@nestjs/common';
import { ReservationRepository } from './repositories/typeorm/reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

const repoServiceProvider = [
  {
    provide: RESERVATION_REPOSITORY,
    useClass: ReservationRepository,
  },
];

@Module({
  imports: [EventsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ...repoServiceProvider],
})
export class ReservationsModule {}
