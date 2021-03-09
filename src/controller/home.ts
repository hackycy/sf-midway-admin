import { Logger } from '@midwayjs/decorator';
import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  task;

  @Logger()
  logger: ILogger;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!' + this.task.msg;
  }
}
