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

    it('should return true if one of the employees is valid', () => {
      const sut = createSut();
      sut.employees = [
        createEmployeeSut({ isActivated: false }),
        createEmployeeSut(),
        createEmployeeSut({ isBlocked: true }),
      ];

      const result = sut.canAuthenticate();
      expect(result).toEqual(true);
    });

    it('should return false when the user is blocked', () => {
      const sut = createSut();
      sut.isBlocked = true;
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the user does not have a employee', () => {
      const sut = createSut();
      sut.employees = [];
      const sut2 = createSut();
      delete sut2.employees;
      const testCases = [sut, sut2];
      testCases.forEach((sut) => {
        const result = sut.canAuthenticate();
        expect(result).toEqual(false);
      });
    });

    it('should return false when the employee is blocked', () => {
      const sut = createSut();
      const employee = createEmployeeSut({ isBlocked: true });
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee is not activated', () => {
      const sut = createSut();
      const employee = createEmployeeSut({ isActivated: false });
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee does not have a organization', () => {
      const sut = createSut();
      const employee = createEmployeeSut();
      delete employee.organization;
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee does not have a organization', () => {
      const sut = createSut();
      const employee = createEmployeeSut({
        organization: new OrganizationModel({
          id: 1,
          name: 'name_str',
          isActivated: false,
        }),
      });
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false if all employees is invalid to authenticate', () => {
      const sut = createSut();
      sut.employees = [
        createEmployeeSut({ isActivated: false }),
        createEmployeeSut({
          organization: new OrganizationModel({
            id: 1,
            name: 'name_str',
            isActivated: false,
          }),
        }),
        createEmployeeSut({ isBlocked: true }),
      ];

      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });
  });
});
