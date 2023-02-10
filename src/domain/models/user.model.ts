import {
  DefaultWithTimestampsModel,
  IDefaultWithTimestampsModel,
} from './default.model';
import { IEmployeeModel } from './employee.model';
import { IProfileModel } from './profile.model';

export interface IUserModel extends IDefaultWithTimestampsModel {
  email: string;
  password: string;
  isBlocked: boolean;
  languageCode: string;
  profile?: IProfileModel;
  employees?: IEmployeeModel[];
}

export class UserModel
  extends DefaultWithTimestampsModel
  implements IUserModel
{
  email: string;
  password: string;
  isBlocked: boolean;
  employees?: IEmployeeModel[];
  languageCode: string;
  profile?: IProfileModel;

  constructor({ id, createdAt, updatedAt, ...data }: IUserModel) {
    super({ id, createdAt, updatedAt });
    this.email = data.email;
    this.password = data.password;
    this.isBlocked = data.isBlocked;
    this.profile = data.profile;
    this.employees = data.employees;
    this.languageCode = data.languageCode;
  }

  canAuthenticate(): boolean {
    if (this.isBlocked || !this.employees || this.employees.length < 0) {
      return false;
    }

    const isValid = this.employees.some(
      ({ isActivated, isBlocked, organization }) => {
        const isInvalid =
          !isActivated ||
          isBlocked ||
          !organization ||
          !organization.isActivated;
        return !isInvalid;
      },
    );

    return isValid;
  }
}
