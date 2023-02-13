import { createMockProvider } from '../../../create_mock.helper';
import {
  ILanguageRepository,
  LanguageRepository,
} from '../../../../../src/infra/database/repositories/language.repository';
import { LanguageModel } from '../../../../../src/domain/models/language.model';

class Mock implements ILanguageRepository {
  findOneByCode(code: string): Promise<LanguageModel> {
    const row = new LanguageModel({
      id: 1,
      isActivated: true,
      code,
    });
    return Promise.resolve(row);
  }
}

export const LanguageRepositoryMock = createMockProvider(
  LanguageRepository,
  new Mock(),
);
