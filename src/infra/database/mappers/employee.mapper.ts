import { EmployeeModel } from '../../../domain/models/employee.model';
import { EmployeeEntity } from '../entities/employee.entity';
import { convertDbToModel as organizationConvertDbToModel } from './organization.mapper';
import { convertDbToModal as jobTitleConvertDbToModal } from './job_title.mapper';

export const convertDbToModel = (db: EmployeeEntity): EmployeeModel => {
  return new EmployeeModel({
    id: db.id,
    isOwner: db.isOwner,
    isBlocked: db.isBlocked,
    isActivated: db.isActivated,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
    organization: db.organization
      ? organizationConvertDbToModel(db.organization)
      : undefined,
    jobTitle: db.jobTitle ? jobTitleConvertDbToModal(db.jobTitle) : undefined,
  });
};
