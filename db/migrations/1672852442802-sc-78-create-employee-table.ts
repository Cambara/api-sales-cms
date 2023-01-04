import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class sc78CreateEmployeeTable1672852442802
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'organization_id',
            type: 'int(11)',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'job_title_id',
            type: 'int(11)',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'is_owner',
            type: 'bool',
            isNullable: false,
            default: false,
          },
          {
            name: 'is_activated',
            type: 'bool',
            isNullable: false,
          },
          {
            name: 'is_blocked',
            type: 'bool',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('employee', [
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organization',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['job_title_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'job_title',
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employee');
  }
}
