import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from 'typeorm';

export class sc77CreateDataColumnAndUpdateTokenColumnOnTemporaryTokenTable1688136622587
  implements MigrationInterface
{
  private readonly table = 'temporary_token';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.table,
      'token',
      new TableColumn({
        name: 'token',
        type: 'varchar(120)',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      this.table,
      new TableColumn({
        name: 'data',
        type: 'json',
        isNullable: false,
      }),
    );

    await queryRunner.createIndex(
      this.table,
      new TableIndex({
        name: `idx_${this.table}_token`,
        columnNames: ['token'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'data');
    await queryRunner.dropIndex(this.table, `idx_${this.table}_token`);

    await queryRunner.changeColumn(
      this.table,
      'token',
      new TableColumn({
        name: 'token',
        type: 'text',
        isNullable: false,
      }),
    );
  }
}
