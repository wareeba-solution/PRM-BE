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
exports.Document = exports.DocumentStatus = exports.DocumentType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/documents/entities/document.entity.ts
var typeorm_1 = require("typeorm");
var contact_entity_1 = require("../../contacts/entities/contact.entity");
var DocumentType;
(function (DocumentType) {
    DocumentType["MEDICAL_RECORD"] = "MEDICAL_RECORD";
    DocumentType["LAB_RESULT"] = "LAB_RESULT";
    DocumentType["PRESCRIPTION"] = "PRESCRIPTION";
    DocumentType["IMAGING"] = "IMAGING";
    DocumentType["INSURANCE"] = "INSURANCE";
    DocumentType["CONSENT_FORM"] = "CONSENT_FORM";
    DocumentType["IDENTIFICATION"] = "IDENTIFICATION";
    DocumentType["INVOICE"] = "INVOICE";
    DocumentType["RECEIPT"] = "RECEIPT";
    DocumentType["CORRESPONDENCE"] = "CORRESPONDENCE";
    DocumentType["REFERRAL"] = "REFERRAL";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["DRAFT"] = "DRAFT";
    DocumentStatus["PENDING_REVIEW"] = "PENDING_REVIEW";
    DocumentStatus["APPROVED"] = "APPROVED";
    DocumentStatus["REJECTED"] = "REJECTED";
    DocumentStatus["EXPIRED"] = "EXPIRED";
    DocumentStatus["ARCHIVED"] = "ARCHIVED";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
var Document = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('documents'), (0, typeorm_1.Index)(['organizationId', 'contact'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _contact_decorators;
    var _contact_initializers = [];
    var _contact_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileType_decorators;
    var _fileType_initializers = [];
    var _fileType_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _filePath_decorators;
    var _filePath_initializers = [];
    var _filePath_extraInitializers = [];
    var _fileUrl_decorators;
    var _fileUrl_initializers = [];
    var _fileUrl_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _documentDate_decorators;
    var _documentDate_initializers = [];
    var _documentDate_extraInitializers = [];
    var _expiryDate_decorators;
    var _expiryDate_initializers = [];
    var _expiryDate_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _shareWith_decorators;
    var _shareWith_initializers = [];
    var _shareWith_extraInitializers = [];
    var _appointmentId_decorators;
    var _appointmentId_initializers = [];
    var _appointmentId_extraInitializers = [];
    var _medicalHistoryId_decorators;
    var _medicalHistoryId_initializers = [];
    var _medicalHistoryId_extraInitializers = [];
    var _contentText_decorators;
    var _contentText_initializers = [];
    var _contentText_extraInitializers = [];
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
    var Document = _classThis = /** @class */ (function () {
        function Document_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.contactId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.contact = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
            this.name = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.type = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.fileName = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
            this.fileType = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
            this.fileSize = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
            this.filePath = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
            this.fileUrl = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0));
            this.description = (__runInitializers(this, _fileUrl_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.isPrivate = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
            this.documentDate = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _documentDate_initializers, void 0));
            this.expiryDate = (__runInitializers(this, _documentDate_extraInitializers), __runInitializers(this, _expiryDate_initializers, void 0));
            this.metadata = (__runInitializers(this, _expiryDate_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.notes = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.tags = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.shareWith = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _shareWith_initializers, void 0)); // IDs of users/roles who can access this document
            this.appointmentId = (__runInitializers(this, _shareWith_extraInitializers), __runInitializers(this, _appointmentId_initializers, void 0));
            this.medicalHistoryId = (__runInitializers(this, _appointmentId_extraInitializers), __runInitializers(this, _medicalHistoryId_initializers, void 0));
            this.contentText = (__runInitializers(this, _medicalHistoryId_extraInitializers), __runInitializers(this, _contentText_initializers, void 0)); // Extracted text content for searchability
            this.createdById = (__runInitializers(this, _contentText_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        Document_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, contactId: { required: true, type: function () { return String; } }, contact: { required: true, type: function () { return require("../../contacts/entities/contact.entity").Contact; } }, name: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./document.entity").DocumentType }, fileName: { required: true, type: function () { return String; } }, fileType: { required: true, type: function () { return String; } }, fileSize: { required: true, type: function () { return Number; } }, filePath: { required: true, type: function () { return String; } }, fileUrl: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, status: { required: true, enum: require("./document.entity").DocumentStatus }, isPrivate: { required: true, type: function () { return Boolean; } }, documentDate: { required: true, type: function () { return Date; } }, expiryDate: { required: true, type: function () { return Date; } }, metadata: { required: true, type: function () { return ({ author: { required: false, type: function () { return String; } }, source: { required: false, type: function () { return String; } }, keywords: { required: false, type: function () { return [String]; } }, version: { required: false, type: function () { return String; } }, pageCount: { required: false, type: function () { return Number; } }, isOriginal: { required: false, type: function () { return Boolean; } }, relatedDocuments: { required: false, type: function () { return [String]; } }, customProperties: { required: false, type: function () { return Object; } } }); } }, notes: { required: true, type: function () { return String; } }, tags: { required: true, type: function () { return [String]; } }, shareWith: { required: true, type: function () { return [String]; } }, appointmentId: { required: true, type: function () { return String; } }, medicalHistoryId: { required: true, type: function () { return String; } }, contentText: { required: true, type: function () { return String; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: true, type: function () { return Date; } } };
        };
        return Document_1;
    }());
    __setFunctionName(_classThis, "Document");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _contactId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true }), (0, typeorm_1.Index)()];
        _contact_decorators = [(0, typeorm_1.ManyToOne)(function () { return contact_entity_1.Contact; }, function (contact) { return contact.documents; }, { onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'contactId' })];
        _name_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: DocumentType,
                default: DocumentType.OTHER,
            })];
        _fileName_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _fileType_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _fileSize_decorators = [(0, typeorm_1.Column)({ type: 'bigint' })];
        _filePath_decorators = [(0, typeorm_1.Column)({ length: 1024 })];
        _fileUrl_decorators = [(0, typeorm_1.Column)({ length: 1024, nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: DocumentStatus,
                default: DocumentStatus.APPROVED,
            })];
        _isPrivate_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _documentDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _expiryDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _shareWith_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _appointmentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _medicalHistoryId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _contentText_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true }), (0, typeorm_1.Index)()];
        _updatedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true }), (0, typeorm_1.Index)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
        __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: function (obj) { return "fileType" in obj; }, get: function (obj) { return obj.fileType; }, set: function (obj, value) { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
        __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
        __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: function (obj) { return "filePath" in obj; }, get: function (obj) { return obj.filePath; }, set: function (obj, value) { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
        __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: function (obj) { return "fileUrl" in obj; }, get: function (obj) { return obj.fileUrl; }, set: function (obj, value) { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
        __esDecorate(null, null, _documentDate_decorators, { kind: "field", name: "documentDate", static: false, private: false, access: { has: function (obj) { return "documentDate" in obj; }, get: function (obj) { return obj.documentDate; }, set: function (obj, value) { obj.documentDate = value; } }, metadata: _metadata }, _documentDate_initializers, _documentDate_extraInitializers);
        __esDecorate(null, null, _expiryDate_decorators, { kind: "field", name: "expiryDate", static: false, private: false, access: { has: function (obj) { return "expiryDate" in obj; }, get: function (obj) { return obj.expiryDate; }, set: function (obj, value) { obj.expiryDate = value; } }, metadata: _metadata }, _expiryDate_initializers, _expiryDate_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _shareWith_decorators, { kind: "field", name: "shareWith", static: false, private: false, access: { has: function (obj) { return "shareWith" in obj; }, get: function (obj) { return obj.shareWith; }, set: function (obj, value) { obj.shareWith = value; } }, metadata: _metadata }, _shareWith_initializers, _shareWith_extraInitializers);
        __esDecorate(null, null, _appointmentId_decorators, { kind: "field", name: "appointmentId", static: false, private: false, access: { has: function (obj) { return "appointmentId" in obj; }, get: function (obj) { return obj.appointmentId; }, set: function (obj, value) { obj.appointmentId = value; } }, metadata: _metadata }, _appointmentId_initializers, _appointmentId_extraInitializers);
        __esDecorate(null, null, _medicalHistoryId_decorators, { kind: "field", name: "medicalHistoryId", static: false, private: false, access: { has: function (obj) { return "medicalHistoryId" in obj; }, get: function (obj) { return obj.medicalHistoryId; }, set: function (obj, value) { obj.medicalHistoryId = value; } }, metadata: _metadata }, _medicalHistoryId_initializers, _medicalHistoryId_extraInitializers);
        __esDecorate(null, null, _contentText_decorators, { kind: "field", name: "contentText", static: false, private: false, access: { has: function (obj) { return "contentText" in obj; }, get: function (obj) { return obj.contentText; }, set: function (obj, value) { obj.contentText = value; } }, metadata: _metadata }, _contentText_initializers, _contentText_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Document = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Document = _classThis;
}();
exports.Document = Document;
//# sourceMappingURL=document.entity.js.map