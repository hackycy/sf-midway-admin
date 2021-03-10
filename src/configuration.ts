import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';
import { BULL_KEY, BullQueueManager } from './decorator/bull';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
    {
      component: swagger, // 加载 swagger 组件
      enabledEnvironment: ['local'],
    },
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  // bull manager
  private bullQueueManager: BullQueueManager;

  async onReady(container: IMidwayContainer) {
    // init bull
    this.bullQueueManager = new BullQueueManager();
    container.registerDataHandler(BULL_KEY, (key: { queueKey }) => {
      const queue = this.bullQueueManager.getQuque(key.queueKey);
      return queue;
    });
  }
}
