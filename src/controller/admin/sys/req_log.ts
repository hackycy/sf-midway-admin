import { ALL, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
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
  description: '后台请求追踪日志控制器',
})
export class AdminSysReqLogController extends BaseController {
  @Inject()
  adminSysReqLogService: AdminSysReqLogService;

  @(CreateApiDoc()
    .summary('分页查询请求追踪日志')
    .respond(200, '', 'json', {
      example: resByPage(
        [
          {
            createTime: '2021-03-22T08:27:13.506Z',
            updateTime: '2021-03-22T08:27:13.506Z',
            id: 1,
            ip: '127.0.0.1',
            userId: 1,
            params: '{}',
            action: '/admin/captcha/img',
            method: 'GET',
            status: 200,
            consumeTime: 11,
          },
        ],
        1,
        1,
        10
      ),
    })
    .build())
  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysReqLogService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysReqLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('根据条件查询请求追踪日志')
    .respond(200, '', 'json', {
      example: resByPage(
        [
          {
            createTime: '2021-03-22T08:27:13.506Z',
            updateTime: '2021-03-22T08:27:13.506Z',
            id: 1,
            ip: '127.0.0.1',
            userId: 1,
            params: '{}',
            action: '/admin/captcha/img',
            method: 'GET',
            status: 200,
            consumeTime: 11,
          },
        ],
        1,
        1,
        10
      ),
    })
    .build())
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
