import { Test, TestingModule } from '@nestjs/testing';
import {
  ITransactionHelperMockFeatures,
  TransactionHelperMockFactory,
} from '../../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { EmployeeEntity } from '../entities/employee.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { EmployeeRepository } from './employee.repository';

const features: ITransactionHelperMockFeatures = {
  save(data: EmployeeEntity[]): EmployeeEntity[] {
    return data.map((row, i) => ({
      id: i + 1,
      ...row,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  },
};

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;
  let transactionHelper: TransactionHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRepository, TransactionHelperMockFactory(features)],
    }).compile();
    employeeRepository = module.get(EmployeeRepository);
    transactionHelper = module.get(TransactionHelper);
  });

  describe('create', () => {
    it('Should create a valid employee', async () => {
      jest.spyOn(transactionHelper, 'save');

      const result = await employeeRepository.create({
        organizationId: 1,
        userId: 2,
        jobTitleId: 3,
      });
      expect(result.id).toEqual(1);
      expect(result.isActivated).toEqual(true);
      expect(result.isBlocked).toEqual(false);
      expect(result.isOwner).toEqual(false);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(transactionHelper.save).toHaveBeenCalledWith([
        {
          organization: { id: 1 },
          jobTitle: { id: 3 },
          user: { id: 2 },
          isBlocked: false,
          isOwner: false,
          isActivated: true,
        },
      ]);
    });
  });
});
