"use strict";
// /**
//  * Index file for Swagger DTOs
//  * This file exports all DTOs used for Swagger documentation to avoid circular dependencies
//  */
//
// // Base DTO
// export { BaseDto } from './base.dto';
//
// // User DTOs
// export { UserDto } from './users/user.dto';
//
// // Organization DTOs
// export { OrganizationDto } from './organizations/organization.dto';
//
// // Ticket DTOs
// export { TicketDto } from './tickets/ticket.dto';
//
// // Contact DTOs
// export { ContactDto } from './contacts/contact.dto';
// export { ContactRelationshipDto } from './contacts/contact-relationship.dto';
//
// // Appointment DTOs
// export { AppointmentDto } from './appointments/appointment.dto';
//
// // Notification DTOs
// export { NotificationDto } from './notifications/notification.dto';
//
// // Message DTOs
// export { MessageDto } from './messages/message.dto';
//
// // Department DTOs
// export { DepartmentDto } from './departments/department.dto';
//
// // Document DTOs
// export { DocumentDto } from './documents/document.dto';
//
// // Medical History DTOs
// export { MedicalHistoryDto } from './medical-history/medical-history.dto';
//
// // Merged Records DTOs
// export { MergedRecordDto } from './merged-records/merged-record.dto';
//
// // Tenant DTOs
// export { TenantDto, TenantRegistrationDto, OrganizationSetupDto } from './tenants';
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSetupDto = exports.TenantRegistrationDto = exports.TenantDto = exports.MergedRecordDto = exports.MedicalHistoryDto = exports.DocumentDto = exports.DepartmentDto = exports.MessageDto = exports.NotificationDto = exports.AppointmentDto = exports.ContactRelationshipDto = exports.ContactDto = exports.TicketDto = exports.OrganizationDto = exports.UserDto = exports.BaseDto = void 0;
/**
 * Index file for Swagger DTOs
 * This file exports all DTOs used for Swagger documentation to avoid circular dependencies
 */
// Base DTO
var base_dto_1 = require("./base.dto");
Object.defineProperty(exports, "BaseDto", { enumerable: true, get: function () { return base_dto_1.BaseDto; } });
// User DTOs
var user_dto_1 = require("./users/user.dto");
Object.defineProperty(exports, "UserDto", { enumerable: true, get: function () { return user_dto_1.UserDto; } });
// Organization DTOs
var organization_dto_1 = require("./organizations/organization.dto");
Object.defineProperty(exports, "OrganizationDto", { enumerable: true, get: function () { return organization_dto_1.OrganizationDto; } });
// Ticket DTOs
var ticket_dto_1 = require("./tickets/ticket.dto");
Object.defineProperty(exports, "TicketDto", { enumerable: true, get: function () { return ticket_dto_1.TicketDto; } });
// Contact DTOs
var contact_dto_1 = require("./contacts/contact.dto");
Object.defineProperty(exports, "ContactDto", { enumerable: true, get: function () { return contact_dto_1.ContactDto; } });
var contact_relationship_dto_1 = require("./contacts/contact-relationship.dto");
Object.defineProperty(exports, "ContactRelationshipDto", { enumerable: true, get: function () { return contact_relationship_dto_1.ContactRelationshipDto; } });
// Appointment DTOs
var appointment_dto_1 = require("./appointments/appointment.dto");
Object.defineProperty(exports, "AppointmentDto", { enumerable: true, get: function () { return appointment_dto_1.AppointmentDto; } });
// Notification DTOs
var notification_dto_1 = require("./notifications/notification.dto");
Object.defineProperty(exports, "NotificationDto", { enumerable: true, get: function () { return notification_dto_1.NotificationDto; } });
// Message DTOs
var message_dto_1 = require("./messages/message.dto");
Object.defineProperty(exports, "MessageDto", { enumerable: true, get: function () { return message_dto_1.MessageDto; } });
// Department DTOs
var department_dto_1 = require("./departments/department.dto");
Object.defineProperty(exports, "DepartmentDto", { enumerable: true, get: function () { return department_dto_1.DepartmentDto; } });
// Document DTOs
var document_dto_1 = require("./documents/document.dto");
Object.defineProperty(exports, "DocumentDto", { enumerable: true, get: function () { return document_dto_1.DocumentDto; } });
// Medical History DTOs
var medical_history_dto_1 = require("./medical-history/medical-history.dto");
Object.defineProperty(exports, "MedicalHistoryDto", { enumerable: true, get: function () { return medical_history_dto_1.MedicalHistoryDto; } });
// Merged Records DTOs
var merged_record_dto_1 = require("./merged-records/merged-record.dto");
Object.defineProperty(exports, "MergedRecordDto", { enumerable: true, get: function () { return merged_record_dto_1.MergedRecordDto; } });
// Tenant DTOs - Direct imports instead of using ./tenants
var tenant_dto_1 = require("./tenants/tenant.dto");
Object.defineProperty(exports, "TenantDto", { enumerable: true, get: function () { return tenant_dto_1.TenantDto; } });
var tenant_registration_dto_1 = require("./tenants/tenant-registration.dto");
Object.defineProperty(exports, "TenantRegistrationDto", { enumerable: true, get: function () { return tenant_registration_dto_1.TenantRegistrationDto; } });
var organization_setup_dto_1 = require("./tenants/organization-setup.dto");
Object.defineProperty(exports, "OrganizationSetupDto", { enumerable: true, get: function () { return organization_setup_dto_1.OrganizationSetupDto; } });
//# sourceMappingURL=index.js.map