import { Injectable } from '@nestjs/common';
import { EmployeeModel } from '../../../domain/models/employee.model';
import { EmployeeEntity } from '../entities/employee.entity';
import { JobTitleEntity } from '../entities/job_title.entity';
import { OrganizationEntity } from '../entities/organization.entity';
import { UserEntity } from '../entities/user.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModel } from '../mappers/employee.mapper';

interface ICreateDto {
  organizationId: number;
  userId: number;
  jobTitleId?: number;
  isOwner?: boolean;
}

export interface IOrganizationRepository {
  create(dto: ICreateDto): Promise<EmployeeModel>;
}

@Injectable()
export class EmployeeRepository implements IOrganizationRepository {
  constructor(private readonly transactionHelper: TransactionHelper) {}

  async create({
    organizationId,
    userId,
    jobTitleId,
    isOwner,
  }: ICreateDto): Promise<EmployeeModel> {
    const data = new EmployeeEntity();
    data.organization = new OrganizationEntity();
    data.organization.id = organizationId;
    data.user = new UserEntity();
    data.user.id = userId;
    data.isOwner = isOwner || false;
    data.isActivated = true;
    data.isBlocked = false;

    if (jobTitleId) {
      data.jobTitle = new JobTitleEntity();
      data.jobTitle.id = jobTitleId;
    }

    const [entity] = await this.transactionHelper.save<EmployeeEntity>([data]);
    return convertDbToModel(entity);
  }
}
