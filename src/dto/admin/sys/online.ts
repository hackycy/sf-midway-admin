import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class KickDto {
  @CreateApiPropertyDoc('需要下线的角色ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}
