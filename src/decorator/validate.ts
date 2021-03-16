/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getMethodParamTypes } from '@midwayjs/decorator';
import { validateSync, ValidatorOptions } from 'class-validator';
import { ClassTransformOptions, plainToClass } from 'class-transformer';

export class ValidateError extends Error {
  property: string;
  status: number;

  constructor(msg: string, property?: string) {
    super(msg);
    this.property = property;
    this.status = 422;
  }
}

/**
 * 自定义Validate注解，基于class-validator
 * @param classTransformOptions 等同于ClassTransformOptions
 * @param validatorOptions 等同于ValidatorOptions
 */
export function Validate(
  classTransformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
  },
  validatorOptions?: ValidatorOptions
) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const origin = descriptor.value;
    const paramTypes = getMethodParamTypes(target, propertyKey);

    const originValidatorOptions = {
      validationError: { target: false },
      forbidUnknownValues: true,
      whitelist: true,
      skipMissingProperties: false,
      forbidNonWhitelisted: false,
    };

    // merge option
    if (validatorOptions) {
      Object.assign(originValidatorOptions, validatorOptions);
    }

    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < paramTypes.length; i++) {
        const type = paramTypes[i];
        args[i] = plainToClass(type, args[i], classTransformOptions);

        if (args[i]) {
          const errors = validateSync(args[i], originValidatorOptions);
          if (errors && errors.length > 0) {
            throw new ValidateError(
              `validate error, parameter ${errors[0].property} is invalid`,
              errors[0].property
            );
          }
        } else {
          throw new ValidateError('validate error, args is undefined');
        }
      }
      return origin.call(this, ...args);
    };
  };
}
