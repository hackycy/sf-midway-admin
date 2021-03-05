import { IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class KickDto {
  @IsInt()
  @Expose()
  id: number;
}
