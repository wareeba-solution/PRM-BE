import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from './department.entity';

export enum RoutingType {
    TICKET = 'TICKET',
    MESSAGE = 'MESSAGE',
    APPOINTMENT = 'APPOINTMENT',
}

export enum RoutingCondition {
    KEYWORD = 'KEYWORD',
    PRIORITY = 'PRIORITY',
    PATIENT_TYPE = 'PATIENT_TYPE',
    TIME_OF_DAY = 'TIME_OF_DAY',
    DAY_OF_WEEK = 'DAY_OF_WEEK',
    CUSTOM = 'CUSTOM',
}

export enum RoutingAction {
    ASSIGN_TO_DEPARTMENT = 'ASSIGN_TO_DEPARTMENT',
    ASSIGN_TO_USER = 'ASSIGN_TO_USER',
    ESCALATE = 'ESCALATE',
    NOTIFY = 'NOTIFY',
    AUTO_REPLY = 'AUTO_REPLY',
}

@Entity('routing_rules')
export class RoutingRule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    departmentId: string;

    @ManyToOne(() => Department)
    @JoinColumn({ name: 'departmentId' })
    department: Department;

    @Column({
        type: 'enum',
        enum: RoutingType,
    })
    type: RoutingType;

    @Column({
        type: 'enum',
        enum: RoutingCondition,
    })
    condition: RoutingCondition;

    @Column('jsonb')
    conditionValue: any; // This will store different types of values based on condition

    @Column({
        type: 'enum',
        enum: RoutingAction,
    })
    action: RoutingAction;

    @Column('jsonb')
    actionValue: any; // This will store different types of values based on action

    @Column({ default: 0 })
    priority: number; // Lower number means higher priority

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: false })
    isDefault: boolean; // Whether this is a default rule for the department

    @Column()
    createdById: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
} 