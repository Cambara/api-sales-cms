import { createEmployeeModelSut } from '../../../test/mocks/domain/models/employee.model.mock';
import { createUserModelSut } from '../../../test/mocks/domain/models/user.model.mock';
import { OrganizationModel } from './organization.model';

describe('UserModel', () => {
  describe('canAuthenticate', () => {
    it('should return a valid value', () => {
      const sut = createUserModelSut();
      const result = sut.canAuthenticate();
      expect(result).toEqual(true);
    });

    it('should return true if one of the employees is valid', () => {
      const sut = createUserModelSut();
      sut.employees = [
        createEmployeeModelSut({ isActivated: false }),
        createEmployeeModelSut(),
        createEmployeeModelSut({ isBlocked: true }),
      ];

      const result = sut.canAuthenticate();
      expect(result).toEqual(true);
    });

    it('should return false when the user is blocked', () => {
      const sut = createUserModelSut();
      sut.isBlocked = true;
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the user does not have a employee', () => {
      const sut = createUserModelSut();
      sut.employees = [];
      const sut2 = createUserModelSut();
      delete sut2.employees;
      const testCases = [sut, sut2];
      testCases.forEach((sut) => {
        const result = sut.canAuthenticate();
        expect(result).toEqual(false);
      });
    });

    it('should return false when the employee is blocked', () => {
      const sut = createUserModelSut();
      const employee = createEmployeeModelSut({ isBlocked: true });
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee is not activated', () => {
      const sut = createUserModelSut();
      const employee = createEmployeeModelSut({ isActivated: false });
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee does not have a organization', () => {
      const sut = createUserModelSut();
      const employee = createEmployeeModelSut();
      delete employee.organization;
      sut.employees = [employee];
      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });

    it('should return false when the employee does not have a organization', () => {
      const sut = createUserModelSut();
      const employee = createEmployeeModelSut({
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
      const sut = createUserModelSut();
      sut.employees = [
        createEmployeeModelSut({ isActivated: false }),
        createEmployeeModelSut({
          organization: new OrganizationModel({
            id: 1,
            name: 'name_str',
            isActivated: false,
          }),
        }),
        createEmployeeModelSut({ isBlocked: true }),
      ];

      const result = sut.canAuthenticate();
      expect(result).toEqual(false);
    });
  });
});
