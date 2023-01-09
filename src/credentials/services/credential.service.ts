import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/infra/database/repositories/employee.repository';
import { ProfileRepository } from 'src/infra/database/repositories/profile.repository';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { TransactionHelper } from '../../infra/database/helpers/transaction.helper';
import { OrganizationRepository } from '../../infra/database/repositories/organization.repository';
import { ISignupDto } from '../dtos/signup.dto';

@Injectable()
export class CredentialService {
  constructor(
    private readonly transactionHelper: TransactionHelper,
    private readonly employeeRepository: EmployeeRepository,
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
