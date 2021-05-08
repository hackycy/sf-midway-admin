import { App, Provide } from '@midwayjs/decorator';
import { IMidwayWebApplication } from '@midwayjs/web';
import { IQueue, Queue } from 'midway-bull';
import { AdminFileSpaceService } from '../service/admin/file/space';

type action = 'delete' | 'rename';

export interface ExecArgs {
  action: action;
  path?: string;
  name?: string;
  toName?: string;
}

@Queue('default')
@Provide()
export class QiniuTaskQueue implements IQueue {
  @App()
  app: IMidwayWebApplication;

  async excute(data: ExecArgs): Promise<void> {
    const container = this.app.getApplicationContext();
    const adminFileSpaceService = await container.getAsync(
      AdminFileSpaceService
    );
    if (data.action === 'rename') {
      await adminFileSpaceService.renameDir(data.path, data.name, data.toName);
    } else if (data.action === 'delete') {
      await adminFileSpaceService.deleteDir(data.path, data.name);
    }
  }
  onEvent(): void | Promise<void> {
    // nothing to do
  }
}
