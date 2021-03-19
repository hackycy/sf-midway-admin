import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';

export class PageSearchDto {
  @Rule(RuleType.number().integer().min(0).default(10))
  @Expose()
  limit: number;

  @Rule(RuleType.number().integer().min(1).default(1))
  @Expose()
  page: number;
}
