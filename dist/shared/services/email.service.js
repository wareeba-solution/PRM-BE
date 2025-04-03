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
exports.EmailService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var nodemailer = require("nodemailer");
var util_1 = require("util");
var dns = require("dns");
var email_status_enum_1 = require("../../modules/notifications/enums/email-status.enum");
var domain_verification_status_enum_1 = require("../../modules/domain/enums/domain-verification-status.enum");
var EmailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailService = _classThis = /** @class */ (function () {
        function EmailService_1(configService, domainVerificationService, templateRepository, logRepository, queueRepository) {
            this.configService = configService;
            this.domainVerificationService = domainVerificationService;
            this.templateRepository = templateRepository;
            this.logRepository = logRepository;
            this.queueRepository = queueRepository;
            this.logger = new common_1.Logger(EmailService.name);
            this.maxRetries = 3;
            this.resolveTxt = (0, util_1.promisify)(dns.resolveTxt);
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('SMTP_HOST'),
                port: this.configService.get('SMTP_PORT'),
                secure: this.configService.get('SMTP_SECURE'),
                auth: {
                    user: this.configService.get('SMTP_USER'),
                    pass: this.configService.get('SMTP_PASSWORD'),
                },
                pool: true,
                maxConnections: 5,
                rateDelta: 1000,
                rateLimit: 5,
            });
        }
        EmailService_1.prototype.send = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement notification-specific email sending
                    return [2 /*return*/, this.sendEmail({
                            to: notification.recipient,
                            subject: notification.title,
                            template: notification.template,
                            context: notification.data,
                            metadata: { notificationId: notification.id }
                        })];
                });
            });
        };
        EmailService_1.prototype.sendEmail = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var htmlContent, textContent, template, emailData, result, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 9, , 10]);
                            htmlContent = '';
                            textContent = '';
                            if (!options.template) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: { name: options.template }
                                })];
                        case 1:
                            template = _b.sent();
                            if (!template) {
                                throw new Error("Email template ".concat(options.template, " not found"));
                            }
                            return [4 /*yield*/, this.processTemplate(template, options.context || {})];
                        case 2:
                            (_a = _b.sent(), htmlContent = _a.html, textContent = _a.text);
                            _b.label = 3;
                        case 3:
                            emailData = {
                                from: this.configService.get('MAIL_FROM'),
                                to: Array.isArray(options.to) ? options.to.join(',') : options.to,
                                cc: options.cc,
                                bcc: options.bcc,
                                replyTo: options.replyTo,
                                subject: options.subject,
                                html: htmlContent,
                                text: textContent || this.stripHtml(htmlContent),
                                attachments: options.attachments,
                                priority: options.priority || 'normal',
                                headers: this.generateHeaders(options),
                            };
                            if (!this.configService.get('EMAIL_QUEUE_ENABLED')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.queueEmail(emailData, options.metadata)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 5: return [4 /*yield*/, this.transporter.sendMail(emailData)];
                        case 6:
                            result = _b.sent();
                            return [4 /*yield*/, this.logEmail(emailData, result, options.metadata)];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            error_1 = _b.sent();
                            this.logger.error('Error sending email:', error_1);
                            throw error_1;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.processTemplate = function (template, context) {
            return __awaiter(this, void 0, void 0, function () {
                var html_1, text_1;
                return __generator(this, function (_a) {
                    try {
                        html_1 = template.htmlContent;
                        text_1 = template.textContent || '';
                        Object.entries(context).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                            html_1 = html_1.replace(regex, String(value));
                            text_1 = text_1.replace(regex, String(value));
                        });
                        return [2 /*return*/, { html: html_1, text: text_1 }];
                    }
                    catch (error) {
                        this.logger.error('Error processing email template:', error);
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        EmailService_1.prototype.queueEmail = function (emailData, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var queueEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queueEntry = this.queueRepository.create({
                                data: emailData,
                                metadata: metadata,
                                status: email_status_enum_1.EmailStatus.QUEUED,
                                priority: emailData.priority === 'high' ? 1 : emailData.priority === 'low' ? 3 : 2,
                                attempts: 0,
                                maxAttempts: this.maxRetries,
                            });
                            return [4 /*yield*/, this.queueRepository.save(queueEntry)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.logEmail = function (emailData, result, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            log = this.logRepository.create({
                                recipient: emailData.to,
                                subject: emailData.subject,
                                template: emailData.template,
                                metadata: metadata,
                                messageId: result.messageId,
                                status: email_status_enum_1.EmailStatus.SENT,
                                sentAt: new Date(),
                            });
                            return [4 /*yield*/, this.logRepository.save(log)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.stripHtml = function (html) {
            return html.replace(/<[^>]*>/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        };
        EmailService_1.prototype.generateHeaders = function (options) {
            var headers = {
                'X-Message-ID': "".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 15)),
                'X-Priority': options.priority === 'high' ? '1' : options.priority === 'low' ? '5' : '3',
                'X-Environment': this.configService.get('NODE_ENV', 'development'),
                'X-Application': this.configService.get('APP_NAME', 'DefaultAppName'),
            };
            if (options.metadata) {
                headers['X-Metadata'] = Buffer.from(JSON.stringify(options.metadata)).toString('base64');
            }
            return headers;
        };
        EmailService_1.prototype.verifyEmailDomain = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationStatus, _a, hasDmarc, hasSpf, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.domainVerificationService.getDomainVerificationStatus(domain)];
                        case 1:
                            verificationStatus = _b.sent();
                            if (!verificationStatus) {
                                throw new Error("Domain ".concat(domain, " not found"));
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.verifyDmarcRecord(domain),
                                    this.verifySpfRecord(domain)
                                ])];
                        case 2:
                            _a = _b.sent(), hasDmarc = _a[0], hasSpf = _a[1];
                            if (!hasDmarc) {
                                this.logger.warn("DMARC record not found for domain ".concat(domain));
                            }
                            if (!hasSpf) {
                                this.logger.warn("SPF record not found for domain ".concat(domain));
                            }
                            return [2 /*return*/, verificationStatus.status === domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED && hasDmarc && hasSpf];
                        case 3:
                            error_2 = _b.sent();
                            this.logger.error("Error verifying email domain ".concat(domain, ":"), error_2);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.verifyDmarcRecord = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                var records, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.resolveTxt("_dmarc.".concat(domain))];
                        case 1:
                            records = _a.sent();
                            return [2 /*return*/, records.some(function (record) {
                                    return record.join('').toLowerCase().includes('v=dmarc1');
                                })];
                        case 2:
                            error_3 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.verifySpfRecord = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                var records, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.resolveTxt(domain)];
                        case 1:
                            records = _a.sent();
                            return [2 /*return*/, records.some(function (record) {
                                    return record.join('').toLowerCase().includes('v=spf1');
                                })];
                        case 2:
                            error_4 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.getEmailStatus = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.logRepository.findOne({
                                    where: { messageId: messageId }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error("Error getting email status for message ".concat(messageId, ":"), error_5);
                            throw error_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.processEmailQueue = function () {
            return __awaiter(this, arguments, void 0, function (batchSize) {
                var queuedEmails, _i, queuedEmails_1, queuedEmail, result, error_6, error_7;
                if (batchSize === void 0) { batchSize = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 11, , 12]);
                            return [4 /*yield*/, this.queueRepository.find({
                                    where: {
                                        status: email_status_enum_1.EmailStatus.QUEUED,
                                        attempts: (0, typeorm_1.LessThan)(this.maxRetries)
                                    },
                                    order: {
                                        createdAt: 'ASC'
                                    },
                                    take: batchSize
                                })];
                        case 1:
                            queuedEmails = _a.sent();
                            _i = 0, queuedEmails_1 = queuedEmails;
                            _a.label = 2;
                        case 2:
                            if (!(_i < queuedEmails_1.length)) return [3 /*break*/, 10];
                            queuedEmail = queuedEmails_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 7, , 9]);
                            return [4 /*yield*/, this.transporter.sendMail(queuedEmail.data)];
                        case 4:
                            result = _a.sent();
                            return [4 /*yield*/, this.logEmail(queuedEmail.data, result, queuedEmail.metadata)];
                        case 5:
                            _a.sent();
                            queuedEmail.status = email_status_enum_1.EmailStatus.SENT;
                            queuedEmail.sentAt = new Date();
                            return [4 /*yield*/, this.queueRepository.save(queuedEmail)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            error_6 = _a.sent();
                            queuedEmail.attempts += 1;
                            queuedEmail.lastError = error_6.message;
                            queuedEmail.status = queuedEmail.attempts >= this.maxRetries
                                ? email_status_enum_1.EmailStatus.FAILED
                                : email_status_enum_1.EmailStatus.QUEUED;
                            return [4 /*yield*/, this.queueRepository.save(queuedEmail)];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 9:
                            _i++;
                            return [3 /*break*/, 2];
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            error_7 = _a.sent();
                            this.logger.error('Error processing email queue:', error_7);
                            throw error_7;
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.cleanupEmailQueue = function () {
            return __awaiter(this, arguments, void 0, function (days) {
                var cutoffDate, error_8;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            cutoffDate = new Date();
                            cutoffDate.setDate(cutoffDate.getDate() - days);
                            return [4 /*yield*/, this.queueRepository.delete({
                                    status: (0, typeorm_1.In)([email_status_enum_1.EmailStatus.SENT, email_status_enum_1.EmailStatus.FAILED]),
                                    updatedAt: (0, typeorm_1.LessThan)(cutoffDate)
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            this.logger.error('Error cleaning up email queue:', error_8);
                            throw error_8;
                        case 3: return [2 /*return*/];
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