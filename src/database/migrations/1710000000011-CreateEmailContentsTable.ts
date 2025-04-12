import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEmailContentsTable1710000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create email_contents table
    await queryRunner.createTable(
      new Table({
        name: 'email_contents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'emailLogId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'htmlContent',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'textContent',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      'email_contents',
      new TableForeignKey({
        columnNames: ['emailLogId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'email_logs',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint
    const table = await queryRunner.getTable('email_contents');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('emailLogId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('email_contents', foreignKey);
    }

    // Drop email_contents table
    await queryRunner.dropTable('email_contents');
  }
} 