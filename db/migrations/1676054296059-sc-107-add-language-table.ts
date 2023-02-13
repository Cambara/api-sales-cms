import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { LanguageEntity } from '../../src/infra/database/entities/language.entity';

const languageCodes = ['en', 'pt-BR', 'pt-PT'];

export class sc107AddLanguageTable1676054296059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'language',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'code',
            type: 'varchar(10)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'is_activated',
            type: 'bool',
            isNullable: false,
            default: true,
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

    const data = languageCodes.map((code) => {
      const language = new LanguageEntity();
      language.code = code;
      return language;
    });

    await queryRunner.manager.save<LanguageEntity>(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('language');
  }
}
