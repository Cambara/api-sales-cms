import {
  EmployeeModel,
  IEmployeeModel,
} from '../../../../src/domain/models/employee.model';
import { JobTitleModel } from '../../../../src/domain/models/job_title.model';
import { OrganizationModel } from '../../../../src/domain/models/organization.model';
import { ProfileModel } from '../../../../src/domain/models/profile.model';
import {
  IUserModel,
  UserModel,
} from '../../../../src/domain/models/user.model';
import { createEmployeeModelSut } from './employee.model.mock';

export const createUserModelSut = ({
  email,
}: Partial<IUserModel> = {}): UserModel => {
  const profile = new ProfileModel({
    id: 1,
    firstName: 'first_name_str',
    lastName: 'last_name_str',
  });
  const employee = createEmployeeModelSut();
  const userModel = new UserModel({
    id: 1,
    email: email || 'email@host.com',
    password: 'password_str',
    isBlocked: false,
    profile,
    employees: [employee],
  });
  return userModel;
};
