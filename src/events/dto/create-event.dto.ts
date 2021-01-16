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
} from 'class-validator';
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @Length(4)
  readonly title: string;

  @IsString()
  @Length(4)
  readonly description: string;

  @IsString()
  @Length(2)
  readonly location: string;

  @IsLatitude()
  readonly lat: string;

  @IsLongitude()
  readonly lng: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsEnum(EventType)
  readonly type?: EventType;

  @IsDateString()
  readonly startDate: Date | string;

  @IsDateString()
  readonly endDate: Date | string;

  @IsArray()
  readonly categories: any[];
}
