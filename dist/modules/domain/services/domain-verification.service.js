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
var DomainVerificationService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dns from 'dns';
import { promisify } from 'util';
import { Domain } from '../entities/domain.entity';
import { DomainVerificationToken } from '../entities/domain-verification-token.entity';
import { DomainVerificationStatus } from '../enums/domain-verification-status.enum';
import { DomainVerificationMethod } from '../enums/domain-verification-method.enum';
let DomainVerificationService = DomainVerificationService_1 = class DomainVerificationService {
    constructor(domainRepository, verificationTokenRepository, configService) {
        this.domainRepository = domainRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.configService = configService;
        this.logger = new Logger(DomainVerificationService_1.name);
        this.resolveTxt = promisify(dns.resolveTxt);
        this.resolveCname = promisify(dns.resolveCname);
    }
    async initiateDomainVerification(domainId, method) {
        try {
            const domain = await this.domainRepository.findOneByOrFail({ id: domainId });
            const token = await this.generateVerificationToken(domain, method);
            const verificationToken = this.verificationTokenRepository.create({
                domain,
                token: token,
                method,
                status: DomainVerificationStatus.PENDING,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            await this.verificationTokenRepository.save(verificationToken);
            domain.verificationStatus = DomainVerificationStatus.PENDING;
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
                throw new NotFoundException(`Domain with ID ${domainId} not found`);
            }
            const activeToken = domain.verificationTokens.find(token => token.status === DomainVerificationStatus.PENDING);
            if (!activeToken) {
                throw new Error('No active verification token found');
            }
            let isVerified = false;
            switch (activeToken.method) {
                case DomainVerificationMethod.DNS_TXT:
                    isVerified = await this.verifyDnsTxtRecord(domain.name, activeToken.token);
                    break;
                case DomainVerificationMethod.DNS_CNAME:
                    isVerified = await this.verifyDnsCnameRecord(domain.name, activeToken.token);
                    break;
                case DomainVerificationMethod.FILE:
                    isVerified = await this.verifyFileRecord(domain.name, activeToken.token);
                    break;
                default:
                    throw new Error(`Unsupported verification method: ${activeToken.method}`);
            }
            activeToken.status = isVerified
                ? DomainVerificationStatus.VERIFIED
                : DomainVerificationStatus.FAILED;
            activeToken.verifiedAt = isVerified ? new Date() : undefined;
            await this.verificationTokenRepository.save(activeToken);
            domain.verificationStatus = isVerified
                ? DomainVerificationStatus.VERIFIED
                : DomainVerificationStatus.FAILED;
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
        const prefix = method === DomainVerificationMethod.DNS_TXT ? 'domain-verify' : 'verify';
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${prefix}-${domain.id}-${randomString}`;
    }
    async cleanupExpiredTokens() {
        try {
            const expiredTokens = await this.verificationTokenRepository.find({
                where: {
                    status: DomainVerificationStatus.PENDING,
                    expiresAt: LessThan(new Date())
                }
            });
            for (const token of expiredTokens) {
                token.status = DomainVerificationStatus.EXPIRED;
                await this.verificationTokenRepository.save(token);
                const domain = await this.domainRepository.findOne({
                    where: { id: token.domainId },
                    relations: ['verificationTokens']
                });
                if (domain) {
                    const hasActiveTokens = domain.verificationTokens.some(t => t.status === DomainVerificationStatus.PENDING);
                    if (!hasActiveTokens) {
                        domain.verificationStatus = DomainVerificationStatus.EXPIRED;
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
                throw new NotFoundException(`Domain with ID ${domainId} not found`);
            }
            const activeToken = domain.verificationTokens.find(token => token.status === DomainVerificationStatus.PENDING);
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
    Injectable(),
    __param(0, InjectRepository(Domain)),
    __param(1, InjectRepository(DomainVerificationToken)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        ConfigService])
], DomainVerificationService);
export { DomainVerificationService };
//# sourceMappingURL=domain-verification.service.js.map