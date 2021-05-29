import {
  ALL,
  Get,
  Inject,
  Provide,
  Query,
  Validate,
  Controller,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { resByPage } from '../../../common/utils';
import { SearchReqLogDto } from '../../../dto/admin/sys/log';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysLoginLogService } from '../../../service/admin/sys/login_log';
import { AdminSysReqLogService } from '../../../service/admin/sys/req_log';
import { AdminSysTaskLogService } from '../../../service/admin/sys/task_log';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import {
  GetLoginLogByPageExample,
  GetReqLogByPageExample,
  GetTaskLogByPageExample,
  SearchReqLogByPageExample,
} from '../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/sys/log`, {
  tagName: 'AdminSysLog',
  description: '后台日志控制器',
})
export class AdminSysLogController extends BaseController {
  @Inject()
  adminSysLoginLogService: AdminSysLoginLogService;

  @Inject()
  adminSysReqLogService: AdminSysReqLogService;

  @Inject()
  adminSysTaskLogService: AdminSysTaskLogService;

  @(CreateApiDoc()
    .summary('分页查询登录日志')
    .respond(200, '', 'json', {
      example: GetLoginLogByPageExample,
    })
    .build())
  @Get('/login/page')
  @Validate()
  async loginPage(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysLoginLogService.page(
      dto.page - 1,
      dto.limit
    );
    const count = await this.adminSysLoginLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('分页查询请求追踪日志')
    .respond(200, '', 'json', {
      example: GetReqLogByPageExample,
    })
    .build())
  @Get('/req/page')
  @Validate()
  async reqPage(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysReqLogService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysReqLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('根据条件查询请求追踪日志')
    .respond(200, '', 'json', {
      example: SearchReqLogByPageExample,
    })
    .build())
  @Get('/req/search')
  @Validate()
  async reqSearch(@Query(ALL) dto: SearchReqLogDto): Promise<ResOp> {
    const result = await this.adminSysReqLogService.search(
      dto.page,
      dto.limit,
      dto.q
    );
    return resByPage(result.logs, result.count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('分页查询任务日志')
    .respond(200, '', 'json', {
      example: GetTaskLogByPageExample,
    })
    .build())
  @Get('/task/page')
  @Validate()
  async taskPage(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysTaskLogService.page(
      dto.page - 1,
      dto.limit
    );
    const count = await this.adminSysTaskLogService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }
}
