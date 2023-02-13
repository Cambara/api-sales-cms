import { createEntityMockProvider } from '../../../create_mock.helper';
import { IDefaultMockEntity } from './default_mock_entity.interface';
import { ILanguageModel } from '../../../../../src/domain/models/language.model';
import { LanguageEntity } from '../../../../../src/infra/database/entities/language.entity';

const rows: ILanguageModel[] = [
  {
    id: 1,
    isActivated: true,
    code: 'en',
  },
  {
    id: 2,
    isActivated: true,
    code: 'pt-BR',
  },
  {
    id: 3,
    isActivated: true,
    code: 'pt-PT',
  },
];

class Mock implements IDefaultMockEntity {
  find(): Promise<LanguageEntity[]> {
    return Promise.resolve(rows);
  }
  findOne(): Promise<LanguageEntity> {
    return Promise.resolve(rows[0]);
  }
}

export const LanguageEntityMock = createEntityMockProvider(
  LanguageEntity,
  new Mock(),
);
