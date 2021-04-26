import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';
import * as bull from 'midway-bull';
import * as cache from '@midwayjs/cache';
import { IMidwayWebApplication } from '@midwayjs/web';
import { AdminSysTaskService } from './service/admin/sys/task';
import * as moment from 'moment';
import axios from 'axios';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
    bull, // 加载 bull 组件
    cache, // 加载 cache 组件
    {
      component: swagger, // 加载 swagger 组件
      enabledEnvironment: ['local'],
    },
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: IMidwayWebApplication;

  async onReady(container: IMidwayContainer): Promise<void> {
    // register
    this.app.getApplicationContext().registerObject('httpclient', axios);

    // 初始化系统任务
    const taskService = await container.getAsync(AdminSysTaskService);
    await taskService.initTask();

    // Date time
    Date.prototype.toJSON = function () {
      return moment(this).format('YYYY-MM-DD HH:mm:ss');
    };
  }
}
