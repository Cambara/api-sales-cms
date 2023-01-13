import { Injectable } from '@nestjs/common';
import { OrganizationModel } from '../../../domain/models/organization.model';
import { OrganizationEntity } from '../entities/organization.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModel } from '../mappers/organization.mapper';

export interface ICreateDto {
  name: string;
}

export interface IOrganizationRepository {
  create(dto: ICreateDto): Promise<OrganizationModel>;
}

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly transactionHelper: TransactionHelper) {}

  async create({ name }: ICreateDto): Promise<OrganizationModel> {
    const data = new OrganizationEntity();
    data.name = name;
    data.isActivated = true;
    const [entity] = await this.transactionHelper.save<OrganizationEntity>([
      data,
    ]);
    return convertDbToModel(entity);
  }
}
