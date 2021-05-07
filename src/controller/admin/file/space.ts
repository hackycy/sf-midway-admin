import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Query,
  Validate,
} from '@midwayjs/decorator';
import { res } from '../../../common/utils';
import {
  DeleteDto,
  DownloadDto,
  GetFileListDto,
  MKDirDto,
  RenameDto,
} from '../../../dto/admin/file/space';
import { ResOp } from '../../../interface';
import { AdminFileSpaceService } from '../../../service/admin/file/space';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/file/space`, {
  tagName: 'AdminFileSpace',
  description: '后台文件空间管理控制器',
})
export class AdminFileSpaceController extends BaseController {
  @Inject()
  adminFileSpaceService: AdminFileSpaceService;

  @Get('/list')
  @Validate()
  async list(@Query(ALL) dto: GetFileListDto): Promise<ResOp> {
    const result = await this.adminFileSpaceService.getFileList(
      dto.path,
      dto.marker
    );
    return res({ data: result });
  }

  @Post('/mkdir')
  @Validate()
  async mkdir(@Body(ALL) dto: MKDirDto): Promise<ResOp> {
    let result = false;
    if (dto.dirName.includes('/')) {
      // 多级目录
      const paths: string[] = dto.dirName.split('/');
      for (let index = 1; index <= paths.length; index++) {
        const dir = paths.slice(0, index).join('/');
        const tmp = await this.adminFileSpaceService.createDir(dir);
        if (index === paths.length) {
          result = tmp;
        }
      }
    } else {
      // 单目录
      result = await this.adminFileSpaceService.createDir(dto.dirName);
    }
    if (result) {
      return res();
    } else {
      return res({ code: 20001 });
    }
  }

  @Get('/token')
  async token(): Promise<ResOp> {
    return res({
      data: {
        token: this.adminFileSpaceService.createUploadToken(),
      },
    });
  }

  @Post('/rename')
  @Validate()
  async rename(@Body(ALL) dto: RenameDto): Promise<ResOp> {
    const result = await this.adminFileSpaceService.checkFileExist(
      `${dto.path}${dto.toName}`
    );
    if (result) {
      return res({
        code: 20001,
      });
    }
    if (dto.type === 'file') {
      await this.adminFileSpaceService.renameFile(
        dto.path,
        dto.name,
        dto.toName
      );
    } else {
      await this.adminFileSpaceService.renameDir(
        dto.path,
        dto.name,
        dto.toName
      );
    }
    return res();
  }

  @Post('/download')
  @Validate()
  async download(@Body(ALL) dto: DownloadDto): Promise<ResOp> {
    return res({
      data: this.adminFileSpaceService.getDownloadLink(
        `${dto.path}${dto.name}`
      ),
    });
  }

  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) dto: DeleteDto): Promise<ResOp> {
    if (dto.type === 'file') {
      await this.adminFileSpaceService.deleteFile(dto.path, dto.name);
      return res();
    } else {
      throw new Error('un support');
    }
  }
}
