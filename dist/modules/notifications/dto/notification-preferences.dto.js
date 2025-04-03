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
exports.UpdateNotificationPreferenceDto = exports.CreateNotificationPreferenceDto = exports.NotificationPreferencesDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var notification_preference_entity_1 = require("../entities/notification-preference.entity");
var channel_settings_dto_1 = require("./channel-settings.dto");
var NotificationPreferencesDto = function () {
    var _a;
    var _enabledChannels_decorators;
    var _enabledChannels_initializers = [];
    var _enabledChannels_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationPreferencesDto() {
                // Changed from @Column decorator to ApiProperty
                this.enabledChannels = __runInitializers(this, _enabledChannels_initializers, void 0);
                __runInitializers(this, _enabledChannels_extraInitializers);
            }
            NotificationPreferencesDto._OPENAPI_METADATA_FACTORY = function () {
                return { category: { required: true, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true }, frequency: { required: true, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: function () { return Boolean; } }, startTime: { required: false, type: function () { return String; } }, endTime: { required: false, type: function () { return String; } }, workDays: { required: false, type: function () { return [String]; } }, customSchedule: { required: false, type: function () { return ({ days: { required: true, type: function () { return [String]; } }, times: { required: true, type: function () { return [String]; } }, timezone: { required: true, type: function () { return String; } } }); } }, channelSpecificSettings: { required: false, type: function () { return require("./channel-settings.dto").ChannelSettingsDto; } }, filters: { required: false, type: function () { return ({ priority: { required: false, type: function () { return [String]; } }, status: { required: false, type: function () { return [String]; } }, types: { required: false, type: function () { return [String]; } }, senders: { required: false, type: function () { return [String]; } }, keywords: { required: false, type: function () { return [String]; } }, excludeKeywords: { required: false, type: function () { return [String]; } } }); } }, importanceThreshold: { required: false, type: function () { return Number; } }, muteAll: { required: false, type: function () { return Boolean; } }, muteUntil: { required: false, type: function () { return Date; } }, digestSettings: { required: false, type: function () { return ({ groupBy: { required: false, type: function () { return [String]; } }, sortBy: { required: false, type: function () { return String; } }, maxItems: { required: false, type: function () { return Number; } }, format: { required: false, type: function () { return String; } } }); } }, allowReminders: { required: false, type: function () { return Boolean; } }, reminderInterval: { required: false, type: function () { return Number; } }, maxReminders: { required: false, type: function () { return Number; } }, enabledChannels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true } };
            };
            return NotificationPreferencesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _enabledChannels_decorators = [(0, swagger_1.ApiProperty)({
                    enum: notification_preference_entity_1.NotificationChannel,
                    isArray: true,
                    default: [notification_preference_entity_1.NotificationChannel.EMAIL, notification_preference_entity_1.NotificationChannel.IN_APP],
                    description: 'Enabled notification channels'
                })];
            __esDecorate(null, null, _enabledChannels_decorators, { kind: "field", name: "enabledChannels", static: false, private: false, access: { has: function (obj) { return "enabledChannels" in obj; }, get: function (obj) { return obj.enabledChannels; }, set: function (obj, value) { obj.enabledChannels = value; } }, metadata: _metadata }, _enabledChannels_initializers, _enabledChannels_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NotificationPreferencesDto = NotificationPreferencesDto;
var CreateNotificationPreferenceDto = function () {
    var _a;
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
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
    return _a = /** @class */ (function () {
            function CreateNotificationPreferenceDto() {
                this.category = __runInitializers(this, _category_initializers, void 0);
                this.channels = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _channels_initializers, void 0));
                this.frequency = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _frequency_initializers, void 0));
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
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateNotificationPreferenceDto._OPENAPI_METADATA_FACTORY = function () {
                return { category: { required: true, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true, minItems: 1 }, frequency: { required: true, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: function () { return Boolean; } }, startTime: { required: false, type: function () { return String; }, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, endTime: { required: false, type: function () { return String; }, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, workDays: { required: false, type: function () { return [String]; } }, customSchedule: { required: false, type: function () { return ({ days: { required: true, type: function () { return [String]; } }, times: { required: true, type: function () { return [String]; } }, timezone: { required: true, type: function () { return String; } } }); } }, channelSpecificSettings: { required: false, type: function () { return require("./channel-settings.dto").ChannelSettingsDto; } }, filters: { required: false, type: function () { return ({ priority: { required: false, type: function () { return [String]; } }, status: { required: false, type: function () { return [String]; } }, types: { required: false, type: function () { return [String]; } }, senders: { required: false, type: function () { return [String]; } }, keywords: { required: false, type: function () { return [String]; } }, excludeKeywords: { required: false, type: function () { return [String]; } } }); } }, importanceThreshold: { required: false, type: function () { return Number; }, minimum: 0, maximum: 100 }, muteAll: { required: false, type: function () { return Boolean; } }, muteUntil: { required: false, type: function () { return Date; } }, digestSettings: { required: false, type: function () { return ({ groupBy: { required: false, type: function () { return [String]; } }, sortBy: { required: false, type: function () { return String; } }, maxItems: { required: false, type: function () { return Number; } }, format: { required: false, type: function () { return String; } } }); } }, allowReminders: { required: false, type: function () { return Boolean; } }, reminderInterval: { required: false, type: function () { return Number; }, minimum: 1 }, maxReminders: { required: false, type: function () { return Number; }, minimum: 0, maximum: 10 }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateNotificationPreferenceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _category_decorators = [(0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationCategory }), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory)];
            _channels_decorators = [(0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true }), (0, class_validator_1.ArrayMinSize)(1)];
            _frequency_decorators = [(0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationFrequency }), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationFrequency)];
            _enabled_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _startTime_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                    message: 'Start time must be in HH:mm format'
                })];
            _endTime_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                    message: 'End time must be in HH:mm format'
                })];
            _workDays_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _customSchedule_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return CustomScheduleDto; })];
            _channelSpecificSettings_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return channel_settings_dto_1.ChannelSettingsDto; })];
            _filters_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return NotificationFiltersDto; })];
            _importanceThreshold_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _muteAll_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _muteUntil_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _digestSettings_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DigestSettingsDto; })];
            _allowReminders_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _reminderInterval_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _maxReminders_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(10)];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
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
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateNotificationPreferenceDto = CreateNotificationPreferenceDto;
// Supporting DTOs for nested validation
var CustomScheduleDto = function () {
    var _a;
    var _days_decorators;
    var _days_initializers = [];
    var _days_extraInitializers = [];
    var _times_decorators;
    var _times_initializers = [];
    var _times_extraInitializers = [];
    var _timezone_decorators;
    var _timezone_initializers = [];
    var _timezone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CustomScheduleDto() {
                this.days = __runInitializers(this, _days_initializers, void 0);
                this.times = (__runInitializers(this, _days_extraInitializers), __runInitializers(this, _times_initializers, void 0));
                this.timezone = (__runInitializers(this, _times_extraInitializers), __runInitializers(this, _timezone_initializers, void 0));
                __runInitializers(this, _timezone_extraInitializers);
            }
            CustomScheduleDto._OPENAPI_METADATA_FACTORY = function () {
                return { days: { required: true, type: function () { return [String]; } }, times: { required: true, type: function () { return [String]; }, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, timezone: { required: true, type: function () { return String; } } };
            };
            return CustomScheduleDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _days_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _times_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                    message: 'Times must be in HH:mm format',
                    each: true
                })];
            _timezone_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _days_decorators, { kind: "field", name: "days", static: false, private: false, access: { has: function (obj) { return "days" in obj; }, get: function (obj) { return obj.days; }, set: function (obj, value) { obj.days = value; } }, metadata: _metadata }, _days_initializers, _days_extraInitializers);
            __esDecorate(null, null, _times_decorators, { kind: "field", name: "times", static: false, private: false, access: { has: function (obj) { return "times" in obj; }, get: function (obj) { return obj.times; }, set: function (obj, value) { obj.times = value; } }, metadata: _metadata }, _times_initializers, _times_extraInitializers);
            __esDecorate(null, null, _timezone_decorators, { kind: "field", name: "timezone", static: false, private: false, access: { has: function (obj) { return "timezone" in obj; }, get: function (obj) { return obj.timezone; }, set: function (obj, value) { obj.timezone = value; } }, metadata: _metadata }, _timezone_initializers, _timezone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var NotificationFiltersDto = function () {
    var _a;
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _types_decorators;
    var _types_initializers = [];
    var _types_extraInitializers = [];
    var _senders_decorators;
    var _senders_initializers = [];
    var _senders_extraInitializers = [];
    var _keywords_decorators;
    var _keywords_initializers = [];
    var _keywords_extraInitializers = [];
    var _excludeKeywords_decorators;
    var _excludeKeywords_initializers = [];
    var _excludeKeywords_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationFiltersDto() {
                this.priority = __runInitializers(this, _priority_initializers, void 0);
                this.status = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.types = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _types_initializers, void 0));
                this.senders = (__runInitializers(this, _types_extraInitializers), __runInitializers(this, _senders_initializers, void 0));
                this.keywords = (__runInitializers(this, _senders_extraInitializers), __runInitializers(this, _keywords_initializers, void 0));
                this.excludeKeywords = (__runInitializers(this, _keywords_extraInitializers), __runInitializers(this, _excludeKeywords_initializers, void 0));
                __runInitializers(this, _excludeKeywords_extraInitializers);
            }
            NotificationFiltersDto._OPENAPI_METADATA_FACTORY = function () {
                return { priority: { required: false, type: function () { return [String]; } }, status: { required: false, type: function () { return [String]; } }, types: { required: false, type: function () { return [String]; } }, senders: { required: false, type: function () { return [String]; } }, keywords: { required: false, type: function () { return [String]; } }, excludeKeywords: { required: false, type: function () { return [String]; } } };
            };
            return NotificationFiltersDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _types_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _senders_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _keywords_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _excludeKeywords_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: function (obj) { return "types" in obj; }, get: function (obj) { return obj.types; }, set: function (obj, value) { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
            __esDecorate(null, null, _senders_decorators, { kind: "field", name: "senders", static: false, private: false, access: { has: function (obj) { return "senders" in obj; }, get: function (obj) { return obj.senders; }, set: function (obj, value) { obj.senders = value; } }, metadata: _metadata }, _senders_initializers, _senders_extraInitializers);
            __esDecorate(null, null, _keywords_decorators, { kind: "field", name: "keywords", static: false, private: false, access: { has: function (obj) { return "keywords" in obj; }, get: function (obj) { return obj.keywords; }, set: function (obj, value) { obj.keywords = value; } }, metadata: _metadata }, _keywords_initializers, _keywords_extraInitializers);
            __esDecorate(null, null, _excludeKeywords_decorators, { kind: "field", name: "excludeKeywords", static: false, private: false, access: { has: function (obj) { return "excludeKeywords" in obj; }, get: function (obj) { return obj.excludeKeywords; }, set: function (obj, value) { obj.excludeKeywords = value; } }, metadata: _metadata }, _excludeKeywords_initializers, _excludeKeywords_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var DigestSettingsDto = function () {
    var _a;
    var _groupBy_decorators;
    var _groupBy_initializers = [];
    var _groupBy_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _maxItems_decorators;
    var _maxItems_initializers = [];
    var _maxItems_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DigestSettingsDto() {
                this.groupBy = __runInitializers(this, _groupBy_initializers, void 0);
                this.sortBy = (__runInitializers(this, _groupBy_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.maxItems = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _maxItems_initializers, void 0));
                this.format = (__runInitializers(this, _maxItems_extraInitializers), __runInitializers(this, _format_initializers, void 0));
                __runInitializers(this, _format_extraInitializers);
            }
            DigestSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { groupBy: { required: false, type: function () { return [String]; } }, sortBy: { required: false, type: function () { return String; } }, maxItems: { required: false, type: function () { return Number; }, minimum: 1 }, format: { required: false, type: function () { return String; } } };
            };
            return DigestSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _groupBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _sortBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _maxItems_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _format_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _groupBy_decorators, { kind: "field", name: "groupBy", static: false, private: false, access: { has: function (obj) { return "groupBy" in obj; }, get: function (obj) { return obj.groupBy; }, set: function (obj, value) { obj.groupBy = value; } }, metadata: _metadata }, _groupBy_initializers, _groupBy_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _maxItems_decorators, { kind: "field", name: "maxItems", static: false, private: false, access: { has: function (obj) { return "maxItems" in obj; }, get: function (obj) { return obj.maxItems; }, set: function (obj, value) { obj.maxItems = value; } }, metadata: _metadata }, _maxItems_initializers, _maxItems_extraInitializers);
            __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var UpdateNotificationPreferenceDto = function () {
    var _a;
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
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
    return _a = /** @class */ (function () {
            function UpdateNotificationPreferenceDto() {
                this.category = __runInitializers(this, _category_initializers, void 0);
                this.channels = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _channels_initializers, void 0));
                this.frequency = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _frequency_initializers, void 0));
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
                __runInitializers(this, _metadata_extraInitializers);
            }
            UpdateNotificationPreferenceDto._OPENAPI_METADATA_FACTORY = function () {
                return { category: { required: false, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: false, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true }, frequency: { required: false, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: function () { return Boolean; } }, startTime: { required: false, type: function () { return String; }, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, endTime: { required: false, type: function () { return String; }, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, workDays: { required: false, type: function () { return [String]; } }, customSchedule: { required: false, type: function () { return ({ days: { required: true, type: function () { return [String]; } }, times: { required: true, type: function () { return [String]; } }, timezone: { required: true, type: function () { return String; } } }); } }, channelSpecificSettings: { required: false, type: function () { return require("./channel-settings.dto").ChannelSettingsDto; } }, filters: { required: false, type: function () { return ({ priority: { required: false, type: function () { return [String]; } }, status: { required: false, type: function () { return [String]; } }, types: { required: false, type: function () { return [String]; } }, senders: { required: false, type: function () { return [String]; } }, keywords: { required: false, type: function () { return [String]; } }, excludeKeywords: { required: false, type: function () { return [String]; } } }); } }, importanceThreshold: { required: false, type: function () { return Number; }, minimum: 0, maximum: 100 }, muteAll: { required: false, type: function () { return Boolean; } }, muteUntil: { required: false, type: function () { return Date; } }, digestSettings: { required: false, type: function () { return ({ groupBy: { required: false, type: function () { return [String]; } }, sortBy: { required: false, type: function () { return String; } }, maxItems: { required: false, type: function () { return Number; } }, format: { required: false, type: function () { return String; } } }); } }, allowReminders: { required: false, type: function () { return Boolean; } }, reminderInterval: { required: false, type: function () { return Number; }, minimum: 1 }, maxReminders: { required: false, type: function () { return Number; }, minimum: 0, maximum: 10 }, metadata: { required: false, type: function () { return Object; } } };
            };
            return UpdateNotificationPreferenceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationCategory }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory)];
            _channels_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true })];
            _frequency_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationFrequency }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationFrequency)];
            _enabled_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _startTime_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                    message: 'Start time must be in HH:mm format'
                })];
            _endTime_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                    message: 'End time must be in HH:mm format'
                })];
            _workDays_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _customSchedule_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return CustomScheduleDto; })];
            _channelSpecificSettings_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return channel_settings_dto_1.ChannelSettingsDto; })];
            _filters_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return NotificationFiltersDto; })];
            _importanceThreshold_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _muteAll_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _muteUntil_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _digestSettings_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DigestSettingsDto; })];
            _allowReminders_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _reminderInterval_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _maxReminders_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(10)];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
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
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateNotificationPreferenceDto = UpdateNotificationPreferenceDto;
//# sourceMappingURL=notification-preferences.dto.js.map