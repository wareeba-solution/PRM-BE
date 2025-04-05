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
import { MessageTemplate } from '../modules/messages/entities/message-template.entity';
import { MessageAttachment } from '../modules/messages/entities/message-attachment.entity';
import { Document } from '../modules/documents/entities/document.entity';
import { MedicalHistory } from '../modules/medical-history/medical-history.entity';
import { ContactRelationship } from '../modules/contacts/entities/contact-relationship.entity';
import { UserSettings } from '../modules/users/entities/user-settings.entity';
import { CleanupUsersTable1710000000001 } from '../migrations/1710000000001-CleanupUsersTable';
import { UserSettingsMigration1710000000005 } from "../migrations/1710000000005-UserSettingsMigration";
import { CheckUsersTableColumns1710000000006 } from "../migrations/1710000000006-CheckUsersTableColumns";
import { FixUsersTableColumns1710000000007 } from "../migrations/1710000000007-FixUsersTableColumns";
import { FixUsersTablePermissions1710000000008 } from "../migrations/1710000000008-FixUsersTablePermissions";

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
    logging: false,
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
        MessageTemplate,
        MessageAttachment,
        Document,
        MedicalHistory,
        ContactRelationship,
        UserSettings
    ],
    migrations: [
        CleanupUsersTable1710000000001,
        UserSettingsMigration1710000000005,
        CheckUsersTableColumns1710000000006,
        FixUsersTableColumns1710000000007,
        FixUsersTablePermissions1710000000008
    ],
    migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions); 