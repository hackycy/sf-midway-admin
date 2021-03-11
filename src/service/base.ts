import { Plugin } from '@midwayjs/decorator';
import { Singleton } from 'egg';
import { Redis } from 'ioredis';

/**
 * BaseService
 */
export class BaseService {
  @Plugin('redis')
  redis: Singleton<Redis>;

  getAdminRedis(): Redis {
    return this.redis.get('admin');
  }
}
