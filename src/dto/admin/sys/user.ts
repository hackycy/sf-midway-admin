import {
  IsInt,
  Length,
  Matches,
  Allow,
  IsEmail,
  ArrayNotEmpty,
  ValidateIf,
  IsOptional,
  IsIn,
  IsNumberString,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PageGetDto } from '../../comm';

export class CreateUserDto {
  @IsInt()
  @Expose()
  departmentId: number;

  @Length(2)
  @Expose()
  name: string;

  @Matches(/^[a-z0-9A-Z]+$/)
  @Length(6, 20)
  @Expose()
  username: string;

  @Allow()
  @Expose()
  nickName: string;

  @ArrayNotEmpty()
  @Expose()
  roles: number[];

  @Allow()
  @Expose()
  remark: string;

  @ValidateIf((_o, v) => {
    return !(v === '' || v === undefined || v === null);
  })
  @IsEmail()
  @Expose()
  email: string;

  @Allow()
  @Expose()
  phone: string;

  @IsOptional()
  @IsIn([0, 1])
  @Expose()
  status: number;
}

export class UpdateUserDto extends CreateUserDto {
  @IsInt()
  @Expose()
  id: number;
}

export class InfoUserDto {
  @IsNumberString()
  @Expose()
  userId: string;
}

export class DeleteUserDto {
  @ArrayNotEmpty()
  @Expose()
  userIds: number[];
}

export class QueryUserDto extends PageGetDto {
  @IsNumberString()
  @Expose()
  departmentId: string;
}
