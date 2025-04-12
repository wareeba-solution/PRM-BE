import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistory } from '../entities/medical-history.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';

@Injectable()
export class MedicalHistoryService {
    constructor(
        @InjectRepository(MedicalHistory)
        private readonly medicalHistoryRepository: Repository<MedicalHistory>,
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) {}

    async createMedicalHistory(
        organizationId: string,
        createdById: string,
        data: {
            contactId: string;
            encounterType: EncounterType;
            date: Date;
            description: string;
            diagnosis?: string;
            treatment?: string;
            medications?: string;
            symptoms?: string;
            vitalSigns?: {
                bloodPressure?: string;
                temperature?: number;
                heartRate?: number;
                respiratoryRate?: number;
                oxygenSaturation?: number;
                height?: number;
                weight?: number;
                bmi?: number;
            };
            notes?: string;
            referrals?: {
                to: string;
                reason: string;
                date: Date;
                status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
            }[];
            attachments?: {
                name: string;
                type: string;
                url: string;
            }[];
            labResults?: {
                test: string;
                result: string;
                normalRange: string;
                date: Date;
                isAbnormal: boolean;
            }[];
            providerName?: string;
            providerType?: HealthcareProviderType;
            facilityName?: string;
            facilityLocation?: string;
            isInsuranceClaim?: boolean;
            insuranceClaimNumber?: string;
            costAmount?: number;
            costCurrency?: string;
        },
    ) {
        // Verify contact exists and belongs to organization
        const contact = await this.contactRepository.findOne({
            where: { id: data.contactId, organizationId },
        });

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        const medicalHistory = this.medicalHistoryRepository.create({
            ...data,
            organizationId,
            createdById,
        });

        return this.medicalHistoryRepository.save(medicalHistory);
    }

    async getContactMedicalHistory(organizationId: string, contactId: string) {
        // Verify contact exists and belongs to organization
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId },
        });

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        return this.medicalHistoryRepository.find({
            where: { contactId, organizationId },
            order: { date: 'DESC' },
        });
    }

    async getMedicalHistory(organizationId: string, id: string) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        return medicalHistory;
    }

    async updateMedicalHistory(
        organizationId: string,
        id: string,
        updates: Partial<MedicalHistory>,
    ) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        Object.assign(medicalHistory, updates);
        return this.medicalHistoryRepository.save(medicalHistory);
    }

    async deleteMedicalHistory(organizationId: string, id: string) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        await this.medicalHistoryRepository.softDelete(id);
        return { success: true };
    }

    async flagMedicalHistory(
        organizationId: string,
        id: string,
        data: { reason: string; requiresFollowUp?: boolean; followUpDate?: Date },
    ) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        medicalHistory.isFlagged = true;
        medicalHistory.flagReason = data.reason;
        medicalHistory.requiresFollowUp = data.requiresFollowUp;
        medicalHistory.followUpDate = data.followUpDate;

        return this.medicalHistoryRepository.save(medicalHistory);
    }

    async addReferral(
        organizationId: string,
        id: string,
        data: {
            to: string;
            reason: string;
            date: Date;
            status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
        },
    ) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        if (!medicalHistory.referrals) {
            medicalHistory.referrals = [];
        }

        medicalHistory.referrals.push(data);
        return this.medicalHistoryRepository.save(medicalHistory);
    }

    async addLabResult(
        organizationId: string,
        id: string,
        data: {
            test: string;
            result: string;
            normalRange: string;
            date: Date;
            isAbnormal: boolean;
        },
    ) {
        const medicalHistory = await this.medicalHistoryRepository.findOne({
            where: { id, organizationId },
        });

        if (!medicalHistory) {
            throw new NotFoundException('Medical history not found');
        }

        if (!medicalHistory.labResults) {
            medicalHistory.labResults = [];
        }

        medicalHistory.labResults.push(data);
        return this.medicalHistoryRepository.save(medicalHistory);
    }
} 