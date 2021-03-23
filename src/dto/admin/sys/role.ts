import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class DeleteRoleDto {
  @Rule(RuleType.array().items(RuleType.number()).min(1))
  @Expose()
  roleIds: number[];
}

export class CreateRoleDto {
  @CreateApiPropertyDoc('角色名称')
  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;

  @CreateApiPropertyDoc('角色唯一标识')
  @Rule(
    RuleType.string()
      .pattern(/^[a-z0-9A-Z]+$/)
      .required()
  )
  @Expose()
  label: string;

  @CreateApiPropertyDoc('角色备注')
  @Rule(RuleType.string())
  @Expose()
  remark: string;

  @CreateApiPropertyDoc('角色关联权限')
  @Rule(RuleType.array().items(RuleType.number()).min(0).optional())
  @Expose()
  menus: number[];

  @CreateApiPropertyDoc('角色关联部门')
  @Rule(RuleType.array().items(RuleType.number()).min(0).optional())
  @Expose()
  depts: number[];
}

@Rule(CreateRoleDto)
export class UpdateRoleDto extends CreateRoleDto {
  @CreateApiPropertyDoc('需要更新的角色ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  roleId: number;
}

export class InfoRoleDto {
  @CreateApiPropertyDoc('需要查找的角色ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  roleId: number;
}
