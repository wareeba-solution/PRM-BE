import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
export const mailConfigValidationSchema = Joi.object({
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
const mailConfig = registerAs('mail', () => ({
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
        dir: process.env.MAIL_TEMPLATE_DIR || join(__dirname, '..', 'templates', 'email'),
        adapter: new HandlebarsAdapter(),
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
export default mailConfig;
export const getMailConfig = () => {
    return mailConfig();
};
export const mailerConfig = () => {
    const config = getMailConfig();
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
                dir: join(config.template.dir, 'partials'),
                options: {
                    strict: true,
                },
            },
        },
    };
};
export const emailTemplates = {
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
//# sourceMappingURL=mail.config.js.map