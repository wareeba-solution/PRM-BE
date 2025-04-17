import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { FamilyService } from '../services/family.service';
import { Contact } from '../entities/contact.entity';
import { ContactRelationship } from '../entities/contact-relationship.entity';
import { RelationshipType, RelationshipStatus } from '../entities/contact-relationship.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

interface CreateFamilyDTO {
    primaryPatient: Partial<Contact>;
    familyMembers: Array<{
        contact: Partial<Contact>;
        relationshipType: RelationshipType;
        isLegalGuardian?: boolean;
        hasMedicalDecisionAuthority?: boolean;
        permissions: {
            canViewMedicalRecords: boolean;
            canMakeAppointments: boolean;
            canReceiveUpdates: boolean;
            canPickupPrescriptions: boolean;
            canAccessPortal: boolean;
        };
    }>;
}

interface AddFamilyMemberDTO {
    contact: Partial<Contact>;
    relationshipType: RelationshipType;
    isLegalGuardian?: boolean;
    hasMedicalDecisionAuthority?: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
}

interface UpdateRelationshipDTO {
    type?: RelationshipType;
    isLegalGuardian?: boolean;
    hasMedicalDecisionAuthority?: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
    status?: RelationshipStatus;
}

@Controller('/families')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FamilyController {
    constructor(private readonly familyService: FamilyService) {}

    @Post()
    @Roles(Role.ADMIN, Role.STAFF)
    async createFamily(
        @CurrentUser() user: User,
        @Body() data: CreateFamilyDTO,
    ) {
        return this.familyService.createFamily(
            user.organizationId,
            user.tenantId,
            user.id,
            data.primaryPatient,
            data.familyMembers,
        );
    }

    @Post(':familyId/members')
    @Roles(Role.ADMIN, Role.STAFF)
    async addFamilyMember(
        @CurrentUser() user: User,
        @Param('familyId') familyId: string,
        @Body() data: AddFamilyMemberDTO,
    ) {
        return this.familyService.addFamilyMember(
            user.organizationId,
            user.tenantId,
            user.id,
            familyId,
            data.contact,
            data.relationshipType,
            {
                isLegalGuardian: data.isLegalGuardian,
                hasMedicalDecisionAuthority: data.hasMedicalDecisionAuthority,
                permissions: data.permissions,
            },
        );
    }

    @Get(':familyId/members')
    @Roles(Role.ADMIN, Role.STAFF, Role.PATIENT)
    async getFamilyMembers(
        @CurrentUser() user: User,
        @Param('familyId') familyId: string,
    ) {
        return this.familyService.getFamilyMembers(familyId, user.organizationId);
    }

    @Get(':familyId/primary-patient')
    @Roles(Role.ADMIN, Role.STAFF, Role.PATIENT)
    async getPrimaryPatient(
        @CurrentUser() user: User,
        @Param('familyId') familyId: string,
    ) {
        return this.familyService.getPrimaryPatient(familyId, user.organizationId);
    }

    @Put(':familyId/relationships/:contactId/:relatedContactId')
    @Roles(Role.ADMIN, Role.STAFF)
    async updateFamilyRelationship(
        @CurrentUser() user: User,
        @Param('familyId') familyId: string,
        @Param('contactId') contactId: string,
        @Param('relatedContactId') relatedContactId: string,
        @Body() updates: UpdateRelationshipDTO,
    ) {
        return this.familyService.updateFamilyRelationship(
            user.organizationId,
            familyId,
            contactId,
            relatedContactId,
            updates,
        );
    }

    @Delete(':familyId/members/:contactId')
    @Roles(Role.ADMIN, Role.STAFF)
    async removeFamilyMember(
        @CurrentUser() user: User,
        @Param('familyId') familyId: string,
        @Param('contactId') contactId: string,
    ) {
        return this.familyService.removeFamilyMember(
            user.organizationId,
            familyId,
            contactId,
        );
    }
} 