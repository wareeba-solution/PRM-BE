"use strict";
// src/modules/whatsapp/services/whatsapp-template.service.ts
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
exports.WhatsappTemplateService = exports.WhatsappTemplateButtonType = exports.WhatsappTemplateHeaderType = exports.WhatsappTemplateComponentType = exports.WhatsappTemplateCategory = exports.WhatsappTemplateStatus = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var common_2 = require("@nestjs/common");
var whatsapp_template_enums_1 = require("../enums/whatsapp-template.enums");
// Re-export enums for backward compatibility
var whatsapp_template_enums_2 = require("../enums/whatsapp-template.enums");
Object.defineProperty(exports, "WhatsappTemplateStatus", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateStatus; } });
Object.defineProperty(exports, "WhatsappTemplateCategory", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateCategory; } });
Object.defineProperty(exports, "WhatsappTemplateComponentType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateComponentType; } });
Object.defineProperty(exports, "WhatsappTemplateHeaderType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateHeaderType; } });
Object.defineProperty(exports, "WhatsappTemplateButtonType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateButtonType; } });
var WhatsappTemplateService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WhatsappTemplateService = _classThis = /** @class */ (function () {
        function WhatsappTemplateService_1(whatsappTemplateRepository, configService) {
            this.whatsappTemplateRepository = whatsappTemplateRepository;
            this.configService = configService;
            this.logger = new common_2.Logger(WhatsappTemplateService.name);
        }
        /**
         * Find a template by ID
         */
        WhatsappTemplateService_1.prototype.findById = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.whatsappTemplateRepository.findOne({
                                where: { id: id, organizationId: organizationId }
                            })];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new common_1.NotFoundException("WhatsApp template with ID \"".concat(id, "\" not found"));
                            }
                            return [2 /*return*/, template];
                    }
                });
            });
        };
        /**
         * Find a template by name
         */
        WhatsappTemplateService_1.prototype.findByName = function (name, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.whatsappTemplateRepository.findOne({
                            where: { name: name, organizationId: organizationId, status: whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE }
                        })];
                });
            });
        };
        /**
         * Get all templates for an organization
         */
        WhatsappTemplateService_1.prototype.findAll = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, status, category, language, search, _a, page, _b, limit, where, _c, items, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            organizationId = options.organizationId, status = options.status, category = options.category, language = options.language, search = options.search, _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.limit, limit = _b === void 0 ? 25 : _b;
                            where = { organizationId: organizationId };
                            if (status) {
                                where.status = Array.isArray(status) ? (0, typeorm_1.In)(status) : status;
                            }
                            if (category) {
                                where.category = Array.isArray(category) ? (0, typeorm_1.In)(category) : category;
                            }
                            if (language) {
                                where.language = language;
                            }
                            if (search) {
                                where.name = (0, typeorm_1.Like)("%".concat(search, "%"));
                            }
                            return [4 /*yield*/, this.whatsappTemplateRepository.findAndCount({
                                    where: where,
                                    order: { updatedAt: 'DESC' },
                                    skip: (page - 1) * limit,
                                    take: limit,
                                })];
                        case 1:
                            _c = _d.sent(), items = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    items: items,
                                    total: total,
                                    page: page,
                                    limit: limit,
                                }];
                    }
                });
            });
        };
        /**
         * Create a new WhatsApp template
         */
        WhatsappTemplateService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingTemplate, template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate template structure
                            this.validateTemplate(data);
                            return [4 /*yield*/, this.whatsappTemplateRepository.findOne({
                                    where: {
                                        name: data.name,
                                        organizationId: data.organizationId,
                                        language: data.language
                                    }
                                })];
                        case 1:
                            existingTemplate = _a.sent();
                            if (existingTemplate) {
                                throw new common_1.BadRequestException("Template with name \"".concat(data.name, "\" and language \"").concat(data.language, "\" already exists"));
                            }
                            template = this.whatsappTemplateRepository.create(__assign(__assign({}, data), { status: data.status || whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT }));
                            return [2 /*return*/, this.whatsappTemplateRepository.save(template)];
                    }
                });
            });
        };
        /**
         * Update an existing WhatsApp template
         */
        WhatsappTemplateService_1.prototype.update = function (id, organizationId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var template, existingTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            // Check if template is in a state that allows updates
                            if (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL) {
                                throw new common_1.BadRequestException('Cannot update a template that is pending approval');
                            }
                            if (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED && data.components) {
                                throw new common_1.BadRequestException('Cannot update components of an approved template. Create a new version instead.');
                            }
                            if (!(data.name && data.name !== template.name)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.whatsappTemplateRepository.findOne({
                                    where: {
                                        name: data.name,
                                        organizationId: organizationId,
                                        language: data.language || template.language,
                                        id: (0, typeorm_1.Not)(id)
                                    }
                                })];
                        case 2:
                            existingTemplate = _a.sent();
                            if (existingTemplate) {
                                throw new common_1.BadRequestException("Template with name \"".concat(data.name, "\" and language \"").concat(data.language || template.language, "\" already exists"));
                            }
                            _a.label = 3;
                        case 3:
                            // Validate template if components are being updated
                            if (data.components) {
                                this.validateTemplate(__assign(__assign({}, template), data));
                            }
                            // Update template
                            Object.assign(template, data);
                            // Set status to draft if content was changed and template was rejected
                            if (data.components &&
                                (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.REJECTED)) {
                                template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT;
                                template.rejectionReason = undefined;
                            }
                            return [2 /*return*/, this.whatsappTemplateRepository.save(template)];
                    }
                });
            });
        };
        /**
         * Submit template for approval
         */
        WhatsappTemplateService_1.prototype.submitForApproval = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template, updatedTemplate;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            if (template.status !== whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT) {
                                throw new common_1.BadRequestException("Only templates in DRAFT status can be submitted for approval");
                            }
                            // Validate template before submitting
                            this.validateTemplate(template);
                            // Update status
                            template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL;
                            template.submittedAt = new Date();
                            return [4 /*yield*/, this.whatsappTemplateRepository.save(template)];
                        case 2:
                            updatedTemplate = _a.sent();
                            // Here you would typically call the WhatsApp API to submit the template
                            this.submitTemplateToWhatsAppAPI(updatedTemplate).catch(function (error) {
                                _this.logger.error("Failed to submit template to WhatsApp API: ".concat(error.message), error.stack);
                            });
                            return [2 /*return*/, updatedTemplate];
                    }
                });
            });
        };
        /**
         * Delete/archive a WhatsApp template
         */
        WhatsappTemplateService_1.prototype.delete = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            if (!(template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE)) return [3 /*break*/, 3];
                            template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.INACTIVE;
                            return [4 /*yield*/, this.whatsappTemplateRepository.save(template)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.whatsappTemplateRepository.softRemove(template)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            // If the template is approved/active on the WhatsApp API, you would call the API to delete it
                            if ([whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED, whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE].includes(template.status)) {
                                this.deleteTemplateFromWhatsAppAPI(template).catch(function (error) {
                                    _this.logger.error("Failed to delete template from WhatsApp API: ".concat(error.message), error.stack);
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get available languages for templates
         */
        WhatsappTemplateService_1.prototype.getAvailableLanguages = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, [
                            { code: 'en', name: 'English' },
                            { code: 'es', name: 'Spanish' },
                            { code: 'pt_BR', name: 'Portuguese (Brazil)' },
                            { code: 'fr', name: 'French' },
                            { code: 'de', name: 'German' },
                            { code: 'it', name: 'Italian' },
                            { code: 'ar', name: 'Arabic' },
                            { code: 'hi', name: 'Hindi' },
                            { code: 'id', name: 'Indonesian' },
                            { code: 'ru', name: 'Russian' },
                            { code: 'zh_CN', name: 'Chinese (Simplified)' },
                            { code: 'ja', name: 'Japanese' },
                            { code: 'ko', name: 'Korean' },
                        ]];
                });
            });
        };
        /**
         * Process variable placeholders in template text
         */
        WhatsappTemplateService_1.prototype.processTemplateText = function (text, variables) {
            if (variables === void 0) { variables = {}; }
            if (!text)
                return '';
            // Replace {{variable}} placeholders
            var processed = text;
            for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                processed = processed.replace(regex, String(value !== null && value !== void 0 ? value : ''));
            }
            return processed;
        };
        /**
         * Validate template structure
         */
        WhatsappTemplateService_1.prototype.validateTemplate = function (template) {
            if (!template.components || !Array.isArray(template.components) || template.components.length === 0) {
                throw new common_1.BadRequestException('Template must have at least one component');
            }
            // Check for required body component
            var bodyComponent = template.components.find(function (c) {
                return c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY;
            });
            if (!bodyComponent) {
                throw new common_1.BadRequestException('Template must have a body component');
            }
            if (!bodyComponent.text) {
                throw new common_1.BadRequestException('Body component must have text');
            }
            // Check header component if present
            var headerComponent = template.components.find(function (c) {
                return c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER;
            });
            if (headerComponent) {
                if (!headerComponent.format) {
                    throw new common_1.BadRequestException('Header component must specify a format');
                }
                if (headerComponent.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT && !headerComponent.text) {
                    throw new common_1.BadRequestException('Text header must have text content');
                }
            }
            // Check buttons if present
            var buttonsComponent = template.components.find(function (c) {
                return c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BUTTONS;
            });
            if (buttonsComponent && buttonsComponent.buttons) {
                if (buttonsComponent.buttons.length > 3) {
                    throw new common_1.BadRequestException('Template can have a maximum of 3 buttons');
                }
                // Validate each button
                for (var _i = 0, _a = buttonsComponent.buttons; _i < _a.length; _i++) {
                    var button = _a[_i];
                    if (!button.type) {
                        throw new common_1.BadRequestException('Each button must have a type');
                    }
                    if (!button.text) {
                        throw new common_1.BadRequestException('Each button must have text');
                    }
                    if (button.type === whatsapp_template_enums_1.WhatsappTemplateButtonType.URL && !button.url) {
                        throw new common_1.BadRequestException('URL button must have a URL');
                    }
                    if (button.type === whatsapp_template_enums_1.WhatsappTemplateButtonType.PHONE_NUMBER && !button.phoneNumber) {
                        throw new common_1.BadRequestException('Phone number button must have a phone number');
                    }
                }
            }
        };
        /**
         * Submit template to WhatsApp API (Meta/Facebook)
         * This is a placeholder for the actual API call
         */
        WhatsappTemplateService_1.prototype.submitTemplateToWhatsAppAPI = function (template) {
            return __awaiter(this, void 0, void 0, function () {
                var apiKey, accountId;
                return __generator(this, function (_a) {
                    apiKey = this.configService.get('WHATSAPP_API_KEY');
                    accountId = this.configService.get('WHATSAPP_ACCOUNT_ID');
                    // This is just a placeholder - you would replace with actual API call
                    this.logger.log("[Mock] Submitting template ".concat(template.name, " to WhatsApp API"));
                    // Mock API response
                    return [2 /*return*/, {
                            id: "".concat(Date.now()),
                            status: 'PENDING',
                            category: template.category
                        }];
                });
            });
        };
        /**
         * Delete template from WhatsApp API (Meta/Facebook)
         * This is a placeholder for the actual API call
         */
        WhatsappTemplateService_1.prototype.deleteTemplateFromWhatsAppAPI = function (template) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // This would be implemented based on the specific WhatsApp Business API you're using
                    this.logger.log("[Mock] Deleting template ".concat(template.name, " from WhatsApp API"));
                    // Mock API response
                    return [2 /*return*/, {
                            success: true
                        }];
                });
            });
        };
        /**
         * Sync templates from WhatsApp API
         * This would be used to sync the status of pending templates
         */
        WhatsappTemplateService_1.prototype.syncTemplatesFromWhatsAppAPI = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var pendingTemplates, _i, pendingTemplates_1, template, mockApiResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.whatsappTemplateRepository.find({
                                where: {
                                    organizationId: organizationId,
                                    status: whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL
                                }
                            })];
                        case 1:
                            pendingTemplates = _a.sent();
                            _i = 0, pendingTemplates_1 = pendingTemplates;
                            _a.label = 2;
                        case 2:
                            if (!(_i < pendingTemplates_1.length)) return [3 /*break*/, 5];
                            template = pendingTemplates_1[_i];
                            mockApiResponse = {
                                status: Math.random() > 0.3 ? 'APPROVED' : 'REJECTED',
                                reason: 'This is a simulated response'
                            };
                            if (mockApiResponse.status === 'APPROVED') {
                                template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED;
                                template.approvedAt = new Date();
                            }
                            else {
                                template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.REJECTED;
                                template.rejectionReason = mockApiResponse.reason;
                            }
                            return [4 /*yield*/, this.whatsappTemplateRepository.save(template)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return WhatsappTemplateService_1;
    }());
    __setFunctionName(_classThis, "WhatsappTemplateService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WhatsappTemplateService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WhatsappTemplateService = _classThis;
}();
exports.WhatsappTemplateService = WhatsappTemplateService;
//# sourceMappingURL=whatsapp-template.service.js.map