// src/modules/email/templates/default-verification-template.ts

export const DEFAULT_VERIFICATION_TEMPLATE = {
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
    type: 'TRANSACTIONAL',
    status: 'ACTIVE',
    isDefault: true
};