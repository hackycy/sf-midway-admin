import { ALL, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import { SearchReqLogDto } from '../../../dto/admin/sys/log';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysReqLogService } from '../../../service/admin/sys/req_log';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/req-log', {
  tagName: 'AdminSysReqLog',
  description: '后台请求追踪日志模块',
})
export class AdminSysReqLogController extends BaseController {
  @Inject()
  adminSysReqLogService: AdminSysReqLogService;

  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysReqLogService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysReqLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @Get('/search')
  @Validate()
  async search(@Query(ALL) dto: SearchReqLogDto): Promise<ResOp> {
    const result = await this.adminSysReqLogService.search(
      dto.page,
      dto.limit,
      dto.q
    );
    return resByPage(result.logs, result.count, dto.page, dto.limit);
  }
}
