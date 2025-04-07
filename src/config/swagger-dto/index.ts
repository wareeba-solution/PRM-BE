/**
 * Index file for Swagger DTOs
 * This file exports all DTOs used for Swagger documentation to avoid circular dependencies
 */

// Base DTO
export { BaseDto } from './base.dto';

// User DTOs
export { UserDto } from './users/user.dto';

// Organization DTOs
export { OrganizationDto } from './organizations/organization.dto';

// Ticket DTOs
export { TicketDto } from './tickets/ticket.dto';

// Contact DTOs
export { ContactDto } from './contacts/contact.dto';
export { ContactRelationshipDto } from './contacts/contact-relationship.dto';

// Appointment DTOs
export { AppointmentDto } from './appointments/appointment.dto';

// Notification DTOs
export { NotificationDto } from './notifications/notification.dto';

// Message DTOs
export { MessageDto } from './messages/message.dto';

// Department DTOs
export { DepartmentDto } from './departments/department.dto';

// Document DTOs
export { DocumentDto } from './documents/document.dto';

// Medical History DTOs
export { MedicalHistoryDto } from './medical-history/medical-history.dto';

// Merged Records DTOs
export { MergedRecordDto } from './merged-records/merged-record.dto';
