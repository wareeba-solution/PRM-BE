"use strict";
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
exports.DratchioService = void 0;
// src/modules/voip/services/dratchio.service.ts
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var DratchioService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleAppointmentReminder_decorators;
    var DratchioService = _classThis = /** @class */ (function () {
        function DratchioService_1(configService, freeswitchService, eventEmitter, voipConfigRepository, callLogRepository, voipQueue) {
            var _this = this;
            this.configService = (__runInitializers(this, _instanceExtraInitializers), configService);
            this.freeswitchService = freeswitchService;
            this.eventEmitter = eventEmitter;
            this.voipConfigRepository = voipConfigRepository;
            this.callLogRepository = callLogRepository;
            this.voipQueue = voipQueue;
            this.logger = new common_1.Logger(DratchioService.name);
            this.dratchioClient = null;
            // Initialize Dratchio integration
            this.initializeDratchio().catch(function (err) {
                _this.logger.error("Error during Dratchio initialization: ".concat(err.message));
            });
        }
        DratchioService_1.prototype.initializeDratchio = function () {
            return __awaiter(this, void 0, void 0, function () {
                var module_1, DratchioClient, config, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../../libs/dratchio'); })];
                        case 1:
                            module_1 = _a.sent();
                            DratchioClient = module_1.DratchioClient;
                            return [4 /*yield*/, this.getDratchioConfig()];
                        case 2:
                            config = _a.sent();
                            this.dratchioClient = new DratchioClient({
                                apiKey: config.apiKey,
                                apiSecret: config.apiSecret,
                                sipServer: config.sipServer,
                                sipUsername: config.sipUsername,
                                sipPassword: config.sipPassword,
                            });
                            this.dratchioClient.on('registered', function () {
                                _this.logger.log('Dratchio SIP client registered successfully');
                            });
                            this.dratchioClient.on('registrationFailed', function (error) {
                                _this.logger.error("Dratchio SIP registration failed: ".concat(error.message));
                            });
                            this.dratchioClient.on('incomingCall', function (call) {
                                _this.handleIncomingCall(call);
                            });
                            return [4 /*yield*/, this.dratchioClient.register()];
                        case 3:
                            _a.sent();
                            this.logger.log('Dratchio service initialized');
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error("Failed to initialize Dratchio: ".concat(error_1.message));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        DratchioService_1.prototype.getDratchioConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.voipConfigRepository.findOne({
                                where: { isActive: true, provider: 'dratchio' }
                            })];
                        case 1:
                            config = _a.sent();
                            if (!config) {
                                return [2 /*return*/, {
                                        apiKey: this.configService.get('DRATCHIO_API_KEY'),
                                        apiSecret: this.configService.get('DRATCHIO_API_SECRET'),
                                        sipServer: this.configService.get('DRATCHIO_SIP_SERVER'),
                                        sipUsername: this.configService.get('DRATCHIO_SIP_USERNAME'),
                                        sipPassword: this.configService.get('DRATCHIO_SIP_PASSWORD'),
                                    }];
                            }
                            return [2 /*return*/, JSON.parse(config.configJson || '{}')];
                    }
                });
            });
        };
        DratchioService_1.prototype.handleIncomingCall = function (call) {
            return __awaiter(this, void 0, void 0, function () {
                var callerId, destination, callLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callerId = call.callerId, destination = call.destination;
                            this.logger.log("Incoming call from ".concat(callerId, " to ").concat(destination));
                            callLog = this.callLogRepository.create({
                                callUuid: call.uuid,
                                callerNumber: callerId,
                                destinationNumber: destination,
                                startTime: new Date(),
                                status: 'ringing',
                                provider: 'dratchio',
                            });
                            return [4 /*yield*/, this.callLogRepository.save(callLog)];
                        case 1:
                            _a.sent();
                            // Emit event for the appointment module to check if this is a scheduled call
                            this.eventEmitter.emit('dratchio.incomingCall', {
                                uuid: call.uuid,
                                callerId: callerId,
                                destination: destination,
                                accept: function () { return call.answer(); },
                                reject: function () { return call.hangup(); }
                            });
                            // Queue for auto-handling if no one handles the call within 5 seconds
                            return [4 /*yield*/, this.voipQueue.add('handle-incoming-call', { callId: call.uuid }, {
                                    delay: 5000
                                })];
                        case 2:
                            // Queue for auto-handling if no one handles the call within 5 seconds
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Method to place outbound calls via Dratchio
        DratchioService_1.prototype.placeCall = function (destination, callerId) {
            return __awaiter(this, void 0, void 0, function () {
                var call, callLog, error_2, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.dratchioClient) {
                                throw new Error('Dratchio client not initialized');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.dratchioClient.call({
                                    to: destination,
                                    from: callerId,
                                })];
                        case 2:
                            call = _a.sent();
                            callLog = this.callLogRepository.create({
                                callUuid: call.uuid,
                                callerNumber: callerId,
                                destinationNumber: destination,
                                startTime: new Date(),
                                status: 'initiated',
                                provider: 'dratchio',
                            });
                            return [4 /*yield*/, this.callLogRepository.save(callLog)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, call.uuid];
                        case 4:
                            error_2 = _a.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                            this.logger.error("Failed to place call: ".concat(errorMessage));
                            throw error_2;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Event handler for appointment reminders
        DratchioService_1.prototype.handleAppointmentReminder = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var patientPhone, message, clinicNumber, callUuid, error_3, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            patientPhone = payload.patientPhone, message = payload.message;
                            clinicNumber = this.configService.get('CLINIC_PHONE_NUMBER') || '';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.placeCall(patientPhone, clinicNumber)];
                        case 2:
                            callUuid = _a.sent();
                            // Queue message to be played when call is answered
                            return [4 /*yield*/, this.voipQueue.add('play-voice-message', {
                                    callUuid: callUuid,
                                    message: message,
                                })];
                        case 3:
                            // Queue message to be played when call is answered
                            _a.sent();
                            this.logger.log("Appointment reminder call placed to ".concat(patientPhone));
                            return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            errorMessage = error_3 instanceof Error ? error_3.message : String(error_3);
                            this.logger.error("Failed to send appointment reminder call: ".concat(errorMessage));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return DratchioService_1;
    }());
    __setFunctionName(_classThis, "DratchioService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleAppointmentReminder_decorators = [(0, event_emitter_1.OnEvent)('appointment.reminder')];
        __esDecorate(_classThis, null, _handleAppointmentReminder_decorators, { kind: "method", name: "handleAppointmentReminder", static: false, private: false, access: { has: function (obj) { return "handleAppointmentReminder" in obj; }, get: function (obj) { return obj.handleAppointmentReminder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DratchioService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DratchioService = _classThis;
}();
exports.DratchioService = DratchioService;
//# sourceMappingURL=dratchio.service.js.map