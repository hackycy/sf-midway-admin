import { Expose } from 'class-transformer';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/decorator';

export class CreateDeptDto {
  @CreateApiPropertyDoc('系统部门名称', { example: '技术部' })
  @Rule(RuleType.string().required())
  @Expose()
  departmentName: string;

  @CreateApiPropertyDoc('父级部门ID', { example: 1 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  parentDepartmentId: number;

  @CreateApiPropertyDoc('排序值必须为整数，最小为0', { example: 255 })
  @Rule(RuleType.number().integer().min(0))
  @Expose()
  orderNum: number;
}

export class UpdateDeptDto {
  @CreateApiPropertyDoc('需要更新的部门id', { example: 1 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  id: number;

  @CreateApiPropertyDoc('部门名称', { example: '技术部' })
  @Rule(RuleType.string().required())
  @Expose()
  name: string;

  @CreateApiPropertyDoc('父级部门id', { example: 2 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  parentId: number;

  @CreateApiPropertyDoc('排序编号', { example: 255 })
  @Rule(RuleType.number().integer().min(0))
  @Expose()
  orderNum: number;
}

export class DeleteDeptDto {
  @CreateApiPropertyDoc('系统部门ID', { example: 1 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;
}

export class InfoDeptDto {
  @CreateApiPropertyDoc('系统部门ID', { example: 1 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;
}

export class TransferDeptDto {
  @Rule(RuleType.array().min(1).items(RuleType.number().integer()).required())
  @Expose()
  userIds: number[];

  @CreateApiPropertyDoc('需要转移过去的系统部门ID', { example: 1 })
  @Rule(RuleType.number().integer().required())
  @Expose()
  departmentId: number;
}
