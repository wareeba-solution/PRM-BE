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
exports.NotificationQueryDto = exports.DateRangeDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var notification_preference_entity_1 = require("../entities/notification-preference.entity");
var DateRangeDto = function () {
    var _a;
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DateRangeDto() {
                this.startDate = __runInitializers(this, _startDate_initializers, void 0);
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                __runInitializers(this, _endDate_extraInitializers);
            }
            DateRangeDto._OPENAPI_METADATA_FACTORY = function () {
                return { startDate: { required: false, type: function () { return String; } }, endDate: { required: false, type: function () { return String; } } };
            };
            return DateRangeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for the range' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for the range' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DateRangeDto = DateRangeDto;
var NotificationQueryDto = function () {
    var _a;
    var _skip_decorators;
    var _skip_initializers = [];
    var _skip_extraInitializers = [];
    var _categories_decorators;
    var _categories_initializers = [];
    var _categories_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _isRead_decorators;
    var _isRead_initializers = [];
    var _isRead_extraInitializers = [];
    var _isArchived_decorators;
    var _isArchived_initializers = [];
    var _isArchived_extraInitializers = [];
    var _userIds_decorators;
    var _userIds_initializers = [];
    var _userIds_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _senderIds_decorators;
    var _senderIds_initializers = [];
    var _senderIds_extraInitializers = [];
    var _dateRange_decorators;
    var _dateRange_initializers = [];
    var _dateRange_extraInitializers = [];
    var _priorities_decorators;
    var _priorities_initializers = [];
    var _priorities_extraInitializers = [];
    var _statuses_decorators;
    var _statuses_initializers = [];
    var _statuses_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _isActionable_decorators;
    var _isActionable_initializers = [];
    var _isActionable_extraInitializers = [];
    var _isActionTaken_decorators;
    var _isActionTaken_initializers = [];
    var _isActionTaken_extraInitializers = [];
    var _includeDeleted_decorators;
    var _includeDeleted_initializers = [];
    var _includeDeleted_extraInitializers = [];
    var _groupBy_decorators;
    var _groupBy_initializers = [];
    var _groupBy_extraInitializers = [];
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
    var _templateIds_decorators;
    var _templateIds_initializers = [];
    var _templateIds_extraInitializers = [];
    var _deliveryStatuses_decorators;
    var _deliveryStatuses_initializers = [];
    var _deliveryStatuses_extraInitializers = [];
    var _hasAttachments_decorators;
    var _hasAttachments_initializers = [];
    var _hasAttachments_extraInitializers = [];
    var _sources_decorators;
    var _sources_initializers = [];
    var _sources_extraInitializers = [];
    var _includeMetadata_decorators;
    var _includeMetadata_initializers = [];
    var _includeMetadata_extraInitializers = [];
    var _includeReadReceipts_decorators;
    var _includeReadReceipts_initializers = [];
    var _includeReadReceipts_extraInitializers = [];
    var _importanceLevel_decorators;
    var _importanceLevel_initializers = [];
    var _importanceLevel_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationQueryDto() {
                this.skip = __runInitializers(this, _skip_initializers, void 0);
                this.take = __runInitializers(this, _skip_extraInitializers);
                this.categories = __runInitializers(this, _categories_initializers, void 0);
                this.userId = __runInitializers(this, _categories_extraInitializers);
                this.channels = __runInitializers(this, _channels_initializers, void 0);
                this.isRead = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _isRead_initializers, void 0));
                this.isArchived = (__runInitializers(this, _isRead_extraInitializers), __runInitializers(this, _isArchived_initializers, void 0));
                this.userIds = (__runInitializers(this, _isArchived_extraInitializers), __runInitializers(this, _userIds_initializers, void 0));
                this.status = (__runInitializers(this, _userIds_extraInitializers), __runInitializers(this, _status_initializers, void 0)); // Add this line
                this.recipientIds = __runInitializers(this, _status_extraInitializers);
                this.senderIds = __runInitializers(this, _senderIds_initializers, void 0);
                this.dateRange = (__runInitializers(this, _senderIds_extraInitializers), __runInitializers(this, _dateRange_initializers, void 0));
                this.priorities = (__runInitializers(this, _dateRange_extraInitializers), __runInitializers(this, _priorities_initializers, void 0));
                this.statuses = (__runInitializers(this, _priorities_extraInitializers), __runInitializers(this, _statuses_initializers, void 0));
                this.tags = (__runInitializers(this, _statuses_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.isActionable = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _isActionable_initializers, void 0));
                this.isActionTaken = (__runInitializers(this, _isActionable_extraInitializers), __runInitializers(this, _isActionTaken_initializers, void 0));
                this.includeDeleted = (__runInitializers(this, _isActionTaken_extraInitializers), __runInitializers(this, _includeDeleted_initializers, void 0));
                this.groupBy = (__runInitializers(this, _includeDeleted_extraInitializers), __runInitializers(this, _groupBy_initializers, void 0));
                // Pagination parameters
                this.page = (__runInitializers(this, _groupBy_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                // Sorting parameters
                this.sortBy = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sortBy_initializers, 'createdAt'));
                this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, 'DESC'));
                // Additional filters
                this.templateIds = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _templateIds_initializers, void 0));
                this.deliveryStatuses = (__runInitializers(this, _templateIds_extraInitializers), __runInitializers(this, _deliveryStatuses_initializers, void 0));
                this.hasAttachments = (__runInitializers(this, _deliveryStatuses_extraInitializers), __runInitializers(this, _hasAttachments_initializers, void 0));
                this.sources = (__runInitializers(this, _hasAttachments_extraInitializers), __runInitializers(this, _sources_initializers, void 0));
                this.includeMetadata = (__runInitializers(this, _sources_extraInitializers), __runInitializers(this, _includeMetadata_initializers, void 0));
                this.includeReadReceipts = (__runInitializers(this, _includeMetadata_extraInitializers), __runInitializers(this, _includeReadReceipts_initializers, void 0));
                this.importanceLevel = (__runInitializers(this, _includeReadReceipts_extraInitializers), __runInitializers(this, _importanceLevel_initializers, void 0));
                __runInitializers(this, _importanceLevel_extraInitializers);
            }
            NotificationQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { skip: { required: false, type: function () { return Number; }, format: "uuid" }, take: { required: false, type: function () { return Number; } }, includeRead: { required: false, type: function () { return Boolean; } }, categories: { required: false, enum: require("../entities/notification-preference.entity").NotificationCategory, isArray: true }, userId: { required: false, type: function () { return String; } }, organizationId: { required: false, type: function () { return String; } }, channels: { required: false, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true }, isRead: { required: false, type: function () { return Boolean; } }, isArchived: { required: false, type: function () { return Boolean; } }, userIds: { required: false, type: function () { return [String]; }, format: "uuid", maxItems: 50 }, status: { required: false, type: function () { return String; }, format: "uuid", maxItems: 50 }, recipientIds: { required: false, type: function () { return [String]; } }, type: { required: false, type: function () { return String; } }, read: { required: false, type: function () { return Boolean; } }, priority: { required: false, type: function () { return String; } }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, senderIds: { required: false, type: function () { return [String]; }, format: "uuid", maxItems: 50 }, dateRange: { required: false, type: function () { return require("./notification-query.dto").DateRangeDto; } }, priorities: { required: false, type: function () { return [String]; }, maxItems: 10 }, statuses: { required: false, type: function () { return [String]; }, maxItems: 10 }, tags: { required: false, type: function () { return [String]; }, maxItems: 20 }, isActionable: { required: false, type: function () { return Boolean; } }, isActionTaken: { required: false, type: function () { return Boolean; } }, includeDeleted: { required: false, type: function () { return Boolean; } }, groupBy: { required: false, type: function () { return String; } }, page: { required: false, type: function () { return Number; }, default: 1, minimum: 1 }, limit: { required: false, type: function () { return Number; }, default: 10, minimum: 1, maximum: 100 }, sortBy: { required: false, type: function () { return String; }, default: "createdAt" }, sortOrder: { required: false, type: function () { return Object; }, default: "DESC" }, templateIds: { required: false, type: function () { return [String]; }, format: "uuid" }, deliveryStatuses: { required: false, type: function () { return [String]; } }, hasAttachments: { required: false, type: function () { return Boolean; } }, sources: { required: false, type: function () { return [String]; } }, includeMetadata: { required: false, type: function () { return Boolean; } }, includeReadReceipts: { required: false, type: function () { return Boolean; } }, importanceLevel: { required: false, type: function () { return Number; }, minimum: 1, maximum: 5 } };
            };
            return NotificationQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _skip_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Search term for notification content' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _categories_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationCategory, isArray: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory, { each: true })];
            _channels_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true })];
            _isRead_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by read status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isArchived_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by archived status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _userIds_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific user IDs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.ArrayMaxSize)(50)];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific recipient IDs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.ArrayMaxSize)(50)];
            _senderIds_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific sender IDs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.ArrayMaxSize)(50)];
            _dateRange_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _priorities_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by priority levels' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(10)];
            _statuses_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status types' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(10)];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific tags' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(20)];
            _isActionable_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by actionable status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isActionTaken_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by action taken status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeDeleted_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include deleted notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _groupBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Group results by field' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number', minimum: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', minimum: 1, maximum: 100 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort field' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['ASC', 'DESC'])];
            _templateIds_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific template IDs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _deliveryStatuses_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by delivery status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _hasAttachments_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include only notifications with attachments' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _sources_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific source systems' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _includeMetadata_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include metadata in response' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeReadReceipts_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include read receipts in response' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _importanceLevel_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by importance level', minimum: 1, maximum: 5 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            __esDecorate(null, null, _skip_decorators, { kind: "field", name: "skip", static: false, private: false, access: { has: function (obj) { return "skip" in obj; }, get: function (obj) { return obj.skip; }, set: function (obj, value) { obj.skip = value; } }, metadata: _metadata }, _skip_initializers, _skip_extraInitializers);
            __esDecorate(null, null, _categories_decorators, { kind: "field", name: "categories", static: false, private: false, access: { has: function (obj) { return "categories" in obj; }, get: function (obj) { return obj.categories; }, set: function (obj, value) { obj.categories = value; } }, metadata: _metadata }, _categories_initializers, _categories_extraInitializers);
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
            __esDecorate(null, null, _isRead_decorators, { kind: "field", name: "isRead", static: false, private: false, access: { has: function (obj) { return "isRead" in obj; }, get: function (obj) { return obj.isRead; }, set: function (obj, value) { obj.isRead = value; } }, metadata: _metadata }, _isRead_initializers, _isRead_extraInitializers);
            __esDecorate(null, null, _isArchived_decorators, { kind: "field", name: "isArchived", static: false, private: false, access: { has: function (obj) { return "isArchived" in obj; }, get: function (obj) { return obj.isArchived; }, set: function (obj, value) { obj.isArchived = value; } }, metadata: _metadata }, _isArchived_initializers, _isArchived_extraInitializers);
            __esDecorate(null, null, _userIds_decorators, { kind: "field", name: "userIds", static: false, private: false, access: { has: function (obj) { return "userIds" in obj; }, get: function (obj) { return obj.userIds; }, set: function (obj, value) { obj.userIds = value; } }, metadata: _metadata }, _userIds_initializers, _userIds_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _senderIds_decorators, { kind: "field", name: "senderIds", static: false, private: false, access: { has: function (obj) { return "senderIds" in obj; }, get: function (obj) { return obj.senderIds; }, set: function (obj, value) { obj.senderIds = value; } }, metadata: _metadata }, _senderIds_initializers, _senderIds_extraInitializers);
            __esDecorate(null, null, _dateRange_decorators, { kind: "field", name: "dateRange", static: false, private: false, access: { has: function (obj) { return "dateRange" in obj; }, get: function (obj) { return obj.dateRange; }, set: function (obj, value) { obj.dateRange = value; } }, metadata: _metadata }, _dateRange_initializers, _dateRange_extraInitializers);
            __esDecorate(null, null, _priorities_decorators, { kind: "field", name: "priorities", static: false, private: false, access: { has: function (obj) { return "priorities" in obj; }, get: function (obj) { return obj.priorities; }, set: function (obj, value) { obj.priorities = value; } }, metadata: _metadata }, _priorities_initializers, _priorities_extraInitializers);
            __esDecorate(null, null, _statuses_decorators, { kind: "field", name: "statuses", static: false, private: false, access: { has: function (obj) { return "statuses" in obj; }, get: function (obj) { return obj.statuses; }, set: function (obj, value) { obj.statuses = value; } }, metadata: _metadata }, _statuses_initializers, _statuses_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _isActionable_decorators, { kind: "field", name: "isActionable", static: false, private: false, access: { has: function (obj) { return "isActionable" in obj; }, get: function (obj) { return obj.isActionable; }, set: function (obj, value) { obj.isActionable = value; } }, metadata: _metadata }, _isActionable_initializers, _isActionable_extraInitializers);
            __esDecorate(null, null, _isActionTaken_decorators, { kind: "field", name: "isActionTaken", static: false, private: false, access: { has: function (obj) { return "isActionTaken" in obj; }, get: function (obj) { return obj.isActionTaken; }, set: function (obj, value) { obj.isActionTaken = value; } }, metadata: _metadata }, _isActionTaken_initializers, _isActionTaken_extraInitializers);
            __esDecorate(null, null, _includeDeleted_decorators, { kind: "field", name: "includeDeleted", static: false, private: false, access: { has: function (obj) { return "includeDeleted" in obj; }, get: function (obj) { return obj.includeDeleted; }, set: function (obj, value) { obj.includeDeleted = value; } }, metadata: _metadata }, _includeDeleted_initializers, _includeDeleted_extraInitializers);
            __esDecorate(null, null, _groupBy_decorators, { kind: "field", name: "groupBy", static: false, private: false, access: { has: function (obj) { return "groupBy" in obj; }, get: function (obj) { return obj.groupBy; }, set: function (obj, value) { obj.groupBy = value; } }, metadata: _metadata }, _groupBy_initializers, _groupBy_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _templateIds_decorators, { kind: "field", name: "templateIds", static: false, private: false, access: { has: function (obj) { return "templateIds" in obj; }, get: function (obj) { return obj.templateIds; }, set: function (obj, value) { obj.templateIds = value; } }, metadata: _metadata }, _templateIds_initializers, _templateIds_extraInitializers);
            __esDecorate(null, null, _deliveryStatuses_decorators, { kind: "field", name: "deliveryStatuses", static: false, private: false, access: { has: function (obj) { return "deliveryStatuses" in obj; }, get: function (obj) { return obj.deliveryStatuses; }, set: function (obj, value) { obj.deliveryStatuses = value; } }, metadata: _metadata }, _deliveryStatuses_initializers, _deliveryStatuses_extraInitializers);
            __esDecorate(null, null, _hasAttachments_decorators, { kind: "field", name: "hasAttachments", static: false, private: false, access: { has: function (obj) { return "hasAttachments" in obj; }, get: function (obj) { return obj.hasAttachments; }, set: function (obj, value) { obj.hasAttachments = value; } }, metadata: _metadata }, _hasAttachments_initializers, _hasAttachments_extraInitializers);
            __esDecorate(null, null, _sources_decorators, { kind: "field", name: "sources", static: false, private: false, access: { has: function (obj) { return "sources" in obj; }, get: function (obj) { return obj.sources; }, set: function (obj, value) { obj.sources = value; } }, metadata: _metadata }, _sources_initializers, _sources_extraInitializers);
            __esDecorate(null, null, _includeMetadata_decorators, { kind: "field", name: "includeMetadata", static: false, private: false, access: { has: function (obj) { return "includeMetadata" in obj; }, get: function (obj) { return obj.includeMetadata; }, set: function (obj, value) { obj.includeMetadata = value; } }, metadata: _metadata }, _includeMetadata_initializers, _includeMetadata_extraInitializers);
            __esDecorate(null, null, _includeReadReceipts_decorators, { kind: "field", name: "includeReadReceipts", static: false, private: false, access: { has: function (obj) { return "includeReadReceipts" in obj; }, get: function (obj) { return obj.includeReadReceipts; }, set: function (obj, value) { obj.includeReadReceipts = value; } }, metadata: _metadata }, _includeReadReceipts_initializers, _includeReadReceipts_extraInitializers);
            __esDecorate(null, null, _importanceLevel_decorators, { kind: "field", name: "importanceLevel", static: false, private: false, access: { has: function (obj) { return "importanceLevel" in obj; }, get: function (obj) { return obj.importanceLevel; }, set: function (obj, value) { obj.importanceLevel = value; } }, metadata: _metadata }, _importanceLevel_initializers, _importanceLevel_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NotificationQueryDto = NotificationQueryDto;
//# sourceMappingURL=notification-query.dto.js.map