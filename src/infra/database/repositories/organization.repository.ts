import { Injectable } from '@nestjs/common';
import { OrganizationModel } from '../../../domain/models/organization.model';
import { OrganizationEntity } from '../entities/organization.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModal } from '../mappers/organization.mapper';

export interface IOrganizationRepository {
  create(name: string): Promise<OrganizationEntity>;
}

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly transactionHelper: TransactionHelper) {}

  async create(name: string): Promise<OrganizationModel> {
    const data = new OrganizationEntity();
    data.name = name;
    data.isActivated = true;
    const [entity] = await this.transactionHelper.save<OrganizationEntity>([
      data,
    ]);
    return convertDbToModal(entity);
  }
}
