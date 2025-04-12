import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { User } from '../modules/users/entities/user.entity';
import { UserProfile } from '../modules/users/entities/user-profile.entity';
import { UserVerification } from '../modules/users/entities/user-verification.entity';
import { UserActivity } from '../modules/users/entities/user-activity.entity';
import { UserSession } from '../modules/users/entities/user-session.entity';
import { Organization } from '../modules/organizations/entities/organization.entity';
import { Ticket } from '../modules/tickets/entities/ticket.entity';
import { Message } from '../modules/messages/entities/message.entity';
import { Appointment } from '../modules/appointments/entities/appointment.entity';
import { Notification } from '../modules/notifications/entities/notification.entity';
import { Contact } from '../modules/contacts/entities/contact.entity';
import { Department } from '../modules/departments/entities/department.entity';
import { TicketComment } from '../modules/tickets/entities/ticket-comment.entity';
import { TicketAttachment } from '../modules/tickets/entities/ticket-attachment.entity';
import { TicketActivity } from '../modules/tickets/entities/ticket-activity.entity';
import { TicketPriority } from '../modules/tickets/entities/ticket-priority.entity';
import { MessageTemplate } from '../modules/messages/entities/message-template.entity';
import { MessageAttachment } from '../modules/messages/entities/message-attachment.entity';
import { Document } from '../modules/documents/entities/document.entity';
import { MedicalHistory } from '../modules/medical-history/medical-history.entity';
import { ContactRelationship } from '../modules/contacts/entities/contact-relationship.entity';
import { UserSettings } from '../modules/users/entities/user-settings.entity';
import { EmailContent } from '../modules/notifications/entities/email-content.entity';
import { EmailLog } from '../modules/notifications/entities/email-log.entity';
import { EmailQueue } from '../modules/notifications/entities/email-queue.entity';
import { MergedRecord } from '../modules/merged-records/entities/merged-record.entity';
import { EmailTemplate } from '../modules/email/entities/email-template.entity';
import { Tenant } from '../modules/tenants/entities/tenant.entity';
import { CreateInitialSchema1712565600021 } from "../database/migrations/1712565600021-CreateInitialSchema";
import { FixUserSettingsTable1712565600022 } from "../database/migrations/1712565600022-FixUserSettingsTable";
import { FixUserVerificationTable1712565600023 } from "../database/migrations/1712565600023-FixUserVerificationTable";

dotenv.config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
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
        User,
        UserProfile,
        UserVerification,
        UserActivity,
        UserSession,
        Organization,
        Ticket,
        Message,
        Appointment,
        Notification,
        Contact,
        Department,
        TicketComment,
        TicketAttachment,
        TicketActivity,
        TicketPriority,
        MessageTemplate,
        MessageAttachment,
        Document,
        MedicalHistory,
        ContactRelationship,
        UserSettings,
        EmailContent,
        EmailLog,
        EmailQueue,
        MergedRecord,
        EmailTemplate,
        Tenant
    ],
    migrations: [
        CreateInitialSchema1712565600021,
        FixUserSettingsTable1712565600022,
        FixUserVerificationTable1712565600023
    ],
    migrationsTableName: 'migrations',
    migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 