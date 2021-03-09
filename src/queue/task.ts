import { BullQueue, IQueue } from '../decorator/bull';

@BullQueue()
export class Task implements IQueue {
  handle() {
    return {
      msg: 'success',
    };
  }
}
