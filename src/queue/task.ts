import { BullQueue, IQueue } from '../decorator/bull';
import { Queue } from 'bull';
import * as Bull from 'bull';
import { IMidwayWebApplication } from '@midwayjs/web';
import { AdminSysTaskLogService } from '../service/admin/sys/task_log';
import { AdminSysTaskService } from '../service/admin/sys/task';

@BullQueue('SysTaskQueue')
export class SysTaskQueue implements IQueue {
  app: IMidwayWebApplication;

  constructor(app: IMidwayWebApplication) {
    this.app = app;
  }

  async handle(): Promise<Queue> {
    const bullConfig = this.app.getConfig('bull');
    const tq = new Bull('sys-task', bullConfig);
    tq.process(
      async (job): Promise<void> => {
        const container = this.app.getApplicationContext();
        const taskLogService = await container.getAsync(AdminSysTaskLogService);
        const taskService = await container.getAsync(AdminSysTaskService);
        let id = -1;
        try {
          id = await taskLogService.record(job.data.id, 0);
          await taskService.callService(job.data.service, job.data.args);
          await taskLogService.updateTaskStatus(id, 1);
        } catch (e) {
          if (id !== -1) {
            await taskLogService.updateTaskStatus(id, 2, `${e.message}`);
          }
        }
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tq.on('completed', async (job, _result) => {
      const container = this.app.getApplicationContext();
      const taskService = await container.getAsync(AdminSysTaskService);
      taskService.updateTaskCompleteStatus(job.data.id);
    });
    return tq;
  }
}
