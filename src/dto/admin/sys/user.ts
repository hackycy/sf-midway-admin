import { Expose } from 'class-transformer';
import { PageSearchDto } from '../../comm';
import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class CreateUserDto {
  @CreateApiPropertyDoc('关联系统部门ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;

  @CreateApiPropertyDoc('管理员名称')
  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;

  @CreateApiPropertyDoc('管理员登录账号')
  @Rule(
    RuleType.string()
      .min(6)
      .max(20)
      .pattern(/^[a-z0-9A-Z]+$/)
      .required()
  )
  @Expose()
  username: string;

  @CreateApiPropertyDoc('管理员别名')
  @Rule(RuleType.string().empty('').optional())
  @Expose()
  nickName: string;

  @Rule(RuleType.array().items(RuleType.number()).min(1).max(3).required())
  @Expose()
  roles: number[];

  @CreateApiPropertyDoc('备注')
  @Rule(RuleType.string().empty('').optional())
  @Expose()
  remark: string;

  @CreateApiPropertyDoc('邮箱')
  @Rule(RuleType.string().empty('').email().optional())
  @Expose()
  email: string;

  @CreateApiPropertyDoc('手机号码')
  @Rule(RuleType.string().empty('').optional())
  @Expose()
  phone: string;

  @CreateApiPropertyDoc('状态是否可用')
  @Rule(RuleType.number().integer().valid(0, 1).optional())
  @Expose()
  status: number;
}

@Rule(CreateUserDto)
export class UpdateUserDto extends CreateUserDto {
  @CreateApiPropertyDoc('需要更新的管理员ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}

export class InfoUserDto {
  @CreateApiPropertyDoc('需要查询的管理员ID')
  @Rule(RuleType.number().integer().required())
  @Expose()
  userId: number;
}

export class DeleteUserDto {
  @Rule(RuleType.array().items(RuleType.number()).min(1).required())
  @Expose()
  userIds: number[];
}

@Rule(PageSearchDto)
export class PageUserDto extends PageSearchDto {
  @Rule(RuleType.array().items(RuleType.number()).min(1).optional())
  @Expose()
  departmentIds: number[];
}
