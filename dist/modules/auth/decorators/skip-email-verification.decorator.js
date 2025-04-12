"use strict";
// src/modules/auth/decorators/skip-email-verification.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipEmailVerification = exports.SKIP_EMAIL_VERIFICATION = void 0;
const common_1 = require("@nestjs/common");
exports.SKIP_EMAIL_VERIFICATION = 'skipEmailVerification';
const SkipEmailVerification = () => (0, common_1.SetMetadata)(exports.SKIP_EMAIL_VERIFICATION, true);
exports.SkipEmailVerification = SkipEmailVerification;
//# sourceMappingURL=skip-email-verification.decorator.js.map