import { getMethodParamTypes } from '@midwayjs/decorator';
import { validateSync, ValidatorOptions } from 'class-validator';
import { ClassTransformOptions, plainToClass } from 'class-transformer';

export function Validate(
  classTransformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
  },
  validatorOptions?: ValidatorOptions
) {
  return function (
    target,
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
            throw Error(
              `validate error, parameter ${errors[0].property} is invalid `
            );
          }
        } else {
          throw Error('validate error, args is undefined');
        }
      }
      return origin.call(this, ...args);
    };
  };
}