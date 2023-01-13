import { DefaultModel, IDefaultModel } from './default.model';

export interface IProfileModel extends IDefaultModel {
  firstName: string;
  lastName: string;
}

export class ProfileModel extends DefaultModel implements IProfileModel {
  firstName: string;
  lastName: string;

  constructor({ id, ...data }: IProfileModel) {
    super({ id });
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
