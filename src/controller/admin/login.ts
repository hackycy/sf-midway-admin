import { Get, Inject, Provide, Query, ALL } from '@midwayjs/decorator';
import { AdminController } from '../../decorator/controller';
import { AdminVerifyService } from '../../service/admin/comm/verify';
import { IImageCaptchaOptions } from '../../service/admin/interface';
import { BaseController } from '../base';

@Provide()
@AdminController('/')
export class AdminLoginController extends BaseController {
  @Inject()
  adminVerifyService: AdminVerifyService;

  @Get('/captcha/img')
  async captchaByImg(@Query(ALL) query: IImageCaptchaOptions): Promise<any> {
    const result = await this.adminVerifyService.getImgCaptcha(query);
    return this.res({ data: result });
  }
}
