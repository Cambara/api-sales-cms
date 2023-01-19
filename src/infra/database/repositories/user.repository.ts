import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { TransactionHelper } from '../helpers/transaction.helper';
import { convertDbToModel } from '../mappers/user.mapper';

export interface ICreateDto {
  email: string;
  password: string;
}

export interface IFindOneDto {
  email?: string;
  withProfile?: boolean;
}

export interface IUserRepository {
  create(dto: ICreateDto): Promise<UserModel>;
  findOne(dto: IFindOneDto): Promise<UserModel | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly transactionHelper: TransactionHelper,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async create({ email, password }: ICreateDto): Promise<UserModel> {
    const data = new UserEntity();
    data.email = email;
    data.password = password;
    data.isBlocked = false;
    const [entity] = await this.transactionHelper.save<UserEntity>([data]);
    return convertDbToModel(entity);
  }

  async findOne({ email }: IFindOneDto): Promise<UserModel | null> {
    const user = await this.userEntity.findOne({
      where: {
        email,
      },
      relations: [
        'profile',
        'employees',
        'employees.organization',
        'employees.jobTitle',
      ],
    });
    return user ? convertDbToModel(user) : null;
  }
}
