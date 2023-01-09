import { Test, TestingModule } from '@nestjs/testing';
import { JobTitleModel } from '../../../domain/models/job_title.model';
import { JobTitleEntityMock } from '../../../../test/mocks/infra/database/entities/job_title.entity.mock';
import { JobTitleEntity } from '../entities/job_title.entity';
import { JobTitleRepository } from './job_title.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('JobTitleRepository', () => {
  let jobTitleEntity: Repository<JobTitleEntity>;
  let jobTitleRepository: JobTitleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTitleRepository, JobTitleEntityMock],
    }).compile();
    jobTitleRepository = module.get(JobTitleRepository);
    jobTitleEntity = module.get(getRepositoryToken(JobTitleEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOneByName', () => {
    it('Should find a job title by name', async () => {
      const result = await jobTitleRepository.findOneByName('CEO');
      expect(result).toBeInstanceOf(JobTitleModel);
    });
    it('Should not find a job title by name', async () => {
      const result = await jobTitleRepository.findOneByName('CEO Test');
      expect(result).toEqual(null);
    });

    it('Should use the cache when find a job title by name', async () => {
      jest.spyOn(jobTitleEntity, 'find');
      await jobTitleRepository.findOneByName('CEO');
      expect(jobTitleEntity.find).toBeCalledTimes(0);
    });
  });
});
