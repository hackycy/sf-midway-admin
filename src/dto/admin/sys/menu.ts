import { Expose } from 'class-transformer';
import { Rule, RuleType } from '@midwayjs/decorator';

/**
 * 增加菜单
 */
export class CreateMenuDto {
  @Rule(RuleType.number().integer().min(0).max(2).required())
  @Expose()
  type: number;

  @Rule(RuleType.number().integer().required())
  @Expose()
  parentId: number;

  @Rule(RuleType.string().min(2).required())
  @Expose()
  name: string;

  @Rule(RuleType.number().integer().min(0))
  @Expose()
  orderNum: number;

  @Rule(
    RuleType.string().when('type', {
      switch: [
        {
          is: 1,
          then: RuleType.required(),
        },
        {
          is: 0,
          then: RuleType.required(),
        },
      ],
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  router: string;

  @Rule(
    RuleType.boolean().when('type', {
      switch: [
        {
          is: 1,
          then: RuleType.required(),
        },
        {
          is: 0,
          then: RuleType.required(),
        },
      ],
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  isShow: boolean;

  @Rule(
    RuleType.boolean().when('type', {
      switch: [
        {
          is: 1,
          then: RuleType.required(),
        },
        {
          is: 0,
          then: RuleType.required(),
        },
      ],
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  keepalive: boolean;

  @Rule(
    RuleType.string().when('type', {
      switch: [
        {
          is: 1,
          then: RuleType.required(),
        },
        {
          is: 0,
          then: RuleType.required(),
        },
      ],
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  icon: string;

  @Rule(
    RuleType.string().when('type', {
      is: 2,
      then: RuleType.required(),
      otherwise: RuleType.optional(),
    })
  )
  @Expose()
  perms: string;

  @Rule(RuleType.string())
  @Expose()
  viewPath: string;
}

@Rule(CreateMenuDto)
export class UpdateMenuDto extends CreateMenuDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  menuId: number;
}

/**
 * 删除菜单
 */
export class DeleteMenuDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  menuId: number;
}

/**
 * 查询菜单
 */
export class InfoMenuDto {
  @Rule(RuleType.number().integer().required())
  @Expose()
  menuId: number;
}
