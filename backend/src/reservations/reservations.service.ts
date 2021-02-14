import { RESERVATION_REPOSITORY } from '@/common/common.constants';
import { EventsService } from '@/events/events.service';
import { User } from '@/users/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepository } from './repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    private readonly eventsService: EventsService,
  ) {}

  async create(eventId: number, user: User) {
    const event = await this.eventsService.findOne(eventId);
    await this.reservationRepository.create(event, user);

    return {
      ok: true,
    };
  }

  async remove(eventId: number, user: User) {
    const event = await this.eventsService.findOne(eventId);
    await this.reservationRepository.delete(event, user);

    return {
      ok: true,
    };
  }
}
