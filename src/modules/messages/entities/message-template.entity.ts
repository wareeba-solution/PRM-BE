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
import { MessageTemplateType } from '../enums/message-template-type.enum';
import { MessageTemplateCategory } from '../enums/message-template-category.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';

@Entity('message_templates')
@Index(['organizationId', 'type'])
@Index(['organizationId', 'category'])
export class MessageTemplate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: MessageTemplateType,
        default: MessageTemplateType.EMAIL,
    })
    type: MessageTemplateType;

    @Column({
        type: 'enum',
        enum: MessageTemplateCategory,
        default: MessageTemplateCategory.GENERAL,
    })
    category: MessageTemplateCategory;

    @Column({ nullable: true })
    subject?: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'jsonb', nullable: true })
    variables?: string[];

    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        tags?: string[];
        language?: string;
        version?: string;
        [key: string]: any;
    };

    @Column({ default: true })
    isActive: boolean;

    @Column()
    createdById: string;

    @Column({ nullable: true })
    updatedById?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations - all using string references to avoid circular dependencies
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;


    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;


    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;
}