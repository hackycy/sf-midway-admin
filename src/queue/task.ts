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
    let id = -1;
    try {
      id = await taskLogService.record(data.id, 0);
      await taskService.callService(data.service, data.args);
      await taskLogService.updateTaskStatus(id, 1);
    } catch (e) {
      if (id !== -1) {
        await taskLogService.updateTaskStatus(id, 2, `${e.message}`);
      }
    }
  }

  onEvent(): void {}
}
