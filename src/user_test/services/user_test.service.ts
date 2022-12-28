import { Injectable } from '@nestjs/common';
import { UserTestRepository } from '../../infra/database/repositories/user_test.repository';
import { UserTestDto } from '../dtos/user_test.dto';
import { convertModalToDto } from '../mappers/user_test_dto.mapper';

@Injectable()
export class UserTestService {
  constructor(private readonly userTestRepository: UserTestRepository) {}

  async findAll(): Promise<UserTestDto[]> {
    const userTestModelList = await this.userTestRepository.findAll();
    return userTestModelList.map(convertModalToDto);
  }
}
