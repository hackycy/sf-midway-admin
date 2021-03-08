import {
  saveModule,
  attachClassMetadata,
  saveClassMetadata,
} from '@midwayjs/core';
import { QueueOptions } from 'bull';
import * as Queue from 'bull';

export const BULL_QUEUE_KEY = 'bull_queue_key';

export function InjectBullQueue(queueKey?: any) {
  return (target, propertyKey: string) => {
    attachClassMetadata(
      BULL_QUEUE_KEY,
      {
        key: {
          queueKey,
        },
        propertyName: propertyKey,
      },
      target
    );
  };
}

export function BullQueue(options?: QueueOptions): ClassDecorator {
  return function (target) {
    if (typeof target === 'function') {
      saveModule(BULL_QUEUE_KEY, target);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-types
      saveModule(BULL_QUEUE_KEY, (target as object).constructor);
    }
    // 保存一些元数据信息
    saveClassMetadata(BULL_QUEUE_KEY, { options }, target);
  };
}

export interface IQueue {
  handle(): Queue;
}
