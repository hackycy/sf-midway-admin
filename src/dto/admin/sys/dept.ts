import {
  IsInt,
  IsNumberString,
  // ArrayNotEmpty,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/decorator';

export class CreateDeptDto {
  @CreateApiPropertyDoc('系统部门名称', { example: '技术部' })
  @IsString()
  @Expose()
  departmentName: string;

  @CreateApiPropertyDoc('父级部门ID', { example: 1 })
  @IsInt()
  @Expose()
  parentDepartmentId: number;

  @CreateApiPropertyDoc('排序值必须为整数，最小为0', { example: 255 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose()
  orderNum: number;
}

export class UpdateDeptDto {
  @CreateApiPropertyDoc('需要更新的部门id', { example: 1 })
  @IsInt()
  @Expose()
  id: number;

  @CreateApiPropertyDoc('部门名称', { example: '技术部' })
  @IsString()
  @Expose()
  name: string;

  @CreateApiPropertyDoc('父级部门id', { example: 2 })
  @IsInt()
  @Expose()
  parentId: number;

  @CreateApiPropertyDoc('排序编号', { example: 255 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose()
  orderNum: number;
}

export class DeleteDeptDto {
  @CreateApiPropertyDoc('系统部门ID', { example: 1 })
  @IsInt()
  @Expose()
  departmentId: number;
}

export class InfoDeptDto {
  @CreateApiPropertyDoc('系统部门ID', { example: 1 })
  @IsNumberString()
  @Expose()
  departmentId: string;
}

export class TransferDeptDto {
  @Rule(RuleType.array().min(1).items(RuleType.number()).required())
  @Expose()
  userIds: number[];

  @Rule(RuleType.number().required())
  @Expose()
  departmentId: number;
}
