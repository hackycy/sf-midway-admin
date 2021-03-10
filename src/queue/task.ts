import { BullQueue, IQueue } from '../decorator/bull';

@BullQueue('SysTask')
export class Task implements IQueue {
  handle(): any {
    return {
      msg: 'success',
    };
  }
}
