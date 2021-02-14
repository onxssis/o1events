import { IsNumber, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsPositive()
  readonly event: number;
}
