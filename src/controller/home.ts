import { Logger } from '@midwayjs/decorator';
import { Controller, Get, Provide } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { InjectBullQueue } from '../decorator/bull';
import { Task } from '../queue/task';

@Provide()
@Controller('/')
export class HomeController {
  @InjectBullQueue(Task)
  task;

  @Logger()
  logger: ILogger;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!' + this.task.msg;
  }
}
