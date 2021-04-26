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
import { LoginImageCaptchaDto, LoginInfoDto } from '../../../dto/admin/verify';
import { ResOp } from '../../../interface';
import { AdminVerifyService } from '../../../service/admin/comm/verify';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import {
  BaseController,
  ADMIN_PREFIX_URL,
  NOAUTH_PREFIX_URL,
} from '../../base';
import { GetLoginImgCaptchaExample, GetLoginTokenExample } from '../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}/`, {
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
}
