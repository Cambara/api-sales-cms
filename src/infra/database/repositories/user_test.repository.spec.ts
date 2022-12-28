import { Test, TestingModule } from '@nestjs/testing';
import { UserTestEntityMock } from '../../../../test/mocks/infra/database/entities/user_test.entity.mock';
import { UserTestRepository } from './user_test.repository';

describe('UserTestRepository', () => {
  let userTestRepository: UserTestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestRepository, UserTestEntityMock],
    }).compile();
    userTestRepository = module.get(UserTestRepository);
  });

  describe('findAll', () => {
    it('Should return a valid list', async () => {
      const result = await userTestRepository.findAll();
      expect(result.length).toEqual(1);
    });
  });
});
