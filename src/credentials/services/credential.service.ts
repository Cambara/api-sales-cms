import { ConflictException, Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/infra/database/repositories/employee.repository';
import { JobTitleRepository } from 'src/infra/database/repositories/job_title.repository';
import { ProfileRepository } from 'src/infra/database/repositories/profile.repository';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { TransactionHelper } from '../../infra/database/helpers/transaction.helper';
import { OrganizationRepository } from '../../infra/database/repositories/organization.repository';
import { ISignupDto } from '../dtos/signup.dto';

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
  ) {}

  async signup({
    email,
    organizationName,
    password,
    firstName,
    lastName,
  }: ISignupDto): Promise<void> {
    const hasUser = await this.userRepository.findOne({ email });

    if (hasUser) {
      throw new ConflictException('We already have a user with this e-mail');
    }

    const jobTitle = await this.jobTitleRepository.findOneByName(
      this.jobTitleName,
    );

    if (!jobTitle) {
      throw new Error('Job title not found');
    }

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
        jobTitleId: jobTitle.id,
      });
      const profilePromise = await this.profileRepository.create({
        firstName,
        lastName,
        userId: user.id,
      });

      await Promise.all([employeePromise, profilePromise]);
      await this.transactionHelper.commit();
    } catch (error) {
      await this.transactionHelper.rollback();
      throw error;
    }
  }
}
