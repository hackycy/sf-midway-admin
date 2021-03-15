import {
  CONTROLLER_KEY,
  saveModule,
  saveClassMetadata,
  MiddlewareParamArray,
  ControllerOption,
  ScopeEnum,
  Scope,
} from '@midwayjs/decorator';

export function AdminController(
  prefix: string,
  routerOptions: {
    sensitive?: boolean;
    middleware?: MiddlewareParamArray;
    description?: string;
    tagName?: string;
  } = { middleware: [], sensitive: true }
): ClassDecorator {
  return (target: any) => {
    saveModule(CONTROLLER_KEY, target);
    saveClassMetadata(
      CONTROLLER_KEY,
      {
        prefix: `/admin${prefix}`,
        routerOptions,
      } as ControllerOption,
      target
    );
    Scope(ScopeEnum.Request)(target);
  };
}
