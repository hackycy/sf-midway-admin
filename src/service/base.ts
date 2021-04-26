import { CacheManager } from '@midwayjs/cache';
import { Inject } from '@midwayjs/decorator';
import { Redis } from 'ioredis';
import { getConnection, getManager, Connection, EntityManager } from 'typeorm';

/**
 * BaseService
 */
export class BaseService {
  @Inject('cache:cacheManager')
  cacheManager: CacheManager;

  getAdminRedis(): Redis {
    return (this.cacheManager.cache.store as any).getClient();
  }

  getAdminCacheManager(): CacheManager {
    return this.cacheManager;
  }

  getConnection(): Connection {
    return getConnection('default');
  }

  getManager(): EntityManager {
    return getManager('default');
  }
}
