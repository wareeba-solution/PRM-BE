"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketComment = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var ticket_entity_1 = require("./ticket.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var ticket_attachment_entity_1 = require("./ticket-attachment.entity");
var TicketComment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('ticket_comments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _isInternal_decorators;
    var _isInternal_initializers = [];
    var _isInternal_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _ticket_decorators;
    var _ticket_initializers = [];
    var _ticket_extraInitializers = [];
    var _authorId_decorators;
    var _authorId_initializers = [];
    var _authorId_extraInitializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _author_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _parent_decorators;
    var _parent_initializers = [];
    var _parent_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _editedAt_decorators;
    var _editedAt_initializers = [];
    var _editedAt_extraInitializers = [];
    var _editedBy_decorators;
    var _editedBy_initializers = [];
    var _editedBy_extraInitializers = [];
    var TicketComment = _classThis = /** @class */ (function () {
        function TicketComment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = __runInitializers(this, _id_extraInitializers);
            this.content = __runInitializers(this, _content_initializers, void 0);
            this.isInternal = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _isInternal_initializers, void 0));
            this.ticketId = (__runInitializers(this, _isInternal_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
            this.ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
            this.authorId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
            this.author = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _author_initializers, void 0));
            this.attachments = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
            this.parentId = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
            // Self-referencing relationships can also use string names
            this.parent = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _parent_initializers, void 0));
            this.metadata = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.editedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _editedAt_initializers, void 0));
            this.editedBy = (__runInitializers(this, _editedAt_extraInitializers), __runInitializers(this, _editedBy_initializers, void 0));
            __runInitializers(this, _editedBy_extraInitializers);
        }
        TicketComment_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, isInternal: { required: true, type: function () { return Boolean; } }, ticketId: { required: true, type: function () { return String; } }, ticket: { required: true, type: function () { return require("./ticket.entity").Ticket; } }, authorId: { required: true, type: function () { return String; } }, author: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, attachments: { required: true, type: function () { return [require("./ticket-attachment.entity").TicketAttachment]; } }, parentId: { required: true, type: function () { return String; } }, parent: { required: true, type: function () { return require("./ticket-comment.entity").TicketComment; } }, metadata: { required: true, type: function () { return Object; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, editedAt: { required: true, type: function () { return Date; } }, editedBy: { required: true, type: function () { return String; } } };
        };
        return TicketComment_1;
    }());
    __setFunctionName(_classThis, "TicketComment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _content_decorators = [(0, typeorm_1.Column)('text')];
        _isInternal_decorators = [(0, typeorm_1.Column)({ default: false })];
        _ticketId_decorators = [(0, typeorm_1.Column)('uuid')];
        _ticket_decorators = [(0, typeorm_1.ManyToOne)(function () { return ticket_entity_1.Ticket; }, function (ticket) { return ticket.comments; }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
        _authorId_decorators = [(0, typeorm_1.Column)('uuid')];
        _author_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'authorId' })];
        _attachments_decorators = [(0, typeorm_1.OneToMany)(function () { return ticket_attachment_entity_1.TicketAttachment; }, function (attachment) { return attachment.comment; })];
        _parentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _parent_decorators = [(0, typeorm_1.ManyToOne)('TicketComment', { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'parentId' })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _editedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _editedBy_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _isInternal_decorators, { kind: "field", name: "isInternal", static: false, private: false, access: { has: function (obj) { return "isInternal" in obj; }, get: function (obj) { return obj.isInternal; }, set: function (obj, value) { obj.isInternal = value; } }, metadata: _metadata }, _isInternal_initializers, _isInternal_extraInitializers);
        __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
        __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: function (obj) { return "ticket" in obj; }, get: function (obj) { return obj.ticket; }, set: function (obj, value) { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
        __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: function (obj) { return "authorId" in obj; }, get: function (obj) { return obj.authorId; }, set: function (obj, value) { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
        __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
        __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
        __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: function (obj) { return "parent" in obj; }, get: function (obj) { return obj.parent; }, set: function (obj, value) { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _editedAt_decorators, { kind: "field", name: "editedAt", static: false, private: false, access: { has: function (obj) { return "editedAt" in obj; }, get: function (obj) { return obj.editedAt; }, set: function (obj, value) { obj.editedAt = value; } }, metadata: _metadata }, _editedAt_initializers, _editedAt_extraInitializers);
        __esDecorate(null, null, _editedBy_decorators, { kind: "field", name: "editedBy", static: false, private: false, access: { has: function (obj) { return "editedBy" in obj; }, get: function (obj) { return obj.editedBy; }, set: function (obj, value) { obj.editedBy = value; } }, metadata: _metadata }, _editedBy_initializers, _editedBy_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketComment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketComment = _classThis;
}();
exports.TicketComment = TicketComment;
//# sourceMappingURL=ticket-comment.entity.js.map