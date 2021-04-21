import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { res } from '../../../common/utils';
import { UpdatePersonInfoDto } from '../../../dto/admin/verify';
import { ResOp } from '../../../interface';
import { AdminVerifyService } from '../../../service/admin/comm/verify';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import {
  BaseController,
  ADMIN_PREFIX_URL,
  NOPERM_PREFIX_URL,
} from '../../base';
import {
  GetAdminPersonInfoExample,
  GetPermMenuExample,
  NormalExample,
} from '../../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOPERM_PREFIX_URL}/account`, {
  tagName: 'AdminAccount',
  description: '后台账号信息控制器',
})
export class AdminAccountController extends BaseController {
  @Inject()
  adminSysUserService: AdminSysUserService;

  @Inject()
  adminVerifyService: AdminVerifyService;

  @(CreateApiDoc()
    .summary('获取管理员资料')
    .respond(200, '', 'json', {
      example: GetAdminPersonInfoExample,
    })
    .build())
  @Get('/info')
  async info(): Promise<ResOp> {
    return res({
      data: await this.adminSysUserService.getAccountInfo(this.ctx.admin.uid),
    });
  }

  @(CreateApiDoc()
    .summary('更改管理员资料')
    .param('需要更改的管理员资料参数')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/update')
  async personUpdate(
    @Body(ALL) personInfo: UpdatePersonInfoDto
  ): Promise<ResOp> {
    await this.adminSysUserService.personUpdate(this.ctx.admin.uid, personInfo);
    return res();
  }

  @(CreateApiDoc()
    .summary('管理员登出')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/logout')
  async logout(): Promise<ResOp> {
    await this.adminVerifyService.clearLoginStatus(this.ctx.admin.uid);
    return res();
  }

  @(CreateApiDoc()
    .summary('获取菜单列表及权限列表')
    .respond(200, '', 'json', {
      example: GetPermMenuExample,
    })
    .build())
  @Get('/permmenu')
  async permmenu(): Promise<ResOp> {
    return res({
      data: await this.adminVerifyService.getPermMenu(this.ctx.admin.uid),
    });
  }
}
