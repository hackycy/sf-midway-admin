import { Expose } from 'class-transformer';
import { PageSearchDto } from '../../comm';
import { Rule, RuleType } from '@midwayjs/decorator';

export class CreateUserDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;

  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;

  @Rule(
    RuleType.string()
      .min(6)
      .max(20)
      .pattern(/^[a-z0-9A-Z]+$/)
      .required()
  )
  @Expose()
  username: string;

  @Rule(RuleType.string())
  @Expose()
  nickName: string;

  @Rule(RuleType.array().items(RuleType.number()).min(1).required())
  @Expose()
  roles: number[];

  @Rule(RuleType.string())
  @Expose()
  remark: string;

  @Rule(RuleType.string().email().optional())
  @Expose()
  email: string;

  @Rule(RuleType.string())
  @Expose()
  phone: string;

  @Rule(RuleType.number().integer().valid(0, 1).optional())
  @Expose()
  status: number;
}

@Rule(CreateUserDto)
export class UpdateUserDto extends CreateUserDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;
}

export class InfoUserDto {
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
export class QueryUserDto extends PageSearchDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;
}
