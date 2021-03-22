import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { Expose } from 'class-transformer';
import { PageSearchDto } from '../../comm';

@Rule(PageSearchDto)
export class SearchReqLogDto extends PageSearchDto {
  @CreateApiPropertyDoc('查询关键字')
  @Rule(RuleType.string().required())
  @Expose()
  q: string;
}
