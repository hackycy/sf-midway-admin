import { EggAppConfig, PowerPartial } from 'egg';
const redisStore = require('cache-manager-ioredis');
import * as qiniu from 'qiniu';

export default (): any => {
  const config: PowerPartial<EggAppConfig> = {};

  /**
   * 邮件推送配置
   */
  config.mailer = {
    host: process.env.MAILER_HOST || '',
    port: parseInt(process.env.MAILER_PORT) || 80,
    auth: {
      user: process.env.MAILER_USER || '',
      pass: process.env.MAILER_PASS || '',
    },
    secure: false,
  };

  // bull config
  config.bull = {
    default: {
      redis: {
        port: parseInt(process.env.REDIS_PORT) || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD || '123456',
        db: 0,
      },
      prefix: 'admin:task',
    },
  };

  // 高德开放平台应用Key
  config.amap = {
    key: process.env.AMAP_KEY || '',
  };

  // Root角色对应的角色表的ID，超管配置无法在页面进行操作
  config.rootRoleId = 1;

  /**
   * typeorm 配置
   * 文档：https://www.yuque.com/midwayjs/midway_v2/orm#njH6J
   */
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: process.env.MYSQL_DATABASE || 'sf-admin',
    synchronize: false,
    logging: false,
  };

  const parseZone = (zone: string) => {
    return qiniu.zone[zone];
  };

  config.qiniu = {
    accessKey: process.env.QINIU_ACCESSKEY,
    secretKey: process.env.QINIU_SECRETKEY,
    domain: process.env.QINIU_DOMAIN,
    bucket: process.env.QINIU_BUCKET,
    zone: parseZone(process.env.QINIU_ZONE || 'Zone_z2'),
    access: (process.env.QINIU_ACCESS_TYPE as any) || 'public',
  };

  // midway cache
  config.cache = {
    store: redisStore,
    options: {
      host: process.env.REDIS_HOST || '127.0.0.1', // default value
      port: parseInt(process.env.REDIS_PORT) || 6379, // default value
      password: process.env.REDIS_PASSWORD || '123456',
      db: 0,
      ttl: 60,
    },
  };

  return config;
};
