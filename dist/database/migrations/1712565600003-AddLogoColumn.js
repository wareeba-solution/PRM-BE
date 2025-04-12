"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLogoColumn1712565600003 = void 0;
class AddLogoColumn1712565600003 {
    async up(queryRunner) {
        // Add logo column if it doesn't exist
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'organizations' AND column_name = 'logo'
        ) THEN
          ALTER TABLE "organizations" 
          ADD COLUMN "logo" character varying(255);
        END IF;
      END $$;
    `);
    }
    async down(queryRunner) {
        // Remove logo column if it exists
        await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'organizations' AND column_name = 'logo'
        ) THEN
          ALTER TABLE "organizations" 
          DROP COLUMN "logo";
        END IF;
      END $$;
    `);
    }
}
exports.AddLogoColumn1712565600003 = AddLogoColumn1712565600003;
//# sourceMappingURL=1712565600003-AddLogoColumn.js.map