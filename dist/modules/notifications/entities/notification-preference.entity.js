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
exports.NotificationPreference = exports.NotificationFrequency = exports.NotificationCategory = exports.NotificationChannel = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var user_entity_1 = require("../../users/entities/user.entity");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["EMAIL"] = "EMAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["PUSH"] = "PUSH";
    NotificationChannel["IN_APP"] = "IN_APP";
    NotificationChannel["WHATSAPP"] = "WHATSAPP";
    NotificationChannel["SLACK"] = "SLACK";
    NotificationChannel["WEBHOOK"] = "WEBHOOK";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
var NotificationCategory;
(function (NotificationCategory) {
    NotificationCategory["APPOINTMENT"] = "APPOINTMENT";
    NotificationCategory["TICKET"] = "TICKET";
    NotificationCategory["SYSTEM"] = "SYSTEM";
    NotificationCategory["SECURITY"] = "SECURITY";
    NotificationCategory["BILLING"] = "BILLING";
    NotificationCategory["MESSAGING"] = "MESSAGING";
    NotificationCategory["TASK"] = "TASK";
    NotificationCategory["REMINDER"] = "REMINDER";
    NotificationCategory["ALERT"] = "ALERT";
    NotificationCategory["NEWS"] = "NEWS";
})(NotificationCategory || (exports.NotificationCategory = NotificationCategory = {}));
var NotificationFrequency;
(function (NotificationFrequency) {
    NotificationFrequency["IMMEDIATELY"] = "IMMEDIATELY";
    NotificationFrequency["DAILY_DIGEST"] = "DAILY_DIGEST";
    NotificationFrequency["WEEKLY_DIGEST"] = "WEEKLY_DIGEST";
    NotificationFrequency["CUSTOM"] = "CUSTOM";
    NotificationFrequency["NEVER"] = "NEVER";
})(NotificationFrequency || (exports.NotificationFrequency = NotificationFrequency = {}));
var NotificationPreference = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('notification_preferences'), (0, typeorm_1.Index)(['organizationId', 'userId']), (0, typeorm_1.Index)(['organizationId', 'category']), (0, typeorm_1.Check)("\"startTime\" < \"endTime\"")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _enabledChannels_decorators;
    var _enabledChannels_initializers = [];
    var _enabledChannels_extraInitializers = [];
    var _frequency_decorators;
    var _frequency_initializers = [];
    var _frequency_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _workDays_decorators;
    var _workDays_initializers = [];
    var _workDays_extraInitializers = [];
    var _customSchedule_decorators;
    var _customSchedule_initializers = [];
    var _customSchedule_extraInitializers = [];
    var _channelSpecificSettings_decorators;
    var _channelSpecificSettings_initializers = [];
    var _channelSpecificSettings_extraInitializers = [];
    var _filters_decorators;
    var _filters_initializers = [];
    var _filters_extraInitializers = [];
    var _importanceThreshold_decorators;
    var _importanceThreshold_initializers = [];
    var _importanceThreshold_extraInitializers = [];
    var _muteAll_decorators;
    var _muteAll_initializers = [];
    var _muteAll_extraInitializers = [];
    var _muteUntil_decorators;
    var _muteUntil_initializers = [];
    var _muteUntil_extraInitializers = [];
    var _digestSettings_decorators;
    var _digestSettings_initializers = [];
    var _digestSettings_extraInitializers = [];
    var _allowReminders_decorators;
    var _allowReminders_initializers = [];
    var _allowReminders_extraInitializers = [];
    var _reminderInterval_decorators;
    var _reminderInterval_initializers = [];
    var _reminderInterval_extraInitializers = [];
    var _maxReminders_decorators;
    var _maxReminders_initializers = [];
    var _maxReminders_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var NotificationPreference = _classThis = /** @class */ (function () {
        function NotificationPreference_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.userId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.category = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.channels = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _channels_initializers, void 0));
            this.enabledChannels = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _enabledChannels_initializers, void 0));
            this.frequency = (__runInitializers(this, _enabledChannels_extraInitializers), __runInitializers(this, _frequency_initializers, void 0));
            this.enabled = (__runInitializers(this, _frequency_extraInitializers), __runInitializers(this, _enabled_initializers, void 0));
            this.startTime = (__runInitializers(this, _enabled_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.workDays = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _workDays_initializers, void 0));
            this.customSchedule = (__runInitializers(this, _workDays_extraInitializers), __runInitializers(this, _customSchedule_initializers, void 0));
            this.channelSpecificSettings = (__runInitializers(this, _customSchedule_extraInitializers), __runInitializers(this, _channelSpecificSettings_initializers, void 0));
            this.filters = (__runInitializers(this, _channelSpecificSettings_extraInitializers), __runInitializers(this, _filters_initializers, void 0));
            this.importanceThreshold = (__runInitializers(this, _filters_extraInitializers), __runInitializers(this, _importanceThreshold_initializers, void 0));
            this.muteAll = (__runInitializers(this, _importanceThreshold_extraInitializers), __runInitializers(this, _muteAll_initializers, void 0));
            this.muteUntil = (__runInitializers(this, _muteAll_extraInitializers), __runInitializers(this, _muteUntil_initializers, void 0));
            this.digestSettings = (__runInitializers(this, _muteUntil_extraInitializers), __runInitializers(this, _digestSettings_initializers, void 0));
            this.allowReminders = (__runInitializers(this, _digestSettings_extraInitializers), __runInitializers(this, _allowReminders_initializers, void 0));
            this.reminderInterval = (__runInitializers(this, _allowReminders_extraInitializers), __runInitializers(this, _reminderInterval_initializers, void 0));
            this.maxReminders = (__runInitializers(this, _reminderInterval_extraInitializers), __runInitializers(this, _maxReminders_initializers, void 0));
            this.metadata = (__runInitializers(this, _maxReminders_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            this.createdById = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            // Relations with ApiProperty decorators to break circular references
            this.organization = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.user = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.createdBy = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            __runInitializers(this, _updatedBy_extraInitializers);
        }
        NotificationPreference_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, category: { required: true, enum: require("./notification-preference.entity").NotificationCategory }, channels: { required: true, enum: require("./notification-preference.entity").NotificationChannel, isArray: true }, enabledChannels: { required: true, enum: require("./notification-preference.entity").NotificationChannel, isArray: true }, frequency: { required: true, enum: require("./notification-preference.entity").NotificationFrequency }, enabled: { required: true, type: function () { return Boolean; } }, startTime: { required: false, type: function () { return String; } }, endTime: { required: false, type: function () { return String; } }, workDays: { required: false, type: function () { return [String]; } }, customSchedule: { required: false, type: function () { return ({ days: { required: true, type: function () { return [String]; } }, times: { required: true, type: function () { return [String]; } }, timezone: { required: true, type: function () { return String; } } }); } }, channelSpecificSettings: { required: false, type: function () { return ({ email: { required: false, type: function () { return ({ addresses: { required: false, type: function () { return [String]; } }, format: { required: false, type: function () { return Object; } }, includeAttachments: { required: false, type: function () { return Boolean; } } }); } }, sms: { required: false, type: function () { return ({ phoneNumbers: { required: false, type: function () { return [String]; } }, includeMedia: { required: false, type: function () { return Boolean; } } }); } }, push: { required: false, type: function () { return ({ deviceTokens: { required: false, type: function () { return [String]; } }, sound: { required: false, type: function () { return Boolean; } }, badge: { required: false, type: function () { return Boolean; } } }); } }, inApp: { required: false, type: function () { return ({ showBadge: { required: false, type: function () { return Boolean; } }, playSound: { required: false, type: function () { return Boolean; } }, markAsRead: { required: false, type: function () { return Boolean; } } }); } }, whatsapp: { required: false, type: function () { return ({ numbers: { required: false, type: function () { return [String]; } }, allowMedia: { required: false, type: function () { return Boolean; } } }); } }, slack: { required: false, type: function () { return ({ channels: { required: false, type: function () { return [String]; } }, mentionUser: { required: false, type: function () { return Boolean; } } }); } } }); } }, filters: { required: false, type: function () { return ({ priority: { required: false, type: function () { return [String]; } }, status: { required: false, type: function () { return [String]; } }, types: { required: false, type: function () { return [String]; } }, senders: { required: false, type: function () { return [String]; } }, keywords: { required: false, type: function () { return [String]; } }, excludeKeywords: { required: false, type: function () { return [String]; } } }); } }, importanceThreshold: { required: true, type: function () { return Number; } }, muteAll: { required: true, type: function () { return Boolean; } }, muteUntil: { required: false, type: function () { return Date; } }, digestSettings: { required: false, type: function () { return ({ groupBy: { required: false, type: function () { return [String]; } }, sortBy: { required: false, type: function () { return String; } }, maxItems: { required: false, type: function () { return Number; } }, format: { required: false, type: function () { return String; } } }); } }, allowReminders: { required: true, type: function () { return Boolean; } }, reminderInterval: { required: false, type: function () { return Number; } }, maxReminders: { required: true, type: function () { return Number; } }, metadata: { required: false, type: function () { return Object; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, user: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, createdBy: { required: false, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: false, type: function () { return require("../../users/entities/user.entity").User; } } };
        };
        return NotificationPreference_1;
    }());
    __setFunctionName(_classThis, "NotificationPreference");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _userId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _category_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: NotificationCategory,
            })];
        _channels_decorators = [(0, swagger_1.ApiProperty)({
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
                },
                description: 'Notification channels'
            }), (0, typeorm_1.Column)({
                type: 'enum',
                enum: NotificationChannel,
                array: true,
                default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
            })];
        _enabledChannels_decorators = [(0, swagger_1.ApiProperty)({
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
                },
                description: 'Enabled notification channels'
            }), (0, typeorm_1.Column)({
                type: 'enum',
                enum: NotificationChannel,
                array: true,
                default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
            })];
        _frequency_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: NotificationFrequency,
                default: NotificationFrequency.IMMEDIATELY,
            })];
        _enabled_decorators = [(0, typeorm_1.Column)({ default: true })];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'time', nullable: true })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'time', nullable: true })];
        _workDays_decorators = [(0, typeorm_1.Column)('text', { array: true, nullable: true })];
        _customSchedule_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _channelSpecificSettings_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _filters_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _importanceThreshold_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _muteAll_decorators = [(0, typeorm_1.Column)({ default: false })];
        _muteUntil_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _digestSettings_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _allowReminders_decorators = [(0, typeorm_1.Column)({ default: true })];
        _reminderInterval_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _maxReminders_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 3 })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _organization_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                }
            }), (0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _user_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' }
                }
            }), (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _createdBy_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' }
                },
                nullable: true
            }), (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' }
                },
                nullable: true
            }), (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _enabledChannels_decorators, { kind: "field", name: "enabledChannels", static: false, private: false, access: { has: function (obj) { return "enabledChannels" in obj; }, get: function (obj) { return obj.enabledChannels; }, set: function (obj, value) { obj.enabledChannels = value; } }, metadata: _metadata }, _enabledChannels_initializers, _enabledChannels_extraInitializers);
        __esDecorate(null, null, _frequency_decorators, { kind: "field", name: "frequency", static: false, private: false, access: { has: function (obj) { return "frequency" in obj; }, get: function (obj) { return obj.frequency; }, set: function (obj, value) { obj.frequency = value; } }, metadata: _metadata }, _frequency_initializers, _frequency_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _workDays_decorators, { kind: "field", name: "workDays", static: false, private: false, access: { has: function (obj) { return "workDays" in obj; }, get: function (obj) { return obj.workDays; }, set: function (obj, value) { obj.workDays = value; } }, metadata: _metadata }, _workDays_initializers, _workDays_extraInitializers);
        __esDecorate(null, null, _customSchedule_decorators, { kind: "field", name: "customSchedule", static: false, private: false, access: { has: function (obj) { return "customSchedule" in obj; }, get: function (obj) { return obj.customSchedule; }, set: function (obj, value) { obj.customSchedule = value; } }, metadata: _metadata }, _customSchedule_initializers, _customSchedule_extraInitializers);
        __esDecorate(null, null, _channelSpecificSettings_decorators, { kind: "field", name: "channelSpecificSettings", static: false, private: false, access: { has: function (obj) { return "channelSpecificSettings" in obj; }, get: function (obj) { return obj.channelSpecificSettings; }, set: function (obj, value) { obj.channelSpecificSettings = value; } }, metadata: _metadata }, _channelSpecificSettings_initializers, _channelSpecificSettings_extraInitializers);
        __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: function (obj) { return "filters" in obj; }, get: function (obj) { return obj.filters; }, set: function (obj, value) { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
        __esDecorate(null, null, _importanceThreshold_decorators, { kind: "field", name: "importanceThreshold", static: false, private: false, access: { has: function (obj) { return "importanceThreshold" in obj; }, get: function (obj) { return obj.importanceThreshold; }, set: function (obj, value) { obj.importanceThreshold = value; } }, metadata: _metadata }, _importanceThreshold_initializers, _importanceThreshold_extraInitializers);
        __esDecorate(null, null, _muteAll_decorators, { kind: "field", name: "muteAll", static: false, private: false, access: { has: function (obj) { return "muteAll" in obj; }, get: function (obj) { return obj.muteAll; }, set: function (obj, value) { obj.muteAll = value; } }, metadata: _metadata }, _muteAll_initializers, _muteAll_extraInitializers);
        __esDecorate(null, null, _muteUntil_decorators, { kind: "field", name: "muteUntil", static: false, private: false, access: { has: function (obj) { return "muteUntil" in obj; }, get: function (obj) { return obj.muteUntil; }, set: function (obj, value) { obj.muteUntil = value; } }, metadata: _metadata }, _muteUntil_initializers, _muteUntil_extraInitializers);
        __esDecorate(null, null, _digestSettings_decorators, { kind: "field", name: "digestSettings", static: false, private: false, access: { has: function (obj) { return "digestSettings" in obj; }, get: function (obj) { return obj.digestSettings; }, set: function (obj, value) { obj.digestSettings = value; } }, metadata: _metadata }, _digestSettings_initializers, _digestSettings_extraInitializers);
        __esDecorate(null, null, _allowReminders_decorators, { kind: "field", name: "allowReminders", static: false, private: false, access: { has: function (obj) { return "allowReminders" in obj; }, get: function (obj) { return obj.allowReminders; }, set: function (obj, value) { obj.allowReminders = value; } }, metadata: _metadata }, _allowReminders_initializers, _allowReminders_extraInitializers);
        __esDecorate(null, null, _reminderInterval_decorators, { kind: "field", name: "reminderInterval", static: false, private: false, access: { has: function (obj) { return "reminderInterval" in obj; }, get: function (obj) { return obj.reminderInterval; }, set: function (obj, value) { obj.reminderInterval = value; } }, metadata: _metadata }, _reminderInterval_initializers, _reminderInterval_extraInitializers);
        __esDecorate(null, null, _maxReminders_decorators, { kind: "field", name: "maxReminders", static: false, private: false, access: { has: function (obj) { return "maxReminders" in obj; }, get: function (obj) { return obj.maxReminders; }, set: function (obj, value) { obj.maxReminders = value; } }, metadata: _metadata }, _maxReminders_initializers, _maxReminders_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationPreference = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationPreference = _classThis;
}();
exports.NotificationPreference = NotificationPreference;
//# sourceMappingURL=notification-preference.entity.js.map