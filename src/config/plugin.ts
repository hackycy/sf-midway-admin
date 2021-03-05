import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false,
  redis: {
    enable: true,
    package: 'egg-redis',
  },
} as EggPlugin;
