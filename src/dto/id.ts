import { Expose, Transform } from 'class-transformer';
import { IsNumberString, IsInt } from 'class-validator';

export class Id {
  @IsNumberString()
  @Expose()
  sid: string;

  @IsInt()
  @Transform(
    value => {
      return parseInt(value);
    },
    { toClassOnly: true }
  )
  @Expose()
  id: number;
}
