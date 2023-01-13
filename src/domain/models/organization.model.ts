import {
  DefaultWithTimestampsModel,
  IDefaultWithTimestampsModel,
} from './default.model';

export interface IOrganizationModel extends IDefaultWithTimestampsModel {
  name: string;
  isActivated: boolean;
}

export class OrganizationModel
  extends DefaultWithTimestampsModel
  implements IOrganizationModel
{
  name: string;
  isActivated: boolean;

  constructor({ id, createdAt, updatedAt, ...data }: IOrganizationModel) {
    super({ id, createdAt, updatedAt });
    this.name = data.name;
    this.isActivated = data.isActivated;
  }
}
