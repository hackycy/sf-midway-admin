import { BullQueue, IQueue } from '../decorator/bull';

@BullQueue('SysTaskQueue')
export class SysTaskQueue implements IQueue {
  handle(): any {
    return {
      msg: 'success',
    };
  }
}
