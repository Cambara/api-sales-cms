import { UserTestModel } from '../../../../../src/domain/models/user_test.model';
import { createMockProvider } from '../../../create_mock.helper';
import {
  IUserTestRepository,
  UserTestRepository,
} from '../../../../../src/infra/database/repositories/user_test.repository';

const row = new UserTestModel({
  id: 1,
  name: 'name_str',
});

class Mock implements IUserTestRepository {
  findAll(): Promise<UserTestModel[]> {
    return Promise.resolve([row]);
  }
}

export const UserTestRepositoryMock = createMockProvider(
  UserTestRepository,
  new Mock(),
);
