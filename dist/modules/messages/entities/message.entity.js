"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/entities/message.entity.ts
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var create_message_dto_1 = require("../dto/create-message.dto");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var message_template_entity_1 = require("./message-template.entity");
var message_attachment_entity_1 = require("./message-attachment.entity");
var Message = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('messages'), (0, typeorm_1.Index)(['organizationId', 'contactId']), (0, typeorm_1.Index)(['organizationId', 'type']), (0, typeorm_1.Index)(['organizationId', 'status'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _senderId_decorators;
    var _senderId_initializers = [];
    var _senderId_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _emailOptions_decorators;
    var _emailOptions_initializers = [];
    var _emailOptions_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _requireConfirmation_decorators;
    var _requireConfirmation_initializers = [];
    var _requireConfirmation_extraInitializers = [];
    var _confirmedAt_decorators;
    var _confirmedAt_initializers = [];
    var _confirmedAt_extraInitializers = [];
    var _confirmedById_decorators;
    var _confirmedById_initializers = [];
    var _confirmedById_extraInitializers = [];
    var _deliveredAt_decorators;
    var _deliveredAt_initializers = [];
    var _deliveredAt_extraInitializers = [];
    var _readAt_decorators;
    var _readAt_initializers = [];
    var _readAt_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _externalId_decorators;
    var _externalId_initializers = [];
    var _externalId_extraInitializers = [];
    var _deliveryDetails_decorators;
    var _deliveryDetails_initializers = [];
    var _deliveryDetails_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _parentMessageId_decorators;
    var _parentMessageId_initializers = [];
    var _parentMessageId_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _confirmedBy_decorators;
    var _confirmedBy_initializers = [];
    var _confirmedBy_extraInitializers = [];
    var _contact_decorators;
    var _contact_initializers = [];
    var _contact_extraInitializers = [];
    var _template_decorators;
    var _template_initializers = [];
    var _template_extraInitializers = [];
    var _parentMessage_decorators;
    var _parentMessage_initializers = [];
    var _parentMessage_extraInitializers = [];
    var _replies_decorators;
    var _replies_initializers = [];
    var _replies_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _get_isRead_decorators;
    var _get_isConfirmed_decorators;
    var _get_isDelivered_decorators;
    var _get_isScheduled_decorators;
    var _get_isFailed_decorators;
    var Message = _classThis = /** @class */ (function () {
        function Message_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.type = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.contactId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.senderId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _senderId_initializers, void 0));
            this.content = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.priority = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.status = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.emailOptions = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _emailOptions_initializers, void 0));
            this.templateId = (__runInitializers(this, _emailOptions_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.requireConfirmation = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _requireConfirmation_initializers, void 0));
            this.confirmedAt = (__runInitializers(this, _requireConfirmation_extraInitializers), __runInitializers(this, _confirmedAt_initializers, void 0));
            this.confirmedById = (__runInitializers(this, _confirmedAt_extraInitializers), __runInitializers(this, _confirmedById_initializers, void 0));
            this.deliveredAt = (__runInitializers(this, _confirmedById_extraInitializers), __runInitializers(this, _deliveredAt_initializers, void 0));
            this.readAt = (__runInitializers(this, _deliveredAt_extraInitializers), __runInitializers(this, _readAt_initializers, void 0));
            this.notes = (__runInitializers(this, _readAt_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.externalId = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _externalId_initializers, void 0));
            this.deliveryDetails = (__runInitializers(this, _externalId_extraInitializers), __runInitializers(this, _deliveryDetails_initializers, void 0));
            this.metadata = (__runInitializers(this, _deliveryDetails_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.parentMessageId = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _parentMessageId_initializers, void 0));
            this.updatedById = (__runInitializers(this, _parentMessageId_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.sender = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.confirmedBy = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _confirmedBy_initializers, void 0));
            this.contact = (__runInitializers(this, _confirmedBy_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
            this.template = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            this.parentMessage = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _parentMessage_initializers, void 0));
            this.replies = (__runInitializers(this, _parentMessage_extraInitializers), __runInitializers(this, _replies_initializers, void 0));
            this.attachments = (__runInitializers(this, _replies_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
            __runInitializers(this, _attachments_extraInitializers);
        }
        Object.defineProperty(Message_1.prototype, "isRead", {
            // Virtual properties
            get: function () {
                return !!this.readAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Message_1.prototype, "isConfirmed", {
            get: function () {
                return !!this.confirmedAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Message_1.prototype, "isDelivered", {
            get: function () {
                return !!this.deliveredAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Message_1.prototype, "isScheduled", {
            get: function () {
                return !!this.scheduledFor && this.scheduledFor > new Date();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Message_1.prototype, "isFailed", {
            get: function () {
                return this.status === create_message_dto_1.MessageStatus.FAILED;
            },
            enumerable: false,
            configurable: true
        });
        Message_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, type: { required: true, enum: require("../dto/create-message.dto").MessageType }, contactId: { required: true, type: function () { return String; } }, senderId: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, priority: { required: true, enum: require("../dto/create-message.dto").MessagePriority }, status: { required: true, enum: require("../dto/create-message.dto").MessageStatus }, emailOptions: { required: false, type: function () { return ({ subject: { required: true, type: function () { return String; } }, cc: { required: false, type: function () { return String; } }, bcc: { required: false, type: function () { return String; } }, trackOpens: { required: false, type: function () { return Boolean; } }, trackClicks: { required: false, type: function () { return Boolean; } } }); } }, templateId: { required: false, type: function () { return String; } }, scheduledFor: { required: false, type: function () { return Date; } }, requireConfirmation: { required: true, type: function () { return Boolean; } }, confirmedAt: { required: false, type: function () { return Date; } }, confirmedById: { required: false, type: function () { return String; } }, deliveredAt: { required: false, type: function () { return Date; } }, readAt: { required: false, type: function () { return Date; } }, notes: { required: false, type: function () { return String; } }, externalId: { required: false, type: function () { return String; } }, deliveryDetails: { required: false, type: function () { return ({ provider: { required: true, type: function () { return String; } }, providerMessageId: { required: false, type: function () { return String; } }, attempts: { required: false, type: function () { return Number; } }, lastAttempt: { required: false, type: function () { return Date; } }, errorCode: { required: false, type: function () { return String; } }, errorMessage: { required: false, type: function () { return String; } } }); } }, metadata: { required: false, type: function () { return Object; } }, parentMessageId: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, sender: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: false, type: function () { return require("../../users/entities/user.entity").User; } }, confirmedBy: { required: false, type: function () { return require("../../users/entities/user.entity").User; } }, contact: { required: true, type: function () { return require("../../contacts/entities/contact.entity").Contact; } }, template: { required: false, type: function () { return require("./message-template.entity").MessageTemplate; } }, parentMessage: { required: false, type: function () { return require("./message.entity").Message; } }, replies: { required: false, type: function () { return [require("./message.entity").Message]; } }, attachments: { required: false, type: function () { return [require("./message-attachment.entity").MessageAttachment]; } } };
        };
        return Message_1;
    }());
    __setFunctionName(_classThis, "Message");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _type_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'enum', enum: create_message_dto_1.MessageType })];
        _contactId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _senderId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _content_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text' })];
        _priority_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_message_dto_1.MessagePriority,
                default: create_message_dto_1.MessagePriority.NORMAL,
            })];
        _status_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_message_dto_1.MessageStatus,
                default: create_message_dto_1.MessageStatus.QUEUED,
            })];
        _emailOptions_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _templateId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _scheduledFor_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _requireConfirmation_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _confirmedAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _confirmedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _deliveredAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _readAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _notes_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _externalId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _deliveryDetails_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _metadata_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _parentMessageId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _sender_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'senderId' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _confirmedBy_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'confirmedById' })];
        _contact_decorators = [(0, typeorm_1.ManyToOne)('Contact', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'contactId' })];
        _template_decorators = [(0, typeorm_1.ManyToOne)(function () { return message_template_entity_1.MessageTemplate; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'templateId' })];
        _parentMessage_decorators = [(0, typeorm_1.ManyToOne)(function () { return Message; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'parentMessageId' })];
        _replies_decorators = [(0, typeorm_1.OneToMany)(function () { return Message; }, function (message) { return message.parentMessage; }, { lazy: true })];
        _attachments_decorators = [(0, typeorm_1.OneToMany)(function () { return message_attachment_entity_1.MessageAttachment; }, function (attachment) { return attachment.message; }, { lazy: true })];
        _get_isRead_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isConfirmed_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isDelivered_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isScheduled_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isFailed_decorators = [(0, swagger_1.ApiProperty)()];
        __esDecorate(_classThis, null, _get_isRead_decorators, { kind: "getter", name: "isRead", static: false, private: false, access: { has: function (obj) { return "isRead" in obj; }, get: function (obj) { return obj.isRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isConfirmed_decorators, { kind: "getter", name: "isConfirmed", static: false, private: false, access: { has: function (obj) { return "isConfirmed" in obj; }, get: function (obj) { return obj.isConfirmed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isDelivered_decorators, { kind: "getter", name: "isDelivered", static: false, private: false, access: { has: function (obj) { return "isDelivered" in obj; }, get: function (obj) { return obj.isDelivered; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isScheduled_decorators, { kind: "getter", name: "isScheduled", static: false, private: false, access: { has: function (obj) { return "isScheduled" in obj; }, get: function (obj) { return obj.isScheduled; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isFailed_decorators, { kind: "getter", name: "isFailed", static: false, private: false, access: { has: function (obj) { return "isFailed" in obj; }, get: function (obj) { return obj.isFailed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: function (obj) { return "senderId" in obj; }, get: function (obj) { return obj.senderId; }, set: function (obj, value) { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _emailOptions_decorators, { kind: "field", name: "emailOptions", static: false, private: false, access: { has: function (obj) { return "emailOptions" in obj; }, get: function (obj) { return obj.emailOptions; }, set: function (obj, value) { obj.emailOptions = value; } }, metadata: _metadata }, _emailOptions_initializers, _emailOptions_extraInitializers);
        __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _requireConfirmation_decorators, { kind: "field", name: "requireConfirmation", static: false, private: false, access: { has: function (obj) { return "requireConfirmation" in obj; }, get: function (obj) { return obj.requireConfirmation; }, set: function (obj, value) { obj.requireConfirmation = value; } }, metadata: _metadata }, _requireConfirmation_initializers, _requireConfirmation_extraInitializers);
        __esDecorate(null, null, _confirmedAt_decorators, { kind: "field", name: "confirmedAt", static: false, private: false, access: { has: function (obj) { return "confirmedAt" in obj; }, get: function (obj) { return obj.confirmedAt; }, set: function (obj, value) { obj.confirmedAt = value; } }, metadata: _metadata }, _confirmedAt_initializers, _confirmedAt_extraInitializers);
        __esDecorate(null, null, _confirmedById_decorators, { kind: "field", name: "confirmedById", static: false, private: false, access: { has: function (obj) { return "confirmedById" in obj; }, get: function (obj) { return obj.confirmedById; }, set: function (obj, value) { obj.confirmedById = value; } }, metadata: _metadata }, _confirmedById_initializers, _confirmedById_extraInitializers);
        __esDecorate(null, null, _deliveredAt_decorators, { kind: "field", name: "deliveredAt", static: false, private: false, access: { has: function (obj) { return "deliveredAt" in obj; }, get: function (obj) { return obj.deliveredAt; }, set: function (obj, value) { obj.deliveredAt = value; } }, metadata: _metadata }, _deliveredAt_initializers, _deliveredAt_extraInitializers);
        __esDecorate(null, null, _readAt_decorators, { kind: "field", name: "readAt", static: false, private: false, access: { has: function (obj) { return "readAt" in obj; }, get: function (obj) { return obj.readAt; }, set: function (obj, value) { obj.readAt = value; } }, metadata: _metadata }, _readAt_initializers, _readAt_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _externalId_decorators, { kind: "field", name: "externalId", static: false, private: false, access: { has: function (obj) { return "externalId" in obj; }, get: function (obj) { return obj.externalId; }, set: function (obj, value) { obj.externalId = value; } }, metadata: _metadata }, _externalId_initializers, _externalId_extraInitializers);
        __esDecorate(null, null, _deliveryDetails_decorators, { kind: "field", name: "deliveryDetails", static: false, private: false, access: { has: function (obj) { return "deliveryDetails" in obj; }, get: function (obj) { return obj.deliveryDetails; }, set: function (obj, value) { obj.deliveryDetails = value; } }, metadata: _metadata }, _deliveryDetails_initializers, _deliveryDetails_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _parentMessageId_decorators, { kind: "field", name: "parentMessageId", static: false, private: false, access: { has: function (obj) { return "parentMessageId" in obj; }, get: function (obj) { return obj.parentMessageId; }, set: function (obj, value) { obj.parentMessageId = value; } }, metadata: _metadata }, _parentMessageId_initializers, _parentMessageId_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _confirmedBy_decorators, { kind: "field", name: "confirmedBy", static: false, private: false, access: { has: function (obj) { return "confirmedBy" in obj; }, get: function (obj) { return obj.confirmedBy; }, set: function (obj, value) { obj.confirmedBy = value; } }, metadata: _metadata }, _confirmedBy_initializers, _confirmedBy_extraInitializers);
        __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: function (obj) { return "template" in obj; }, get: function (obj) { return obj.template; }, set: function (obj, value) { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _parentMessage_decorators, { kind: "field", name: "parentMessage", static: false, private: false, access: { has: function (obj) { return "parentMessage" in obj; }, get: function (obj) { return obj.parentMessage; }, set: function (obj, value) { obj.parentMessage = value; } }, metadata: _metadata }, _parentMessage_initializers, _parentMessage_extraInitializers);
        __esDecorate(null, null, _replies_decorators, { kind: "field", name: "replies", static: false, private: false, access: { has: function (obj) { return "replies" in obj; }, get: function (obj) { return obj.replies; }, set: function (obj, value) { obj.replies = value; } }, metadata: _metadata }, _replies_initializers, _replies_extraInitializers);
        __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Message = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Message = _classThis;
}();
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map