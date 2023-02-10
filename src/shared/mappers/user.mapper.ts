import { EmployeeModel } from 'src/domain/models/employee.model';
import { IOrganizationModel } from 'src/domain/models/organization.model';
import { ProfileModel } from 'src/domain/models/profile.model';
import { UserModel } from '../../domain/models/user.model';
import { EmployeeDto } from '../dtos/employee.dto';
import { OrganizationDto } from '../dtos/organization.dto';
import { ProfileDto } from '../dtos/profile.dto';
import { UserDto } from '../dtos/user.dto';

export const convertModelToDto = (userModel: UserModel): UserDto => {
  const user: UserDto = Object.assign(new UserDto(), {
    id: userModel.id,
    email: userModel.email,
    languageCode: userModel.languageCode,
    profile: convertProfileModelToDto(userModel.profile),
    employees: userModel.employees
      ? userModel.employees.map(convertEmployeeModelToDto)
      : [],
  });
  return user;
};

const convertProfileModelToDto = (profileModel: ProfileModel): ProfileDto => {
  return Object.assign(new ProfileDto(), {
    firstName: profileModel.firstName,
    lastName: profileModel.lastName,
  });
};

const convertEmployeeModelToDto = (
  employeeModel: EmployeeModel,
): EmployeeDto => {
  return Object.assign(new EmployeeDto(), {
    id: employeeModel.id,
    isActivated: employeeModel.isActivated,
    isBlocked: employeeModel.isBlocked,
    isOwner: employeeModel.isOwner,
    jobTitle: employeeModel.jobTitle?.name,
    organization: convertOrganizationModelToDto(employeeModel.organization),
  });
};

const convertOrganizationModelToDto = (
  organizationModel: IOrganizationModel,
): OrganizationDto => {
  return Object.assign(new OrganizationDto(), {
    id: organizationModel.id,
    name: organizationModel.name,
    isActivated: organizationModel.isActivated,
  });
};
