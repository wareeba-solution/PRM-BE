"use strict";
// src/config/mail.config.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = exports.mailerConfig = exports.getMailConfig = exports.mailConfigValidationSchema = void 0;
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
exports.mailConfigValidationSchema = Joi.object({
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().default(587),
    MAIL_SECURE: Joi.boolean().default(false),
    MAIL_USER: Joi.string().required(),
    MAIL_PASS: Joi.string().required(),
    MAIL_FROM: Joi.string().required(),
    MAIL_FROM_NAME: Joi.string().default('PRM System'),
    MAIL_TEMPLATE_DIR: Joi.string().default('src/templates/email'),
    MAIL_QUEUE_ENABLED: Joi.boolean().default(true),
    MAIL_RETRY_ATTEMPTS: Joi.number().default(3),
    MAIL_RETRY_DELAY: Joi.number().default(1000),
    MAIL_CONCURRENCY: Joi.number().default(5),
    MAIL_RATE_LIMIT_ENABLED: Joi.boolean().default(true),
    MAIL_RATE_LIMIT_PER_HOUR: Joi.number().default(100),
});
const mailConfig = (0, config_1.registerAs)('mail', () => ({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    defaults: {
        from: `"${process.env.MAIL_FROM_NAME || 'PRM System'}" <${process.env.MAIL_FROM}>`,
    },
    template: {
        dir: process.env.MAIL_TEMPLATE_DIR || (0, path_1.join)(__dirname, '..', 'templates', 'email'),
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
    queueing: {
        enabled: process.env.MAIL_QUEUE_ENABLED === 'true',
        retryAttempts: parseInt(process.env.MAIL_RETRY_ATTEMPTS || '3', 10),
        retryDelay: parseInt(process.env.MAIL_RETRY_DELAY || '1000', 10),
        concurrency: parseInt(process.env.MAIL_CONCURRENCY || '5', 10),
    },
    rateLimit: {
        enabled: process.env.MAIL_RATE_LIMIT_ENABLED === 'true',
        maxPerHour: parseInt(process.env.MAIL_RATE_LIMIT_PER_HOUR || '100', 10),
    },
}));
exports.default = mailConfig;
// Helper function to get config without accessing process.env directly
const getMailConfig = () => {
    return mailConfig();
};
exports.getMailConfig = getMailConfig;
// Mailer module configuration
const mailerConfig = () => {
    const config = (0, exports.getMailConfig)();
    return {
        transport: {
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            },
        },
        defaults: config.defaults,
        template: config.template,
        options: {
            partials: {
                dir: (0, path_1.join)(config.template.dir, 'partials'),
                options: {
                    strict: true,
                },
            },
        },
    };
};
exports.mailerConfig = mailerConfig;
// Email templates configuration
exports.emailTemplates = {
    welcome: (name) => ({
        subject: 'Welcome to PRM System',
        template: 'welcome',
        context: { name },
    }),
    resetPassword: (token) => ({
        subject: 'Reset Your Password',
        template: 'reset-password',
        context: { token },
    }),
    appointmentReminder: (appointment) => ({
        subject: 'Appointment Reminder',
        template: 'appointment-reminder',
        context: { appointment },
    }),
    appointmentConfirmation: (appointment) => ({
        subject: 'Appointment Confirmation',
        template: 'appointment-confirmation',
        context: { appointment },
    }),
};
// Example .env file:
/*
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
MAIL_FROM=noreply@yourdomain.com
MAIL_FROM_NAME=PRM System
MAIL_TEMPLATE_DIR=src/templates/email
MAIL_QUEUE_ENABLED=true
MAIL_RETRY_ATTEMPTS=3
MAIL_RETRY_DELAY=1000
MAIL_CONCURRENCY=5
MAIL_RATE_LIMIT_ENABLED=true
MAIL_RATE_LIMIT_PER_HOUR=100
*/ 
//# sourceMappingURL=mail.config.js.map