/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  saveClassMetadata,
  attachClassMetadata,
  getClassMetadata,
} from '@midwayjs/core';
import { IMidwayWebApplication } from '@midwayjs/web';
import { Queue } from 'bull';

export const BULL_QUEUE_KEY = 'bull_queue_key';
export const BULL_KEY = 'bull:queue';

/**
 * @BullQueue注解注册队列，再使用的地方使用InjectBullQueue注入
 * @param queueName 队列标识符，请保证唯一
 * @returns ClassDecorator
 */
export function BullQueue(queueName: string): ClassDecorator {
  return function (target) {
    saveClassMetadata(
      BULL_QUEUE_KEY,
      {
        name: queueName,
      },
      target
    );
  };
}

export function InjectBullQueue(queueKey?: any) {
  return function (target, propertyKey: string) {
    attachClassMetadata(
      BULL_KEY,
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

interface StoreQueue {
  queue: Queue;
  name: string;
}

export class BullQueueManager {
  app: IMidwayWebApplication;

  constructor(app: IMidwayWebApplication) {
    this.app = app;
  }

  readonly queues: StoreQueue[] = [];

  getQuque(target: any): Queue {
    const metadata = getClassMetadata(BULL_QUEUE_KEY, target);
    if (!metadata) {
      throw Error('metadata is undefined');
    }
    const queue = this.queues.find(q => {
      return q.name === metadata.name;
    });
    if (queue) {
      return queue.queue;
    }
    const targetInstance = new target(this.app);
    const newQueue: Queue = targetInstance.handle();
    this.queues.push({ name: metadata.name, queue: newQueue });
    return newQueue;
  }
}

export interface IQueue {
  handle(): Queue;
}
