import { Provide } from '@midwayjs/decorator';
import {
  IMidwayWebNext,
  IWebMiddleware,
  MidwayWebMiddleware,
} from '@midwayjs/web';
import { Context } from 'egg';
import { AdminSysReqLogService } from '../service/admin/sys/req_log';

@Provide()
export class AdminReqLogMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const startTime = Date.now();
      await next();
      const reportTime = Date.now() - startTime;
      ctx.set('X-Response-Time', reportTime.toString());
      const { url } = ctx;
      if (url.startsWith('/admin/') && !url.startsWith('/admin/sys/log/')) {
        ctx.requestContext.getAsync(AdminSysReqLogService).then(service => {
          service.save(
            url.split('?')[0],
            ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body,
            ctx.status,
            reportTime,
            ctx.req.method,
            ctx.admin ? ctx.admin.uid : null
          );
        });
      }
    };
  }
}
