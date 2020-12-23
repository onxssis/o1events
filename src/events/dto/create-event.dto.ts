import { Category } from '@/categories/entities/category.entity';
import {
  IsLatitude,
  IsLongitude,
  Length,
  IsOptional,
  IsString,
  IsNumber,
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

  @IsOptional()
  @IsLatitude()
  readonly lat?: string;

  @IsOptional()
  @IsLongitude()
  readonly lng?: string;

  @IsNumber({}, { each: true })
  readonly categories: any[];
}
