import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';

export class PageSearchDto {
  @Rule(RuleType.number().integer().min(0))
  @Expose()
  limit: number;

  @Rule(RuleType.number().integer().min(1))
  @Expose()
  page: number;
}
