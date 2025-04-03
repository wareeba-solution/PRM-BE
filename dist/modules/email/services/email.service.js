"use strict";
// src/modules/emails/email.service.ts
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
exports.EmailService = void 0;
var common_1 = require("@nestjs/common");
// Comment out TypeORM imports that may be causing issues
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { EmailTemplate } from '../../notifications/entities/email-template.entity';
// import { Notification } from '../../notifications/entities/notification.entity';
// import { EmailQueue } from '../../notifications/entities/email-queue.entity';
// import { EmailLog } from '../../notifications/entities/email-log.entity';
// import { EmailStatus } from '../../notifications/enums/email-status.enum';
// Define EmailStatus enum locally if needed
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
})(EmailStatus || (EmailStatus = {}));
var EmailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailService = _classThis = /** @class */ (function () {
        // Remove repository injections temporarily
        function EmailService_1() {
            this.logger = new common_1.Logger(EmailService.name);
        }
        // constructor(
        //     @InjectRepository(EmailTemplate)
        //     private emailTemplateRepository: Repository<EmailTemplate>,
        //     @InjectRepository(EmailQueue)
        //     private emailQueueRepository: Repository<EmailQueue>,
        //     @InjectRepository(EmailLog)
        //     private emailLogRepository: Repository<EmailLog>,
        // ) {}
        EmailService_1.prototype.sendNotificationEmail = function (to, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Sending notification email to ".concat(to));
                    return [2 /*return*/];
                });
            });
        };
        EmailService_1.prototype.sendFollowUpEmail = function (email, details) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Sending follow-up email to ".concat(email));
                    return [2 /*return*/];
                });
            });
        };
        EmailService_1.prototype.sendMail = function (to, subject, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("[MOCK] Sending email to ".concat(to, " with subject: ").concat(subject));
                    // Implement your email sending logic here
                    // This is a placeholder implementation
                    this.logger.debug('Email content:', body);
                    return [2 /*return*/];
                });
            });
        };
        EmailService_1.prototype.sendAppointmentReminder = function (to, data) {
            return __awaiter(this, void 0, void 0, function () {
                var subject, emailContent;
                return __generator(this, function (_a) {
                    try {
                        this.logger.log("[MOCK] Sending appointment reminder to ".concat(to, " for appointment ").concat(data.appointmentId));
                        subject = "Appointment Reminder: ".concat(data.patientName, " with ").concat(data.doctorName);
                        emailContent = this.compileTemplate("Dear {{patientName}}, this is a reminder of your appointment with {{doctorName}} at {{organizationName}} on {{dateTime}}. Location: {{location}}{{notes}}", data);
                        this.logger.debug("Subject: ".concat(subject));
                        this.logger.debug("Content: ".concat(emailContent));
                        // Mock repository operations
                        this.logger.log('[MOCK] Email added to queue with status: PENDING');
                        this.logger.log('[MOCK] Email log created with status: QUEUED');
                    }
                    catch (error) {
                        this.logger.error("Failed to send appointment reminder email to ".concat(to, ":"), error);
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        EmailService_1.prototype.compileTemplate = function (template, data) {
            return template.replace(/\{\{([^}]+)\}\}/g, function (match, key) { return data[key.trim()] || ''; });
        };
        return EmailService_1;
    }());
    __setFunctionName(_classThis, "EmailService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailService = _classThis;
}();
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map