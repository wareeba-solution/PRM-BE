var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ValidationPipe_1;
import { Injectable, BadRequestException, Logger, } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
let ValidationPipe = ValidationPipe_1 = class ValidationPipe {
    constructor() {
        this.logger = new Logger(ValidationPipe_1.name);
    }
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            validationError: {
                target: false,
                value: false,
            },
        });
        if (errors.length > 0) {
            const formattedErrors = this.formatErrors(errors);
            this.logger.warn(`Validation failed: ${JSON.stringify(formattedErrors)}`);
            throw new BadRequestException({
                message: 'Validation failed',
                errors: formattedErrors,
            });
        }
        return object;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    formatErrors(errors) {
        return errors.reduce((acc, error) => {
            if (error.children && error.children.length > 0) {
                acc[error.property] = this.formatErrors(error.children);
            }
            else if (error.constraints) {
                acc[error.property] = Object.values(error.constraints)[0];
            }
            return acc;
        }, {});
    }
};
ValidationPipe = ValidationPipe_1 = __decorate([
    Injectable()
], ValidationPipe);
export { ValidationPipe };
//# sourceMappingURL=validation.pipe.js.map