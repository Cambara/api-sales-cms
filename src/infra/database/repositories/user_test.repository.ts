import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTestModel } from 'src/domain/models/user_test.model';
import { Repository } from 'typeorm';
import { UserTestEntity } from '../entities/user_test.entity';
import { convertDbToModal } from '../mappers/user_test.mapper';

export interface IUserTestRepository {
  findAll(): Promise<UserTestModel[]>;
}

@Injectable()
export class UserTestRepository implements IUserTestRepository {
  constructor(
    @InjectRepository(UserTestEntity)
    private readonly userTestEntity: Repository<UserTestEntity>,
  ) {}

  async findAll(): Promise<UserTestModel[]> {
    const userTestList = await this.userTestEntity.find();
    return userTestList.map((userTestEntity) =>
      convertDbToModal(userTestEntity),
    );
  }
}
