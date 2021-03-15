import { Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Utils } from '../common/utils';
import { ResOp } from '../interface';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;

  /**
   * 返回数据
   * @param op 返回配置，返回失败需要单独配置
   */
  protected res(op?: ResOp): ResOp {
    return {
      data: op?.data ?? null,
      code: op?.code ?? 200,
      message: op?.code
        ? this.utils.getErrorMessageByCode(op!.code) ||
          op?.message ||
          'unknown error'
        : op?.message || 'success',
    };
  }
}
