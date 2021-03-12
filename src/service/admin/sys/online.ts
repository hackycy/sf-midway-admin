import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../base';
import { UAParser } from 'ua-parser-js';
import { IOnlineInfoListResult } from '../interface';
import { Context } from 'egg';

@Provide()
export class AdminSysOnlineService extends BaseService {
  @Inject()
  ctx: Context;

  @Config('rootRoleId')
  rootRoleId: number;

  async list(): Promise<IOnlineInfoListResult[]> {
    const onlineUserIds: string[] = await this.getAdminRedis().keys(
      'admin:token:*'
    );
    const formatNumberIds: number[] = onlineUserIds.map(e => {
      const uid = e.split('admin:token:')[1];
      return parseInt(uid);
    });
    return await this.findLastLoginInfoList(formatNumberIds);
  }

  /**
   * 根据用户id列表查找最近登录信息和用户信息
   */
  async findLastLoginInfoList(ids: number[]): Promise<IOnlineInfoListResult[]> {
    const result = await this.getManager().query(
      `
    SELECT n.*, u.username
      FROM sys_login_log n
      INNER JOIN (
        SELECT user_id, MAX(createTime) AS createTime
        FROM sys_login_log GROUP BY user_id
      ) AS max USING (user_id, createTime)
      INNER JOIN sys_user u ON n.user_id = u.id
      WHERE n.user_id IN (?)
    `,
      [ids]
    );
    if (result) {
      const parser = new UAParser();
      return result.map(e => {
        const u = parser.setUA(e.ua).getResult();
        return {
          id: e.user_id,
          ip: e.ip,
          username: e.username,
          isCurrent: this.ctx.token.uid === e.user_id,
          time: e.createTime,
          status: 1,
          os: `${u.os.name} ${u.os.version}`,
          browser: `${u.browser.name} ${u.browser.version}`,
          disable:
            this.ctx.token.uid === e.user_id || e.user_id === this.rootRoleId,
        };
      });
    }
    return [];
  }
}
