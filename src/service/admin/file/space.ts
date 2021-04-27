import { Config, Init, Provide } from '@midwayjs/decorator';
import { EggAppConfig } from 'egg';
import { BaseService } from '../../base';
import * as qiniu from 'qiniu';
import { rs, conf } from 'qiniu';
import { IFileInfo, iFileListResult } from '../interface';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

// 目录分隔符
export const DELIMITER = '/';
export const LIMIT = 5;

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
            if (!isEmpty(respBody.commonPrefixes)) {
              // dir
              for (const dirPath of respBody.commonPrefixes) {
                fileList.push({
                  name: (dirPath as string)
                    .substr(0, dirPath.length - 1)
                    .replace(prefix, ''),
                  type: 'dir',
                });
              }
            }
            if (!isEmpty(respBody.items)) {
              // file
              for (const item of respBody.items) {
                const key = item.key.replace(prefix, '');
                // 模拟目录
                if (!isEmpty(key)) {
                  fileList.push({
                    name: key,
                    type: 'file',
                    fsize: item.fsize,
                    mimeType: item.mimeType,
                    putTime: moment(parseInt(item.putTime) / 10000).toDate(),
                  });
                }
              }
            }
            resolve({
              list: fileList,
              marker: respBody.marker || null,
            });
          } else {
            reject(
              new Error(
                `Upload By Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`
              )
            );
          }
        }
      );
    });
  }
}
