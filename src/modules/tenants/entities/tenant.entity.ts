// src/modules/tenants/entities/tenant.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Index,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

export enum TenantStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    PENDING = 'pending'
}

export enum PlanType {
    BASIC = 'basic',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise'
}

@Entity('tenants')
@Index(['subdomain'], { unique: true })
@Index(['status'])
export class Tenant {
    // Relationships are defined at the bottom of the class
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    @Index()
    subdomain: string;

    @Column({
        type: 'enum',
        enum: PlanType,
        default: PlanType.BASIC
    })
    planType: PlanType;

    @Column({
        type: 'enum',
        enum: TenantStatus,
        default: TenantStatus.PENDING
    })
    status: TenantStatus;

    @Column({ type: 'jsonb', nullable: true })
    settings: {
        branding?: {
            primaryColor?: string;
            secondaryColor?: string;
            logoUrl?: string;
            faviconUrl?: string;
        };
        security?: {
            passwordPolicy?: {
                minLength?: number;
                requireUppercase?: boolean;
                requireLowercase?: boolean;
                requireNumbers?: boolean;
                requireSpecialChars?: boolean;
                expiryDays?: number;
            };
            mfaRequired?: boolean;
            sessionTimeout?: number;
        };
        features?: {
            enabledModules?: string[];
            customFeatures?: Record<string, boolean>;
        };
    };

    @Column({ type: 'jsonb', nullable: true })
    contactInfo: {
        adminEmail?: string;
        adminPhone?: string;
        billingEmail?: string;
        billingPhone?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            postalCode?: string;
        };
    };

    @Column({ type: 'timestamp', nullable: true })
    subscriptionStartDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    subscriptionEndDate: Date;

    @Column({ default: false })
    isSubscriptionActive: boolean;

    @Column({ type: 'int', default: 5 })
    maxOrganizations: number;

    @Column({ type: 'int', default: 10 })
    maxUsersPerOrganization: number;

    @Column({ type: 'int', default: 1024 })
    maxStoragePerOrganization: number; // in MB

    // Relationships
    @OneToMany(() => Organization, organization => organization.tenant, { lazy: true })
    organizations: Promise<Organization[]>;

    // Timestamps
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // Helper methods
    get isActive(): boolean {
        return this.status === TenantStatus.ACTIVE;
    }

    get isPremium(): boolean {
        return this.planType === PlanType.PREMIUM || this.planType === PlanType.ENTERPRISE;
    }

    get isEnterprise(): boolean {
        return this.planType === PlanType.ENTERPRISE;
    }
}
