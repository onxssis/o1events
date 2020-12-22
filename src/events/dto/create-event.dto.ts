import {
  IsLatitude,
  IsLongitude,
  Length,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(1)
  readonly title: string;

  @IsString()
  @Length(1)
  readonly description: string;

  @IsString()
  @Length(1)
  readonly location: string;

  @IsOptional()
  @IsLatitude()
  readonly lat?: string;

  @IsOptional()
  @IsLongitude()
  readonly lng?: string;
}
