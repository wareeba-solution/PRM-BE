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
exports.ContactQueryDto = exports.DateRangeDto = exports.SortField = exports.SortOrder = exports.ContactType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/contact-query.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var gender_enum_1 = require("../enums/gender.enum");
var marital_status_enum_1 = require("../enums/marital-status.enum");
var blood_group_enum_1 = require("../enums/blood-group.enum");
var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["PROVIDER"] = "PROVIDER";
    ContactType["STAFF"] = "STAFF";
    ContactType["VENDOR"] = "VENDOR";
    ContactType["OTHER"] = "OTHER";
})(ContactType || (exports.ContactType = ContactType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var SortField;
(function (SortField) {
    SortField["FIRST_NAME"] = "firstName";
    SortField["LAST_NAME"] = "lastName";
    SortField["EMAIL"] = "email";
    SortField["PHONE"] = "phone";
    SortField["DATE_OF_BIRTH"] = "dateOfBirth";
    SortField["CREATED_AT"] = "createdAt";
    SortField["UPDATED_AT"] = "updatedAt";
})(SortField || (exports.SortField = SortField = {}));
var DateRangeDto = function () {
    var _a;
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DateRangeDto() {
                this.from = __runInitializers(this, _from_initializers, void 0);
                this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
                __runInitializers(this, _to_extraInitializers);
            }
            DateRangeDto._OPENAPI_METADATA_FACTORY = function () {
                return { from: { required: false, type: function () { return String; } }, to: { required: false, type: function () { return String; } } };
            };
            return DateRangeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _from_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _to_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
            __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DateRangeDto = DateRangeDto;
var ContactQueryDto = function () {
    var _a;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _maritalStatus_decorators;
    var _maritalStatus_initializers = [];
    var _maritalStatus_extraInitializers = [];
    var _bloodGroup_decorators;
    var _bloodGroup_initializers = [];
    var _bloodGroup_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _groups_decorators;
    var _groups_initializers = [];
    var _groups_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _postalCode_decorators;
    var _postalCode_initializers = [];
    var _postalCode_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _insuranceProvider_decorators;
    var _insuranceProvider_initializers = [];
    var _insuranceProvider_extraInitializers = [];
    var _medicalConditions_decorators;
    var _medicalConditions_initializers = [];
    var _medicalConditions_extraInitializers = [];
    var _allergies_decorators;
    var _allergies_initializers = [];
    var _allergies_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var _includeInactive_decorators;
    var _includeInactive_initializers = [];
    var _includeInactive_extraInitializers = [];
    var _hasUpcomingAppointments_decorators;
    var _hasUpcomingAppointments_initializers = [];
    var _hasUpcomingAppointments_extraInitializers = [];
    var _recentActivityDays_decorators;
    var _recentActivityDays_initializers = [];
    var _recentActivityDays_extraInitializers = [];
    var _allowsEmail_decorators;
    var _allowsEmail_initializers = [];
    var _allowsEmail_extraInitializers = [];
    var _allowsSMS_decorators;
    var _allowsSMS_initializers = [];
    var _allowsSMS_extraInitializers = [];
    var _hasDocuments_decorators;
    var _hasDocuments_initializers = [];
    var _hasDocuments_extraInitializers = [];
    var _hasMedicalHistory_decorators;
    var _hasMedicalHistory_initializers = [];
    var _hasMedicalHistory_extraInitializers = [];
    var _preferredLanguage_decorators;
    var _preferredLanguage_initializers = [];
    var _preferredLanguage_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ContactQueryDto() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.type = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.gender = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
                this.maritalStatus = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _maritalStatus_initializers, void 0));
                this.bloodGroup = (__runInitializers(this, _maritalStatus_extraInitializers), __runInitializers(this, _bloodGroup_initializers, void 0));
                this.isActive = (__runInitializers(this, _bloodGroup_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.tags = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.groups = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
                this.createdAt = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                this.dateOfBirth = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
                this.city = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.country = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                this.postalCode = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.email = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.insuranceProvider = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _insuranceProvider_initializers, void 0));
                this.medicalConditions = (__runInitializers(this, _insuranceProvider_extraInitializers), __runInitializers(this, _medicalConditions_initializers, void 0));
                this.allergies = (__runInitializers(this, _medicalConditions_extraInitializers), __runInitializers(this, _allergies_initializers, void 0));
                this.createdBy = (__runInitializers(this, _allergies_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
                this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
                this.page = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                this.sortBy = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
                this.includeInactive = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _includeInactive_initializers, void 0));
                this.hasUpcomingAppointments = (__runInitializers(this, _includeInactive_extraInitializers), __runInitializers(this, _hasUpcomingAppointments_initializers, void 0));
                this.recentActivityDays = (__runInitializers(this, _hasUpcomingAppointments_extraInitializers), __runInitializers(this, _recentActivityDays_initializers, void 0));
                this.allowsEmail = (__runInitializers(this, _recentActivityDays_extraInitializers), __runInitializers(this, _allowsEmail_initializers, void 0));
                this.allowsSMS = (__runInitializers(this, _allowsEmail_extraInitializers), __runInitializers(this, _allowsSMS_initializers, void 0));
                this.hasDocuments = (__runInitializers(this, _allowsSMS_extraInitializers), __runInitializers(this, _hasDocuments_initializers, void 0));
                this.hasMedicalHistory = (__runInitializers(this, _hasDocuments_extraInitializers), __runInitializers(this, _hasMedicalHistory_initializers, void 0));
                this.preferredLanguage = (__runInitializers(this, _hasMedicalHistory_extraInitializers), __runInitializers(this, _preferredLanguage_initializers, void 0));
                __runInitializers(this, _preferredLanguage_extraInitializers);
            }
            ContactQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { search: { required: false, type: function () { return String; } }, type: { required: false, enum: require("./contact-query.dto").ContactType }, gender: { required: false, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, bloodGroup: { required: false, enum: require("../enums/blood-group.enum").BloodGroup }, isActive: { required: false, type: function () { return Boolean; } }, tags: { required: false, type: function () { return [String]; } }, groups: { required: false, type: function () { return [String]; } }, createdAt: { required: false, type: function () { return require("./contact-query.dto").DateRangeDto; } }, updatedAt: { required: false, type: function () { return require("./contact-query.dto").DateRangeDto; } }, dateOfBirth: { required: false, type: function () { return require("./contact-query.dto").DateRangeDto; } }, city: { required: false, type: function () { return String; } }, state: { required: false, type: function () { return String; } }, country: { required: false, type: function () { return String; } }, postalCode: { required: false, type: function () { return String; } }, email: { required: false, type: function () { return String; }, format: "email" }, phone: { required: false, type: function () { return String; } }, insuranceProvider: { required: false, type: function () { return String; } }, medicalConditions: { required: false, type: function () { return [String]; } }, allergies: { required: false, type: function () { return [String]; } }, createdBy: { required: false, type: function () { return String; } }, updatedBy: { required: false, type: function () { return String; } }, page: { required: false, type: function () { return Number; }, minimum: 1 }, limit: { required: false, type: function () { return Number; }, minimum: 1, maximum: 100 }, sortBy: { required: false, enum: require("./contact-query.dto").SortField, enum: Object.values(SortField) }, sortOrder: { required: false, enum: require("./contact-query.dto").SortOrder, enum: Object.values(SortOrder) }, includeInactive: { required: false, type: function () { return Boolean; } }, hasUpcomingAppointments: { required: false, type: function () { return Boolean; } }, recentActivityDays: { required: false, type: function () { return Number; }, minimum: 1 }, allowsEmail: { required: false, type: function () { return Boolean; } }, allowsSMS: { required: false, type: function () { return Boolean; } }, hasDocuments: { required: false, type: function () { return Boolean; } }, hasMedicalHistory: { required: false, type: function () { return Boolean; } }, preferredLanguage: { required: false, type: function () { return String; } } };
            };
            return ContactQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search term to look in firstName, lastName, email, and phone',
                    example: 'john',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Type of contact',
                    enum: ContactType,
                    example: ContactType.PATIENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ContactType)];
            _gender_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by gender',
                    enum: gender_enum_1.Gender,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(gender_enum_1.Gender)];
            _maritalStatus_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by marital status',
                    enum: marital_status_enum_1.MaritalStatus,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus)];
            _bloodGroup_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by blood group',
                    enum: blood_group_enum_1.BloodGroup,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup)];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by active status',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by specific tags',
                    type: [String],
                    example: ['vip', 'recurring'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _groups_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by group IDs',
                    type: [String],
                    example: ['group1', 'group2'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _createdAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by creation date range',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _updatedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by update date range',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _dateOfBirth_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by date of birth range',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _city_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by city',
                    example: 'New York',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _state_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by state',
                    example: 'NY',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _country_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by country',
                    example: 'USA',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _postalCode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by postal code',
                    example: '10001',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by email',
                    example: 'john.doe@example.com',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by phone number',
                    example: '+1234567890',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _insuranceProvider_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by insurance provider',
                    example: 'Blue Cross',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _medicalConditions_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by medical conditions',
                    type: [String],
                    example: ['diabetes', 'hypertension'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _allergies_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by allergies',
                    type: [String],
                    example: ['penicillin', 'peanuts'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _createdBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by created by user ID',
                    example: 'user123',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _updatedBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by updated by user ID',
                    example: 'user123',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Page number for pagination',
                    minimum: 1,
                    default: 1,
                    example: 1,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of items per page',
                    minimum: 1,
                    maximum: 100,
                    default: 10,
                    example: 20,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Field to sort by',
                    enum: SortField,
                    default: SortField.CREATED_AT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(Object.values(SortField))];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort order',
                    enum: SortOrder,
                    default: SortOrder.DESC,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(Object.values(SortOrder))];
            _includeInactive_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Include inactive contacts in results',
                    default: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasUpcomingAppointments_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Include contacts with upcoming appointments',
                    default: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _recentActivityDays_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only include contacts with recent activity',
                    example: 30, // Last 30 days
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _allowsEmail_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only include contacts with specific communication preferences',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _allowsSMS_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only include contacts that allow SMS',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasDocuments_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only include contacts with documents',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasMedicalHistory_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only include contacts with medical history',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _preferredLanguage_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Preferred language for filtering',
                    example: 'en',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
            __esDecorate(null, null, _maritalStatus_decorators, { kind: "field", name: "maritalStatus", static: false, private: false, access: { has: function (obj) { return "maritalStatus" in obj; }, get: function (obj) { return obj.maritalStatus; }, set: function (obj, value) { obj.maritalStatus = value; } }, metadata: _metadata }, _maritalStatus_initializers, _maritalStatus_extraInitializers);
            __esDecorate(null, null, _bloodGroup_decorators, { kind: "field", name: "bloodGroup", static: false, private: false, access: { has: function (obj) { return "bloodGroup" in obj; }, get: function (obj) { return obj.bloodGroup; }, set: function (obj, value) { obj.bloodGroup = value; } }, metadata: _metadata }, _bloodGroup_initializers, _bloodGroup_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: function (obj) { return "groups" in obj; }, get: function (obj) { return obj.groups; }, set: function (obj, value) { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _insuranceProvider_decorators, { kind: "field", name: "insuranceProvider", static: false, private: false, access: { has: function (obj) { return "insuranceProvider" in obj; }, get: function (obj) { return obj.insuranceProvider; }, set: function (obj, value) { obj.insuranceProvider = value; } }, metadata: _metadata }, _insuranceProvider_initializers, _insuranceProvider_extraInitializers);
            __esDecorate(null, null, _medicalConditions_decorators, { kind: "field", name: "medicalConditions", static: false, private: false, access: { has: function (obj) { return "medicalConditions" in obj; }, get: function (obj) { return obj.medicalConditions; }, set: function (obj, value) { obj.medicalConditions = value; } }, metadata: _metadata }, _medicalConditions_initializers, _medicalConditions_extraInitializers);
            __esDecorate(null, null, _allergies_decorators, { kind: "field", name: "allergies", static: false, private: false, access: { has: function (obj) { return "allergies" in obj; }, get: function (obj) { return obj.allergies; }, set: function (obj, value) { obj.allergies = value; } }, metadata: _metadata }, _allergies_initializers, _allergies_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _includeInactive_decorators, { kind: "field", name: "includeInactive", static: false, private: false, access: { has: function (obj) { return "includeInactive" in obj; }, get: function (obj) { return obj.includeInactive; }, set: function (obj, value) { obj.includeInactive = value; } }, metadata: _metadata }, _includeInactive_initializers, _includeInactive_extraInitializers);
            __esDecorate(null, null, _hasUpcomingAppointments_decorators, { kind: "field", name: "hasUpcomingAppointments", static: false, private: false, access: { has: function (obj) { return "hasUpcomingAppointments" in obj; }, get: function (obj) { return obj.hasUpcomingAppointments; }, set: function (obj, value) { obj.hasUpcomingAppointments = value; } }, metadata: _metadata }, _hasUpcomingAppointments_initializers, _hasUpcomingAppointments_extraInitializers);
            __esDecorate(null, null, _recentActivityDays_decorators, { kind: "field", name: "recentActivityDays", static: false, private: false, access: { has: function (obj) { return "recentActivityDays" in obj; }, get: function (obj) { return obj.recentActivityDays; }, set: function (obj, value) { obj.recentActivityDays = value; } }, metadata: _metadata }, _recentActivityDays_initializers, _recentActivityDays_extraInitializers);
            __esDecorate(null, null, _allowsEmail_decorators, { kind: "field", name: "allowsEmail", static: false, private: false, access: { has: function (obj) { return "allowsEmail" in obj; }, get: function (obj) { return obj.allowsEmail; }, set: function (obj, value) { obj.allowsEmail = value; } }, metadata: _metadata }, _allowsEmail_initializers, _allowsEmail_extraInitializers);
            __esDecorate(null, null, _allowsSMS_decorators, { kind: "field", name: "allowsSMS", static: false, private: false, access: { has: function (obj) { return "allowsSMS" in obj; }, get: function (obj) { return obj.allowsSMS; }, set: function (obj, value) { obj.allowsSMS = value; } }, metadata: _metadata }, _allowsSMS_initializers, _allowsSMS_extraInitializers);
            __esDecorate(null, null, _hasDocuments_decorators, { kind: "field", name: "hasDocuments", static: false, private: false, access: { has: function (obj) { return "hasDocuments" in obj; }, get: function (obj) { return obj.hasDocuments; }, set: function (obj, value) { obj.hasDocuments = value; } }, metadata: _metadata }, _hasDocuments_initializers, _hasDocuments_extraInitializers);
            __esDecorate(null, null, _hasMedicalHistory_decorators, { kind: "field", name: "hasMedicalHistory", static: false, private: false, access: { has: function (obj) { return "hasMedicalHistory" in obj; }, get: function (obj) { return obj.hasMedicalHistory; }, set: function (obj, value) { obj.hasMedicalHistory = value; } }, metadata: _metadata }, _hasMedicalHistory_initializers, _hasMedicalHistory_extraInitializers);
            __esDecorate(null, null, _preferredLanguage_decorators, { kind: "field", name: "preferredLanguage", static: false, private: false, access: { has: function (obj) { return "preferredLanguage" in obj; }, get: function (obj) { return obj.preferredLanguage; }, set: function (obj, value) { obj.preferredLanguage = value; } }, metadata: _metadata }, _preferredLanguage_initializers, _preferredLanguage_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ContactQueryDto = ContactQueryDto;
//# sourceMappingURL=contact-query.dto.js.map