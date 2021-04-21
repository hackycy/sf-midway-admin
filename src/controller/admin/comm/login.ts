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
import { res } from '../../../common/utils';
import {
  LoginImageCaptchaDto,
  LoginInfoDto,
  UpdatePersonInfoDto,
} from '../../../dto/admin/verify';
import { ResOp } from '../../../interface';
import { AdminVerifyService } from '../../../service/admin/comm/verify';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import {
  GetAdminPersonInfoExample,
  GetLoginImgCaptchaExample,
  GetLoginTokenExample,
  GetPermMenuExample,
  NormalExample,
} from '../../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/`, {
  tagName: 'AdminLogin',
  description: '后台登录控制器',
})
export class AdminLoginController extends BaseController {
  @Inject()
  adminVerifyService: AdminVerifyService;

  @Inject()
  adminSysUserService: AdminSysUserService;

  @(CreateApiDoc()
    .summary('获取图片验证码')
    .param('验证码参数')
    .respond(200, '', 'json', {
      example: GetLoginImgCaptchaExample,
    })
    .build())
  @Get('/captcha/img')
  @Validate()
  async captchaByImg(
    @Query(ALL) captcha: LoginImageCaptchaDto
  ): Promise<ResOp> {
    const result = await this.adminVerifyService.getImgCaptcha(captcha);
    return res({ data: result });
  }

  @(CreateApiDoc()
    .summary('管理员登录')
    .param('管理员登录信息参数')
    .respond(200, '', 'json', {
      example: GetLoginTokenExample,
    })
    .build())
  @Post('/login')
  @Validate()
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<ResOp> {
    const isSuccess = await this.adminVerifyService.checkImgCaptcha(
      loginInfo.captchaId,
      loginInfo.verifyCode
    );
    if (!isSuccess) {
      return res({ code: 10002 });
    }
    const sign = await this.adminVerifyService.getLoginSign(
      loginInfo.username,
      loginInfo.password
    );
    if (isEmpty(sign)) {
      return res({ code: 10003 });
    }
    return res({ data: { token: sign } });
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

  @(CreateApiDoc()
    .summary('获取管理员资料')
    .respond(200, '', 'json', {
      example: GetAdminPersonInfoExample,
    })
    .build())
  @Get('/person')
  async person(): Promise<ResOp> {
    return res({
      data: await this.adminSysUserService.person(this.ctx.admin.uid),
    });
  }

  @(CreateApiDoc()
    .summary('更改管理员资料')
    .param('需要更改的管理员资料参数')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/person')
  async personUpdate(
    @Body(ALL) personInfo: UpdatePersonInfoDto
  ): Promise<ResOp> {
    const result = await this.adminSysUserService.personUpdate(
      this.ctx.admin.uid,
      personInfo
    );
    if (!result) {
      return res({ code: 10011 });
    }
    return res();
  }
}
