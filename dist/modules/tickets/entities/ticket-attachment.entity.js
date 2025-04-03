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
exports.TicketAttachment = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var ticket_entity_1 = require("./ticket.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var TicketAttachment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('ticket_attachments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _mimeType_decorators;
    var _mimeType_initializers = [];
    var _mimeType_extraInitializers = [];
    var _storageKey_decorators;
    var _storageKey_initializers = [];
    var _storageKey_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _ticket_decorators;
    var _ticket_initializers = [];
    var _ticket_extraInitializers = [];
    var _commentId_decorators;
    var _commentId_initializers = [];
    var _commentId_extraInitializers = [];
    var _comment_decorators;
    var _comment_initializers = [];
    var _comment_extraInitializers = [];
    var _uploadedById_decorators;
    var _uploadedById_initializers = [];
    var _uploadedById_extraInitializers = [];
    var _uploadedBy_decorators;
    var _uploadedBy_initializers = [];
    var _uploadedBy_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var TicketAttachment = _classThis = /** @class */ (function () {
        function TicketAttachment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = __runInitializers(this, _id_extraInitializers);
            this.fileName = __runInitializers(this, _fileName_initializers, void 0);
            this.fileSize = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
            this.mimeType = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
            this.storageKey = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _storageKey_initializers, void 0));
            this.description = (__runInitializers(this, _storageKey_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.ticketId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
            this.ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
            this.commentId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _commentId_initializers, void 0));
            // Use string literal for entity name
            this.comment = (__runInitializers(this, _commentId_extraInitializers), __runInitializers(this, _comment_initializers, void 0));
            this.uploadedById = (__runInitializers(this, _comment_extraInitializers), __runInitializers(this, _uploadedById_initializers, void 0));
            this.uploadedBy = (__runInitializers(this, _uploadedById_extraInitializers), __runInitializers(this, _uploadedBy_initializers, void 0));
            this.metadata = (__runInitializers(this, _uploadedBy_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.isPrivate = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
            this.isActive = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            __runInitializers(this, _isActive_extraInitializers);
        }
        TicketAttachment_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, fileName: { required: true, type: function () { return String; } }, fileSize: { required: true, type: function () { return Number; } }, mimeType: { required: true, type: function () { return String; } }, storageKey: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, ticketId: { required: true, type: function () { return String; } }, ticket: { required: true, type: function () { return require("./ticket.entity").Ticket; } }, commentId: { required: true, type: function () { return String; } }, comment: { required: true, type: function () { return Object; } }, uploadedById: { required: true, type: function () { return String; } }, uploadedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, metadata: { required: true, type: function () { return Object; } }, createdAt: { required: true, type: function () { return Date; } }, isPrivate: { required: true, type: function () { return Boolean; } }, isActive: { required: true, type: function () { return Boolean; } } };
        };
        return TicketAttachment_1;
    }());
    __setFunctionName(_classThis, "TicketAttachment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _fileName_decorators = [(0, typeorm_1.Column)()];
        _fileSize_decorators = [(0, typeorm_1.Column)()];
        _mimeType_decorators = [(0, typeorm_1.Column)()];
        _storageKey_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _ticketId_decorators = [(0, typeorm_1.Column)('uuid')];
        _ticket_decorators = [(0, typeorm_1.ManyToOne)(function () { return ticket_entity_1.Ticket; }, function (ticket) { return ticket.attachments; }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
        _commentId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _comment_decorators = [(0, typeorm_1.ManyToOne)('TicketComment', 'attachments', { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'commentId' })];
        _uploadedById_decorators = [(0, typeorm_1.Column)('uuid')];
        _uploadedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'uploadedById' })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _isPrivate_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
        __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
        __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: function (obj) { return "mimeType" in obj; }, get: function (obj) { return obj.mimeType; }, set: function (obj, value) { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
        __esDecorate(null, null, _storageKey_decorators, { kind: "field", name: "storageKey", static: false, private: false, access: { has: function (obj) { return "storageKey" in obj; }, get: function (obj) { return obj.storageKey; }, set: function (obj, value) { obj.storageKey = value; } }, metadata: _metadata }, _storageKey_initializers, _storageKey_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
        __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: function (obj) { return "ticket" in obj; }, get: function (obj) { return obj.ticket; }, set: function (obj, value) { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
        __esDecorate(null, null, _commentId_decorators, { kind: "field", name: "commentId", static: false, private: false, access: { has: function (obj) { return "commentId" in obj; }, get: function (obj) { return obj.commentId; }, set: function (obj, value) { obj.commentId = value; } }, metadata: _metadata }, _commentId_initializers, _commentId_extraInitializers);
        __esDecorate(null, null, _comment_decorators, { kind: "field", name: "comment", static: false, private: false, access: { has: function (obj) { return "comment" in obj; }, get: function (obj) { return obj.comment; }, set: function (obj, value) { obj.comment = value; } }, metadata: _metadata }, _comment_initializers, _comment_extraInitializers);
        __esDecorate(null, null, _uploadedById_decorators, { kind: "field", name: "uploadedById", static: false, private: false, access: { has: function (obj) { return "uploadedById" in obj; }, get: function (obj) { return obj.uploadedById; }, set: function (obj, value) { obj.uploadedById = value; } }, metadata: _metadata }, _uploadedById_initializers, _uploadedById_extraInitializers);
        __esDecorate(null, null, _uploadedBy_decorators, { kind: "field", name: "uploadedBy", static: false, private: false, access: { has: function (obj) { return "uploadedBy" in obj; }, get: function (obj) { return obj.uploadedBy; }, set: function (obj, value) { obj.uploadedBy = value; } }, metadata: _metadata }, _uploadedBy_initializers, _uploadedBy_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketAttachment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketAttachment = _classThis;
}();
exports.TicketAttachment = TicketAttachment;
//# sourceMappingURL=ticket-attachment.entity.js.map