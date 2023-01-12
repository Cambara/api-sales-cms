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
import {
  ICryptographyAdapter,
  CRYPTOGRAPHY_KEY,
} from '../../infra/cryptography/cryptography.protocol';
import { ProfileRepository } from '../../infra/database/repositories/profile.repository';

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
  let cryptographyAdapter: ICryptographyAdapter;
  let profileRepository: ProfileRepository;

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
    cryptographyAdapter = module.get(CRYPTOGRAPHY_KEY);
    profileRepository = module.get(ProfileRepository);

    jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    it('Should create a user with correct data', async () => {
      jest.spyOn(userRepository, 'create');
      const cryptographySpy = jest.spyOn(cryptographyAdapter, 'encrypt');

      const sut = createSut();
      await signupService.handle(sut);

      const encryptedPassword = await cryptographySpy.mock.results[0].value;

      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.create).toBeCalledWith({
        email: sut.email,
        password: encryptedPassword,
      });
    });

    it('Should create a profile with correct data', async () => {
      jest.spyOn(profileRepository, 'create');
      const userSpy = jest.spyOn(userRepository, 'create');

      const sut = createSut();
      await signupService.handle(sut);

      const user = await userSpy.mock.results[0].value;

      expect(profileRepository.create).toBeCalledTimes(1);
      expect(profileRepository.create).toBeCalledWith({
        firstName: sut.firstName,
        lastName: sut.lastName,
        userId: user.id,
      });
    });

    it('Should commit the transaction', async () => {
      jest.spyOn(transactionHelper, 'commit');
      jest.spyOn(transactionHelper, 'rollback');
      const sut = createSut();
      await signupService.handle(sut);

      expect(transactionHelper.commit).toBeCalledTimes(1);
      expect(transactionHelper.rollback).toBeCalledTimes(0);
    });
  });
});
