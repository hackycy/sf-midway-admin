import 'egg';
import { conf } from 'qiniu';

export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

export interface ExecuteData {
  id: number;
  args?: string | null;
  service: string;
}

export interface Token {
  uid: number;
  pv: number;
}

export type QINIU_ACCESS_CONTROL = 'private' | 'public';

declare module 'egg' {
  interface Context {
    admin: Token;
  }

  interface EggAppConfig {
    rootRoleId: number;
    jwt: {
      secret: string;
    };
    qiniu: {
      accessKey: string;
      secretKey: string;
      bucket: string;
      zone: conf.Zone;
      domain: string;
      access: QINIU_ACCESS_CONTROL;
    };
  }
}
