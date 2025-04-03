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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationInvitationService = void 0;
var common_1 = require("@nestjs/common");
var crypto = require("crypto");
var organization_invitation_entity_1 = require("../entities/organization-invitation.entity");
var OrganizationInvitationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationInvitationService = _classThis = /** @class */ (function () {
        function OrganizationInvitationService_1(organizationRepository, invitationRepository, userRepository, emailService, subscriptionService, eventEmitter) {
            this.organizationRepository = organizationRepository;
            this.invitationRepository = invitationRepository;
            this.userRepository = userRepository;
            this.emailService = emailService;
            this.subscriptionService = subscriptionService;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(OrganizationInvitationService.name);
        }
        OrganizationInvitationService_1.prototype.createInvitation = function (organizationId, email, role, invitedBy) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, _a, allowed, limit, current, existingMember, existingInvitations, invitation, inviter, savedInvitation, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _b.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            return [4 /*yield*/, this.subscriptionService.checkResourceLimit(organizationId, 'users')];
                        case 2:
                            _a = _b.sent(), allowed = _a.allowed, limit = _a.limit, current = _a.current;
                            if (!allowed) {
                                throw new Error("Organization has reached member limit (".concat(current, "/").concat(limit, ")"));
                            }
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: {
                                        email: email,
                                        organizationId: organizationId
                                    }
                                })];
                        case 3:
                            existingMember = _b.sent();
                            if (existingMember) {
                                throw new Error("User ".concat(email, " is already a member of the organization"));
                            }
                            return [4 /*yield*/, this.invitationRepository.createQueryBuilder("invitation")
                                    .where("invitation.organizationId = :organizationId", { organizationId: organizationId })
                                    .andWhere("invitation.email = :email", { email: email })
                                    .andWhere("invitation.status = :status", { status: "PENDING" })
                                    .getMany()];
                        case 4:
                            existingInvitations = _b.sent();
                            if (existingInvitations.length > 0) {
                                throw new Error("Pending invitation already exists for ".concat(email));
                            }
                            invitation = new organization_invitation_entity_1.OrganizationInvitation();
                            invitation.organizationId = organizationId;
                            invitation.email = email;
                            invitation.roles = [role];
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: invitedBy }
                                })];
                        case 5:
                            inviter = _b.sent();
                            if (!inviter) {
                                throw new Error("Inviter ".concat(invitedBy, " not found"));
                            }
                            invitation.invitedBy = inviter;
                            invitation.token = this.generateInvitationToken();
                            invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
                            // Set status as string and cast
                            invitation.status = "PENDING";
                            return [4 /*yield*/, this.invitationRepository.save(invitation)];
                        case 6:
                            savedInvitation = _b.sent();
                            // Send invitation email
                            return [4 /*yield*/, this.sendInvitationEmail(savedInvitation, organization)];
                        case 7:
                            // Send invitation email
                            _b.sent();
                            // Emit event
                            this.eventEmitter.emit('organization.invitation.created', {
                                organizationId: organizationId,
                                email: email,
                                role: role,
                                invitedBy: invitedBy,
                            });
                            return [2 /*return*/, savedInvitation];
                        case 8:
                            error_1 = _b.sent();
                            this.logger.error('Error creating invitation:', error_1);
                            throw error_1;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.acceptInvitation = function (token, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var invitations, invitation, user, organization, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, this.invitationRepository.createQueryBuilder("invitation")
                                    .where("invitation.token = :token", { token: token })
                                    .andWhere("invitation.status = :status", { status: "PENDING" })
                                    .getMany()];
                        case 1:
                            invitations = _a.sent();
                            invitation = invitations.length > 0 ? invitations[0] : null;
                            if (!invitation) {
                                throw new Error('Invalid or expired invitation');
                            }
                            if (new Date() > invitation.expiresAt) {
                                throw new Error('Invitation has expired');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: userId }
                                })];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                throw new Error('User not found');
                            }
                            if (user.email !== invitation.email) {
                                throw new Error('Invitation email does not match user email');
                            }
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: invitation.organizationId }
                                })];
                        case 3:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error('Organization not found');
                            }
                            // Update organization members
                            organization.members = __spreadArray(__spreadArray([], (organization.members || []), true), [
                                {
                                    userId: userId,
                                    role: invitation.roles,
                                    joinedAt: new Date(),
                                }
                            ], false);
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 4:
                            _a.sent();
                            // Update invitation - fetch, modify, save pattern
                            invitation.status = "ACCEPTED";
                            invitation.metadata = __assign(__assign({}, (invitation.metadata || {})), { acceptedAt: new Date() });
                            return [4 /*yield*/, this.invitationRepository.save(invitation)];
                        case 5:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('organization.member.added', {
                                organizationId: organization.id,
                                userId: userId,
                                role: invitation.roles,
                                invitedBy: invitation.invitedBy,
                            });
                            return [3 /*break*/, 7];
                        case 6:
                            error_2 = _a.sent();
                            this.logger.error('Error accepting invitation:', error_2);
                            throw error_2;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.cancelInvitation = function (invitationId, cancelledBy) {
            return __awaiter(this, void 0, void 0, function () {
                var invitations, invitation, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.invitationRepository.createQueryBuilder("invitation")
                                    .where("invitation.id = :id", { id: invitationId })
                                    .andWhere("invitation.status = :status", { status: "PENDING" })
                                    .getMany()];
                        case 1:
                            invitations = _a.sent();
                            invitation = invitations.length > 0 ? invitations[0] : null;
                            if (!invitation) {
                                throw new Error('Invitation not found or already processed');
                            }
                            // Update invitation - fetch, modify, save pattern
                            invitation.status = "CANCELLED";
                            invitation.metadata = __assign(__assign({}, (invitation.metadata || {})), { cancelledAt: new Date(), cancelledBy: cancelledBy });
                            return [4 /*yield*/, this.invitationRepository.save(invitation)];
                        case 2:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('organization.invitation.cancelled', {
                                organizationId: invitation.organizationId,
                                email: invitation.email,
                                cancelledBy: cancelledBy,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error('Error cancelling invitation:', error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.resendInvitation = function (invitationId) {
            return __awaiter(this, void 0, void 0, function () {
                var invitation, organization, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.invitationRepository.findOne({
                                    where: { id: invitationId }
                                })];
                        case 1:
                            invitation = _a.sent();
                            if (!invitation) {
                                throw new Error('Invitation not found');
                            }
                            // Compare with string directly
                            if (String(invitation.status) !== "PENDING") {
                                throw new Error('Can only resend pending invitations');
                            }
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: invitation.organizationId }
                                })];
                        case 2:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error('Organization not found');
                            }
                            // Update - fetch, modify, save pattern
                            invitation.token = this.generateInvitationToken();
                            invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                            invitation.resendCount = (invitation.resendCount || 0) + 1;
                            return [4 /*yield*/, this.invitationRepository.save(invitation)];
                        case 3:
                            _a.sent();
                            // Resend email
                            return [4 /*yield*/, this.sendInvitationEmail(invitation, organization)];
                        case 4:
                            // Resend email
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('organization.invitation.resent', {
                                organizationId: organization.id,
                                email: invitation.email,
                                resendCount: invitation.resendCount,
                            });
                            return [3 /*break*/, 6];
                        case 5:
                            error_4 = _a.sent();
                            this.logger.error('Error resending invitation:', error_4);
                            throw error_4;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.listPendingInvitations = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.invitationRepository.createQueryBuilder("invitation")
                                    .where("invitation.organizationId = :organizationId", { organizationId: organizationId })
                                    .andWhere("invitation.status = :status", { status: "PENDING" })
                                    .orderBy("invitation.createdAt", "DESC")
                                    .getMany()];
                        case 1: 
                        // Use query builder to avoid enum issues
                        return [2 /*return*/, _a.sent()];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error('Error listing pending invitations:', error_5);
                            throw error_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.generateInvitationToken = function () {
            return crypto.randomBytes(32).toString('hex');
        };
        OrganizationInvitationService_1.prototype.sendInvitationEmail = function (invitation, organization) {
            return __awaiter(this, void 0, void 0, function () {
                var inviterName, roleValue, emailData, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            inviterName = 'An organization administrator';
                            if (invitation.invitedBy) {
                                if (typeof invitation.invitedBy === 'object' && invitation.invitedBy.firstName) {
                                    inviterName = "".concat(invitation.invitedBy.firstName, " ").concat(invitation.invitedBy.lastName || '').trim();
                                }
                                else if (typeof invitation.invitedBy === 'string') {
                                    inviterName = invitation.invitedBy;
                                }
                            }
                            roleValue = Array.isArray(invitation.roles)
                                ? invitation.roles.join(', ')
                                : String(invitation.roles || '');
                            emailData = {
                                to: invitation.email,
                                subject: "Invitation to join ".concat(organization.name),
                                template: 'organization-invitation',
                                context: {
                                    organizationName: organization.name,
                                    inviterName: inviterName,
                                    role: roleValue,
                                    acceptUrl: "".concat(process.env.APP_URL, "/invitations/accept?token=").concat(invitation.token),
                                    expiresAt: invitation.expiresAt,
                                }
                            };
                            if (!(typeof this.emailService.sendEmail === 'function')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.emailService.sendEmail(emailData)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.logger.warn('No suitable email service method found. Please implement a proper email sending method.');
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_6 = _a.sent();
                            this.logger.error('Error sending invitation email:', error_6);
                            throw error_6;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationInvitationService_1.prototype.cleanupExpiredInvitations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var expiredInvitations, _i, expiredInvitations_1, invitation, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, this.invitationRepository.createQueryBuilder("invitation")
                                    .where("invitation.status = :status", { status: "PENDING" })
                                    .andWhere("invitation.expiresAt <= :now", { now: new Date() })
                                    .getMany()];
                        case 1:
                            expiredInvitations = _a.sent();
                            _i = 0, expiredInvitations_1 = expiredInvitations;
                            _a.label = 2;
                        case 2:
                            if (!(_i < expiredInvitations_1.length)) return [3 /*break*/, 5];
                            invitation = expiredInvitations_1[_i];
                            // Update using fetch, modify, save pattern
                            invitation.status = "EXPIRED";
                            return [4 /*yield*/, this.invitationRepository.save(invitation)];
                        case 3:
                            _a.sent();
                            this.eventEmitter.emit('organization.invitation.expired', {
                                organizationId: invitation.organizationId,
                                email: invitation.email,
                            });
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_7 = _a.sent();
                            this.logger.error('Error cleaning up expired invitations:', error_7);
                            throw error_7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return OrganizationInvitationService_1;
    }());
    __setFunctionName(_classThis, "OrganizationInvitationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationInvitationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationInvitationService = _classThis;
}();
exports.OrganizationInvitationService = OrganizationInvitationService;
//# sourceMappingURL=organization-invitation.service.js.map