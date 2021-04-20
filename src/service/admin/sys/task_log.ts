import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import SysTaskLog from '../../../entity/admin/sys/task_log';
import { BaseService } from '../../base';
import { Repository } from 'typeorm';
import { IPageTaskLogResult } from '../interface';

@Provide()
export class AdminSysTaskLogService extends BaseService {
  @InjectEntityModel(SysTaskLog)
  taskLog: Repository<SysTaskLog>;

  /**
   * 记录任务日志
   */
  async record(
    tid: number,
    status: number,
    time?: number,
    err?: string
  ): Promise<number> {
    const result = await this.taskLog.save({
      taskId: tid,
      status,
      detail: err,
    });
    return result.id;
  }

  /**
   * 计算日志总数
   */
  async count(): Promise<number> {
    return await this.taskLog.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number): Promise<IPageTaskLogResult[]> {
    // const result = await this.getRepo().admin.sys.TaskLog.find({
    //   order: {
    //     id: 'DESC',
    //   },
    //   take: count,
    //   skip: page * count,
    // });
    // return result;
    const result = await this.taskLog
      .createQueryBuilder('task_log')
      .leftJoinAndSelect('sys_task', 'task', 'task_log.task_id = task.id')
      .orderBy('task_log.id', 'DESC')
      .offset(page * count)
      .limit(count)
      .getRawMany();
    return result.map(e => {
      return {
        id: e.task_log_id,
        taskId: e.task_id,
        name: e.task_name,
        createTime: e.task_log_createTime,
        consumeTime: e.task_log_consume_time,
        detail: e.task_log_detail,
        status: e.task_log_status,
      };
    });
  }

  /**
   * 清空表中的所有数据
   */
  async clear(): Promise<void> {
    await this.taskLog.clear();
  }
}
