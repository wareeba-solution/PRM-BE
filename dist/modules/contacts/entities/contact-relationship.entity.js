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
exports.ContactRelationship = exports.RelationshipType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/entities/contact-relationship.entity.ts
var typeorm_1 = require("typeorm");
/**
 * Represents different types of relationships between contacts
 */
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["SPOUSE"] = "SPOUSE";
    RelationshipType["PARENT"] = "PARENT";
    RelationshipType["CHILD"] = "CHILD";
    RelationshipType["SIBLING"] = "SIBLING";
    RelationshipType["GUARDIAN"] = "GUARDIAN";
    RelationshipType["DEPENDENT"] = "DEPENDENT";
    RelationshipType["EMERGENCY_CONTACT"] = "EMERGENCY_CONTACT";
    RelationshipType["PRIMARY_CARE_PROVIDER"] = "PRIMARY_CARE_PROVIDER";
    RelationshipType["SPECIALIST"] = "SPECIALIST";
    RelationshipType["CAREGIVER"] = "CAREGIVER";
    RelationshipType["RELATIVE"] = "RELATIVE";
    RelationshipType["COLLEAGUE"] = "COLLEAGUE";
    RelationshipType["FRIEND"] = "FRIEND";
    RelationshipType["OTHER"] = "OTHER";
})(RelationshipType || (exports.RelationshipType = RelationshipType = {}));
var ContactRelationship = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('contact_relationships'), (0, typeorm_1.Index)(['organizationId', 'contactId']), (0, typeorm_1.Index)(['organizationId', 'relatedContactId'])];
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
    var _relatedContactId_decorators;
    var _relatedContactId_initializers = [];
    var _relatedContactId_extraInitializers = [];
    var _relatedContact_decorators;
    var _relatedContact_initializers = [];
    var _relatedContact_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _isPrimary_decorators;
    var _isPrimary_initializers = [];
    var _isPrimary_extraInitializers = [];
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
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _inverseType_decorators;
    var _inverseType_initializers = [];
    var _inverseType_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var ContactRelationship = _classThis = /** @class */ (function () {
        function ContactRelationship_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.contactId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.contact = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
            this.relatedContactId = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _relatedContactId_initializers, void 0));
            this.relatedContact = (__runInitializers(this, _relatedContactId_extraInitializers), __runInitializers(this, _relatedContact_initializers, void 0));
            this.type = (__runInitializers(this, _relatedContact_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.notes = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.isActive = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.isPrimary = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isPrimary_initializers, void 0));
            this.createdById = (__runInitializers(this, _isPrimary_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            /**
             * Custom metadata for the relationship (JSON field)
             * This can store additional information specific to the relationship type
             * For example, for a PARENT-CHILD relationship, it might store custodial information
             */
            this.metadata = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            /**
             * Inverse relationship type (if applicable)
             * For example, if this relationship is PARENT, the inverse would be CHILD
             * This helps maintain consistency when querying from either direction
             */
            this.inverseType = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _inverseType_initializers, void 0));
            /**
             * Start date of the relationship (if applicable)
             * For example, when a provider became a patient's specialist
             */
            this.startDate = (__runInitializers(this, _inverseType_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            /**
             * End date of the relationship (if applicable)
             * For example, when a provider stopped being a patient's specialist
             */
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            __runInitializers(this, _endDate_extraInitializers);
        }
        ContactRelationship_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, contactId: { required: true, type: function () { return String; } }, contact: { required: true, type: function () { return require("./contact.entity").Contact; } }, relatedContactId: { required: true, type: function () { return String; } }, relatedContact: { required: true, type: function () { return require("./contact.entity").Contact; } }, type: { required: true, enum: require("./contact-relationship.entity").RelationshipType }, notes: { required: true, type: function () { return String; } }, isActive: { required: true, type: function () { return Boolean; } }, isPrimary: { required: true, type: function () { return Boolean; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: true, type: function () { return Date; } }, metadata: { required: true, type: function () { return Object; }, description: "Custom metadata for the relationship (JSON field)\nThis can store additional information specific to the relationship type\nFor example, for a PARENT-CHILD relationship, it might store custodial information" }, inverseType: { required: true, description: "Inverse relationship type (if applicable)\nFor example, if this relationship is PARENT, the inverse would be CHILD\nThis helps maintain consistency when querying from either direction", enum: require("./contact-relationship.entity").RelationshipType }, startDate: { required: true, type: function () { return Date; }, description: "Start date of the relationship (if applicable)\nFor example, when a provider became a patient's specialist" }, endDate: { required: true, type: function () { return Date; }, description: "End date of the relationship (if applicable)\nFor example, when a provider stopped being a patient's specialist" } };
        };
        return ContactRelationship_1;
    }());
    __setFunctionName(_classThis, "ContactRelationship");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _contactId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _contact_decorators = [(0, typeorm_1.ManyToOne)('Contact', {
                onDelete: 'CASCADE',
            }), (0, typeorm_1.JoinColumn)({ name: 'contactId' })];
        _relatedContactId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _relatedContact_decorators = [(0, typeorm_1.ManyToOne)('Contact', {
                onDelete: 'CASCADE',
            }), (0, typeorm_1.JoinColumn)({ name: 'relatedContactId' })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: RelationshipType,
                default: RelationshipType.OTHER,
            })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _isPrimary_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _createdById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _inverseType_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: RelationshipType,
                nullable: true,
            })];
        _startDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _endDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
        __esDecorate(null, null, _relatedContactId_decorators, { kind: "field", name: "relatedContactId", static: false, private: false, access: { has: function (obj) { return "relatedContactId" in obj; }, get: function (obj) { return obj.relatedContactId; }, set: function (obj, value) { obj.relatedContactId = value; } }, metadata: _metadata }, _relatedContactId_initializers, _relatedContactId_extraInitializers);
        __esDecorate(null, null, _relatedContact_decorators, { kind: "field", name: "relatedContact", static: false, private: false, access: { has: function (obj) { return "relatedContact" in obj; }, get: function (obj) { return obj.relatedContact; }, set: function (obj, value) { obj.relatedContact = value; } }, metadata: _metadata }, _relatedContact_initializers, _relatedContact_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _isPrimary_decorators, { kind: "field", name: "isPrimary", static: false, private: false, access: { has: function (obj) { return "isPrimary" in obj; }, get: function (obj) { return obj.isPrimary; }, set: function (obj, value) { obj.isPrimary = value; } }, metadata: _metadata }, _isPrimary_initializers, _isPrimary_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _inverseType_decorators, { kind: "field", name: "inverseType", static: false, private: false, access: { has: function (obj) { return "inverseType" in obj; }, get: function (obj) { return obj.inverseType; }, set: function (obj, value) { obj.inverseType = value; } }, metadata: _metadata }, _inverseType_initializers, _inverseType_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactRelationship = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactRelationship = _classThis;
}();
exports.ContactRelationship = ContactRelationship;
//# sourceMappingURL=contact-relationship.entity.js.map