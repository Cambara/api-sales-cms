import {
  EmployeeModel,
  IEmployeeModel,
} from '../../../../src/domain/models/employee.model';
import { JobTitleModel } from '../../../../src/domain/models/job_title.model';
import { OrganizationModel } from '../../../../src/domain/models/organization.model';

export const createEmployeeModelSut = ({
  id,
  isOwner,
  isBlocked,
  isActivated,
  jobTitle,
  organization,
}: Partial<IEmployeeModel> = {}): EmployeeModel =>
  new EmployeeModel({
    id: id || 1,
    isActivated: typeof isActivated === 'boolean' ? isActivated : true,
    isBlocked: isBlocked || false,
    isOwner: isOwner || false,
    jobTitle:
      jobTitle ||
      new JobTitleModel({ id: 1, isActivated: true, name: 'JOB_TITLE_STR' }),
    organization:
      organization ||
      new OrganizationModel({
        id: 1,
        isActivated: true,
        name: 'ORGANIZATION_STR',
      }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
