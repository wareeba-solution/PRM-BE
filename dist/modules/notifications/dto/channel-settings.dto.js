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
exports.ChannelSettingsDto = exports.TeamsSettingsDto = exports.SlackSettingsDto = exports.WhatsappSettingsDto = exports.InAppSettingsDto = exports.PushSettingsDto = exports.SmsSettingsDto = exports.EmailSettingsDto = exports.WebhookSettingsDto = exports.WebhookRetryConfigDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/channel-settings.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var WebhookRetryConfigDto = function () {
    var _a;
    var _maxAttempts_decorators;
    var _maxAttempts_initializers = [];
    var _maxAttempts_extraInitializers = [];
    var _retryDelay_decorators;
    var _retryDelay_initializers = [];
    var _retryDelay_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WebhookRetryConfigDto() {
                this.maxAttempts = __runInitializers(this, _maxAttempts_initializers, void 0);
                this.retryDelay = (__runInitializers(this, _maxAttempts_extraInitializers), __runInitializers(this, _retryDelay_initializers, void 0));
                __runInitializers(this, _retryDelay_extraInitializers);
            }
            WebhookRetryConfigDto._OPENAPI_METADATA_FACTORY = function () {
                return { maxAttempts: { required: false, type: function () { return Number; }, minimum: 0, maximum: 5 }, retryDelay: { required: false, type: function () { return Number; }, minimum: 1, maximum: 300 } };
            };
            return WebhookRetryConfigDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _maxAttempts_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of retry attempts' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(5)];
            _retryDelay_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Delay between retry attempts in seconds' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(300)];
            __esDecorate(null, null, _maxAttempts_decorators, { kind: "field", name: "maxAttempts", static: false, private: false, access: { has: function (obj) { return "maxAttempts" in obj; }, get: function (obj) { return obj.maxAttempts; }, set: function (obj, value) { obj.maxAttempts = value; } }, metadata: _metadata }, _maxAttempts_initializers, _maxAttempts_extraInitializers);
            __esDecorate(null, null, _retryDelay_decorators, { kind: "field", name: "retryDelay", static: false, private: false, access: { has: function (obj) { return "retryDelay" in obj; }, get: function (obj) { return obj.retryDelay; }, set: function (obj, value) { obj.retryDelay = value; } }, metadata: _metadata }, _retryDelay_initializers, _retryDelay_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WebhookRetryConfigDto = WebhookRetryConfigDto;
var WebhookSettingsDto = function () {
    var _a;
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _secret_decorators;
    var _secret_initializers = [];
    var _secret_extraInitializers = [];
    var _headers_decorators;
    var _headers_initializers = [];
    var _headers_extraInitializers = [];
    var _retryConfig_decorators;
    var _retryConfig_initializers = [];
    var _retryConfig_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WebhookSettingsDto() {
                this.url = __runInitializers(this, _url_initializers, void 0);
                this.secret = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _secret_initializers, void 0));
                this.headers = (__runInitializers(this, _secret_extraInitializers), __runInitializers(this, _headers_initializers, void 0));
                this.retryConfig = (__runInitializers(this, _headers_extraInitializers), __runInitializers(this, _retryConfig_initializers, void 0));
                __runInitializers(this, _retryConfig_extraInitializers);
            }
            WebhookSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { url: { required: false, type: function () { return String; }, format: "uri" }, secret: { required: false, type: function () { return String; } }, headers: { required: false, type: function () { return Object; } }, retryConfig: { required: false, type: function () { return require("./channel-settings.dto").WebhookRetryConfigDto; } } };
            };
            return WebhookSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _url_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Webhook URL' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)()];
            _secret_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Secret key for webhook authentication' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _headers_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom headers for webhook requests' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _retryConfig_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Retry configuration for failed webhooks' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return WebhookRetryConfigDto; })];
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _secret_decorators, { kind: "field", name: "secret", static: false, private: false, access: { has: function (obj) { return "secret" in obj; }, get: function (obj) { return obj.secret; }, set: function (obj, value) { obj.secret = value; } }, metadata: _metadata }, _secret_initializers, _secret_extraInitializers);
            __esDecorate(null, null, _headers_decorators, { kind: "field", name: "headers", static: false, private: false, access: { has: function (obj) { return "headers" in obj; }, get: function (obj) { return obj.headers; }, set: function (obj, value) { obj.headers = value; } }, metadata: _metadata }, _headers_initializers, _headers_extraInitializers);
            __esDecorate(null, null, _retryConfig_decorators, { kind: "field", name: "retryConfig", static: false, private: false, access: { has: function (obj) { return "retryConfig" in obj; }, get: function (obj) { return obj.retryConfig; }, set: function (obj, value) { obj.retryConfig = value; } }, metadata: _metadata }, _retryConfig_initializers, _retryConfig_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WebhookSettingsDto = WebhookSettingsDto;
var EmailSettingsDto = function () {
    var _a;
    var _addresses_decorators;
    var _addresses_initializers = [];
    var _addresses_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    var _includeAttachments_decorators;
    var _includeAttachments_initializers = [];
    var _includeAttachments_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _signature_decorators;
    var _signature_initializers = [];
    var _signature_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EmailSettingsDto() {
                this.addresses = __runInitializers(this, _addresses_initializers, void 0);
                this.format = (__runInitializers(this, _addresses_extraInitializers), __runInitializers(this, _format_initializers, void 0));
                this.includeAttachments = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _includeAttachments_initializers, void 0));
                this.templateId = (__runInitializers(this, _includeAttachments_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
                this.signature = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _signature_initializers, void 0));
                __runInitializers(this, _signature_extraInitializers);
            }
            EmailSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { addresses: { required: false, type: function () { return [String]; }, format: "email", maxItems: 5 }, format: { required: false, type: function () { return Object; } }, includeAttachments: { required: false, type: function () { return Boolean; } }, templateId: { required: false, type: function () { return String; } }, signature: { required: false, type: function () { return String; }, maxLength: 500 } };
            };
            return EmailSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _addresses_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'List of email addresses' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEmail)({}, { each: true }), (0, class_validator_1.ArrayMaxSize)(5)];
            _format_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: ['HTML', 'TEXT'], description: 'Email format preference' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['HTML', 'TEXT'])];
            _includeAttachments_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to include attachments in email notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _templateId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom email template ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _signature_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Email signature' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            __esDecorate(null, null, _addresses_decorators, { kind: "field", name: "addresses", static: false, private: false, access: { has: function (obj) { return "addresses" in obj; }, get: function (obj) { return obj.addresses; }, set: function (obj, value) { obj.addresses = value; } }, metadata: _metadata }, _addresses_initializers, _addresses_extraInitializers);
            __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
            __esDecorate(null, null, _includeAttachments_decorators, { kind: "field", name: "includeAttachments", static: false, private: false, access: { has: function (obj) { return "includeAttachments" in obj; }, get: function (obj) { return obj.includeAttachments; }, set: function (obj, value) { obj.includeAttachments = value; } }, metadata: _metadata }, _includeAttachments_initializers, _includeAttachments_extraInitializers);
            __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
            __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: function (obj) { return "signature" in obj; }, get: function (obj) { return obj.signature; }, set: function (obj, value) { obj.signature = value; } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.EmailSettingsDto = EmailSettingsDto;
var SmsSettingsDto = function () {
    var _a;
    var _phoneNumbers_decorators;
    var _phoneNumbers_initializers = [];
    var _phoneNumbers_extraInitializers = [];
    var _includeMedia_decorators;
    var _includeMedia_initializers = [];
    var _includeMedia_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _useUrlShortening_decorators;
    var _useUrlShortening_initializers = [];
    var _useUrlShortening_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SmsSettingsDto() {
                this.phoneNumbers = __runInitializers(this, _phoneNumbers_initializers, void 0);
                this.includeMedia = (__runInitializers(this, _phoneNumbers_extraInitializers), __runInitializers(this, _includeMedia_initializers, void 0));
                this.provider = (__runInitializers(this, _includeMedia_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
                this.useUrlShortening = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _useUrlShortening_initializers, void 0));
                __runInitializers(this, _useUrlShortening_extraInitializers);
            }
            SmsSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { phoneNumbers: { required: false, type: function () { return [String]; }, maxItems: 3 }, includeMedia: { required: false, type: function () { return Boolean; } }, provider: { required: false, type: function () { return String; } }, useUrlShortening: { required: false, type: function () { return Boolean; } } };
            };
            return SmsSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phoneNumbers_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'List of phone numbers' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsPhoneNumber)(undefined, { each: true }), (0, class_validator_1.ArrayMaxSize)(3)];
            _includeMedia_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to include media in SMS' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _provider_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Preferred SMS provider' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _useUrlShortening_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use URL shortening in SMS' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _phoneNumbers_decorators, { kind: "field", name: "phoneNumbers", static: false, private: false, access: { has: function (obj) { return "phoneNumbers" in obj; }, get: function (obj) { return obj.phoneNumbers; }, set: function (obj, value) { obj.phoneNumbers = value; } }, metadata: _metadata }, _phoneNumbers_initializers, _phoneNumbers_extraInitializers);
            __esDecorate(null, null, _includeMedia_decorators, { kind: "field", name: "includeMedia", static: false, private: false, access: { has: function (obj) { return "includeMedia" in obj; }, get: function (obj) { return obj.includeMedia; }, set: function (obj, value) { obj.includeMedia = value; } }, metadata: _metadata }, _includeMedia_initializers, _includeMedia_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _useUrlShortening_decorators, { kind: "field", name: "useUrlShortening", static: false, private: false, access: { has: function (obj) { return "useUrlShortening" in obj; }, get: function (obj) { return obj.useUrlShortening; }, set: function (obj, value) { obj.useUrlShortening = value; } }, metadata: _metadata }, _useUrlShortening_initializers, _useUrlShortening_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SmsSettingsDto = SmsSettingsDto;
var PushSettingsDto = function () {
    var _a;
    var _deviceTokens_decorators;
    var _deviceTokens_initializers = [];
    var _deviceTokens_extraInitializers = [];
    var _sound_decorators;
    var _sound_initializers = [];
    var _sound_extraInitializers = [];
    var _badge_decorators;
    var _badge_initializers = [];
    var _badge_extraInitializers = [];
    var _useRichNotifications_decorators;
    var _useRichNotifications_initializers = [];
    var _useRichNotifications_extraInitializers = [];
    var _soundName_decorators;
    var _soundName_initializers = [];
    var _soundName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PushSettingsDto() {
                this.deviceTokens = __runInitializers(this, _deviceTokens_initializers, void 0);
                this.sound = (__runInitializers(this, _deviceTokens_extraInitializers), __runInitializers(this, _sound_initializers, void 0));
                this.badge = (__runInitializers(this, _sound_extraInitializers), __runInitializers(this, _badge_initializers, void 0));
                this.useRichNotifications = (__runInitializers(this, _badge_extraInitializers), __runInitializers(this, _useRichNotifications_initializers, void 0));
                this.soundName = (__runInitializers(this, _useRichNotifications_extraInitializers), __runInitializers(this, _soundName_initializers, void 0));
                __runInitializers(this, _soundName_extraInitializers);
            }
            PushSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { deviceTokens: { required: false, type: function () { return [String]; }, maxItems: 10 }, sound: { required: false, type: function () { return Boolean; } }, badge: { required: false, type: function () { return Boolean; } }, useRichNotifications: { required: false, type: function () { return Boolean; } }, soundName: { required: false, type: function () { return String; } } };
            };
            return PushSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _deviceTokens_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Device tokens for push notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(10)];
            _sound_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to play sound with push notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _badge_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show badge count' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _useRichNotifications_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use rich notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _soundName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom notification sound name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _deviceTokens_decorators, { kind: "field", name: "deviceTokens", static: false, private: false, access: { has: function (obj) { return "deviceTokens" in obj; }, get: function (obj) { return obj.deviceTokens; }, set: function (obj, value) { obj.deviceTokens = value; } }, metadata: _metadata }, _deviceTokens_initializers, _deviceTokens_extraInitializers);
            __esDecorate(null, null, _sound_decorators, { kind: "field", name: "sound", static: false, private: false, access: { has: function (obj) { return "sound" in obj; }, get: function (obj) { return obj.sound; }, set: function (obj, value) { obj.sound = value; } }, metadata: _metadata }, _sound_initializers, _sound_extraInitializers);
            __esDecorate(null, null, _badge_decorators, { kind: "field", name: "badge", static: false, private: false, access: { has: function (obj) { return "badge" in obj; }, get: function (obj) { return obj.badge; }, set: function (obj, value) { obj.badge = value; } }, metadata: _metadata }, _badge_initializers, _badge_extraInitializers);
            __esDecorate(null, null, _useRichNotifications_decorators, { kind: "field", name: "useRichNotifications", static: false, private: false, access: { has: function (obj) { return "useRichNotifications" in obj; }, get: function (obj) { return obj.useRichNotifications; }, set: function (obj, value) { obj.useRichNotifications = value; } }, metadata: _metadata }, _useRichNotifications_initializers, _useRichNotifications_extraInitializers);
            __esDecorate(null, null, _soundName_decorators, { kind: "field", name: "soundName", static: false, private: false, access: { has: function (obj) { return "soundName" in obj; }, get: function (obj) { return obj.soundName; }, set: function (obj, value) { obj.soundName = value; } }, metadata: _metadata }, _soundName_initializers, _soundName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PushSettingsDto = PushSettingsDto;
var InAppSettingsDto = function () {
    var _a;
    var _showBadge_decorators;
    var _showBadge_initializers = [];
    var _showBadge_extraInitializers = [];
    var _playSound_decorators;
    var _playSound_initializers = [];
    var _playSound_extraInitializers = [];
    var _markAsRead_decorators;
    var _markAsRead_initializers = [];
    var _markAsRead_extraInitializers = [];
    var _showDesktopNotifications_decorators;
    var _showDesktopNotifications_initializers = [];
    var _showDesktopNotifications_extraInitializers = [];
    var _maxUnreadCount_decorators;
    var _maxUnreadCount_initializers = [];
    var _maxUnreadCount_extraInitializers = [];
    return _a = /** @class */ (function () {
            function InAppSettingsDto() {
                this.showBadge = __runInitializers(this, _showBadge_initializers, void 0);
                this.playSound = (__runInitializers(this, _showBadge_extraInitializers), __runInitializers(this, _playSound_initializers, void 0));
                this.markAsRead = (__runInitializers(this, _playSound_extraInitializers), __runInitializers(this, _markAsRead_initializers, void 0));
                this.showDesktopNotifications = (__runInitializers(this, _markAsRead_extraInitializers), __runInitializers(this, _showDesktopNotifications_initializers, void 0));
                this.maxUnreadCount = (__runInitializers(this, _showDesktopNotifications_extraInitializers), __runInitializers(this, _maxUnreadCount_initializers, void 0));
                __runInitializers(this, _maxUnreadCount_extraInitializers);
            }
            InAppSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { showBadge: { required: false, type: function () { return Boolean; } }, playSound: { required: false, type: function () { return Boolean; } }, markAsRead: { required: false, type: function () { return Boolean; } }, showDesktopNotifications: { required: false, type: function () { return Boolean; } }, maxUnreadCount: { required: false, type: function () { return Number; }, minimum: 1, maximum: 100 } };
            };
            return InAppSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _showBadge_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show badge count' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _playSound_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to play sound' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _markAsRead_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to mark as read when opened' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _showDesktopNotifications_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show desktop notifications' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _maxUnreadCount_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of unread notifications to show' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _showBadge_decorators, { kind: "field", name: "showBadge", static: false, private: false, access: { has: function (obj) { return "showBadge" in obj; }, get: function (obj) { return obj.showBadge; }, set: function (obj, value) { obj.showBadge = value; } }, metadata: _metadata }, _showBadge_initializers, _showBadge_extraInitializers);
            __esDecorate(null, null, _playSound_decorators, { kind: "field", name: "playSound", static: false, private: false, access: { has: function (obj) { return "playSound" in obj; }, get: function (obj) { return obj.playSound; }, set: function (obj, value) { obj.playSound = value; } }, metadata: _metadata }, _playSound_initializers, _playSound_extraInitializers);
            __esDecorate(null, null, _markAsRead_decorators, { kind: "field", name: "markAsRead", static: false, private: false, access: { has: function (obj) { return "markAsRead" in obj; }, get: function (obj) { return obj.markAsRead; }, set: function (obj, value) { obj.markAsRead = value; } }, metadata: _metadata }, _markAsRead_initializers, _markAsRead_extraInitializers);
            __esDecorate(null, null, _showDesktopNotifications_decorators, { kind: "field", name: "showDesktopNotifications", static: false, private: false, access: { has: function (obj) { return "showDesktopNotifications" in obj; }, get: function (obj) { return obj.showDesktopNotifications; }, set: function (obj, value) { obj.showDesktopNotifications = value; } }, metadata: _metadata }, _showDesktopNotifications_initializers, _showDesktopNotifications_extraInitializers);
            __esDecorate(null, null, _maxUnreadCount_decorators, { kind: "field", name: "maxUnreadCount", static: false, private: false, access: { has: function (obj) { return "maxUnreadCount" in obj; }, get: function (obj) { return obj.maxUnreadCount; }, set: function (obj, value) { obj.maxUnreadCount = value; } }, metadata: _metadata }, _maxUnreadCount_initializers, _maxUnreadCount_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.InAppSettingsDto = InAppSettingsDto;
var WhatsappSettingsDto = function () {
    var _a;
    var _numbers_decorators;
    var _numbers_initializers = [];
    var _numbers_extraInitializers = [];
    var _allowMedia_decorators;
    var _allowMedia_initializers = [];
    var _allowMedia_extraInitializers = [];
    var _language_decorators;
    var _language_initializers = [];
    var _language_extraInitializers = [];
    var _templateNamespace_decorators;
    var _templateNamespace_initializers = [];
    var _templateNamespace_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WhatsappSettingsDto() {
                this.numbers = __runInitializers(this, _numbers_initializers, void 0);
                this.allowMedia = (__runInitializers(this, _numbers_extraInitializers), __runInitializers(this, _allowMedia_initializers, void 0));
                this.language = (__runInitializers(this, _allowMedia_extraInitializers), __runInitializers(this, _language_initializers, void 0));
                this.templateNamespace = (__runInitializers(this, _language_extraInitializers), __runInitializers(this, _templateNamespace_initializers, void 0));
                __runInitializers(this, _templateNamespace_extraInitializers);
            }
            WhatsappSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { numbers: { required: false, type: function () { return [String]; }, maxItems: 2 }, allowMedia: { required: false, type: function () { return Boolean; } }, language: { required: false, type: function () { return String; } }, templateNamespace: { required: false, type: function () { return String; } } };
            };
            return WhatsappSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _numbers_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'WhatsApp numbers' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsPhoneNumber)(undefined, { each: true }), (0, class_validator_1.ArrayMaxSize)(2)];
            _allowMedia_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to allow media messages' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _language_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Language preference for WhatsApp messages' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _templateNamespace_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Template namespace for business accounts' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _numbers_decorators, { kind: "field", name: "numbers", static: false, private: false, access: { has: function (obj) { return "numbers" in obj; }, get: function (obj) { return obj.numbers; }, set: function (obj, value) { obj.numbers = value; } }, metadata: _metadata }, _numbers_initializers, _numbers_extraInitializers);
            __esDecorate(null, null, _allowMedia_decorators, { kind: "field", name: "allowMedia", static: false, private: false, access: { has: function (obj) { return "allowMedia" in obj; }, get: function (obj) { return obj.allowMedia; }, set: function (obj, value) { obj.allowMedia = value; } }, metadata: _metadata }, _allowMedia_initializers, _allowMedia_extraInitializers);
            __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: function (obj) { return "language" in obj; }, get: function (obj) { return obj.language; }, set: function (obj, value) { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
            __esDecorate(null, null, _templateNamespace_decorators, { kind: "field", name: "templateNamespace", static: false, private: false, access: { has: function (obj) { return "templateNamespace" in obj; }, get: function (obj) { return obj.templateNamespace; }, set: function (obj, value) { obj.templateNamespace = value; } }, metadata: _metadata }, _templateNamespace_initializers, _templateNamespace_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WhatsappSettingsDto = WhatsappSettingsDto;
var SlackSettingsDto = function () {
    var _a;
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _mentionUser_decorators;
    var _mentionUser_initializers = [];
    var _mentionUser_extraInitializers = [];
    var _workspaceId_decorators;
    var _workspaceId_initializers = [];
    var _workspaceId_extraInitializers = [];
    var _useThreads_decorators;
    var _useThreads_initializers = [];
    var _useThreads_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SlackSettingsDto() {
                this.channels = __runInitializers(this, _channels_initializers, void 0);
                this.mentionUser = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _mentionUser_initializers, void 0));
                this.workspaceId = (__runInitializers(this, _mentionUser_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
                this.useThreads = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _useThreads_initializers, void 0));
                __runInitializers(this, _useThreads_extraInitializers);
            }
            SlackSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { channels: { required: false, type: function () { return [String]; }, maxItems: 5 }, mentionUser: { required: false, type: function () { return Boolean; } }, workspaceId: { required: false, type: function () { return String; } }, useThreads: { required: false, type: function () { return Boolean; } } };
            };
            return SlackSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _channels_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Slack channel names' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(5)];
            _mentionUser_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to mention user in messages' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _workspaceId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Slack workspace ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _useThreads_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Use thread replies for updates' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
            __esDecorate(null, null, _mentionUser_decorators, { kind: "field", name: "mentionUser", static: false, private: false, access: { has: function (obj) { return "mentionUser" in obj; }, get: function (obj) { return obj.mentionUser; }, set: function (obj, value) { obj.mentionUser = value; } }, metadata: _metadata }, _mentionUser_initializers, _mentionUser_extraInitializers);
            __esDecorate(null, null, _workspaceId_decorators, { kind: "field", name: "workspaceId", static: false, private: false, access: { has: function (obj) { return "workspaceId" in obj; }, get: function (obj) { return obj.workspaceId; }, set: function (obj, value) { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(null, null, _useThreads_decorators, { kind: "field", name: "useThreads", static: false, private: false, access: { has: function (obj) { return "useThreads" in obj; }, get: function (obj) { return obj.useThreads; }, set: function (obj, value) { obj.useThreads = value; } }, metadata: _metadata }, _useThreads_initializers, _useThreads_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SlackSettingsDto = SlackSettingsDto;
var TeamsSettingsDto = function () {
    var _a;
    var _channelIds_decorators;
    var _channelIds_initializers = [];
    var _channelIds_extraInitializers = [];
    var _useAdaptiveCards_decorators;
    var _useAdaptiveCards_initializers = [];
    var _useAdaptiveCards_extraInitializers = [];
    var _showMentions_decorators;
    var _showMentions_initializers = [];
    var _showMentions_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TeamsSettingsDto() {
                this.channelIds = __runInitializers(this, _channelIds_initializers, void 0);
                this.useAdaptiveCards = (__runInitializers(this, _channelIds_extraInitializers), __runInitializers(this, _useAdaptiveCards_initializers, void 0));
                this.showMentions = (__runInitializers(this, _useAdaptiveCards_extraInitializers), __runInitializers(this, _showMentions_initializers, void 0));
                __runInitializers(this, _showMentions_extraInitializers);
            }
            TeamsSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { channelIds: { required: false, type: function () { return [String]; }, maxItems: 5 }, useAdaptiveCards: { required: false, type: function () { return Boolean; } }, showMentions: { required: false, type: function () { return Boolean; } } };
            };
            return TeamsSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _channelIds_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Teams channel IDs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(5)];
            _useAdaptiveCards_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use adaptive cards' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _showMentions_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show user mentions' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _channelIds_decorators, { kind: "field", name: "channelIds", static: false, private: false, access: { has: function (obj) { return "channelIds" in obj; }, get: function (obj) { return obj.channelIds; }, set: function (obj, value) { obj.channelIds = value; } }, metadata: _metadata }, _channelIds_initializers, _channelIds_extraInitializers);
            __esDecorate(null, null, _useAdaptiveCards_decorators, { kind: "field", name: "useAdaptiveCards", static: false, private: false, access: { has: function (obj) { return "useAdaptiveCards" in obj; }, get: function (obj) { return obj.useAdaptiveCards; }, set: function (obj, value) { obj.useAdaptiveCards = value; } }, metadata: _metadata }, _useAdaptiveCards_initializers, _useAdaptiveCards_extraInitializers);
            __esDecorate(null, null, _showMentions_decorators, { kind: "field", name: "showMentions", static: false, private: false, access: { has: function (obj) { return "showMentions" in obj; }, get: function (obj) { return obj.showMentions; }, set: function (obj, value) { obj.showMentions = value; } }, metadata: _metadata }, _showMentions_initializers, _showMentions_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TeamsSettingsDto = TeamsSettingsDto;
var ChannelSettingsDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _sms_decorators;
    var _sms_initializers = [];
    var _sms_extraInitializers = [];
    var _push_decorators;
    var _push_initializers = [];
    var _push_extraInitializers = [];
    var _inApp_decorators;
    var _inApp_initializers = [];
    var _inApp_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _slack_decorators;
    var _slack_initializers = [];
    var _slack_extraInitializers = [];
    var _teams_decorators;
    var _teams_initializers = [];
    var _teams_extraInitializers = [];
    var _webhook_decorators;
    var _webhook_initializers = [];
    var _webhook_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ChannelSettingsDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.sms = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _sms_initializers, void 0));
                this.push = (__runInitializers(this, _sms_extraInitializers), __runInitializers(this, _push_initializers, void 0));
                this.inApp = (__runInitializers(this, _push_extraInitializers), __runInitializers(this, _inApp_initializers, void 0));
                this.whatsapp = (__runInitializers(this, _inApp_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
                this.slack = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _slack_initializers, void 0));
                this.teams = (__runInitializers(this, _slack_extraInitializers), __runInitializers(this, _teams_initializers, void 0));
                this.webhook = (__runInitializers(this, _teams_extraInitializers), __runInitializers(this, _webhook_initializers, void 0));
                __runInitializers(this, _webhook_extraInitializers);
            }
            ChannelSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { email: { required: false, type: function () { return require("./channel-settings.dto").EmailSettingsDto; } }, sms: { required: false, type: function () { return require("./channel-settings.dto").SmsSettingsDto; } }, push: { required: false, type: function () { return require("./channel-settings.dto").PushSettingsDto; } }, inApp: { required: false, type: function () { return require("./channel-settings.dto").InAppSettingsDto; } }, whatsapp: { required: false, type: function () { return require("./channel-settings.dto").WhatsappSettingsDto; } }, slack: { required: false, type: function () { return require("./channel-settings.dto").SlackSettingsDto; } }, teams: { required: false, type: function () { return require("./channel-settings.dto").TeamsSettingsDto; } }, webhook: { required: false, type: function () { return require("./channel-settings.dto").WebhookSettingsDto; } } };
            };
            return ChannelSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return EmailSettingsDto; })];
            _sms_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return SmsSettingsDto; })];
            _push_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return PushSettingsDto; })];
            _inApp_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return InAppSettingsDto; })];
            _whatsapp_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return WhatsappSettingsDto; })];
            _slack_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return SlackSettingsDto; })];
            _teams_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return TeamsSettingsDto; })];
            _webhook_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return WebhookSettingsDto; })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _sms_decorators, { kind: "field", name: "sms", static: false, private: false, access: { has: function (obj) { return "sms" in obj; }, get: function (obj) { return obj.sms; }, set: function (obj, value) { obj.sms = value; } }, metadata: _metadata }, _sms_initializers, _sms_extraInitializers);
            __esDecorate(null, null, _push_decorators, { kind: "field", name: "push", static: false, private: false, access: { has: function (obj) { return "push" in obj; }, get: function (obj) { return obj.push; }, set: function (obj, value) { obj.push = value; } }, metadata: _metadata }, _push_initializers, _push_extraInitializers);
            __esDecorate(null, null, _inApp_decorators, { kind: "field", name: "inApp", static: false, private: false, access: { has: function (obj) { return "inApp" in obj; }, get: function (obj) { return obj.inApp; }, set: function (obj, value) { obj.inApp = value; } }, metadata: _metadata }, _inApp_initializers, _inApp_extraInitializers);
            __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
            __esDecorate(null, null, _slack_decorators, { kind: "field", name: "slack", static: false, private: false, access: { has: function (obj) { return "slack" in obj; }, get: function (obj) { return obj.slack; }, set: function (obj, value) { obj.slack = value; } }, metadata: _metadata }, _slack_initializers, _slack_extraInitializers);
            __esDecorate(null, null, _teams_decorators, { kind: "field", name: "teams", static: false, private: false, access: { has: function (obj) { return "teams" in obj; }, get: function (obj) { return obj.teams; }, set: function (obj, value) { obj.teams = value; } }, metadata: _metadata }, _teams_initializers, _teams_extraInitializers);
            __esDecorate(null, null, _webhook_decorators, { kind: "field", name: "webhook", static: false, private: false, access: { has: function (obj) { return "webhook" in obj; }, get: function (obj) { return obj.webhook; }, set: function (obj, value) { obj.webhook = value; } }, metadata: _metadata }, _webhook_initializers, _webhook_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ChannelSettingsDto = ChannelSettingsDto;
//# sourceMappingURL=channel-settings.dto.js.map