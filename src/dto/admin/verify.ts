import { Length, IsString, IsEmail, ValidateIf, Allow } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginInfoDto {
  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  password: string;

  @IsString()
  @Expose()
  captchaId: string;

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
