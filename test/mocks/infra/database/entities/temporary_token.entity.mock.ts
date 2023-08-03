import { createEntityMockProvider } from '../../../create_mock.helper';
import {
  IDefaultMockCreateEntity,
  IDefaultMockEntity,
} from './default_mock_entity.interface';
import {
  TemporaryTokenModel,
  TemporaryTokenTypeEnum,
} from '../../../../../src/domain/models/temporary_token.model';
import { TemporaryTokenEntity } from '../../../../../src/infra/database/entities/temporary_token.entity';

const row = new TemporaryTokenModel({
  id: 1,
  token: 'token_str',
  type: TemporaryTokenTypeEnum.FORGOT_PASSWORD,
  expiredAt: new Date('2023-10-01'),
  data: {
    prop1: 'prop_1',
  },
});

class Mock implements IDefaultMockEntity, IDefaultMockCreateEntity {
  find(): Promise<unknown> {
    return Promise.resolve([row]);
  }

  findOne(): Promise<TemporaryTokenEntity | null> {
    return Promise.resolve(row);
  }

  create(): Promise<TemporaryTokenEntity> {
    return Promise.resolve(row);
  }
}

export const TemporaryTokenEntityMock = createEntityMockProvider(
  TemporaryTokenEntity,
  new Mock(),
);
