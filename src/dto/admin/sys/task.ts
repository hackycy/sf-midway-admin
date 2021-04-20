import { Expose } from 'class-transformer';
import * as parser from 'cron-parser';
import { CustomHelpers, ErrorReport } from 'joi';
import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { isEmpty } from 'lodash';

// cron validate
export const IsCronExpression = (
  value: string,
  helpers: CustomHelpers
): string | ErrorReport => {
  try {
    if (isEmpty(value)) {
      throw new Error('cron expression is empty');
    }
    parser.parseExpression(value);
    return value;
  } catch (e) {
    return helpers.error('cron expression invalid');
  }
};

export class CreateTaskDto {
  @CreateApiPropertyDoc('任务名称')
  @Rule(RuleType.string().min(2).max(50).required())
  @Expose()
  name: string;

  @CreateApiPropertyDoc('调用的服务')
  @Rule(RuleType.string().required())
  @Expose()
  service: string;

  @CreateApiPropertyDoc('任务类别：cron | interval')
  @Rule(RuleType.number().integer().valid(0, 1).required())
  @Expose()
  type: number;

  @CreateApiPropertyDoc('任务状态')
  @Rule(RuleType.number().integer().valid(0, 1).required())
  @Expose()
  status: number;

  @Rule(RuleType.date().empty('').optional())
  @Expose()
  startTime: Date;

  @Rule(RuleType.date().empty('').optional())
  @Expose()
  endTime: Date;

  @CreateApiPropertyDoc('限制执行次数，负数则无限制')
  @Rule(RuleType.number().integer().optional())
  @Expose()
  limit: number;

  @CreateApiPropertyDoc('cron表达式')
  @Rule(
    RuleType.string().when('type', {
      is: 0,
      then: RuleType.custom(IsCronExpression, 'cron expression validate'),
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  cron: string;

  @CreateApiPropertyDoc('执行间隔，毫秒单位')
  @Rule(
    RuleType.number().integer().when('type', {
      is: 1,
      then: RuleType.required(),
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  every: number;

  @CreateApiPropertyDoc('执行参数')
  @Rule(RuleType.string().empty('').allow(null).optional())
  @Expose()
  data: string;

  @CreateApiPropertyDoc('任务备注')
  @Rule(RuleType.string().empty('').allow(null).optional())
  @Expose()
  remark: string;
}

@Rule(CreateTaskDto)
export class UpdateTaskDto extends CreateTaskDto {
  @CreateApiPropertyDoc('需要更新的任务ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}

export class CheckIdTaskDto {
  @CreateApiPropertyDoc('任务ID')
  @Rule(RuleType.number().min(0).integer().required())
  @Expose()
  id: number;
}
