import { Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Utils } from '../common/utils';

export const ADMIN_PREFIX_URL = '/admin';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;
}
