import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { PageGetDto } from '../../comm';

export class SearchLogDto extends PageGetDto {
  @IsString()
  @Expose()
  q: string;
}
