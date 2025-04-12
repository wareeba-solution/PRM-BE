"use strict";
// src/modules/whatsapp/entities/whatsapp-log.entity.ts
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
exports.WhatsappLog = exports.WhatsappMediaType = exports.WhatsappMessageType = exports.WhatsappMessageStatus = void 0;
const typeorm_1 = require("typeorm");
const whatsapp_template_entity_1 = require("./whatsapp-template.entity");
/**
 * WhatsApp message status enum
 */
var WhatsappMessageStatus;
(function (WhatsappMessageStatus) {
    WhatsappMessageStatus["QUEUED"] = "queued";
    WhatsappMessageStatus["SENDING"] = "sending";
    WhatsappMessageStatus["SENT"] = "sent";
    WhatsappMessageStatus["DELIVERED"] = "delivered";
    WhatsappMessageStatus["READ"] = "read";
    WhatsappMessageStatus["FAILED"] = "failed";
    WhatsappMessageStatus["REJECTED"] = "rejected";
    WhatsappMessageStatus["CANCELED"] = "canceled";
    WhatsappMessageStatus["EXPIRED"] = "expired";
})(WhatsappMessageStatus = exports.WhatsappMessageStatus || (exports.WhatsappMessageStatus = {}));
/**
 * WhatsApp message type enum
 */
var WhatsappMessageType;
(function (WhatsappMessageType) {
    WhatsappMessageType["TEXT"] = "text";
    WhatsappMessageType["TEMPLATE"] = "template";
    WhatsappMessageType["IMAGE"] = "image";
    WhatsappMessageType["DOCUMENT"] = "document";
    WhatsappMessageType["AUDIO"] = "audio";
    WhatsappMessageType["VIDEO"] = "video";
    WhatsappMessageType["STICKER"] = "sticker";
    WhatsappMessageType["LOCATION"] = "location";
    WhatsappMessageType["CONTACT"] = "contact";
    WhatsappMessageType["INTERACTIVE"] = "interactive";
    WhatsappMessageType["REACTION"] = "reaction";
    WhatsappMessageType["BUTTON"] = "button";
})(WhatsappMessageType = exports.WhatsappMessageType || (exports.WhatsappMessageType = {}));
/**
 * WhatsApp media type enum
 */
var WhatsappMediaType;
(function (WhatsappMediaType) {
    WhatsappMediaType["IMAGE"] = "image";
    WhatsappMediaType["DOCUMENT"] = "document";
    WhatsappMediaType["AUDIO"] = "audio";
    WhatsappMediaType["VIDEO"] = "video";
    WhatsappMediaType["STICKER"] = "sticker";
})(WhatsappMediaType = exports.WhatsappMediaType || (exports.WhatsappMediaType = {}));
/**
 * WhatsApp log entity
 */
let WhatsappLog = class WhatsappLog {
    /**
     * Checks if the message is in a final status
     */
    isInFinalStatus() {
        return [
            WhatsappMessageStatus.SENT,
            WhatsappMessageStatus.DELIVERED,
            WhatsappMessageStatus.READ,
            WhatsappMessageStatus.FAILED,
            WhatsappMessageStatus.REJECTED,
            WhatsappMessageStatus.CANCELED,
            WhatsappMessageStatus.EXPIRED
        ].includes(this.status);
    }
    /**
     * Checks if the message was successfully delivered
     */
    isSuccessful() {
        return [
            WhatsappMessageStatus.SENT,
            WhatsappMessageStatus.DELIVERED,
            WhatsappMessageStatus.READ
        ].includes(this.status);
    }
    /**
     * Updates the status of the WhatsApp message
     */
    updateStatus(status, details) {
        // Don't update if already in a final status and trying to move to an earlier status
        if (this.isInFinalStatus() &&
            status !== WhatsappMessageStatus.READ &&
            status !== WhatsappMessageStatus.DELIVERED) {
            return;
        }
        this.status = status;
        // Initialize delivery details if not present
        if (!this.deliveryDetails) {
            this.deliveryDetails = {};
        }
        // Update delivery details based on status and provided details
        if (details) {
            this.deliveryDetails = Object.assign(Object.assign({}, this.deliveryDetails), details);
        }
        // Set timestamp based on status
        if (status === WhatsappMessageStatus.SENDING) {
            this.deliveryDetails.lastAttemptAt = new Date();
            this.deliveryDetails.attemptCount = (this.deliveryDetails.attemptCount || 0) + 1;
        }
        else if (status === WhatsappMessageStatus.DELIVERED) {
            this.deliveryDetails.deliveredAt = new Date();
        }
        else if (status === WhatsappMessageStatus.READ) {
            this.deliveryDetails.readAt = new Date();
        }
    }
    /**
     * Get formatted content for display or logs
     */
    getFormattedContent() {
        var _a;
        if (this.messageType === WhatsappMessageType.TEXT) {
            return this.content || '';
        }
        else if (this.messageType === WhatsappMessageType.TEMPLATE) {
            const templateName = ((_a = this.template) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown Template';
            return `Template: ${templateName}`;
        }
        else if (this.mediaData) {
            const caption = this.mediaData.caption ? ` - ${this.mediaData.caption}` : '';
            return `${this.mediaData.type}${caption}`;
        }
        return `${this.messageType} message`;
    }
    /**
     * Get the cost of the message if available
     */
    getCost() {
        var _a, _b, _c;
        if (((_a = this.deliveryDetails) === null || _a === void 0 ? void 0 : _a.cost) && ((_b = this.deliveryDetails) === null || _b === void 0 ? void 0 : _b.currency)) {
            return {
                amount: this.deliveryDetails.cost,
                currency: this.deliveryDetails.currency
            };
        }
        else if ((_c = this.deliveryDetails) === null || _c === void 0 ? void 0 : _c.pricing) {
            return {
                amount: this.deliveryDetails.pricing.cost,
                currency: this.deliveryDetails.pricing.currency
            };
        }
        return null;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WhatsappLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: WhatsappMessageType }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "messageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => whatsapp_template_entity_1.WhatsappTemplate, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", whatsapp_template_entity_1.WhatsappTemplate)
], WhatsappLog.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappLog.prototype, "toName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], WhatsappLog.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: WhatsappMessageStatus, default: WhatsappMessageStatus.QUEUED }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "conversationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappLog.prototype, "variables", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Array)
], WhatsappLog.prototype, "components", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappLog.prototype, "mediaData", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappLog.prototype, "deliveryDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "recipientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappLog.prototype, "referenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappLog.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappLog.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappLog.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], WhatsappLog.prototype, "isAutomated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Array)
], WhatsappLog.prototype, "buttons", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappLog.prototype, "contextInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappLog.prototype, "externalBusinessId", void 0);
WhatsappLog = __decorate([
    (0, typeorm_1.Entity)('whatsapp_logs')
], WhatsappLog);
exports.WhatsappLog = WhatsappLog;
//# sourceMappingURL=whatsapp-log.entity.js.map