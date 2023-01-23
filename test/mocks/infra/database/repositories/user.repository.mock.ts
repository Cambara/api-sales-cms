import { createMockProvider } from '../../../create_mock.helper';
import { UserModel } from '../../../../../src/domain/models/user.model';
import {
  UserRepository,
  IUserRepository,
  ICreateDto,
  IFindOneDto,
} from '../../../../../src/infra/database/repositories/user.repository';
import { createUserModelSut } from '../../../domain/models/user.model.mock';

class Mock implements IUserRepository {
  create({ email, password }: ICreateDto): Promise<UserModel> {
    const row = new UserModel({
      id: 1,
      email,
      password,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return Promise.resolve(row);
  }

  findOne({ email }: IFindOneDto): Promise<UserModel> {
    const row = createUserModelSut({ email });
    return Promise.resolve(row);
  }
}

export const UserRepositoryMock = createMockProvider(
  UserRepository,
  new Mock(),
);
