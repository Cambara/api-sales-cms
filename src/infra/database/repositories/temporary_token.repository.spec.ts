import { Test, TestingModule } from '@nestjs/testing';
import { TemporaryTokenRepository } from './temporary_token.repository';
import { TemporaryTokenEntityMock } from '../../../../test/mocks/infra/database/entities/temporary_token.entity.mock';
import { TemporaryTokenTypeEnum } from '../../../domain/models/temporary_token.model';
import { TemporaryTokenEntity } from '../entities/temporary_token.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TemporaryTokenRepository', () => {
  let temporaryTokenRepository: TemporaryTokenRepository;
  let temporaryTokenEntity: Repository<TemporaryTokenEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporaryTokenRepository, TemporaryTokenEntityMock],
    }).compile();
    temporaryTokenRepository = module.get(TemporaryTokenRepository);
    temporaryTokenEntity = module.get(getRepositoryToken(TemporaryTokenEntity));
  });

  describe('create', () => {
    it('should create a valid profile', async () => {
      const result = await temporaryTokenRepository.create({
        data: {
          prop1: 'prop_1',
        },
        token: 'token_str',
        type: TemporaryTokenTypeEnum.FORGOT_PASSWORD,
        expiredAt: new Date('2023-10-01'),
      });

      expect(result.id).toEqual(1);
      expect(result.token).toEqual('token_str');
      expect(result.type).toEqual(TemporaryTokenTypeEnum.FORGOT_PASSWORD);
      expect(result.expiredAt.getTime()).toEqual(
        new Date('2023-10-01').getTime(),
      );
      expect(result.data).toEqual({ prop1: 'prop_1' });
    });
  });

  describe('findByToken', () => {
    it('should find a valid data', async () => {
      const result = await temporaryTokenRepository.findByToken('token');

      expect(result.id).toEqual(1);
    });

    it('should return null when does not find a row', async () => {
      jest.spyOn(temporaryTokenEntity, 'findOne').mockResolvedValueOnce(null);
      const result = await temporaryTokenRepository.findByToken('token');

      expect(result).toEqual(null);
    });
  });
});
