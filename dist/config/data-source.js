"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv = __importStar(require("dotenv"));
const user_entity_1 = require("../modules/users/entities/user.entity");
const user_profile_entity_1 = require("../modules/users/entities/user-profile.entity");
const user_verification_entity_1 = require("../modules/users/entities/user-verification.entity");
const user_activity_entity_1 = require("../modules/users/entities/user-activity.entity");
const user_session_entity_1 = require("../modules/users/entities/user-session.entity");
const organization_entity_1 = require("../modules/organizations/entities/organization.entity");
const ticket_entity_1 = require("../modules/tickets/entities/ticket.entity");
const message_entity_1 = require("../modules/messages/entities/message.entity");
const appointment_entity_1 = require("../modules/appointments/entities/appointment.entity");
const notification_entity_1 = require("../modules/notifications/entities/notification.entity");
const contact_entity_1 = require("../modules/contacts/entities/contact.entity");
const department_entity_1 = require("../modules/departments/entities/department.entity");
const ticket_comment_entity_1 = require("../modules/tickets/entities/ticket-comment.entity");
const ticket_attachment_entity_1 = require("../modules/tickets/entities/ticket-attachment.entity");
const ticket_activity_entity_1 = require("../modules/tickets/entities/ticket-activity.entity");
const ticket_priority_entity_1 = require("../modules/tickets/entities/ticket-priority.entity");
const message_template_entity_1 = require("../modules/messages/entities/message-template.entity");
const message_attachment_entity_1 = require("../modules/messages/entities/message-attachment.entity");
const document_entity_1 = require("../modules/documents/entities/document.entity");
const medical_history_entity_1 = require("../modules/medical-history/medical-history.entity");
const contact_relationship_entity_1 = require("../modules/contacts/entities/contact-relationship.entity");
const user_settings_entity_1 = require("../modules/users/entities/user-settings.entity");
const email_content_entity_1 = require("../modules/notifications/entities/email-content.entity");
const email_log_entity_1 = require("../modules/notifications/entities/email-log.entity");
const email_queue_entity_1 = require("../modules/notifications/entities/email-queue.entity");
const merged_record_entity_1 = require("../modules/merged-records/entities/merged-record.entity");
const email_template_entity_1 = require("../modules/email/entities/email-template.entity");
const tenant_entity_1 = require("../modules/tenants/entities/tenant.entity");
const _1712565600021_CreateInitialSchema_1 = require("../database/migrations/1712565600021-CreateInitialSchema");
const _1712565600022_FixUserSettingsTable_1 = require("../database/migrations/1712565600022-FixUserSettingsTable");
const _1712565600023_FixUserVerificationTable_1 = require("../database/migrations/1712565600023-FixUserVerificationTable");
dotenv.config();
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'default_username',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_database',
    schema: process.env.DB_SCHEMA || 'public',
    synchronize: false,
    logging: true,
    ssl: process.env.DB_SSL === 'true',
    entities: [
        user_entity_1.User,
        user_profile_entity_1.UserProfile,
        user_verification_entity_1.UserVerification,
        user_activity_entity_1.UserActivity,
        user_session_entity_1.UserSession,
        organization_entity_1.Organization,
        ticket_entity_1.Ticket,
        message_entity_1.Message,
        appointment_entity_1.Appointment,
        notification_entity_1.Notification,
        contact_entity_1.Contact,
        department_entity_1.Department,
        ticket_comment_entity_1.TicketComment,
        ticket_attachment_entity_1.TicketAttachment,
        ticket_activity_entity_1.TicketActivity,
        ticket_priority_entity_1.TicketPriority,
        message_template_entity_1.MessageTemplate,
        message_attachment_entity_1.MessageAttachment,
        document_entity_1.Document,
        medical_history_entity_1.MedicalHistory,
        contact_relationship_entity_1.ContactRelationship,
        user_settings_entity_1.UserSettings,
        email_content_entity_1.EmailContent,
        email_log_entity_1.EmailLog,
        email_queue_entity_1.EmailQueue,
        merged_record_entity_1.MergedRecord,
        email_template_entity_1.EmailTemplate,
        tenant_entity_1.Tenant
    ],
    migrations: [
        _1712565600021_CreateInitialSchema_1.CreateInitialSchema1712565600021,
        _1712565600022_FixUserSettingsTable_1.FixUserSettingsTable1712565600022,
        _1712565600023_FixUserVerificationTable_1.FixUserVerificationTable1712565600023
    ],
    migrationsTableName: 'migrations',
    migrationsRun: true,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map