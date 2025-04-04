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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/users/entities/user.entity.ts
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../enums/role.enum");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const user_activity_entity_1 = require("./user-activity.entity");
let User = User_1 = class User {
    // Virtual properties
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get isAvailable() {
        return this.isActive && !this.isLocked;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, mobilePhone: { required: false, type: () => String }, organizationId: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phoneNumber: { required: false, type: () => String }, role: { required: true, enum: require("../enums/role.enum").Role }, title: { required: false, type: () => String }, department: { required: false, type: () => String }, employeeId: { required: false, type: () => String }, address: { required: false, type: () => ({ street: { required: true, type: () => String }, city: { required: true, type: () => String }, state: { required: true, type: () => String }, postalCode: { required: true, type: () => String }, country: { required: true, type: () => String } }) }, emergencyContact: { required: false, type: () => ({ name: { required: true, type: () => String }, relationship: { required: true, type: () => String }, phone: { required: true, type: () => String }, address: { required: false, type: () => String } }) }, licenseNumber: { required: false, type: () => String }, specialization: { required: false, type: () => String }, qualifications: { required: false, type: () => [String] }, certifications: { required: false, type: () => [String] }, isOnCall: { required: true, type: () => Boolean }, languages: { required: false, type: () => [String] }, requirePasswordChange: { required: true, type: () => Boolean }, preferences: { required: false, type: () => ({ theme: { required: false, type: () => String }, notifications: { required: false, type: () => ({ email: { required: false, type: () => Boolean }, sms: { required: false, type: () => Boolean }, inApp: { required: false, type: () => Boolean } }) }, timezone: { required: false, type: () => String }, language: { required: false, type: () => String } }) }, metadata: { required: false, type: () => Object }, isActive: { required: true, type: () => Boolean }, isLocked: { required: true, type: () => Boolean }, isEmailVerified: { required: true, type: () => Boolean }, isPhoneVerified: { required: true, type: () => Boolean }, lastLoginAt: { required: false, type: () => Date }, lastActiveAt: { required: false, type: () => Date }, deviceTokens: { required: false, type: () => [String] }, avatar: { required: false, type: () => String }, signature: { required: false, type: () => String }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, createdBy: { required: true, type: () => require("./user.entity").User }, updatedBy: { required: false, type: () => require("./user.entity").User }, assignedTickets: { required: true, type: () => [require("../../tickets/entities/ticket.entity").Ticket] }, createdTickets: { required: true, type: () => [require("../../tickets/entities/ticket.entity").Ticket] }, messages: { required: true, type: () => [require("../../messages/entities/message.entity").Message] }, appointments: { required: true, type: () => [require("../../appointments/entities/appointment.entity").Appointment] }, notifications: { required: true, type: () => [require("../../notifications/entities/notification.entity").Notification] }, activities: { required: true, type: () => [require("./user-activity.entity").UserActivity] } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.STAFF
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "qualifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOnCall", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "requirePasswordChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isPhoneVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastActiveAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "deviceTokens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], User.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => User_1 }),
    (0, typeorm_1.ManyToOne)(() => User_1, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => User_1, nullable: true }),
    (0, typeorm_1.ManyToOne)(() => User_1, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], User.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, ticket => ticket.assignee, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "assignedTickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, ticket => ticket.createdBy, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "createdTickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, message => message.sender, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, appointment => appointment.doctor, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.recipient, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivity, activity => activity.user, { lazy: true }),
    __metadata("design:type", Promise)
], User.prototype, "activities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], User.prototype, "isAvailable", null);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, typeorm_1.Index)(['organizationId', 'email']),
    (0, typeorm_1.Index)(['organizationId', 'phoneNumber']),
    (0, typeorm_1.Index)(['organizationId', 'role'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map