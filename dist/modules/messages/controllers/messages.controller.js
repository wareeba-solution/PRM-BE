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
exports.MessagesController = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/controllers/messages.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var roles_decorator_1 = require("../../auth/decorators/roles.decorator");
var role_enum_1 = require("../../users/enums/role.enum");
var MessagesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Messages'), (0, common_1.Controller)('messages'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getConversations_decorators;
    var _getConversation_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _createTemplate_decorators;
    var _getTemplates_decorators;
    var _sendBulk_decorators;
    var _getStatistics_decorators;
    var _resend_decorators;
    var _markAsRead_decorators;
    var MessagesController = _classThis = /** @class */ (function () {
        function MessagesController_1(messagesService) {
            this.messagesService = (__runInitializers(this, _instanceExtraInitializers), messagesService);
        }
        MessagesController_1.prototype.create = function (createMessageDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Added null checks with throw
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    return [2 /*return*/, this.messagesService.create(__assign(__assign({}, createMessageDto), { organizationId: req.organization.id, senderId: req.user.id }))];
                });
            });
        };
        MessagesController_1.prototype.findAll = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    return [2 /*return*/, this.messagesService.findAll(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        MessagesController_1.prototype.getConversations = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    return [2 /*return*/, this.messagesService.getConversations(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        MessagesController_1.prototype.getConversation = function (contactId, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    return [2 /*return*/, this.messagesService.getConversation(contactId, __assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        MessagesController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization)
                                throw new common_1.BadRequestException('Organization information not available');
                            return [4 /*yield*/, this.messagesService.findOne(id, req.organization.id)];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException('Message not found');
                            }
                            return [2 /*return*/, message];
                    }
                });
            });
        };
        MessagesController_1.prototype.update = function (id, updateMessageDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    return [2 /*return*/, this.messagesService.update(id, __assign(__assign({}, updateMessageDto), { organizationId: req.organization.id, updatedBy: req.user.id }))];
                });
            });
        };
        MessagesController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization)
                                throw new common_1.BadRequestException('Organization information not available');
                            return [4 /*yield*/, this.messagesService.remove(id, req.organization.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MessagesController_1.prototype.createTemplate = function (templateDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    return [2 /*return*/, this.messagesService.createTemplate(__assign(__assign({}, templateDto), { organizationId: req.organization.id, createdBy: req.user.id }))];
                });
            });
        };
        MessagesController_1.prototype.getTemplates = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    return [2 /*return*/, this.messagesService.getTemplates(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        MessagesController_1.prototype.sendBulk = function (bulkMessageDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    if (!bulkMessageDto.contactIds || bulkMessageDto.contactIds.length === 0) {
                        throw new common_1.BadRequestException('Contact IDs are required for bulk messaging');
                    }
                    return [2 /*return*/, this.messagesService.sendBulk(__assign(__assign({}, bulkMessageDto), { organizationId: req.organization.id, senderId: req.user.id }))];
                });
            });
        };
        MessagesController_1.prototype.getStatistics = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    return [2 /*return*/, this.messagesService.getStatistics(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        MessagesController_1.prototype.resend = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    return [2 /*return*/, this.messagesService.resend(id, {
                            organizationId: req.organization.id,
                            userId: req.user.id,
                        })];
                });
            });
        };
        MessagesController_1.prototype.markAsRead = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization)
                        throw new common_1.BadRequestException('Organization information not available');
                    if (!req.user)
                        throw new common_1.BadRequestException('User information not available');
                    return [2 /*return*/, this.messagesService.markAsRead(id, {
                            organizationId: req.organization.id,
                            userId: req.user.id,
                        })];
                });
            });
        };
        return MessagesController_1;
    }());
    __setFunctionName(_classThis, "MessagesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Create new message' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Message sent successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all messages' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all messages' }), openapi.ApiResponse({ status: 200 })];
        _getConversations_decorators = [(0, common_1.Get)('conversations'), (0, swagger_1.ApiOperation)({ summary: 'Get all conversations' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all conversations' }), openapi.ApiResponse({ status: 200 })];
        _getConversation_decorators = [(0, common_1.Get)('conversations/:contactId'), (0, swagger_1.ApiOperation)({ summary: 'Get conversation with contact' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return conversation messages' }), openapi.ApiResponse({ status: 200 })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get message by id' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return message details' }), openapi.ApiResponse({ status: 200, type: require("../entities/message.entity").Message })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Update message' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/message.entity").Message })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete message' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Message deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _createTemplate_decorators = [(0, common_1.Post)('templates'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Create message template' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Template created successfully' }), openapi.ApiResponse({ status: 201, type: Object })];
        _getTemplates_decorators = [(0, common_1.Get)('templates'), (0, swagger_1.ApiOperation)({ summary: 'Get message templates' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return message templates' }), openapi.ApiResponse({ status: 200, type: [require("../entities/message-template.entity").MessageTemplate] })];
        _sendBulk_decorators = [(0, common_1.Post)('bulk'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Send bulk messages' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Bulk messages queued successfully' }), openapi.ApiResponse({ status: 201 })];
        _getStatistics_decorators = [(0, common_1.Get)('statistics'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get messaging statistics' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return messaging statistics' }), openapi.ApiResponse({ status: 200, type: Object })];
        _resend_decorators = [(0, common_1.Post)(':id/resend'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Resend failed message' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message resent successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message })];
        _markAsRead_decorators = [(0, common_1.Post)(':id/mark-read'), (0, swagger_1.ApiOperation)({ summary: 'Mark message as read' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message marked as read' }), openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversations_decorators, { kind: "method", name: "getConversations", static: false, private: false, access: { has: function (obj) { return "getConversations" in obj; }, get: function (obj) { return obj.getConversations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversation_decorators, { kind: "method", name: "getConversation", static: false, private: false, access: { has: function (obj) { return "getConversation" in obj; }, get: function (obj) { return obj.getConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createTemplate_decorators, { kind: "method", name: "createTemplate", static: false, private: false, access: { has: function (obj) { return "createTemplate" in obj; }, get: function (obj) { return obj.createTemplate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTemplates_decorators, { kind: "method", name: "getTemplates", static: false, private: false, access: { has: function (obj) { return "getTemplates" in obj; }, get: function (obj) { return obj.getTemplates; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendBulk_decorators, { kind: "method", name: "sendBulk", static: false, private: false, access: { has: function (obj) { return "sendBulk" in obj; }, get: function (obj) { return obj.sendBulk; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: function (obj) { return "getStatistics" in obj; }, get: function (obj) { return obj.getStatistics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resend_decorators, { kind: "method", name: "resend", static: false, private: false, access: { has: function (obj) { return "resend" in obj; }, get: function (obj) { return obj.resend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAsRead_decorators, { kind: "method", name: "markAsRead", static: false, private: false, access: { has: function (obj) { return "markAsRead" in obj; }, get: function (obj) { return obj.markAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagesController = _classThis;
}();
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map