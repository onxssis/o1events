import { IsOptional } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  q?: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  dateRange?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  category?: string;
}
