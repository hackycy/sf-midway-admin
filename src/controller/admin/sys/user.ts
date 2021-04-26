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
import { res, resByPage } from '../../../common/utils';
import {
  CreateUserDto,
  DeleteUserDto,
  InfoUserDto,
  PageUserDto,
  PasswordUserDto,
  UpdateUserDto,
} from '../../../dto/admin/sys/user';
import { ResOp } from '../../../interface';
import { AdminSysMenuService } from '../../../service/admin/sys/menu';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import {
  GetAdminUserInfoExample,
  GetUserInDeptByPageExample,
} from '../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/sys/user`, {
  tagName: 'AdminSysUser',
  description: '后台系统管理员控制器',
})
export class AdminSysUserController extends BaseController {
  @Inject()
  adminSysUserService: AdminSysUserService;

  @Inject()
  adminSysMenuService: AdminSysMenuService;

  @(CreateApiDoc()
    .summary('新增系统管理员')
    .respond(200, '', 'json', { example: res() })
    .build())
  @Post('/add')
  @Validate()
  async add(@Body(ALL) dto: CreateUserDto): Promise<ResOp> {
    const result = await this.adminSysUserService.add(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @(CreateApiDoc()
    .summary('获取系统用户信息')
    .respond(200, '', 'json', {
      example: GetAdminUserInfoExample,
    })
    .build())
  @Get('/info')
  @Validate()
  async info(@Query(ALL) dto: InfoUserDto): Promise<ResOp> {
    return res({
      data: await this.adminSysUserService.info(dto.userId),
    });
  }

  @(CreateApiDoc()
    .summary('删除系统管理员')
    .respond(200, '', 'json', { example: res() })
    .build())
  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) dto: DeleteUserDto): Promise<ResOp> {
    await this.adminSysUserService.delete(dto.userIds);
    await this.adminSysUserService.multiForbidden(dto.userIds);
    return res();
  }

  @(CreateApiDoc()
    .summary('分页查询某个部门下的所有管理员')
    .respond(200, '', 'json', {
      example: GetUserInDeptByPageExample,
    })
    .build())
  @Post('/page')
  @Validate()
  async page(@Body(ALL) dto: PageUserDto): Promise<ResOp> {
    const list = await this.adminSysUserService.page(
      this.ctx.admin.uid,
      dto.departmentIds,
      dto.page - 1,
      dto.limit
    );
    const total = await this.adminSysUserService.count(
      this.ctx.admin.uid,
      dto.departmentIds
    );
    return resByPage(list, total, dto.page, dto.limit);
  }

  @(CreateApiDoc()
    .summary('更新系统管理员')
    .respond(200, '', 'json', { example: res() })
    .build())
  @Post('/update')
  @Validate()
  async update(@Body(ALL) dto: UpdateUserDto): Promise<ResOp> {
    await this.adminSysUserService.update(dto);
    await this.adminSysMenuService.refreshPerms(dto.id);
    return res();
  }

  @(CreateApiDoc()
    .summary('更改管理员密码')
    .param('需要更改的管理员密码参数')
    .respond(200, '', 'json', {
      example: res(),
    })
    .build())
  @Post('/password')
  @Validate()
  async password(@Body(ALL) dto: PasswordUserDto): Promise<ResOp> {
    await this.adminSysUserService.forceUpdatePassword(
      dto.userId,
      dto.password
    );
    return res();
  }
}
