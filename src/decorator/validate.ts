/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  getClassMetadata,
  getMethodParamTypes,
  RULES_KEY,
} from '@midwayjs/decorator';
import * as Joi from 'joi';
import { plainToClass } from 'class-transformer';

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
 * 增强原有的Validate，安全转换class
 */
export function Validate(isTransform = true) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const origin = descriptor.value;
    const paramTypes = getMethodParamTypes(target, propertyKey);

    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < paramTypes.length; i++) {
        const item = paramTypes[i];
        const rules = getClassMetadata(RULES_KEY, item);
        if (rules) {
          const schema = Joi.object(rules);
          const result = schema.validate(args[i]);
          if (result.error) {
            throw new ValidateError(`${result.error.message}`);
          } else {
            args[i] = result.value;
          }
          // passed
          if (isTransform) {
            args[i] = plainToClass(item, args[i], {
              excludeExtraneousValues: true,
            });
          }
        }
      }
      return origin.call(this, ...args);
    };
  };
}
