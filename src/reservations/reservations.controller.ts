import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/guards/jwt.guard';
import { Auth } from '@/common/decorators/auth-user.decorator';
import { User } from '@/users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsService } from './reservations.service';
import { Response } from 'express';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Auth() user: User,
  ) {
    try {
      const response = await this.reservationService.create(
        createReservationDto.event,
        user,
      );

      return response;
    } catch (e) {
      throw new HttpException('An error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async destroy(
    @Body() createReservationDto: CreateReservationDto,
    @Auth() user: User,
  ) {
    try {
      const response = await this.reservationService.remove(
        createReservationDto.event,
        user,
      );

      return response;
    } catch (e) {
      throw new HttpException('An error occured', HttpStatus.BAD_REQUEST);
    }
  }
}
