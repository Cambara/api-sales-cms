import { createMockProvider } from '../../../create_mock.helper';
import { ProfileModel } from '../../../../../src/domain/models/profile.model';
import {
  ProfileRepository,
  IProfileRepository,
  ICreateDto,
} from '../../../../../src/infra/database/repositories/profile.repository';

class Mock implements IProfileRepository {
  create({ firstName, lastName }: ICreateDto): Promise<ProfileModel> {
    const row = new ProfileModel({
      id: 1,
      firstName,
      lastName,
    });
    return Promise.resolve(row);
  }
}

export const ProfileRepositoryMock = createMockProvider(
  ProfileRepository,
  new Mock(),
);
