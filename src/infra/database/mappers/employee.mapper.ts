import { EmployeeModel } from '../../../domain/models/employee.model';
import { EmployeeEntity } from '../entities/employee.entity';

export const convertDbToModel = (db: EmployeeEntity): EmployeeModel => {
  return new EmployeeModel({
    id: db.id,
    isOwner: db.isOwner,
    isBlocked: db.isBlocked,
    isActivated: db.isActivated,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  });
};
