"use strict";
// src/modules/messages/listeners/message-queue.listener.ts
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageQueueListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var MessageQueueListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleMessageCreated_decorators;
    var _handleMessageResend_decorators;
    var _handleBulkMessages_decorators;
    var MessageQueueListener = _classThis = /** @class */ (function () {
        function MessageQueueListener_1(deliveryService) {
            this.deliveryService = (__runInitializers(this, _instanceExtraInitializers), deliveryService);
        }
        MessageQueueListener_1.prototype.handleMessageCreated = function (message) {
            return this.deliveryService.processMessage(message);
        };
        MessageQueueListener_1.prototype.handleMessageResend = function (message) {
            return this.deliveryService.processMessage(message);
        };
        MessageQueueListener_1.prototype.handleBulkMessages = function (messages) {
            return this.deliveryService.processBulkMessages(messages);
        };
        return MessageQueueListener_1;
    }());
    __setFunctionName(_classThis, "MessageQueueListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleMessageCreated_decorators = [(0, event_emitter_1.OnEvent)('message.created')];
        _handleMessageResend_decorators = [(0, event_emitter_1.OnEvent)('message.resend')];
        _handleBulkMessages_decorators = [(0, event_emitter_1.OnEvent)('messages.bulk.created')];
        __esDecorate(_classThis, null, _handleMessageCreated_decorators, { kind: "method", name: "handleMessageCreated", static: false, private: false, access: { has: function (obj) { return "handleMessageCreated" in obj; }, get: function (obj) { return obj.handleMessageCreated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessageResend_decorators, { kind: "method", name: "handleMessageResend", static: false, private: false, access: { has: function (obj) { return "handleMessageResend" in obj; }, get: function (obj) { return obj.handleMessageResend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleBulkMessages_decorators, { kind: "method", name: "handleBulkMessages", static: false, private: false, access: { has: function (obj) { return "handleBulkMessages" in obj; }, get: function (obj) { return obj.handleBulkMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageQueueListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageQueueListener = _classThis;
}();
exports.MessageQueueListener = MessageQueueListener;
//# sourceMappingURL=message-queue.listener.js.map