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
exports.SmsService = void 0;
var common_1 = require("@nestjs/common");
var SmsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SmsService = _classThis = /** @class */ (function () {
        function SmsService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(SmsService.name);
            this.twilioClient = null;
            this.mockMode = false;
            this.initializeTwilioClient();
        }
        SmsService_1.prototype.initializeTwilioClient = function () {
            try {
                var accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
                var authToken = this.configService.get('TWILIO_AUTH_TOKEN');
                var phoneNumber = this.configService.get('TWILIO_PHONE_NUMBER');
                // Check for mock configuration
                if (accountSid === 'mock' || authToken === 'mock') {
                    this.logger.warn('Mock Twilio configuration detected - using mock client');
                    this.mockMode = true;
                    return;
                }
                // Check if credentials are present
                if (!accountSid || !authToken || !phoneNumber) {
                    this.logger.warn('Invalid Twilio credentials - using mock client');
                    this.mockMode = true;
                    return;
                }
                // Try to initialize the Twilio client
                try {
                    var twilio = require('twilio');
                    this.twilioClient = twilio(accountSid, authToken);
                    this.logger.log('Twilio client initialized successfully');
                }
                catch (error) {
                    this.logger.warn("Failed to initialize Twilio client: ".concat(error.message));
                    this.mockMode = true;
                }
            }
            catch (error) {
                this.logger.warn("Error setting up Twilio: ".concat(error.message));
                this.mockMode = true;
            }
        };
        /**
         * Send an SMS message
         * @param to Recipient phone number
         * @param message SMS message content
         */
        SmsService_1.prototype.sendSms = function (to, message) {
            return __awaiter(this, void 0, void 0, function () {
                var fromNumber, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.mockMode || !this.twilioClient) {
                                return [2 /*return*/, this.sendMockSms(to, message)];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            fromNumber = this.configService.get('TWILIO_PHONE_NUMBER');
                            return [4 /*yield*/, this.twilioClient.messages.create({
                                    body: message,
                                    from: fromNumber,
                                    to: to
                                })];
                        case 2:
                            result = _a.sent();
                            this.logger.log("SMS sent to ".concat(to, " with SID: ").concat(result.sid));
                            return [2 /*return*/, result];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to send SMS through Twilio: ".concat(error_1.message));
                            // Fallback to mock if the real service fails
                            return [2 /*return*/, this.sendMockSms(to, message)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        SmsService_1.prototype.sendMockSms = function (to, message) {
            this.logger.log("[MOCK] Sending SMS to ".concat(to));
            this.logger.debug('[MOCK] SMS content:', message);
            return {
                sid: "MOCK_SMS_".concat(Date.now()),
                status: 'delivered',
                dateCreated: new Date(),
                to: to,
                body: message
            };
        };
        /**
         * Send an appointment reminder
         * @param appointment The appointment data
         */
        SmsService_1.prototype.sendAppointmentReminder = function (appointment) {
            return __awaiter(this, void 0, void 0, function () {
                var reminderData, message, phoneNumber;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            reminderData = {
                                appointmentId: appointment.id,
                                patientName: ((_a = appointment.contact) === null || _a === void 0 ? void 0 : _a.firstName) || 'Patient',
                                dateTime: appointment.dateTime || new Date(),
                                organizationName: ((_b = appointment.organization) === null || _b === void 0 ? void 0 : _b.name) || 'Healthcare Provider'
                            };
                            message = this.formatReminderMessage(reminderData);
                            phoneNumber = (_c = appointment.contact) === null || _c === void 0 ? void 0 : _c.phone;
                            if (!phoneNumber) {
                                this.logger.warn("No phone number available for appointment ".concat(appointment.id));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.sendSms(phoneNumber, message)];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SmsService_1.prototype.formatReminderMessage = function (data) {
            var date = data.dateTime.toLocaleDateString();
            var time = data.dateTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            return "Hi ".concat(data.patientName, ", this is a reminder of your appointment with ").concat(data.organizationName, " on ").concat(date, " at ").concat(time, ". Reply CONFIRM to confirm your attendance.");
        };
        SmsService_1.prototype.isMockMode = function () {
            return this.mockMode;
        };
        return SmsService_1;
    }());
    __setFunctionName(_classThis, "SmsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmsService = _classThis;
}();
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map