import {
  ALL,
  Controller,
  Get,
  Inject,
  Provide,
  Query,
  Validate,
} from '@midwayjs/decorator';
import { res } from '../../../common/utils';
import { GetFileListDto } from '../../../dto/admin/file/space';
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
}
