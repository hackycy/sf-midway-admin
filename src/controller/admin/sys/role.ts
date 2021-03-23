import {
  ALL,
  Body,
  Get,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { res, resByPage } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import {
  CreateRoleDto,
  DeleteRoleDto,
  InfoRoleDto,
  UpdateRoleDto,
} from '../../../dto/admin/sys/role';
import { PageSearchDto } from '../../../dto/comm';
import { ResOp } from '../../../interface';
import { AdminSysMenuService } from '../../../service/admin/sys/menu';
import { AdminSysRoleService } from '../../../service/admin/sys/role';
import { BaseController } from '../../base';
import {
  GetRoleInfoExample,
  GetRoleListByPageExample,
  GetRoleListExample,
  NormalExample,
} from '../../swagger';

@Provide()
@AdminController('/sys/role', {
  tagName: 'AdminSysRole',
  description: '后台角色控制器',
})
export class AdminSysRoleController extends BaseController {
  @Inject()
  adminSysRoleService: AdminSysRoleService;

  @Inject()
  adminSysMenuService: AdminSysMenuService;

  @Get('/list')
  @(CreateApiDoc()
    .summary('查询所有角色信息')
    .respond(200, '', 'json', {
      example: GetRoleListExample,
    })
    .build())
  async list(): Promise<ResOp> {
    return res({
      data: await this.adminSysRoleService.list(),
    });
  }

  @(CreateApiDoc()
    .summary('分页查询角色信息')
    .respond(200, '', 'json', {
      example: GetRoleListByPageExample,
    })
    .build())
  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: PageSearchDto): Promise<ResOp> {
    const list = await this.adminSysRoleService.page(dto.page - 1, dto.limit);
    const count = await this.adminSysRoleService.count();
    return resByPage(list, count, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('删除角色')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) dto: DeleteRoleDto): Promise<ResOp> {
    const count = await this.adminSysRoleService.countUserIdByRole(dto.roleIds);
    if (count > 0) {
      return res({ code: 10008 });
    }
    await this.adminSysRoleService.role.delete(dto.roleIds);
    await this.adminSysMenuService.refreshOnlineUserPerms();
    return res();
  }

  @(CreateApiDoc()
    .summary('新增角色')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/add')
  @Validate()
  async add(@Body(ALL) dto: CreateRoleDto): Promise<ResOp> {
    await this.adminSysRoleService.add(dto, this.ctx.admin.uid);
    return res();
  }

  @(CreateApiDoc()
    .summary('更新角色')
    .respond(200, '', 'json', { example: NormalExample })
    .build())
  @Post('/update')
  @Validate()
  async update(@Body(ALL) dto: UpdateRoleDto): Promise<ResOp> {
    await this.adminSysRoleService.update(dto);
    await this.adminSysMenuService.refreshOnlineUserPerms();
    return res();
  }

  @(CreateApiDoc()
    .summary('获取角色信息')
    .respond(200, '', 'json', {
      example: GetRoleInfoExample,
    })
    .build())
  @Get('/info')
  @Validate()
  async info(@Query(ALL) dto: InfoRoleDto): Promise<ResOp> {
    return res({
      data: await this.adminSysRoleService.info(dto.roleId),
    });
  }
}
