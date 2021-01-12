import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

export class PaginatedResultDto<T = any> {
  data: T[];
  page: number;
  perPage: number;
  totalCount: number;
  hasMorePages: boolean;
}
