import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class PageSearchDto {
  @CreateApiPropertyDoc('分页查询每页数量', { example: 10 })
  @Rule(RuleType.number().integer().min(0).default(10))
  @Expose()
  limit: number;

  @CreateApiPropertyDoc('分页查询当前页数', { example: 1 })
  @Rule(RuleType.number().integer().min(1).default(1))
  @Expose()
  page: number;
}
