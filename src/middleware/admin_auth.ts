import { Provide } from '@midwayjs/decorator';
import {
  IMidwayWebNext,
  IWebMiddleware,
  MidwayWebMiddleware,
} from '@midwayjs/web';
import { Context } from 'egg';
import { isEmpty } from 'lodash';
import { res, Utils } from '../common/utils';
import { ResOp } from '../interface';
import { AdminVerifyService } from '../service/admin/comm/verify';
import {
  ADMIN_PREFIX_URL,
  NOPERM_PREFIX_URL,
  NOAUTH_PREFIX_URL,
} from '../controller/base';

@Provide()
export class AdminAuthMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const url = ctx.url;
      const path = url.split('?')[0];
      const token = ctx.get('Authorization');
      if (url.startsWith(`${ADMIN_PREFIX_URL}/`)) {
        if (url.startsWith(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}/`)) {
          await next();
          return;
        }
        if (isEmpty(token)) {
          // 无法通过token校验
          this.reject(ctx, { code: 11001 });
          return;
        }
        const utils = await ctx.requestContext.getAsync(Utils);
        try {
          // 挂载对象到当前请求上
          ctx.admin = utils.jwtVerify(token);
        } catch (e) {
          // 无法通过token校验
          this.reject(ctx, { code: 11001 });
          return;
        }
        if (!ctx.admin) {
          this.reject(ctx, { code: 11001 });
          return;
        }
        // token校验通过，则校验权限
        if (url.startsWith(`${ADMIN_PREFIX_URL}${NOPERM_PREFIX_URL}/`)) {
          // 无需权限，则pass
          await next();
          return;
        }
        const verifyService = await ctx.requestContext.getAsync(
          AdminVerifyService
        );
        const pv = await verifyService.getRedisPasswordVersionById(
          ctx.admin.uid
        );
        if (pv !== `${ctx.admin.pv}`) {
          // 密码版本不一致，登录期间已更改过密码
          this.reject(ctx, { code: 11002 });
          return;
        }
        const redisToken = await verifyService.getRedisTokenById(ctx.admin.uid);
        if (token !== redisToken) {
          // 与redis保存不一致
          this.reject(ctx, { code: 11002 });
          return;
        }
        const perms: string = await verifyService.getRedisPermsById(
          ctx.admin.uid
        );
        // 安全判空
        if (isEmpty(perms)) {
          this.reject(ctx, { code: 11001 });
          return;
        }
        // 将sys:admin:user等转换成sys/admin/user
        const permArray: string[] = (JSON.parse(perms) as string[]).map(e => {
          return e.replace(/:/g, '/');
        });
        // 遍历权限是否包含该url，不包含则无访问权限
        if (!permArray.includes(path.replace('/admin/', ''))) {
          this.reject(ctx, { code: 11003 });
          return;
        }
      }
      // pass
      await next();
    };
  }

  reject(ctx: Context, op: ResOp): void {
    ctx.status = 200;
    ctx.body = res(op);
  }
}
