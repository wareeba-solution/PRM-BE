"use strict";
// src/modules/contacts/contacts.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contacts_controller_1 = require("./controllers/contacts.controller");
const contacts_service_1 = require("./services/contacts.service");
const contact_entity_1 = require("./entities/contact.entity");
const contact_relationship_entity_1 = require("./entities/contact-relationship.entity");
const medical_history_entity_1 = require("../medical-history/medical-history.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const document_entity_1 = require("../documents/entities/document.entity");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const organizations_module_1 = require("../organizations/organizations.module");
let ContactsModule = class ContactsModule {
};
ContactsModule = __decorate([
    (0, common_1.Module)({
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
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map