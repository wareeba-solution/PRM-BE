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
exports.CreateCallDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/voip/dto/create-call.dto.ts
var class_validator_1 = require("class-validator");
var CreateCallDto = function () {
    var _a;
    var _destination_decorators;
    var _destination_initializers = [];
    var _destination_extraInitializers = [];
    var _callerId_decorators;
    var _callerId_initializers = [];
    var _callerId_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _options_decorators;
    var _options_initializers = [];
    var _options_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCallDto() {
                this.destination = __runInitializers(this, _destination_initializers, void 0);
                this.callerId = (__runInitializers(this, _destination_extraInitializers), __runInitializers(this, _callerId_initializers, void 0));
                this.provider = (__runInitializers(this, _callerId_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
                this.options = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _options_initializers, void 0));
                __runInitializers(this, _options_extraInitializers);
            }
            CreateCallDto._OPENAPI_METADATA_FACTORY = function () {
                return { destination: { required: true, type: function () { return String; } }, callerId: { required: false, type: function () { return String; } }, provider: { required: false, type: function () { return String; } }, options: { required: false, type: function () { return Object; } } };
            };
            return CreateCallDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _destination_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _callerId_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _provider_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _options_decorators = [(0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _destination_decorators, { kind: "field", name: "destination", static: false, private: false, access: { has: function (obj) { return "destination" in obj; }, get: function (obj) { return obj.destination; }, set: function (obj, value) { obj.destination = value; } }, metadata: _metadata }, _destination_initializers, _destination_extraInitializers);
            __esDecorate(null, null, _callerId_decorators, { kind: "field", name: "callerId", static: false, private: false, access: { has: function (obj) { return "callerId" in obj; }, get: function (obj) { return obj.callerId; }, set: function (obj, value) { obj.callerId = value; } }, metadata: _metadata }, _callerId_initializers, _callerId_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: function (obj) { return "options" in obj; }, get: function (obj) { return obj.options; }, set: function (obj, value) { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCallDto = CreateCallDto;
//# sourceMappingURL=create-call.dto.js.map