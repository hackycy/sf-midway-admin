/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import * as fs from 'fs';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614320993440_7208';

  // 配置网站图标 可为网络图标
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../../favicon.ico')),
  };

  // jwt 密钥
  config.jwt = {
    secret: 'INnyQ50BEE6AITQraIaDGooJ',
  };

  /// 盐
  config.salt = 'J3bbOZz95lPjGDaToU';

  // https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件
  config.multipart = {
    mode: 'file',
  };

  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    // 配合egg-cors使用
    // domainWhiteList: [ 'http://localhost:7003' ],
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
      ignoreJSON: true,
    },
  };

  // swagger 配置
  config.swagger = {
    title: 'sf-midway-admin',
    description: 'sf-admin for midway api',
    version: '0.0.1',
    termsOfService: '',
    contact: {
      name: 'API Support',
      url: 'http://www.example.com/support',
      email: 'support@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  };

  // add your config here
  config.middleware = ['execptionMiddleware'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  return config;
};
