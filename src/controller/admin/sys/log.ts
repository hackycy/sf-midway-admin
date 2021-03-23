import { ALL, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import { SearchReqLogDto } from '../../../dto/admin/sys/log';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysLoginLogService } from '../../../service/admin/sys/login_log';
import { AdminSysReqLogService } from '../../../service/admin/sys/req_log';
import { AdminSysTaskLogService } from '../../../service/admin/sys/task_log';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/log', {
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
      example: resByPage(
        [
          {
            id: 3,
            taskId: 2,
            name: '日志名称',
            createTime: '2021-03-22T08:27:13.506Z',
            finishTime: '2021-03-22T08:27:13.506Z',
            detail: '任务执行详情',
            status: 1,
          },
        ],
        1,
        1,
        10
      ),
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
