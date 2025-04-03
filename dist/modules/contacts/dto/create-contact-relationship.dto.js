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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRelationshipResponseDto = exports.UpdateContactRelationshipDto = exports.CreateContactRelationshipDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/create-contact-relationship.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var contact_relationship_entity_1 = require("../entities/contact-relationship.entity");
var CreateContactRelationshipDto = function () {
    var _a;
    var _relatedContactId_decorators;
    var _relatedContactId_initializers = [];
    var _relatedContactId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _inverseType_decorators;
    var _inverseType_initializers = [];
    var _inverseType_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _isPrimary_decorators;
    var _isPrimary_initializers = [];
    var _isPrimary_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateContactRelationshipDto() {
                this.relatedContactId = __runInitializers(this, _relatedContactId_initializers, void 0);
                this.type = (__runInitializers(this, _relatedContactId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.inverseType = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _inverseType_initializers, void 0));
                this.notes = (__runInitializers(this, _inverseType_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.isPrimary = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _isPrimary_initializers, void 0));
                this.startDate = (__runInitializers(this, _isPrimary_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.metadata = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateContactRelationshipDto._OPENAPI_METADATA_FACTORY = function () {
                return { relatedContactId: { required: true, type: function () { return String; }, format: "uuid" }, type: { required: true, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: function () { return String; }, maxLength: 500 }, isPrimary: { required: false, type: function () { return Boolean; } }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateContactRelationshipDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _relatedContactId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID of the related contact',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of relationship',
                    enum: contact_relationship_entity_1.RelationshipType,
                    example: contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT,
                }), (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType)];
            _inverseType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Inverse type of relationship (from the related contact\'s perspective)',
                    enum: contact_relationship_entity_1.RelationshipType,
                    example: contact_relationship_entity_1.RelationshipType.DEPENDENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType)];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional notes about the relationship',
                    example: 'Primary emergency contact, lives nearby',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _isPrimary_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether this is a primary relationship',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Start date of the relationship (if applicable)',
                    example: '2023-01-01',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'End date of the relationship (if applicable)',
                    example: '2023-12-31',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional metadata for the relationship',
                    example: {
                        custodyPercentage: 50,
                        legalAuthority: true,
                        additionalInfo: 'Shared custody arrangement'
                    },
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _relatedContactId_decorators, { kind: "field", name: "relatedContactId", static: false, private: false, access: { has: function (obj) { return "relatedContactId" in obj; }, get: function (obj) { return obj.relatedContactId; }, set: function (obj, value) { obj.relatedContactId = value; } }, metadata: _metadata }, _relatedContactId_initializers, _relatedContactId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _inverseType_decorators, { kind: "field", name: "inverseType", static: false, private: false, access: { has: function (obj) { return "inverseType" in obj; }, get: function (obj) { return obj.inverseType; }, set: function (obj, value) { obj.inverseType = value; } }, metadata: _metadata }, _inverseType_initializers, _inverseType_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _isPrimary_decorators, { kind: "field", name: "isPrimary", static: false, private: false, access: { has: function (obj) { return "isPrimary" in obj; }, get: function (obj) { return obj.isPrimary; }, set: function (obj, value) { obj.isPrimary = value; } }, metadata: _metadata }, _isPrimary_initializers, _isPrimary_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateContactRelationshipDto = CreateContactRelationshipDto;
var UpdateContactRelationshipDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _inverseType_decorators;
    var _inverseType_initializers = [];
    var _inverseType_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _isPrimary_decorators;
    var _isPrimary_initializers = [];
    var _isPrimary_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateContactRelationshipDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.inverseType = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _inverseType_initializers, void 0));
                this.notes = (__runInitializers(this, _inverseType_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.isPrimary = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _isPrimary_initializers, void 0));
                this.isActive = (__runInitializers(this, _isPrimary_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.startDate = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.metadata = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            UpdateContactRelationshipDto._OPENAPI_METADATA_FACTORY = function () {
                return { type: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: function () { return String; }, maxLength: 500 }, isPrimary: { required: false, type: function () { return Boolean; } }, isActive: { required: false, type: function () { return Boolean; } }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return UpdateContactRelationshipDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Type of relationship',
                    enum: contact_relationship_entity_1.RelationshipType,
                    example: contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType)];
            _inverseType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Inverse type of relationship (from the related contact\'s perspective)',
                    enum: contact_relationship_entity_1.RelationshipType,
                    example: contact_relationship_entity_1.RelationshipType.DEPENDENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType)];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional notes about the relationship',
                    example: 'Primary emergency contact, lives nearby',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _isPrimary_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether this is a primary relationship',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether this relationship is active',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Start date of the relationship (if applicable)',
                    example: '2023-01-01',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'End date of the relationship (if applicable)',
                    example: '2023-12-31',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional metadata for the relationship',
                    example: {
                        custodyPercentage: 50,
                        legalAuthority: true,
                        additionalInfo: 'Shared custody arrangement'
                    },
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _inverseType_decorators, { kind: "field", name: "inverseType", static: false, private: false, access: { has: function (obj) { return "inverseType" in obj; }, get: function (obj) { return obj.inverseType; }, set: function (obj, value) { obj.inverseType = value; } }, metadata: _metadata }, _inverseType_initializers, _inverseType_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _isPrimary_decorators, { kind: "field", name: "isPrimary", static: false, private: false, access: { has: function (obj) { return "isPrimary" in obj; }, get: function (obj) { return obj.isPrimary; }, set: function (obj, value) { obj.isPrimary = value; } }, metadata: _metadata }, _isPrimary_initializers, _isPrimary_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateContactRelationshipDto = UpdateContactRelationshipDto;
var ContactRelationshipResponseDto = /** @class */ (function () {
    function ContactRelationshipResponseDto() {
    }
    ContactRelationshipResponseDto._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: true, type: function () { return String; } }, contactId: { required: true, type: function () { return String; } }, relatedContactId: { required: true, type: function () { return String; } }, relatedContact: { required: true, type: function () { return ({ id: { required: true, type: function () { return String; } }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, phone: { required: true, type: function () { return String; } }, type: { required: true, type: function () { return String; } } }); } }, type: { required: true, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: function () { return String; } }, isPrimary: { required: true, type: function () { return Boolean; } }, isActive: { required: true, type: function () { return Boolean; } }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
    };
    return ContactRelationshipResponseDto;
}());
exports.ContactRelationshipResponseDto = ContactRelationshipResponseDto;
//# sourceMappingURL=create-contact-relationship.dto.js.map