import { Config, Init, Provide } from '@midwayjs/decorator';
import { EggAppConfig } from 'egg';
import { BaseService } from '../../base';
import * as qiniu from 'qiniu';
import { rs, conf } from 'qiniu';
import { IFileInfo, iFileListResult } from '../interface';

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
    (config as conf.ConfigOptions).zone = qiniu.zone.Zone_z2;
    this.bucketManager = new qiniu.rs.BucketManager(mac, config);
  }

  async getFileList(prefix = '', marker = ''): Promise<iFileListResult> {
    return new Promise((resolve, reject) => {
      this.bucketManager.listPrefix(
        this.qiniuConfig.bucket,
        {
          prefix,
          limit: LIMIT,
          delimiter: DELIMITER,
          marker,
        },
        (err, respBody, respInfo) => {
          if (err) {
            reject(err);
            return;
          }
          if (respInfo.statusCode === 200) {
            // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            // 指定options里面的marker为这个值
            const fileList: IFileInfo[] = [];
            if (respBody.commonPrefixes && respBody.commonPrefixes.length > 0) {
              // dir
              for (const dirPath of respBody.commonPrefixes) {
                fileList.push({
                  name: (dirPath as string).replace('/', ''),
                  type: 'dir',
                });
              }
            }
            if (respBody.items && respBody.items.length > 0) {
              // file
              for (const item of respBody.items) {
                fileList.push({
                  name: item.key,
                  type: 'file',
                  fsize: item.fsize,
                  mimeType: item.mimeType,
                  putTime: item.putTime,
                });
              }
            }
            resolve({
              list: fileList,
              marker: respBody.marker,
            });
          } else {
            reject(respInfo.statusCode);
          }
        }
      );
    });
  }
}
