"use strict";
// src/modules/email/controllers/email-verification.controller.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationController = void 0;
const common_1 = require("@nestjs/common");
const email_verification_service_1 = require("../services/email-verification.service");
let EmailVerificationController = class EmailVerificationController {
    constructor(emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }
    async verifyEmail(token) {
        if (!token) {
            throw new common_1.BadRequestException('Verification token is required');
        }
        try {
            const { userId } = await this.emailVerificationService.verifyEmail(token);
            // Return the URL to redirect to after successful verification
            return { url: `/verification-success?userId=${userId}` };
        }
        catch (error) {
            // Return the URL to redirect to on error
            return { url: `/verification-failed?error=${encodeURIComponent(error.message)}` };
        }
    }
};
__decorate([
    (0, common_1.Get)('verify'),
    (0, common_1.Redirect)() // This will redirect to your frontend after verification
    ,
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailVerificationController.prototype, "verifyEmail", null);
EmailVerificationController = __decorate([
    (0, common_1.Controller)('email-verification'),
    __metadata("design:paramtypes", [email_verification_service_1.EmailVerificationService])
], EmailVerificationController);
exports.EmailVerificationController = EmailVerificationController;
//# sourceMappingURL=email-verification.controller.js.map