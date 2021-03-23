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
import { res } from '../../../common/utils';
import { AdminController } from '../../../decorator/controller';
import { Validate } from '../../../decorator/validate';
import {
  CreateDeptDto,
  DeleteDeptDto,
  InfoDeptDto,
  TransferDeptDto,
  UpdateDeptDto,
} from '../../../dto/admin/sys/dept';
import { ResOp } from '../../../interface';
import { AdminSysDeptService } from '../../../service/admin/sys/dept';
import { BaseController } from '../../base';

@Provide()
@AdminController('/sys/dept', {
  tagName: 'AdminSysDept',
  description: '后台系统部门控制器',
})
export class AdminSysDeptController extends BaseController {
  @Inject()
  adminSysDeptService: AdminSysDeptService;

  @(CreateApiDoc()
    .summary('获取系统部门列表')
    .respond(200, '', 'json', {
      example: res({
        data: [
          {
            createTime: '2020-08-27T03:33:19.000Z',
            updateTime: '2020-08-27T03:33:19.000Z',
            id: 1,
            parentId: 2,
            name: '思忆技术',
            orderNum: 0,
          },
        ],
      }),
    })
    .build())
  @Get('/list')
  async list(): Promise<ResOp> {
    return res({
      data: await this.adminSysDeptService.getDepts(this.ctx.admin.uid),
    });
  }

  @(CreateApiDoc()
    .summary('创建系统部门')
    .param('创建系统部门参数')
    .respond(200, '', 'json', { example: res() })
    .build())
  @Post('/add')
  @Validate()
  async add(@Body(ALL) createDeptDto: CreateDeptDto): Promise<ResOp> {
    await this.adminSysDeptService.add(
      createDeptDto.departmentName,
      createDeptDto.parentDepartmentId
    );
    return res();
  }

  @(CreateApiDoc()
    .summary('删除系统部门')
    .param('删除系统部门参数')
    .respond(200, '', 'json', { example: res() })
    .build())
  @Post('/delete')
  @Validate()
  async delete(@Body(ALL) deleteDeptDto: DeleteDeptDto): Promise<ResOp> {
    // 查询是否有关联用户或者部门，如果含有则无法删除
    const count = await this.adminSysDeptService.countUserByDeptId(
      deleteDeptDto.departmentId
    );
    if (count > 0) {
      return res({ code: 10009 });
    }
    const count2 = await this.adminSysDeptService.countRoleByDeptId(
      deleteDeptDto.departmentId
    );
    if (count2 > 0) {
      return res({ code: 10010 });
    }
    await this.adminSysDeptService.delete(deleteDeptDto.departmentId);
    return res();
  }

  @(CreateApiDoc()
    .summary('查询单个系统部门信息')
    .param('系统部门参数')
    .respond(200, '', 'json', {
      example: res({
        data: {
          department: {
            createTime: '2020-09-08T05:31:32.426Z',
            updateTime: '2020-10-07T04:25:31.000Z',
            id: 2,
            parentId: 1,
            name: 'xxx部门',
            orderNum: 0,
          },
          parentDepartment: {
            createTime: '2020-08-27T03:33:19.000Z',
            updateTime: '2020-08-27T03:33:19.000Z',
            id: 1,
            parentId: null,
            name: 'xxx部门',
            orderNum: 0,
          },
        },
      }),
    })
    .build())
  @Get('/info')
  @Validate()
  async info(@Query(ALL) infoDeptDto: InfoDeptDto): Promise<ResOp> {
    return res({
      data: await this.adminSysDeptService.info(infoDeptDto.departmentId),
    });
  }

  @(CreateApiDoc()
    .summary('更新系统部门')
    .respond(200, '', 'json', { example: res() })
    .param('更新部门信息参数')
    .build())
  @Post('/update')
  @Validate()
  async update(@Body(ALL) updateDeptDto: UpdateDeptDto): Promise<ResOp> {
    await this.adminSysDeptService.update(updateDeptDto);
    return res();
  }

  @(CreateApiDoc()
    .summary('管理员部门转移')
    .respond(200, '', 'json', { example: res() })
    .param('转移参数')
    .build())
  @Post('/transfer')
  @Validate()
  async transfer(@Body(ALL) transferDeptDto: TransferDeptDto): Promise<ResOp> {
    await this.adminSysDeptService.transfer(
      transferDeptDto.userIds,
      transferDeptDto.departmentId
    );
    return res();
  }
}
