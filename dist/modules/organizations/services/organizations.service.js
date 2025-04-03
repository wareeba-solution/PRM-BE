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
exports.OrganizationsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var role_enum_1 = require("../../users/enums/role.enum");
var organization_entity_1 = require("../entities/organization.entity");
var slug_util_1 = require("../../../utils/slug.util");
var OrganizationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationsService = _classThis = /** @class */ (function () {
        function OrganizationsService_1(organizationRepository, userRepository, auditLogRepository, domainVerificationService, emailService, storageService) {
            this.organizationRepository = organizationRepository;
            this.userRepository = userRepository;
            this.auditLogRepository = auditLogRepository;
            this.domainVerificationService = domainVerificationService;
            this.emailService = emailService;
            this.storageService = storageService;
        }
        OrganizationsService_1.prototype.getMemberContext = function (organizationId, id) {
            throw new Error('Method not implemented.');
        };
        OrganizationsService_1.prototype.findById = function (organizationId) {
            throw new Error('Method not implemented.');
        };
        OrganizationsService_1.prototype.create = function (createOrganizationDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingOrg, slug, organizationData, organization, result, savedOrg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.organizationRepository.findOne({
                                where: { name: createOrganizationDto.name }
                            })];
                        case 1:
                            existingOrg = _a.sent();
                            if (existingOrg) {
                                throw new common_1.ConflictException('Organization with this name already exists');
                            }
                            return [4 /*yield*/, this.generateUniqueSlug(createOrganizationDto.name)];
                        case 2:
                            slug = _a.sent();
                            organizationData = {
                                name: createOrganizationDto.name,
                                description: createOrganizationDto.description,
                                slug: slug,
                                type: createOrganizationDto.type,
                                status: organization_entity_1.OrganizationStatus.PENDING,
                                subscriptionTier: organization_entity_1.SubscriptionTier.FREE,
                                settings: this.getDefaultSettings(),
                                createdById: createOrganizationDto.createdById,
                            };
                            organization = this.organizationRepository.create(organizationData);
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 3:
                            result = _a.sent();
                            savedOrg = Array.isArray(result) ? result[0] : result;
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: savedOrg.id,
                                    action: 'CREATE_ORGANIZATION',
                                    metadata: { userId: createOrganizationDto.createdById, organizationId: savedOrg.id }
                                })];
                        case 4:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/, savedOrg];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder, page, limit, skip, sortBy, sortOrder, _a, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            queryBuilder = this.organizationRepository.createQueryBuilder('organization');
                            // Apply filters
                            if (query.search) {
                                queryBuilder.andWhere('(organization.name ILIKE :search OR organization.domain ILIKE :search)', { search: "%".concat(query.search, "%") });
                            }
                            if (query.status) {
                                queryBuilder.andWhere('organization.status = :status', { status: query.status });
                            }
                            if (query.subscriptionTier) {
                                queryBuilder.andWhere('organization.subscriptionTier = :tier', { tier: query.subscriptionTier });
                            }
                            // Add relations
                            queryBuilder.leftJoinAndSelect('organization.users', 'users');
                            page = query.page || 1;
                            limit = query.limit || 10;
                            skip = (page - 1) * limit;
                            queryBuilder.skip(skip).take(limit);
                            sortBy = query.sortBy || 'createdAt';
                            sortOrder = query.sortOrder || 'DESC';
                            queryBuilder.orderBy("organization.".concat(sortBy), sortOrder);
                            return [4 /*yield*/, queryBuilder.getManyAndCount()];
                        case 1:
                            _a = _b.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var organization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.organizationRepository.findOne({
                                where: { id: id },
                                relations: ['users']
                            })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new common_1.NotFoundException('Organization not found');
                            }
                            return [2 /*return*/, organization];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.update = function (id, updateOrganizationDto) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, updatedOrg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            // If domain is being updated, verify it
                            if (updateOrganizationDto.domain && updateOrganizationDto.domain !== organization.domain) {
                                organization.isDomainVerified = false;
                            }
                            // Update organization
                            Object.assign(organization, updateOrganizationDto);
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            updatedOrg = _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'UPDATE_ORGANIZATION',
                                    metadata: {
                                        userId: updateOrganizationDto.updatedBy,
                                        organizationId: id,
                                        changes: updateOrganizationDto
                                    }
                                })];
                        case 3:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/, updatedOrg];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var organization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            // Soft delete organization
                            return [4 /*yield*/, this.organizationRepository.softDelete(id)];
                        case 2:
                            // Soft delete organization
                            _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'DELETE_ORGANIZATION',
                                    metadata: { organizationId: id }
                                })];
                        case 3:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.addUser = function (id, addUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, userCount, user, savedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            return [4 /*yield*/, this.userRepository.count({ where: { organizationId: id } })];
                        case 2:
                            userCount = _a.sent();
                            if (userCount >= organization.maxUsers) {
                                throw new common_1.BadRequestException('Organization user limit reached');
                            }
                            user = this.userRepository.create(__assign(__assign({}, addUserDto), { organizationId: id, requirePasswordChange: true }));
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 3:
                            savedUser = _a.sent();
                            // Send welcome email
                            return [4 /*yield*/, this.sendWelcomeEmail(savedUser.email, {
                                    organizationName: organization.name,
                                    temporaryPassword: addUserDto.password
                                })];
                        case 4:
                            // Send welcome email
                            _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'ADD_USER',
                                    metadata: { userId: savedUser.id }
                                })];
                        case 5:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/, savedUser];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.removeUser = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId, organizationId: id }
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found in organization');
                            }
                            // Soft delete user
                            return [4 /*yield*/, this.userRepository.softDelete(userId)];
                        case 2:
                            // Soft delete user
                            _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'REMOVE_USER',
                                    metadata: { userId: userId }
                                })];
                        case 3:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.getAdminCount = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.count({
                            where: {
                                organizationId: organizationId,
                                role: role_enum_1.Role.ADMIN,
                                deletedAt: (0, typeorm_1.IsNull)()
                            }
                        })];
                });
            });
        };
        OrganizationsService_1.prototype.updateSubscription = function (id, updateSubscriptionDto) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, updatedOrg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            // Update subscription details
                            Object.assign(organization, {
                                subscriptionTier: updateSubscriptionDto.tier,
                                subscriptionStartDate: updateSubscriptionDto.startDate,
                                subscriptionEndDate: updateSubscriptionDto.endDate,
                                maxUsers: updateSubscriptionDto.maxUsers,
                                maxStorage: updateSubscriptionDto.maxStorage,
                                isSubscriptionActive: true
                            });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            updatedOrg = _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'UPDATE_SUBSCRIPTION',
                                    metadata: { changes: updateSubscriptionDto }
                                })];
                        case 3:
                            // Create audit log
                            _a.sent();
                            return [2 /*return*/, updatedOrg];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.getStatistics = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, totalUsers, activeUsers, storageUsed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            return [4 /*yield*/, this.userRepository.count({
                                    where: { organizationId: id }
                                })];
                        case 2:
                            totalUsers = _a.sent();
                            return [4 /*yield*/, this.userRepository.count({
                                    where: { organizationId: id, isActive: true }
                                })];
                        case 3:
                            activeUsers = _a.sent();
                            return [4 /*yield*/, this.getStorageUsage(id)];
                        case 4:
                            storageUsed = _a.sent();
                            return [2 /*return*/, {
                                    totalUsers: totalUsers,
                                    activeUsers: activeUsers,
                                    storageUsed: storageUsed,
                                    storageLimit: organization.maxStorage,
                                    subscriptionStatus: organization.isSubscriptionActive,
                                    subscriptionTier: organization.subscriptionTier
                                }];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.verifyDomain = function (id, domain) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, isVerified;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            return [4 /*yield*/, this.verifyDomainOwnership(domain)];
                        case 2:
                            isVerified = _a.sent();
                            if (!isVerified) return [3 /*break*/, 5];
                            // Update organization domain status
                            organization.domain = domain;
                            organization.isDomainVerified = true;
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 3:
                            _a.sent();
                            // Create audit log
                            return [4 /*yield*/, this.createAuditLog({
                                    organizationId: id,
                                    action: 'VERIFY_DOMAIN',
                                    metadata: { domain: domain }
                                })];
                        case 4:
                            // Create audit log
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/, isVerified];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.getAuditLogs = function (id, query) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder, page, limit, skip, _a, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            queryBuilder = this.auditLogRepository.createQueryBuilder('audit_log')
                                .where('audit_log.organizationId = :id', { id: id });
                            // Apply filters
                            if (query.action) {
                                queryBuilder.andWhere('audit_log.action = :action', { action: query.action });
                            }
                            if (query.userId) {
                                queryBuilder.andWhere('audit_log.metadata->\'userId\' = :userId', { userId: query.userId });
                            }
                            if (query.startDate && query.endDate) {
                                queryBuilder.andWhere('audit_log.createdAt BETWEEN :startDate AND :endDate', {
                                    startDate: query.startDate,
                                    endDate: query.endDate
                                });
                            }
                            page = query.page || 1;
                            limit = query.limit || 10;
                            skip = (page - 1) * limit;
                            queryBuilder.skip(skip).take(limit);
                            // Add sorting
                            queryBuilder.orderBy('audit_log.createdAt', 'DESC');
                            return [4 /*yield*/, queryBuilder.getManyAndCount()];
                        case 1:
                            _a = _b.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.generateUniqueSlug = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var slug, counter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            slug = (0, slug_util_1.generateSlug)(name);
                            counter = 1;
                            _a.label = 1;
                        case 1: return [4 /*yield*/, this.organizationRepository.findOne({ where: { slug: slug } })];
                        case 2:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            slug = (0, slug_util_1.generateSlug)(name) + '-' + counter;
                            counter++;
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/, slug];
                    }
                });
            });
        };
        OrganizationsService_1.prototype.getDefaultSettings = function () {
            return {
                ticketPriorities: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
                ticketCategories: ['GENERAL', 'TECHNICAL', 'BILLING', 'OTHER'],
                customFields: [],
                notificationSettings: {
                    emailEnabled: true,
                    smsEnabled: false,
                    inAppEnabled: true
                },
                brandingSettings: {
                    primaryColor: '#007bff',
                    logoUrl: null,
                    favIconUrl: null
                }
            };
        };
        OrganizationsService_1.prototype.createAuditLog = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var auditLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            auditLog = this.auditLogRepository.create(data);
                            return [4 /*yield*/, this.auditLogRepository.save(auditLog)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Custom methods to replace non-existent service methods
        OrganizationsService_1.prototype.sendWelcomeEmail = function (email, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation of welcome email sending
                    console.log("Sending welcome email to ".concat(email, " for organization ").concat(data.organizationName));
                    return [2 /*return*/];
                });
            });
        };
        OrganizationsService_1.prototype.getStorageUsage = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation of storage usage calculation
                    console.log("Getting storage usage for organization ".concat(organizationId));
                    // You can implement your own storage calculation logic here or call the correct method
                    // from your StorageService if it exists with different parameters
                    // For example:
                    // return await this.storageService.calculateUsage(organizationId);
                    return [2 /*return*/, 0]; // Return default value for now
                });
            });
        };
        OrganizationsService_1.prototype.verifyDomainOwnership = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation of domain verification
                    console.log("Verifying domain ownership for ".concat(domain));
                    // You can implement your own domain verification logic here or call the correct method
                    // from your DomainVerificationService if it exists with different parameters
                    // For example:
                    // return await this.domainVerificationService.verifyOwnership(domain);
                    return [2 /*return*/, true]; // Return default value for now
                });
            });
        };
        return OrganizationsService_1;
    }());
    __setFunctionName(_classThis, "OrganizationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationsService = _classThis;
}();
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map