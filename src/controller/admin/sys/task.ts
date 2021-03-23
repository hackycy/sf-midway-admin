import { Get, Inject, Provide, Query, ALL } from '@midwayjs/decorator';
import { resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysTaskService } from '../../../service/admin/sys/task';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/task')
export class AdminSysTaskController extends BaseController {
  @Inject()
  adminSysTaskService: AdminSysTaskService;

  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysTaskService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysTaskService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }
}
