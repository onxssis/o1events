import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsPositive()
  limit: number;
}

export class PaginatedResultDto<T = any> {
  data: T[];
  page: number;
  perPage: number;
  totalCount: number;
  hasMorePages: boolean;
}
