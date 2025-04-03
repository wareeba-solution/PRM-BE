"use strict";
// src/modules/email/services/email-template.service.ts
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
exports.EmailTemplateService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var email_template_entity_1 = require("../entities/email-template.entity");
var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");
var EmailTemplateService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailTemplateService = _classThis = /** @class */ (function () {
        function EmailTemplateService_1(emailTemplateRepository) {
            this.emailTemplateRepository = emailTemplateRepository;
            // Set the default path for template files
            this.defaultTemplatePath = path.join(process.cwd(), 'src/templates/email');
            // Register Handlebars helpers
            this.registerHandlebarsHelpers();
        }
        /**
         * Find a template by ID
         */
        EmailTemplateService_1.prototype.findById = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.emailTemplateRepository.findOne({
                                where: { id: id, organizationId: organizationId }
                            })];
                        case 1:
                            template = _a.sent();
                            if (!template) {
                                throw new common_1.NotFoundException("Email template with ID \"".concat(id, "\" not found"));
                            }
                            return [2 /*return*/, template];
                    }
                });
            });
        };
        /**
         * Find a template by name
         */
        EmailTemplateService_1.prototype.findByName = function (name, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.emailTemplateRepository.findOne({
                            where: { name: name, organizationId: organizationId, status: email_template_entity_1.EmailTemplateStatus.ACTIVE }
                        })];
                });
            });
        };
        /**
         * Get all templates for an organization
         */
        EmailTemplateService_1.prototype.findAll = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, status, type, category, search, _a, page, _b, limit, where, _c, items, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            organizationId = options.organizationId, status = options.status, type = options.type, category = options.category, search = options.search, _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.limit, limit = _b === void 0 ? 25 : _b;
                            where = { organizationId: organizationId };
                            if (status) {
                                where.status = Array.isArray(status) ? (0, typeorm_1.In)(status) : status;
                            }
                            if (type) {
                                where.type = type;
                            }
                            if (category) {
                                where.category = category;
                            }
                            if (search) {
                                where.name = (0, typeorm_1.Like)("%".concat(search, "%"));
                            }
                            return [4 /*yield*/, this.emailTemplateRepository.findAndCount({
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
         * Create a new email template
         */
        EmailTemplateService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingTemplate, template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.emailTemplateRepository.findOne({
                                where: {
                                    name: data.name,
                                    organizationId: data.organizationId
                                }
                            })];
                        case 1:
                            existingTemplate = _a.sent();
                            if (existingTemplate) {
                                throw new common_1.BadRequestException("Template with name \"".concat(data.name, "\" already exists"));
                            }
                            template = this.emailTemplateRepository.create(data);
                            return [2 /*return*/, this.emailTemplateRepository.save(template)];
                    }
                });
            });
        };
        /**
         * Update an existing email template
         */
        EmailTemplateService_1.prototype.update = function (id, organizationId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var template, existingTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            if (!(data.name && data.name !== template.name)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.emailTemplateRepository.findOne({
                                    where: {
                                        name: data.name,
                                        organizationId: organizationId,
                                        id: (0, typeorm_1.Not)(id)
                                    }
                                })];
                        case 2:
                            existingTemplate = _a.sent();
                            if (existingTemplate) {
                                throw new common_1.BadRequestException("Template with name \"".concat(data.name, "\" already exists"));
                            }
                            _a.label = 3;
                        case 3:
                            Object.assign(template, data);
                            return [2 /*return*/, this.emailTemplateRepository.save(template)];
                    }
                });
            });
        };
        /**
         * Delete an email template
         */
        EmailTemplateService_1.prototype.delete = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            return [4 /*yield*/, this.emailTemplateRepository.softRemove(template)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Load and compile template from file
         */
        EmailTemplateService_1.prototype.loadTemplateFromFile = function (filename) {
            return __awaiter(this, void 0, void 0, function () {
                var templatePath;
                return __generator(this, function (_a) {
                    templatePath = path.join(this.defaultTemplatePath, filename);
                    try {
                        return [2 /*return*/, fs.readFileSync(templatePath, 'utf8')];
                    }
                    catch (error) {
                        throw new common_1.NotFoundException("Template file \"".concat(filename, "\" not found"));
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Render template with variables
         */
        EmailTemplateService_1.prototype.renderTemplate = function (content, variables) {
            if (variables === void 0) { variables = {}; }
            try {
                var template = Handlebars.compile(content);
                return template(variables);
            }
            catch (error) {
                throw new common_1.BadRequestException("Error rendering template: ".concat(error.message));
            }
        };
        /**
         * Render a template by ID with variables
         */
        EmailTemplateService_1.prototype.renderTemplateById = function (id_1, organizationId_1) {
            return __awaiter(this, arguments, void 0, function (id, organizationId, variables) {
                var template, content, subject, plainTextContent;
                if (variables === void 0) { variables = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            content = this.renderTemplate(template.content, variables);
                            subject = this.renderTemplate(template.subject, variables);
                            plainTextContent = template.plainTextContent
                                ? this.renderTemplate(template.plainTextContent, variables)
                                : undefined;
                            return [2 /*return*/, { subject: subject, content: content, plainTextContent: plainTextContent }];
                    }
                });
            });
        };
        /**
         * Get template categories for an organization
         */
        EmailTemplateService_1.prototype.getCategories = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.emailTemplateRepository
                                .createQueryBuilder('template')
                                .select('DISTINCT template.category')
                                .where('template.organizationId = :organizationId', { organizationId: organizationId })
                                .andWhere('template.category IS NOT NULL')
                                .getRawMany()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.map(function (item) { return item.category; }).filter(Boolean)];
                    }
                });
            });
        };
        /**
         * Clone a template
         */
        EmailTemplateService_1.prototype.cloneTemplate = function (id, organizationId, newName) {
            return __awaiter(this, void 0, void 0, function () {
                var template, templateId, templateData, name;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id, organizationId)];
                        case 1:
                            template = _a.sent();
                            templateId = template.id, templateData = __rest(template, ["id"]);
                            name = newName || "".concat(template.name, " (Copy)");
                            return [2 /*return*/, this.create(__assign(__assign({}, templateData), { name: name, status: email_template_entity_1.EmailTemplateStatus.DRAFT, isDefault: false, // Never clone as default
                                    organizationId: organizationId }))];
                    }
                });
            });
        };
        /**
         * Register custom Handlebars helpers
         */
        EmailTemplateService_1.prototype.registerHandlebarsHelpers = function () {
            // Format date helper
            Handlebars.registerHelper('formatDate', function (date, format) {
                if (!date)
                    return '';
                var d = new Date(date);
                switch (format) {
                    case 'short':
                        return d.toLocaleDateString();
                    case 'long':
                        return d.toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    case 'time':
                        return d.toLocaleTimeString();
                    case 'datetime':
                        return d.toLocaleString();
                    default:
                        return d.toDateString();
                }
            });
            // Conditional helper
            Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case '!==':
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            });
        };
        return EmailTemplateService_1;
    }());
    __setFunctionName(_classThis, "EmailTemplateService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailTemplateService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailTemplateService = _classThis;
}();
exports.EmailTemplateService = EmailTemplateService;
//# sourceMappingURL=email-template.service.js.map