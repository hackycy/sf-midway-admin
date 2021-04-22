import { Inject, Provide } from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { BaseService } from '../base';
import { AmapWeatherLive } from '../common/amap/interface';
import { AmapWebService } from '../common/amap/web';
import { NodeMailerService } from '../common/mailer/nodemailer';
import { SearchWeatherParams } from './interface';

@Provide()
export class TimingSubscribeService extends BaseService {
  @Inject()
  nodeMailerService: NodeMailerService;

  @Inject()
  amapWebService: AmapWebService;

  /**
   * 订阅天气，格式需符合
   * [
   *  {
   *    adcode: '',
   *    email: ''
   *  }
   * ]
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async subWeather(args: SearchWeatherParams[]): Promise<void> {
    if (isEmpty(args)) {
      return;
    }
    if (!Array.isArray(args)) {
      return;
    }
    for (const o of args) {
      const { adcode, email } = o;
      const weather = (await this.amapWebService.queryWeather(
        adcode
      )) as AmapWeatherLive;
      await this.nodeMailerService.sendMail({
        from: 'noreply@mail.si-yee.com',
        text: `风向：${weather.winddirection}\n风力：${weather.windpower}\n湿度：${weather.humidity}\n数据发布时间：${weather.reporttime}`,
        to: email,
        subject: `天气快报 - ${weather.city} - ${weather.weather} / ${weather.temperature} ℃`,
        html: `
          <h4>风向：${weather.winddirection}</h4>
          <h4>风力：${weather.windpower}</h4>
          <h4>湿度：${weather.humidity}</h4>
          <h4>数据发布时间：${weather.reporttime}</h4>
        `,
      });
    }
  }
}
