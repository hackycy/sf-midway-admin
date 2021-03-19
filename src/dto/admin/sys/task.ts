import { Expose } from 'class-transformer';
import * as parser from 'cron-parser';
import { CustomHelpers } from 'joi';
import { Rule, RuleType } from '@midwayjs/decorator';

// cron validate
export const IsCronExpression = (
  value: string,
  helpers: CustomHelpers
): any => {
  try {
    parser.parseExpression(value);
    return value;
  } catch (e) {
    return helpers.error('cron expression invalid');
  }
};

export class CreateTaskDto {
  @Rule(RuleType.string().min(2).max(50).required())
  @Expose()
  name: string;

  @Rule(RuleType.string().required())
  @Expose()
  service: string;

  @Rule(RuleType.number().integer().valid(0, 1).required())
  @Expose()
  type: number;

  @Rule(RuleType.number().integer().valid(0, 1, 2).required())
  @Expose()
  status: number;

  @Rule(RuleType.date().optional())
  @Expose()
  startTime: Date;

  @Rule(RuleType.date().optional())
  @Expose()
  endTime: Date;

  @Rule(RuleType.number().integer().optional())
  @Expose()
  limit: number;

  @Rule(
    RuleType.string().custom(IsCronExpression).when('type', {
      is: 0,
      then: RuleType.required(),
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  cron: string;

  @Rule(
    RuleType.number().integer().when('type', {
      is: 1,
      then: RuleType.required(),
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  every: number;

  @Rule(RuleType.string())
  @Expose()
  data: string;

  @Rule(RuleType.string())
  @Expose()
  remark: string;
}

@Rule(CreateTaskDto)
export class UpdateTaskDto extends CreateTaskDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}

export class CheckIdTaskDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}
