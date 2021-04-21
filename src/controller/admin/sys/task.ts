import {
  Get,
  Inject,
  Provide,
  Query,
  ALL,
  Post,
  Body,
  Validate,
  Controller,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { isEmpty } from 'lodash';
import { res, resByPage } from '../../../common/utils';
import {
  CheckIdTaskDto,
  CreateTaskDto,
  UpdateTaskDto,
} from '../../../dto/admin/sys/task';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysTaskService } from '../../../service/admin/sys/task';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import {
  GetTaskInfoExample,
  GetTaskListByPageExample,
  NormalExample,
} from '../../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/sys/task`, {
  tagName: 'AdminSysTask',
  description: '后台系统定时任务控制器',
})
export class AdminSysTaskController extends BaseController {
  @Inject()
  adminSysTaskService: AdminSysTaskService;

  @(CreateApiDoc()
    .summary('获取任务列表')
    .respond(200, '', 'json', { example: GetTaskListByPageExample })
    .build())
  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysTaskService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysTaskService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('添加任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/add')
  @Validate()
  async add(@Body(ALL) dto: CreateTaskDto): Promise<ResOp> {
    await this.adminSysTaskService.addOrUpdate(dto);
    return res();
  }

  @(CreateApiDoc()
    .summary('更新任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/update')
  @Validate()
  async update(@Body(ALL) dto: UpdateTaskDto): Promise<ResOp> {
    await this.adminSysTaskService.addOrUpdate(dto);
    return res();
  }

  @(CreateApiDoc()
    .summary('根据任务ID查询')
    .respond(200, '', 'json', { example: GetTaskInfoExample })
    .build())
  @Get('/info')
  @Validate()
  async info(@Query(ALL) dto: CheckIdTaskDto): Promise<ResOp> {
    return res({
      data: await this.adminSysTaskService.info(dto.id),
    });
  }

  @(CreateApiDoc()
    .summary('手动执行一次任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/once')
  @Validate()
  async once(@Body(ALL) dto: CheckIdTaskDto): Promise<ResOp> {
    const task = await this.adminSysTaskService.info(dto.id);
    if (!isEmpty(task)) {
      await this.adminSysTaskService.once(task);
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('停止任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/stop')
  @Validate()
  async stop(@Body(ALL) dto: CheckIdTaskDto): Promise<ResOp> {
    const task = await this.adminSysTaskService.info(dto.id);
    if (!isEmpty(task)) {
      await this.adminSysTaskService.stop(task);
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('启动任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/start')
  @Validate()
  async start(@Body(ALL) dto: CheckIdTaskDto): Promise<ResOp> {
    const task = await this.adminSysTaskService.info(dto.id);
    if (!isEmpty(task)) {
      await this.adminSysTaskService.start(task);
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('删除任务')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) dto: CheckIdTaskDto): Promise<ResOp> {
    const task = await this.adminSysTaskService.info(dto.id);
    if (!isEmpty(task)) {
      await this.adminSysTaskService.delete(task);
    }
    return res();
  }
}
