import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobTitleModel } from 'src/domain/models/job_title.model';
import { Repository } from 'typeorm';
import { JobTitleEntity } from '../entities/job_title.entity';
import { convertDbToModal } from '../mappers/job_title.mapper';

export interface IJobTitleRepository {
  findOneByName(name: string): Promise<JobTitleModel | null>;
}

@Injectable()
export class JobTitleRepository implements IJobTitleRepository {
  private cacheList: Promise<JobTitleEntity[]>;
  constructor(
    @InjectRepository(JobTitleEntity)
    private readonly JobTitleEntity: Repository<JobTitleEntity>,
  ) {
    this.init();
  }

  async findOneByName(name): Promise<JobTitleModel | null> {
    const jobTitleList = await this.cacheList;
    const jobTitle = jobTitleList.find((jt) => jt.name === name);

    return jobTitle ? convertDbToModal(jobTitle) : null;
  }

  private init(): void {
    this.cacheList = this.JobTitleEntity.find({
      where: {
        isActivated: true,
      },
    });
  }
}
