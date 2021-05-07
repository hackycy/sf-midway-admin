import { Inject, Provide } from '@midwayjs/decorator';
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
export class QiniuTask implements IQueue {
  @Inject()
  adminFileSpaceService: AdminFileSpaceService;

  async excute(data: ExecArgs): Promise<void> {
    if (data.action === 'rename') {
      await this.adminFileSpaceService.renameDir(
        data.path,
        data.name,
        data.toName
      );
    } else if (data.action === 'delete') {
      //
    }
  }
  onEvent(): void | Promise<void> {
    // nothing to do
  }
}
