"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/users/entities/user.entity.ts
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var role_enum_1 = require("../enums/role.enum");
var ticket_entity_1 = require("../../tickets/entities/ticket.entity");
var message_entity_1 = require("../../messages/entities/message.entity");
var appointment_entity_1 = require("../../appointments/entities/appointment.entity");
var notification_entity_1 = require("../../notifications/entities/notification.entity");
var user_activity_entity_1 = require("./user-activity.entity");
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('users'), (0, typeorm_1.Index)(['organizationId', 'email']), (0, typeorm_1.Index)(['organizationId', 'phoneNumber']), (0, typeorm_1.Index)(['organizationId', 'role'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _department_decorators;
    var _department_initializers = [];
    var _department_extraInitializers = [];
    var _employeeId_decorators;
    var _employeeId_initializers = [];
    var _employeeId_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _emergencyContact_decorators;
    var _emergencyContact_initializers = [];
    var _emergencyContact_extraInitializers = [];
    var _licenseNumber_decorators;
    var _licenseNumber_initializers = [];
    var _licenseNumber_extraInitializers = [];
    var _specialization_decorators;
    var _specialization_initializers = [];
    var _specialization_extraInitializers = [];
    var _qualifications_decorators;
    var _qualifications_initializers = [];
    var _qualifications_extraInitializers = [];
    var _certifications_decorators;
    var _certifications_initializers = [];
    var _certifications_extraInitializers = [];
    var _isOnCall_decorators;
    var _isOnCall_initializers = [];
    var _isOnCall_extraInitializers = [];
    var _languages_decorators;
    var _languages_initializers = [];
    var _languages_extraInitializers = [];
    var _requirePasswordChange_decorators;
    var _requirePasswordChange_initializers = [];
    var _requirePasswordChange_extraInitializers = [];
    var _preferences_decorators;
    var _preferences_initializers = [];
    var _preferences_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _isLocked_decorators;
    var _isLocked_initializers = [];
    var _isLocked_extraInitializers = [];
    var _isEmailVerified_decorators;
    var _isEmailVerified_initializers = [];
    var _isEmailVerified_extraInitializers = [];
    var _isPhoneVerified_decorators;
    var _isPhoneVerified_initializers = [];
    var _isPhoneVerified_extraInitializers = [];
    var _lastLoginAt_decorators;
    var _lastLoginAt_initializers = [];
    var _lastLoginAt_extraInitializers = [];
    var _lastActiveAt_decorators;
    var _lastActiveAt_initializers = [];
    var _lastActiveAt_extraInitializers = [];
    var _deviceTokens_decorators;
    var _deviceTokens_initializers = [];
    var _deviceTokens_extraInitializers = [];
    var _avatar_decorators;
    var _avatar_initializers = [];
    var _avatar_extraInitializers = [];
    var _signature_decorators;
    var _signature_initializers = [];
    var _signature_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _assignedTickets_decorators;
    var _assignedTickets_initializers = [];
    var _assignedTickets_extraInitializers = [];
    var _messages_decorators;
    var _messages_initializers = [];
    var _messages_extraInitializers = [];
    var _appointments_decorators;
    var _appointments_initializers = [];
    var _appointments_extraInitializers = [];
    var _notifications_decorators;
    var _notifications_initializers = [];
    var _notifications_extraInitializers = [];
    var _activities_decorators;
    var _activities_initializers = [];
    var _activities_extraInitializers = [];
    var _get_fullName_decorators;
    var _get_isAvailable_decorators;
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.mobilePhone = __runInitializers(this, _id_extraInitializers); // added mobilePhone property
            this.organizationId = __runInitializers(this, _organizationId_initializers, void 0);
            this.firstName = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
            this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.role = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.title = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.department = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _department_initializers, void 0));
            this.employeeId = (__runInitializers(this, _department_extraInitializers), __runInitializers(this, _employeeId_initializers, void 0));
            this.address = (__runInitializers(this, _employeeId_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.emergencyContact = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _emergencyContact_initializers, void 0));
            this.licenseNumber = (__runInitializers(this, _emergencyContact_extraInitializers), __runInitializers(this, _licenseNumber_initializers, void 0));
            this.specialization = (__runInitializers(this, _licenseNumber_extraInitializers), __runInitializers(this, _specialization_initializers, void 0));
            this.qualifications = (__runInitializers(this, _specialization_extraInitializers), __runInitializers(this, _qualifications_initializers, void 0));
            this.certifications = (__runInitializers(this, _qualifications_extraInitializers), __runInitializers(this, _certifications_initializers, void 0));
            this.isOnCall = (__runInitializers(this, _certifications_extraInitializers), __runInitializers(this, _isOnCall_initializers, void 0));
            this.languages = (__runInitializers(this, _isOnCall_extraInitializers), __runInitializers(this, _languages_initializers, void 0));
            this.requirePasswordChange = (__runInitializers(this, _languages_extraInitializers), __runInitializers(this, _requirePasswordChange_initializers, void 0));
            this.preferences = (__runInitializers(this, _requirePasswordChange_extraInitializers), __runInitializers(this, _preferences_initializers, void 0));
            this.metadata = (__runInitializers(this, _preferences_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.isActive = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.isLocked = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isLocked_initializers, void 0));
            this.isEmailVerified = (__runInitializers(this, _isLocked_extraInitializers), __runInitializers(this, _isEmailVerified_initializers, void 0));
            this.isPhoneVerified = (__runInitializers(this, _isEmailVerified_extraInitializers), __runInitializers(this, _isPhoneVerified_initializers, void 0));
            this.lastLoginAt = (__runInitializers(this, _isPhoneVerified_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
            this.lastActiveAt = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _lastActiveAt_initializers, void 0));
            this.deviceTokens = (__runInitializers(this, _lastActiveAt_extraInitializers), __runInitializers(this, _deviceTokens_initializers, void 0));
            this.avatar = (__runInitializers(this, _deviceTokens_extraInitializers), __runInitializers(this, _avatar_initializers, void 0));
            this.signature = (__runInitializers(this, _avatar_extraInitializers), __runInitializers(this, _signature_initializers, void 0));
            this.createdById = (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            // Change this to use lazy loading
            this.createdBy = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            // Change this to use lazy loading
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            // Other relationships remain the same but add lazy loading
            this.assignedTickets = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _assignedTickets_initializers, void 0));
            this.messages = (__runInitializers(this, _assignedTickets_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
            this.appointments = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _appointments_initializers, void 0));
            this.notifications = (__runInitializers(this, _appointments_extraInitializers), __runInitializers(this, _notifications_initializers, void 0));
            this.activities = (__runInitializers(this, _notifications_extraInitializers), __runInitializers(this, _activities_initializers, void 0));
            __runInitializers(this, _activities_extraInitializers);
        }
        Object.defineProperty(User_1.prototype, "fullName", {
            // Virtual properties
            get: function () {
                return "".concat(this.firstName, " ").concat(this.lastName);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User_1.prototype, "isAvailable", {
            get: function () {
                return this.isActive && !this.isLocked;
            },
            enumerable: false,
            configurable: true
        });
        User_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, mobilePhone: { required: false, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; } }, phoneNumber: { required: false, type: function () { return String; } }, role: { required: true, enum: require("../enums/role.enum").Role }, title: { required: false, type: function () { return String; } }, department: { required: false, type: function () { return String; } }, employeeId: { required: false, type: function () { return String; } }, address: { required: false, type: function () { return ({ street: { required: true, type: function () { return String; } }, city: { required: true, type: function () { return String; } }, state: { required: true, type: function () { return String; } }, postalCode: { required: true, type: function () { return String; } }, country: { required: true, type: function () { return String; } } }); } }, emergencyContact: { required: false, type: function () { return ({ name: { required: true, type: function () { return String; } }, relationship: { required: true, type: function () { return String; } }, phone: { required: true, type: function () { return String; } }, address: { required: false, type: function () { return String; } } }); } }, licenseNumber: { required: false, type: function () { return String; } }, specialization: { required: false, type: function () { return String; } }, qualifications: { required: false, type: function () { return [String]; } }, certifications: { required: false, type: function () { return [String]; } }, isOnCall: { required: true, type: function () { return Boolean; } }, languages: { required: false, type: function () { return [String]; } }, requirePasswordChange: { required: true, type: function () { return Boolean; } }, preferences: { required: false, type: function () { return ({ theme: { required: false, type: function () { return String; } }, notifications: { required: false, type: function () { return ({ email: { required: false, type: function () { return Boolean; } }, sms: { required: false, type: function () { return Boolean; } }, inApp: { required: false, type: function () { return Boolean; } } }); } }, timezone: { required: false, type: function () { return String; } }, language: { required: false, type: function () { return String; } } }); } }, metadata: { required: false, type: function () { return Object; } }, isActive: { required: true, type: function () { return Boolean; } }, isLocked: { required: true, type: function () { return Boolean; } }, isEmailVerified: { required: true, type: function () { return Boolean; } }, isPhoneVerified: { required: true, type: function () { return Boolean; } }, lastLoginAt: { required: false, type: function () { return Date; } }, lastActiveAt: { required: false, type: function () { return Date; } }, deviceTokens: { required: false, type: function () { return [String]; } }, avatar: { required: false, type: function () { return String; } }, signature: { required: false, type: function () { return String; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return Object; } }, createdBy: { required: true, type: function () { return require("./user.entity").User; } }, updatedBy: { required: false, type: function () { return require("./user.entity").User; } }, assignedTickets: { required: true, type: function () { return [require("../../tickets/entities/ticket.entity").Ticket]; } }, messages: { required: true, type: function () { return [require("../../messages/entities/message.entity").Message]; } }, appointments: { required: true, type: function () { return [require("../../appointments/entities/appointment.entity").Appointment]; } }, notifications: { required: true, type: function () { return [require("../../notifications/entities/notification.entity").Notification]; } }, activities: { required: true, type: function () { return [require("./user-activity.entity").UserActivity]; } } };
        };
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _firstName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _lastName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _email_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ unique: true }), (0, typeorm_1.Index)()];
        _password_decorators = [(0, typeorm_1.Column)()];
        _phoneNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _role_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: role_enum_1.Role,
                default: role_enum_1.Role.STAFF
            })];
        _title_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _department_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _employeeId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _address_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _emergencyContact_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _licenseNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _specialization_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _qualifications_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)('simple-array', { nullable: true })];
        _certifications_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)('simple-array', { nullable: true })];
        _isOnCall_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _languages_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)('simple-array', { nullable: true })];
        _requirePasswordChange_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: true })];
        _preferences_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _metadata_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isActive_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: true })];
        _isLocked_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _isEmailVerified_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _isPhoneVerified_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _lastLoginAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _lastActiveAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _deviceTokens_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)('simple-array', { nullable: true })];
        _avatar_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _signature_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)('Organization'), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _assignedTickets_decorators = [(0, typeorm_1.OneToMany)(function () { return ticket_entity_1.Ticket; }, function (ticket) { return ticket.assignee; }, { lazy: true })];
        _messages_decorators = [(0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (message) { return message.sender; }, { lazy: true })];
        _appointments_decorators = [(0, typeorm_1.OneToMany)(function () { return appointment_entity_1.Appointment; }, function (appointment) { return appointment.provider; }, { lazy: true })];
        _notifications_decorators = [(0, typeorm_1.OneToMany)(function () { return notification_entity_1.Notification; }, function (notification) { return notification.user; }, { lazy: true })];
        _activities_decorators = [(0, typeorm_1.OneToMany)(function () { return user_activity_entity_1.UserActivity; }, function (activity) { return activity.user; }, { lazy: true })];
        _get_fullName_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isAvailable_decorators = [(0, swagger_1.ApiProperty)()];
        __esDecorate(_classThis, null, _get_fullName_decorators, { kind: "getter", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isAvailable_decorators, { kind: "getter", name: "isAvailable", static: false, private: false, access: { has: function (obj) { return "isAvailable" in obj; }, get: function (obj) { return obj.isAvailable; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _department_decorators, { kind: "field", name: "department", static: false, private: false, access: { has: function (obj) { return "department" in obj; }, get: function (obj) { return obj.department; }, set: function (obj, value) { obj.department = value; } }, metadata: _metadata }, _department_initializers, _department_extraInitializers);
        __esDecorate(null, null, _employeeId_decorators, { kind: "field", name: "employeeId", static: false, private: false, access: { has: function (obj) { return "employeeId" in obj; }, get: function (obj) { return obj.employeeId; }, set: function (obj, value) { obj.employeeId = value; } }, metadata: _metadata }, _employeeId_initializers, _employeeId_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _emergencyContact_decorators, { kind: "field", name: "emergencyContact", static: false, private: false, access: { has: function (obj) { return "emergencyContact" in obj; }, get: function (obj) { return obj.emergencyContact; }, set: function (obj, value) { obj.emergencyContact = value; } }, metadata: _metadata }, _emergencyContact_initializers, _emergencyContact_extraInitializers);
        __esDecorate(null, null, _licenseNumber_decorators, { kind: "field", name: "licenseNumber", static: false, private: false, access: { has: function (obj) { return "licenseNumber" in obj; }, get: function (obj) { return obj.licenseNumber; }, set: function (obj, value) { obj.licenseNumber = value; } }, metadata: _metadata }, _licenseNumber_initializers, _licenseNumber_extraInitializers);
        __esDecorate(null, null, _specialization_decorators, { kind: "field", name: "specialization", static: false, private: false, access: { has: function (obj) { return "specialization" in obj; }, get: function (obj) { return obj.specialization; }, set: function (obj, value) { obj.specialization = value; } }, metadata: _metadata }, _specialization_initializers, _specialization_extraInitializers);
        __esDecorate(null, null, _qualifications_decorators, { kind: "field", name: "qualifications", static: false, private: false, access: { has: function (obj) { return "qualifications" in obj; }, get: function (obj) { return obj.qualifications; }, set: function (obj, value) { obj.qualifications = value; } }, metadata: _metadata }, _qualifications_initializers, _qualifications_extraInitializers);
        __esDecorate(null, null, _certifications_decorators, { kind: "field", name: "certifications", static: false, private: false, access: { has: function (obj) { return "certifications" in obj; }, get: function (obj) { return obj.certifications; }, set: function (obj, value) { obj.certifications = value; } }, metadata: _metadata }, _certifications_initializers, _certifications_extraInitializers);
        __esDecorate(null, null, _isOnCall_decorators, { kind: "field", name: "isOnCall", static: false, private: false, access: { has: function (obj) { return "isOnCall" in obj; }, get: function (obj) { return obj.isOnCall; }, set: function (obj, value) { obj.isOnCall = value; } }, metadata: _metadata }, _isOnCall_initializers, _isOnCall_extraInitializers);
        __esDecorate(null, null, _languages_decorators, { kind: "field", name: "languages", static: false, private: false, access: { has: function (obj) { return "languages" in obj; }, get: function (obj) { return obj.languages; }, set: function (obj, value) { obj.languages = value; } }, metadata: _metadata }, _languages_initializers, _languages_extraInitializers);
        __esDecorate(null, null, _requirePasswordChange_decorators, { kind: "field", name: "requirePasswordChange", static: false, private: false, access: { has: function (obj) { return "requirePasswordChange" in obj; }, get: function (obj) { return obj.requirePasswordChange; }, set: function (obj, value) { obj.requirePasswordChange = value; } }, metadata: _metadata }, _requirePasswordChange_initializers, _requirePasswordChange_extraInitializers);
        __esDecorate(null, null, _preferences_decorators, { kind: "field", name: "preferences", static: false, private: false, access: { has: function (obj) { return "preferences" in obj; }, get: function (obj) { return obj.preferences; }, set: function (obj, value) { obj.preferences = value; } }, metadata: _metadata }, _preferences_initializers, _preferences_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _isLocked_decorators, { kind: "field", name: "isLocked", static: false, private: false, access: { has: function (obj) { return "isLocked" in obj; }, get: function (obj) { return obj.isLocked; }, set: function (obj, value) { obj.isLocked = value; } }, metadata: _metadata }, _isLocked_initializers, _isLocked_extraInitializers);
        __esDecorate(null, null, _isEmailVerified_decorators, { kind: "field", name: "isEmailVerified", static: false, private: false, access: { has: function (obj) { return "isEmailVerified" in obj; }, get: function (obj) { return obj.isEmailVerified; }, set: function (obj, value) { obj.isEmailVerified = value; } }, metadata: _metadata }, _isEmailVerified_initializers, _isEmailVerified_extraInitializers);
        __esDecorate(null, null, _isPhoneVerified_decorators, { kind: "field", name: "isPhoneVerified", static: false, private: false, access: { has: function (obj) { return "isPhoneVerified" in obj; }, get: function (obj) { return obj.isPhoneVerified; }, set: function (obj, value) { obj.isPhoneVerified = value; } }, metadata: _metadata }, _isPhoneVerified_initializers, _isPhoneVerified_extraInitializers);
        __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: function (obj) { return "lastLoginAt" in obj; }, get: function (obj) { return obj.lastLoginAt; }, set: function (obj, value) { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
        __esDecorate(null, null, _lastActiveAt_decorators, { kind: "field", name: "lastActiveAt", static: false, private: false, access: { has: function (obj) { return "lastActiveAt" in obj; }, get: function (obj) { return obj.lastActiveAt; }, set: function (obj, value) { obj.lastActiveAt = value; } }, metadata: _metadata }, _lastActiveAt_initializers, _lastActiveAt_extraInitializers);
        __esDecorate(null, null, _deviceTokens_decorators, { kind: "field", name: "deviceTokens", static: false, private: false, access: { has: function (obj) { return "deviceTokens" in obj; }, get: function (obj) { return obj.deviceTokens; }, set: function (obj, value) { obj.deviceTokens = value; } }, metadata: _metadata }, _deviceTokens_initializers, _deviceTokens_extraInitializers);
        __esDecorate(null, null, _avatar_decorators, { kind: "field", name: "avatar", static: false, private: false, access: { has: function (obj) { return "avatar" in obj; }, get: function (obj) { return obj.avatar; }, set: function (obj, value) { obj.avatar = value; } }, metadata: _metadata }, _avatar_initializers, _avatar_extraInitializers);
        __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: function (obj) { return "signature" in obj; }, get: function (obj) { return obj.signature; }, set: function (obj, value) { obj.signature = value; } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _assignedTickets_decorators, { kind: "field", name: "assignedTickets", static: false, private: false, access: { has: function (obj) { return "assignedTickets" in obj; }, get: function (obj) { return obj.assignedTickets; }, set: function (obj, value) { obj.assignedTickets = value; } }, metadata: _metadata }, _assignedTickets_initializers, _assignedTickets_extraInitializers);
        __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: function (obj) { return "messages" in obj; }, get: function (obj) { return obj.messages; }, set: function (obj, value) { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
        __esDecorate(null, null, _appointments_decorators, { kind: "field", name: "appointments", static: false, private: false, access: { has: function (obj) { return "appointments" in obj; }, get: function (obj) { return obj.appointments; }, set: function (obj, value) { obj.appointments = value; } }, metadata: _metadata }, _appointments_initializers, _appointments_extraInitializers);
        __esDecorate(null, null, _notifications_decorators, { kind: "field", name: "notifications", static: false, private: false, access: { has: function (obj) { return "notifications" in obj; }, get: function (obj) { return obj.notifications; }, set: function (obj, value) { obj.notifications = value; } }, metadata: _metadata }, _notifications_initializers, _notifications_extraInitializers);
        __esDecorate(null, null, _activities_decorators, { kind: "field", name: "activities", static: false, private: false, access: { has: function (obj) { return "activities" in obj; }, get: function (obj) { return obj.activities; }, set: function (obj, value) { obj.activities = value; } }, metadata: _metadata }, _activities_initializers, _activities_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
//# sourceMappingURL=user.entity.js.map