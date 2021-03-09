import { saveModule } from '@midwayjs/core';
import * as Queue from 'bull';

export const BULL_QUEUE_KEY = 'bull_queue_key';
export const BULL_KEY = 'bull:queue';

export function BullQueue(): ClassDecorator {
  return function (target) {
    if (typeof target === 'function') {
      saveModule(BULL_QUEUE_KEY, target);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-types
      saveModule(BULL_QUEUE_KEY, (target as object).constructor);
    }
  };
}

export interface IQueue {
  handle(): Queue;
}
