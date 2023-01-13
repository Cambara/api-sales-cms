import { IUserTestModel } from 'src/domain/models/user_test.model';
import { createEntityMockProvider } from '../../../create_mock.helper';
import { UserTestEntity } from '../../../../../src/infra/database/entities/user_test.entity';
import { IDefaultMockEntity } from './default_mock_entity.interface';

const row: IUserTestModel = {
  id: 1,
  name: 'test',
};

class Mock implements IDefaultMockEntity {
  findOne(): Promise<UserTestEntity> {
    return Promise.resolve(row);
  }
  find(): Promise<UserTestEntity[]> {
    return Promise.resolve([row]);
  }
}

export const UserTestEntityMock = createEntityMockProvider(
  UserTestEntity,
  new Mock(),
);
