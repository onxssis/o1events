import {
  IsLatitude,
  IsLongitude,
  Length,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @Length(4)
  readonly title: string;

  @IsString()
  @Length(4)
  readonly description: string;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @IsNotEmpty({ message: 'location should not be empty' })
  readonly address?: string;

  @IsOptional()
  @IsLatitude()
  readonly lat?: string;

  @IsOptional()
  @IsLongitude()
  readonly lng?: string;

  @IsOptional()
  @IsUrl()
  readonly link?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsEnum(EventType, { message: 'type must be online or in person' })
  readonly type?: EventType;

  @IsDateString({ message: 'start date must be a valid date' })
  readonly startDate: Date | string;

  @IsDateString({ message: 'end date must be a valid date' })
  readonly endDate: Date | string;

  @IsArray()
  readonly categories: any[];
}
