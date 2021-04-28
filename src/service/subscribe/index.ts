import { Inject, Provide } from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { BaseService } from '../base';
import { AmapWeatherForecast } from '../common/amap/interface';
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
        adcode,
        'all'
      )) as AmapWeatherForecast;
      let day01 = '',
        day02 = '',
        day03 = '';
      const keys = [
        'date',
        'dayweather',
        'nightweather',
        'daytemp',
        'nighttemp',
        'daywind',
        'nightwind',
      ];
      for (let i = 0; i < 7; i++) {
        day01 += `<th scope="col">${weather.casts[0][keys[i]]}</th>`;
        day02 += `<th scope="col">${weather.casts[1][keys[i]]}</th>`;
        day03 += `<th scope="col">${weather.casts[2][keys[i]]}</th>`;
      }
      await this.nodeMailerService.sendMail({
        from: 'noreply@mail.si-yee.com',
        to: email,
        subject: `天气预报 - ${weather.city} - ${weather.casts[0].dayweather} / ${weather.casts[0].daytemp} ℃`,
        html: `
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            body {
              font-family: "Open Sans", sans-serif;
              line-height: 1.25;
            }

            table {
              border: 1px solid #ccc;
              border-collapse: collapse;
              margin: 0;
              padding: 0;
              width: 100%;
              table-layout: fixed;
            }

            table caption {
              font-size: 1.5em;
              margin: .5em 0 .75em;
            }

            table tr {
              background-color: #f8f8f8;
              border: 1px solid #ddd;
              padding: .35em;
            }

            table th,
            table td {
              padding: .625em;
              text-align: center;
            }

            table th {
              font-size: .85em;
              letter-spacing: .1em;
              text-transform: uppercase;
            }

            @media screen and (max-width: 600px) {
              table {
                border: 0;
              }

              table caption {
                font-size: 1.3em;
              }

              table thead {
                border: none;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
              }

              table tr {
                border-bottom: 3px solid #ddd;
                display: block;
                margin-bottom: .625em;
              }

              table td {
                border-bottom: 1px solid #ddd;
                display: block;
                font-size: .8em;
                text-align: right;
              }

              table td::before {
                /*
            * aria-label has no advantage, it won't be read inside a table
            content: attr(aria-label);
            */
                content: attr(data-label);
                float: left;
                font-weight: bold;
                text-transform: uppercase;
              }

              table td:last-child {
                border-bottom: 0;
              }
            }
          </style>
        </head>

        <body>
          <table>
            <caption>天气摘要</caption>
            <thead>
              <tr>
                <th scope="col">日期</th>
                <th scope="col">白天天气现象</th>
                <th scope="col">晚上天气现象</th>
                <th scope="col">白天温度</th>
                <th scope="col">晚上温度</th>
                <th scope="col">白天风向</th>
                <th scope="col">晚上风向</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                ${day01}
              </tr>
              <tr>
                ${day02}
              </tr>
              <tr>
                ${day03}
              </tr>
            </tbody>
          </table>
        </body>

        </html>

        `,
      });
    }
  }
}
