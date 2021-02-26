import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';

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

  async onReady(): Promise<void> {}
}
