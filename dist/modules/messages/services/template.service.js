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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageTemplate } from '../entities/message-template.entity';
let TemplateService = class TemplateService {
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async findById(id, organizationId) {
        const template = await this.templateRepository.findOne({
            where: { id, organizationId }
        });
        if (!template) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        return template;
    }
    processTemplate(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const value = data[key];
            return value !== undefined && value !== null ? String(value) : match;
        });
    }
};
TemplateService = __decorate([
    Injectable(),
    __param(0, InjectRepository(MessageTemplate)),
    __metadata("design:paramtypes", [Repository])
], TemplateService);
export { TemplateService };
//# sourceMappingURL=template.service.js.map