import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { res } from '../../../common/utils';
import { ResOp } from '../../../interface';
import { AdminFileSpaceService } from '../../../service/admin/file/space';
import {
  BaseController,
  ADMIN_PREFIX_URL,
  NOAUTH_PREFIX_URL,
} from '../../base';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}/file/space`, {
  tagName: 'AdminFileSpace',
  description: '后台文件空间管理控制器',
})
export class AdminFileSpaceController extends BaseController {
  @Inject()
  adminFileSpaceService: AdminFileSpaceService;

  @Get('/list')
  async list(): Promise<ResOp> {
    const result = await this.adminFileSpaceService.getFileList();
    return res({ data: result });
  }
}
