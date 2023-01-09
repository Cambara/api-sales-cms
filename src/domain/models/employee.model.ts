import {
  DefaultWithTimestampsModel,
  IDefaultWithTimestampsModel,
} from './default.model';
import { IJobTitleModel } from './job_title.model';
import { IOrganizationModel } from './organization.model';
import { IUserModel } from './user.model';

export interface IEmployeeModel extends IDefaultWithTimestampsModel {
  isActivated: boolean;
  isOwner: boolean;
  isBlocked: boolean;
  jobTitle?: IJobTitleModel;
  organization?: IOrganizationModel;
  user?: IUserModel;
}

export class EmployeeModel
  extends DefaultWithTimestampsModel
  implements IEmployeeModel
{
  isActivated: boolean;
  isOwner: boolean;
  isBlocked: boolean;
  jobTitle?: IJobTitleModel;
  organization?: IOrganizationModel;
  user?: IUserModel;

  constructor({ id, createdAt, updatedAt, ...data }: IEmployeeModel) {
    super({ id, createdAt, updatedAt });
    this.isActivated = data.isActivated;
    this.isOwner = data.isOwner;
    this.isBlocked = data.isBlocked;
    this.jobTitle = data.jobTitle;
    this.organization = data.organization;
    this.user = data.user;
  }
}
