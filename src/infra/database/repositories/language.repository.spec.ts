import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LanguageEntity } from '../entities/language.entity';
import { LanguageRepository } from './language.repository';
import { LanguageEntityMock } from '../../../../test/mocks/infra/database/entities/language.entity.mock';
import { LanguageModel } from '../../../domain/models/language.model';

describe('LanguageRepository', () => {
  let languageEntity: Repository<LanguageEntity>;
  let languageRepository: LanguageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguageRepository, LanguageEntityMock],
    }).compile();
    languageRepository = module.get(LanguageRepository);
    languageEntity = module.get(getRepositoryToken(LanguageEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOneByCode', () => {
    it('Should find a language by code', async () => {
      const result = await languageRepository.findOneByCode('en');
      expect(result).toBeInstanceOf(LanguageModel);
    });
    it('Should not find a language by code', async () => {
      const result = await languageRepository.findOneByCode('es');
      expect(result).toEqual(null);
    });

    it('Should use the cache when find a language by code', async () => {
      jest.spyOn(languageEntity, 'find');
      await languageRepository.findOneByCode('en');
      expect(languageEntity.find).toBeCalledTimes(0);
    });
  });
});
