import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';

export class KickDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}
