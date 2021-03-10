import { App } from '@midwayjs/decorator';
import { IMidwayWebApplication } from '@midwayjs/web';
import { BullQueue, IQueue } from '../decorator/bull';

@BullQueue('SysTask')
export class Task implements IQueue {
  @App()
  app: IMidwayWebApplication;

  handle(): any {
    console.log(this.app);
    return {
      msg: 'success',
    };
  }
}
