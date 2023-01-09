import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModel } from '../mappers/user.mapper';

interface ICreateDto {
  email: string;
  password: string;
}

export interface IUserRepository {
  create(dto: ICreateDto): Promise<UserModel>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly transactionHelper: TransactionHelper) {}

  async create({ email, password }: ICreateDto): Promise<UserModel> {
    const data = new UserEntity();
    data.email = email;
    data.password = password;
    data.isBlocked = false;
    const [entity] = await this.transactionHelper.save<UserEntity>([data]);
    return convertDbToModel(entity);
  }
}
