import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { Utils } from '../../../common/utils';
import SysReqLog from '../../../entity/admin/sys/req_log';
import { BaseService } from '../../base';
import { Repository } from 'typeorm';
import { IPageSearchReqLogResult } from '../interface';

@Provide()
export class AdminSysReqLogService extends BaseService {
  @Inject()
  utils: Utils;

  @Inject()
  ctx: Context;

  @InjectEntityModel(SysReqLog)
  reqLog: Repository<SysReqLog>;

  /**
   * 记录日志
   */
  async save(
    url: string,
    params: string,
    status: number,
    consumeTime: number,
    method: string | undefined,
    userId: number | null
  ): Promise<void> {
    const ip = this.utils.getReqIP(this.ctx);
    await this.reqLog.insert({
      action: url,
      params: JSON.stringify(params),
      userId: userId === null ? undefined : userId,
      ip,
      method: method ? method.toUpperCase() : undefined,
      status,
      consumeTime,
    });
  }

  /**
   * 计算日志总数
   */
  async count(): Promise<number> {
    return await this.reqLog.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number): Promise<SysReqLog[]> {
    const result = await this.reqLog.find({
      order: {
        id: 'DESC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * 分页查询
   */
  async search(
    page: number,
    count: number,
    q: string
  ): Promise<IPageSearchReqLogResult> {
    const allResult = await this.reqLog
      .createQueryBuilder('req_log')
      .where(`req_log.userId LIKE '%${q}%'`)
      .orWhere(`req_log.ip LIKE '%${q}%'`)
      .orWhere(`req_log.action LIKE '%${q}%'`)
      .orWhere(`req_log.params LIKE '%${q}%'`)
      .getMany();
    const result = await this.reqLog
      .createQueryBuilder('req_log')
      .where(`req_log.userId LIKE '%${q}%'`)
      .orWhere(`req_log.ip LIKE '%${q}%'`)
      .orWhere(`req_log.action LIKE '%${q}%'`)
      .orWhere(`req_log.params LIKE '%${q}%'`)
      .skip(page * count)
      .take(count)
      .getMany();
    return {
      count: allResult.length,
      logs: result,
    };
  }

  /**
   * 清空表中的所有数据
   */
  async clear(): Promise<void> {
    await this.reqLog.clear();
  }
}
