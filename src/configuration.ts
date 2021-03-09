import {
  App,
  Configuration,
  listModule,
  getProviderId,
} from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';
import { BULL_QUEUE_KEY, IQueue } from './decorator/bull';

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

  async onReady(container: IMidwayContainer) {
    const queues = listModule(BULL_QUEUE_KEY) || [];
    for (let i = 0; i < queues.length; i++) {
      const constructorFn = queues[i];
      const c: IQueue = new constructorFn();
      const bullInstance = c.handle();
      const providerId = getProviderId(queues[i]);
      container.registerObject(providerId, bullInstance);
    }
  }
}
