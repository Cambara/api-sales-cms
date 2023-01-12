import { createEntityMockProvider } from '../../../create_mock.helper';
import { JobTitleEntity } from '../../../../../src/infra/database/entities/job_title.entity';
import { IJobTitleModel } from '../../../../../src/domain/models/job_title.model';
import { IDefaultMockEntity } from './default_mock_entity.interface';

const rows: IJobTitleModel[] = [
  {
    id: 1,
    isActivated: true,
    name: 'CEO',
  },
  {
    id: 1,
    isActivated: true,
    name: 'ADMINISTRATOR',
  },
];

class Mock implements IDefaultMockEntity {
  find(): Promise<JobTitleEntity[]> {
    return Promise.resolve(rows);
  }
  findOne(): Promise<JobTitleEntity> {
    return Promise.resolve(rows[0]);
  }
}

export const JobTitleEntityMock = createEntityMockProvider(
  JobTitleEntity,
  new Mock(),
);
