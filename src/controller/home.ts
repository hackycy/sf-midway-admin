import { Inject, Logger } from '@midwayjs/decorator';
import { Controller, Get, Provide } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/')
export class HomeController {
  @Logger()
  logger: ILogger;

  @Inject('SysTaskQueue')
  task: any;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!' + this.task.name;
  }
}
