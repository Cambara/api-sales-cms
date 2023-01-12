import { Test, TestingModule } from '@nestjs/testing';
import { CryptographyAdapterMock } from '../../../test/mocks/infra/cryptography/cryptography.adapter.mock';
import { EmployeeRepositoryMock } from '../../../test/mocks/infra/database/repositories/employee.repository.mock';
import { JobTitleRepositoryMock } from '../../../test/mocks/infra/database/repositories/job_title.repository.mock';
import { OrganizationRepositoryMock } from '../../../test/mocks/infra/database/repositories/organization.repository.mock';
import { ProfileRepositoryMock } from '../../../test/mocks/infra/database/repositories/profile.repository.mock';
import { UserRepositoryMock } from '../../../test/mocks/infra/database/repositories/user.repository.mock';
import {
  ITransactionHelperMockFeatures,
  TransactionHelperMockFactory,
} from '../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { SignupService } from './signup.service';
import { ISignupDto } from '../dtos/signup.dto';
import { TransactionHelper } from '../../infra/database/helpers/transaction.helper';
import { UserRepository } from '../../infra/database/repositories/user.repository';
import { OrganizationRepository } from '../../infra/database/repositories/organization.repository';
import { EmployeeRepository } from '../../infra/database/repositories/employee.repository';
import { JobTitleRepository } from '../../infra/database/repositories/job_title.repository';

const features: ITransactionHelperMockFeatures = {
  save(data: any[]): any[] {
    return data;
  },
};

const createSut = (): ISignupDto => ({
  email: 'email@host.com',
  firstName: 'first_name_str',
  lastName: 'last_name_str',
  organizationName: 'organization_name_str',
  password: 'password_str',
});

describe('SignupService', () => {
  let signupService: SignupService;
  let organizationRepository: OrganizationRepository;
  let transactionHelper: TransactionHelper;
  let userRepository: UserRepository;
  let employeeRepository: EmployeeRepository;
  let jobTitleRepository: JobTitleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        TransactionHelperMockFactory(features),
        EmployeeRepositoryMock,
        JobTitleRepositoryMock,
        OrganizationRepositoryMock,
        UserRepositoryMock,
        ProfileRepositoryMock,
        CryptographyAdapterMock,
      ],
    }).compile();

    transactionHelper = module.get(TransactionHelper);
    signupService = module.get(SignupService);
    userRepository = module.get(UserRepository);
    organizationRepository = module.get(OrganizationRepository);
    employeeRepository = module.get(EmployeeRepository);
    jobTitleRepository = module.get(JobTitleRepository);

    jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));
  });

  describe('handle', () => {
    it('Should start a transaction', async () => {
      jest.spyOn(transactionHelper, 'startTransaction');
      const sut = createSut();
      await signupService.handle(sut);
      expect(transactionHelper.startTransaction).toBeCalledTimes(1);
    });

    it('Should create a organization with correct data', async () => {
      jest.spyOn(organizationRepository, 'create');
      const sut = createSut();
      await signupService.handle(sut);
      expect(organizationRepository.create).toBeCalledTimes(1);
      expect(organizationRepository.create).toBeCalledWith({
        name: sut.organizationName,
      });
    });

    it('Should create a employee with correct data', async () => {
      jest.spyOn(employeeRepository, 'create');
      const organizationSpy = jest.spyOn(organizationRepository, 'create');
      const userCreateSpy = jest.spyOn(userRepository, 'create');
      const jobTitleSpy = jest.spyOn(jobTitleRepository, 'findOneByName');

      const sut = createSut();
      await signupService.handle(sut);

      const user = await userCreateSpy.mock.results[0].value;
      const jobTitle = await jobTitleSpy.mock.results[0].value;
      const organization = await organizationSpy.mock.results[0].value;

      expect(employeeRepository.create).toBeCalledTimes(1);
      expect(employeeRepository.create).toBeCalledWith({
        organizationId: organization.id,
        userId: user.id,
        isOwner: true,
        jobTitleId: jobTitle.id,
      });
    });
  });
});
