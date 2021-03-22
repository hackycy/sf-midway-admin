import { ALL } from '@midwayjs/decorator';
import { Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysLoginLogService } from '../../../service/admin/sys/login_log';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/login-log', {
  tagName: 'AdminSysLoginLog',
  description: '后台登录日志模块',
})
export class AdminSysLoginLogController extends BaseController {
  @Inject()
  adminSysLoginLogService: AdminSysLoginLogService;

  @(CreateApiDoc()
    .summary('分页查询登录日志')
    .respond(200, '', 'json', {
      example: resByPage(
        [
          {
            id: 3,
            ip: '127.0.0.1',
            os: 'undefined undefined',
            browser: 'undefined undefined',
            time: '2021-03-22T02:28:16.836Z',
            username: 'rootadmin',
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
    const list = await this.adminSysLoginLogService.page(
      dto.page - 1,
      dto.limit
    );
    const count = await this.adminSysLoginLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }
}
