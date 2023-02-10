import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class sc107AddLanguageColumnInUserTable1676056165676
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'language_code',
        type: 'varchar(10)',
        isNullable: false,
        default: '"en"',
      }),
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['language_code'],
        referencedColumnNames: ['code'],
        referencedTableName: 'language',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.changeColumn(
      'user',
      'language_code',
      new TableColumn({
        name: 'language_code',
        type: 'varchar(10)',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'language_code');
  }
}
