import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { OrganizationModel } from '../../domain/models/organization.model';
import { UserModel } from '../../domain/models/user.model';
import {
  CRYPTOGRAPHY_KEY,
  ICryptographyAdapter,
} from '../../infra/cryptography/cryptography.protocol';
import { EmployeeRepository } from '../../infra/database/repositories/employee.repository';
import { JobTitleRepository } from '../../infra/database/repositories/job_title.repository';
import { ProfileRepository } from '../../infra/database/repositories/profile.repository';
import { UserRepository } from '../../infra/database/repositories/user.repository';
import { TransactionHelper } from '../../infra/database/helpers/transaction.helper';
import { OrganizationRepository } from '../../infra/database/repositories/organization.repository';
import { ISignupDto } from '../dtos/signup.dto';

type ICreateAccount = ISignupDto & {
  jobTitleId: number;
};

interface ICreateAccountResponse {
  user: UserModel;
  organization: OrganizationModel;
}

@Injectable()
export class CredentialService {
  private readonly jobTitleName = 'ADMINISTRATOR';
  constructor(
    private readonly transactionHelper: TransactionHelper,
    private readonly employeeRepository: EmployeeRepository,
    private readonly jobTitleRepository: JobTitleRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    @Inject(CRYPTOGRAPHY_KEY)
    private readonly cryptographyAdapter: ICryptographyAdapter,
  ) {}

  async signup(dto: ISignupDto): Promise<void> {
    const hasUser = await this.userRepository.findOne({ email: dto.email });

    if (hasUser) {
      throw new ConflictException('We already have a user with this e-mail');
    }

    const jobTitle = await this.jobTitleRepository.findOneByName(
      this.jobTitleName,
    );

    if (!jobTitle) {
      throw new Error('Job title not found');
    }

    dto.password = await this.cryptographyAdapter.encrypt(dto.password);
    await this.createAccount({ ...dto, jobTitleId: jobTitle.id });
  }

  private async createAccount({
    email,
    organizationName,
    password,
    firstName,
    lastName,
    jobTitleId,
  }: ICreateAccount): Promise<ICreateAccountResponse> {
    await this.transactionHelper.startTransaction();
    try {
      const organizationPromise = await this.organizationRepository.create({
        name: organizationName,
      });
      const userPromise = await this.userRepository.create({
        email,
        password,
      });

      const [organization, user] = await Promise.all([
        organizationPromise,
        userPromise,
      ]);

      const employeePromise = await this.employeeRepository.create({
        organizationId: organization.id,
        userId: user.id,
        isOwner: true,
        jobTitleId,
      });
      const profilePromise = await this.profileRepository.create({
        firstName,
        lastName,
        userId: user.id,
      });

      await Promise.all([employeePromise, profilePromise]);
      await this.transactionHelper.commit();

      return { user, organization };
    } catch (error) {
      await this.transactionHelper.rollback();
      throw error;
    }
  }
}
