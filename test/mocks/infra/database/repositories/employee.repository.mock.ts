import { EmployeeModel } from '../../../../../src/domain/models/employee.model';
import { createMockProvider } from '../../../create_mock.helper';
import {
  EmployeeRepository,
  ICreateDto,
  IEmployeeRepository,
} from '../../../../../src/infra/database/repositories/employee.repository';
class Mock implements IEmployeeRepository {
  create({ isOwner }: ICreateDto): Promise<EmployeeModel> {
    const row = new EmployeeModel({
      id: 1,
      isActivated: true,
      isBlocked: false,
      isOwner: isOwner || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return Promise.resolve(row);
  }
}

export const EmployeeRepositoryMock = createMockProvider(
  EmployeeRepository,
  new Mock(),
);
