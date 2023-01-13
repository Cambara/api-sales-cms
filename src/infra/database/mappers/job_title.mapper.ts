import { JobTitleModel } from '../../../domain/models/job_title.model';
import { JobTitleEntity } from '../entities/job_title.entity';

export const convertDbToModal = (db: JobTitleEntity): JobTitleModel => {
  return new JobTitleModel({
    id: db.id,
    name: db.name,
    isActivated: db.isActivated,
  });
};
