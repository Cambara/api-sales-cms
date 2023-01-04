import { JobTitleEntity } from '../../src/infra/database/entities/job_title.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const jobTiles = [
  'ACCOUNT_MANAGER',
  'ADMINISTRATOR',
  'CEO',
  'CFO',
  'CIO',
  'HR',
  'MANAGER',
  'OPERATOR',
  'STAFF',
];

export class sc78PopulateJobTitleTable1672856553140
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = jobTiles.map((name) => {
      const jobTile = new JobTitleEntity();
      jobTile.name = name;
      jobTile.isActivated = true;
      return jobTile;
    });
    await queryRunner.manager.save<JobTitleEntity>(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const jobTitleRepository =
      queryRunner.manager.getRepository(JobTitleEntity);
    const jobTitles = await jobTitleRepository.find();
    const ids = jobTitles.map((jobTitle) => jobTitle.id);
    await jobTitleRepository.delete(ids);
  }
}
