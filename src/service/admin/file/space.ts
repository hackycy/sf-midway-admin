import { Config, Init, Inject, Provide } from '@midwayjs/decorator';
import { EggAppConfig } from 'egg';
import { BaseService } from '../../base';
import * as qiniu from 'qiniu';
import { rs, conf } from 'qiniu';
import { IFileInfo, IFileListResult } from '../interface';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Utils } from '../../../common/utils';

// 目录分隔符
export const DELIMITER = '/';
export const LIMIT = 100;

@Provide()
export class AdminFileSpaceService extends BaseService {
  @Config('qiniu')
  qiniuConfig: EggAppConfig['qiniu'];

  @Inject()
  utils: Utils;

  config: conf.ConfigOptions;

  uploadToken: string;

  bucketManager: rs.BucketManager;

  @Init()
  async init(): Promise<void> {
    const mac = new qiniu.auth.digest.Mac(
      this.qiniuConfig.accessKey,
      this.qiniuConfig.secretKey
    );
    this.config = new qiniu.conf.Config({
      zone: this.qiniuConfig.zone,
    });
    // upload token
    const policy = new qiniu.rs.PutPolicy({
      scope: this.qiniuConfig.bucket,
    });
    this.uploadToken = policy.uploadToken(mac);
    // bucket manager
    this.bucketManager = new qiniu.rs.BucketManager(mac, this.config);
  }

  /**
   * 获取文件列表
   * @param prefix 当前文件夹路径
   * @param marker 下一页标识
   * @returns iFileListResult
   */
  async getFileList(prefix = '', marker = ''): Promise<IFileListResult> {
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
                  id: this.utils.generateRandomValue(22),
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
                    id: item.hash,
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
                `Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`
              )
            );
          }
        }
      );
    });
  }

  /**
   * 创建文件夹
   * @returns true创建成功
   */
  async createDir(dirName: string): Promise<boolean> {
    const path = dirName.endsWith('/') ? dirName : `${dirName}/`;
    return new Promise((resolve, reject) => {
      // fix path end must a /

      // 检测文件夹是否存在
      this.bucketManager.stat(
        this.qiniuConfig.bucket,
        path,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
            return;
          }
          if (respInfo.statusCode === 200) {
            // 文件夹存在
            resolve(true);
          } else if (respInfo.statusCode === 612) {
            // 文件夹不存在
            resolve(false);
          } else {
            reject(
              new Error(
                `Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`
              )
            );
          }
        }
      );
    }).then(hasDir => {
      return new Promise((resolve, reject) => {
        if (hasDir) {
          // 如果已存在则返回false
          resolve(false);
          return;
        }
        // 上传一个空文件以用于显示文件夹效果
        const formUploader = new qiniu.form_up.FormUploader(this.config);
        const putExtra = new qiniu.form_up.PutExtra();
        formUploader.put(
          this.uploadToken,
          path,
          ' ',
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject(respErr);
              return;
            }
            if (respInfo.statusCode === 200) {
              resolve(true);
            } else {
              reject(
                new Error(
                  `Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`
                )
              );
            }
          }
        );
      });
    });
  }
}