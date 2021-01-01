import { Category } from '@/categories/entities/category.entity';
import {
  IsLatitude,
  IsLongitude,
  Length,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

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

  @IsDateString()
  readonly startDate: Date | string;

  @IsDateString()
  readonly endDate: Date | string;

  @IsNumber({}, { each: true })
  readonly categories: any[];
}
