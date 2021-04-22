import { Config, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../base';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

@Provide()
export class NodeMailerService extends BaseService {
  @Config('mailer')
  mailerConfig;

  /**
   * 发送邮件
   */
  async sendMail(options: Mail.Options): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport(this.mailerConfig);
    return await transporter.sendMail(options);
  }
}
