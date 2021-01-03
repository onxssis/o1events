import { IsOptional } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  q: string;
}
