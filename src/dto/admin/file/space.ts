import { Rule, RuleType } from '@midwayjs/decorator';
import { CustomHelpers, ErrorReport } from 'joi';
import { isEmpty } from 'lodash';

// cron validate
export const IsLegalDirExpression = (
  value: string,
  helpers: CustomHelpers
): string | ErrorReport => {
  try {
    if (isEmpty(value)) {
      throw new Error('dir name is empty');
    }
    if (value.startsWith('/')) {
      throw new Error('dir name not allow / start');
    }
    if (/([\\/])\1/.test(value)) {
      throw new Error('// this is not allow');
    }
    if (value.endsWith('/')) {
      throw new Error('dir name not allow / end');
    }
    return value;
  } catch (e) {
    return helpers.error('dir name invalid');
  }
};

export class GetFileListDto {
  @Rule(RuleType.string().allow('').required())
  marker: string;

  @Rule(RuleType.string().allow('').required())
  path: string;
}

export class MKDirDto {
  @Rule(
    RuleType.string()
      .custom(IsLegalDirExpression, '检测文件夹名称是否合法')
      .required()
  )
  dirName: string;
}

export class RenameDto {
  @Rule(
    RuleType.string()
      .pattern(/(^file$)|(^dir$)/)
      .required()
  )
  type: string;

  @Rule(RuleType.string().required())
  toName: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().allow('').required())
  path: string;
}
