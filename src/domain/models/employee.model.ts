import {
  DefaultWithTimestampsModel,
  IDefaultWithTimestampsModel,
} from './default.model';
import { IJobTitleModel } from './job_title.model';
import { IOrganizationModel } from './organization.model';
import { IUserModel } from './user.model';

export interface IEmployeeModel extends IDefaultWithTimestampsModel {
  name: string;
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
  name: string;
  isActivated: boolean;
  isOwner: boolean;
  isBlocked: boolean;
  jobTitle?: IJobTitleModel;
  organization?: IOrganizationModel;
  user?: IUserModel;

  constructor({ id, createdAt, updatedAt, ...data }: IEmployeeModel) {
    super({ id, createdAt, updatedAt });
    this.name = data.name;
    this.isActivated = data.isActivated;
    this.jobTitle = data.jobTitle;
    this.organization = data.organization;
    this.user = data.user;
  }
}
