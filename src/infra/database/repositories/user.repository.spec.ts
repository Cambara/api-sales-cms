import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntityMock } from '../../../../test/mocks/infra/database/entities/user.entity.mock';
import {
  ITransactionHelperMockFeatures,
  TransactionHelperMockFactory,
} from '../../../../test/mocks/infra/database/helpers/transaction.helper.mock';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const features: ITransactionHelperMockFeatures = {
  save(data: UserEntity[]): UserEntity[] {
    return data.map((row, i) => ({
      id: i + 1,
      ...row,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  },
};

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userEntity: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        TransactionHelperMockFactory(features),
        UserEntityMock,
      ],
    }).compile();
    userRepository = module.get(UserRepository);
    userEntity = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('Should create a valid user', async () => {
      const result = await userRepository.create({
        email: 'email@host.com',
        password: 'password',
        languageCode: 'en',
      });
      expect(result.id).toEqual(1);
      expect(result.email).toEqual('email@host.com');
      expect(result.password).toEqual('password');
      expect(result.isBlocked).toEqual(false);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('findOne', () => {
    it('Should find a user by email', async () => {
      const result = await userRepository.findOne({
        email: 'test@email.com',
      });

      expect(result).toBeInstanceOf(UserModel);
    });

    it('Should not find any user', async () => {
      jest
        .spyOn(userEntity, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(null));
      const result = await userRepository.findOne({
        email: 'test@email.com',
      });

      expect(result).toEqual(null);
    });
  });
});
