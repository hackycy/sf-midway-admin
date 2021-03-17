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
import { res } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import {
  LoginImageCaptchaDto,
  LoginInfoDto,
  UpdatePersonInfoDto,
} from '../../../dto/admin/verify';
import { ResOp } from '../../../interface';
import { AdminVerifyService } from '../../../service/admin/comm/verify';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import { BaseController } from '../../base';

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
    await this.adminVerifyService.clearLoginStatus(this.ctx.admin.uid);
    return res();
  }

  @(CreateApiDoc()
    .summary('获取菜单列表及权限列表')
    .respond(200, '', 'json', {
      example: res({
        data: {
          menus: [
            {
              createTime: '2020-08-28T10:09:26.322Z',
              updateTime: '2020-10-12T06:35:18.000Z',
              id: 1,
              parentId: null,
              name: '系统',
              router: '/sys',
              perms: null,
              type: 0,
              icon: 'system',
              orderNum: 255,
              viewPath: null,
              keepalive: true,
              isShow: true,
            },
          ],
          perms: ['sys:user:add', 'sys:user:delete'],
        },
      }),
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
      example: res({
        data: {
          createTime: '2020-08-27T03:38:30.000Z',
          updateTime: '2020-10-07T07:17:14.000Z',
          id: 1,
          name: 'hackycy',
          username: 'rootadmin',
          psalt: 'adsbadwasasdwasdasd',
          nickName: '',
          headImg: 'http://xxx.png',
          email: 'qa894178522@qq.com',
          phone: '13124314551',
          remark: null,
        },
      }),
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
      example: res(),
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
