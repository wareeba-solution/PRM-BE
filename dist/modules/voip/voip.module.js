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
exports.VoipModule = void 0;
// src/modules/voip/voip.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var bull_1 = require("@nestjs/bull");
var config_1 = require("@nestjs/config");
var event_emitter_1 = require("@nestjs/event-emitter");
var freeswitch_service_1 = require("./services/freeswitch.service");
var dratchio_service_1 = require("./services/dratchio.service");
var call_manager_service_1 = require("./services/call-manager.service");
var voip_controller_1 = require("./controllers/voip.controller");
var voip_config_entity_1 = require("./entities/voip-config.entity");
var call_log_entity_1 = require("./entities/call-log.entity");
var VoipModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([voip_config_entity_1.VoipConfig, call_log_entity_1.CallLog]),
                bull_1.BullModule.registerQueue({
                    name: 'voip-calls',
                }),
                config_1.ConfigModule,
                event_emitter_1.EventEmitterModule.forRoot(),
            ],
            controllers: [voip_controller_1.VoipController],
            providers: [
                freeswitch_service_1.FreeswitchService,
                dratchio_service_1.DratchioService,
                call_manager_service_1.CallManagerService,
            ],
            exports: [
                freeswitch_service_1.FreeswitchService,
                dratchio_service_1.DratchioService,
                call_manager_service_1.CallManagerService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VoipModule = _classThis = /** @class */ (function () {
        function VoipModule_1() {
        }
        return VoipModule_1;
    }());
    __setFunctionName(_classThis, "VoipModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VoipModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VoipModule = _classThis;
}();
exports.VoipModule = VoipModule;
//# sourceMappingURL=voip.module.js.map