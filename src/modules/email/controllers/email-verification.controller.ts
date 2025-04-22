// src/modules/email/controllers/email-verification.controller.ts

import { Controller, Get, Query, Redirect, BadRequestException } from '@nestjs/common';
import { EmailVerificationService } from '../services/email-verification.service';

@Controller('email-verification')
export class EmailVerificationController {
    constructor(
        private emailVerificationService: EmailVerificationService,
    ) {}

    @Get('verify')
    @Redirect() // This will redirect to your frontend after verification
    async verifyEmail(@Query('token') token: string) {
        if (!token) {
            throw new BadRequestException('Verification token is required');
        }

        try {
            const { userId } = await this.emailVerificationService.verifyEmail(token);

            // Return the URL to redirect to after successful verification
            return { url: `/verification-success?userId=${userId}` };
        } catch (error) {
            // Return the URL to redirect to on error
            return { url: `/verification-failed?error=${encodeURIComponent(error.message)}` };
        }
    }
}