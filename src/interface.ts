import 'egg';

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
    };
  }
}
