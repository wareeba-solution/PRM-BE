import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1700000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table first since other tables reference it
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "isActive" boolean DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Create organizations table
        await queryRunner.query(`
            CREATE TABLE "organizations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "isActive" boolean DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_organizations" PRIMARY KEY ("id")
            )
        `);

        // Create notifications table
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "organizationId" uuid NOT NULL,
                "type" character varying NOT NULL,
                "title" character varying NOT NULL,
                "content" text,
                "status" character varying NOT NULL DEFAULT 'PENDING',
                "scheduledFor" TIMESTAMP,
                "readAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_notifications" PRIMARY KEY ("id"),
                CONSTRAINT "FK_notifications_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_notifications_organizations" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE
            )
        `);

        // Create messages table
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "organizationId" uuid NOT NULL,
                "type" character varying NOT NULL,
                "content" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'PENDING',
                "scheduledFor" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_messages" PRIMARY KEY ("id"),
                CONSTRAINT "FK_messages_organizations" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE
            )
        `);

        // Create ticket_priorities table
        await queryRunner.query(`
            CREATE TABLE "ticket_priorities" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "level" character varying NOT NULL,
                "description" text,
                "responseTimeHours" integer DEFAULT 24,
                "resolutionTimeHours" integer DEFAULT 48,
                "isActive" boolean DEFAULT true,
                "organizationId" uuid NOT NULL,
                "createdById" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_ticket_priorities" PRIMARY KEY ("id"),
                CONSTRAINT "FK_ticket_priorities_organizations" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_ticket_priorities_users" FOREIGN KEY ("createdById") REFERENCES "users"("id")
            )
        `);

        // Create tickets table
        await queryRunner.query(`
            CREATE TABLE "tickets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "organizationId" uuid NOT NULL,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'OPEN',
                "priorityId" uuid,
                "assigneeId" uuid,
                "createdById" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_tickets" PRIMARY KEY ("id"),
                CONSTRAINT "FK_tickets_organizations" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_tickets_priorities" FOREIGN KEY ("priorityId") REFERENCES "ticket_priorities"("id"),
                CONSTRAINT "FK_tickets_assignee" FOREIGN KEY ("assigneeId") REFERENCES "users"("id"),
                CONSTRAINT "FK_tickets_creator" FOREIGN KEY ("createdById") REFERENCES "users"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "ticket_priorities"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
