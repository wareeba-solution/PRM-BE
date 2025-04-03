"use strict";
// src/modules/sms/services/sms-template.service.ts
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
exports.SmsTemplateService = void 0;
var common_1 = require("@nestjs/common");
var SmsTemplateService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SmsTemplateService = _classThis = /** @class */ (function () {
        function SmsTemplateService_1(smsTemplateRepository) {
            this.smsTemplateRepository = smsTemplateRepository;
            this.logger = new common_1.Logger(SmsTemplateService.name);
        }
        /**
         * Find all SMS templates
         */
        SmsTemplateService_1.prototype.findAll = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    query = this.smsTemplateRepository.createQueryBuilder('template');
                    if (organizationId) {
                        query.where('template.organizationId = :organizationId', { organizationId: organizationId });
                    }
                    return [2 /*return*/, query.orderBy('template.name', 'ASC').getMany()];
                });
            });
        };
        /**
         * Find a template by ID
         */
        SmsTemplateService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var query, template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = this.smsTemplateRepository.createQueryBuilder('template')
                                .where('template.id = :id', { id: id });
                            if (organizationId) {
                                query.andWhere('template.organizationId = :organizationId', { organizationId: organizationId });
                            }
                            return [4 /*yield*/, query.getOne()];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new common_1.NotFoundException("SMS template with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, template];
                    }
                });
            });
        };
        /**
         * Find a template by type and organization
         */
        SmsTemplateService_1.prototype.findByType = function (type, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template, defaultTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.smsTemplateRepository.findOne({
                                where: {
                                    type: type,
                                    organizationId: organizationId,
                                },
                            })];
                        case 1:
                            template = _a.sent();
                            if (!!template) return [3 /*break*/, 3];
                            this.logger.warn("No template found for type ".concat(type, " in organization ").concat(organizationId));
                            return [4 /*yield*/, this.smsTemplateRepository.findOne({
                                    where: {
                                        type: type,
                                        isDefault: true,
                                    },
                                })];
                        case 2:
                            defaultTemplate = _a.sent();
                            if (!defaultTemplate) {
                                throw new common_1.NotFoundException("No template found for type ".concat(type));
                            }
                            return [2 /*return*/, defaultTemplate];
                        case 3: return [2 /*return*/, template];
                    }
                });
            });
        };
        /**
         * Create a new SMS template
         */
        SmsTemplateService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    template = this.smsTemplateRepository.create(data);
                    return [2 /*return*/, this.smsTemplateRepository.save(template)];
                });
            });
        };
        /**
         * Update an existing SMS template
         */
        SmsTemplateService_1.prototype.update = function (id, data, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            Object.assign(template, data);
                            return [2 /*return*/, this.smsTemplateRepository.save(template)];
                    }
                });
            });
        };
        /**
         * Delete an SMS template
         */
        SmsTemplateService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            return [4 /*yield*/, this.smsTemplateRepository.remove(template)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Render a template with variables
         */
        SmsTemplateService_1.prototype.renderTemplate = function (template, variables) {
            var content = template.content;
            // Replace variables in the format {{variableName}}
            for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                content = content.replace(regex, String(value));
            }
            return content;
        };
        return SmsTemplateService_1;
    }());
    __setFunctionName(_classThis, "SmsTemplateService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmsTemplateService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmsTemplateService = _classThis;
}();
exports.SmsTemplateService = SmsTemplateService;
//# sourceMappingURL=sms-template.service.js.map