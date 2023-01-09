import { Test, TestingModule } from '@nestjs/testing';
import {
  ITransactionHelperMockFeatures,
  TransactionHelperMockFactory,
} from '../../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileRepository } from './profile.repository';

const features: ITransactionHelperMockFeatures = {
  save(data: ProfileEntity[]): ProfileEntity[] {
    return data.map((row, i) => ({
      id: i + 1,
      ...row,
    }));
  },
};

describe('ProfileRepository', () => {
  let profileRepository: ProfileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRepository, TransactionHelperMockFactory(features)],
    }).compile();
    profileRepository = module.get(ProfileRepository);
  });

  describe('create', () => {
    it('Should create a valid profile', async () => {
      const result = await profileRepository.create({
        firstName: 'first_name',
        lastName: 'last_name',
        userId: 1,
      });
      expect(result.id).toEqual(1);
      expect(result.firstName).toEqual('first_name');
      expect(result.lastName).toEqual('last_name');
    });
  });
});
