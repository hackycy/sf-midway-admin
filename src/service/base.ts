import { Plugin } from '@midwayjs/decorator';
import { Singleton } from 'egg';
import { Redis } from 'ioredis';
import { getConnection, getManager, Connection, EntityManager } from 'typeorm';

/**
 * BaseService
 */
export class BaseService {
  @Plugin('redis')
  redis: Singleton<Redis>;

  getAdminRedis(): Redis {
    return this.redis.get('admin');
  }

  getConnection(): Connection {
    return getConnection('default');
  }

  getManager(): EntityManager {
    return getManager('default');
  }
}
