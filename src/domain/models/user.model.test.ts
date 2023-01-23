import { IEmployeeModel, EmployeeModel } from './employee.model';
import { JobTitleModel } from './job_title.model';
import { OrganizationModel } from './organization.model';
import { ProfileModel } from './profile.model';
import { UserModel } from './user.model';

const createEmployeeSut = ({
  id,
  isOwner,
  isBlocked,
  isActivated,
  jobTitle,
  organization,
}: Partial<IEmployeeModel> = {}): EmployeeModel =>
  new EmployeeModel({
    id: id || 1,
    isActivated: isActivated || true,
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

const createSut = (): UserModel => {
  const profile = new ProfileModel({
    id: 1,
    firstName: 'first_name_str',
    lastName: 'last_name_str',
  });
  const employee = createEmployeeSut();
  const userModel = new UserModel({
    id: 1,
    email: 'email@host.com',
    password: 'password_str',
    isBlocked: false,
    profile,
    employees: [employee],
  });
  return userModel;
};

describe('UserModel', () => {
  describe('canAuthenticate', () => {
    it('should return a valid value', () => {
      const sut = createSut();
      const result = sut.canAuthenticate();
      expect(result).toEqual(true);
    });
  });
});
