import { Test } from '@nestjs/testing';
import { SigninServiceMock } from '../../../../test/mocks/infra/auth/services/signin.service.mock';
import { SigninService } from '../services/signin.service';
import { LocalStrategy } from './local.strategy.service';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let signinService: SigninService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SigninServiceMock, LocalStrategy],
    }).compile();
    localStrategy = module.get(LocalStrategy);
    signinService = module.get(SigninService);
  });

  describe('validate', () => {
    it('should call the service to signin the user with valid values', async () => {
      jest.spyOn(signinService, 'handle');
      const dto = {
        email: 'email@host.com',
        password: 'password_str',
      };

      await localStrategy.validate(dto.email, dto.password);
      expect(signinService.handle).toBeCalledTimes(1);
      expect(signinService.handle).toBeCalledWith(dto);
    });
  });
});
