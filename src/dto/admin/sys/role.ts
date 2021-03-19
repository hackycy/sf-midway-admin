import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';

export class DeleteRoleDto {
  @Rule(RuleType.array().items(RuleType.number()).min(1))
  @Expose()
  roleIds: number[];
}

export class CreateRoleDto {
  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;

  @Rule(
    RuleType.string()
      .pattern(/^[a-z0-9A-Z]+$/)
      .required()
  )
  @Expose()
  label: string;

  @Rule(RuleType.string())
  @Expose()
  remark: string;

  @Rule(RuleType.array().items(RuleType.number()).min(0).optional())
  @Expose()
  menus: number[];

  @Rule(RuleType.array().items(RuleType.number()).min(0).optional())
  @Expose()
  depts: number[];
}

@Rule(CreateRoleDto)
export class UpdateRoleDto extends CreateRoleDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  roleId: number;
}

export class InfoRoleDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  roleId: number;
}
