import { ALL, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysTaskLogService } from '../../../service/admin/sys/task_log';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/task-log', {
  tagName: 'AdminSysTaskLog',
  description: '后台任务日志控制器',
})
export class AdminSysTaskLogController extends BaseController {
  @Inject()
  adminSysTaskLogService: AdminSysTaskLogService;

  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysTaskLogService.page(
      dto.page - 1,
      dto.limit
    );
    const count = await this.adminSysTaskLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }
}
