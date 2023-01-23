import { Test } from '@nestjs/testing';
import { createUserModelSut } from '../../../../test/mocks/domain/models/user.model.mock';
import { CryptographyAdapterMock } from '../../../../test/mocks/infra/cryptography/cryptography.adapter.mock';
import { UserRepositoryMock } from '../../../../test/mocks/infra/database/repositories/user.repository.mock';
import {
  CRYPTOGRAPHY_KEY,
  ICryptographyAdapter,
} from '../../cryptography/cryptography.protocol';
import { UserRepository } from '../../database/repositories/user.repository';
import { SigninService } from '../services/signin.service';

describe('SigninService', () => {
  let signinService: SigninService;
  let userRepository: UserRepository;
  let cryptographyAdapter: ICryptographyAdapter;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SigninService, UserRepositoryMock, CryptographyAdapterMock],
    }).compile();
    signinService = module.get(SigninService);
    userRepository = module.get(UserRepository);
    cryptographyAdapter = module.get(CRYPTOGRAPHY_KEY);
  });

  afterEach(async () => {
    await jest.clearAllMocks();
  });

  describe('handle', () => {
    it('should return a valid result', async () => {
      const dto = {
        email: 'email@host.com',
        password: 'password_str',
      };

      const result = await signinService.handle(dto);

      expect(result.email).toEqual(dto.email);
    });

    it('should throws and error when does not find a user', async () => {
      const findUser = jest
        .spyOn(userRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(null));

      const dto = {
        email: 'email@host.com',
        password: 'password_str',
      };

      await expect(signinService.handle(dto)).rejects.toThrowError();

      const user = await findUser.mock.results[0].value;
      expect(user).toEqual(null);
    });

    it('should throws and error when the password is invalid', async () => {
      const isMatch = jest
        .spyOn(cryptographyAdapter, 'isMatch')
        .mockImplementationOnce(() => Promise.resolve(false));

      const dto = {
        email: 'email@host.com',
        password: 'password_str',
      };

      await expect(signinService.handle(dto)).rejects.toThrowError();

      const isValidPassword = await isMatch.mock.results[0].value;
      expect(isValidPassword).toEqual(false);
    });

    it('should throws and error when the can not authenticate', async () => {
      const findUser = jest
        .spyOn(userRepository, 'findOne')
        .mockImplementationOnce(() => {
          const userModel = createUserModelSut({ isBlocked: true });
          return Promise.resolve(userModel);
        });

      const dto = {
        email: 'email@host.com',
        password: 'password_str',
      };

      await expect(signinService.handle(dto)).rejects.toThrowError();

      const user = await findUser.mock.results[0].value;
      expect(user.canAuthenticate()).toEqual(false);
    });
  });
});
