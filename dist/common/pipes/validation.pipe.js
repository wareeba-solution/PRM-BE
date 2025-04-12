"use strict";
// src/common/pipes/validation.pipe.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ValidationPipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ValidationPipe = ValidationPipe_1 = class ValidationPipe {
    constructor() {
        this.logger = new common_1.Logger(ValidationPipe_1.name);
    }
    async transform(value, metadata) {
        const { metatype } = metadata;
        // If no validation type is specified or the value is null, return as is
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        // Convert plain object to class instance
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        // Validate the object
        const errors = await (0, class_validator_1.validate)(object, {
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
            throw new common_1.BadRequestException({
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
            // Handle nested validation errors
            if (error.children && error.children.length > 0) {
                acc[error.property] = this.formatErrors(error.children);
            }
            // Handle direct validation errors
            else if (error.constraints) {
                acc[error.property] = Object.values(error.constraints)[0];
            }
            return acc;
        }, {});
    }
};
ValidationPipe = ValidationPipe_1 = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
// Example usage with custom validation decorators:
/*
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Custom IsPasswordStrong decorator
export function IsPasswordStrong(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPasswordStrong',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const password = value as string;
                    const hasUpperCase = /[A-Z]/.test(password);
                    const hasLowerCase = /[a-z]/.test(password);
                    const hasNumbers = /\d/.test(password);
                    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                    return (
                        password.length >= 8 &&
                        hasUpperCase &&
                        hasLowerCase &&
                        hasNumbers &&
                        hasSpecialChars
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters';
                },
            },
        });
    };
}

// Custom IsNotFutureDate decorator
export function IsNotFutureDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNotFutureDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const date = new Date(value);
                    return date <= new Date();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} cannot be a future date`;
                },
            },
        });
    };
}

// Example DTO with custom validation:
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    lastName: string;

    @IsEmail()
    email: string;

    @IsPasswordStrong()
    password: string;

    @IsNotFutureDate()
    dateOfBirth: Date;
}

// Usage in controller:
@Post()
async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
}
*/
// Example global validation pipe setup in main.ts:
/*
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: {
                target: false,
                value: false,
            },
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    await app.listen(3000);
}
*/ 
//# sourceMappingURL=validation.pipe.js.map