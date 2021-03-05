import { IsInt, IsOptional, Min } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class PagePostDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Expose()
  page: number;
}

/**
 * 由于query获取的参数只能为string，所以要区分开
 */
export class PageGetDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(v => parseInt(v), { toClassOnly: true })
  @Expose()
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(v => parseInt(v), { toClassOnly: true })
  @Expose()
  page: number;
}
