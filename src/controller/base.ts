import { Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Utils } from '../common/utils';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;
}
