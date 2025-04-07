import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm';

export class CreateEmailContentsTable1710000000009 implements MigrationInterface {
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

    // Remove htmlContent and textContent columns from email_logs table
    await queryRunner.dropColumn('email_logs', 'htmlContent');
    await queryRunner.dropColumn('email_logs', 'textContent');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back htmlContent and textContent columns to email_logs table
    await queryRunner.addColumn(
      'email_logs',
      new TableColumn({
        name: 'htmlContent',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'email_logs',
      new TableColumn({
        name: 'textContent',
        type: 'text',
        isNullable: true,
      }),
    );

    // Drop foreign key constraint
    const table = await queryRunner.getTable('email_contents');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('emailLogId') !== -1,
    );
    await queryRunner.dropForeignKey('email_contents', foreignKey);

    // Drop email_contents table
    await queryRunner.dropTable('email_contents');
  }
} 