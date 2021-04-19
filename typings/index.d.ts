import 'egg';
import { QueueOptions } from 'bull';

interface Token {
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
    aesSecret: {
      admin: string;
      front: string;
    };
  }
}
