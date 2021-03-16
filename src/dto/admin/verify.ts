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
  @Length(2, 20)
  @Expose()
  name: string;

  @Allow()
  @Expose()
  nickName: string;

  @ValidateIf((_o, v) => {
    return !(v === '' || v === undefined || v === null);
  })
  @IsEmail()
  @Expose()
  email: string;

  @Allow()
  @Expose()
  phone: string;

  @Allow()
  @Expose()
  originPassword: string;

  @Allow()
  @Expose()
  newPassword: string;

  @Allow()
  @Expose()
  remark: string;

  @Allow()
  @Expose()
  headImg: string;
}
