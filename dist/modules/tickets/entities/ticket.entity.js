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
exports.Ticket = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/tickets/entities/ticket.entity.ts
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var create_ticket_dto_1 = require("../dto/create-ticket.dto");
// Remove direct entity imports that cause circular dependencies
// import { Organization } from '../../organizations/entities/organization.entity';
// import { User } from '../../users/entities/user.entity';
// import { Contact } from '../../contacts/entities/contact.entity';
var department_entity_1 = require("../../departments/entities/department.entity");
var Ticket = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('tickets'), (0, typeorm_1.Index)(['organizationId', 'status']), (0, typeorm_1.Index)(['organizationId', 'assigneeId']), (0, typeorm_1.Index)(['organizationId', 'contactId']), (0, typeorm_1.Index)(['organizationId', 'departmentId']), (0, typeorm_1.Index)(['organizationId', 'createdAt'])];
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
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _source_decorators;
    var _source_initializers = [];
    var _source_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _subCategory_decorators;
    var _subCategory_initializers = [];
    var _subCategory_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _referenceNumber_decorators;
    var _referenceNumber_initializers = [];
    var _referenceNumber_extraInitializers = [];
    var _relatedTicketId_decorators;
    var _relatedTicketId_initializers = [];
    var _relatedTicketId_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _internalNotes_decorators;
    var _internalNotes_initializers = [];
    var _internalNotes_extraInitializers = [];
    var _resolution_decorators;
    var _resolution_initializers = [];
    var _resolution_extraInitializers = [];
    var _resolvedAt_decorators;
    var _resolvedAt_initializers = [];
    var _resolvedAt_extraInitializers = [];
    var _resolvedById_decorators;
    var _resolvedById_initializers = [];
    var _resolvedById_extraInitializers = [];
    var _closedAt_decorators;
    var _closedAt_initializers = [];
    var _closedAt_extraInitializers = [];
    var _closedById_decorators;
    var _closedById_initializers = [];
    var _closedById_extraInitializers = [];
    var _escalatedAt_decorators;
    var _escalatedAt_initializers = [];
    var _escalatedAt_extraInitializers = [];
    var _escalatedById_decorators;
    var _escalatedById_initializers = [];
    var _escalatedById_extraInitializers = [];
    var _escalationReason_decorators;
    var _escalationReason_initializers = [];
    var _escalationReason_extraInitializers = [];
    var _reopenedAt_decorators;
    var _reopenedAt_initializers = [];
    var _reopenedAt_extraInitializers = [];
    var _reopenedById_decorators;
    var _reopenedById_initializers = [];
    var _reopenedById_extraInitializers = [];
    var _reopenReason_decorators;
    var _reopenReason_initializers = [];
    var _reopenReason_extraInitializers = [];
    var _firstResponseAt_decorators;
    var _firstResponseAt_initializers = [];
    var _firstResponseAt_extraInitializers = [];
    var _lastActivityAt_decorators;
    var _lastActivityAt_initializers = [];
    var _lastActivityAt_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
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
    var _contact_decorators;
    var _contact_initializers = [];
    var _contact_extraInitializers = [];
    var _department_decorators;
    var _department_initializers = [];
    var _department_extraInitializers = [];
    var _assignee_decorators;
    var _assignee_initializers = [];
    var _assignee_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _resolvedBy_decorators;
    var _resolvedBy_initializers = [];
    var _resolvedBy_extraInitializers = [];
    var _closedBy_decorators;
    var _closedBy_initializers = [];
    var _closedBy_extraInitializers = [];
    var _escalatedBy_decorators;
    var _escalatedBy_initializers = [];
    var _escalatedBy_extraInitializers = [];
    var _reopenedBy_decorators;
    var _reopenedBy_initializers = [];
    var _reopenedBy_extraInitializers = [];
    var _relatedTicket_decorators;
    var _relatedTicket_initializers = [];
    var _relatedTicket_extraInitializers = [];
    var _comments_decorators;
    var _comments_initializers = [];
    var _comments_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _activities_decorators;
    var _activities_initializers = [];
    var _activities_extraInitializers = [];
    var _get_isEscalated_decorators;
    var _get_isResolved_decorators;
    var _get_isClosed_decorators;
    var _get_isReopened_decorators;
    var _get_hasFirstResponse_decorators;
    var _get_responseTime_decorators;
    var _get_resolutionTime_decorators;
    var Ticket = _classThis = /** @class */ (function () {
        function Ticket_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.title = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.type = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.priority = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.status = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.source = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _source_initializers, void 0));
            this.contactId = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.departmentId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _departmentId_initializers, void 0));
            this.assigneeId = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
            this.category = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.subCategory = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _subCategory_initializers, void 0));
            this.tags = (__runInitializers(this, _subCategory_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.referenceNumber = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _referenceNumber_initializers, void 0));
            this.relatedTicketId = (__runInitializers(this, _referenceNumber_extraInitializers), __runInitializers(this, _relatedTicketId_initializers, void 0));
            this.customFields = (__runInitializers(this, _relatedTicketId_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
            this.isPrivate = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
            this.internalNotes = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _internalNotes_initializers, void 0));
            this.resolution = (__runInitializers(this, _internalNotes_extraInitializers), __runInitializers(this, _resolution_initializers, void 0));
            this.resolvedAt = (__runInitializers(this, _resolution_extraInitializers), __runInitializers(this, _resolvedAt_initializers, void 0));
            this.resolvedById = (__runInitializers(this, _resolvedAt_extraInitializers), __runInitializers(this, _resolvedById_initializers, void 0));
            this.closedAt = (__runInitializers(this, _resolvedById_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
            this.closedById = (__runInitializers(this, _closedAt_extraInitializers), __runInitializers(this, _closedById_initializers, void 0));
            this.escalatedAt = (__runInitializers(this, _closedById_extraInitializers), __runInitializers(this, _escalatedAt_initializers, void 0));
            this.escalatedById = (__runInitializers(this, _escalatedAt_extraInitializers), __runInitializers(this, _escalatedById_initializers, void 0));
            this.escalationReason = (__runInitializers(this, _escalatedById_extraInitializers), __runInitializers(this, _escalationReason_initializers, void 0));
            this.reopenedAt = (__runInitializers(this, _escalationReason_extraInitializers), __runInitializers(this, _reopenedAt_initializers, void 0));
            this.reopenedById = (__runInitializers(this, _reopenedAt_extraInitializers), __runInitializers(this, _reopenedById_initializers, void 0));
            this.reopenReason = (__runInitializers(this, _reopenedById_extraInitializers), __runInitializers(this, _reopenReason_initializers, void 0));
            this.firstResponseAt = (__runInitializers(this, _reopenReason_extraInitializers), __runInitializers(this, _firstResponseAt_initializers, void 0));
            this.lastActivityAt = (__runInitializers(this, _firstResponseAt_extraInitializers), __runInitializers(this, _lastActivityAt_initializers, void 0));
            this.createdById = (__runInitializers(this, _lastActivityAt_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations - all using string references to avoid circular dependencies
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.contact = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
            this.department = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _department_initializers, void 0));
            this.assignee = (__runInitializers(this, _department_extraInitializers), __runInitializers(this, _assignee_initializers, void 0));
            this.createdBy = (__runInitializers(this, _assignee_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.resolvedBy = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _resolvedBy_initializers, void 0));
            this.closedBy = (__runInitializers(this, _resolvedBy_extraInitializers), __runInitializers(this, _closedBy_initializers, void 0));
            this.escalatedBy = (__runInitializers(this, _closedBy_extraInitializers), __runInitializers(this, _escalatedBy_initializers, void 0));
            this.reopenedBy = (__runInitializers(this, _escalatedBy_extraInitializers), __runInitializers(this, _reopenedBy_initializers, void 0));
            this.relatedTicket = (__runInitializers(this, _reopenedBy_extraInitializers), __runInitializers(this, _relatedTicket_initializers, void 0));
            this.comments = (__runInitializers(this, _relatedTicket_extraInitializers), __runInitializers(this, _comments_initializers, void 0));
            this.attachments = (__runInitializers(this, _comments_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
            this.activities = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _activities_initializers, void 0));
            __runInitializers(this, _activities_extraInitializers);
        }
        Object.defineProperty(Ticket_1.prototype, "isEscalated", {
            // Virtual properties
            get: function () {
                return !!this.escalatedAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "isResolved", {
            get: function () {
                return !!this.resolvedAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "isClosed", {
            get: function () {
                return !!this.closedAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "isReopened", {
            get: function () {
                return !!this.reopenedAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "hasFirstResponse", {
            get: function () {
                return !!this.firstResponseAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "responseTime", {
            get: function () {
                if (!this.firstResponseAt)
                    return null;
                return this.firstResponseAt.getTime() - this.createdAt.getTime();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ticket_1.prototype, "resolutionTime", {
            get: function () {
                if (!this.resolvedAt)
                    return null;
                return this.resolvedAt.getTime() - this.createdAt.getTime();
            },
            enumerable: false,
            configurable: true
        });
        Ticket_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, type: { required: true, enum: require("../dto/create-ticket.dto").TicketType }, priority: { required: true, enum: require("../dto/create-ticket.dto").TicketPriority }, status: { required: true, enum: require("../dto/create-ticket.dto").TicketStatus }, source: { required: true, enum: require("../dto/create-ticket.dto").TicketSource }, contactId: { required: false, type: function () { return String; } }, departmentId: { required: false, type: function () { return String; } }, assigneeId: { required: false, type: function () { return String; } }, category: { required: false, type: function () { return String; } }, subCategory: { required: false, type: function () { return String; } }, tags: { required: false, type: function () { return [String]; } }, referenceNumber: { required: false, type: function () { return String; } }, relatedTicketId: { required: false, type: function () { return String; } }, isPrivate: { required: true, type: function () { return Boolean; } }, internalNotes: { required: false, type: function () { return String; } }, resolution: { required: false, type: function () { return String; } }, resolvedAt: { required: false, type: function () { return Date; } }, resolvedById: { required: false, type: function () { return String; } }, closedAt: { required: false, type: function () { return Date; } }, closedById: { required: false, type: function () { return String; } }, escalatedAt: { required: false, type: function () { return Date; } }, escalatedById: { required: false, type: function () { return String; } }, escalationReason: { required: false, type: function () { return String; } }, reopenedAt: { required: false, type: function () { return Date; } }, reopenedById: { required: false, type: function () { return String; } }, reopenReason: { required: false, type: function () { return String; } }, firstResponseAt: { required: false, type: function () { return Date; } }, lastActivityAt: { required: false, type: function () { return Date; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return Object; } }, contact: { required: false, type: function () { return Object; } }, department: { required: false, type: function () { return require("../../departments/entities/department.entity").Department; } }, assignee: { required: false, type: function () { return Object; } }, createdBy: { required: true, type: function () { return Object; } }, updatedBy: { required: false, type: function () { return Object; } }, resolvedBy: { required: false, type: function () { return Object; } }, closedBy: { required: false, type: function () { return Object; } }, escalatedBy: { required: false, type: function () { return Object; } }, reopenedBy: { required: false, type: function () { return Object; } }, relatedTicket: { required: false, type: function () { return Object; } }, comments: { required: true, type: function () { return [Object]; } }, attachments: { required: true, type: function () { return [Object]; } }, activities: { required: true, type: function () { return [Object]; } } };
        };
        return Ticket_1;
    }());
    __setFunctionName(_classThis, "Ticket");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _title_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _description_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text' })];
        _type_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_ticket_dto_1.TicketType,
            })];
        _priority_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_ticket_dto_1.TicketPriority,
                default: create_ticket_dto_1.TicketPriority.NORMAL,
            })];
        _status_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_ticket_dto_1.TicketStatus,
                default: create_ticket_dto_1.TicketStatus.OPEN,
            })];
        _source_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_ticket_dto_1.TicketSource,
                default: create_ticket_dto_1.TicketSource.WEB,
            })];
        _contactId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _departmentId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _assigneeId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _category_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _subCategory_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _tags_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)('simple-array', { nullable: true })];
        _referenceNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _relatedTicketId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _customFields_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isPrivate_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _internalNotes_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _resolution_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _resolvedAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _resolvedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _closedAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _closedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _escalatedAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _escalatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _escalationReason_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _reopenedAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _reopenedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _reopenReason_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _firstResponseAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _lastActivityAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)('Organization'), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _contact_decorators = [(0, typeorm_1.ManyToOne)('Contact'), (0, typeorm_1.JoinColumn)({ name: 'contactId' })];
        _department_decorators = [(0, typeorm_1.ManyToOne)(function () { return department_entity_1.Department; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'departmentId' })];
        _assignee_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'assigneeId' })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _resolvedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'resolvedById' })];
        _closedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'closedById' })];
        _escalatedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'escalatedById' })];
        _reopenedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'reopenedById' })];
        _relatedTicket_decorators = [(0, typeorm_1.ManyToOne)('Ticket'), (0, typeorm_1.JoinColumn)({ name: 'relatedTicketId' })];
        _comments_decorators = [(0, typeorm_1.OneToMany)('TicketComment', 'ticket')];
        _attachments_decorators = [(0, typeorm_1.OneToMany)('TicketAttachment', 'ticket')];
        _activities_decorators = [(0, typeorm_1.OneToMany)('TicketActivity', 'ticket')];
        _get_isEscalated_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isResolved_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isClosed_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isReopened_decorators = [(0, swagger_1.ApiProperty)()];
        _get_hasFirstResponse_decorators = [(0, swagger_1.ApiProperty)()];
        _get_responseTime_decorators = [(0, swagger_1.ApiProperty)()];
        _get_resolutionTime_decorators = [(0, swagger_1.ApiProperty)()];
        __esDecorate(_classThis, null, _get_isEscalated_decorators, { kind: "getter", name: "isEscalated", static: false, private: false, access: { has: function (obj) { return "isEscalated" in obj; }, get: function (obj) { return obj.isEscalated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isResolved_decorators, { kind: "getter", name: "isResolved", static: false, private: false, access: { has: function (obj) { return "isResolved" in obj; }, get: function (obj) { return obj.isResolved; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isClosed_decorators, { kind: "getter", name: "isClosed", static: false, private: false, access: { has: function (obj) { return "isClosed" in obj; }, get: function (obj) { return obj.isClosed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isReopened_decorators, { kind: "getter", name: "isReopened", static: false, private: false, access: { has: function (obj) { return "isReopened" in obj; }, get: function (obj) { return obj.isReopened; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasFirstResponse_decorators, { kind: "getter", name: "hasFirstResponse", static: false, private: false, access: { has: function (obj) { return "hasFirstResponse" in obj; }, get: function (obj) { return obj.hasFirstResponse; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_responseTime_decorators, { kind: "getter", name: "responseTime", static: false, private: false, access: { has: function (obj) { return "responseTime" in obj; }, get: function (obj) { return obj.responseTime; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resolutionTime_decorators, { kind: "getter", name: "resolutionTime", static: false, private: false, access: { has: function (obj) { return "resolutionTime" in obj; }, get: function (obj) { return obj.resolutionTime; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
        __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _subCategory_decorators, { kind: "field", name: "subCategory", static: false, private: false, access: { has: function (obj) { return "subCategory" in obj; }, get: function (obj) { return obj.subCategory; }, set: function (obj, value) { obj.subCategory = value; } }, metadata: _metadata }, _subCategory_initializers, _subCategory_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _referenceNumber_decorators, { kind: "field", name: "referenceNumber", static: false, private: false, access: { has: function (obj) { return "referenceNumber" in obj; }, get: function (obj) { return obj.referenceNumber; }, set: function (obj, value) { obj.referenceNumber = value; } }, metadata: _metadata }, _referenceNumber_initializers, _referenceNumber_extraInitializers);
        __esDecorate(null, null, _relatedTicketId_decorators, { kind: "field", name: "relatedTicketId", static: false, private: false, access: { has: function (obj) { return "relatedTicketId" in obj; }, get: function (obj) { return obj.relatedTicketId; }, set: function (obj, value) { obj.relatedTicketId = value; } }, metadata: _metadata }, _relatedTicketId_initializers, _relatedTicketId_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
        __esDecorate(null, null, _internalNotes_decorators, { kind: "field", name: "internalNotes", static: false, private: false, access: { has: function (obj) { return "internalNotes" in obj; }, get: function (obj) { return obj.internalNotes; }, set: function (obj, value) { obj.internalNotes = value; } }, metadata: _metadata }, _internalNotes_initializers, _internalNotes_extraInitializers);
        __esDecorate(null, null, _resolution_decorators, { kind: "field", name: "resolution", static: false, private: false, access: { has: function (obj) { return "resolution" in obj; }, get: function (obj) { return obj.resolution; }, set: function (obj, value) { obj.resolution = value; } }, metadata: _metadata }, _resolution_initializers, _resolution_extraInitializers);
        __esDecorate(null, null, _resolvedAt_decorators, { kind: "field", name: "resolvedAt", static: false, private: false, access: { has: function (obj) { return "resolvedAt" in obj; }, get: function (obj) { return obj.resolvedAt; }, set: function (obj, value) { obj.resolvedAt = value; } }, metadata: _metadata }, _resolvedAt_initializers, _resolvedAt_extraInitializers);
        __esDecorate(null, null, _resolvedById_decorators, { kind: "field", name: "resolvedById", static: false, private: false, access: { has: function (obj) { return "resolvedById" in obj; }, get: function (obj) { return obj.resolvedById; }, set: function (obj, value) { obj.resolvedById = value; } }, metadata: _metadata }, _resolvedById_initializers, _resolvedById_extraInitializers);
        __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: function (obj) { return "closedAt" in obj; }, get: function (obj) { return obj.closedAt; }, set: function (obj, value) { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
        __esDecorate(null, null, _closedById_decorators, { kind: "field", name: "closedById", static: false, private: false, access: { has: function (obj) { return "closedById" in obj; }, get: function (obj) { return obj.closedById; }, set: function (obj, value) { obj.closedById = value; } }, metadata: _metadata }, _closedById_initializers, _closedById_extraInitializers);
        __esDecorate(null, null, _escalatedAt_decorators, { kind: "field", name: "escalatedAt", static: false, private: false, access: { has: function (obj) { return "escalatedAt" in obj; }, get: function (obj) { return obj.escalatedAt; }, set: function (obj, value) { obj.escalatedAt = value; } }, metadata: _metadata }, _escalatedAt_initializers, _escalatedAt_extraInitializers);
        __esDecorate(null, null, _escalatedById_decorators, { kind: "field", name: "escalatedById", static: false, private: false, access: { has: function (obj) { return "escalatedById" in obj; }, get: function (obj) { return obj.escalatedById; }, set: function (obj, value) { obj.escalatedById = value; } }, metadata: _metadata }, _escalatedById_initializers, _escalatedById_extraInitializers);
        __esDecorate(null, null, _escalationReason_decorators, { kind: "field", name: "escalationReason", static: false, private: false, access: { has: function (obj) { return "escalationReason" in obj; }, get: function (obj) { return obj.escalationReason; }, set: function (obj, value) { obj.escalationReason = value; } }, metadata: _metadata }, _escalationReason_initializers, _escalationReason_extraInitializers);
        __esDecorate(null, null, _reopenedAt_decorators, { kind: "field", name: "reopenedAt", static: false, private: false, access: { has: function (obj) { return "reopenedAt" in obj; }, get: function (obj) { return obj.reopenedAt; }, set: function (obj, value) { obj.reopenedAt = value; } }, metadata: _metadata }, _reopenedAt_initializers, _reopenedAt_extraInitializers);
        __esDecorate(null, null, _reopenedById_decorators, { kind: "field", name: "reopenedById", static: false, private: false, access: { has: function (obj) { return "reopenedById" in obj; }, get: function (obj) { return obj.reopenedById; }, set: function (obj, value) { obj.reopenedById = value; } }, metadata: _metadata }, _reopenedById_initializers, _reopenedById_extraInitializers);
        __esDecorate(null, null, _reopenReason_decorators, { kind: "field", name: "reopenReason", static: false, private: false, access: { has: function (obj) { return "reopenReason" in obj; }, get: function (obj) { return obj.reopenReason; }, set: function (obj, value) { obj.reopenReason = value; } }, metadata: _metadata }, _reopenReason_initializers, _reopenReason_extraInitializers);
        __esDecorate(null, null, _firstResponseAt_decorators, { kind: "field", name: "firstResponseAt", static: false, private: false, access: { has: function (obj) { return "firstResponseAt" in obj; }, get: function (obj) { return obj.firstResponseAt; }, set: function (obj, value) { obj.firstResponseAt = value; } }, metadata: _metadata }, _firstResponseAt_initializers, _firstResponseAt_extraInitializers);
        __esDecorate(null, null, _lastActivityAt_decorators, { kind: "field", name: "lastActivityAt", static: false, private: false, access: { has: function (obj) { return "lastActivityAt" in obj; }, get: function (obj) { return obj.lastActivityAt; }, set: function (obj, value) { obj.lastActivityAt = value; } }, metadata: _metadata }, _lastActivityAt_initializers, _lastActivityAt_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
        __esDecorate(null, null, _department_decorators, { kind: "field", name: "department", static: false, private: false, access: { has: function (obj) { return "department" in obj; }, get: function (obj) { return obj.department; }, set: function (obj, value) { obj.department = value; } }, metadata: _metadata }, _department_initializers, _department_extraInitializers);
        __esDecorate(null, null, _assignee_decorators, { kind: "field", name: "assignee", static: false, private: false, access: { has: function (obj) { return "assignee" in obj; }, get: function (obj) { return obj.assignee; }, set: function (obj, value) { obj.assignee = value; } }, metadata: _metadata }, _assignee_initializers, _assignee_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _resolvedBy_decorators, { kind: "field", name: "resolvedBy", static: false, private: false, access: { has: function (obj) { return "resolvedBy" in obj; }, get: function (obj) { return obj.resolvedBy; }, set: function (obj, value) { obj.resolvedBy = value; } }, metadata: _metadata }, _resolvedBy_initializers, _resolvedBy_extraInitializers);
        __esDecorate(null, null, _closedBy_decorators, { kind: "field", name: "closedBy", static: false, private: false, access: { has: function (obj) { return "closedBy" in obj; }, get: function (obj) { return obj.closedBy; }, set: function (obj, value) { obj.closedBy = value; } }, metadata: _metadata }, _closedBy_initializers, _closedBy_extraInitializers);
        __esDecorate(null, null, _escalatedBy_decorators, { kind: "field", name: "escalatedBy", static: false, private: false, access: { has: function (obj) { return "escalatedBy" in obj; }, get: function (obj) { return obj.escalatedBy; }, set: function (obj, value) { obj.escalatedBy = value; } }, metadata: _metadata }, _escalatedBy_initializers, _escalatedBy_extraInitializers);
        __esDecorate(null, null, _reopenedBy_decorators, { kind: "field", name: "reopenedBy", static: false, private: false, access: { has: function (obj) { return "reopenedBy" in obj; }, get: function (obj) { return obj.reopenedBy; }, set: function (obj, value) { obj.reopenedBy = value; } }, metadata: _metadata }, _reopenedBy_initializers, _reopenedBy_extraInitializers);
        __esDecorate(null, null, _relatedTicket_decorators, { kind: "field", name: "relatedTicket", static: false, private: false, access: { has: function (obj) { return "relatedTicket" in obj; }, get: function (obj) { return obj.relatedTicket; }, set: function (obj, value) { obj.relatedTicket = value; } }, metadata: _metadata }, _relatedTicket_initializers, _relatedTicket_extraInitializers);
        __esDecorate(null, null, _comments_decorators, { kind: "field", name: "comments", static: false, private: false, access: { has: function (obj) { return "comments" in obj; }, get: function (obj) { return obj.comments; }, set: function (obj, value) { obj.comments = value; } }, metadata: _metadata }, _comments_initializers, _comments_extraInitializers);
        __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
        __esDecorate(null, null, _activities_decorators, { kind: "field", name: "activities", static: false, private: false, access: { has: function (obj) { return "activities" in obj; }, get: function (obj) { return obj.activities; }, set: function (obj, value) { obj.activities = value; } }, metadata: _metadata }, _activities_initializers, _activities_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ticket = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ticket = _classThis;
}();
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map