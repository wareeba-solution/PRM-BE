"use strict";
// src/modules/messages/services/message-scheduler.service.ts
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchedulerService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var schedule_1 = require("@nestjs/schedule");
var create_message_dto_1 = require("../dto/create-message.dto");
var MessageSchedulerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _processScheduledMessages_decorators;
    var MessageSchedulerService = _classThis = /** @class */ (function () {
        function MessageSchedulerService_1(messageRepository, eventEmitter) {
            this.messageRepository = (__runInitializers(this, _instanceExtraInitializers), messageRepository);
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(MessageSchedulerService.name);
        }
        /**
         * Initialize the scheduler when the module starts
         */
        MessageSchedulerService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Message scheduler service initialized');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Process any messages that might have been scheduled
                            // but not processed due to server restart
                            return [4 /*yield*/, this.processScheduledMessages()];
                        case 2:
                            // Process any messages that might have been scheduled
                            // but not processed due to server restart
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Error processing scheduled messages:', error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Clean up when the module is destroyed
         */
        MessageSchedulerService_1.prototype.onModuleDestroy = function () {
            if (this.schedulerInterval) {
                clearInterval(this.schedulerInterval);
            }
        };
        /**
         * Schedule a new message for future delivery
         */
        MessageSchedulerService_1.prototype.scheduleMessage = function (message, scheduledFor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    message.scheduledFor = scheduledFor;
                    message.status = create_message_dto_1.MessageStatus.SCHEDULED;
                    return [2 /*return*/, this.messageRepository.save(message)];
                });
            });
        };
        /**
         * Cancel a scheduled message
         */
        MessageSchedulerService_1.prototype.cancelScheduledMessage = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.findOne({ where: { id: messageId } })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new Error("Message with ID ".concat(messageId, " not found"));
                            }
                            if (message.status !== create_message_dto_1.MessageStatus.SCHEDULED) {
                                throw new Error("Message is not scheduled: ".concat(messageId));
                            }
                            message.status = create_message_dto_1.MessageStatus.SENDING;
                            message.scheduledFor = undefined;
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 2:
                            _a.sent();
                            this.logger.log("Scheduled message ".concat(messageId, " has been canceled"));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reschedule a message for a different time
         */
        MessageSchedulerService_1.prototype.rescheduleMessage = function (messageId, newScheduledFor) {
            return __awaiter(this, void 0, void 0, function () {
                var message, updatedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.findOne({ where: { id: messageId } })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new Error("Message with ID ".concat(messageId, " not found"));
                            }
                            message.scheduledFor = newScheduledFor;
                            message.status = create_message_dto_1.MessageStatus.SCHEDULED;
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 2:
                            updatedMessage = _a.sent();
                            this.logger.log("Message ".concat(messageId, " rescheduled for ").concat(newScheduledFor));
                            return [2 /*return*/, updatedMessage];
                    }
                });
            });
        };
        /**
         * Run every minute to check for messages that need to be sent
         * Uses NestJS built-in scheduler (requires @nestjs/schedule package)
         */
        MessageSchedulerService_1.prototype.processScheduledMessages = function () {
            return __awaiter(this, void 0, void 0, function () {
                var now, dueSendMessages, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            this.logger.debug('Checking for scheduled messages...');
                            now = new Date();
                            return [4 /*yield*/, this.messageRepository.find({
                                    where: {
                                        status: create_message_dto_1.MessageStatus.SCHEDULED,
                                        scheduledFor: (0, typeorm_1.LessThanOrEqual)(now),
                                    },
                                })];
                        case 1:
                            dueSendMessages = _a.sent();
                            // If no messages are due, return early
                            if (dueSendMessages.length === 0) {
                                return [2 /*return*/];
                            }
                            this.logger.log("Found ".concat(dueSendMessages.length, " scheduled messages to process"));
                            // Update status to pending for all due messages
                            return [4 /*yield*/, Promise.all(dueSendMessages.map(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                message.status = create_message_dto_1.MessageStatus.SENDING;
                                                return [4 /*yield*/, this.messageRepository.save(message)];
                                            case 1:
                                                _a.sent();
                                                // Emit event to trigger message processing
                                                this.eventEmitter.emit('message.created', message);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 2:
                            // Update status to pending for all due messages
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            this.logger.error('Error processing scheduled messages:', error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get all scheduled messages
         */
        MessageSchedulerService_1.prototype.getAllScheduledMessages = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageRepository.find({
                            where: { status: create_message_dto_1.MessageStatus.SCHEDULED },
                            order: { scheduledFor: 'ASC' },
                        })];
                });
            });
        };
        /**
         * Get scheduled messages for a specific time period
         */
        MessageSchedulerService_1.prototype.getScheduledMessagesForPeriod = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageRepository.find({
                            where: {
                                status: create_message_dto_1.MessageStatus.SCHEDULED,
                                scheduledFor: (0, typeorm_1.Between)(startDate, endDate),
                            },
                            order: { scheduledFor: 'ASC' },
                        })];
                });
            });
        };
        return MessageSchedulerService_1;
    }());
    __setFunctionName(_classThis, "MessageSchedulerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _processScheduledMessages_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE)];
        __esDecorate(_classThis, null, _processScheduledMessages_decorators, { kind: "method", name: "processScheduledMessages", static: false, private: false, access: { has: function (obj) { return "processScheduledMessages" in obj; }, get: function (obj) { return obj.processScheduledMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageSchedulerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageSchedulerService = _classThis;
}();
exports.MessageSchedulerService = MessageSchedulerService;
//# sourceMappingURL=message-scheduler.service.js.map