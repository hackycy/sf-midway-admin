import { IMidwayWebApplication } from '@midwayjs/web';
import { AdminSysTaskLogService } from '../service/admin/sys/task_log';
import { AdminSysTaskService } from '../service/admin/sys/task';
import { IQueue, Queue } from 'midway-bull';
import { App, Provide } from '@midwayjs/decorator';
import { ExecuteData } from '../interface';

@Queue('SysTask')
@Provide()
export class SysTaskQueue implements IQueue {
  @App()
  app: IMidwayWebApplication;

  async excute(data: ExecuteData): Promise<void> {
    const container = this.app.getApplicationContext();
    const taskLogService = await container.getAsync(AdminSysTaskLogService);
    const taskService = await container.getAsync(AdminSysTaskService);
    try {
      const startTime = Date.now();
      await taskService.callService(data.service, data.args);
      const timing = Date.now() - startTime;
      // 任务执行成功
      await taskLogService.record(data.id, 1, timing);
    } catch (e) {
      // 执行失败
      await taskLogService.record(data.id, 0);
    }
  }

  onEvent(): void {}
}
