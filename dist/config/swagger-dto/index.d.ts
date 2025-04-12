/**
 * Index file for Swagger DTOs
 * This file exports all DTOs used for Swagger documentation to avoid circular dependencies
 */
export { BaseDto } from './base.dto';
export { UserDto } from './users/user.dto';
export { OrganizationDto } from './organizations/organization.dto';
export { TicketDto } from './tickets/ticket.dto';
export { ContactDto } from './contacts/contact.dto';
export { ContactRelationshipDto } from './contacts/contact-relationship.dto';
export { AppointmentDto } from './appointments/appointment.dto';
export { NotificationDto } from './notifications/notification.dto';
export { MessageDto } from './messages/message.dto';
export { DepartmentDto } from './departments/department.dto';
export { DocumentDto } from './documents/document.dto';
export { MedicalHistoryDto } from './medical-history/medical-history.dto';
export { MergedRecordDto } from './merged-records/merged-record.dto';
export { TenantDto } from './tenants/tenant.dto';
export { TenantRegistrationDto } from './tenants/tenant-registration.dto';
export { OrganizationSetupDto } from './tenants/organization-setup.dto';
