import {
  Length,
  IsString,
  IsIn,
  IsDate,
  IsInt,
  Validate,
  IsOptional,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import * as parser from 'cron-parser';

// cron 表达式验证，bull lib下引用了cron-parser
@ValidatorConstraint({ name: 'isCronExpression', async: false })
export class IsCronExpression implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(text: string, args: ValidationArguments) {
    try {
      const op: any = { iterator: true };
      let needOp = false;
      if ((args.object as any).startTime) {
        needOp = true;
        op.startDate = (args.object as any).startTime;
      }
      if ((args.object as any).endTime) {
        needOp = true;
        op.endDate = (args.object as any).endTime;
      }
      if (needOp) {
        const tmp = parser.parseExpression(text, op);
        if (!tmp.hasNext()) {
          throw new Error();
        }
      } else {
        parser.parseExpression(text);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'this cron expression ($value) invalid';
  }
}

export class CreateTaskDto {
  @Length(2, 50)
  @Expose()
  name: string;

  @IsString()
  @Expose()
  service: string;

  @IsIn([0, 1])
  @Expose()
  type: number;

  @IsIn([0, 1, 2])
  @Expose()
  status: number;

  @ValidateIf((_o, v) => {
    return !(v === '' || v === undefined || v === null);
  })
  @IsDate()
  @Expose()
  @Transform(
    value => {
      if (value) {
        return new Date(value);
      }
      return null;
    },
    { toClassOnly: true }
  )
  startTime: Date;

  @ValidateIf((_o, v) => {
    return !(v === '' || v === undefined || v === null);
  })
  @IsDate()
  @Expose()
  @Transform(
    value => {
      if (value) {
        return new Date(value);
      }
      return null;
    },
    { toClassOnly: true }
  )
  endTime: Date;

  @IsInt()
  @IsOptional()
  @Expose()
  limit: number;

  @ValidateIf(o => {
    return o.type === 0;
  })
  @Validate(IsCronExpression)
  @Expose()
  cron: string;

  @IsInt()
  @ValidateIf(o => {
    return o.type === 1;
  })
  @Expose()
  every: number;

  @IsOptional()
  @IsString()
  @Expose()
  data: string;

  @IsOptional()
  @IsString()
  @Expose()
  remark: string;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsInt()
  @Expose()
  id: number;
}

export class CheckIdTaskDto {
  @IsInt()
  @Expose()
  id: number;
}
