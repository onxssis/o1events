import { IsOptional } from 'class-validator';
import { FilterQueryDto } from './filter.dto';

export class PaginationQueryDto extends FilterQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

export class PaginatedResultDto<T = any> {
  data: T[];
  page: number;
  lastPage: number;
  perPage: number;
  totalCount: number;
  hasMorePages: boolean;
}
