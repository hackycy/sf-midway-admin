import { Config, Init, Provide } from '@midwayjs/decorator';
import { EggAppConfig } from 'egg';
import { BaseService } from '../../base';
import * as qiniu from 'qiniu';
import { rs } from 'qiniu';

// 目录分隔符
export const DELIMITER = '/';
export const LIMIT = 100;

@Provide()
export class AdminFileSpaceService extends BaseService {
  @Config('qiniu')
  qiniuConfig: EggAppConfig['qiniu'];

  bucketManager: rs.BucketManager;

  @Init()
  async init(): Promise<void> {
    const mac = new qiniu.auth.digest.Mac(
      this.qiniuConfig.accessKey,
      this.qiniuConfig.secretKey
    );
    const config = new qiniu.conf.Config();
    (config as any).zone = qiniu.zone.Zone_z2;
    this.bucketManager = new qiniu.rs.BucketManager(mac, config);
  }

  async getFileList(prefix = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      this.bucketManager.listPrefix(
        this.qiniuConfig.bucket,
        {
          prefix,
          limit: LIMIT,
          delimiter: DELIMITER,
        },
        (err, respBody, respInfo) => {
          if (err) {
            reject(err);
            return;
          }
          if (respInfo.statusCode === 200) {
            // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            // 指定options里面的marker为这个值
            console.log(respBody);
            const files = []
              .concat(respBody.commonPrefixes || [])
              .concat(respBody.items || []);
            resolve({
              marker: respBody.marker,
              files,
            });
          } else {
            reject(respInfo.statusCode);
          }
        }
      );
    });
  }
}
