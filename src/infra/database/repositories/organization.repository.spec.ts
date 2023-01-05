import { Test, TestingModule } from '@nestjs/testing';
import {
  ITransactionHelperMockFeatures,
  UserTestRepositoryMockFactory,
} from '../../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationRepository } from './organization.repository';

const features: ITransactionHelperMockFeatures = {
  save(data: OrganizationEntity[]): OrganizationEntity[] {
    return data.map((row, i) => ({
      id: i + 1,
      ...row,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  },
};

describe('UserTestRepository', () => {
  let organizationRepository: OrganizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationRepository,
        UserTestRepositoryMockFactory(features),
      ],
    }).compile();
    organizationRepository = module.get(OrganizationRepository);
  });

  describe('create', () => {
    it('Should create a valid organization', async () => {
      const result = await organizationRepository.create('test');
      expect(result.name).toEqual('test');
      expect(result.id).toEqual(1);
      expect(result.isActivated).toEqual(true);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});
