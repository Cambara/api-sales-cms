import { ProfileModel } from '../../../../src/domain/models/profile.model';
import {
  IUserModel,
  UserModel,
} from '../../../../src/domain/models/user.model';
import { createEmployeeModelSut } from './employee.model.mock';

export const createUserModelSut = ({
  email,
  isBlocked,
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
    password: 'password_encrypt',
    isBlocked: typeof isBlocked === 'boolean' ? isBlocked : false,
    profile,
    employees: [employee],
    languageCode: 'en',
  });
  return userModel;
};
