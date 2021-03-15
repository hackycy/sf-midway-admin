import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Context } from 'egg';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import ErrorConstants from './error_constants';
import * as JsonWebToken from 'jsonwebtoken';

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Config('jwt')
  jwt;

  /**
   * 获取请求IP
   */
  getReqIP(ctx: Context): string {
    const req: any = ctx.req;
    return (
      req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
    ).replace('::ffff:', '');
  }

  /**
   * 根据code获取错误信息
   */
  getErrorMessageByCode(code: number): string {
    return ErrorConstants[code];
  }

  /**
   * AES加密
   */
  aesEncrypt(msg: string, secret: string): string {
    return CryptoJS.AES.encrypt(msg, secret).toString();
  }

  /**
   * AES解密
   */
  aesDecrypt(encrypted: string, secret: string): string {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  }

  /**
   * md5加密
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  /**
   * 生成一个UUID
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * 生成一个随机的值
   */
  generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnm'
  ): string {
    const nanoid = customAlphabet(placeholder, length);
    return nanoid();
  }

  /**
   * JsonWebToken Sign
   * https://github.com/auth0/node-jsonwebtoken
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  jwtSign(sign: any, options?: any): string {
    return JsonWebToken.sign(sign, this.jwt.secret, options);
  }

  /**
   * JsonWebToken Verify
   * https://github.com/auth0/node-jsonwebtoken
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  jwtVerify(token: string, options?: any): string {
    return JsonWebToken.verify(token, this.jwt.secret, options);
  }
}
