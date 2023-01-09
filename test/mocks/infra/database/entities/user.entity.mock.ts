import { createEntityMockProvider } from '../../../create_mock.helper';
import { UserEntity } from '../../../../../src/infra/database/entities/user.entity';
import { IDefaultMockEntity } from './default_mock_entity.interface';
import { IUserModel } from '../../../../../src/domain/models/user.model';

const row: IUserModel = {
  id: 1,
  email: 'email@host.com',
  password: 'password',
  isBlocked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

class Mock implements IDefaultMockEntity {
  find(): Promise<UserEntity[]> {
    return Promise.resolve([row as UserEntity]);
  }
  findOne(): Promise<UserEntity> {
    return Promise.resolve(row as UserEntity);
  }
}

export const UserEntityMock = createEntityMockProvider(UserEntity, new Mock());
