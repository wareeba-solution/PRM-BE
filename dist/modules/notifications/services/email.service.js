"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var typeorm_1 = require("typeorm");
var nodemailer = require("nodemailer");
var Handlebars = require("handlebars");
var email_status_enum_1 = require("../enums/email-status.enum");
var EmailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailService = _classThis = /** @class */ (function () {
        function EmailService_1(templateRepository, queueRepository, logRepository, configService) {
            this.templateRepository = templateRepository;
            this.queueRepository = queueRepository;
            this.logRepository = logRepository;
            this.configService = configService;
            this.logger = new common_1.Logger(EmailService.name);
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('SMTP_HOST'),
                port: this.configService.get('SMTP_PORT'),
                secure: this.configService.get('SMTP_SECURE'),
                auth: {
                    user: this.configService.get('SMTP_USER'),
                    pass: this.configService.get('SMTP_PASS'),
                },
            });
        }
        EmailService_1.prototype.sendAppointmentReminder = function (email, details) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation for sending email reminder
                    // Example:
                    console.log("Sending email to ".concat(email, " with details:"), details);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Queue an email for sending
         */
        EmailService_1.prototype.queueEmail = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var htmlContent, textContent, template, queueEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            htmlContent = options.htmlContent;
                            textContent = options.textContent;
                            if (!options.template) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: {
                                        name: options.template,
                                        organizationId: options.organizationId,
                                        isActive: true
                                    }
                                })];
                        case 1:
                            template = _a.sent();
                            if (template) {
                                htmlContent = this.compileTemplate(template.htmlContent, options.variables);
                                textContent = template.textContent ?
                                    this.compileTemplate(template.textContent, options.variables) :
                                    undefined;
                            }
                            _a.label = 2;
                        case 2:
                            queueEntry = this.queueRepository.create({
                                recipient: Array.isArray(options.to) ? options.to.join(',') : options.to,
                                subject: options.subject,
                                htmlContent: htmlContent,
                                textContent: textContent,
                                variables: options.variables,
                                metadata: options.metadata,
                                organizationId: options.organizationId,
                                scheduledFor: options.scheduledFor,
                                status: email_status_enum_1.EmailStatus.PENDING,
                            });
                            return [2 /*return*/, this.queueRepository.save(queueEntry)];
                    }
                });
            });
        };
        /**
         * Process queued emails
         */
        EmailService_1.prototype.processQueue = function () {
            return __awaiter(this, arguments, void 0, function (batchSize) {
                var queuedEmails, _i, queuedEmails_1, email, error_1;
                if (batchSize === void 0) { batchSize = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.queueRepository.find({
                                where: [
                                    { status: email_status_enum_1.EmailStatus.PENDING, scheduledFor: (0, typeorm_1.IsNull)() },
                                    {
                                        status: email_status_enum_1.EmailStatus.PENDING,
                                        scheduledFor: (0, typeorm_1.LessThanOrEqual)(new Date())
                                    }
                                ],
                                take: batchSize,
                                order: { createdAt: 'ASC' }
                            })];
                        case 1:
                            queuedEmails = _a.sent();
                            _i = 0, queuedEmails_1 = queuedEmails;
                            _a.label = 2;
                        case 2:
                            if (!(_i < queuedEmails_1.length)) return [3 /*break*/, 8];
                            email = queuedEmails_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 7]);
                            return [4 /*yield*/, this.sendEmail(email)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error("Failed to send email ".concat(email.id, ":"), error_1);
                            return [4 /*yield*/, this.handleSendError(email, error_1)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 2];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send a single email
         */
        EmailService_1.prototype.sendEmail = function (queuedEmail) {
            return __awaiter(this, void 0, void 0, function () {
                var mailOptions, result, logEntry, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Update status to sending
                        return [4 /*yield*/, this.queueRepository.update(queuedEmail.id, {
                                status: email_status_enum_1.EmailStatus.SENDING,
                                attempts: function () { return '"attempts" + 1'; }
                            })];
                        case 1:
                            // Update status to sending
                            _a.sent();
                            mailOptions = {
                                from: this.configService.get('MAIL_FROM'),
                                to: queuedEmail.recipient,
                                subject: queuedEmail.subject,
                                html: queuedEmail.htmlContent,
                                text: queuedEmail.textContent,
                            };
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            return [4 /*yield*/, this.transporter.sendMail(mailOptions)];
                        case 3:
                            result = _a.sent();
                            logEntry = this.logRepository.create({
                                organizationId: queuedEmail.organizationId,
                                templateId: queuedEmail.templateId,
                                recipient: queuedEmail.recipient,
                                subject: queuedEmail.subject,
                                htmlContent: queuedEmail.htmlContent,
                                textContent: queuedEmail.textContent,
                                metadata: queuedEmail.metadata,
                                status: email_status_enum_1.EmailStatus.SENT,
                                messageId: result.messageId,
                                sentAt: new Date(),
                            });
                            return [4 /*yield*/, this.logRepository.save(logEntry)];
                        case 4:
                            _a.sent();
                            // Remove from queue
                            return [4 /*yield*/, this.queueRepository.delete(queuedEmail.id)];
                        case 5:
                            // Remove from queue
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_2 = _a.sent();
                            throw error_2;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle email send errors
         */
        EmailService_1.prototype.handleSendError = function (email, error) {
            return __awaiter(this, void 0, void 0, function () {
                var maxAttempts, logEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            maxAttempts = this.configService.get('EMAIL_MAX_ATTEMPTS', 3);
                            if (!(email.attempts >= maxAttempts)) return [3 /*break*/, 3];
                            logEntry = this.logRepository.create({
                                organizationId: email.organizationId,
                                templateId: email.templateId,
                                recipient: email.recipient,
                                subject: email.subject,
                                htmlContent: email.htmlContent,
                                textContent: email.textContent,
                                metadata: email.metadata,
                                status: email_status_enum_1.EmailStatus.FAILED,
                                error: error.message,
                                sentAt: new Date(),
                            });
                            return [4 /*yield*/, this.logRepository.save(logEntry)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.queueRepository.delete(email.id)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: 
                        // Update queue entry with error
                        return [4 /*yield*/, this.queueRepository.update(email.id, {
                                status: email_status_enum_1.EmailStatus.PENDING,
                                lastError: error.message,
                            })];
                        case 4:
                            // Update queue entry with error
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Compile template with variables
         */
        EmailService_1.prototype.compileTemplate = function (template, variables) {
            if (variables === void 0) { variables = {}; }
            var compiledTemplate = Handlebars.compile(template);
            return compiledTemplate(variables);
        };
        /**
         * Get email logs for an organization
         */
        EmailService_1.prototype.getEmailLogs = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, options) {
                var query;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    query = this.logRepository.createQueryBuilder('log')
                        .where('log.organizationId = :organizationId', { organizationId: organizationId });
                    if (options.status) {
                        query.andWhere('log.status = :status', { status: options.status });
                    }
                    if (options.from) {
                        query.andWhere('log.createdAt >= :from', { from: options.from });
                    }
                    if (options.to) {
                        query.andWhere('log.createdAt <= :to', { to: options.to });
                    }
                    return [2 /*return*/, query
                            .orderBy('log.createdAt', 'DESC')
                            .take(options.limit || 50)
                            .skip(options.offset || 0)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Update email tracking status
         */
        EmailService_1.prototype.updateTrackingStatus = function (messageId, status, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log, update;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.logRepository.findOne({
                                where: { messageId: messageId }
                            })];
                        case 1:
                            log = _a.sent();
                            if (!log) {
                                return [2 /*return*/];
                            }
                            update = { status: status };
                            switch (status) {
                                case email_status_enum_1.EmailStatus.DELIVERED:
                                    update.deliveredAt = new Date();
                                    break;
                                case email_status_enum_1.EmailStatus.OPENED:
                                    update.openedAt = new Date();
                                    break;
                                case email_status_enum_1.EmailStatus.CLICKED:
                                    update.clickedAt = new Date();
                                    break;
                            }
                            if (metadata) {
                                update.metadata = __assign(__assign({}, log.metadata), metadata);
                            }
                            return [4 /*yield*/, this.logRepository.update(log.id, update)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
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