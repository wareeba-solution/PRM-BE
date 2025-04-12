"use strict";
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
exports.MedicalHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medical_history_entity_1 = require("../entities/medical-history.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
let MedicalHistoryService = class MedicalHistoryService {
    constructor(medicalHistoryRepository, contactRepository) {
        this.medicalHistoryRepository = medicalHistoryRepository;
        this.contactRepository = contactRepository;
    }
    async createMedicalHistory(organizationId, createdById, data) {
        // Verify contact exists and belongs to organization
        const contact = await this.contactRepository.findOne({
            where: { id: data.contactId, organizationId },
        });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        const medicalHistory = this.medicalHistoryRepository.create(Object.assign(Object.assign({}, data), { organizationId,
            createdById }));
        return this.medicalHistoryRepository.save(medicalHistory);
    }
    async getContactMedicalHistory(organizationId, contactId) {
        // Verify contact exists and belongs to organization
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId },
        });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return this.medicalHistoryRepository.find({
            where: { contactId, organizationId },
            order: { date: 'DESC' },
        });
    }
    async getMedicalHistory(organizationId, id) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        return medicalHistory;
    }
    async updateMedicalHistory(organizationId, id, updates) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        Object.assign(medicalHistory, updates);
        return this.medicalHistoryRepository.save(medicalHistory);
    }
    async deleteMedicalHistory(organizationId, id) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        await this.medicalHistoryRepository.softDelete(id);
        return { success: true };
    }
    async flagMedicalHistory(organizationId, id, data) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        medicalHistory.isFlagged = true;
        medicalHistory.flagReason = data.reason;
        medicalHistory.requiresFollowUp = data.requiresFollowUp;
        medicalHistory.followUpDate = data.followUpDate;
        return this.medicalHistoryRepository.save(medicalHistory);
    }
    async addReferral(organizationId, id, data) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        if (!medicalHistory.referrals) {
            medicalHistory.referrals = [];
        }
        medicalHistory.referrals.push(data);
        return this.medicalHistoryRepository.save(medicalHistory);
    }
    async addLabResult(organizationId, id, data) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });
        if (!medicalHistory) {
            throw new common_1.NotFoundException('Medical history not found');
        }
        if (!medicalHistory.labResults) {
            medicalHistory.labResults = [];
        }
        medicalHistory.labResults.push(data);
        return this.medicalHistoryRepository.save(medicalHistory);
    }
};
MedicalHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medical_history_entity_1.MedicalHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MedicalHistoryService);
exports.MedicalHistoryService = MedicalHistoryService;
//# sourceMappingURL=medical-history.service.js.map