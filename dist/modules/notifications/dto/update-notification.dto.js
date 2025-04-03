"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.UpdateNotificationDto = exports.NotificationStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/update-notification.dto.ts
var swagger_1 = require("@nestjs/swagger");
var create_notification_dto_1 = require("./create-notification.dto");
var class_validator_1 = require("class-validator");
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["SCHEDULED"] = "SCHEDULED";
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["DELIVERED"] = "DELIVERED";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["FAILED"] = "FAILED";
    NotificationStatus["CANCELLED"] = "CANCELLED";
    NotificationStatus["EXPIRED"] = "EXPIRED";
    NotificationStatus["PROCESSING"] = "PROCESSING";
    NotificationStatus["RETRY_PENDING"] = "RETRY_PENDING";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var UpdateNotificationDto = function () {
    var _a;
    var _classSuper = (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_notification_dto_1.CreateNotificationDto, ['type', 'recipients']));
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _read_decorators;
    var _read_initializers = [];
    var _read_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(UpdateNotificationDto, _super);
            function UpdateNotificationDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = __runInitializers(_this, _status_initializers, void 0);
                _this.isDeleted = __runInitializers(_this, _status_extraInitializers);
                _this.read = __runInitializers(_this, _read_initializers, void 0);
                __runInitializers(_this, _read_extraInitializers);
                return _this;
            }
            UpdateNotificationDto._OPENAPI_METADATA_FACTORY = function () {
                return { status: { required: false, enum: require("./update-notification.dto").NotificationStatus }, isDeleted: { required: false, type: function () { return Boolean; } }, read: { required: false, type: function () { return Boolean; } } };
            };
            return UpdateNotificationDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(NotificationStatus)];
            _read_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _read_decorators, { kind: "field", name: "read", static: false, private: false, access: { has: function (obj) { return "read" in obj; }, get: function (obj) { return obj.read; }, set: function (obj, value) { obj.read = value; } }, metadata: _metadata }, _read_initializers, _read_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateNotificationDto = UpdateNotificationDto;
//# sourceMappingURL=update-notification.dto.js.map