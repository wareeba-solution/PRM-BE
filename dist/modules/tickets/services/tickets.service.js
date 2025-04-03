"use strict";
// src/modules/tickets/services/tickets.service.ts
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
exports.TicketsService = void 0;
var common_1 = require("@nestjs/common");
var ticket_comment_entity_1 = require("../entities/ticket-comment.entity");
var ticket_attachment_entity_1 = require("../entities/ticket-attachment.entity");
var ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
var create_ticket_dto_1 = require("../dto/create-ticket.dto");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var TicketsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TicketsService = _classThis = /** @class */ (function () {
        function TicketsService_1(ticketRepository, commentRepository, attachmentRepository, activityRepository, dataSource, userRepository, eventEmitter, notificationsService) {
            this.ticketRepository = ticketRepository;
            this.commentRepository = commentRepository;
            this.attachmentRepository = attachmentRepository;
            this.activityRepository = activityRepository;
            this.dataSource = dataSource;
            this.userRepository = userRepository;
            this.eventEmitter = eventEmitter;
            this.notificationsService = notificationsService;
        }
        TicketsService_1.prototype.getRelatedTickets = function (ticketId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to get related tickets
                    return [2 /*return*/, []];
                });
            });
        };
        TicketsService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            ticket = _a.sent();
                            // Make sure TicketStatus.DELETED exists in your enum
                            ticket.status = create_ticket_dto_1.TicketStatus.DELETED;
                            ticket.deletedAt = new Date();
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TicketsService_1.prototype.reopenTicket = function (id, reopenDetails) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, reopenedByUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository.findOne({ where: { id: id, organizationId: reopenDetails.organizationId } })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new common_1.NotFoundException('Ticket not found');
                            }
                            ticket.status = create_ticket_dto_1.TicketStatus.REOPENED;
                            ticket.reopenReason = reopenDetails.reason;
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: reopenDetails.reopenedBy } })];
                        case 2:
                            reopenedByUser = _a.sent();
                            if (!reopenedByUser) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            ticket.reopenedBy = reopenedByUser;
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, createdByUser, ticket, _i, _a, attachmentData, attachment, activity, error_1;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _d.sent();
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 14, 16, 18]);
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: data.createdBy } })];
                        case 4:
                            createdByUser = _d.sent();
                            if (!createdByUser) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            ticket = this.ticketRepository.create(__assign(__assign({}, data), { status: create_ticket_dto_1.TicketStatus.OPEN, createdBy: createdByUser, attachments: (_b = data.attachments) === null || _b === void 0 ? void 0 : _b.map(function (attachmentData) {
                                    var attachment = new ticket_attachment_entity_1.TicketAttachment();
                                    Object.assign(attachment, attachmentData);
                                    attachment.organizationId = data.organizationId;
                                    attachment.uploadedById = data.createdBy;
                                    return attachment;
                                }) }));
                            return [4 /*yield*/, queryRunner.manager.save(ticket)];
                        case 5:
                            _d.sent();
                            if (!((_c = data.attachments) === null || _c === void 0 ? void 0 : _c.length)) return [3 /*break*/, 9];
                            _i = 0, _a = data.attachments;
                            _d.label = 6;
                        case 6:
                            if (!(_i < _a.length)) return [3 /*break*/, 9];
                            attachmentData = _a[_i];
                            attachment = new ticket_attachment_entity_1.TicketAttachment();
                            // Copy properties from attachment data (filename, fileType, etc.)
                            Object.assign(attachment, attachmentData);
                            // Set the relationships explicitly
                            attachment.ticketId = ticket.id;
                            attachment.organizationId = data.organizationId;
                            attachment.uploadedById = data.createdBy;
                            return [4 /*yield*/, queryRunner.manager.save(attachment)];
                        case 7:
                            _d.sent();
                            _d.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 6];
                        case 9:
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.createdBy;
                            activity.action = 'CREATED';
                            activity.details = { status: ticket.status };
                            return [4 /*yield*/, queryRunner.manager.save(activity)];
                        case 10:
                            _d.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 11:
                            _d.sent();
                            if (!ticket.assigneeId) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_ASSIGNED',
                                    title: 'New Ticket Assigned',
                                    content: "Ticket #".concat(ticket.referenceNumber, " has been assigned to you: ").concat(ticket.title),
                                    recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                                    organizationId: data.organizationId,
                                    senderId: data.createdBy,
                                })];
                        case 12:
                            _d.sent();
                            _d.label = 13;
                        case 13:
                            this.eventEmitter.emit('ticket.created', ticket);
                            return [2 /*return*/, ticket];
                        case 14:
                            error_1 = _d.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 15:
                            _d.sent();
                            throw error_1;
                        case 16: return [4 /*yield*/, queryRunner.release()];
                        case 17:
                            _d.sent();
                            return [7 /*endfinally*/];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        };
        TicketsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, status, priority, type, assigneeId, contactId, departmentId, search, startDate, endDate, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, status = query.status, priority = query.priority, type = query.type, assigneeId = query.assigneeId, contactId = query.contactId, departmentId = query.departmentId, search = query.search, startDate = query.startDate, endDate = query.endDate, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.ticketRepository
                        .createQueryBuilder('ticket')
                        .where('ticket.organizationId = :organizationId', { organizationId: organizationId })
                        .leftJoinAndSelect('ticket.assignee', 'assignee')
                        .leftJoinAndSelect('ticket.contact', 'contact')
                        .leftJoinAndSelect('ticket.department', 'department');
                    if (status) {
                        queryBuilder.andWhere('ticket.status = :status', { status: status });
                    }
                    if (priority) {
                        queryBuilder.andWhere('ticket.priority = :priority', { priority: priority });
                    }
                    if (type) {
                        queryBuilder.andWhere('ticket.type = :type', { type: type });
                    }
                    if (assigneeId) {
                        queryBuilder.andWhere('ticket.assigneeId = :assigneeId', { assigneeId: assigneeId });
                    }
                    if (contactId) {
                        queryBuilder.andWhere('ticket.contactId = :contactId', { contactId: contactId });
                    }
                    if (departmentId) {
                        queryBuilder.andWhere('ticket.departmentId = :departmentId', { departmentId: departmentId });
                    }
                    if (search) {
                        queryBuilder.andWhere('(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)', { search: "%".concat(search, "%") });
                    }
                    if (startDate) {
                        queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate: startDate });
                    }
                    if (endDate) {
                        queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate: endDate });
                    }
                    queryBuilder.orderBy('ticket.createdAt', 'DESC');
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        TicketsService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder('ticket')
                                .where('ticket.id = :id', { id: id })
                                .andWhere('ticket.organizationId = :organizationId', { organizationId: organizationId })
                                .leftJoinAndSelect('ticket.assignee', 'assignee')
                                .leftJoinAndSelect('ticket.contact', 'contact')
                                .leftJoinAndSelect('ticket.department', 'department')
                                .leftJoinAndSelect('ticket.comments', 'comments')
                                .leftJoinAndSelect('ticket.attachments', 'attachments')
                                .leftJoinAndSelect('ticket.activities', 'activities')
                                .getOne()];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new common_1.NotFoundException('Ticket not found');
                            }
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsService_1.prototype.update = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, ticket, oldStatus, activity, error_2;
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
                            _a.trys.push([3, 10, 12, 14]);
                            return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 4:
                            ticket = _a.sent();
                            oldStatus = ticket.status;
                            // Update ticket fields
                            Object.assign(ticket, data);
                            return [4 /*yield*/, queryRunner.manager.save(ticket)];
                        case 5:
                            _a.sent();
                            if (!(data.status && data.status !== oldStatus)) return [3 /*break*/, 8];
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.updatedBy;
                            activity.action = 'STATUS_CHANGED';
                            activity.details = {
                                oldStatus: oldStatus,
                                newStatus: data.status,
                                note: data.statusNote,
                            };
                            return [4 /*yield*/, queryRunner.manager.save(activity)];
                        case 6:
                            _a.sent();
                            if (!ticket.assigneeId) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_STATUS_CHANGED',
                                    title: 'Ticket Status Updated',
                                    content: "Ticket #".concat(ticket.referenceNumber, " status changed to ").concat(data.status),
                                    recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                                    organizationId: data.organizationId,
                                    senderId: data.updatedBy,
                                })];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, ticket];
                        case 10:
                            error_2 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _a.sent();
                            throw error_2;
                        case 12: return [4 /*yield*/, queryRunner.release()];
                        case 13:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        TicketsService_1.prototype.assignTicket = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, oldAssigneeId, activity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            ticket = _a.sent();
                            oldAssigneeId = ticket.assigneeId;
                            ticket.assigneeId = data.assigneeId;
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 2:
                            _a.sent();
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.assignedBy;
                            activity.action = 'ASSIGNED';
                            activity.details = {
                                oldAssigneeId: oldAssigneeId,
                                newAssigneeId: data.assigneeId,
                                note: data.note,
                            };
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 3:
                            _a.sent();
                            // Send notification to new assignee
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_ASSIGNED',
                                    title: 'Ticket Assigned',
                                    content: "Ticket #".concat(ticket.referenceNumber, " has been assigned to you"),
                                    recipients: [{ userId: data.assigneeId }],
                                    organizationId: data.organizationId,
                                    senderId: data.assignedBy,
                                })];
                        case 4:
                            // Send notification to new assignee
                            _a.sent();
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsService_1.prototype.addComment = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, comment, activity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            ticket = _a.sent();
                            comment = new ticket_comment_entity_1.TicketComment();
                            // Copy properties from data (content, isInternal, etc.)
                            Object.assign(comment, data);
                            comment.ticketId = ticket.id;
                            comment.organizationId = data.organizationId;
                            comment.userId = data.userId;
                            return [4 /*yield*/, this.commentRepository.save(comment)];
                        case 2:
                            _a.sent();
                            // Update ticket's last activity
                            ticket.lastActivityAt = new Date();
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 3:
                            _a.sent();
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.userId;
                            activity.action = 'COMMENTED';
                            activity.details = { commentId: comment.id };
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 4:
                            _a.sent();
                            if (!(data.isInternal && ticket.assigneeId !== data.userId)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_INTERNAL_NOTE',
                                    title: 'New Internal Note',
                                    content: "New internal note added to ticket #".concat(ticket.referenceNumber),
                                    recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                                    organizationId: data.organizationId,
                                    senderId: data.userId,
                                })];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, comment];
                    }
                });
            });
        };
        TicketsService_1.prototype.escalateTicket = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, activity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            ticket = _a.sent();
                            ticket.status = create_ticket_dto_1.TicketStatus.ESCALATED;
                            ticket.escalatedAt = new Date();
                            ticket.escalatedById = data.escalatedBy;
                            ticket.escalationReason = data.reason;
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 2:
                            _a.sent();
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.escalatedBy;
                            activity.action = 'ESCALATED';
                            activity.details = { reason: data.reason };
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 3:
                            _a.sent();
                            // Notify administrators
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_ESCALATED',
                                    title: 'Ticket Escalated',
                                    content: "Ticket #".concat(ticket.referenceNumber, " has been escalated: ").concat(data.reason),
                                    priority: 'HIGH',
                                    recipients: [{ userId: 'ADMIN_USER_ID' }],
                                    organizationId: data.organizationId,
                                    senderId: data.escalatedBy,
                                })];
                        case 4:
                            // Notify administrators
                            _a.sent();
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsService_1.prototype.resolveTicket = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, activity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            ticket = _a.sent();
                            ticket.status = create_ticket_dto_1.TicketStatus.RESOLVED;
                            ticket.resolvedAt = new Date();
                            ticket.resolvedById = data.resolvedBy;
                            ticket.resolution = data.resolution;
                            return [4 /*yield*/, this.ticketRepository.save(ticket)];
                        case 2:
                            _a.sent();
                            activity = new ticket_activity_entity_1.TicketActivity();
                            activity.ticketId = ticket.id;
                            activity.organizationId = data.organizationId;
                            activity.userId = data.resolvedBy;
                            activity.action = 'RESOLVED';
                            activity.details = { resolution: data.resolution };
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 3:
                            _a.sent();
                            if (!(ticket.createdById !== data.resolvedBy)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'TICKET_RESOLVED',
                                    title: 'Ticket Resolved',
                                    content: "Your ticket #".concat(ticket.referenceNumber, " has been resolved"),
                                    recipients: [{ userId: ticket.createdById }],
                                    organizationId: data.organizationId,
                                    senderId: data.resolvedBy,
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsService_1.prototype.getAssignedTickets = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, userId, status, priority, type, contactId, departmentId, search, startDate, endDate, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, userId = query.userId, status = query.status, priority = query.priority, type = query.type, contactId = query.contactId, departmentId = query.departmentId, search = query.search, startDate = query.startDate, endDate = query.endDate, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.ticketRepository
                        .createQueryBuilder('ticket')
                        .where('ticket.organizationId = :organizationId', { organizationId: organizationId })
                        .andWhere('ticket.assigneeId = :assigneeId', { assigneeId: userId })
                        .leftJoinAndSelect('ticket.contact', 'contact')
                        .leftJoinAndSelect('ticket.department', 'department');
                    if (status) {
                        queryBuilder.andWhere('ticket.status = :status', { status: status });
                    }
                    if (priority) {
                        queryBuilder.andWhere('ticket.priority = :priority', { priority: priority });
                    }
                    if (type) {
                        queryBuilder.andWhere('ticket.type = :type', { type: type });
                    }
                    if (contactId) {
                        queryBuilder.andWhere('ticket.contactId = :contactId', { contactId: contactId });
                    }
                    if (departmentId) {
                        queryBuilder.andWhere('ticket.departmentId = :departmentId', { departmentId: departmentId });
                    }
                    if (search) {
                        queryBuilder.andWhere('(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)', { search: "%".concat(search, "%") });
                    }
                    if (startDate) {
                        queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate: startDate });
                    }
                    if (endDate) {
                        queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate: endDate });
                    }
                    queryBuilder.orderBy('ticket.createdAt', 'DESC');
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        TicketsService_1.prototype.getTimeline = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var activities;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.activityRepository
                                .createQueryBuilder('activity')
                                .where('activity.ticketId = :ticketId', { ticketId: id })
                                .andWhere('activity.organizationId = :organizationId', { organizationId: organizationId })
                                .leftJoinAndSelect('activity.user', 'user')
                                .orderBy('activity.createdAt', 'DESC')
                                .getMany()];
                        case 1:
                            activities = _a.sent();
                            return [2 /*return*/, activities];
                    }
                });
            });
        };
        TicketsService_1.prototype.getDashboard = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var stats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder('ticket')
                                .where('ticket.organizationId = :organizationId', { organizationId: organizationId })
                                .select([
                                'COUNT(*) as total',
                                'COUNT(CASE WHEN status = :open THEN 1 END) as open',
                                'COUNT(CASE WHEN status = :inProgress THEN 1 END) as inProgress',
                                'COUNT(CASE WHEN status = :escalated THEN 1 END) as escalated',
                                'COUNT(CASE WHEN priority = :urgent THEN 1 END) as urgent',
                            ])
                                .setParameter('open', create_ticket_dto_1.TicketStatus.OPEN)
                                .setParameter('inProgress', create_ticket_dto_1.TicketStatus.IN_PROGRESS)
                                .setParameter('escalated', create_ticket_dto_1.TicketStatus.ESCALATED)
                                .setParameter('urgent', 'URGENT')
                                .getRawOne()];
                        case 1:
                            stats = _a.sent();
                            return [2 /*return*/, stats];
                    }
                });
            });
        };
        return TicketsService_1;
    }());
    __setFunctionName(_classThis, "TicketsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketsService = _classThis;
}();
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map