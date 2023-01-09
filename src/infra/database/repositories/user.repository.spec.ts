import { Test, TestingModule } from '@nestjs/testing';
import {
  ITransactionHelperMockFeatures,
  TransactionHelperMockFactory,
} from '../../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

const features: ITransactionHelperMockFeatures = {
  save(data: UserEntity[]): UserEntity[] {
    return data.map((row, i) => ({
      id: i + 1,
      ...row,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  },
};

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, TransactionHelperMockFactory(features)],
    }).compile();
    userRepository = module.get(UserRepository);
  });

  describe('create', () => {
    it('Should create a valid user', async () => {
      const result = await userRepository.create({
        email: 'email@host.com',
        password: 'password',
      });
      expect(result.id).toEqual(1);
      expect(result.email).toEqual('email@host.com');
      expect(result.password).toEqual('password');
      expect(result.isBlocked).toEqual(false);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});
