import { Test, TestingModule } from '@nestjs/testing';
import { UserTestRepositoryMock } from '../../../test/mocks/infra/database/repositories/user_test.repository.mock';
import { IUserTestDto } from '../dtos/user_test.dto';
import { UserTestService } from './user_test.service';

describe('UserTestService', () => {
  let userTestService: UserTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestService, UserTestRepositoryMock],
    }).compile();
    userTestService = module.get(UserTestService);
  });

  describe('findAll', () => {
    it('should return a valid result', async () => {
      const sut: IUserTestDto = {
        name: 'name_str',
      };
      const result = await userTestService.findAll();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(sut);
    });
  });
});
