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
exports.SlackService = void 0;
// src/modules/integrations/slack/services/slack.service.ts
var common_1 = require("@nestjs/common");
var SlackService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SlackService = _classThis = /** @class */ (function () {
        function SlackService_1(configService, eventEmitter) {
            var _this = this;
            this.configService = configService;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(SlackService.name);
            var token = this.configService.get('SLACK_BOT_TOKEN');
            // Mock client
            this.client = {
                chat: {
                    postMessage: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ ok: true, ts: String(Date.now()) })];
                    }); }); },
                    update: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ ok: true })];
                    }); }); },
                    delete: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ ok: true })];
                    }); }); },
                },
                conversations: {
                    info: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ channel: { id: 'mock-channel', name: 'mock-channel-name' } })];
                    }); }); },
                    join: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ ok: true })];
                    }); }); },
                    history: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ({ messages: [] })];
                    }); }); },
                }
            };
        }
        /**
         * Send a simple text message to a Slack channel
         */
        SlackService_1.prototype.sendMessage = function (channel, text, threadTs) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Sending Slack message to channel ".concat(channel, ": ").concat(text));
                        response = { ok: true, ts: String(Date.now()) };
                        this.eventEmitter.emit('slack.message.sent', {
                            channel: channel,
                            messageTs: response.ts,
                            text: text,
                        });
                        return [2 /*return*/, response];
                    }
                    catch (error) {
                        this.logger.error('Failed to send Slack message', error);
                        this.eventEmitter.emit('slack.message.failed', {
                            channel: channel,
                            text: text,
                            error: error.message,
                        });
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        SlackService_1.prototype.sendDirectMessage = function (arg0) {
            this.logger.log("[MOCK] Sending direct message to user ".concat(arg0.userId, ": ").concat(arg0.message.text));
            return Promise.resolve({ ok: true, ts: String(Date.now()) });
        };
        /**
         * Send a message with block components
         */
        SlackService_1.prototype.sendBlockMessage = function (channel, blocks, text) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Sending Slack block message to channel ".concat(channel));
                        response = { ok: true, ts: String(Date.now()) };
                        this.eventEmitter.emit('slack.message.sent', {
                            channel: channel,
                            messageTs: response.ts,
                            blocks: blocks,
                        });
                        return [2 /*return*/, response];
                    }
                    catch (error) {
                        this.logger.error('Failed to send Slack block message', error);
                        this.eventEmitter.emit('slack.message.failed', {
                            channel: channel,
                            blocks: blocks,
                            error: error.message,
                        });
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Send a message with attachments
         */
        SlackService_1.prototype.sendAttachmentMessage = function (channel, attachments, text) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Sending Slack attachment message to channel ".concat(channel));
                        response = { ok: true, ts: String(Date.now()) };
                        this.eventEmitter.emit('slack.message.sent', {
                            channel: channel,
                            messageTs: response.ts,
                            attachments: attachments,
                        });
                        return [2 /*return*/, response];
                    }
                    catch (error) {
                        this.logger.error('Failed to send Slack attachment message', error);
                        this.eventEmitter.emit('slack.message.failed', {
                            channel: channel,
                            attachments: attachments,
                            error: error.message,
                        });
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Update an existing message
         */
        SlackService_1.prototype.updateMessage = function (channel, ts, text, blocks) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Updating Slack message in channel ".concat(channel, ", ts: ").concat(ts, ", text: ").concat(text));
                        this.eventEmitter.emit('slack.message.updated', {
                            channel: channel,
                            messageTs: ts,
                            text: text,
                            blocks: blocks,
                        });
                    }
                    catch (error) {
                        this.logger.error('Failed to update Slack message', error);
                        this.eventEmitter.emit('slack.message.update.failed', {
                            channel: channel,
                            ts: ts,
                            error: error.message,
                        });
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Delete a message
         */
        SlackService_1.prototype.deleteMessage = function (channel, ts) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Deleting Slack message from channel ".concat(channel, ", ts: ").concat(ts));
                        this.eventEmitter.emit('slack.message.deleted', {
                            channel: channel,
                            messageTs: ts,
                        });
                    }
                    catch (error) {
                        this.logger.error('Failed to delete Slack message', error);
                        this.eventEmitter.emit('slack.message.delete.failed', {
                            channel: channel,
                            ts: ts,
                            error: error.message,
                        });
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Get channel information
         */
        SlackService_1.prototype.getChannelInfo = function (channelId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Getting info for channel ".concat(channelId));
                    return [2 /*return*/, { id: channelId, name: "mock-channel-".concat(channelId) }];
                });
            });
        };
        /**
         * Join a channel
         */
        SlackService_1.prototype.joinChannel = function (channelId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Joining channel ".concat(channelId));
                    return [2 /*return*/, { ok: true }];
                });
            });
        };
        /**
         * Get message history from a channel
         */
        SlackService_1.prototype.getChannelHistory = function (channel_1) {
            return __awaiter(this, arguments, void 0, function (channel, limit) {
                if (limit === void 0) { limit = 100; }
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Getting history for channel ".concat(channel, ", limit: ").concat(limit));
                    return [2 /*return*/, Array(Math.min(limit, 10)).fill(null).map(function (_, i) { return ({
                            ts: String(Date.now() - i * 60000),
                            text: "Mock message ".concat(i + 1),
                            user: "U".concat(Math.random().toString(36).substring(2, 8).toUpperCase())
                        }); })];
                });
            });
        };
        return SlackService_1;
    }());
    __setFunctionName(_classThis, "SlackService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SlackService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SlackService = _classThis;
}();
exports.SlackService = SlackService;
//# sourceMappingURL=slack.service.js.map