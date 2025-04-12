"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveFieldsToEmailContent1743932345734 = void 0;
const typeorm_1 = require("typeorm");
class MoveFieldsToEmailContent1743932345734 {
    async up(queryRunner) {
        try {
            // Check if columns exist in email_contents
            const emailContentsTable = await queryRunner.getTable('email_contents');
            // Add metadata column if it doesn't exist
            if (!emailContentsTable.findColumnByName('metadata')) {
                await queryRunner.addColumn('email_contents', new typeorm_1.TableColumn({
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true
                }));
            }
            // Add messageId column if it doesn't exist
            if (!emailContentsTable.findColumnByName('messageId')) {
                await queryRunner.addColumn('email_contents', new typeorm_1.TableColumn({
                    name: 'messageId',
                    type: 'varchar',
                    isNullable: true
                }));
            }
            // Check if the columns exist in email_logs table
            const emailLogsTable = await queryRunner.getTable('email_logs');
            // Copy data if columns exist in email_logs
            if (emailLogsTable.findColumnByName('metadata') || emailLogsTable.findColumnByName('messageId')) {
                // Use a safer SQL approach with column existence checks
                await queryRunner.query(`
          DO $$
          BEGIN
            -- Update metadata if both columns exist
            IF EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'email_logs' AND column_name = 'metadata'
            ) AND EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'email_contents' AND column_name = 'metadata'
            ) THEN
              UPDATE email_contents ec
              SET metadata = el.metadata
              FROM email_logs el
              WHERE ec.email_log_id = el.id AND el.metadata IS NOT NULL;
            END IF;
            
            -- Update messageId if both columns exist
            IF EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'email_logs' AND column_name = 'message_id'
            ) AND EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'email_contents' AND column_name = 'message_id'
            ) THEN
              UPDATE email_contents ec
              SET message_id = el.message_id
              FROM email_logs el
              WHERE ec.email_log_id = el.id AND el.message_id IS NOT NULL;
            END IF;
          END $$;
        `);
            }
            // Drop columns from email_logs if they exist
            if (emailLogsTable.findColumnByName('metadata')) {
                await queryRunner.query(`
          ALTER TABLE email_logs DROP COLUMN IF EXISTS metadata;
        `);
            }
            if (emailLogsTable.findColumnByName('messageId')) {
                await queryRunner.query(`
          ALTER TABLE email_logs DROP COLUMN IF EXISTS "messageId";
        `);
            }
        }
        catch (error) {
            console.error('Migration failed:', error);
            throw error;
        }
    }
    async down(queryRunner) {
        // This migration cannot be safely reverted due to column limits
        console.log('This migration cannot be safely reverted');
    }
}
exports.MoveFieldsToEmailContent1743932345734 = MoveFieldsToEmailContent1743932345734;
//# sourceMappingURL=1743932345734-1710000000011-MoveMetadataToContent.js.map