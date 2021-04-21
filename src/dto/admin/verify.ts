import { Expose } from 'class-transformer';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/decorator';

export class LoginImageCaptchaDto {
  @CreateApiPropertyDoc('验证码宽度', { example: 100 })
  @Rule(RuleType.number().integer())
  @Expose()
  width: number;

  @CreateApiPropertyDoc('验证码高度', { example: 50 })
  @Rule(RuleType.number().integer())
  @Expose()
  height: number;
}

export class LoginInfoDto {
  @CreateApiPropertyDoc('管理员用户名', { example: 'root' })
  @Rule(RuleType.string().required())
  @Expose()
  username: string;

  @CreateApiPropertyDoc('管理员密码', { example: '123456' })
  @Rule(RuleType.string().required())
  @Expose()
  password: string;

  @CreateApiPropertyDoc('验证码标识ID', { example: '0CRq2jthWUp7DiLCftB-P' })
  @Rule(RuleType.string().required())
  @Expose()
  captchaId: string;

  @CreateApiPropertyDoc('登录验证码', { example: 'xfDp' })
  @Rule(RuleType.string().max(4).min(4).required())
  @Expose()
  verifyCode: string;
}

export class UpdatePersonInfoDto {
  @CreateApiPropertyDoc('管理员昵称', { example: '源b' })
  @Rule(RuleType.string().allow('').allow(null))
  @Expose()
  nickName: string;

  @CreateApiPropertyDoc('邮箱', { example: 'qa894178522@qq.com' })
  @Rule(RuleType.string().email().allow('').allow(null))
  @Expose()
  email: string;

  @CreateApiPropertyDoc('手机号码', { example: '13124314551' })
  @Rule(RuleType.string().allow('').allow(null))
  @Expose()
  phone: string;

  @CreateApiPropertyDoc('备注', { example: '这是xxx管理员的备注' })
  @Rule(RuleType.string().allow('').allow(null))
  @Expose()
  remark: string;
}
