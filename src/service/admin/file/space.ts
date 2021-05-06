import { Config, Init, Inject, Provide } from '@midwayjs/decorator';
import { EggAppConfig } from 'egg';
import { BaseService } from '../../base';
import * as qiniu from 'qiniu';
import { rs, conf, auth } from 'qiniu';
import { IFileInfo, IFileListResult } from '../interface';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Utils } from '../../../common/utils';
import { join } from 'path';

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
  mac: auth.digest.Mac;
  bucketManager: rs.BucketManager;

  @Init()
  async init(): Promise<void> {
    this.mac = new qiniu.auth.digest.Mac(
      this.qiniuConfig.accessKey,
      this.qiniuConfig.secretKey
    );
    this.config = new qiniu.conf.Config({
      zone: this.qiniuConfig.zone,
    });
    // bucket manager
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
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
                  id: this.utils.generateRandomValue(12),
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
                    id: this.utils.generateRandomValue(12),
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
          this.createUploadToken(),
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

  /**
   * 检查文件是否存在，同可检查目录
   */
  async checkFileExist(filePath: string): Promise<boolean> {
    const path = filePath.endsWith('/') ? filePath : `${filePath}/`;
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
    });
  }

  /**
   * 创建Upload Token, 默认过期时间一小时
   * @returns upload token
   */
  createUploadToken(): string {
    const policy = new qiniu.rs.PutPolicy({
      scope: this.qiniuConfig.bucket,
      insertOnly: 1,
    });
    const uploadToken = policy.uploadToken(this.mac);
    return uploadToken;
  }

  /**
   * 重命名文件
   * @param dir 文件路径
   * @param name 文件名称
   */
  async renameFile(dir: string, name: string, toname: string): Promise<void> {
    const fileName = join(dir, name);
    const toFileName = join(dir, toname);
    const op = {
      force: true,
    };
    return new Promise((resolve, reject) => {
      this.bucketManager.move(
        this.qiniuConfig.bucket,
        fileName,
        this.qiniuConfig.bucket,
        toFileName,
        op,
        (err, respBody, respInfo) => {
          if (err) {
            reject(err);
          } else {
            if (respInfo.statusCode === 200) {
              resolve();
            } else {
              reject(
                new Error(
                  `Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`
                )
              );
            }
          }
        }
      );
    });
  }

  /**
   * 重命名文件夹，数量过多可能会导致超时
   */
  async renameDir(path: string, name: string, toName: string): Promise<void> {
    const dirName = join(path, name);
    const toDirName = join(path, toName);
    let hasFile = true;
    let marker = '';
    const op = {
      force: true,
    };
    const bucketName = this.qiniuConfig.bucket;
    while (hasFile) {
      await new Promise<void>((resolve, reject) => {
        // 列举当前目录下的所有文件
        this.bucketManager.listPrefix(
          this.qiniuConfig.bucket,
          {
            prefix: dirName,
            limit: 1000,
            marker,
          },
          (err, respBody, respInfo) => {
            if (err) {
              reject(err);
              return;
            }
            if (respInfo.statusCode === 200) {
              const moveOperations = respBody.items.map(item => {
                const { key } = item;
                const destKey = key.replace(dirName, toDirName);
                return qiniu.rs.moveOp(
                  bucketName,
                  key,
                  bucketName,
                  destKey,
                  op
                );
              });
              this.bucketManager.batch(
                moveOperations,
                (err2, respBody2, respInfo2) => {
                  if (err2) {
                    reject(err2);
                    return;
                  }
                  if (respInfo2.statusCode === 200) {
                    if (isEmpty(respBody.marker)) {
                      hasFile = false;
                    } else {
                      marker = respBody.marker;
                    }
                    resolve();
                  } else {
                    reject(
                      new Error(
                        `Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`
                      )
                    );
                  }
                }
              );
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
  }
}
