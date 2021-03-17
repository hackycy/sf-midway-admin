import {
  Length,
  IsString,
  IsEmail,
  ValidateIf,
  Allow,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class LoginImageCaptchaDto {
  @CreateApiPropertyDoc('验证码宽度', { example: '100' })
  @IsOptional()
  @IsNumberString()
  @Expose()
  width: string;

  @CreateApiPropertyDoc('验证码高度', { example: '50' })
  @IsOptional()
  @IsNumberString()
  @Expose()
  height: string;
}

export class LoginInfoDto {
  @CreateApiPropertyDoc('管理员用户名', { example: 'root' })
  @IsString()
  @Expose()
  username: string;

  @CreateApiPropertyDoc('管理员密码', { example: '123456' })
  @IsString()
  @Expose()
  password: string;

  @CreateApiPropertyDoc('验证码标识ID', { example: '0CRq2jthWUp7DiLCftB-P' })
  @IsString()
  @Expose()
  captchaId: string;

  @CreateApiPropertyDoc('登录验证码', { example: 'xfDp' })
  @Length(4)
  @Expose()
  verifyCode: string;
}

export class UpdatePersonInfoDto {
  @CreateApiPropertyDoc('管理员名称', { example: 'hackycy' })
  @Length(2, 20)
  @Expose()
  name: string;

  @CreateApiPropertyDoc('管理员昵称', { example: '源b' })
  @Allow()
  @Expose()
  nickName: string;

  @CreateApiPropertyDoc('邮箱', { example: 'qa894178522@qq.com' })
  @ValidateIf((_o, v) => {
    return !(v === '' || v === undefined || v === null);
  })
  @IsEmail()
  @Expose()
  email: string;

  @CreateApiPropertyDoc('手机号码', { example: '13124314551' })
  @Allow()
  @Expose()
  phone: string;

  @CreateApiPropertyDoc('更改前的密码', { example: '123456' })
  @Allow()
  @Expose()
  originPassword: string;

  @CreateApiPropertyDoc('新密码', { example: '12345678' })
  @Allow()
  @Expose()
  newPassword: string;

  @CreateApiPropertyDoc('备注', { example: '这是xxx管理员的备注' })
  @Allow()
  @Expose()
  remark: string;

  @CreateApiPropertyDoc('头像连接', { example: 'https://img.png' })
  @Allow()
  @Expose()
  headImg: string;
}
