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
exports.VoipConfig = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/voip/entities/voip-config.entity.ts
var typeorm_1 = require("typeorm");
var VoipConfig = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('voip_configs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _host_decorators;
    var _host_initializers = [];
    var _host_extraInitializers = [];
    var _port_decorators;
    var _port_initializers = [];
    var _port_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _configJson_decorators;
    var _configJson_initializers = [];
    var _configJson_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var VoipConfig = _classThis = /** @class */ (function () {
        function VoipConfig_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.provider = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.host = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.port = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _port_initializers, void 0));
            this.password = (__runInitializers(this, _port_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.configJson = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _configJson_initializers, void 0));
            this.isActive = (__runInitializers(this, _configJson_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        VoipConfig_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return Number; } }, name: { required: true, type: function () { return String; } }, provider: { required: true, type: function () { return String; } }, host: { required: true, type: function () { return String; } }, port: { required: true, type: function () { return Number; } }, password: { required: true, type: function () { return String; } }, configJson: { required: true, type: function () { return String; } }, isActive: { required: true, type: function () { return Boolean; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return VoipConfig_1;
    }());
    __setFunctionName(_classThis, "VoipConfig");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, typeorm_1.Column)({ default: 'default' })];
        _provider_decorators = [(0, typeorm_1.Column)({ default: 'freeswitch' })];
        _host_decorators = [(0, typeorm_1.Column)({ default: '127.0.0.1' })];
        _port_decorators = [(0, typeorm_1.Column)({ default: 8021 })];
        _password_decorators = [(0, typeorm_1.Column)({ default: 'ClueCon' })];
        _configJson_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _host_decorators, { kind: "field", name: "host", static: false, private: false, access: { has: function (obj) { return "host" in obj; }, get: function (obj) { return obj.host; }, set: function (obj, value) { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
        __esDecorate(null, null, _port_decorators, { kind: "field", name: "port", static: false, private: false, access: { has: function (obj) { return "port" in obj; }, get: function (obj) { return obj.port; }, set: function (obj, value) { obj.port = value; } }, metadata: _metadata }, _port_initializers, _port_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _configJson_decorators, { kind: "field", name: "configJson", static: false, private: false, access: { has: function (obj) { return "configJson" in obj; }, get: function (obj) { return obj.configJson; }, set: function (obj, value) { obj.configJson = value; } }, metadata: _metadata }, _configJson_initializers, _configJson_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VoipConfig = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VoipConfig = _classThis;
}();
exports.VoipConfig = VoipConfig;
//# sourceMappingURL=voip-config.entity.js.map