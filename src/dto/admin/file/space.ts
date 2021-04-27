import { Rule, RuleType } from '@midwayjs/decorator';

export class GetFileListDto {
  @Rule(RuleType.string().allow('').required())
  marker: string;

  @Rule(RuleType.string().allow('').required())
  path: string;
}
