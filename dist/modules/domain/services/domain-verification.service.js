"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DomainVerificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainVerificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const dns = __importStar(require("dns"));
const util_1 = require("util");
const domain_entity_1 = require("../entities/domain.entity");
const domain_verification_token_entity_1 = require("../entities/domain-verification-token.entity");
const domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
const domain_verification_method_enum_1 = require("../enums/domain-verification-method.enum");
let DomainVerificationService = DomainVerificationService_1 = class DomainVerificationService {
    constructor(domainRepository, verificationTokenRepository, configService) {
        this.domainRepository = domainRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(DomainVerificationService_1.name);
        this.resolveTxt = (0, util_1.promisify)(dns.resolveTxt);
        this.resolveCname = (0, util_1.promisify)(dns.resolveCname);
    }
    async initiateDomainVerification(domainId, method) {
        try {
            const domain = await this.domainRepository.findOneByOrFail({ id: domainId });
            // Generate verification token
            const token = await this.generateVerificationToken(domain, method);
            // Create verification record
            const verificationToken = this.verificationTokenRepository.create({
                domain,
                token: token,
                method,
                status: domain_verification_status_enum_1.DomainVerificationStatus.PENDING,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            });
            await this.verificationTokenRepository.save(verificationToken);
            // Update domain status
            domain.verificationStatus = domain_verification_status_enum_1.DomainVerificationStatus.PENDING;
            await this.domainRepository.save(domain);
            return verificationToken;
        }
        catch (error) {
            this.logger.error(`Error initiating domain verification: ${error.message}`);
            throw error;
        }
    }
    async verifyDomain(domainId) {
        try {
            const domain = await this.domainRepository.findOne({
                where: { id: domainId },
                relations: ['verificationTokens']
            });
            if (!domain) {
                throw new common_1.NotFoundException(`Domain with ID ${domainId} not found`);
            }
            const activeToken = domain.verificationTokens.find(token => token.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING);
            if (!activeToken) {
                throw new Error('No active verification token found');
            }
            let isVerified = false;
            switch (activeToken.method) {
                case domain_verification_method_enum_1.DomainVerificationMethod.DNS_TXT:
                    isVerified = await this.verifyDnsTxtRecord(domain.name, activeToken.token);
                    break;
                case domain_verification_method_enum_1.DomainVerificationMethod.DNS_CNAME:
                    isVerified = await this.verifyDnsCnameRecord(domain.name, activeToken.token);
                    break;
                case domain_verification_method_enum_1.DomainVerificationMethod.FILE:
                    isVerified = await this.verifyFileRecord(domain.name, activeToken.token);
                    break;
                default:
                    throw new Error(`Unsupported verification method: ${activeToken.method}`);
            }
            // Update verification status
            activeToken.status = isVerified
                ? domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED
                : domain_verification_status_enum_1.DomainVerificationStatus.FAILED;
            activeToken.verifiedAt = isVerified ? new Date() : undefined;
            await this.verificationTokenRepository.save(activeToken);
            // Update domain status
            domain.verificationStatus = isVerified
                ? domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED
                : domain_verification_status_enum_1.DomainVerificationStatus.FAILED;
            domain.verifiedAt = isVerified ? new Date() : undefined;
            await this.domainRepository.save(domain);
            return isVerified;
        }
        catch (error) {
            this.logger.error(`Error verifying domain: ${error.message}`);
            throw error;
        }
    }
    async verifyDnsTxtRecord(domain, token) {
        try {
            const records = await this.resolveTxt(domain);
            const flatRecords = records.flat();
            return flatRecords.some(record => record.includes(token));
        }
        catch (error) {
            this.logger.error(`Error verifying DNS TXT record: ${error.message}`);
            return false;
        }
    }
    async verifyDnsCnameRecord(domain, token) {
        try {
            const expectedValue = `${token}.${this.configService.get('VERIFICATION_DOMAIN')}`;
            const records = await this.resolveCname(domain);
            return records.some(record => record === expectedValue);
        }
        catch (error) {
            this.logger.error(`Error verifying DNS CNAME record: ${error.message}`);
            return false;
        }
    }
    async verifyFileRecord(domain, token) {
        try {
            const verificationUrl = `https://${domain}/.well-known/domain-verification.txt`;
            const response = await fetch(verificationUrl);
            if (!response.ok) {
                return false;
            }
            const content = await response.text();
            return content.trim() === token;
        }
        catch (error) {
            this.logger.error(`Error verifying file record: ${error.message}`);
            return false;
        }
    }
    async generateVerificationToken(domain, method) {
        const prefix = method === domain_verification_method_enum_1.DomainVerificationMethod.DNS_TXT ? 'domain-verify' : 'verify';
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${prefix}-${domain.id}-${randomString}`;
    }
    async cleanupExpiredTokens() {
        try {
            const expiredTokens = await this.verificationTokenRepository.find({
                where: {
                    status: domain_verification_status_enum_1.DomainVerificationStatus.PENDING,
                    expiresAt: (0, typeorm_2.LessThan)(new Date())
                }
            });
            for (const token of expiredTokens) {
                token.status = domain_verification_status_enum_1.DomainVerificationStatus.EXPIRED;
                await this.verificationTokenRepository.save(token);
                const domain = await this.domainRepository.findOne({
                    where: { id: token.domainId },
                    relations: ['verificationTokens']
                });
                if (domain) {
                    const hasActiveTokens = domain.verificationTokens.some(t => t.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING);
                    if (!hasActiveTokens) {
                        domain.verificationStatus = domain_verification_status_enum_1.DomainVerificationStatus.EXPIRED;
                        await this.domainRepository.save(domain);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error(`Error cleaning up expired tokens: ${error.message}`);
            throw error;
        }
    }
    async getDomainVerificationStatus(domainId) {
        try {
            const domain = await this.domainRepository.findOne({
                where: { id: domainId },
                relations: ['verificationTokens']
            });
            if (!domain) {
                throw new common_1.NotFoundException(`Domain with ID ${domainId} not found`);
            }
            const activeToken = domain.verificationTokens.find(token => token.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING);
            return {
                status: domain.verificationStatus,
                method: activeToken === null || activeToken === void 0 ? void 0 : activeToken.method,
                token: activeToken === null || activeToken === void 0 ? void 0 : activeToken.token,
                expiresAt: activeToken === null || activeToken === void 0 ? void 0 : activeToken.expiresAt,
                verifiedAt: domain.verifiedAt
            };
        }
        catch (error) {
            this.logger.error(`Error getting domain verification status: ${error.message}`);
            throw error;
        }
    }
};
DomainVerificationService = DomainVerificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(domain_entity_1.Domain)),
    __param(1, (0, typeorm_1.InjectRepository)(domain_verification_token_entity_1.DomainVerificationToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], DomainVerificationService);
exports.DomainVerificationService = DomainVerificationService;
//# sourceMappingURL=domain-verification.service.js.map