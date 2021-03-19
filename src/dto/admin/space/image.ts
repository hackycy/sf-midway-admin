import { Expose } from 'class-transformer';
import { PageSearchDto } from '../../comm';
import { Rule, RuleType } from '@midwayjs/decorator';

export class DeleteTypeDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  typeId: number;
}

export class CreateTypeDto {
  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;
}

export class QueryImageDto extends PageSearchDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  typeId: number;
}

export class DeleteImageDto {
  @Rule(RuleType.array().items(RuleType.number()).min(1).required())
  @Expose()
  imageIds: number[];
}

export class UploadImageDto {
  @Rule(RuleType.string().required())
  @Expose()
  typeId: string;
}
