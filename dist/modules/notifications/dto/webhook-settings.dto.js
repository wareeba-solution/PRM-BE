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
exports.WebhookSettingsDto = exports.WebhookRetryConfigDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/webhook-settings.dto.ts
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
                return { url: { required: false, type: function () { return String; }, format: "uri" }, secret: { required: false, type: function () { return String; } }, headers: { required: false, type: function () { return Object; } }, retryConfig: { required: false, type: function () { return require("./webhook-settings.dto").WebhookRetryConfigDto; } } };
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
//# sourceMappingURL=webhook-settings.dto.js.map