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
exports.DomainVerificationService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var dns = require("dns");
var util_1 = require("util");
var domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
var domain_verification_method_enum_1 = require("../enums/domain-verification-method.enum");
var DomainVerificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DomainVerificationService = _classThis = /** @class */ (function () {
        function DomainVerificationService_1(domainRepository, verificationTokenRepository, configService) {
            this.domainRepository = domainRepository;
            this.verificationTokenRepository = verificationTokenRepository;
            this.configService = configService;
            this.logger = new common_1.Logger(DomainVerificationService.name);
            this.resolveTxt = (0, util_1.promisify)(dns.resolveTxt);
            this.resolveCname = (0, util_1.promisify)(dns.resolveCname);
        }
        DomainVerificationService_1.prototype.initiateDomainVerification = function (domainId, method) {
            return __awaiter(this, void 0, void 0, function () {
                var domain, token, verificationToken, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.domainRepository.findOneByOrFail({ id: domainId })];
                        case 1:
                            domain = _a.sent();
                            return [4 /*yield*/, this.generateVerificationToken(domain, method)];
                        case 2:
                            token = _a.sent();
                            verificationToken = this.verificationTokenRepository.create({
                                domain: domain,
                                token: token,
                                method: method,
                                status: domain_verification_status_enum_1.DomainVerificationStatus.PENDING,
                                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                            });
                            return [4 /*yield*/, this.verificationTokenRepository.save(verificationToken)];
                        case 3:
                            _a.sent();
                            // Update domain status
                            domain.verificationStatus = domain_verification_status_enum_1.DomainVerificationStatus.PENDING;
                            return [4 /*yield*/, this.domainRepository.save(domain)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, verificationToken];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error("Error initiating domain verification: ".concat(error_1.message));
                            throw error_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.verifyDomain = function (domainId) {
            return __awaiter(this, void 0, void 0, function () {
                var domain, activeToken, isVerified, _a, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 12, , 13]);
                            return [4 /*yield*/, this.domainRepository.findOne({
                                    where: { id: domainId },
                                    relations: ['verificationTokens']
                                })];
                        case 1:
                            domain = _b.sent();
                            if (!domain) {
                                throw new common_1.NotFoundException("Domain with ID ".concat(domainId, " not found"));
                            }
                            activeToken = domain.verificationTokens.find(function (token) { return token.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING; });
                            if (!activeToken) {
                                throw new Error('No active verification token found');
                            }
                            isVerified = false;
                            _a = activeToken.method;
                            switch (_a) {
                                case domain_verification_method_enum_1.DomainVerificationMethod.DNS_TXT: return [3 /*break*/, 2];
                                case domain_verification_method_enum_1.DomainVerificationMethod.DNS_CNAME: return [3 /*break*/, 4];
                                case domain_verification_method_enum_1.DomainVerificationMethod.FILE: return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 8];
                        case 2: return [4 /*yield*/, this.verifyDnsTxtRecord(domain.name, activeToken.token)];
                        case 3:
                            isVerified = _b.sent();
                            return [3 /*break*/, 9];
                        case 4: return [4 /*yield*/, this.verifyDnsCnameRecord(domain.name, activeToken.token)];
                        case 5:
                            isVerified = _b.sent();
                            return [3 /*break*/, 9];
                        case 6: return [4 /*yield*/, this.verifyFileRecord(domain.name, activeToken.token)];
                        case 7:
                            isVerified = _b.sent();
                            return [3 /*break*/, 9];
                        case 8: throw new Error("Unsupported verification method: ".concat(activeToken.method));
                        case 9:
                            // Update verification status
                            activeToken.status = isVerified
                                ? domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED
                                : domain_verification_status_enum_1.DomainVerificationStatus.FAILED;
                            activeToken.verifiedAt = isVerified ? new Date() : undefined;
                            return [4 /*yield*/, this.verificationTokenRepository.save(activeToken)];
                        case 10:
                            _b.sent();
                            // Update domain status
                            domain.verificationStatus = isVerified
                                ? domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED
                                : domain_verification_status_enum_1.DomainVerificationStatus.FAILED;
                            domain.verifiedAt = isVerified ? new Date() : undefined;
                            return [4 /*yield*/, this.domainRepository.save(domain)];
                        case 11:
                            _b.sent();
                            return [2 /*return*/, isVerified];
                        case 12:
                            error_2 = _b.sent();
                            this.logger.error("Error verifying domain: ".concat(error_2.message));
                            throw error_2;
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.verifyDnsTxtRecord = function (domain, token) {
            return __awaiter(this, void 0, void 0, function () {
                var records, flatRecords, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.resolveTxt(domain)];
                        case 1:
                            records = _a.sent();
                            flatRecords = records.flat();
                            return [2 /*return*/, flatRecords.some(function (record) { return record.includes(token); })];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Error verifying DNS TXT record: ".concat(error_3.message));
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.verifyDnsCnameRecord = function (domain, token) {
            return __awaiter(this, void 0, void 0, function () {
                var expectedValue_1, records, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            expectedValue_1 = "".concat(token, ".").concat(this.configService.get('VERIFICATION_DOMAIN'));
                            return [4 /*yield*/, this.resolveCname(domain)];
                        case 1:
                            records = _a.sent();
                            return [2 /*return*/, records.some(function (record) { return record === expectedValue_1; })];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Error verifying DNS CNAME record: ".concat(error_4.message));
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.verifyFileRecord = function (domain, token) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationUrl, response, content, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            verificationUrl = "https://".concat(domain, "/.well-known/domain-verification.txt");
                            return [4 /*yield*/, fetch(verificationUrl)];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, response.text()];
                        case 2:
                            content = _a.sent();
                            return [2 /*return*/, content.trim() === token];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error("Error verifying file record: ".concat(error_5.message));
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.generateVerificationToken = function (domain, method) {
            return __awaiter(this, void 0, void 0, function () {
                var prefix, randomString;
                return __generator(this, function (_a) {
                    prefix = method === domain_verification_method_enum_1.DomainVerificationMethod.DNS_TXT ? 'domain-verify' : 'verify';
                    randomString = Math.random().toString(36).substring(2, 15);
                    return [2 /*return*/, "".concat(prefix, "-").concat(domain.id, "-").concat(randomString)];
                });
            });
        };
        DomainVerificationService_1.prototype.cleanupExpiredTokens = function () {
            return __awaiter(this, void 0, void 0, function () {
                var expiredTokens, _i, expiredTokens_1, token, domain, hasActiveTokens, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, this.verificationTokenRepository.find({
                                    where: {
                                        status: domain_verification_status_enum_1.DomainVerificationStatus.PENDING,
                                        expiresAt: (0, typeorm_1.LessThan)(new Date())
                                    }
                                })];
                        case 1:
                            expiredTokens = _a.sent();
                            _i = 0, expiredTokens_1 = expiredTokens;
                            _a.label = 2;
                        case 2:
                            if (!(_i < expiredTokens_1.length)) return [3 /*break*/, 7];
                            token = expiredTokens_1[_i];
                            token.status = domain_verification_status_enum_1.DomainVerificationStatus.EXPIRED;
                            return [4 /*yield*/, this.verificationTokenRepository.save(token)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.domainRepository.findOne({
                                    where: { id: token.domainId },
                                    relations: ['verificationTokens']
                                })];
                        case 4:
                            domain = _a.sent();
                            if (!domain) return [3 /*break*/, 6];
                            hasActiveTokens = domain.verificationTokens.some(function (t) { return t.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING; });
                            if (!!hasActiveTokens) return [3 /*break*/, 6];
                            domain.verificationStatus = domain_verification_status_enum_1.DomainVerificationStatus.EXPIRED;
                            return [4 /*yield*/, this.domainRepository.save(domain)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            error_6 = _a.sent();
                            this.logger.error("Error cleaning up expired tokens: ".concat(error_6.message));
                            throw error_6;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        DomainVerificationService_1.prototype.getDomainVerificationStatus = function (domainId) {
            return __awaiter(this, void 0, void 0, function () {
                var domain, activeToken, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.domainRepository.findOne({
                                    where: { id: domainId },
                                    relations: ['verificationTokens']
                                })];
                        case 1:
                            domain = _a.sent();
                            if (!domain) {
                                throw new common_1.NotFoundException("Domain with ID ".concat(domainId, " not found"));
                            }
                            activeToken = domain.verificationTokens.find(function (token) { return token.status === domain_verification_status_enum_1.DomainVerificationStatus.PENDING; });
                            return [2 /*return*/, {
                                    status: domain.verificationStatus,
                                    method: activeToken === null || activeToken === void 0 ? void 0 : activeToken.method,
                                    token: activeToken === null || activeToken === void 0 ? void 0 : activeToken.token,
                                    expiresAt: activeToken === null || activeToken === void 0 ? void 0 : activeToken.expiresAt,
                                    verifiedAt: domain.verifiedAt
                                }];
                        case 2:
                            error_7 = _a.sent();
                            this.logger.error("Error getting domain verification status: ".concat(error_7.message));
                            throw error_7;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return DomainVerificationService_1;
    }());
    __setFunctionName(_classThis, "DomainVerificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomainVerificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomainVerificationService = _classThis;
}();
exports.DomainVerificationService = DomainVerificationService;
//# sourceMappingURL=domain-verification.service.js.map