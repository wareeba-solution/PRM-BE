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
var OrganizationAccessGuard_1;
import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { Role } from '@/modules/users/enums/role.enum';
let OrganizationAccessGuard = OrganizationAccessGuard_1 = class OrganizationAccessGuard {
    constructor(reflector, organizationRepository) {
        this.reflector = reflector;
        this.organizationRepository = organizationRepository;
        this.logger = new Logger(OrganizationAccessGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const organizationId = this.extractOrganizationId(request);
            if (!organizationId) {
                return true;
            }
            if (user.role === Role.SUPER_ADMIN) {
                return true;
            }
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId },
                relations: ['members']
            });
            if (!organization) {
                this.logger.warn(`Organization ${organizationId} not found`);
                return false;
            }
            const member = organization.members.find((m) => m.userId === user.id);
            if (!member) {
                this.logger.warn(`User ${user.id} attempted to access organization ${organizationId} without membership`);
                return false;
            }
            request.organization = organization;
            request.organizationMember = member;
            return true;
        }
        catch (error) {
            this.logger.error('Error in organization access guard:', error);
            return false;
        }
    }
    extractOrganizationId(request) {
        return (request.params.organizationId ||
            request.body.organizationId ||
            request.query.organizationId ||
            request.headers['x-organization-id']);
    }
};
OrganizationAccessGuard = OrganizationAccessGuard_1 = __decorate([
    Injectable(),
    __param(1, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Reflector,
        Repository])
], OrganizationAccessGuard);
export { OrganizationAccessGuard };
//# sourceMappingURL=organization-access.guard.js.map