import { ALL } from '@midwayjs/decorator';
import { Inject, Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Validate } from '../decorator/validate';
import { Id } from '../dto/id';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  @Validate()
  async getUser(@Query(ALL) uid: Id): Promise<any> {
    return { success: true, message: 'OK', data: uid.sid };
  }
}
