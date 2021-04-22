import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../base';
import { AxiosInstance } from 'axios';
import {
  AmapConfig,
  AmapIPAddress,
  AmapWeatherForecast,
  AmapWeatherLive,
} from './interface';

// base url
export const AMAP_BASEURL = 'https://restapi.amap.com/v3';

// 天气接口api地址
export const WEATHER_API = '/weather/weatherInfo';

// ip查询接口api地址
export const IP_ADDRESS_API = '/ip';

/**
 * 高德Web服务Api调用Service
 */
@Provide()
export class AmapWebService extends BaseService {
  @Inject()
  httpclient: AxiosInstance;

  @Config('amap')
  amapConfig: AmapConfig;

  /**
   * 天气查询是一个简单的HTTP接口，根据用户输入的adcode，查询目标区域当前/未来的天气情况。
   * @param adcode 输入城市的adcode，adcode信息可参考https://lbs.amap.com/api/webservice/download
   * @param extensions base:返回实况天气 all:返回预报天气
   */
  async queryWeather(
    adcode: string,
    extensions = 'base'
  ): Promise<AmapWeatherForecast | AmapWeatherLive | never> {
    const result = await this.httpclient({
      url: `${AMAP_BASEURL}${WEATHER_API}`,
      method: 'get',
      params: {
        key: this.amapConfig.key,
        city: adcode,
        extensions,
        output: 'JSON',
      },
    });
    const { data } = result;
    // 返回状态说明,10000代表正确
    if (data.infocode !== '10000') {
      throw new Error(data.info);
    }
    if (extensions === 'base') {
      return data.lives[0];
    } else {
      return data.forecasts[0];
    }
  }

  /**
   * 根据用户输入的IP地址，能够快速的帮用户定位IP的所在位置。
   * @param ip 需要搜索的IP地址（仅支持国内）若不填写IP，则取客户http之中的请求来进行定位
   */
  async queryIPAddress(ip?: string): Promise<AmapIPAddress | never> {
    const result = await this.httpclient({
      url: `${AMAP_BASEURL}${IP_ADDRESS_API}`,
      method: 'get',
      params: {
        key: this.amapConfig.key,
        ip,
        output: 'JSON',
      },
    });
    const { data } = result;
    // 返回状态说明,10000代表正确
    if (data.infocode !== '10000') {
      throw new Error(data.info);
    }
    return {
      province: data.province,
      city: data.city,
      adcode: data.adcode,
      rectangle: data.rectangle,
    };
  }
}
