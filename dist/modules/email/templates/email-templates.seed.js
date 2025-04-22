"use strict";
// src/modules/email/templates/email-templates.seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEmailTemplates = void 0;
const email_template_entity_1 = require("../entities/email-template.entity");
const seedEmailTemplates = async (emailTemplateService, organizationId) => {
    // Verification Email Template
    const verificationExists = await emailTemplateService.findByName('email-verification', organizationId);
    if (!verificationExists) {
        await emailTemplateService.create({
            name: 'email-verification',
            subject: 'Verify Your Email Address',
            content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Verify Your Email Address</h2>
          <p>Hello {{name}},</p>
          <p>Thank you for registering! Please click the button below to verify your email address:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationUrl}}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Verify Email
            </a>
          </div>
          
          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p>{{verificationUrl}}</p>
          
          <p>This link will expire in {{expiresIn}}.</p>
          
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `,
            type: email_template_entity_1.EmailTemplateType.TRANSACTIONAL,
            status: email_template_entity_1.EmailTemplateStatus.ACTIVE,
            organizationId,
            isDefault: true,
            category: 'Authentication',
        });
    }
    // Welcome Email Template
    const welcomeExists = await emailTemplateService.findByName('welcome-email', organizationId);
    if (!welcomeExists) {
        await emailTemplateService.create({
            name: 'welcome-email',
            subject: 'Welcome to {{organizationName}}',
            content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to {{organizationName}}!</h2>
          <p>Hello {{name}},</p>
          <p>Thank you for verifying your email. Your account is now fully activated.</p>
          <p>You can now log in and start using all the features of our platform.</p>
          <p><a href="{{loginUrl}}">Click here to log in</a></p>
        </div>
      `,
            type: email_template_entity_1.EmailTemplateType.TRANSACTIONAL,
            status: email_template_entity_1.EmailTemplateStatus.ACTIVE,
            organizationId,
            isDefault: true,
            category: 'Authentication',
        });
    }
};
exports.seedEmailTemplates = seedEmailTemplates;
//# sourceMappingURL=email-templates.seed.js.map