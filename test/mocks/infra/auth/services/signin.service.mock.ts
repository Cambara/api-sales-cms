import {
  ISigninService,
  SigninService,
} from '../../../../../src/infra/auth/services/signin.service';
import { UserDto } from '../../../../../src/shared/dtos/user.dto';
import { createUseClassMockProvider } from '../../../create_mock.helper';

class Mock implements ISigninService {
  async handle(): Promise<UserDto> {
    const userDto = new UserDto();
    return Promise.resolve(userDto);
  }
}

export const SigninServiceMock = createUseClassMockProvider(
  SigninService,
  Mock,
);
