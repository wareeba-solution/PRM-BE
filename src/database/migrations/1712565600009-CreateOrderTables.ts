import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTables1712565600009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create order status enum
    await queryRunner.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type 
          WHERE typname = 'order_status_enum'
        ) THEN
          CREATE TYPE "order_status_enum" AS ENUM (
            'PENDING',
            'PROCESSING',
            'COMPLETED',
            'CANCELLED',
            'FAILED'
          );
        END IF;
      END $$;
    `);

    // Create order type enum
    await queryRunner.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type 
          WHERE typname = 'order_type_enum'
        ) THEN
          CREATE TYPE "order_type_enum" AS ENUM (
            'SUBSCRIPTION',
            'ONE_TIME',
            'RENEWAL'
          );
        END IF;
      END $$;
    `);

    // Create orders table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organizationId" uuid NOT NULL,
        "userId" uuid NOT NULL,
        "type" "order_type_enum" NOT NULL,
        "status" "order_status_enum" NOT NULL DEFAULT 'PENDING',
        "amount" decimal(10,2) NOT NULL,
        "currency" character varying(3) NOT NULL DEFAULT 'USD',
        "description" text,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_orders" PRIMARY KEY ("id"),
        CONSTRAINT "FK_orders_organization" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_orders_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    // Create order items table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "orderId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "description" text,
        "quantity" integer NOT NULL DEFAULT 1,
        "unitPrice" decimal(10,2) NOT NULL,
        "totalPrice" decimal(10,2) NOT NULL,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_order_items" PRIMARY KEY ("id"),
        CONSTRAINT "FK_order_items_order" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE
      )
    `);

    // Create order payments table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_payments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "orderId" uuid NOT NULL,
        "amount" decimal(10,2) NOT NULL,
        "currency" character varying(3) NOT NULL DEFAULT 'USD',
        "paymentMethod" character varying NOT NULL,
        "transactionId" character varying,
        "status" character varying NOT NULL,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_order_payments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_order_payments_order" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "order_payments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "order_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "order_status_enum"`);
  }
} 