"use strict";
// src/modules/messages/services/messages.service.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var message_entity_1 = require("../entities/message.entity");
var message_attachment_entity_1 = require("../entities/message-attachment.entity");
var create_message_dto_1 = require("../dto/create-message.dto");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var MessagesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MessagesService = _classThis = /** @class */ (function () {
        function MessagesService_1(messageRepository, templateRepository, attachmentRepository, contactRepository, userRepository, dataSource, eventEmitter) {
            this.messageRepository = messageRepository;
            this.templateRepository = templateRepository;
            this.attachmentRepository = attachmentRepository;
            this.contactRepository = contactRepository;
            this.userRepository = userRepository;
            this.dataSource = dataSource;
            this.eventEmitter = eventEmitter;
        }
        /**
         * Helper method to convert an entity to a Promise
         */
        MessagesService_1.prototype.asPromiseEntity = function (entity) {
            return Promise.resolve(entity);
        };
        /**
         * Execute a database operation within a transaction
         */
        MessagesService_1.prototype.withTransaction = function (callback) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 6, 8, 10]);
                            return [4 /*yield*/, callback(queryRunner)];
                        case 4:
                            result = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 6:
                            error_1 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 7:
                            _a.sent();
                            throw error_1;
                        case 8: return [4 /*yield*/, queryRunner.release()];
                        case 9:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Validate and fetch a contact
         */
        MessagesService_1.prototype.getValidContact = function (contactId, organizationId, messageType) {
            return __awaiter(this, void 0, void 0, function () {
                var contact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactRepository.findOne({
                                where: { id: contactId, organizationId: organizationId },
                            })];
                        case 1:
                            contact = _a.sent();
                            if (!contact) {
                                throw new common_1.NotFoundException("Contact with ID ".concat(contactId, " not found"));
                            }
                            // Validate contact info for specific message types
                            if (messageType === create_message_dto_1.MessageType.EMAIL && !contact.email) {
                                throw new common_1.BadRequestException('Contact has no email address');
                            }
                            if (messageType === create_message_dto_1.MessageType.SMS && !contact.phoneNumber) {
                                throw new common_1.BadRequestException('Contact has no phone number');
                            }
                            return [2 /*return*/, contact];
                    }
                });
            });
        };
        /**
         * Get a user by ID
         */
        MessagesService_1.prototype.getUser = function (userId, errorContext) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId }
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("".concat(errorContext, " with ID ").concat(userId, " not found"));
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * Prepare email options
         */
        MessagesService_1.prototype.prepareEmailOptions = function (data) {
            var _a, _b, _c, _d, _e;
            if (data.type !== create_message_dto_1.MessageType.EMAIL) {
                return undefined;
            }
            return {
                subject: ((_a = data.emailOptions) === null || _a === void 0 ? void 0 : _a.subject) || 'No Subject',
                cc: (_b = data.emailOptions) === null || _b === void 0 ? void 0 : _b.cc,
                bcc: (_c = data.emailOptions) === null || _c === void 0 ? void 0 : _c.bcc,
                trackOpens: (_d = data.emailOptions) === null || _d === void 0 ? void 0 : _d.trackOpens,
                trackClicks: (_e = data.emailOptions) === null || _e === void 0 ? void 0 : _e.trackClicks
            };
        };
        /**
         * Apply template content if template ID is provided
         */
        MessagesService_1.prototype.applyTemplate = function (message, templateId, organizationId, contact) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!templateId)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: { id: templateId, organizationId: organizationId },
                                })];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new common_1.NotFoundException("Template with ID ".concat(templateId, " not found"));
                            }
                            message.content = this.processTemplate(template.content, contact);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create message attachments
         */
        MessagesService_1.prototype.createAttachmentEntities = function (attachments, message) {
            var _this = this;
            if (!attachments || attachments.length === 0) {
                return [];
            }
            return attachments.map(function (attachment) {
                return _this.attachmentRepository.create({
                    fileName: attachment.fileName,
                    fileSize: attachment.fileSize ? Number(attachment.fileSize) : 0,
                    mimeType: attachment.fileType,
                    filePath: attachment.fileUrl,
                    publicUrl: attachment.fileUrl,
                    isUploaded: true,
                    message: message,
                    messageId: message.id
                });
            });
        };
        /**
         * Create a new message
         */
        MessagesService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.withTransaction(function (queryRunner) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, contact, sender, messageData, message, attachmentEntities;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, Promise.all([
                                            this.getValidContact(data.contactId, data.organizationId, data.type),
                                            this.getUser(data.senderId, 'Sender')
                                        ])];
                                    case 1:
                                        _a = _b.sent(), contact = _a[0], sender = _a[1];
                                        messageData = {
                                            content: data.content,
                                            type: data.type,
                                            scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                                            metadata: data.metadata,
                                            organizationId: data.organizationId,
                                            contactId: contact.id, // Use foreign key instead of contact object
                                            senderId: sender.id, // Use foreign key instead of sender object
                                            status: data.scheduledFor ? create_message_dto_1.MessageStatus.SCHEDULED : create_message_dto_1.MessageStatus.QUEUED,
                                            priority: data.priority,
                                            requireConfirmation: data.requireConfirmation || false,
                                            notes: data.notes,
                                            externalId: data.externalId,
                                            templateId: data.templateId,
                                            emailOptions: this.prepareEmailOptions(data)
                                        };
                                        message = this.messageRepository.create(messageData);
                                        return [4 /*yield*/, this.applyTemplate(message, data.templateId, data.organizationId, contact)];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, queryRunner.manager.save(message)];
                                    case 3:
                                        _b.sent();
                                        attachmentEntities = this.createAttachmentEntities(data.attachments, message);
                                        if (!(attachmentEntities.length > 0)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, queryRunner.manager.save(message_attachment_entity_1.MessageAttachment, attachmentEntities)];
                                    case 4:
                                        _b.sent();
                                        _b.label = 5;
                                    case 5:
                                        // Emit event for immediate sending if not scheduled
                                        if (!data.scheduledFor) {
                                            this.eventEmitter.emit('message.created', message);
                                        }
                                        return [2 /*return*/, message];
                                }
                            });
                        }); })];
                });
            });
        };
        /**
         * Find all messages with pagination and filtering
         */
        MessagesService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, type, status, startDate, endDate, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, type = query.type, status = query.status, startDate = query.startDate, endDate = query.endDate, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.messageRepository
                        .createQueryBuilder('message')
                        .where('message.organizationId = :organizationId', { organizationId: organizationId })
                        .leftJoinAndSelect('message.contact', 'contact')
                        .leftJoinAndSelect('message.sender', 'sender')
                        .leftJoinAndSelect('message.attachments', 'attachments');
                    if (type) {
                        queryBuilder.andWhere('message.type = :type', { type: type });
                    }
                    if (status) {
                        queryBuilder.andWhere('message.status = :status', { status: status });
                    }
                    if (startDate) {
                        queryBuilder.andWhere('message.createdAt >= :startDate', { startDate: startDate });
                    }
                    if (endDate) {
                        queryBuilder.andWhere('message.createdAt <= :endDate', { endDate: endDate });
                    }
                    queryBuilder.orderBy('message.createdAt', 'DESC');
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        /**
         * Get conversations grouped by contact
         */
        MessagesService_1.prototype.getConversations = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.messageRepository
                        .createQueryBuilder('message')
                        .select('DISTINCT ON (message.contactId) message.*')
                        .where('message.organizationId = :organizationId', { organizationId: organizationId })
                        .orderBy('message.contactId')
                        .addOrderBy('message.createdAt', 'DESC');
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        /**
         * Get a single conversation with a contact
         */
        MessagesService_1.prototype.getConversation = function (contactId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                    queryBuilder = this.messageRepository
                        .createQueryBuilder('message')
                        .where('message.organizationId = :organizationId', { organizationId: organizationId })
                        .andWhere('message.contactId = :contactId', { contactId: contactId })
                        .leftJoinAndSelect('message.attachments', 'attachments')
                        .orderBy('message.createdAt', 'DESC');
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        /**
         * Find a single message by ID
         */
        MessagesService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.findOne({
                                where: { id: id, organizationId: organizationId },
                                relations: ['contact', 'sender', 'attachments'],
                            })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException("Message with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, message];
                    }
                });
            });
        };
        /**
         * Update a message
         */
        MessagesService_1.prototype.update = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, message, user, emailOptions;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.findOne(id, data.organizationId),
                                this.getUser(data.updatedBy, 'User')
                            ])];
                        case 1:
                            _a = _b.sent(), message = _a[0], user = _a[1];
                            if (message.status === create_message_dto_1.MessageStatus.SENT || message.status === create_message_dto_1.MessageStatus.DELIVERED) {
                                throw new common_1.BadRequestException('Cannot update sent or delivered messages');
                            }
                            // Apply updates selectively
                            if (data.subject && message.type === create_message_dto_1.MessageType.EMAIL) {
                                emailOptions = message.emailOptions || { subject: 'No Subject' };
                                emailOptions.subject = data.subject;
                                message.emailOptions = emailOptions;
                            }
                            if (data.content)
                                message.content = data.content;
                            if (data.status)
                                message.status = data.status;
                            if (data.scheduledFor)
                                message.scheduledFor = new Date(data.scheduledFor);
                            if (data.metadata)
                                message.metadata = data.metadata;
                            if (data.notes)
                                message.notes = data.notes;
                            message.updatedById = data.updatedBy;
                            return [2 /*return*/, this.messageRepository.save(message)];
                    }
                });
            });
        };
        /**
         * Remove a message (soft delete)
         */
        MessagesService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            message = _a.sent();
                            return [4 /*yield*/, this.messageRepository.softRemove(message)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create a message template
         */
        MessagesService_1.prototype.createTemplate = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var user, category, restData, templateData, templateEntity, template, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getUser(data.createdBy, 'User')];
                        case 1:
                            user = _a.sent();
                            category = data.category, restData = __rest(data, ["category"]);
                            templateData = {
                                name: data.name,
                                description: data.description,
                                type: data.type, // Force type casting for enum
                                subject: data.subject || '',
                                content: data.content,
                                parameters: data.variables || {},
                                isDefault: data.isDefault || false,
                                isActive: true,
                                organizationId: data.organizationId,
                                createdById: data.createdBy,
                                metadata: {}
                            };
                            templateEntity = this.templateRepository.create(templateData);
                            template = Array.isArray(templateEntity) ? templateEntity[0] : templateEntity;
                            // Handle category if provided
                            if (category) {
                                if (typeof category === 'string') {
                                    // If it's a string, set it as reference entity
                                    template.category = { id: category };
                                }
                                else if (category && typeof category === 'object') {
                                    // If it's an object, use it directly
                                    template.category = category;
                                }
                            }
                            return [4 /*yield*/, this.templateRepository.save(template)];
                        case 2:
                            result = _a.sent();
                            // Return the first item if it's an array, otherwise return the result directly
                            return [2 /*return*/, Array.isArray(result) ? result[0] : result];
                    }
                });
            });
        };
        /**
         * Get all templates for an organization
         */
        MessagesService_1.prototype.getTemplates = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.templateRepository.find({
                            where: { organizationId: query.organizationId },
                            order: { name: 'ASC' },
                        })];
                });
            });
        };
        MessagesService_1.prototype.sendBulk = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // Use transaction to ensure data consistency
                    return [2 /*return*/, this.withTransaction(function (queryRunner) { return __awaiter(_this, void 0, void 0, function () {
                            var contacts, sender, messagesData, messages, savedMessages, allAttachments_1, _loop_1, _i, savedMessages_1, message;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.contactRepository.find({
                                            where: { id: (0, typeorm_1.In)(data.contactIds), organizationId: data.organizationId },
                                        })];
                                    case 1:
                                        contacts = _a.sent();
                                        if (contacts.length !== data.contactIds.length) {
                                            throw new common_1.BadRequestException('Some contacts were not found');
                                        }
                                        // Ensure data.messageData exists
                                        if (!data.messageData) {
                                            throw new common_1.BadRequestException('Message data is required');
                                        }
                                        return [4 /*yield*/, this.getUser(data.senderId, 'Sender')];
                                    case 2:
                                        sender = _a.sent();
                                        messagesData = contacts.map(function (contact) {
                                            return {
                                                content: data.content || '',
                                                subject: data.subject,
                                                type: data.type,
                                                scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                                                organizationId: data.organizationId,
                                                contactId: contact.id,
                                                senderId: data.senderId,
                                                status: data.scheduledFor ? create_message_dto_1.MessageStatus.SCHEDULED : create_message_dto_1.MessageStatus.QUEUED,
                                                templateId: data.templateId
                                            };
                                        });
                                        messages = this.messageRepository.create(messagesData);
                                        return [4 /*yield*/, queryRunner.manager.save(message_entity_1.Message, messages)];
                                    case 3:
                                        savedMessages = _a.sent();
                                        if (!(data.attachments && data.attachments.length > 0)) return [3 /*break*/, 5];
                                        allAttachments_1 = [];
                                        _loop_1 = function (message) {
                                            data.attachments.forEach(function (attachment) {
                                                var newAttachment = _this.attachmentRepository.create({
                                                    fileName: attachment.filename,
                                                    fileSize: 0, // Default value as it's required
                                                    mimeType: attachment.contentType,
                                                    filePath: attachment.content,
                                                    publicUrl: attachment.content,
                                                    isUploaded: true,
                                                    message: message,
                                                    messageId: message.id
                                                });
                                                allAttachments_1.push(newAttachment);
                                            });
                                        };
                                        for (_i = 0, savedMessages_1 = savedMessages; _i < savedMessages_1.length; _i++) {
                                            message = savedMessages_1[_i];
                                            _loop_1(message);
                                        }
                                        if (!(allAttachments_1.length > 0)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, queryRunner.manager.save(message_attachment_entity_1.MessageAttachment, allAttachments_1)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        // Emit event for processing
                                        this.eventEmitter.emit('messages.bulk.created', savedMessages);
                                        return [2 /*return*/, {
                                                success: true,
                                                count: savedMessages.length,
                                                messageIds: savedMessages.map(function (m) { return m.id; }),
                                            }];
                                }
                            });
                        }); })];
                });
            });
        };
        /**
         * Get message statistics for an organization
         */
        MessagesService_1.prototype.getStatistics = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, startDate, endDate, queryBuilder, stats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            organizationId = query.organizationId, startDate = query.startDate, endDate = query.endDate;
                            queryBuilder = this.messageRepository
                                .createQueryBuilder('message')
                                .where('message.organizationId = :organizationId', { organizationId: organizationId });
                            if (startDate) {
                                queryBuilder.andWhere('message.createdAt >= :startDate', { startDate: startDate });
                            }
                            if (endDate) {
                                queryBuilder.andWhere('message.createdAt <= :endDate', { endDate: endDate });
                            }
                            return [4 /*yield*/, queryBuilder
                                    .select([
                                    'COUNT(*) as total',
                                    'COUNT(CASE WHEN status = :sent THEN 1 END) as sent',
                                    'COUNT(CASE WHEN status = :delivered THEN 1 END) as delivered',
                                    'COUNT(CASE WHEN status = :failed THEN 1 END) as failed',
                                    'COUNT(CASE WHEN readAt IS NOT NULL THEN 1 END) as read',
                                ])
                                    .setParameter('sent', create_message_dto_1.MessageStatus.SENT)
                                    .setParameter('delivered', create_message_dto_1.MessageStatus.DELIVERED)
                                    .setParameter('failed', create_message_dto_1.MessageStatus.FAILED)
                                    .getRawOne()];
                        case 1:
                            stats = _a.sent();
                            return [2 /*return*/, stats];
                    }
                });
            });
        };
        /**
         * Resend a failed message
         */
        MessagesService_1.prototype.resend = function (id, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, message, user, deliveryDetails, savedMessage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.findOne(id, context.organizationId),
                                this.getUser(context.userId, 'User')
                            ])];
                        case 1:
                            _a = _b.sent(), message = _a[0], user = _a[1];
                            if (message.status !== create_message_dto_1.MessageStatus.FAILED) {
                                throw new common_1.BadRequestException('Only failed messages can be resent');
                            }
                            deliveryDetails = message.deliveryDetails || {};
                            message.deliveryDetails = __assign({ provider: '', attempts: 0, lastAttempt: undefined, errorCode: undefined, errorMessage: undefined }, (message.deliveryDetails || {}));
                            message.status = create_message_dto_1.MessageStatus.QUEUED;
                            // Fix: Wrap user in Promise
                            message.updatedBy = this.asPromiseEntity(user);
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 2:
                            savedMessage = _b.sent();
                            // Emit event for processing
                            this.eventEmitter.emit('message.resend', savedMessage);
                            return [2 /*return*/, savedMessage];
                    }
                });
            });
        };
        /**
         * Mark a message as read
         */
        MessagesService_1.prototype.markAsRead = function (id, context) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, context.organizationId)];
                        case 1:
                            message = _a.sent();
                            if (!!message.readAt) return [3 /*break*/, 3];
                            message.readAt = new Date();
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, message];
                    }
                });
            });
        };
        /**
         * Process a message template
         */
        MessagesService_1.prototype.processTemplate = function (template, contact) {
            // Replace template variables with contact data
            return template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
                // Use type-safe property access
                var value = contact[key];
                return value !== undefined && value !== null ? String(value) : match;
            });
        };
        return MessagesService_1;
    }());
    __setFunctionName(_classThis, "MessagesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagesService = _classThis;
}();
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map