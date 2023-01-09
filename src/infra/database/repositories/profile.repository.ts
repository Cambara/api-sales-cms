import { Injectable } from '@nestjs/common';
import { ProfileModel } from '../../../domain/models/profile.model';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModel } from '../mappers/profile.mapper';

interface ICreateDto {
  firstName: string;
  lastName: string;
  userId: number;
}

export interface IProfileRepository {
  create(ICreateDto): Promise<ProfileModel>;
}

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly transactionHelper: TransactionHelper) {}

  async create({
    firstName,
    lastName,
    userId,
  }: ICreateDto): Promise<ProfileModel> {
    const data = new ProfileEntity();
    data.firstName = firstName;
    data.lastName = lastName;
    data.user = new UserEntity();
    data.user.id = userId;
    const [entity] = await this.transactionHelper.save<ProfileEntity>([data]);
    return convertDbToModel(entity);
  }
}
