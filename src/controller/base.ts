import { Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Utils } from '../common/utils';

export const ADMIN_PREFIX_URL = '/admin';

// 无需权限URL前缀
export const NOPERM_PREFIX_URL = '/common';
// 无需校验TOKEN的URL
export const NOAUTH_PREFIX_URL = '/public';

export class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;
}
