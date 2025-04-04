// src/modules/messages/entities/message-template.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageTemplateType } from '../enums/message-template-type.enum';
import { MessageTemplateCategory } from '../enums/message-template-category.enum';
// Remove direct entity imports that cause circular dependencies
// import { Organization } from '../../organizations/entities/organization.entity';
// import { User } from '../../users/entities/user.entity';

@Entity('message_templates')
@Index(['organizationId', 'type'])
@Index(['organizationId', 'category'])
export class MessageTemplate {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    organizationId: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: MessageTemplateType,
        default: MessageTemplateType.EMAIL,
    })
    type: MessageTemplateType;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: MessageTemplateCategory,
        default: MessageTemplateCategory.GENERAL,
    })
    category: MessageTemplateCategory;

    @ApiProperty()
    @Column({ nullable: true })
    subject?: string;

    @ApiProperty()
    @Column({ type: 'text' })
    content: string;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    variables?: string[];

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        tags?: string[];
        language?: string;
        version?: string;
        [key: string]: any;
    };

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    @Column()
    createdById: string;

    @ApiProperty()
    @Column({ nullable: true })
    updatedById?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations - all using string references to avoid circular dependencies
    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    })
    @ManyToOne('Organization')
    @JoinColumn({ name: 'organizationId' })
    organization: any;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        }
    })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<any>;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<any>;
}