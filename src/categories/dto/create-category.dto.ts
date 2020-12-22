import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
