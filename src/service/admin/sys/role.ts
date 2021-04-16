import { Config, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import SysRole from '../../../entity/admin/sys/role';
import { BaseService } from '../../base';
import { Repository, Not, In } from 'typeorm';
import SysRoleMenu from '../../../entity/admin/sys/role_menu';
import SysRoleDepartment from '../../../entity/admin/sys/role_department';
import { IAddRoleResult, IRoleInfoResult } from '../interface';
import { includes, difference, filter, isEmpty, map } from 'lodash';
import { CreateRoleDto, UpdateRoleDto } from '../../../dto/admin/sys/role';
import SysUserRole from '../../../entity/admin/sys/user_role';

@Provide()
export class AdminSysRoleService extends BaseService {
  @InjectEntityModel(SysRole)
  role: Repository<SysRole>;

  @InjectEntityModel(SysRoleMenu)
  roleMenu: Repository<SysRoleMenu>;

  @InjectEntityModel(SysRoleDepartment)
  roleDepartment: Repository<SysRoleDepartment>;

  @InjectEntityModel(SysUserRole)
  userRole: Repository<SysUserRole>;

  @Config('rootRoleId')
  rootRoleId: number;

  /**
   * 列举所有角色：除去超级管理员
   */
  async list(): Promise<SysRole[]> {
    const result = await this.role.find({ id: Not(this.rootRoleId) });
    return result;
  }

  /**
   * 列举所有角色条数：除去超级管理员
   */
  async count(): Promise<number> {
    const count = await this.role.count({ id: Not(this.rootRoleId) });
    return count;
  }

  /**
   * 根据角色获取角色信息
   */
  async info(rid: number): Promise<IRoleInfoResult> {
    const roleInfo = await this.role.findOne({ id: rid });
    const menus = await this.roleMenu.find({ roleId: rid });
    const depts = await this.roleDepartment.find({ roleId: rid });
    return { roleInfo, menus, depts };
  }

  /**
   * 根据角色Id数组删除
   */
  async delete(roleIds: number[]): Promise<void> {
    if (includes(roleIds, this.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    await this.getManager().transaction(async manager => {
      await manager.delete(SysRole, roleIds);
      await manager.delete(SysRoleMenu, { roleId: In(roleIds) });
      await manager.delete(SysRoleDepartment, { roleId: In(roleIds) });
      // TODO：需要连同用户一并删除
    });
  }

  /**
   * 增加角色
   */
  async add(param: CreateRoleDto, uid: number): Promise<IAddRoleResult> {
    const { name, label, remark, menus, depts } = param;
    const role = await this.role.insert({
      name,
      label,
      remark,
      userId: `${uid}`,
    });
    const { identifiers } = role;
    const roleId = parseInt(identifiers[0].id);
    if (menus && menus.length > 0) {
      // 关联菜单
      const insertRows = menus.map(m => {
        return {
          roleId,
          menuId: m,
        };
      });
      await this.roleMenu.insert(insertRows);
    }
    if (depts && depts.length > 0) {
      // 关联部门
      const insertRows = depts.map(d => {
        return {
          roleId,
          departmentId: d,
        };
      });
      await this.roleDepartment.insert(insertRows);
    }
    return { roleId };
  }

  /**
   * 更新角色信息
   */
  async update(param: UpdateRoleDto): Promise<SysRole> {
    const { roleId, name, label, remark, menus, depts } = param;
    const role = await this.role.save({ id: roleId, name, label, remark });
    const originDeptRows = await this.roleDepartment.find({ roleId });
    const originMenuRows = await this.roleMenu.find({ roleId });
    const originMenuIds = originMenuRows.map(e => {
      return e.menuId;
    });
    const originDeptIds = originDeptRows.map(e => {
      return e.departmentId;
    });
    // 开始对比差异
    const insertMenusRowIds = difference(menus, originMenuIds);
    const deleteMenusRowIds = difference(originMenuIds, menus);
    const insertDeptRowIds = difference(depts, originDeptIds);
    const deleteDeptRowIds = difference(originDeptIds, depts);
    // using transaction
    await this.getManager().transaction(async manager => {
      // 菜单
      if (insertMenusRowIds.length > 0) {
        // 有条目更新
        const insertRows = insertMenusRowIds.map(e => {
          return {
            roleId,
            menuId: e,
          };
        });
        await manager.insert(SysRoleMenu, insertRows);
      }
      if (deleteMenusRowIds.length > 0) {
        // 有条目需要删除
        const realDeleteRowIds = filter(originMenuRows, e => {
          return includes(deleteMenusRowIds, e.menuId);
        }).map(e => {
          return e.id;
        });
        await manager.delete(SysRoleMenu, realDeleteRowIds);
      }
      // 部门
      if (insertDeptRowIds.length > 0) {
        // 有条目更新
        const insertRows = insertDeptRowIds.map(e => {
          return {
            roleId,
            departmentId: e,
          };
        });
        await manager.insert(SysRoleDepartment, insertRows);
      }
      if (deleteDeptRowIds.length > 0) {
        // 有条目需要删除
        const realDeleteRowIds = filter(originDeptRows, e => {
          return includes(deleteDeptRowIds, e.departmentId);
        }).map(e => {
          return e.id;
        });
        await manager.delete(SysRoleDepartment, realDeleteRowIds);
      }
    });
    return role;
  }

  /**
   * 分页加载角色信息
   */
  async page(page: number, count: number): Promise<SysRole[]> {
    const result = await this.role.find({
      where: {
        id: Not(this.rootRoleId),
      },
      order: {
        id: 'ASC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdByUser(id: number): Promise<number[]> {
    const result = await this.userRole.find({
      where: {
        userId: id,
      },
    });
    if (!isEmpty(result)) {
      return map(result, v => {
        return v.roleId;
      });
    }
    return [];
  }

  /**
   * 根据角色ID列表查找关联用户ID
   */
  async countUserIdByRole(ids: number[]): Promise<number | never> {
    if (includes(ids, this.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    return await this.userRole.count({ roleId: In(ids) });
  }
}
