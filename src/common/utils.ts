import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Context } from 'egg';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import ErrorConstants from './error_constants';
import * as JsonWebToken from 'jsonwebtoken';
import { ResOp } from '../interface';

/**
 * 返回数据
 * @param op 返回配置，返回失败需要单独配置
 */
export function res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? getErrorMessageByCode(op!.code) || op?.message || 'unknown error'
      : op?.message || 'success',
  };
}

/**
 * 根据code获取错误信息
 */
export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}

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
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
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
    return `${JsonWebToken.verify(token, this.jwt.secret, options)}`;
  }
}
