import { createMockProvider } from '../../../create_mock.helper';
import { JobTitleModel } from '../../../../../src/domain/models/job_title.model';
import {
  JobTitleRepository,
  IJobTitleRepository,
} from '../../../../../src/infra/database/repositories/job_title.repository';

class Mock implements IJobTitleRepository {
  findOneByName(name: string): Promise<JobTitleModel> {
    const row = new JobTitleModel({
      id: 1,
      isActivated: true,
      name,
    });
    return Promise.resolve(row);
  }
}

export const JobTitleRepositoryMock = createMockProvider(
  JobTitleRepository,
  new Mock(),
);
