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
exports.ContactsController = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/controllers/contacts.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var roles_decorator_1 = require("../../../common/decorators/roles.decorator"); // Ensure this path is correct or update it to the correct path
var role_enum_1 = require("../../users/enums/role.enum");
var ContactsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Contacts'), (0, common_1.Controller)('contacts'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _search_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _merge_decorators;
    var _getRelationships_decorators;
    var _addRelationship_decorators;
    var _getMedicalHistory_decorators;
    var _getDocuments_decorators;
    var _addDocument_decorators;
    var _getStatistics_decorators;
    var _importContacts_decorators;
    var _exportContacts_decorators;
    var ContactsController = _classThis = /** @class */ (function () {
        function ContactsController_1(contactsService) {
            this.contactsService = (__runInitializers(this, _instanceExtraInitializers), contactsService);
        }
        ContactsController_1.prototype.create = function (createContactDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.create(__assign(__assign({}, createContactDto), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(), createdBy: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.findAll = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.contactsService.findAll(__assign(__assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.search = function (searchTerm, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    if (!searchTerm || searchTerm.length < 2) {
                        throw new common_1.BadRequestException('Search term must be at least 2 characters long');
                    }
                    return [2 /*return*/, this.contactsService.search(searchTerm, __assign(__assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var contact;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
                                throw new common_1.BadRequestException('Organization ID is required');
                            }
                            return [4 /*yield*/, this.contactsService.findOne(id, req.organization.id)];
                        case 1:
                            contact = _b.sent();
                            if (!contact) {
                                throw new common_1.NotFoundException('Contact not found');
                            }
                            return [2 /*return*/, contact];
                    }
                });
            });
        };
        ContactsController_1.prototype.update = function (id, updateContactDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.update(id, __assign(__assign({}, updateContactDto), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(), updatedBy: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
                                throw new common_1.BadRequestException('Organization ID is required');
                            }
                            return [4 /*yield*/, this.contactsService.remove(id, req.organization.id)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ContactsController_1.prototype.merge = function (primaryId, mergeContactsDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.merge(primaryId, mergeContactsDto.secondaryContactId, {
                            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(),
                            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })(),
                        })];
                });
            });
        };
        ContactsController_1.prototype.getRelationships = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
                        throw new common_1.BadRequestException('Organization ID is required');
                    }
                    return [2 /*return*/, this.contactsService.getRelationships(id, req.organization.id)];
                });
            });
        };
        ContactsController_1.prototype.addRelationship = function (id, relationshipDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.addRelationship(id, relationshipDto, {
                            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(),
                            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })(),
                        })];
                });
            });
        };
        ContactsController_1.prototype.getMedicalHistory = function (id, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.contactsService.getMedicalHistory(id, __assign(__assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })() }))];
                });
            });
        };
        // Comment out or implement getAppointments method in ContactsService
        /*
        @Get(':id/appointments')
        @ApiOperation({ summary: 'Get contact appointments' })
        @ApiResponse({ status: HttpStatus.OK, description: 'Return contact appointments' })
        async getAppointments(
            @Param('id', ParseUUIDPipe) id: string,
            @Query() query: any,
            @Request() req: CustomRequest,
        ) {
            return this.contactsService.getAppointments(id, {
                ...query,
                organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            });
        }
        */
        ContactsController_1.prototype.getDocuments = function (id, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.contactsService.getDocuments(id, __assign(__assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.addDocument = function (id, documentDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.addDocument(id, documentDto, {
                            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(),
                            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })(),
                        })];
                });
            });
        };
        ContactsController_1.prototype.getStatistics = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.contactsService.getStatistics(__assign(__assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })() }))];
                });
            });
        };
        ContactsController_1.prototype.importContacts = function (importDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.importContacts(importDto, {
                            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(),
                            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })(),
                        })];
                });
            });
        };
        ContactsController_1.prototype.exportContacts = function (exportDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    return [2 /*return*/, this.contactsService.exportContacts(exportDto, {
                            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (function () { throw new common_1.BadRequestException('Organization ID is required'); })(),
                            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (function () { throw new common_1.BadRequestException('User ID is required'); })(),
                        })];
                });
            });
        };
        return ContactsController_1;
    }());
    __setFunctionName(_classThis, "ContactsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Create new contact' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Contact created successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/contact.entity").Contact })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all contacts' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all contacts' }), openapi.ApiResponse({ status: 200 })];
        _search_decorators = [(0, common_1.Get)('search'), (0, swagger_1.ApiOperation)({ summary: 'Search contacts' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return matching contacts' }), openapi.ApiResponse({ status: 200 })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get contact by id' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return contact details' }), openapi.ApiResponse({ status: 200, type: require("../entities/contact.entity").Contact })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Update contact' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Contact updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/contact.entity").Contact })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete contact' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Contact deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _merge_decorators = [(0, common_1.Post)(':id/merge'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Merge contacts' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Contacts merged successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/contact.entity").Contact })];
        _getRelationships_decorators = [(0, common_1.Get)(':id/relationships'), (0, swagger_1.ApiOperation)({ summary: 'Get contact relationships' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return contact relationships' }), openapi.ApiResponse({ status: 200, type: [require("../entities/contact-relationship.entity").ContactRelationship] })];
        _addRelationship_decorators = [(0, common_1.Post)(':id/relationships'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Add contact relationship' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Relationship added successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/contact-relationship.entity").ContactRelationship })];
        _getMedicalHistory_decorators = [(0, common_1.Get)(':id/medical-history'), (0, swagger_1.ApiOperation)({ summary: 'Get medical history' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return medical history' }), openapi.ApiResponse({ status: 200, type: [require("../../medical-history/medical-history.entity").MedicalHistory] })];
        _getDocuments_decorators = [(0, common_1.Get)(':id/documents'), (0, swagger_1.ApiOperation)({ summary: 'Get contact documents' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return contact documents' }), openapi.ApiResponse({ status: 200, type: [require("../../documents/entities/document.entity").Document] })];
        _addDocument_decorators = [(0, common_1.Post)(':id/documents'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Add contact document' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Document added successfully' }), openapi.ApiResponse({ status: 201, type: [require("../../documents/entities/document.entity").Document] })];
        _getStatistics_decorators = [(0, common_1.Get)('statistics/summary'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get contacts statistics' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return contacts statistics' }), openapi.ApiResponse({ status: 200, type: Object })];
        _importContacts_decorators = [(0, common_1.Post)('import'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Import contacts' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Contacts imported successfully' }), openapi.ApiResponse({ status: 201 })];
        _exportContacts_decorators = [(0, common_1.Post)('export'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Export contacts' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Contacts exported successfully' }), openapi.ApiResponse({ status: 201 })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _merge_decorators, { kind: "method", name: "merge", static: false, private: false, access: { has: function (obj) { return "merge" in obj; }, get: function (obj) { return obj.merge; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRelationships_decorators, { kind: "method", name: "getRelationships", static: false, private: false, access: { has: function (obj) { return "getRelationships" in obj; }, get: function (obj) { return obj.getRelationships; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addRelationship_decorators, { kind: "method", name: "addRelationship", static: false, private: false, access: { has: function (obj) { return "addRelationship" in obj; }, get: function (obj) { return obj.addRelationship; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMedicalHistory_decorators, { kind: "method", name: "getMedicalHistory", static: false, private: false, access: { has: function (obj) { return "getMedicalHistory" in obj; }, get: function (obj) { return obj.getMedicalHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDocuments_decorators, { kind: "method", name: "getDocuments", static: false, private: false, access: { has: function (obj) { return "getDocuments" in obj; }, get: function (obj) { return obj.getDocuments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addDocument_decorators, { kind: "method", name: "addDocument", static: false, private: false, access: { has: function (obj) { return "addDocument" in obj; }, get: function (obj) { return obj.addDocument; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: function (obj) { return "getStatistics" in obj; }, get: function (obj) { return obj.getStatistics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _importContacts_decorators, { kind: "method", name: "importContacts", static: false, private: false, access: { has: function (obj) { return "importContacts" in obj; }, get: function (obj) { return obj.importContacts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportContacts_decorators, { kind: "method", name: "exportContacts", static: false, private: false, access: { has: function (obj) { return "exportContacts" in obj; }, get: function (obj) { return obj.exportContacts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactsController = _classThis;
}();
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map