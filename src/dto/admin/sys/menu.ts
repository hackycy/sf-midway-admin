import {
  IsInt,
  Min,
  Max,
  MinLength,
  IsString,
  IsBoolean,
  Allow,
  IsNumberString,
  ValidateIf,
} from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * 增加菜单
 */
export class CreateMenuDto {
  @IsInt()
  @Min(0)
  @Max(2)
  @Expose()
  type: number;

  @IsInt()
  @Expose()
  parentId: number;

  @MinLength(2)
  @Expose()
  name: string;

  @IsInt()
  @Min(0)
  @Expose()
  orderNum: number;

  @ValidateIf(o => {
    return o.type === 1 || o.type === 0;
  })
  @IsString()
  @Expose()
  router: string;

  @ValidateIf(o => {
    return o.type === 1 || o.type === 0;
  })
  @IsBoolean()
  @Expose()
  isShow: boolean;

  @ValidateIf(o => {
    return o.type === 1 || o.type === 0;
  })
  @IsBoolean()
  @Expose()
  keepalive: boolean;

  @ValidateIf(o => {
    return o.type === 1 || o.type === 0;
  })
  @IsString()
  @Expose()
  icon: string;

  @ValidateIf(o => {
    return o.type === 2;
  })
  @IsString()
  @Expose()
  perms: string;

  @Allow()
  @Expose()
  viewPath: string;
}

export class UpdateMenuDto extends CreateMenuDto {
  @IsInt()
  @Expose()
  menuId: number;
}

/**
 * 删除菜单
 */
export class DeleteMenuDto {
  @IsInt()
  @Expose()
  menuId: number;
}

/**
 * 查询菜单
 */
export class InfoMenuDto {
  @IsNumberString()
  @Expose()
  menuId: string;
}
