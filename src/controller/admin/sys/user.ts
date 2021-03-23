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
  CreateUserDto,
  DeleteUserDto,
  InfoUserDto,
  QueryUserDto,
  UpdateUserDto,
} from '../../../dto/admin/sys/user';
import { ResOp } from '../../../interface';
import { AdminSysMenuService } from '../../../service/admin/sys/menu';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/user', {
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
      example: res({
        data: {
          createTime: '2020-08-27T03:38:30.000Z',
          updateTime: '2021-03-18T10:18:20.000Z',
          id: 1,
          departmentId: 2,
          name: 'xxx',
          username: 'root',
          psalt: 'xxxxxxxxxxx',
          nickName: '',
          headImg: 'http://xxx.png',
          email: 'xxx@qq.com',
          phone: '1562xxx2415',
          remark: null,
          status: 1,
          roles: [1],
          departmentName: '管理部门',
        },
      }),
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
      example: res({
        data: {
          list: [
            {
              createTime: '2020-09-14T07:41:33.732Z',
              departmentId: 2,
              email: 'xxxxx@qq.com',
              headImg: '',
              id: 2,
              name: 'xxxx',
              nickName: '',
              phone: '',
              remark: '',
              status: 0,
              updateTime: '2021-03-18T10:18:20.000Z',
              username: 'xxx001',
              departmentName: '管理部门',
            },
          ],
          pagination: {
            total: 2,
            page: 1,
            size: 10,
          },
        },
      }),
    })
    .build())
  @Get('/page')
  @Validate()
  async page(@Query(ALL) dto: QueryUserDto): Promise<ResOp> {
    const list = await this.adminSysUserService.page(
      this.ctx.admin.uid,
      dto.departmentId,
      dto.page - 1,
      dto.limit
    );
    const total = await this.adminSysUserService.count(
      this.ctx.admin.uid,
      dto.departmentId
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
}
