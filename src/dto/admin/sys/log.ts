import { Rule, RuleType } from '@midwayjs/decorator';
import { Expose } from 'class-transformer';
import { PageSearchDto } from '../../comm';

@Rule(PageSearchDto)
export class SearchLogDto extends PageSearchDto {
  @Rule(RuleType.string().required())
  @Expose()
  q: string;
}
