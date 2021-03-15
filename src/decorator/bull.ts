/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  saveClassMetadata,
  saveModule,
  listModule,
  getClassMetadata,
  getProviderId,
} from '@midwayjs/core';
import { IMidwayContainer } from '@midwayjs/core';
import { IMidwayWebApplication } from '@midwayjs/web';
import { Queue } from 'bull';

export const BULL_KEY = 'bull:queue';
export const BULL_QUEUE_KEY = '_bull_queue_key_';

/**
 * @BullQueue注解注册队列，再使用的地方使用InjectBullQueue注入
 * @param queueName 队列标识符，请保证唯一
 * @returns ClassDecorator
 */
export function BullQueue(queueName: string): ClassDecorator {
  return function (target) {
    saveModule(BULL_KEY, target);
    saveClassMetadata(
      BULL_QUEUE_KEY,
      {
        name: queueName,
      },
      target
    );
  };
}

/**
 * init bull queue
 */
export async function initBull(
  app: IMidwayWebApplication,
  container: IMidwayContainer
): Promise<void> {
  const bulls = listModule(BULL_KEY);
  if (!bulls || bulls.length <= 0) {
    return;
  }
  for (let i = 0; i < bulls.length; i++) {
    const providerId = getProviderId(bulls[i]);
    const { name: queueName } = getClassMetadata(BULL_QUEUE_KEY, bulls[i]);
    let queueItem: Queue | undefined = undefined;
    if (container.registry.hasDefinition(providerId)) {
      const handleItem: IQueue = await container.getAsync(bulls[i]);
      queueItem = await handleItem.handle();
      container.registry.removeDefinition(providerId);
    } else {
      const handleItem: IQueue = new bulls[i](app);
      queueItem = await handleItem.handle();
    }
    container.registry.registerObject(queueName, queueItem);
  }
}

export interface IQueue {
  handle(): Promise<Queue>;
}
