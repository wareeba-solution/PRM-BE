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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentResponseDto = exports.BulkTicketAssignmentDto = exports.UpdateTicketAssignmentDto = exports.CreateTicketAssignmentDto = exports.AssignmentRules = exports.TicketAssignmentDto = exports.AssignmentNotification = exports.AssignmentType = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var class_validator_2 = require("class-validator");
var AssignmentType;
(function (AssignmentType) {
    AssignmentType["USER"] = "user";
    AssignmentType["TEAM"] = "team";
    AssignmentType["DEPARTMENT"] = "department";
    AssignmentType["AUTO"] = "auto";
    AssignmentType["ROUND_ROBIN"] = "round_robin";
})(AssignmentType || (exports.AssignmentType = AssignmentType = {}));
var AssignmentNotification = function () {
    var _a;
    var _notifyAssignee_decorators;
    var _notifyAssignee_initializers = [];
    var _notifyAssignee_extraInitializers = [];
    var _notifyPreviousAssignee_decorators;
    var _notifyPreviousAssignee_initializers = [];
    var _notifyPreviousAssignee_extraInitializers = [];
    var _customMessage_decorators;
    var _customMessage_initializers = [];
    var _customMessage_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AssignmentNotification() {
                this.notifyAssignee = __runInitializers(this, _notifyAssignee_initializers, true);
                this.notifyPreviousAssignee = (__runInitializers(this, _notifyAssignee_extraInitializers), __runInitializers(this, _notifyPreviousAssignee_initializers, true));
                this.customMessage = (__runInitializers(this, _notifyPreviousAssignee_extraInitializers), __runInitializers(this, _customMessage_initializers, void 0));
                __runInitializers(this, _customMessage_extraInitializers);
            }
            AssignmentNotification._OPENAPI_METADATA_FACTORY = function () {
                return { notifyAssignee: { required: false, type: function () { return Boolean; }, default: true }, notifyPreviousAssignee: { required: false, type: function () { return Boolean; }, default: true }, customMessage: { required: false, type: function () { return String; } } };
            };
            return AssignmentNotification;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notifyAssignee_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether to notify the assignee',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _notifyPreviousAssignee_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether to notify the previous assignee',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _customMessage_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Custom notification message',
                    example: 'You have been assigned to handle this urgent support request.'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _notifyAssignee_decorators, { kind: "field", name: "notifyAssignee", static: false, private: false, access: { has: function (obj) { return "notifyAssignee" in obj; }, get: function (obj) { return obj.notifyAssignee; }, set: function (obj, value) { obj.notifyAssignee = value; } }, metadata: _metadata }, _notifyAssignee_initializers, _notifyAssignee_extraInitializers);
            __esDecorate(null, null, _notifyPreviousAssignee_decorators, { kind: "field", name: "notifyPreviousAssignee", static: false, private: false, access: { has: function (obj) { return "notifyPreviousAssignee" in obj; }, get: function (obj) { return obj.notifyPreviousAssignee; }, set: function (obj, value) { obj.notifyPreviousAssignee = value; } }, metadata: _metadata }, _notifyPreviousAssignee_initializers, _notifyPreviousAssignee_extraInitializers);
            __esDecorate(null, null, _customMessage_decorators, { kind: "field", name: "customMessage", static: false, private: false, access: { has: function (obj) { return "customMessage" in obj; }, get: function (obj) { return obj.customMessage; }, set: function (obj, value) { obj.customMessage = value; } }, metadata: _metadata }, _customMessage_initializers, _customMessage_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AssignmentNotification = AssignmentNotification;
var TicketAssignmentDto = function () {
    var _a;
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TicketAssignmentDto() {
                this.assigneeId = __runInitializers(this, _assigneeId_initializers, void 0);
                this.note = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                __runInitializers(this, _note_extraInitializers);
            }
            TicketAssignmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { assigneeId: { required: true, type: function () { return String; }, format: "uuid" }, note: { required: false, type: function () { return String; } } };
            };
            return TicketAssignmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _assigneeId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The ID of the user to assign the ticket to',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsUUID)()];
            _note_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Optional note about the assignment',
                    example: 'Assigning to support team lead for escalated issue'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TicketAssignmentDto = TicketAssignmentDto;
var AssignmentRules = function () {
    var _a;
    var _considerWorkload_decorators;
    var _considerWorkload_initializers = [];
    var _considerWorkload_extraInitializers = [];
    var _checkSkillMatch_decorators;
    var _checkSkillMatch_initializers = [];
    var _checkSkillMatch_extraInitializers = [];
    var _considerTimeZone_decorators;
    var _considerTimeZone_initializers = [];
    var _considerTimeZone_extraInitializers = [];
    var _requiredSkills_decorators;
    var _requiredSkills_initializers = [];
    var _requiredSkills_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AssignmentRules() {
                this.considerWorkload = __runInitializers(this, _considerWorkload_initializers, true);
                this.checkSkillMatch = (__runInitializers(this, _considerWorkload_extraInitializers), __runInitializers(this, _checkSkillMatch_initializers, true));
                this.considerTimeZone = (__runInitializers(this, _checkSkillMatch_extraInitializers), __runInitializers(this, _considerTimeZone_initializers, false));
                this.requiredSkills = (__runInitializers(this, _considerTimeZone_extraInitializers), __runInitializers(this, _requiredSkills_initializers, void 0));
                __runInitializers(this, _requiredSkills_extraInitializers);
            }
            AssignmentRules._OPENAPI_METADATA_FACTORY = function () {
                return { considerWorkload: { required: false, type: function () { return Boolean; }, default: true }, checkSkillMatch: { required: false, type: function () { return Boolean; }, default: true }, considerTimeZone: { required: false, type: function () { return Boolean; }, default: false }, requiredSkills: { required: false, type: function () { return [String]; } } };
            };
            return AssignmentRules;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _considerWorkload_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to consider workload when assigning',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _checkSkillMatch_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to check for skill match',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _considerTimeZone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to consider time zones',
                    default: false
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _requiredSkills_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Required skills for the assignment',
                    type: [String]
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _considerWorkload_decorators, { kind: "field", name: "considerWorkload", static: false, private: false, access: { has: function (obj) { return "considerWorkload" in obj; }, get: function (obj) { return obj.considerWorkload; }, set: function (obj, value) { obj.considerWorkload = value; } }, metadata: _metadata }, _considerWorkload_initializers, _considerWorkload_extraInitializers);
            __esDecorate(null, null, _checkSkillMatch_decorators, { kind: "field", name: "checkSkillMatch", static: false, private: false, access: { has: function (obj) { return "checkSkillMatch" in obj; }, get: function (obj) { return obj.checkSkillMatch; }, set: function (obj, value) { obj.checkSkillMatch = value; } }, metadata: _metadata }, _checkSkillMatch_initializers, _checkSkillMatch_extraInitializers);
            __esDecorate(null, null, _considerTimeZone_decorators, { kind: "field", name: "considerTimeZone", static: false, private: false, access: { has: function (obj) { return "considerTimeZone" in obj; }, get: function (obj) { return obj.considerTimeZone; }, set: function (obj, value) { obj.considerTimeZone = value; } }, metadata: _metadata }, _considerTimeZone_initializers, _considerTimeZone_extraInitializers);
            __esDecorate(null, null, _requiredSkills_decorators, { kind: "field", name: "requiredSkills", static: false, private: false, access: { has: function (obj) { return "requiredSkills" in obj; }, get: function (obj) { return obj.requiredSkills; }, set: function (obj, value) { obj.requiredSkills = value; } }, metadata: _metadata }, _requiredSkills_initializers, _requiredSkills_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AssignmentRules = AssignmentRules;
var CreateTicketAssignmentDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _notification_decorators;
    var _notification_initializers = [];
    var _notification_extraInitializers = [];
    var _rules_decorators;
    var _rules_initializers = [];
    var _rules_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _isTemporary_decorators;
    var _isTemporary_initializers = [];
    var _isTemporary_extraInitializers = [];
    var _temporaryUntil_decorators;
    var _temporaryUntil_initializers = [];
    var _temporaryUntil_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateTicketAssignmentDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.assigneeId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.notification = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _notification_initializers, void 0));
                this.rules = (__runInitializers(this, _notification_extraInitializers), __runInitializers(this, _rules_initializers, void 0));
                this.reason = (__runInitializers(this, _rules_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                this.notes = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.isTemporary = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _isTemporary_initializers, false));
                this.temporaryUntil = (__runInitializers(this, _isTemporary_extraInitializers), __runInitializers(this, _temporaryUntil_initializers, void 0));
                __runInitializers(this, _temporaryUntil_extraInitializers);
            }
            CreateTicketAssignmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { type: { required: true, enum: require("./ticket-assignment.dto").AssignmentType }, assigneeId: { required: true, type: function () { return String; }, format: "uuid" }, notification: { required: false, type: function () { return require("./ticket-assignment.dto").AssignmentNotification; } }, rules: { required: false, type: function () { return require("./ticket-assignment.dto").AssignmentRules; } }, reason: { required: false, type: function () { return String; } }, notes: { required: false, type: function () { return [String]; } }, isTemporary: { required: false, type: function () { return Boolean; }, default: false }, temporaryUntil: { required: false, type: function () { return Date; } } };
            };
            return CreateTicketAssignmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of assignment',
                    enum: AssignmentType,
                    example: AssignmentType.USER
                }), (0, class_validator_1.IsEnum)(AssignmentType)];
            _assigneeId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID of the assignee (user, team, or department)',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsUUID)('4')];
            _notification_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Notification settings for the assignment'
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return AssignmentNotification; }), (0, class_validator_1.IsOptional)()];
            _rules_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Assignment rules and preferences'
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return AssignmentRules; }), (0, class_validator_1.IsOptional)()];
            _reason_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Reason for the assignment',
                    example: 'Reassigned due to technical expertise required'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    type: [String],
                    description: 'Additional notes or comments about the assignment'
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _isTemporary_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether this is a temporary assignment',
                    default: false
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _temporaryUntil_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    type: Date,
                    description: 'If temporary, when the assignment should end'
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _notification_decorators, { kind: "field", name: "notification", static: false, private: false, access: { has: function (obj) { return "notification" in obj; }, get: function (obj) { return obj.notification; }, set: function (obj, value) { obj.notification = value; } }, metadata: _metadata }, _notification_initializers, _notification_extraInitializers);
            __esDecorate(null, null, _rules_decorators, { kind: "field", name: "rules", static: false, private: false, access: { has: function (obj) { return "rules" in obj; }, get: function (obj) { return obj.rules; }, set: function (obj, value) { obj.rules = value; } }, metadata: _metadata }, _rules_initializers, _rules_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _isTemporary_decorators, { kind: "field", name: "isTemporary", static: false, private: false, access: { has: function (obj) { return "isTemporary" in obj; }, get: function (obj) { return obj.isTemporary; }, set: function (obj, value) { obj.isTemporary = value; } }, metadata: _metadata }, _isTemporary_initializers, _isTemporary_extraInitializers);
            __esDecorate(null, null, _temporaryUntil_decorators, { kind: "field", name: "temporaryUntil", static: false, private: false, access: { has: function (obj) { return "temporaryUntil" in obj; }, get: function (obj) { return obj.temporaryUntil; }, set: function (obj, value) { obj.temporaryUntil = value; } }, metadata: _metadata }, _temporaryUntil_initializers, _temporaryUntil_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateTicketAssignmentDto = CreateTicketAssignmentDto;
var UpdateTicketAssignmentDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _notification_decorators;
    var _notification_initializers = [];
    var _notification_extraInitializers = [];
    var _rules_decorators;
    var _rules_initializers = [];
    var _rules_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateTicketAssignmentDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.assigneeId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.notification = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _notification_initializers, void 0));
                this.rules = (__runInitializers(this, _notification_extraInitializers), __runInitializers(this, _rules_initializers, void 0));
                this.reason = (__runInitializers(this, _rules_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                __runInitializers(this, _reason_extraInitializers);
            }
            UpdateTicketAssignmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { type: { required: false, enum: require("./ticket-assignment.dto").AssignmentType }, assigneeId: { required: false, type: function () { return String; }, format: "uuid" }, notification: { required: false, type: function () { return require("./ticket-assignment.dto").AssignmentNotification; } }, rules: { required: false, type: function () { return require("./ticket-assignment.dto").AssignmentRules; } }, reason: { required: false, type: function () { return String; } } };
            };
            return UpdateTicketAssignmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: AssignmentType,
                    description: 'Updated type of assignment'
                }), (0, class_validator_1.IsEnum)(AssignmentType), (0, class_validator_1.IsOptional)()];
            _assigneeId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated assignee ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsUUID)('4'), (0, class_validator_1.IsOptional)()];
            _notification_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated notification settings'
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return AssignmentNotification; }), (0, class_validator_1.IsOptional)()];
            _rules_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated assignment rules'
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return AssignmentRules; }), (0, class_validator_1.IsOptional)()];
            _reason_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Reason for updating the assignment',
                    example: 'Adjusted assignment due to workload balancing'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _notification_decorators, { kind: "field", name: "notification", static: false, private: false, access: { has: function (obj) { return "notification" in obj; }, get: function (obj) { return obj.notification; }, set: function (obj, value) { obj.notification = value; } }, metadata: _metadata }, _notification_initializers, _notification_extraInitializers);
            __esDecorate(null, null, _rules_decorators, { kind: "field", name: "rules", static: false, private: false, access: { has: function (obj) { return "rules" in obj; }, get: function (obj) { return obj.rules; }, set: function (obj, value) { obj.rules = value; } }, metadata: _metadata }, _rules_initializers, _rules_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateTicketAssignmentDto = UpdateTicketAssignmentDto;
var BulkTicketAssignmentDto = function () {
    var _a;
    var _ticketIds_decorators;
    var _ticketIds_initializers = [];
    var _ticketIds_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BulkTicketAssignmentDto() {
                this.ticketIds = __runInitializers(this, _ticketIds_initializers, void 0);
                this.assigneeId = (__runInitializers(this, _ticketIds_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.note = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                __runInitializers(this, _note_extraInitializers);
            }
            BulkTicketAssignmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { ticketIds: { required: true, type: function () { return [String]; }, format: "uuid", minItems: 1 }, assigneeId: { required: true, type: function () { return String; }, format: "uuid" }, note: { required: false, type: function () { return String; } } };
            };
            return BulkTicketAssignmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _ticketIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Array of ticket IDs to assign',
                    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
                    type: [String]
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), ArrayMinSize(1)];
            _assigneeId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The ID of the user to assign the tickets to',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsUUID)()];
            _note_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Optional note about the bulk assignment',
                    example: 'Assigning all pending tickets to the new support agent'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _ticketIds_decorators, { kind: "field", name: "ticketIds", static: false, private: false, access: { has: function (obj) { return "ticketIds" in obj; }, get: function (obj) { return obj.ticketIds; }, set: function (obj, value) { obj.ticketIds = value; } }, metadata: _metadata }, _ticketIds_initializers, _ticketIds_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BulkTicketAssignmentDto = BulkTicketAssignmentDto;
var AssignmentResponseDto = function () {
    var _a;
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _error_decorators;
    var _error_initializers = [];
    var _error_extraInitializers = [];
    var _timestamp_decorators;
    var _timestamp_initializers = [];
    var _timestamp_extraInitializers = [];
    var _details_decorators;
    var _details_initializers = [];
    var _details_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AssignmentResponseDto() {
                this.success = __runInitializers(this, _success_initializers, void 0);
                this.ticketId = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
                this.assigneeId = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.type = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.error = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _error_initializers, void 0));
                this.timestamp = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
                this.details = (__runInitializers(this, _timestamp_extraInitializers), __runInitializers(this, _details_initializers, void 0));
                __runInitializers(this, _details_extraInitializers);
            }
            AssignmentResponseDto._OPENAPI_METADATA_FACTORY = function () {
                return { success: { required: true, type: function () { return Boolean; } }, ticketId: { required: true, type: function () { return String; } }, assigneeId: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./ticket-assignment.dto").AssignmentType }, error: { required: false, type: function () { return String; } }, timestamp: { required: true, type: function () { return Date; } }, details: { required: false, type: function () { return Object; } } };
            };
            return AssignmentResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the assignment was successful'
                })];
            _ticketId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The ticket ID'
                })];
            _assigneeId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The assignee ID'
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of assignment',
                    enum: AssignmentType
                })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Error message if assignment failed'
                })];
            _timestamp_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Timestamp of the assignment'
                })];
            _details_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional details about the assignment'
                })];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: function (obj) { return "error" in obj; }, get: function (obj) { return obj.error; }, set: function (obj, value) { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: function (obj) { return "timestamp" in obj; }, get: function (obj) { return obj.timestamp; }, set: function (obj, value) { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
            __esDecorate(null, null, _details_decorators, { kind: "field", name: "details", static: false, private: false, access: { has: function (obj) { return "details" in obj; }, get: function (obj) { return obj.details; }, set: function (obj, value) { obj.details = value; } }, metadata: _metadata }, _details_initializers, _details_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AssignmentResponseDto = AssignmentResponseDto;
function ArrayMinSize(min, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_2.registerDecorator)({
            name: 'arrayMinSize',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [min],
            validator: {
                validate: function (value, args) {
                    var minSize = args.constraints[0];
                    return Array.isArray(value) && value.length >= minSize;
                },
                defaultMessage: function (args) {
                    var minSize = args.constraints[0];
                    return "Array must contain at least ".concat(minSize, " elements");
                }
            }
        });
    };
}
//# sourceMappingURL=ticket-assignment.dto.js.map