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
exports.FreeswitchService = void 0;
// src/modules/voip/services/freeswitch.service.ts
var common_1 = require("@nestjs/common");
var esl = require("esl");
var FreeswitchService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FreeswitchService = _classThis = /** @class */ (function () {
        function FreeswitchService_1(configService, eventEmitter, voipConfigRepository, callLogRepository) {
            this.configService = configService;
            this.eventEmitter = eventEmitter;
            this.voipConfigRepository = voipConfigRepository;
            this.callLogRepository = callLogRepository;
            this.logger = new common_1.Logger(FreeswitchService.name);
            this.isConnected = false;
        }
        FreeswitchService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connectToFreeswitch()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FreeswitchService_1.prototype.connectToFreeswitch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getFreeswitchConfig()];
                        case 1:
                            config = _a.sent();
                            try {
                                this.connection = new esl.Connection(config.host, config.port, config.password);
                                this.connection.on('esl::ready', function () {
                                    _this.isConnected = true;
                                    _this.logger.log('Connected to FreeSWITCH');
                                    // Subscribe to relevant events
                                    _this.connection.subscribe([
                                        'CHANNEL_CREATE',
                                        'CHANNEL_ANSWER',
                                        'CHANNEL_HANGUP_COMPLETE'
                                    ]);
                                });
                                this.connection.on('esl::end', function () {
                                    _this.isConnected = false;
                                    _this.logger.warn('Disconnected from FreeSWITCH');
                                    // Attempt reconnection after delay
                                    setTimeout(function () { return _this.connectToFreeswitch(); }, 5000);
                                });
                                this.connection.on('esl::event::CHANNEL_CREATE::*', function (event) {
                                    _this.handleCallStart(event);
                                });
                                this.connection.on('esl::event::CHANNEL_ANSWER::*', function (event) {
                                    _this.handleCallAnswer(event);
                                });
                                this.connection.on('esl::event::CHANNEL_HANGUP_COMPLETE::*', function (event) {
                                    _this.handleCallEnd(event);
                                });
                            }
                            catch (error) {
                                this.logger.error("Failed to connect to FreeSWITCH: ".concat(error.message));
                                // Attempt reconnection after delay
                                setTimeout(function () { return _this.connectToFreeswitch(); }, 5000);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FreeswitchService_1.prototype.getFreeswitchConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.voipConfigRepository.findOne({ where: { isActive: true } })];
                        case 1:
                            config = _a.sent();
                            if (!config) {
                                // Use default config if none is found in DB
                                return [2 /*return*/, {
                                        host: this.configService.get('FREESWITCH_HOST', '127.0.0.1'),
                                        port: parseInt(this.configService.get('FREESWITCH_PORT', '8021')),
                                        password: this.configService.get('FREESWITCH_PASSWORD', 'ClueCon'),
                                        isActive: true,
                                    }];
                            }
                            return [2 /*return*/, config];
                    }
                });
            });
        };
        FreeswitchService_1.prototype.handleCallStart = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var callerId, destination, uuid, callLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callerId = event.getHeader('Caller-Caller-ID-Number');
                            destination = event.getHeader('Caller-Destination-Number');
                            uuid = event.getHeader('Unique-ID');
                            this.logger.log("Call started: ".concat(callerId, " -> ").concat(destination, " (UUID: ").concat(uuid, ")"));
                            callLog = this.callLogRepository.create({
                                callUuid: uuid,
                                callerNumber: callerId,
                                destinationNumber: destination,
                                startTime: new Date(),
                                status: 'initiated',
                            });
                            return [4 /*yield*/, this.callLogRepository.save(callLog)];
                        case 1:
                            _a.sent();
                            // Emit event for other modules
                            this.eventEmitter.emit('call.started', { uuid: uuid, callerId: callerId, destination: destination });
                            return [2 /*return*/];
                    }
                });
            });
        };
        FreeswitchService_1.prototype.handleCallAnswer = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var uuid, callLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuid = event.getHeader('Unique-ID');
                            this.logger.log("Call answered (UUID: ".concat(uuid, ")"));
                            return [4 /*yield*/, this.callLogRepository.findOne({ where: { callUuid: uuid } })];
                        case 1:
                            callLog = _a.sent();
                            if (!callLog) return [3 /*break*/, 3];
                            callLog.status = 'answered';
                            callLog.answerTime = new Date();
                            return [4 /*yield*/, this.callLogRepository.save(callLog)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            // Emit event for other modules
                            this.eventEmitter.emit('call.answered', { uuid: uuid });
                            return [2 /*return*/];
                    }
                });
            });
        };
        FreeswitchService_1.prototype.handleCallEnd = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var uuid, duration, hangupCause, callLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuid = event.getHeader('Unique-ID');
                            duration = parseInt(event.getHeader('variable_duration') || '0');
                            hangupCause = event.getHeader('variable_hangup_cause');
                            this.logger.log("Call ended (UUID: ".concat(uuid, "), duration: ").concat(duration, "s, cause: ").concat(hangupCause));
                            return [4 /*yield*/, this.callLogRepository.findOne({ where: { callUuid: uuid } })];
                        case 1:
                            callLog = _a.sent();
                            if (!callLog) return [3 /*break*/, 3];
                            callLog.status = 'completed';
                            callLog.endTime = new Date();
                            callLog.duration = duration;
                            callLog.hangupCause = hangupCause;
                            return [4 /*yield*/, this.callLogRepository.save(callLog)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            // Emit event for other modules
                            this.eventEmitter.emit('call.ended', { uuid: uuid, duration: duration, hangupCause: hangupCause });
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Method to place outbound calls
        FreeswitchService_1.prototype.placeCall = function (destination, callerId) {
            return __awaiter(this, void 0, void 0, function () {
                var originationString;
                var _this = this;
                return __generator(this, function (_a) {
                    if (!this.isConnected) {
                        throw new Error('Not connected to FreeSWITCH');
                    }
                    originationString = "{origination_caller_id_number=".concat(callerId, "}sofia/external/").concat(destination);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.connection.api('originate', originationString, function (response) {
                                if (response.body && response.body.includes('-ERR')) {
                                    _this.logger.error("Failed to place call: ".concat(response.body));
                                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                                }
                                else {
                                    // Extract UUID from response
                                    var uuid = response.body ? response.body.trim() : '';
                                    _this.logger.log("Call placed to ".concat(destination, ", UUID: ").concat(uuid));
                                    resolve(uuid);
                                }
                            });
                        })];
                });
            });
        };
        // Send DTMF tones during active call
        FreeswitchService_1.prototype.sendDTMF = function (uuid, digits) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (!this.isConnected) {
                        throw new Error('Not connected to FreeSWITCH');
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.connection.api('uuid_send_dtmf', "".concat(uuid, " ").concat(digits), function (response) {
                                if (response.body && response.body.includes('-ERR')) {
                                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                                }
                                else {
                                    resolve();
                                }
                            });
                        })];
                });
            });
        };
        // Hangup a call
        FreeswitchService_1.prototype.hangupCall = function (uuid) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (!this.isConnected) {
                        throw new Error('Not connected to FreeSWITCH');
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.connection.api('uuid_kill', uuid, function (response) {
                                if (response.body && response.body.includes('-ERR')) {
                                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                                }
                                else {
                                    resolve();
                                }
                            });
                        })];
                });
            });
        };
        return FreeswitchService_1;
    }());
    __setFunctionName(_classThis, "FreeswitchService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FreeswitchService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FreeswitchService = _classThis;
}();
exports.FreeswitchService = FreeswitchService;
//# sourceMappingURL=freeswitch.service.js.map