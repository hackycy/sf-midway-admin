import {
  Get,
  Inject,
  Provide,
  Query,
  ALL,
  Post,
  Body,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { isEmpty } from 'lodash';
import { res } from '../../common/utils';
import { AdminController } from '../../decorator/controller';
import { Validate } from '../../decorator/validate';
import {
  LoginImageCaptchaDto,
  LoginInfoDto,
  UpdatePersonInfoDto,
} from '../../dto/admin/verify';
import { ResOp } from '../../interface';
import { AdminVerifyService } from '../../service/admin/comm/verify';
import { AdminSysUserService } from '../../service/admin/sys/user';
import { BaseController } from '../base';

@Provide()
@AdminController('/', { tagName: 'AdminLogin', description: '后台登录模块' })
export class AdminLoginController extends BaseController {
  @Inject()
  adminVerifyService: AdminVerifyService;

  @Inject()
  adminSysUserService: AdminSysUserService;

  @(CreateApiDoc()
    .summary('获取图片验证码')
    .param('验证码参数')
    .respond(200, '', 'json', {
      example: res({
        data: {
          img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDxxx',
          id: 'bfMpheAIqp4ah0QhMEomT',
        },
      }),
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
      example: res({ data: { token: 'eyJhbGciOiJIUzI1NiI....' } }),
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
      example: res(),
    })
    .build())
  @Post('/logout')
  async logout(): Promise<ResOp> {
    await this.adminVerifyService.clearLoginStatus(this.ctx.token.uid);
    return res();
  }

  @Get('/permmenu')
  async permmenu(): Promise<ResOp> {
    return res({
      data: await this.adminVerifyService.getPermMenu(this.ctx.token.uid),
    });
  }

  @Get('/person')
  async person(): Promise<ResOp> {
    return res({
      data: await this.adminSysUserService.person(this.ctx.token.uid),
    });
  }

  @Post('/person')
  async personUpdate(
    @Body(ALL) personInfo: UpdatePersonInfoDto
  ): Promise<ResOp> {
    const result = await this.adminSysUserService.personUpdate(
      this.ctx.token.uid,
      personInfo
    );
    if (isEmpty(result)) {
      return res({ code: 10011 });
    }
    return res();
  }
}
