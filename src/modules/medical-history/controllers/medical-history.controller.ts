import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { MedicalHistoryService } from '../services/medical-history.service';
import { MedicalHistory } from '../entities/medical-history.entity';
import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

interface CreateMedicalHistoryDTO {
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
}

@Controller('medical-history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalHistoryController {
    constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

    @Post()
    @Roles(Role.ADMIN, Role.STAFF)
    async createMedicalHistory(
        @CurrentUser() user: User,
        @Body() data: CreateMedicalHistoryDTO,
    ) {
        return this.medicalHistoryService.createMedicalHistory(
            user.organizationId,
            user.id,
            data,
        );
    }

    @Get('contact/:contactId')
    @Roles(Role.ADMIN, Role.STAFF, Role.PATIENT)
    async getContactMedicalHistory(
        @CurrentUser() user: User,
        @Param('contactId') contactId: string,
    ) {
        return this.medicalHistoryService.getContactMedicalHistory(
            user.organizationId,
            contactId,
        );
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.STAFF, Role.PATIENT)
    async getMedicalHistory(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        return this.medicalHistoryService.getMedicalHistory(
            user.organizationId,
            id,
        );
    }

    @Put(':id')
    @Roles(Role.ADMIN, Role.STAFF)
    async updateMedicalHistory(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() updates: Partial<CreateMedicalHistoryDTO>,
    ) {
        return this.medicalHistoryService.updateMedicalHistory(
            user.organizationId,
            id,
            updates,
        );
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.STAFF)
    async deleteMedicalHistory(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        return this.medicalHistoryService.deleteMedicalHistory(
            user.organizationId,
            id,
        );
    }

    @Post(':id/flag')
    @Roles(Role.ADMIN, Role.STAFF)
    async flagMedicalHistory(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() data: { reason: string; requiresFollowUp?: boolean; followUpDate?: Date },
    ) {
        return this.medicalHistoryService.flagMedicalHistory(
            user.organizationId,
            id,
            data,
        );
    }

    @Post(':id/referral')
    @Roles(Role.ADMIN, Role.STAFF)
    async addReferral(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() data: {
            to: string;
            reason: string;
            date: Date;
            status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
        },
    ) {
        return this.medicalHistoryService.addReferral(
            user.organizationId,
            id,
            data,
        );
    }

    @Post(':id/lab-result')
    @Roles(Role.ADMIN, Role.STAFF)
    async addLabResult(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() data: {
            test: string;
            result: string;
            normalRange: string;
            date: Date;
            isAbnormal: boolean;
        },
    ) {
        return this.medicalHistoryService.addLabResult(
            user.organizationId,
            id,
            data,
        );
    }
} 