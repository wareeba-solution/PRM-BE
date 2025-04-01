var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn, Index, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Message } from '../../messages/entities/message.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { UserActivity } from './user-activity.entity';
let User = class User {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get isAvailable() {
        return this.isActive && !this.isLocked;
    }
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], User.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    ApiProperty(),
    Column({ unique: true }),
    Index(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: Role,
        default: Role.STAFF
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "employeeId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emergencyContact", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "licenseNumber", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "specialization", void 0);
__decorate([
    ApiProperty(),
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "qualifications", void 0);
__decorate([
    ApiProperty(),
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "certifications", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOnCall", void 0);
__decorate([
    ApiProperty(),
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "languages", void 0);
__decorate([
    ApiProperty(),
    Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "requirePasswordChange", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "preferences", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "metadata", void 0);
__decorate([
    ApiProperty(),
    Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLocked", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isPhoneVerified", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastActiveAt", void 0);
__decorate([
    ApiProperty(),
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "deviceTokens", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signature", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], User.prototype, "createdById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne('Organization'),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Object)
], User.prototype, "organization", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Promise)
], User.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], User.prototype, "updatedBy", void 0);
__decorate([
    OneToMany(() => Ticket, ticket => ticket.assignee, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "assignedTickets", void 0);
__decorate([
    OneToMany(() => Message, message => message.sender, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "messages", void 0);
__decorate([
    OneToMany(() => Appointment, appointment => appointment.provider, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "appointments", void 0);
__decorate([
    OneToMany(() => Notification, notification => notification.user, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "notifications", void 0);
__decorate([
    OneToMany(() => UserActivity, activity => activity.user, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "activities", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], User.prototype, "isAvailable", null);
User = __decorate([
    Entity('users'),
    Index(['organizationId', 'email']),
    Index(['organizationId', 'phoneNumber']),
    Index(['organizationId', 'role'])
], User);
export { User };
//# sourceMappingURL=user.entity.js.map