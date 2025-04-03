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
exports.TicketQueryDto = exports.SortOrder = exports.TicketSortField = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var TicketSortField;
(function (TicketSortField) {
    TicketSortField["CREATED_AT"] = "createdAt";
    TicketSortField["UPDATED_AT"] = "updatedAt";
    TicketSortField["PRIORITY"] = "priority";
    TicketSortField["STATUS"] = "status";
    TicketSortField["DUE_DATE"] = "dueDate";
    TicketSortField["LAST_ACTIVITY"] = "lastActivity";
})(TicketSortField || (exports.TicketSortField = TicketSortField = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var TicketQueryDto = function () {
    var _a;
    var _searchTerm_decorators;
    var _searchTerm_initializers = [];
    var _searchTerm_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _priorities_decorators;
    var _priorities_initializers = [];
    var _priorities_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _assigneeIds_decorators;
    var _assigneeIds_initializers = [];
    var _assigneeIds_extraInitializers = [];
    var _creatorIds_decorators;
    var _creatorIds_initializers = [];
    var _creatorIds_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _createdAfter_decorators;
    var _createdAfter_initializers = [];
    var _createdAfter_extraInitializers = [];
    var _createdBefore_decorators;
    var _createdBefore_initializers = [];
    var _createdBefore_extraInitializers = [];
    var _updatedAfter_decorators;
    var _updatedAfter_initializers = [];
    var _updatedAfter_extraInitializers = [];
    var _updatedBefore_decorators;
    var _updatedBefore_initializers = [];
    var _updatedBefore_extraInitializers = [];
    var _dueDateStart_decorators;
    var _dueDateStart_initializers = [];
    var _dueDateStart_extraInitializers = [];
    var _dueDateEnd_decorators;
    var _dueDateEnd_initializers = [];
    var _dueDateEnd_extraInitializers = [];
    var _includeArchived_decorators;
    var _includeArchived_initializers = [];
    var _includeArchived_extraInitializers = [];
    var _hasUnreadUpdates_decorators;
    var _hasUnreadUpdates_initializers = [];
    var _hasUnreadUpdates_extraInitializers = [];
    var _hasAttachments_decorators;
    var _hasAttachments_initializers = [];
    var _hasAttachments_extraInitializers = [];
    var _sortField_decorators;
    var _sortField_initializers = [];
    var _sortField_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var _limit2_decorators;
    var _limit2_initializers = [];
    var _limit2_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _relatedTicketIds_decorators;
    var _relatedTicketIds_initializers = [];
    var _relatedTicketIds_extraInitializers = [];
    var _requiresAttention_decorators;
    var _requiresAttention_initializers = [];
    var _requiresAttention_extraInitializers = [];
    var _hasSlaBreach_decorators;
    var _hasSlaBreach_initializers = [];
    var _hasSlaBreach_extraInitializers = [];
    var _slaStatus_decorators;
    var _slaStatus_initializers = [];
    var _slaStatus_extraInitializers = [];
    var _fields_decorators;
    var _fields_initializers = [];
    var _fields_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TicketQueryDto() {
                this.searchTerm = __runInitializers(this, _searchTerm_initializers, void 0);
                this.priority = (__runInitializers(this, _searchTerm_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.type = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.assigneeId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.contactId = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
                this.departmentId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _departmentId_initializers, void 0));
                this.search = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.startDate = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.page = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                this.status = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.priorities = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _priorities_initializers, void 0)); // Fixed missing property name
                this.category = (__runInitializers(this, _priorities_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.assigneeIds = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _assigneeIds_initializers, void 0));
                this.creatorIds = (__runInitializers(this, _assigneeIds_extraInitializers), __runInitializers(this, _creatorIds_initializers, void 0));
                this.tags = (__runInitializers(this, _creatorIds_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.createdAfter = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _createdAfter_initializers, void 0));
                this.createdBefore = (__runInitializers(this, _createdAfter_extraInitializers), __runInitializers(this, _createdBefore_initializers, void 0));
                this.updatedAfter = (__runInitializers(this, _createdBefore_extraInitializers), __runInitializers(this, _updatedAfter_initializers, void 0));
                this.updatedBefore = (__runInitializers(this, _updatedAfter_extraInitializers), __runInitializers(this, _updatedBefore_initializers, void 0));
                this.dueDateStart = (__runInitializers(this, _updatedBefore_extraInitializers), __runInitializers(this, _dueDateStart_initializers, void 0));
                this.dueDateEnd = (__runInitializers(this, _dueDateStart_extraInitializers), __runInitializers(this, _dueDateEnd_initializers, void 0));
                this.includeArchived = (__runInitializers(this, _dueDateEnd_extraInitializers), __runInitializers(this, _includeArchived_initializers, void 0));
                this.hasUnreadUpdates = (__runInitializers(this, _includeArchived_extraInitializers), __runInitializers(this, _hasUnreadUpdates_initializers, void 0));
                this.hasAttachments = (__runInitializers(this, _hasUnreadUpdates_extraInitializers), __runInitializers(this, _hasAttachments_initializers, void 0));
                this.sortField = (__runInitializers(this, _hasAttachments_extraInitializers), __runInitializers(this, _sortField_initializers, void 0));
                this.sortOrder = (__runInitializers(this, _sortField_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
                this.limit2 = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _limit2_initializers, 20)); // Fixed missing property name
                this.offset = (__runInitializers(this, _limit2_extraInitializers), __runInitializers(this, _offset_initializers, 0));
                this.customFields = (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
                this.relatedTicketIds = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _relatedTicketIds_initializers, void 0));
                this.requiresAttention = (__runInitializers(this, _relatedTicketIds_extraInitializers), __runInitializers(this, _requiresAttention_initializers, void 0));
                this.hasSlaBreach = (__runInitializers(this, _requiresAttention_extraInitializers), __runInitializers(this, _hasSlaBreach_initializers, void 0));
                this.slaStatus = (__runInitializers(this, _hasSlaBreach_extraInitializers), __runInitializers(this, _slaStatus_initializers, void 0));
                this.fields = (__runInitializers(this, _slaStatus_extraInitializers), __runInitializers(this, _fields_initializers, void 0));
                __runInitializers(this, _fields_extraInitializers);
            }
            TicketQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { searchTerm: { required: false, type: function () { return String; } }, priority: { required: false, type: function () { return String; } }, type: { required: false, type: function () { return String; } }, assigneeId: { required: false, type: function () { return String; }, format: "uuid" }, contactId: { required: false, type: function () { return String; }, format: "uuid" }, departmentId: { required: false, type: function () { return String; }, format: "uuid" }, search: { required: false, type: function () { return String; } }, startDate: { required: false, type: function () { return String; } }, endDate: { required: false, type: function () { return String; } }, page: { required: false, type: function () { return Number; }, default: 1, minimum: 1 }, limit: { required: false, type: function () { return Number; }, default: 10, minimum: 1 }, status: { required: false, type: function () { return [String]; } }, priorities: { required: false, type: function () { return [String]; } }, category: { required: false, type: function () { return [String]; } }, assigneeIds: { required: false, type: function () { return [String]; }, format: "uuid" }, creatorIds: { required: false, type: function () { return [String]; }, format: "uuid" }, tags: { required: false, type: function () { return [String]; } }, createdAfter: { required: false, type: function () { return Date; } }, createdBefore: { required: false, type: function () { return Date; } }, updatedAfter: { required: false, type: function () { return Date; } }, updatedBefore: { required: false, type: function () { return Date; } }, dueDateStart: { required: false, type: function () { return Date; } }, dueDateEnd: { required: false, type: function () { return Date; } }, includeArchived: { required: false, type: function () { return Boolean; } }, hasUnreadUpdates: { required: false, type: function () { return Boolean; } }, hasAttachments: { required: false, type: function () { return Boolean; } }, sortField: { required: false, enum: require("./ticket-query.dto").TicketSortField }, sortOrder: { required: false, enum: require("./ticket-query.dto").SortOrder }, limit2: { required: false, type: function () { return Number; }, default: 20, minimum: 1, maximum: 100 }, offset: { required: false, type: function () { return Number; }, default: 0, minimum: 0 }, customFields: { required: false, type: function () { return Object; } }, relatedTicketIds: { required: false, type: function () { return [String]; }, format: "uuid" }, requiresAttention: { required: false, type: function () { return Boolean; } }, hasSlaBreach: { required: false, type: function () { return Boolean; } }, slaStatus: { required: false, type: function () { return [String]; } }, fields: { required: false, type: function () { return [String]; } } };
            };
            return TicketQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _searchTerm_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search term to filter tickets by title or description',
                    example: 'login issue'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _assigneeId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _contactId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _departmentId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _search_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _startDate_decorators = [(0, class_validator_1.IsOptional)()];
            _endDate_decorators = [(0, class_validator_1.IsOptional)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by status',
                    isArray: true,
                    example: ['OPEN', 'IN_PROGRESS']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _priorities_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by priority',
                    isArray: true,
                    example: ['HIGH', 'URGENT']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by category',
                    isArray: true,
                    example: ['TECHNICAL', 'BILLING']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _assigneeIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by assignee IDs',
                    isArray: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _creatorIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by creator IDs',
                    isArray: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by tag names',
                    isArray: true,
                    example: ['bug', 'feature-request']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _createdAfter_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets created after this date',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _createdBefore_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets created before this date',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _updatedAfter_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets updated after this date',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _updatedBefore_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets updated before this date',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _dueDateStart_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by due date range start',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _dueDateEnd_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter tickets by due date range end',
                    type: Date
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
            _includeArchived_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Include archived tickets in results',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasUnreadUpdates_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only return tickets that have unread updates',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasAttachments_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Only return tickets that have attachments',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _sortField_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Field to sort tickets by',
                    enum: TicketSortField,
                    default: TicketSortField.CREATED_AT
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(TicketSortField)];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort order direction',
                    enum: SortOrder,
                    default: SortOrder.DESC
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(SortOrder)];
            _limit2_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of tickets to return',
                    minimum: 1,
                    maximum: 100,
                    default: 20
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _offset_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of tickets to skip',
                    minimum: 0,
                    default: 0
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _customFields_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom field filters',
                    type: 'object',
                    additionalProperties: true // Added this property to fix the error
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return Object; })];
            _relatedTicketIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Relation IDs to filter by',
                    isArray: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _requiresAttention_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Get tickets requiring attention',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasSlaBreach_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Get tickets with SLA breaches',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _slaStatus_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by specific SLA status',
                    example: ['warning', 'breached']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _fields_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Fields to include in the response',
                    isArray: true,
                    example: ['id', 'title', 'status']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _searchTerm_decorators, { kind: "field", name: "searchTerm", static: false, private: false, access: { has: function (obj) { return "searchTerm" in obj; }, get: function (obj) { return obj.searchTerm; }, set: function (obj, value) { obj.searchTerm = value; } }, metadata: _metadata }, _searchTerm_initializers, _searchTerm_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
            __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _priorities_decorators, { kind: "field", name: "priorities", static: false, private: false, access: { has: function (obj) { return "priorities" in obj; }, get: function (obj) { return obj.priorities; }, set: function (obj, value) { obj.priorities = value; } }, metadata: _metadata }, _priorities_initializers, _priorities_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _assigneeIds_decorators, { kind: "field", name: "assigneeIds", static: false, private: false, access: { has: function (obj) { return "assigneeIds" in obj; }, get: function (obj) { return obj.assigneeIds; }, set: function (obj, value) { obj.assigneeIds = value; } }, metadata: _metadata }, _assigneeIds_initializers, _assigneeIds_extraInitializers);
            __esDecorate(null, null, _creatorIds_decorators, { kind: "field", name: "creatorIds", static: false, private: false, access: { has: function (obj) { return "creatorIds" in obj; }, get: function (obj) { return obj.creatorIds; }, set: function (obj, value) { obj.creatorIds = value; } }, metadata: _metadata }, _creatorIds_initializers, _creatorIds_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _createdAfter_decorators, { kind: "field", name: "createdAfter", static: false, private: false, access: { has: function (obj) { return "createdAfter" in obj; }, get: function (obj) { return obj.createdAfter; }, set: function (obj, value) { obj.createdAfter = value; } }, metadata: _metadata }, _createdAfter_initializers, _createdAfter_extraInitializers);
            __esDecorate(null, null, _createdBefore_decorators, { kind: "field", name: "createdBefore", static: false, private: false, access: { has: function (obj) { return "createdBefore" in obj; }, get: function (obj) { return obj.createdBefore; }, set: function (obj, value) { obj.createdBefore = value; } }, metadata: _metadata }, _createdBefore_initializers, _createdBefore_extraInitializers);
            __esDecorate(null, null, _updatedAfter_decorators, { kind: "field", name: "updatedAfter", static: false, private: false, access: { has: function (obj) { return "updatedAfter" in obj; }, get: function (obj) { return obj.updatedAfter; }, set: function (obj, value) { obj.updatedAfter = value; } }, metadata: _metadata }, _updatedAfter_initializers, _updatedAfter_extraInitializers);
            __esDecorate(null, null, _updatedBefore_decorators, { kind: "field", name: "updatedBefore", static: false, private: false, access: { has: function (obj) { return "updatedBefore" in obj; }, get: function (obj) { return obj.updatedBefore; }, set: function (obj, value) { obj.updatedBefore = value; } }, metadata: _metadata }, _updatedBefore_initializers, _updatedBefore_extraInitializers);
            __esDecorate(null, null, _dueDateStart_decorators, { kind: "field", name: "dueDateStart", static: false, private: false, access: { has: function (obj) { return "dueDateStart" in obj; }, get: function (obj) { return obj.dueDateStart; }, set: function (obj, value) { obj.dueDateStart = value; } }, metadata: _metadata }, _dueDateStart_initializers, _dueDateStart_extraInitializers);
            __esDecorate(null, null, _dueDateEnd_decorators, { kind: "field", name: "dueDateEnd", static: false, private: false, access: { has: function (obj) { return "dueDateEnd" in obj; }, get: function (obj) { return obj.dueDateEnd; }, set: function (obj, value) { obj.dueDateEnd = value; } }, metadata: _metadata }, _dueDateEnd_initializers, _dueDateEnd_extraInitializers);
            __esDecorate(null, null, _includeArchived_decorators, { kind: "field", name: "includeArchived", static: false, private: false, access: { has: function (obj) { return "includeArchived" in obj; }, get: function (obj) { return obj.includeArchived; }, set: function (obj, value) { obj.includeArchived = value; } }, metadata: _metadata }, _includeArchived_initializers, _includeArchived_extraInitializers);
            __esDecorate(null, null, _hasUnreadUpdates_decorators, { kind: "field", name: "hasUnreadUpdates", static: false, private: false, access: { has: function (obj) { return "hasUnreadUpdates" in obj; }, get: function (obj) { return obj.hasUnreadUpdates; }, set: function (obj, value) { obj.hasUnreadUpdates = value; } }, metadata: _metadata }, _hasUnreadUpdates_initializers, _hasUnreadUpdates_extraInitializers);
            __esDecorate(null, null, _hasAttachments_decorators, { kind: "field", name: "hasAttachments", static: false, private: false, access: { has: function (obj) { return "hasAttachments" in obj; }, get: function (obj) { return obj.hasAttachments; }, set: function (obj, value) { obj.hasAttachments = value; } }, metadata: _metadata }, _hasAttachments_initializers, _hasAttachments_extraInitializers);
            __esDecorate(null, null, _sortField_decorators, { kind: "field", name: "sortField", static: false, private: false, access: { has: function (obj) { return "sortField" in obj; }, get: function (obj) { return obj.sortField; }, set: function (obj, value) { obj.sortField = value; } }, metadata: _metadata }, _sortField_initializers, _sortField_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _limit2_decorators, { kind: "field", name: "limit2", static: false, private: false, access: { has: function (obj) { return "limit2" in obj; }, get: function (obj) { return obj.limit2; }, set: function (obj, value) { obj.limit2 = value; } }, metadata: _metadata }, _limit2_initializers, _limit2_extraInitializers);
            __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            __esDecorate(null, null, _relatedTicketIds_decorators, { kind: "field", name: "relatedTicketIds", static: false, private: false, access: { has: function (obj) { return "relatedTicketIds" in obj; }, get: function (obj) { return obj.relatedTicketIds; }, set: function (obj, value) { obj.relatedTicketIds = value; } }, metadata: _metadata }, _relatedTicketIds_initializers, _relatedTicketIds_extraInitializers);
            __esDecorate(null, null, _requiresAttention_decorators, { kind: "field", name: "requiresAttention", static: false, private: false, access: { has: function (obj) { return "requiresAttention" in obj; }, get: function (obj) { return obj.requiresAttention; }, set: function (obj, value) { obj.requiresAttention = value; } }, metadata: _metadata }, _requiresAttention_initializers, _requiresAttention_extraInitializers);
            __esDecorate(null, null, _hasSlaBreach_decorators, { kind: "field", name: "hasSlaBreach", static: false, private: false, access: { has: function (obj) { return "hasSlaBreach" in obj; }, get: function (obj) { return obj.hasSlaBreach; }, set: function (obj, value) { obj.hasSlaBreach = value; } }, metadata: _metadata }, _hasSlaBreach_initializers, _hasSlaBreach_extraInitializers);
            __esDecorate(null, null, _slaStatus_decorators, { kind: "field", name: "slaStatus", static: false, private: false, access: { has: function (obj) { return "slaStatus" in obj; }, get: function (obj) { return obj.slaStatus; }, set: function (obj, value) { obj.slaStatus = value; } }, metadata: _metadata }, _slaStatus_initializers, _slaStatus_extraInitializers);
            __esDecorate(null, null, _fields_decorators, { kind: "field", name: "fields", static: false, private: false, access: { has: function (obj) { return "fields" in obj; }, get: function (obj) { return obj.fields; }, set: function (obj, value) { obj.fields = value; } }, metadata: _metadata }, _fields_initializers, _fields_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TicketQueryDto = TicketQueryDto;
//# sourceMappingURL=ticket-query.dto.js.map