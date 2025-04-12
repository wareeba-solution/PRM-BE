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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = exports.ActivityType = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
var ActivityType;
(function (ActivityType) {
    ActivityType["LOGIN"] = "LOGIN";
    ActivityType["LOGOUT"] = "LOGOUT";
    ActivityType["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    ActivityType["PROFILE_UPDATE"] = "PROFILE_UPDATE";
    ActivityType["TICKET_CREATE"] = "TICKET_CREATE";
    ActivityType["TICKET_UPDATE"] = "TICKET_UPDATE";
    ActivityType["TICKET_COMMENT"] = "TICKET_COMMENT";
    ActivityType["TICKET_ASSIGNMENT"] = "TICKET_ASSIGNMENT";
    ActivityType["TICKET_STATUS_CHANGE"] = "TICKET_STATUS_CHANGE";
    ActivityType["MESSAGE_SEND"] = "MESSAGE_SEND";
    ActivityType["APPOINTMENT_CREATE"] = "APPOINTMENT_CREATE";
    ActivityType["APPOINTMENT_UPDATE"] = "APPOINTMENT_UPDATE";
    ActivityType["APPOINTMENT_CANCEL"] = "APPOINTMENT_CANCEL";
    ActivityType["DOCUMENT_UPLOAD"] = "DOCUMENT_UPLOAD";
    ActivityType["DOCUMENT_DELETE"] = "DOCUMENT_DELETE";
    ActivityType["SETTINGS_UPDATE"] = "SETTINGS_UPDATE";
    ActivityType["API_ACCESS"] = "API_ACCESS";
    ActivityType["FAILED_LOGIN"] = "FAILED_LOGIN";
    ActivityType["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION";
    ActivityType["PHONE_VERIFICATION"] = "PHONE_VERIFICATION";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
let UserActivity = class UserActivity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserActivity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserActivity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserActivity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserActivity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserActivity.prototype, "performedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserActivity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserActivity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserActivity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UserActivity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActivityType
    }),
    __metadata("design:type", String)
], UserActivity.prototype, "activityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UserActivity.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserActivity.prototype, "isSuccess", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UserActivity.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], UserActivity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User'),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Function)
], UserActivity.prototype, "user", void 0);
UserActivity = __decorate([
    (0, typeorm_1.Entity)('user_activities'),
    (0, typeorm_1.Index)(['organizationId', 'userId']),
    (0, typeorm_1.Index)(['organizationId', 'activityType']),
    (0, typeorm_1.Index)(['organizationId', 'createdAt'])
], UserActivity);
exports.UserActivity = UserActivity;
//# sourceMappingURL=user-activity.entity.js.map