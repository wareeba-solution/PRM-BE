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
exports.WhatsappService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var axios_1 = require("axios");
var whatsapp_template_entity_1 = require("../entities/whatsapp-template.entity");
var whatsapp_message_status_enum_1 = require("../enums/whatsapp-message-status.enum");
var WhatsappService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WhatsappService = _classThis = /** @class */ (function () {
        function WhatsappService_1(configService, eventEmitter, messageRepository, templateRepository) {
            this.configService = configService;
            this.eventEmitter = eventEmitter;
            this.messageRepository = messageRepository;
            this.templateRepository = templateRepository;
            this.logger = new common_1.Logger(WhatsappService.name);
            this.maxRetries = 3;
            this.client = axios_1.default.create({
                baseURL: this.configService.get('WHATSAPP_API_URL'),
                headers: {
                    'Authorization': "Bearer ".concat(this.configService.get('WHATSAPP_API_TOKEN')),
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
        }
        WhatsappService_1.prototype.sendAppointmentReminder = function (whatsappNumber, data) {
            return __awaiter(this, void 0, void 0, function () {
                var template, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: { name: 'appointment_reminder' }
                                })];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new Error('Appointment reminder template not found');
                            }
                            return [4 /*yield*/, this.sendMessage({
                                    to: whatsappNumber,
                                    template: 'appointment_reminder',
                                    parameters: {
                                        header: data.organizationName,
                                        body: {
                                            patientName: data.patientName,
                                            doctorName: data.doctorName,
                                            dateTime: data.dateTime.toLocaleString(),
                                            location: data.location
                                        }
                                    },
                                    metadata: {
                                        appointmentId: data.appointmentId,
                                        type: 'APPOINTMENT_REMINDER'
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to send WhatsApp reminder to ".concat(whatsappNumber, ":"), error_1);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.sendMessage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var formattedNumber, messageData, message, response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 9, , 10]);
                            formattedNumber = this.formatPhoneNumber(options.to);
                            // Validate phone number
                            if (!this.isValidPhoneNumber(formattedNumber)) {
                                throw new Error("Invalid phone number: ".concat(options.to));
                            }
                            messageData = void 0;
                            if (!options.template) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prepareTemplateMessage(options)];
                        case 1:
                            messageData = _a.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            if (!options.mediaUrl) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prepareMediaMessage(options)];
                        case 3:
                            messageData = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            messageData = this.prepareTextMessage(options);
                            _a.label = 5;
                        case 5:
                            message = this.messageRepository.create({
                                to: formattedNumber,
                                messageType: options.template ? 'template' : options.mediaUrl ? 'media' : 'text',
                                content: messageData,
                                metadata: options.metadata,
                                status: this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.PENDING),
                                retryCount: 0,
                            });
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.client.post('/messages', __assign({ messaging_product: 'whatsapp', recipient_type: 'individual', to: formattedNumber }, messageData))];
                        case 7:
                            response = _a.sent();
                            // Update message with WhatsApp message ID
                            message.whatsappMessageId = response.data.messages[0].id;
                            message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT);
                            message.sentAt = new Date();
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 8:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('whatsapp.message.sent', message);
                            return [2 /*return*/, message];
                        case 9:
                            error_2 = _a.sent();
                            this.logger.error('Error sending WhatsApp message:', error_2);
                            throw error_2;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.prepareTemplateMessage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.templateRepository.findOne({
                                where: { name: options.template }
                            })];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new Error("Template not found: ".concat(options.template));
                            }
                            return [2 /*return*/, {
                                    type: 'template',
                                    template: {
                                        name: template.name,
                                        language: {
                                            code: template.language
                                        },
                                        components: this.buildTemplateComponents(template, options.parameters)
                                    }
                                }];
                    }
                });
            });
        };
        WhatsappService_1.prototype.prepareMediaMessage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if (!options.mediaType) {
                        throw new Error('Media type is required for media messages');
                    }
                    return [2 /*return*/, (_a = {
                                type: options.mediaType.toLowerCase()
                            },
                            _a[options.mediaType.toLowerCase()] = {
                                link: options.mediaUrl
                            },
                            _a.text = options.text,
                            _a)];
                });
            });
        };
        WhatsappService_1.prototype.prepareTextMessage = function (options) {
            if (!options.text) {
                throw new Error('Text is required for text messages');
            }
            return {
                type: 'text',
                text: {
                    body: options.text,
                    preview_url: true
                }
            };
        };
        WhatsappService_1.prototype.buildTemplateComponents = function (template, parameters) {
            var components = [];
            // Find header component if it exists
            var headerComponent = template.components.find(function (c) {
                return c.type === whatsapp_template_entity_1.WhatsappTemplateComponentType.HEADER;
            });
            if (headerComponent && (parameters === null || parameters === void 0 ? void 0 : parameters.header)) {
                components.push({
                    type: 'header',
                    parameters: this.formatParameters(headerComponent.format || whatsapp_template_entity_1.WhatsappTemplateHeaderType.TEXT, parameters.header)
                });
            }
            if (parameters === null || parameters === void 0 ? void 0 : parameters.body) {
                components.push({
                    type: 'body',
                    parameters: this.formatParameters('text', parameters.body)
                });
            }
            // Find button component if it exists
            var buttonComponent = template.components.find(function (c) {
                return c.type === whatsapp_template_entity_1.WhatsappTemplateComponentType.BUTTONS;
            });
            if ((buttonComponent === null || buttonComponent === void 0 ? void 0 : buttonComponent.buttons) && (parameters === null || parameters === void 0 ? void 0 : parameters.buttons)) {
                components.push({
                    type: 'button',
                    sub_type: 'quick_reply',
                    index: 0,
                    parameters: parameters.buttons
                });
            }
            return components;
        };
        WhatsappService_1.prototype.formatParameters = function (type, value) {
            switch (type) {
                case 'text':
                    return [{ type: 'text', text: value }];
                case 'image':
                    return [{ type: 'image', image: { link: value } }];
                case 'document':
                    return [{ type: 'document', document: { link: value } }];
                case 'video':
                    return [{ type: 'video', video: { link: value } }];
                default:
                    return [{ type: 'text', text: value }];
            }
        };
        WhatsappService_1.prototype.handleWebhook = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, _i, entry_1, e, _a, _b, change, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 9, , 10]);
                            entry = data.entry;
                            _i = 0, entry_1 = entry;
                            _c.label = 1;
                        case 1:
                            if (!(_i < entry_1.length)) return [3 /*break*/, 8];
                            e = entry_1[_i];
                            _a = 0, _b = e.changes;
                            _c.label = 2;
                        case 2:
                            if (!(_a < _b.length)) return [3 /*break*/, 7];
                            change = _b[_a];
                            if (!change.value.messages) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.handleIncomingMessages(change.value.messages)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            if (!change.value.statuses) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.handleMessageStatuses(change.value.statuses)];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6:
                            _a++;
                            return [3 /*break*/, 2];
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            error_3 = _c.sent();
                            this.logger.error('Error processing WhatsApp webhook:', error_3);
                            throw error_3;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.handleIncomingMessages = function (messages) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, messages_1, message, incomingMessage, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, messages_1 = messages;
                            _a.label = 1;
                        case 1:
                            if (!(_i < messages_1.length)) return [3 /*break*/, 6];
                            message = messages_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            incomingMessage = this.messageRepository.create({
                                whatsappMessageId: message.id,
                                from: message.from,
                                messageType: message.type,
                                content: message,
                                status: this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.RECEIVED),
                                receivedAt: new Date(),
                            });
                            return [4 /*yield*/, this.messageRepository.save(incomingMessage)];
                        case 3:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('whatsapp.message.received', incomingMessage);
                            return [3 /*break*/, 5];
                        case 4:
                            error_4 = _a.sent();
                            this.logger.error('Error processing incoming WhatsApp message:', error_4);
                            return [3 /*break*/, 5];
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.handleMessageStatuses = function (statuses) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, statuses_1, status_1, message, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, statuses_1 = statuses;
                            _a.label = 1;
                        case 1:
                            if (!(_i < statuses_1.length)) return [3 /*break*/, 8];
                            status_1 = statuses_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            return [4 /*yield*/, this.messageRepository.findOne({
                                    where: { whatsappMessageId: status_1.id }
                                })];
                        case 3:
                            message = _a.sent();
                            if (!message) return [3 /*break*/, 5];
                            message.status = this.mapWhatsAppStatus(status_1.status);
                            message.deliveredAt = status_1.status === 'delivered' ? new Date() : null;
                            message.readAt = status_1.status === 'read' ? new Date() : null;
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 4:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('whatsapp.message.status_updated', message);
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_5 = _a.sent();
                            this.logger.error('Error processing WhatsApp message status:', error_5);
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.mapWhatsAppStatus = function (status) {
            // Create a mapping from WhatsApp API status to our enum
            var statusMapping = {
                'sent': whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT,
                'delivered': whatsapp_message_status_enum_1.WhatsAppMessageStatus.DELIVERED,
                'read': whatsapp_message_status_enum_1.WhatsAppMessageStatus.READ,
                'failed': whatsapp_message_status_enum_1.WhatsAppMessageStatus.FAILED,
                'pending': whatsapp_message_status_enum_1.WhatsAppMessageStatus.PENDING
            };
            // Get the mapped status or default to UNKNOWN
            var mappedStatus = statusMapping[status.toLowerCase()] || whatsapp_message_status_enum_1.WhatsAppMessageStatus.UNKNOWN;
            // Cast to MessageStatus (assuming they share the same string values)
            return mappedStatus;
        };
        WhatsappService_1.prototype.formatPhoneNumber = function (phone) {
            // Remove any non-numeric characters
            var cleaned = phone.replace(/\D/g, '');
            // Ensure number starts with country code
            if (!cleaned.startsWith('1') && cleaned.length === 10) {
                return "1".concat(cleaned);
            }
            return cleaned;
        };
        WhatsappService_1.prototype.isValidPhoneNumber = function (phone) {
            // Basic validation for E.164 format
            return /^\d{11,15}$/.test(phone);
        };
        WhatsappService_1.prototype.getMessageStatus = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.messageRepository.findOne({
                                    where: { id: messageId }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error("Error getting message status for ".concat(messageId, ":"), error_6);
                            throw error_6;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        WhatsappService_1.prototype.retryFailedMessages = function () {
            return __awaiter(this, void 0, void 0, function () {
                var failedMessages, _i, failedMessages_1, message, response, error_7, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 10, , 11]);
                            return [4 /*yield*/, this.messageRepository.find({
                                    where: {
                                        status: whatsapp_message_status_enum_1.WhatsAppMessageStatus.FAILED,
                                        retryCount: (0, typeorm_1.LessThan)(this.maxRetries)
                                    }
                                })];
                        case 1:
                            failedMessages = _a.sent();
                            _i = 0, failedMessages_1 = failedMessages;
                            _a.label = 2;
                        case 2:
                            if (!(_i < failedMessages_1.length)) return [3 /*break*/, 9];
                            message = failedMessages_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 6, , 8]);
                            return [4 /*yield*/, this.client.post('/messages', message.content)];
                        case 4:
                            response = _a.sent();
                            message.whatsappMessageId = response.data.messages[0].id;
                            message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT);
                            message.sentAt = new Date();
                            message.retryCount += 1;
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 6:
                            error_7 = _a.sent();
                            this.logger.error("Error retrying message ".concat(message.id, ":"), error_7);
                            message.retryCount += 1;
                            message.lastError = error_7.message;
                            if (message.retryCount >= this.maxRetries) {
                                message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.PERMANENTLY_FAILED);
                            }
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 8:
                            _i++;
                            return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            error_8 = _a.sent();
                            this.logger.error('Error retrying failed messages:', error_8);
                            throw error_8;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        return WhatsappService_1;
    }());
    __setFunctionName(_classThis, "WhatsappService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WhatsappService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WhatsappService = _classThis;
}();
exports.WhatsappService = WhatsappService;
//# sourceMappingURL=whatsapp.services.js.map