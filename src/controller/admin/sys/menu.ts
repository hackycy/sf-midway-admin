import {
  ALL,
  Body,
  Get,
  Inject,
  Post,
  Provide,
  Query,
  Validate,
  Controller,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { flattenDeep, isEmpty } from 'lodash';
import { res } from '../../../common/utils';
import {
  CreateMenuDto,
  DeleteMenuDto,
  InfoMenuDto,
  UpdateMenuDto,
} from '../../../dto/admin/sys/menu';
import { ResOp } from '../../../interface';
import { AdminSysMenuService } from '../../../service/admin/sys/menu';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import {
  GetMenuInfoExample,
  GetMenuListExample,
  NormalExample,
} from '../../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/sys/menu`, {
  tagName: 'AdminSysMenu',
  description: '后台菜单控制器',
})
export class AdminSysMenuController extends BaseController {
  @Inject()
  adminSysMenuService: AdminSysMenuService;

  @(CreateApiDoc()
    .summary('获取对应权限的菜单列表')
    .respond(200, '', 'json', {
      example: GetMenuListExample,
    })
    .build())
  @Get('/list')
  async list(): Promise<ResOp> {
    return res({
      data: await this.adminSysMenuService.getMenus(this.ctx.admin.uid),
    });
  }

  @(CreateApiDoc()
    .summary('新增菜单或权限')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/add')
  @Validate()
  async add(@Body(ALL) dto: CreateMenuDto): Promise<ResOp> {
    if (dto.type === 2 && dto.parentId === -1) {
      // 无法直接创建权限，必须有ParentId
      return res({ code: 10005 });
    }
    if (dto.type === 1 && dto.parentId !== -1) {
      const parent = await this.adminSysMenuService.getMenuItemInfo(
        dto.parentId
      );
      if (isEmpty(parent)) {
        return res({ code: 10014 });
      }
      if (parent && parent.type === 1) {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        return res({ code: 10006 });
      }
    }
    if (dto.parentId === -1) {
      dto.parentId = undefined;
    }
    await this.adminSysMenuService.save(dto);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.adminSysMenuService.refreshOnlineUserPerms();
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('更新菜单或权限')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/update')
  @Validate()
  async update(@Body(ALL) dto: UpdateMenuDto): Promise<ResOp> {
    if (dto.type === 2 && dto.parentId === -1) {
      // 无法直接创建权限，必须有ParentId
      return res({ code: 10005 });
    }
    if (dto.type === 1 && dto.parentId !== -1) {
      const parent = await this.adminSysMenuService.getMenuItemInfo(
        dto.parentId
      );
      if (isEmpty(parent)) {
        return res({ code: 10014 });
      }
      if (parent && parent.type === 1) {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        return res({ code: 10006 });
      }
    }
    if (dto.parentId === -1) {
      dto.parentId = undefined;
    }
    const insertData: CreateMenuDto & { id: number } = {
      ...dto,
      id: dto.menuId,
    };
    await this.adminSysMenuService.save(insertData);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.adminSysMenuService.refreshOnlineUserPerms();
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('删除菜单或权限')
    .respond(200, '', 'json', {
      example: NormalExample,
    })
    .build())
  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) dto: DeleteMenuDto): Promise<ResOp> {
    // 如果有子目录，一并删除
    const childMenus = await this.adminSysMenuService.findChildMenus(
      dto.menuId
    );
    await this.adminSysMenuService.deleteMenuItem(
      flattenDeep([dto.menuId, childMenus])
    );
    await this.adminSysMenuService.refreshOnlineUserPerms();
    return res();
  }

  @(CreateApiDoc()
    .summary('根据ID菜单或权限信息')
    .respond(200, '', 'json', {
      example: GetMenuInfoExample,
    })
    .build())
  @Get('/info')
  @Validate()
  async info(@Query(ALL) dto: InfoMenuDto): Promise<ResOp> {
    return res({
      data: await this.adminSysMenuService.getMenuItemAndParentInfo(dto.menuId),
    });
  }
}
