"use strict";
// src/modules/contacts/contacts.module.ts
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var contacts_controller_1 = require("./controllers/contacts.controller");
var contacts_service_1 = require("./services/contacts.service");
var contact_entity_1 = require("./entities/contact.entity");
var contact_relationship_entity_1 = require("./entities/contact-relationship.entity");
var medical_history_entity_1 = require("../medical-history/medical-history.entity");
var appointment_entity_1 = require("../appointments/entities/appointment.entity");
var document_entity_1 = require("../documents/entities/document.entity");
var auth_module_1 = require("../auth/auth.module");
var users_module_1 = require("../users/users.module");
var organizations_module_1 = require("../organizations/organizations.module");
var ContactsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    contact_entity_1.Contact,
                    contact_relationship_entity_1.ContactRelationship,
                    medical_history_entity_1.MedicalHistory,
                    appointment_entity_1.Appointment,
                    document_entity_1.Document
                ]),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                organizations_module_1.OrganizationsModule
            ],
            controllers: [contacts_controller_1.ContactsController],
            providers: [contacts_service_1.ContactsService],
            exports: [contacts_service_1.ContactsService]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ContactsModule = _classThis = /** @class */ (function () {
        function ContactsModule_1() {
        }
        return ContactsModule_1;
    }());
    __setFunctionName(_classThis, "ContactsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactsModule = _classThis;
}();
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map